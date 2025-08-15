'use client'

import * as THREE from 'three'
import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, RigidBody, BallCollider, RapierRigidBody } from '@react-three/rapier'
import { RoundedBox, Text } from '@react-three/drei'

function LanyardComponent() {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] aspect-square cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 12], fov: 30 }}>
        <ambientLight intensity={Math.PI} />
        <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={[0, 0, 0]}>
            <Badge />
            <Pointer />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}

function Badge() {
  const badge = useRef<RapierRigidBody>(null!)

  useFrame((state, delta) => {
    if (badge.current) {
        const t = state.clock.getElapsedTime()
        badge.current.setNextKinematicTranslation({
            x: Math.sin(t) * 0.1,
            y: Math.cos(t) * 0.1,
            z: 0
        })
        badge.current.setNextKinematicRotation(
            new THREE.Quaternion().setFromEuler(
                new THREE.Euler(Math.sin(t*0.5) * 0.1, Math.cos(t*0.5) * 0.1, 0)
            )
        )
    }
  })
  
  return (
    <RigidBody ref={badge} type="kinematicPosition" colliders={false} linearDamping={4} angularDamping={1} friction={0.1} position={[0, 0, 0]} mass={1}>
        <BallCollider args={[2]} />
        <group>
            <RoundedBox args={[3.2, 4.5, 0.75]} radius={0.4}>
                <meshStandardMaterial color="#2563EB" roughness={0.3} />
            </RoundedBox>
            <Text position={[0, 1.2, 0.4]} fontSize={0.4} color="white"
            >
                Tamil
            </Text>
            <Text position={[0, 0.6, 0.4]} fontSize={0.4} color="white"
            >
                Maran
            </Text>
            <Text position={[0, -0.5, 0.4]} fontSize={0.22} color="#D0D8FF" maxWidth={2.8} textAlign="center" lineHeight={1.2}>
                Full Stack Developer
            </Text>
        </group>
    </RigidBody>
  )
}

function Pointer() {
  const ref = useRef<RapierRigidBody>(null!)
  useFrame(({ pointer, viewport }) => {
    ref.current?.setNextKinematicTranslation({
      x: (pointer.x * viewport.width) / 2,
      y: (pointer.y * viewport.height) / 2,
      z: 0
    })
  })
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders="ball" args={[1]} ref={ref} />
  )
}

export const Lanyard = LanyardComponent;