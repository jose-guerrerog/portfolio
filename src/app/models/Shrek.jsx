import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";

export default function Model(props) {

  const shrekRef = useRef()
  const { scene, animations } = useGLTF('./models/shrek.glb')
  const { actions, mixer } = useAnimations(animations, shrekRef);

  useFrame((_, delta) => {
    if (props.isRotating) {
      shrekRef.current.rotation.y += 0.75 * delta; // Adjust the rotation speed as needed
    }
  });

  // console.log(actions)
  useEffect(() => {
    actions['mixamo.com'].play();
  }, [mixer]);

  return (
    <>
    <pointLight position={[2, 0, 5]} intensity={60} />
    <mesh ref={shrekRef} {...props}>
      <primitive object={scene} />
    </mesh>
    </>
  )
}
