import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicScriptLoaderService } from './dynamic-script-loader.service';
import { LocationArComponent } from './location-ar/location-ar.component';
import { MarkerArComponent } from './marker-ar/marker-ar.component';

@NgModule({
  declarations: [
    LocationArComponent,
    MarkerArComponent,
  ],
  exports: [
    LocationArComponent,
    MarkerArComponent,
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
