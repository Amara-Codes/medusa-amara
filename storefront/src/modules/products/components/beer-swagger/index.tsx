"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { Group } from "three";

// Tipizza i nodi del file GLTF
type GLTFResult = {
  nodes: {
    cylinder: THREE.Mesh;
    cylinder_1: THREE.Mesh;
    Tab: THREE.Mesh;
  };
} & THREE.Object3D;

export type BeerSwaggerProps = {
  urlImg: string;
  scale?: number;
};

const DEFAULT_ROTATION_SPEED = 0.03;
const DEFAULT_DAMPING = 0.0002;

export function BeerSwagger({ urlImg, scale = 1.5 }: BeerSwaggerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    // Rileva se il dispositivo è touchscreen
    isTouchDevice.current = window.matchMedia("(pointer: coarse)").matches;
  }, []);

  const handleMouseEnter = () => {
    if (!isTouchDevice.current) setIsHovered(true); // Abilita solo se non è touchscreen
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice.current) setIsHovered(false); // Abilita solo se non è touchscreen
  };

  const handleTouch = () => {
    if (isTouchDevice.current) setIsPaused((prev) => !prev); // Abilita solo su touchscreen
  };

  return (
    <Canvas
      style={{
        position: "absolute",
        left: "50%",
        top: "75%",
        transform: "translate(-50%, -50%)",
        overflow: "hidden",
        pointerEvents: "auto",
        zIndex: 30,
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
      <ambientLight intensity={15} color={"#fffafa"} />
      <directionalLight position={[5, -5, 5]} intensity={2} castShadow />
      <directionalLight position={[-5, 5, 5]} intensity={2} castShadow />
      <Scene urlImg={urlImg} scale={scale} isHovered={isHovered} isPaused={isPaused} />
    </Canvas>
  );
}


type SceneProps = {
  urlImg: string;
  scale: number;
  isHovered: boolean;
  isPaused: boolean;
};

function Scene({ urlImg, scale, isHovered, isPaused }: SceneProps) {
  const { nodes } = useGLTF("/Beer-can.gltf") as unknown as GLTFResult;
  const label = useTexture(urlImg ?? "/images/beer-swagger/label-placeholder.png");
  label.flipY = false;

  const groupRef = useRef<Group>(null);
  const rotationSpeed = useRef(DEFAULT_ROTATION_SPEED);
  const [isFollowingMouse, setIsFollowingMouse] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [initialRotation, setInitialRotation] = useState<{ x: number; y: number } | null>(null);

  // Attiva il movimento di rotazione su spostamento mouse
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (initialMousePosition && initialRotation && groupRef.current) {
        const deltaX = (event.clientX - initialMousePosition.x) / window.innerWidth;
        const deltaY = (event.clientY - initialMousePosition.y) / window.innerHeight;
  
        groupRef.current.rotation.x = initialRotation.x + deltaY * Math.PI * 0.2;
        groupRef.current.rotation.y = initialRotation.y + deltaX * Math.PI * 0.4;
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
        // Se è in pausa, non cambia rotazione
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
          setInitialMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
          setIsFollowingMouse(true);
        }
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

  const metalMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.5,
    metalness: 0.9,
    color: "#bbbbbb",
  });

  return (
    <Float
      speed={2.5}
      rotationIntensity={1.2}
      floatIntensity={1.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group
        ref={groupRef}
        dispose={null}
        scale={scale}
        rotation={[0, -Math.PI, 0]}
        position={[0, 0.5, 0]}
      >
        <mesh castShadow receiveShadow geometry={nodes.cylinder.geometry} material={metalMaterial} />
        <mesh castShadow receiveShadow geometry={nodes.cylinder_1.geometry}>
          <meshStandardMaterial roughness={0.3} metalness={0.9} map={label} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Tab.geometry} material={metalMaterial} />
      </group>
    </Float>
  );
}
