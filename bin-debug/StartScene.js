var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        _super.call(this);
        this.clouds = new Array();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/StartSceneSkin.exml";
    }
    var d = __define,c=StartScene,p=c.prototype;
    p.createUI = function () {
        var cloud1 = new egret.Bitmap(RES.getRes("images.cloud"));
        cloud1.x = -cloud1.width;
        cloud1.y = (this.height - cloud1.width) / 2 + 60;
        this.cloudsContainer.addChild(cloud1);
        this.clouds.push([cloud1, 1.3]);
        var cloud2 = new egret.Bitmap(RES.getRes("images.cloud2"));
        cloud2.x = -cloud2.width;
        cloud2.y = (this.height - cloud2.width) / 2 + 98;
        this.cloudsContainer.addChild(cloud2);
        this.clouds.push([cloud2, 0.8]);
        var cloud3 = new egret.Bitmap(RES.getRes("images.cloud3"));
        cloud3.x = -cloud3.width;
        cloud3.y = (this.height - cloud3.width) / 2 + 38;
        this.cloudsContainer.addChild(cloud3);
        this.clouds.push([cloud3, 0.6]);
        this.cloudsInterval = egret.setInterval(this.cloudsMoving, this, 50);
        var startBtn = new SimpleButton("images.startbtnup", "images.startbtnover");
        startBtn.x = 548;
        startBtn.y = 378;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) { GlobalModel.main.changeToSceneByName("PlayScene"); }, this);
        this.addChild(startBtn);
        this.introSprite = new GameIntroSprite();
        var gameIntroButton = new SimpleButton("images.gameintrobtnup", "images.gameintrobtnover");
        gameIntroButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) { this.addChild(this.introSprite); }, this);
        gameIntroButton.x = 218;
        gameIntroButton.y = 378;
        this.addChild(gameIntroButton);
        GlobalModel.audioManager.play("bg", true, null, this, true);
    };
    p.cloudsMoving = function () {
        var cloud;
        var speed;
        for (var i = 0; i < this.clouds.length; i++) {
            cloud = this.clouds[i][0];
            speed = this.clouds[i][1];
            if (cloud.x + speed >= this.width) {
                cloud.x = -cloud.width;
            }
            else {
                cloud.x = cloud.x + speed;
            }
        }
    };
    p.onComplete = function () {
        if (this.bgImage) {
            this.bgImage.source = RES.getRes("images.startscenetitle");
        }
        if (this.cloudsContainer) {
            this.createUI();
        }
        if (this.version) {
            this.version.text = "v" + GlobalModel.version;
        }
    };
    return StartScene;
}(eui.Component));
egret.registerClass(StartScene,'StartScene');
