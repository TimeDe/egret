
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

        // this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);

    }

    private onClick(e:egret.TouchEvent):void{
        
       
    }
}
