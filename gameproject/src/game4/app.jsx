import React, { useEffect, useRef } from 'react';
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, BoxGeometry, PointLight, MeshPhongMaterial } from 'three'
import './style.css';
import * as THREE from 'three';
import Camera from './engine/camera';
import Light from './engine/light';
import Graphic from './engine/graphic';
import World from './entity/world';
import Player from './entity/player';
//import Mob from './entity/mob';
import { loadWorld, loadEntity } from './tool/loader';
import physic from './engine/physic';

const GameApp = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const init = async () => {
            const assetW = await loadWorld('/game_assets/world0.glb');
            const assetP = await loadEntity('/game_assets/character.glb');
            //const assetM = await loadMob('/game_assets/mob.glb');

            const scene = new THREE.Scene();
            const camera = new Camera();
            const world = new World(assetW.visuals, assetW.colliders, physic);
            const player = new Player(assetP, physic);
            //const mobPosition = new THREE.Vector3(0, 0, 5);
            //const mob = new Mob(assetM, mobPosition, physic);
            const light = new Light();

            scene.add(world);
            scene.add(light);
            scene.add(player);
            //scene.add(mob);

            const graphic = new Graphic(scene, camera, canvasRef.current);
            graphic.onUpdate((dt) => {
                physic.step();
                player.update(dt);
                //mob.update(dt, player);
                camera.update(player);
                light.update(player);
            });
        };

        init();
    }, []);

    return <canvas ref={canvasRef}></canvas>;
};

export default GameApp;
