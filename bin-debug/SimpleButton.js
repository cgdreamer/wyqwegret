var SimpleButton = (function (_super) {
    __extends(SimpleButton, _super);
    function SimpleButton(up, down, disenable, isClip, hitArea) {
        if (down === void 0) { down = ""; }
        if (disenable === void 0) { disenable = ""; }
        if (isClip === void 0) { isClip = false; }
        if (hitArea === void 0) { hitArea = null; }
        _super.call(this);
        this.upbit = null;
        this.downbit = null;
        this.disenablebit = null;
        this.currentState = 1;
        this._enable = true;
        this.touchEnabled = true;
        this.isClip = isClip;
        this.init(up, down, disenable, hitArea);
    }
    var d = __define,c=SimpleButton,p=c.prototype;
    d(p, "enable"
        ,function () {
            return this._enable;
        }
        ,function (value) {
            this._enable = value;
            if (this.hitAreaObj) {
                this.hitAreaObj.touchEnabled = value;
            }
            else {
                this.touchEnabled = value;
            }
            if (this.disenablebit != null) {
                this.disenablebit.visible = !value;
                this.upbit.visible = value;
                if (this.downbit != null) {
                    this.downbit.visible = false;
                }
            }
        }
    );
    p.init = function (up, down, disenable, hitArea) {
        if (down === void 0) { down = ""; }
        if (disenable === void 0) { disenable = ""; }
        if (hitArea === void 0) { hitArea = null; }
        var txtr;
        txtr = RES.getRes(up);
        this.upbit = new egret.Bitmap(txtr);
        if (down != "") {
            txtr = RES.getRes(down);
            this.downbit = new egret.Bitmap(txtr);
            this.addChild(this.downbit);
            this.downbit.visible = false;
        }
        if (disenable != "") {
            txtr = RES.getRes(disenable);
            this.disenablebit = new egret.Bitmap(txtr);
            this.addChild(this.disenablebit);
            this.disenablebit.visible = false;
        }
        this.addChild(this.upbit);
        if (hitArea) {
            this.hitAreaObj = new egret.Shape();
            this.hitAreaObj.graphics.beginFill(0x000000, 0);
            this.hitAreaObj.graphics.drawRect(hitArea.x, hitArea.y, hitArea.width, hitArea.height);
            this.hitAreaObj.graphics.endFill();
            this.hitAreaObj.touchEnabled = true;
            this.touchEnabled = false;
            this.addChild(this.hitAreaObj);
            this.hitAreaObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.hitAreaObj.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.hitAreaObj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        }
        else {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        }
    };
    p.onTouchBegin = function (e) {
        if (!this._enable)
            return;
        if (!this.isClip) {
            if (this.downbit != null) {
                this.downbit.visible = true;
                this.upbit.visible = false;
            }
        }
        else {
            if (this.downbit != null) {
                this.downbit.visible = !this.downbit.visible;
                this.upbit.visible = !this.downbit.visible;
                this.currentState = this.downbit.visible ? 2 : 1;
                if (this.changeState != null) {
                    this.changeState(this.currentState);
                }
            }
        }
    };
    p.onTouchEnd = function (e) {
        if (!this._enable)
            return;
        if (!this.isClip) {
            if (this.downbit != null) {
                this.upbit.visible = true;
                this.downbit.visible = false;
            }
        }
    };
    p.destroy = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        this.upbit = null;
        this.downbit = null;
        this.disenablebit = null;
    };
    return SimpleButton;
}(egret.DisplayObjectContainer));
egret.registerClass(SimpleButton,'SimpleButton');
