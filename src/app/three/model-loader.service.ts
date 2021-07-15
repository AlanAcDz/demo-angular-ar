import { Injectable } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export enum ModelTypes {
  GLTF,
  FBX,
  OBJ
}

@Injectable()
export class ModelLoaderService {
  load3DModel(path: string, type: ModelTypes) {
    switch (type) {
      case ModelTypes.GLTF:
        return this.loadGltfModel(path);
      case ModelTypes.FBX:
        return this.loadFbxModel(path);
      case ModelTypes.OBJ:
        return this.loadObjModel(path);
      default:
        return this.loadObjModel(path);
    }
  }
  private loadGltfModel(path: string) {
    return new Promise<THREE.Group>((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(`${path}.glb`, 
        (gltf) => resolve(gltf.scene), undefined,
        (error) => reject(error)
      );
    });
  }
  private loadFbxModel(path: string) {
    return new Promise<THREE.Group>((resolve, reject) => {
      const loader = new FBXLoader();
      loader.load(`${path}.fbx`,
        (fbx) => resolve(fbx), undefined,
        (error) => reject(error)
      );
    });
  }
  private loadObjModel(path: string) {
    return new Promise<THREE.Group>((resolve, reject) => {
      const loader = new OBJLoader();
      loader.load(`${path}.obj`,
        (obj) => resolve(obj), undefined,
        (error) => reject(error)
      );
    });
  }
}
