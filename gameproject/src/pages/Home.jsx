import * as THREE from 'three';
import { useEffect, useRef, useState, Suspense, useContext } from 'react';
import Modal from '../components/modal/Modal';
import ImagesContext from '../context/ImagesContext.js';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, Html, Float } from '@react-three/drei';
import { useRoute, useLocation } from 'wouter';
import { easing } from 'maath';
import getUuid from 'uuid-by-string';
import backgroundImage from '../assets/images/background.png';
import { DoubleSide } from 'three';
import { Vignette, EffectComposer, Noise, Bloom } from '@react-three/postprocessing'
import { isMobile } from 'react-device-detect'

const GOLDENRATIO = 1.61803398875

const Home = () => {
  const images = useContext(ImagesContext);
  const [modalOpen, setModalOpen] = useState('');
  const [, setLocation] = useLocation();

  const openModal = (modalName) => setModalOpen(modalName);
  const closeModal = () => setModalOpen('');

  return (
    <>
      <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
        <color attach="background" args={['#24172F']} />

        <group position={[0, -0.5, 0]}>
          <Frames images={images} openModal={openModal} setLocation={setLocation} />
          <Suspense fallback={null}>
            <CustomBackground />
          </Suspense>
          <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[8, 20]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={15}
              roughness={0.99}
              depthScale={1.1}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.3}
              color="#211727"
              metalness={0.8}
            />
          </mesh>
        </group>

        <EffectComposer>
          <Vignette offset={0.5} darkness={0.7} premultiply />
          <Noise premultiply />
          <Bloom mipmapBlur intensity={0.6} luminanceThreshold={0.9} />
        </EffectComposer>

        <CustomTexts />
        <Environment preset="city" />
      </Canvas>

      <Modal isOpen={modalOpen === 'login'} close={closeModal}>
        {/* Contenido del modal de login */}
      </Modal>

      <Modal isOpen={modalOpen === 'juego2'} close={closeModal}>
        <p>Información </p>
        <button className="modal-button" onClick={() => setLocation('/juego2')}>Ir al Juego</button>
      </Modal>

      <Modal isOpen={modalOpen === 'juego3'} close={closeModal}>
        <p>Información </p>
        <button className="modal-button" onClick={() => setLocation('/juego3')}>Ir al Juego</button>
      </Modal>

      <Modal isOpen={modalOpen === 'juego1'} close={closeModal}>
        <p>Información</p>
      </Modal>
    </>

  );
};

function Frames({ images, openModal, setLocation, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2 + 0.15, isMobile ? 2.4 : 1.3))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0.6, isMobile ? 9 : 4.5)
      q.identity()
    }
  })
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    easing.dampQ(state.camera.quaternion, q, 0.4, dt)
  })
  return (
    <>
      <group
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        onPointerMissed={() => setLocation('/')}>
        {images.map((props) => <Frame key={props.url} {...props} openModal={openModal} setLocation={setLocation} /> /* prettier-ignore */)}
      </group>
    </>
  );
};


function Frame({ url, item, openModal, c = new THREE.Color(), ...props }) {
  const image = useRef()
  const frame = useRef()
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const name = getUuid(url)

  const handleClick = (e) => {
    e.stopPropagation();
    if (item === 'juego2') {
      openModal('juego2');
    } else if (item === 'juego3') {
      openModal('juego3');
    } else if (item === 'login') {
      openModal('login');
    } else if (item === 'juego1') {
      openModal('juego1');
    }
  };


  const isActive = params?.id === name
  useCursor(hovered)
  useFrame((state, dt) => {
    image.current.material.zoom = 0.9 - Math.sin(rnd * 10000 + state.clock.elapsedTime / 8) / 10.5
    easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
    easing.dampC(frame.current.material.color, hovered ? 'yellow' : 'violet', 0.1, dt)
  })
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        onClick={handleClick}
        scale={[1.5, 1.8, 0.15]}
        position={[0, 0.95, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
        <Html scale={0.17} rotation={[0, 0, 0]} position={[0, 0.4, 0]} transform>

        </Html>
      </mesh>
    </group>
  )
}



function CustomTexts() {
  return (
    <>
      <Text font="/ARCADE_R.TTF" color={'black'} maxWidth={3} anchorX="center" anchorY="top" position={[0, 3.4, 0]} fontSize={0.15}>

      </Text>
      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={0.3} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.7} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[0.1, -0.3]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Text
          curveRadius={-2.9}
          outlineWidth={0.1}
          outlineColor={'#6699cc'}
          color={'#24172F'}
          font="/ARCADE_R.TTF"
          maxWidth={3}
          anchorX="center"
          anchorY="top"
          position={[0, 3.1, 0]}
          fontSize={0.7}>
          WEAREVR
        </Text>

        <Text
          outlineWidth={0.07}
          outlineColor={'#6699cc'}
          color={'#24172F'}
          font="/ARCADE_R.TTF"
          maxWidth={3}
          anchorX="center"
          anchorY="top"
          position={[0, 1.9, 0]}
          fontSize={0.3}>
          GAMES
        </Text>
      </Float>
      <Text maxWidth={1} anchorX="center" anchorY="top" textAlign="center" position={[0, 0.3, 1]} fontSize={0.1} depthOffset={1}>
        Click on images to view details.
      </Text>
    </>
  );
};

function CustomBackground() {
  const texture = useLoader(THREE.TextureLoader, backgroundImage)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.offset.set(0, 0)
  texture.repeat.set(1, 1)

  return (
    <group>
      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[0.1, -0.3]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <mesh scale={[1, 1, 1]} position={[0, 8.5, 0]}>
          <cylinderGeometry args={[20, 20, isMobile ? 28 : 20, 15, 6, true, 2.1, Math.PI / 1.5]} />
          <meshBasicMaterial side={DoubleSide} map={texture} color="#aa62b3" toneMapped={false} />
        </mesh>
      </Float>
      <mesh scale={[1, 1, 1]} position={[0, 7.5, -6]}>
        <cylinderGeometry args={[18, 18, 20, 15, 6, true, 0, Math.PI * 2]} />
        <meshBasicMaterial side={DoubleSide} map={texture} color="#aa62b3" toneMapped={true} />
      </mesh>
    </group>
  );
};
export default Home;