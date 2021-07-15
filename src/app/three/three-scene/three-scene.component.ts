import { AfterViewInit, Component, ElementRef, HostListener, Inject, Renderer2, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModelLoaderService, ModelTypes } from '../model-loader.service';
import { ThreeJs } from '../three.class';

@Component({
  selector: 'app-three-scene',
  templateUrl: './three-scene.component.html',
  styleUrls: ['./three-scene.component.scss']
})
export class ThreeSceneComponent implements AfterViewInit {
  @ViewChild('threeContainer') threeContainer!: ElementRef<HTMLElement>;
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  three!: ThreeJs;
  private modelPath = 'assets/Italika_Vortx_300/VORTX_300';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private ngRenderer: Renderer2,
    private modelLoader: ModelLoaderService,
  ) { }
  async ngAfterViewInit() {
    await this.showWebcamVideo();
    await this.createThreeScene();
  }
  @HostListener('window:resize', ['$event'])
  onResize({ target }: any) {
    this.three.onResize(target.innerWidth, target.innerHeight);
  }
  private async createThreeScene() {
    const { innerWidth, innerHeight } = this.document.defaultView as Window;
    this.three = new ThreeJs(innerWidth, innerHeight);
    this.ngRenderer.appendChild(this.threeContainer.nativeElement, this.three.renderer.domElement);
    const model3D = await this.modelLoader.load3DModel(this.modelPath, ModelTypes.GLTF);
    this.three.loadModel(model3D);
    this.three.animate();
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
