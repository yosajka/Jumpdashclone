import { _decorator, Component, Node, EventKeyboard, Vec3, input, Input, KeyCode, CCFloat, RichText, AudioSource, Collider2D, Contact2DType, IPhysics2DContact, director, instantiate, Prefab, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BallController')
export class BallController extends Component 
{
    moveRight: boolean;
    isMoving: boolean;
    
    @property({type:CCFloat})
    private speed = 100;

    @property({type:Node})
    private rightPosition = null;

    @property({type:Node})
    private leftPosition = null;

    @property(Node)
    private scoreUI = null;

    @property(Node)
    private bestScoreUI = null;

    @property(Prefab)
    private jumpLeftParticle = null;

    @property(Prefab)
    private jumpRightParticle = null;


    jumpSound:AudioSource;

    currentScore: number;
    
    highScore: string;

    onLoad() 
    {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        this.moveRight = true;
        this.isMoving = false;
        this.currentScore = 0;
        this.jumpSound = this.getComponent(AudioSource);
        this.highScore = sys.localStorage.getItem("highScore");
    }

    start()
    {
        let collider = this.getComponent(Collider2D);
        if (collider)
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }


    update(deltaTime: number) 
    {
        if ( this.isMoving) 
        {
            this.Move(deltaTime);
            
            this.DisplayScore();
        }
        
        let bestScoreText = this.bestScoreUI.getComponent(RichText);
        bestScoreText.string = '<color=#1f0e02>Best: ' + this.highScore + '</color>'
    }

    onKeyDown (event: EventKeyboard)
    {
        if (event.keyCode == KeyCode.SPACE && !this.isMoving)
        {
            this.jumpSound.play();
            this.isMoving = true;
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null)
    {
        console.log("contact");
        if (this.currentScore > Number(this.highScore))
            sys.localStorage.setItem("highScore", this.currentScore.toString());
        director.loadScene("Main");
    }

    Move(deltaTime: number) 
    {
        
        if (this.moveRight)
        {
            //console.log("Moving right");
            let position = this.node.position;
            let newPosition = new Vec3(position.x + this.speed * deltaTime, position.y, position.z);
            

            if (newPosition.x >= this.rightPosition.position.x)
            {
                newPosition.x = this.rightPosition.position.x;
                this.isMoving = false;
                this.moveRight = false;
                this.currentScore += 1;
                this.SpawnJumpParticle(this.jumpRightParticle);
            }

            this.node.position = newPosition;
            
        }

        else
        {
            //console.log("Moving left");
            let position = this.node.position;
            let newPosition = new Vec3(position.x - this.speed * deltaTime, position.y, position.z);
            

            if (newPosition.x <= this.leftPosition.position.x)
            {
                newPosition.x = this.leftPosition.position.x;
                this.isMoving = false;
                this.moveRight = true;
                this.currentScore += 1;
                this.SpawnJumpParticle(this.jumpLeftParticle);
            }

            this.node.position = newPosition;
        }
    }

    DisplayScore()
    {
        let scoreText = this.scoreUI.getComponent(RichText);
        if (this.currentScore >= 999) this.currentScore = 999;

        if (this.currentScore >= 100)
            scoreText.string = '<color=#1f0e02><size=320>' + this.currentScore.toString() + '</size></color>';
        else
            scoreText.string = '<color=#1f0e02><size=400>' + this.currentScore.toString() + '</size></color>';
        
    }

    SpawnJumpParticle(particle: Prefab)
    {
        var scene = director.getScene();
        var jumpParticle = instantiate(particle);
        jumpParticle.parent = scene.getChildByName("Canvas");
        jumpParticle.setPosition(this.node.position);
    }


}


