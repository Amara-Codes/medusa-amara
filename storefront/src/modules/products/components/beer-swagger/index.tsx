"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";

// Tipizza i nodi del file GLTF
type GLTFResult = {
  nodes: {
    cylinder: THREE.Mesh;
    cylinder_1: THREE.Mesh;
    Tab: THREE.Mesh;
  };
} & THREE.Object3D;

// Tipizza le props per il componente BeerSwagger
export type BeerSwaggerProps = {
  urlImg?: string; // Rende opzionale l'URL
  scale?: number;
};

export function BeerSwagger({ urlImg, scale = 1.5 }: BeerSwaggerProps) {
  return (
    <Canvas
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30,
      }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{
        fov: 30,
      }}
    >
      <ambientLight intensity={15} color={"#fffafa"} />
      <directionalLight position={[5, 0, 5]} intensity={4} castShadow />

      {urlImg && <Scene urlImg={urlImg} scale={scale} />}
    </Canvas>
  );
}

// Tipizza le props per il componente Scene
type SceneProps = {
  urlImg: string;
  scale: number;
};

function Scene({ urlImg, scale }: SceneProps) {
  const { nodes } = useGLTF("/Beer-can.gltf") as unknown as GLTFResult;
  const label = useTexture(urlImg);

  // Prevenzione rotazione inversa per la texture
  label.flipY = false;

  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
    
  });

  const metalMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.9,
    color: "#bbbbbb"
  });

  return (
    <Float
      speed={2.5}
      rotationIntensity={1.2}
      floatIntensity={1.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={groupRef} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]} position={[0, 0.5, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.cylinder.geometry} material={metalMaterial} />
        <mesh castShadow receiveShadow geometry={nodes.cylinder_1.geometry}>
          <meshStandardMaterial roughness={0.15} metalness={0.9} map={label} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Tab.geometry} material={metalMaterial} />
      </group>
    </Float>
  );
}
