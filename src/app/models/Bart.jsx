import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";

export default function Model(props) {

  const bartRef = useRef()
  const { scene, animations } = useGLTF('./models/bart_simpson.glb')
  const { actions, mixer } = useAnimations(animations, bartRef);

  useFrame((_, delta) => {
    if (props.isRotating) {
      bartRef.current.rotation.y -= 0.75 * delta; // Adjust the rotation speed as needed
    }
  });

  // console.log(actions)
  useEffect(() => {
    actions['mixamo.com'].play();
  }, [mixer]);

  return (
    <>
    <pointLight position={[2, 2, 5]} intensity={5} />
    <mesh ref={bartRef} {...props}>
      <primitive object={scene} />
    </mesh>
    </>
  )
}
