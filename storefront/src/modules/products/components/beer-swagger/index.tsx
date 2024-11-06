"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Define GLTF result type
type GLTFResult = GLTFLoader & {
  nodes: {
    cylinder: THREE.Mesh;
    cylinder_1: THREE.Mesh;
    Tab: THREE.Mesh;
  };
};

// Define props for BeerSwagger component
export type BeerSwaggerProps = {
  urlImg: string;
  scale?: number;
};

export function BeerSwagger({ urlImg, scale = 2 }: BeerSwaggerProps) {
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
      <ambientLight intensity={10} color={"#fff9d7"} />
      <directionalLight position={[5, 0, 5]} intensity={8} castShadow />

      {urlImg && <Scene urlImg={urlImg} scale={scale} />}
    </Canvas>
  );
}

// Define props for Scene component
type SceneProps = {
  urlImg: string;
  scale: number;
};

function Scene({ urlImg, scale }: SceneProps) {
  const { nodes } = useGLTF("/Beer-can.gltf") as unknown as GLTFResult;
  const groupRef = useRef<Group>(null);
  const [label, setLabel] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loadTexture = async () => {
      try {
        const loadedTexture = await new Promise<THREE.Texture>((resolve, reject) => {
          const texture = new THREE.TextureLoader().load(
            urlImg,
            resolve,
            undefined,
            () => reject(new Error("Texture not found"))
          );
          texture.flipY = false;
        });
        setLabel(loadedTexture);
      } catch (error) {
        console.warn("Texture not found, using default material.");
        setLabel(null); // Imposta null per usare il materiale senza texture
      }
    };

    loadTexture();
  }, [urlImg]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Velocità della rotazione
    }
  });

  const metalMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.92,
    color: "#bbbbbb",
  });

  return (
    <Float
      speed={2.5}
      rotationIntensity={1.2}
      floatIntensity={1.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={groupRef} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]} position={[0, 0.3, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.cylinder.geometry} material={metalMaterial} />
        <mesh castShadow receiveShadow geometry={nodes.cylinder_1.geometry}>
          <meshStandardMaterial roughness={0.15} metalness={0.9} map={label || undefined} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Tab.geometry} material={metalMaterial} />
      </group>
    </Float>
  );
}
