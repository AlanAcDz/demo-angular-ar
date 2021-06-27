import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader.service';

@Component({
  selector: 'app-location-ar',
  templateUrl: './location-ar.component.html',
  styleUrls: ['./location-ar.component.scss']
})
export class LocationArComponent implements OnInit {
  showContent = false;
  latitude!: number;
  longitude!: number;
  constructor(
    private scriptLoader: DynamicScriptLoaderService,
  ) { }
  async ngOnInit() {
    await this.setPosition();
    setTimeout(() => this.showContent = true, 2000);
    // this.loadScripts();
    // window.addEventListener('load', (event) => {});
  }
  private loadScripts() {
    this.scriptLoader.load('aframe', 'arjs', 'aframe-look-at', 'aframe-loaders')
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
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
