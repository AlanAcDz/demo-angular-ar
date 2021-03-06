import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class ThreeJs {
    renderer = new THREE.WebGLRenderer({ alpha: true });
    private scene = new THREE.Scene();
    private camera!: THREE.PerspectiveCamera;
    private model3D!: THREE.Object3D;
    private controls!: OrbitControls;
    constructor(width: number, height: number) {
        this.renderer.setClearColor('#fff', 0);
        this.renderer.setSize(width, height);
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.addLights();
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
    onResize(width: number, height: number) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    loadModel(model3D: THREE.Object3D) {
        this.model3D = model3D;
        this.model3D.scale.set(0.3, 0.3, 0.3);
        this.model3D.rotateY(140 * (Math.PI / 180));
        this.model3D.rotateZ(5 * (Math.PI / 180));
        this.centerModel(this.model3D);
        this.camera.position.z = 5;
        this.controls.update();
    }
    private centerModel(model3D: THREE.Object3D) {
        const box = new THREE.Box3().setFromObject(model3D);
        box.getCenter(model3D.position);
        model3D.position.multiplyScalar(-1);
        const pivot = new THREE.Group();
        this.scene.add(pivot);
        pivot.add(model3D);
    }
    private addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff);
        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(5, 10, 5);
        this.scene.add(ambientLight, pointLight);
    }
}
