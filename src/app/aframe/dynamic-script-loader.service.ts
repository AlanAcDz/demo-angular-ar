import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'aframe', src: 'https://aframe.io/releases/1.0.4/aframe.min.js' },
  { name: 'arjs', src: 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js' },
  { name: 'aframe-look-at', src: 'https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js' },
  { name: 'aframe-loaders', src: 'https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js' },
];

@Injectable()
export class DynamicScriptLoaderService {
  private scripts: any = {};
  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }
  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }
  loadScript(name: string) {
    return new Promise((resolve) => {
      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
      //load script
      let script = this.document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.scripts[name].src;
      script.onload = () => {
        this.scripts[name].loaded = true;
        resolve({ script: name, loaded: true, status: 'Loaded' });
      };
      script.onerror = () => resolve({ script: name, loaded: false, status: 'Loaded' });
      this.document.getElementsByTagName('head')[0].appendChild(script);
    });
  }
}
