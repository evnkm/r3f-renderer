import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useResource } from '@react-three/fiber';
import { MeshDiscardMaterial, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Model } from './Model'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function MovingCameraView(props) {
  const cameraRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);
  useFrame(() => {
    if (!cameraRef.current) return;

    const camera = cameraRef.current;
    console.log("EVAN HERE:", camera)
    const delta = 0.01;

    if (isAnimating) {
      camera.position.x += delta;
      camera.position.y += delta;
    }
  });
    const handleAnimationToggle = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 1, 5]} />
  );
}

// function TestCamHelper() {
//   const [ref, camera] = useResource()
//   return (
//     <>
//       <perspectiveCamera
//         ref={ref}
//         aspect={1200 / 600}
//         radius={(1200 + 600) / 4}
//         fov={45}
//         position={[0, 0, 2]}
//         onUpdate={self => self.updateProjectionMatrix()}
//       />
//       {camera && <cameraHelper args={camera} />}
//     </>
//   )

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <OrbitControls />
      <MovingCameraView/>
      <Model />
    </Canvas>
  )
}
