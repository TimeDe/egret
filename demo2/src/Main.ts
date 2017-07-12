
class content extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }


    private onAddToStage(e:egret.Event){
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
        RES.loadGroup("preload");
    }

    private createBitmapByName(name:string){
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private onGroupComplete(){
        var stageWidth = this.stage.stageWidth;

        var img = this.createBitmapByName("bg_jpg");
        this.addChild(img);

        var pic = this.createBitmapByName("pic_jpg");
        pic.x = stageWidth;
        this.addChild(pic);
    }
}

class Main extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);
    }

    private _content:content = new content();

    private flag:boolean = true;

    private start(){
        // var _content:content = new content();

        var stageWidth = this.stage.stageWidth;
        this._content.width = stageWidth*2;

        this.addChild(this._content);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);

    }

    private onClick(e:egret.TouchEvent):void{
        var stageWidth = this.stage.stageWidth;
        var posX = e.localX;

        var leftChild = this._content.$children[1];
        var rightChild = this._content.$children[0];

        if(posX >= stageWidth/2){
            if(this._content.x == 0){
                leftChild.x = 0;
                rightChild.x = stageWidth;

                this._content.removeChildren();

                this._content.addChild(leftChild);

                this._content.addChild(rightChild);
                this._content.x = -stageWidth;
            }

            this.goRight();
        }else{
            if(this._content.x == -stageWidth){
                leftChild.x = 0;
                rightChild.x = stageWidth;

                this._content.removeChildren();

                this._content.addChild(leftChild);

                this._content.addChild(rightChild);
                this._content.x = 0;
            }

            this.goLeft();
        }

       
    }

    private goLeft(){
        var stageWidth = this.stage.stageWidth;
         if(this.flag){
            this.flag = false;
            egret.Tween
                .get(this._content)
                .to({'x':-stageWidth},1000,egret.Ease.backInOut)
                // .to({'x':0},1000,egret.Ease.backInOut)
                .call(this.onComplete,this);
        }
    }


    private goRight(){
        var stageWidth = this.stage.stageWidth;
         if(this.flag){
            this.flag = false;
            egret.Tween
                .get(this._content)
                .to({'x':0},1000,egret.Ease.backInOut)
                // .to({'x':0},1000,egret.Ease.backInOut)
                .call(this.onComplete2,this);
        }
    }

    private onComplete(){
        // console.log(this._content.x);
        var stageWidth = this.stage.stageWidth;
        var leftChild = this._content.$children[1];
        var rightChild = this._content.$children[0];

        leftChild.x = 0;
        rightChild.x = stageWidth;

        this._content.removeChildren();

        this._content.addChild(leftChild);

        this._content.addChild(rightChild);
        this._content.x = 0;

        this.flag = true;
    }

    private onComplete2(){
        // console.log(this._content.x);
        var stageWidth = this.stage.stageWidth;
        var leftChild = this._content.$children[1];
        var rightChild = this._content.$children[0];

        leftChild.x = 0;
        rightChild.x = stageWidth;

        this._content.removeChildren();

        this._content.addChild(leftChild);

        this._content.addChild(rightChild);
        this._content.x = -stageWidth;

        this.flag = true;
    }
}
