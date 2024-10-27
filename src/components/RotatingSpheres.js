// RotatingSpheres.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';

const RotatingSphere = ({ position, color, label, onClick }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01; // Rotate around Y-axis
      meshRef.current.rotation.x += 0.005; // Rotate around X-axis
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color={color} />
      </Sphere>
      <Html distanceFactor={10}>
        <div style={{ color: 'white', textAlign: 'center' }}>{label}</div>
      </Html>
    </mesh>
  );
};

const RotatingSpheres = ({ onSphereClick }) => {
  const spheres = [
    { position: [-3, 0, 0], color: 'hotpink', label: 'Design' },
    { position: [0, 0, 0], color: 'skyblue', label: 'Development' },
    { position: [3, 0, 0], color: 'limegreen', label: 'IT' },
  ];

  return (
    <Canvas
      style={{ height: '400px', width: '100%' }}
      camera={{ position: [0, 0, 10], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {spheres.map((sphere, index) => (
        <RotatingSphere
          key={index}
          position={sphere.position}
          color={sphere.color}
          label={sphere.label}
          onClick={() => onSphereClick(sphere.label)}
        />
      ))}
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default RotatingSpheres;
