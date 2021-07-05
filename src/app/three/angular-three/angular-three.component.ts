import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@angular-three/core';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-angular-three',
  templateUrl: './angular-three.component.html',
  styles: [
  ]
})
export class AngularThreeComponent implements OnInit {
  model$!: Observable<GLTF>;
  constructor(
    private loaderServ: LoaderService,
  ) { }
  ngOnInit(): void {
    this.loaderServ.use(GLTFLoader, 'assets/Italika_Vortx_300/VORTX_300.gltf').subscribe(
      (model) => console.log(model)
    );
  }
  onAnimateReady(cube: THREE.Mesh) {
    // rotating the X and the Y axis 0.01 radian on every frame
    cube.rotation.x = cube.rotation.y += 0.01;
  }
}
