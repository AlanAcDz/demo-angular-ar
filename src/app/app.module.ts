import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AframeModule } from './aframe/aframe.module';
import { ThreeModule } from './three/three.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AframeModule,
    ThreeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
