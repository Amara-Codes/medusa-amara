"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { Group } from "three";
import { GLTF } from "three-stdlib";

const isEcom = process.env.AMARA_ECOM_ACTIVATED;

// Define the GLTFResult type to match the new GLTF file
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

const DEFAULT_ROTATION_SPEED = 0.005;
const DEFAULT_DAMPING = 0.0002;

export function BeerSwagger({ urlImg, scale = 10 }: BeerSwaggerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    // Detect if the device is touchscreen
    isTouchDevice.current = window.matchMedia("(pointer: coarse)").matches;
  }, []);

  const handleMouseEnter = () => {
    if (!isTouchDevice.current) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice.current) setIsHovered(false);
  };

  const handleTouch = () => {
    if (isTouchDevice.current) setIsPaused((prev) => !prev);
  };

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
          aspectRatio: "1/1"
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{
          fov: 30,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouch}
      >
        <ambientLight intensity={.5} color={"#ffffff"} />
        <directionalLight position={[8, -8, 8]} intensity={2.5} />
        <directionalLight position={[-5, 5, 5]} intensity={3} />
        <Scene
          urlImg={urlImg}
          scale={scale}
          isHovered={isHovered}
          isPaused={isPaused}
        />
      </Canvas>
    </div>
  );
}

type SceneProps = {
  urlImg: string;
  scale: number;
  isHovered: boolean;
  isPaused: boolean;
};

function Scene({ urlImg, scale, isHovered, isPaused }: SceneProps) {
  const { scene, materials } = useGLTF("/3d/Beer-Can.gltf") as GLTFResult;
  const label = useTexture(
    urlImg ?? "/images/beer-swagger/label-placeholder.png"
  );
  
  const aspect = 778 / 1440;
  label.flipY = false;
  label.center.set(0.5, 0.5); // Set the rotation center to the middle of the texture
  label.rotation = Math.PI / 2;
  const canAspect = 1.1; // Adjust if the can's UV mapping is not square
  const repeatY = canAspect / aspect;

  label.repeat.set(1, repeatY);
  label.offset.set(0, (1 - repeatY) / 2);
  label.needsUpdate = true;


  const groupRef = useRef<Group>(null);
  const rotationSpeed = useRef(DEFAULT_ROTATION_SPEED);
  const [isFollowingMouse, setIsFollowingMouse] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [initialRotation, setInitialRotation] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Add a target rotation to smoothly interpolate towards
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update the 'Can Label' material with the new texture
  useEffect(() => {
    if (materials["Can Label"]) {
      materials["Can Label"].map = label;
      materials["Can Label"].needsUpdate = true;
    }
  }, [materials, label]);

  // Handle rotation and interaction
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (initialMousePosition && initialRotation) {
        const deltaX =
          (event.clientX - initialMousePosition.x) / window.innerWidth;
        const deltaY =
          (event.clientY - initialMousePosition.y) / window.innerHeight;

        // Update target rotation instead of directly setting the rotation
        targetRotation.current.x =
          initialRotation.x + deltaY * Math.PI * 0.2; // Reduced sensitivity
        targetRotation.current.y =
          initialRotation.y + deltaX * Math.PI * 0.8; // Reduced sensitivity
      }
    };

    if (isFollowingMouse) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isFollowingMouse, initialMousePosition, initialRotation]);

  useFrame(() => {
    if (groupRef.current) {
      if (isPaused) {
        // Do not change rotation if paused
        return;
      }

      if (isHovered) {
        if (rotationSpeed.current > 0) {
          rotationSpeed.current = 0;
        } else if (!isFollowingMouse) {
          setInitialRotation({
            x: groupRef.current.rotation.x,
            y: groupRef.current.rotation.y,
          });
          setInitialMousePosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
          });
          targetRotation.current.x = groupRef.current.rotation.x;
          targetRotation.current.y = groupRef.current.rotation.y;
          setIsFollowingMouse(true);
        }

        // Smoothly interpolate towards the target rotation
        const damping = 0.1; // Adjust damping factor for smoothness
        groupRef.current.rotation.x +=
          (targetRotation.current.x - groupRef.current.rotation.x) * damping;
        groupRef.current.rotation.y +=
          (targetRotation.current.y - groupRef.current.rotation.y) * damping;
      } else {
        if (isFollowingMouse) {
          setIsFollowingMouse(false);
          setInitialRotation(null);
          setInitialMousePosition(null);
        }
        if (rotationSpeed.current < DEFAULT_ROTATION_SPEED) {
          rotationSpeed.current += DEFAULT_DAMPING;
        }
        groupRef.current.rotation.y += rotationSpeed.current;
      }
    }
  });

  return (
    <Float
      speed={2.5}
      rotationIntensity={2}
      floatIntensity={1}
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
