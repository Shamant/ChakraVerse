'use client';

import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls, Sparkles, Trail, Float, Text } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

// Enhanced chakra data with more properties
const chakraData = [
  { color: "#FF3C3C", hoverColor: "#FF6E6E", y: -3, name: "Muladhara", symbol: "●", frequency: 432, description: "Root" },
  { color: "#FF9933", hoverColor: "#FFB366", y: -2, name: "Svadhisthana", symbol: "◐", frequency: 480, description: "Sacral" },
  { color: "#FFD700", hoverColor: "#FFEB99", y: -1, name: "Manipura", symbol: "▲", frequency: 528, description: "Solar Plexus" },
  { color: "#00FF88", hoverColor: "#66FFAD", y: 0, name: "Anahata", symbol: "✧", frequency: 594, description: "Heart" },
  { color: "#00BFFF", hoverColor: "#66D9FF", y: 1, name: "Vishuddha", symbol: "○", frequency: 672, description: "Throat" },
  { color: "#8A2BE2", hoverColor: "#A35FE8", y: 2, name: "Ajna", symbol: "◎", frequency: 720, description: "Third Eye" },
  { color: "#E6E6FA", hoverColor: "#FFFFFF", y: 3, name: "Sahasrara", symbol: "☸", frequency: 768, description: "Crown" },
];

// Orbital particles that circle around each chakra
const OrbitalParticles = ({ radius, y, color, count = 8 }: { radius: number, y: number, color: string, count?: number }) => {
  const particlesRef = useRef<THREE.Group>(null);
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (i / count) * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.3,
      radius: radius + Math.random() * 0.1,
      size: 0.02 + Math.random() * 0.03
    }));
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    
    const time = clock.getElapsedTime();
    particlesRef.current.children.forEach((particle, i) => {
      const data = particles[i];
      const angle = data.angle + time * data.speed;
      particle.position.x = Math.cos(angle) * data.radius;
      particle.position.z = Math.sin(angle) * data.radius;
    });
  });

  return (
    <group ref={particlesRef} position={[0, y, 0]}>
      {particles.map(particle => (
        <mesh key={particle.id} position={[particle.radius, 0, 0]}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
};

// Interface for ChakraSphere props
interface ChakraSphereProps {
  color: string;
  hoverColor: string;
  y: number;
  name: string;
  symbol: string;
  description: string;
  frequency: number;
}

// Enhanced chakra sphere component
const ChakraSphere = ({ color, hoverColor, y, name, symbol, description, frequency }: ChakraSphereProps) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  
  // Handle hover state
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    
    // Show label after short delay to prevent flickering
    if (hovered) {
      const timer = setTimeout(() => setShowLabel(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowLabel(false);
    }
  }, [hovered]);

  // Animation for pulsing effect
  useFrame(({ clock }) => {
    if (!sphereRef.current || !glowRef.current) return;
    
    const time = clock.getElapsedTime();
    const frequency = y + 4; // Derive unique frequency from position
    
    // Base pulse with unique frequency per chakra
    const pulse = 1 + Math.sin(time * 0.5 + frequency) * 0.1;
    sphereRef.current.scale.set(pulse, pulse, pulse);
    
    // Control emissive intensity
    if (sphereRef.current.material) {
      if (Array.isArray(sphereRef.current.material)) {
        // Handle material array case
        if (sphereRef.current.material[0] instanceof THREE.MeshStandardMaterial) {
          sphereRef.current.material[0].emissiveIntensity = 0.7 + 0.5 * Math.sin(time * 0.5 + frequency);
          sphereRef.current.material[0].emissive = new THREE.Color(hovered ? hoverColor : color);
        }
      } else if (sphereRef.current.material instanceof THREE.MeshStandardMaterial) {
        // Handle single material case
        sphereRef.current.material.emissiveIntensity = 0.7 + 0.5 * Math.sin(time * 0.5 + frequency);
        sphereRef.current.material.emissive = new THREE.Color(hovered ? hoverColor : color);
      }
    }
    
    // Glow effect animation
    const glowScale = 1.2 + Math.sin(time * 0.4 + frequency) * 0.1;
    glowRef.current.scale.set(glowScale, glowScale, glowScale);
    
    // Subtle rotation
    sphereRef.current.rotation.y += 0.002;
    sphereRef.current.rotation.x += 0.001;
  });
  
  return (
    <group
      position={[0, y, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main chakra sphere */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Trail
          width={1}
          color={color}
          length={5}
          decay={1}
          local={false}
          stride={0}
          interval={1}
          attenuation={(width) => width * 0.5}
        >
          <mesh 
            ref={sphereRef}
          >
            <sphereGeometry args={[0.4, 64, 64]} />
            <meshStandardMaterial
              color={hovered ? hoverColor : color}
              emissive={new THREE.Color(color)}
              roughness={0.1}
              metalness={0.3}
              transparent={true}
              opacity={0.9}
            />
          </mesh>
        </Trail>
      </Float>
      
      {/* Subtle glow effect around the sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent={true}
          opacity={0.15}
        />
      </mesh>
      
      {/* Orbital particles */}
      <OrbitalParticles radius={0.7} y={0} color={color} count={Math.floor(5 + y + 3)} />
      
      {/* Sanskrit symbol */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {symbol}
      </Text>
      
      {/* Hover information */}
      {showLabel && (
        <group position={[1.2, 0, 0]}>
          <Text
            position={[0, 0.2, 0]}
            fontSize={0.15}
            color="white"
            anchorX="left"
            anchorY="middle"
            maxWidth={2}
          >
            {name}
          </Text>
          <Text
            position={[0, 0, 0]}
            fontSize={0.12}
            color="#cccccc"
            anchorX="left"
            anchorY="middle"
            maxWidth={2}
          >
            {description}
          </Text>
          <Text
            position={[0, -0.2, 0]}
            fontSize={0.1}
            color="#aaaaaa"
            anchorX="left"
            anchorY="middle"
          >
            {frequency}Hz
          </Text>
        </group>
      )}
    </group>
  );
};

// Enhanced energy line connecting chakras
const EnergyLine = () => {
  // Fix the ref type to be a proper THREE.Line
  const lineRef = useRef<THREE.Line>(null);
  
  // Store original points for animation
  const originalPointsRef = useRef<Float32Array | null>(null);
  
  useFrame(({ clock }) => {
    if (!lineRef.current || !originalPointsRef.current) return;
    
    // Access geometry and position attributes safely
    const positionAttr = lineRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    if (!positionAttr) return;
    
    // Apply a subtle wave effect
    const time = clock.getElapsedTime();
    const posArray = positionAttr.array as Float32Array;
    const origPoints = originalPointsRef.current;
    
    for (let i = 0; i < posArray.length; i += 3) {
      if (i < origPoints.length) {
        // Only affect x coordinates (index % 3 === 0)
        if (i % 3 === 0) {
          posArray[i] = origPoints[i] + Math.sin(time + i * 0.1) * 0.05;
        }
      }
    }
    
    positionAttr.needsUpdate = true;
  });
  
  // Create a curved line through the chakra points
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      chakraData.map(({ y }) => new THREE.Vector3(0, y, 0))
    );
    return curve.getPoints(100);
  }, []);
  
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
    // Store original points for animation reference
    const origPoints = new Float32Array(points.length * 3);
    points.forEach((point, i) => {
      origPoints[i * 3] = point.x;
      origPoints[i * 3 + 1] = point.y;
      origPoints[i * 3 + 2] = point.z;
    });
    
    originalPointsRef.current = origPoints;
    
    return geometry;
  }, [points]);
  
  return (
    <line>
      <lineDashedMaterial
        color="#ffffff"
        transparent
        opacity={0.3}
        dashSize={0.1}
        gapSize={0.05}
      />
    </line>
  );
};

// Background energy field
const EnergyField = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.getElapsedTime();
    meshRef.current.rotation.z = time * 0.05;
    
    // Handle material directly with proper type checking
    const material = meshRef.current.material;
    if (material instanceof THREE.Material && 'opacity' in material) {
      material.opacity = 0.05 + Math.sin(time * 0.2) * 0.02;
    }
  });
  
  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
      <torusGeometry args={[5, 3, 16, 100]} />
      <meshBasicMaterial 
        color="#6633ff" 
        transparent 
        opacity={0.05} 
        wireframe 
      />
    </mesh>
  );
};

// Main background component
const ChakraBackground = () => {
  // Get the viewport size for responsive adjustments
  const { size } = useThree();
  const isMobile = size.width < 768;
  
  return (
    <>
      {/* Basic lighting setup */}
      <ambientLight intensity={0.2} />
      <pointLight position={[2, 2, 2]} intensity={0.8} />
      <pointLight position={[-2, -2, -2]} intensity={0.5} color="#6633ff" />
      <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} intensity={0.5} color="#ffffff" />
      
      {/* Background elements */}
      <EnergyField />
      
      {/* Chakra spheres */}
      {chakraData.map((chakra, i) => (
        <ChakraSphere 
          key={i} 
          color={chakra.color}
          hoverColor={chakra.hoverColor}
          y={chakra.y} 
          name={chakra.name}
          symbol={chakra.symbol}
          description={chakra.description}
          frequency={chakra.frequency}
        />
      ))}
      
      {/* Energy line connecting chakras */}
      <EnergyLine />
      
      {/* Ambient particles */}
      <Sparkles 
        count={isMobile ? 100 : 200}
        size={1.5}
        scale={10}
        speed={0.3}
        opacity={0.4}
        color="white"
      />
      
      {/* Camera controls */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.2}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
};

// Wrapper component with performance optimizations
const ChakraBackgroundWrapper = () => {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        backgroundColor: "black",
      }}
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 2]} // Optimize for device pixel ratio
    >
      <ChakraBackground />
    </Canvas>
  );
};

export default ChakraBackgroundWrapper;