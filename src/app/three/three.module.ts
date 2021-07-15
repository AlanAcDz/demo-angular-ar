import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelLoaderService } from './model-loader.service';
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
  ],
  providers: [
    ModelLoaderService,
  ],
})
export class ThreeModule { }
