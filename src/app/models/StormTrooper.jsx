import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";

export default function Model(props) {

  const stormTropperRef = useRef()
  const { scene, animations } = useGLTF('./models/dancing_stormtrooper.glb')
  const { actions, mixer } = useAnimations(animations, stormTropperRef);

  useFrame((_, delta) => {
    if (props.isRotating) {
      stormTropperRef.current.rotation.y += 0.75 * delta; // Adjust the rotation speed as needed
    }
  });

  // console.log(actions)
  useEffect(() => {
    actions['mixamo.com'].play();
  }, [mixer]);

  return (
    <>
    <pointLight position={[2, 0, 5]} intensity={60} />
    <mesh ref={stormTropperRef} {...props}>
      <primitive object={scene} />
    </mesh>
    </>
  )
}
