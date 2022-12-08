import { _decorator, Component, Node, CCFloat, CCString, Prefab, Vec2, instantiate, director, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ObstacleSpawner')
export class ObstacleSpawner extends Component 
{

    @property(CCFloat)
    private spawnRate = 0.7; //spawn an obstacle every "spawnRate" seconds

    @property([CCString])
    private obstacleNames = [];

    @property(Prefab)
    private block = null;

    @property(Prefab)
    private bar = null;

    @property(CCFloat)
    private yPosition = 1000;

    @property([CCFloat])
    private blockSpawnPosition = [];

    @property([CCFloat])
    private leftBarSpawnPosition = [];

    @property([CCFloat])
    private rightBarSpawnPosition = [];


    start() 
    {
        this.schedule(function() {
            this.spawn();
        }, this.spawnRate);
        console.log(this.spawnRate);
    }


    spawn()
    {
        let obstacleToSpawn = this.obstacleNames[Math.floor(Math.random() * this.obstacleNames.length)];
        switch(obstacleToSpawn)
        {
            case "block":
                //console.log("spawn block");
                var position = new Vec3(this.getRandom(this.blockSpawnPosition[0], this.blockSpawnPosition[1]), this.yPosition, 0);
                var scene = director.getScene();
                var obstacle = instantiate(this.block);
                obstacle.parent = scene.getChildByName("Canvas");
                obstacle.setPosition(position);
                break;
            
            case "leftBar":
                //console.log("spawn left bar");
                var position = new Vec3(this.getRandom(this.leftBarSpawnPosition[0], this.leftBarSpawnPosition[1]), this.yPosition, 0);
                var scene = director.getScene();
                var obstacle = instantiate(this.bar);
                obstacle.parent = scene.getChildByName("Canvas");
                obstacle.setPosition(position);
                break;

            case "rightBar":
                //console.log("spawn right bar");
                var position = new Vec3(this.getRandom(this.rightBarSpawnPosition[0], this.rightBarSpawnPosition[1]), this.yPosition, 0);
                var scene = director.getScene();
                var obstacle = instantiate(this.bar);
                obstacle.parent = scene.getChildByName("Canvas");
                obstacle.setPosition(position);
                break;   
        }
    }

    getRandom(min: number, max: number) 
    {
        return Math.random() * (max - min + 1) + min;
    }
}


