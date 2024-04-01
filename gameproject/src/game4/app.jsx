import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Camera from './engine/camera';
import Light from './engine/light';
import Graphic from './engine/graphic';
import World from './entity/world';
import Player from './entity/player';
import { loadWorld, loadEntity } from './tool/loader';
import physic from './engine/physic';
//import Mob from './entity/mob';

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
            const light = new Light();
            //const mobPosition = new THREE.Vector3(0, 0, 5);
            //const mob = new Mob(assetM, mobPosition, physic);
            

            scene.add(world);
            scene.add(light);
            scene.add(player);
            //scene.add(mob);

            const graphic = new Graphic(scene, camera, canvasRef.current);
            graphic.onUpdate((dt) => {
                physic.step();
                player.update(dt);
                camera.update(player);
                light.update(player);
                //mob.update(dt, player);
            });
        };

        init();
    }, []);

    return <canvas ref={canvasRef}></canvas>;
};

export default GameApp;
