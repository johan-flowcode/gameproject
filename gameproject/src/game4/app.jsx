import React, { useEffect, useRef } from 'react';
import {Scene, PerspectiveCamera, WebGLRenderer, Mesh, BoxGeometry, PointLight, MeshPhongMaterial} from 'three'
import './style.css'; 
import * as THREE from 'three';
import Camera from './engine/camera';
import Light from './engine/light';
import Graphic from './engine/graphic';
import World from './entity/world';
import Player from './entity/player';
import { loadWorld, loadEntity } from './tool/loader';
import physic from './engine/physic';

const GameApp = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const init = async () => {
            const assetW = await loadWorld('/game_assets/world0.glb');
            const assetP = await loadEntity('/game_assets/character.glb');

            const scene = new THREE.Scene();
            const camera = new Camera();
            const world = new World(assetW.visuals, assetW.colliders, physic);
            const player = new Player(assetP, physic);
            const light = new Light();

            scene.add(world);
            scene.add(light);
            scene.add(player);

            const graphic = new Graphic(scene, camera, canvasRef.current); 
            graphic.onUpdate((dt) => {
                physic.step();
                player.update(dt);
                camera.update(player);
                light.update(player);
            });
        };

        init();
    }, []);

    return <canvas ref={canvasRef}></canvas>;
};

export default GameApp;
