var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var content = (function (_super) {
    __extends(content, _super);
    function content() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    content.prototype.onAddToStage = function (e) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        RES.loadGroup("preload");
    };
    content.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    content.prototype.onGroupComplete = function () {
        var stageWidth = this.stage.stageWidth;
        var img = this.createBitmapByName("bg_jpg");
        this.addChild(img);
        var pic = this.createBitmapByName("pic_jpg");
        pic.x = stageWidth;
        this.addChild(pic);
    };
    return content;
}(egret.DisplayObjectContainer));
__reflect(content.prototype, "content");
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this._content = new content();
        _this.flag = true;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.start, _this);
        return _this;
    }
    Main.prototype.start = function () {
        // var _content:content = new content();
        var stageWidth = this.stage.stageWidth;
        this._content.width = stageWidth * 2;
        this.addChild(this._content);
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
    };
    Main.prototype.onClick = function (e) {
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map