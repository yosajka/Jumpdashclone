import { _decorator, Component, Node, CCFloat, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Obstacle')
export class Obstacle extends Component 
{
    @property({type:CCFloat})
    private speed = 100;

    @property({type:CCFloat})
    private maxSpeed = 1000;

    @property({type:CCFloat}) //to increase difficulty
    private speedIncreaseRate = 0.1;


    start() 
    {

    }

    update(deltaTime: number) 
    {
        let newPosition = new Vec3(this.node.position.x, 
                                   this.node.position.y - this.speed * deltaTime, 
                                   this.node.position.z);

        this.node.position = newPosition;

        if (this.node.position.y < -700) this.node.destroy();
    }
}


