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
        var stageWidth = this.stage.stageWidth;
        this._content.width = stageWidth * 2;
        this.addChild(this._content);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
    };
    Main.prototype.onTouch = function (e) {
        var startX = e.localX;
        var that = this;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, onTouchEnd, this);
        function onTouchMove(e) {
            var currentX = e.stageX;
            var disX = currentX - startX;
            var stageWidth = that.stage.stageWidth;
            var leftChild = that._content.$children[1];
            var rightChild = that._content.$children[0];
            that._content.x += disX;
            if (disX > 0) {
                this.flag = false;
                if (that._content.x >= 0) {
                    leftChild.x = 0;
                    rightChild.x = stageWidth;
                    //不需要这一步清除所有的子元素,因为在上一步移动子元素位置时页面就会自动渲染。
                    // that._content.removeChildren();
                    that._content.addChild(leftChild);
                    that._content.addChild(rightChild);
                    that._content.x = -stageWidth;
                }
            }
            else {
                this.flag = true;
                if (that._content.x <= -stageWidth) {
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
        function onTouchEnd(e) {
            that.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onTouchMove, that);
            that.stage.removeEventListener(egret.TouchEvent.TOUCH_END, onTouchEnd, that);
            if (that.flag) {
                egret.Tween.get(that._content).to({ 'x': -that.stage.stageWidth }, 1000, egret.Ease.backInOut);
            }
            else {
                egret.Tween.get(that._content).to({ 'x': 0 }, 1000, egret.Ease.backInOut);
            }
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map