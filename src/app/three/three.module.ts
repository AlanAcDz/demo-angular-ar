import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeCoreModule } from '@angular-three/core';
import { ThreeMeshModule } from '@angular-three/core/meshes';
import { ThreeBoxBufferGeometryModule } from '@angular-three/core/geometries';
import { ThreeMeshBasicMaterialModule } from '@angular-three/core/materials';

import { ThreeSceneComponent } from './three-scene/three-scene.component';

@NgModule({
  declarations: [
    ThreeSceneComponent,
  ],
  exports: [
    ThreeSceneComponent,
  ],
  imports: [
    CommonModule,
    ThreeCoreModule,
    ThreeMeshModule,
    ThreeBoxBufferGeometryModule,
    ThreeMeshBasicMaterialModule,
  ]
})
export class ThreeModule { }
