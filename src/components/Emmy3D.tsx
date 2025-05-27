import { useEffect, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { TextureLoader } from 'three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Emmy3DProps {
  position?: [number, number, number];
  rotation?: number;
}

export function Emmy3D({ position = [0, 0, 0], rotation = Math.PI / 6 }: Emmy3DProps) {
  const meshRef = useRef<THREE.Group>(undefined);
  const stringRef = useRef<THREE.Line>(undefined);
  const texture = useLoader(TextureLoader, '/3d-models/small emmy/emmy-small/emmy-small_texture.png');
  const materials = useLoader(MTLLoader, '/3d-models/small emmy/emmy-small/emmy-small.mtl');
  const obj = useLoader(OBJLoader, '/3d-models/small emmy/emmy-small/emmy-small_texture.obj', (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  useEffect(() => {
    if (meshRef.current) {
      // Apply texture to all materials
      meshRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });

      meshRef.current.rotation.y = rotation;
      meshRef.current.position.set(...position);
      meshRef.current.scale.set(2.0, 2.0, 2.0);

      // Create static string
      const points = [];
      for (let i = 0; i <= 50; i++) {
        points.push(new THREE.Vector3(0, i * 0.5, 0));
      }
      const stringGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const stringMaterial = new THREE.LineBasicMaterial({ 
        color: 0xffffff, 
        linewidth: 8,
        transparent: true,
        opacity: 0.9
      });
      const string = new THREE.Line(stringGeometry, stringMaterial);
      
      // Position string at Emmy's head
      string.position.set(position[0], position[1] + 0.8, position[2]);
      stringRef.current = string;
      meshRef.current.parent?.add(string);
    }
  }, [position, texture, rotation]);

  useFrame((state) => {
    if (meshRef.current && stringRef.current) {
      const time = state.clock.elapsedTime;
      const floatY = Math.sin(time) * 0.1;
      
      // Update Emmy position
      meshRef.current.position.y = position[1] + floatY;

      // Update string position to follow Emmy
      stringRef.current.position.set(position[0], position[1] + floatY + 0.8, position[2]);
    }
  });

  return (
    <primitive 
      ref={meshRef} 
      object={obj.clone()} 
      dispose={null}
    />
  );
} 