import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicScriptLoaderService } from './dynamic-script-loader.service';
import { ASceneComponent } from './a-scene/a-scene.component';

@NgModule({
  declarations: [
    ASceneComponent,
  ],
  exports: [
    ASceneComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    DynamicScriptLoaderService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AframeModule { }
