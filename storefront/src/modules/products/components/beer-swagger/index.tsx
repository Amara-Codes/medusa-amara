"use client";

import { useGLTF, useTexture, Html } from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useEffect, Suspense } from "react";
import { Group } from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  scene: THREE.Group;
  nodes: {
    "soda-can-a": THREE.Mesh;
    "soda-can-b": THREE.Mesh;
    "soda-can-001": THREE.Group;
  };
  materials: {
    "Metal": THREE.MeshStandardMaterial;
    "Can Body": THREE.MeshStandardMaterial;
    "Can Label": THREE.MeshStandardMaterial;
  };
};

export type BeerSwaggerProps = {
  urlImg: string;
  scale?: number;
};

const DEFAULT_ROTATION_SPEED = 0.015;
const DEFAULT_DAMPING = 0.0002;

const BeerLoader = (

  <div className="beer-glass-wrapper">
    <div className="glass-wrapper">
      <div className="glass">
        <div className="beer">
          <div className="foam">
            <span className="foambubble"></span>
            <span className="foambubble"></span>
            <span className="foambubble"></span>
            <span className="foambubble"></span>
            <span className="foambubble"></span>
          </div>
          <div className="bubbles">
            <span className="bubble"></span>
            <span className="bubble"></span>
            <span className="bubble"></span>
            <span className="bubble"></span>
            <span className="bubble"></span>
            <span className="bubble"></span>
            <span className="bubble"></span>
            <span className="bubble"></span>
            <span className="bubble"></span>
          </div>
          <div className="foamtop">
            <span className="ft-bubble"></span>
            <span className="ft-bubble"></span>
            <span className="ft-bubble"></span>
            <span className="ft-bubble"></span>
          </div>
          <div className="coaster"></div>
        </div>
      </div>
    </div>
  </div>
);

export function BeerSwagger({ urlImg, scale = 10 }: BeerSwaggerProps) {
  return (
    <div
      className="w-full h-full rounded-lg bg-transparent contrast-[1.45] saturate-[1.3] brightness-[1.05] top-16 md:top-8"
      style={{
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, -0%)",
        overflow: "hidden",
        pointerEvents: "auto",
        zIndex: 30,
      }}
    >
      <Canvas
        style={{
          aspectRatio: "1/1",
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{
          fov: 30,
        }}
      >
        <ambientLight intensity={1} color={"#ffffff"} />
        <directionalLight position={[8, -8, 8]} intensity={2.5} />
        <directionalLight position={[-5, 5, 5]} intensity={3} />
        <Suspense
          fallback={
            <Html center>
              {BeerLoader}
            </Html>
          }
        >
          <Scene urlImg={urlImg} scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
}

type SceneProps = {
  urlImg: string;
  scale: number;
};

function Scene({ urlImg, scale }: SceneProps) {
  const { scene, materials } = useGLTF("/3d/Beer-Can.gltf") as GLTFResult;
  const label = useTexture(
    urlImg ?? "/images/beer-swagger/label-placeholder.png"
  );
  const aspect = 778 / 1440;
  label.flipY = false;
  label.center.set(0.5, 0.5);
  label.rotation = Math.PI / 2;
  const canAspect = 1.1;
  const repeatY = canAspect / aspect;

  label.repeat.set(1, repeatY);
  label.offset.set(0, (1 - repeatY) / 2);

  const groupRef = useRef<Group>(null);
  const rotationSpeed = useRef(DEFAULT_ROTATION_SPEED);

  useEffect(() => {
    if (materials["Can Label"]) {
      materials["Can Label"].map = label;
      materials["Can Label"].needsUpdate = true;
    }
  }, [materials, label]);

  useFrame(() => {
    if (groupRef.current) {
      if (rotationSpeed.current < DEFAULT_ROTATION_SPEED) {
        rotationSpeed.current += DEFAULT_DAMPING;
      }
      groupRef.current.rotation.y += rotationSpeed.current;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1.5}
      floatIntensity={0.5}
      floatingRange={[-0.05, 0.05]}
    >
      <group
        ref={groupRef}
        dispose={null}
        scale={scale}
        rotation={[0, -Math.PI, 0]}
        position={[0, 0, 0]}
      >
        <primitive object={scene} />
      </group>
    </Float>
  );
}
