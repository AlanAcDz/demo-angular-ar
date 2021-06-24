import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';

@Component({
  selector: 'app-a-scene',
  templateUrl: './a-scene.component.html',
  styleUrls: ['./a-scene.component.scss']
})
export class ASceneComponent implements OnInit {
  showContent = false;
  latitude!: number;
  longitude!: number;
  constructor(
    private scriptLoader: DynamicScriptLoaderService,
  ) { }
  async ngOnInit() {
    await this.setPosition();
    setTimeout(() => this.showContent = true, 1000);
    // this.loadScripts();
    // window.addEventListener('load', (event) => {});
  }
  private loadScripts() {
    this.scriptLoader.load('aframe', 'arjs')
      .then(() => this.showContent = true)
      .catch(error => console.error(error));
  }
  private getCurrentPosition() {
    return new Promise<GeolocationCoordinates>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => resolve(coords)
      );
    });
  }
  private async setPosition() {
    const { latitude, longitude } = await this.getCurrentPosition();
    console.log({ latitude, longitude });
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
