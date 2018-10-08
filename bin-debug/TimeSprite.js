var TimeSprite = (function (_super) {
    __extends(TimeSprite, _super);
    function TimeSprite() {
        _super.call(this);
        this.timeManager = new TimeManager();
        var bg = new egret.Bitmap(RES.getRes("images.timepanelbg"));
        this.addChild(bg);
        this.text = new egret.TextField();
        this.text.multiline = false;
        this.text.wordWrap = false;
        this.text.fontFamily = GlobalModel.font;
        this.text.bold = true;
        this.text.size = 19;
        this.text.textColor = 0x000000;
        this.text.text = String(GlobalModel.startTime);
        this.text.x = (this.width - this.text.width) / 2 + 10;
        this.text.y = !egret.Capabilities.isMobile ? 13 : 7;
        this.addChild(this.text);
        this.addChild(this.timeManager);
    }
    var d = __define,c=TimeSprite,p=c.prototype;
    p.refreshTime = function (time, innerTime) {
        this.text.text = time;
        GlobalModel.playTime += innerTime;
    };
    ;
    p.timeEnd = function () {
        GlobalModel.isTimeEnd = true;
        this.timeManager.stopTime();
        if (this.timeEndFunction)
            this.timeEndFunction.call(this.thisObj);
    };
    ;
    p.stopTime = function () {
        this.timeManager.stopTime();
    };
    ;
    p.resume = function () {
        this.timeManager.resumeTime();
    };
    ;
    p.start = function (timeEndFunc, thisParam) {
        this.timeEndFunction = timeEndFunc;
        this.thisObj = thisParam;
        this.timeManager.refresh(GlobalModel.startTime, false, TimeManager.SECOND, this.refreshTime, this.timeEnd, this);
    };
    return TimeSprite;
}(egret.DisplayObjectContainer));
egret.registerClass(TimeSprite,'TimeSprite');
