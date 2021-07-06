import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeCoreModule, LoaderService } from '@angular-three/core';
import { ThreeMeshModule } from '@angular-three/core/meshes';
import { ThreeBoxBufferGeometryModule } from '@angular-three/core/geometries';
import { ThreeMeshBasicMaterialModule } from '@angular-three/core/materials';

import { ModelLoaderService } from './model-loader.service';

import { ThreeSceneComponent } from './three-scene/three-scene.component';
import { AngularThreeComponent } from './angular-three/angular-three.component';

@NgModule({
  declarations: [
    ThreeSceneComponent,
    AngularThreeComponent,
  ],
  exports: [
    ThreeSceneComponent,
    AngularThreeComponent,
  ],
  imports: [
    CommonModule,
    ThreeCoreModule,
    ThreeMeshModule,
    ThreeBoxBufferGeometryModule,
    ThreeMeshBasicMaterialModule,
  ],
  providers: [
    LoaderService,
    ModelLoaderService,
  ],
})
export class ThreeModule { }
