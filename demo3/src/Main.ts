
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
        var stageWidth = this.stage.stageWidth;
        this._content.width = stageWidth*2;

        this.addChild(this._content);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);

    }

    private onTouch(e:egret.TouchEvent):void{
        var startX = e.localX;

        var that = this;
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,onTouchMove,this);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_END,onTouchEnd,this);


        function onTouchMove(e:egret.TouchEvent){
            var currentX = e.stageX;

            var disX = currentX - startX;

            var stageWidth = that.stage.stageWidth;
            var leftChild = that._content.$children[1];
            var rightChild = that._content.$children[0];

            that._content.x += disX;

            if(disX > 0){
                this.flag = false;

                if(that._content.x >= 0){
                    leftChild.x = 0;
                    rightChild.x = stageWidth;

                    //不需要这一步清除所有的子元素,因为在上一步移动子元素位置时页面就会自动渲染。
                    // that._content.removeChildren();

                    that._content.addChild(leftChild);
                    that._content.addChild(rightChild);

                    that._content.x = -stageWidth;
                }
            }else{
                this.flag = true;
                if(that._content.x <= -stageWidth){
                    leftChild.x = 0;
                    rightChild.x = stageWidth;

                    // that._content.removeChildren();

                    that._content.addChild(leftChild);
                    that._content.addChild(rightChild);

                    that._content.x = 0;
                }
            }

            startX = currentX;
        }

        function onTouchEnd(e:egret.TouchEvent){
            that.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,onTouchMove,that);
            that.stage.removeEventListener(egret.TouchEvent.TOUCH_END,onTouchEnd,that);

            if(that.flag){
                egret.Tween.get(that._content).to({'x':-that.stage.stageWidth},1000,egret.Ease.backInOut);
            }else{
                egret.Tween.get(that._content).to({'x':0},1000,egret.Ease.backInOut);
            }
        }
    }
}
