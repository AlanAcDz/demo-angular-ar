import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-three-scene',
  templateUrl: './three-scene.component.html',
  styleUrls: ['./three-scene.component.scss']
})
export class ThreeSceneComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {}
  onAnimateReady(cube: THREE.Mesh) {
    // rotating the X and the Y axis 0.01 radian on every frame
    cube.rotation.x = cube.rotation.y += 0.01;
  }
}
