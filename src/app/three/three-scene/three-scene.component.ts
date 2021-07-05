import { AfterViewInit, Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-three-scene',
  templateUrl: './three-scene.component.html',
  styleUrls: ['./three-scene.component.scss']
})
export class ThreeSceneComponent implements AfterViewInit {
  @ViewChild('threeContainer') threeContainer!: ElementRef<HTMLElement>;
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  threeRenderer!: THREE.WebGLRenderer;
  geometryMesh!: THREE.Mesh;
  model3D!: THREE.Object3D;
  controls!: OrbitControls;
  private modelPath = 'assets/Italika_Vortx_300/VORTX_300';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) { }
  async ngAfterViewInit() {
    await this.showWebcamVideo();
    this.createThreeScene();
    await this.loadModel();
    this.animate();
  }
  private createThreeScene() {
    const { innerWidth, innerHeight } = this.document.defaultView as Window;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
    this.threeRenderer = new THREE.WebGLRenderer({ alpha: true });
    this.threeRenderer.setClearColor('#fff', 0);
    this.threeRenderer.setSize(innerWidth, innerHeight);
    this.renderer.appendChild(this.threeContainer.nativeElement, this.threeRenderer.domElement);
    this.controls = new OrbitControls(this.camera, this.threeRenderer.domElement);
  }
  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.threeRenderer.render(this.scene, this.camera);
  }
  private async loadModel() {
    this.model3D = await this.loadFbxModel();
    this.model3D.scale.set(0.05, 0.05, 0.05);
    // this.model3D.scale.set(0.2, 0.2, 0.2);
    this.centerModel();
    this.camera.position.z = 5;
    this.controls.update();
  }
  private centerModel() {
    const box = new THREE.Box3().setFromObject(this.model3D);
    box.getCenter(this.model3D.position);
    this.model3D.position.multiplyScalar(-1);
    const pivot = new THREE.Group();
    this.scene.add(pivot);
    pivot.add(this.model3D);
  }
  private loadGltfModel() {
    return new Promise<THREE.Group>((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(`${this.modelPath}.glb`, 
        (gltf) => resolve(gltf.scene), undefined,
        (error) => reject(error)
      );
    });
  }
  private loadFbxModel() {
    return new Promise<THREE.Group>((resolve, reject) => {
      const loader = new FBXLoader();
      loader.load(`${this.modelPath}_2.fbx`,
        (fbx) => resolve(fbx), undefined,
        (error) => reject(error)
      );
    });
  }
  private loadObjModel() {
    return new Promise<THREE.Group>((resolve, reject) => {
      const loader = new OBJLoader();
      loader.load(`${this.modelPath}.obj`,
        (obj) => resolve(obj), undefined,
        (error) => reject(error)
      );
    });
  }
  private async showWebcamVideo() {
    const video = this.videoElement.nativeElement;
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }
}
