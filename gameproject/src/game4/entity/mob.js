/*
import { Object3D } from 'three';
//import Ai from '../control/ai';
import { createRigidBodyEntity } from '../tool/function';

export default class Mob extends Object3D {
    constructor(mesh, position, physic) {
        super();
        this.mesh = mesh;
        this.position.copy(position);
        this.physic = physic;
        //this.ai = new Ai(4, position);

        // Añade el mesh a este Object3D
        this.add(mesh);

        // Inicializa físicas si es necesario
        const { rigidBody, collider } = createRigidBodyEntity(this.position, physic);
        this.rigidBody = rigidBody;
        this.collider = collider;
    }
}
    

    update(dt, player) {
        // Aquí utilizas tu lógica de AI para actualizar la posición/estado del mob
        this.ai.compute(dt, player, this.position);

        // Aplica la lógica de movimiento basada en la AI
        if (this.ai.moving) {
            this.position.add(this.ai.axis.clone().multiplyScalar(dt * VELOCIDAD_MOVIMIENTO));
        }

        if (this.ai.attack) {
            this.performAttack();
        }
    }
}

*/
