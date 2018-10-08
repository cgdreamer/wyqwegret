var PlayScene = (function (_super) {
    __extends(PlayScene, _super);
    function PlayScene() {
        _super.call(this);
        this.birdAnimations = {};
        var data = RES.getRes("right0_json");
        var txtr = RES.getRes("right0_png");
        var anim = AnimationManager.createAnimation(data, txtr);
        anim.scaleX = GlobalModel.contentWidth / anim.width;
        anim.scaleY = anim.scaleX;
        anim["animType"] = "right";
        anim.addEventListener(egret.Event.COMPLETE, this.animComplete, this);
        anim.y = -238;
        this.birdAnimations["right"] = [anim];
        this.birdAnimations["wrong"] = [];
        data = RES.getRes("wrong0_json");
        txtr = RES.getRes("wrong0_png");
        anim = AnimationManager.createAnimation(data, txtr);
        anim.scaleX = GlobalModel.contentWidth / anim.width;
        anim.scaleY = anim.scaleX;
        anim["animType"] = "wrong";
        anim.addEventListener(egret.Event.COMPLETE, this.animComplete, this);
        this.birdAnimations["wrong"].push(anim);
        data = RES.getRes("wrong1_json");
        txtr = RES.getRes("wrong1_png");
        anim = AnimationManager.createAnimation(data, txtr);
        anim.scaleX = GlobalModel.contentWidth / anim.width;
        anim.scaleY = anim.scaleX;
        anim["animType"] = "wrong";
        anim.addEventListener(egret.Event.COMPLETE, this.animComplete, this);
        this.birdAnimations["wrong"].push(anim);
        this.birdAnimations["normal"] = [];
        data = RES.getRes("normal0_json");
        txtr = RES.getRes("normal0_png");
        anim = AnimationManager.createAnimation(data, txtr);
        anim.scaleX = GlobalModel.contentWidth / anim.width;
        anim.scaleY = anim.scaleX;
        anim["animType"] = "normal";
        anim.addEventListener(egret.Event.COMPLETE, this.animComplete, this);
        this.birdAnimations["normal"].push(anim);
        data = RES.getRes("normal1_json");
        txtr = RES.getRes("normal1_png");
        anim = AnimationManager.createAnimation(data, txtr);
        anim.scaleX = GlobalModel.contentWidth / anim.width;
        anim.scaleY = anim.scaleX;
        anim["animType"] = "normal";
        anim.addEventListener(egret.Event.COMPLETE, this.animComplete, this);
        this.birdAnimations["normal"].push(anim);
        data = RES.getRes("normal2_json");
        txtr = RES.getRes("normal2_png");
        anim = AnimationManager.createAnimation(data, txtr);
        anim.scaleX = GlobalModel.contentWidth / anim.width;
        anim.scaleY = anim.scaleX;
        anim["animType"] = "normal";
        anim.addEventListener(egret.Event.COMPLETE, this.animComplete, this);
        this.birdAnimations["normal"].push(anim);
        this.labaSprite = new LabaSprite();
        this.labaSprite.x = -9;
        this.labaSprite.y = 10;
        this.addChild(this.labaSprite);
        this.wordNumberTextShadow = new egret.TextField();
        this.wordNumberTextShadow.multiline = false;
        this.wordNumberTextShadow.wordWrap = false;
        this.wordNumberTextShadow.fontFamily = GlobalModel.font;
        this.wordNumberTextShadow.bold = true;
        this.wordNumberTextShadow.size = 28;
        this.wordNumberTextShadow.textColor = 0xA8340F;
        this.wordNumberTextShadow.x = GlobalModel.contentWidth - 180;
        this.wordNumberTextShadow.y = 28;
        this.wordNumberTextShadow.alpha = 0.8;
        this.addChild(this.wordNumberTextShadow);
        this.wordNumberText = new egret.TextField();
        this.wordNumberText.multiline = false;
        this.wordNumberText.wordWrap = false;
        this.wordNumberText.fontFamily = GlobalModel.font;
        this.wordNumberText.bold = true;
        this.wordNumberText.size = 28;
        this.wordNumberText.textColor = 0xFAF27D;
        this.wordNumberText.stroke = 3;
        this.wordNumberText.strokeColor = 0xA8340F;
        this.wordNumberText.x = this.wordNumberTextShadow.x + 3;
        this.wordNumberText.y = this.wordNumberTextShadow.y - 3;
        this.addChild(this.wordNumberText);
        this.timeSprite = new TimeSprite();
        this.timeSprite.x = (GlobalModel.contentWidth - this.timeSprite.width) / 2;
        this.timeSprite.visible = false;
        this.addChild(this.timeSprite);
        this.birdAnimationSprite = new egret.DisplayObjectContainer();
        this.birdAnimationSprite.y = GlobalModel.contentHeight / 2 - 118;
        this.birdAnimationSprite.touchEnabled = false;
        this.birdAnimationSprite.touchChildren = false;
        this.addChild(this.birdAnimationSprite);
        this.backButton = new SimpleButton("images.backbtnup", "images.backbtnover");
        this.backButton.x = 19;
        this.backButton.y = GlobalModel.contentHeight - this.backButton.height - 19;
        this.backButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pause, this);
        this.addChild(this.backButton);
        this.maskBg = new egret.Shape();
        this.maskBg.graphics.beginFill(0xffffff, 0.3);
        this.maskBg.graphics.drawRect(0, 0, GlobalModel.contentWidth, GlobalModel.contentHeight);
        this.maskBg.graphics.endFill();
        this.maskBg.touchEnabled = false;
        this.maskBg.visible = false;
        this.addChild(this.maskBg);
        this.wordsPanel = new egret.DisplayObjectContainer();
        this.wordsPanel.addChild(new egret.Bitmap(RES.getRes("images.wordspanel")));
        this.englishText = new egret.TextField();
        this.englishText.multiline = false;
        this.englishText.wordWrap = false;
        this.englishText.fontFamily = GlobalModel.font;
        this.englishText.bold = true;
        this.englishText.size = 39;
        this.englishText.textColor = 0x2B9810;
        this.wordsPanel.addChild(this.englishText);
        this.wordsPanel.x = (GlobalModel.contentWidth - this.wordsPanel.width) / 2;
        this.wordsPanelY = -this.wordsPanel.height - 5;
        this.wordsPanelToY = this.wordsPanelY + 580;
        this.wordsPanel.y = this.wordsPanelY;
        this.addChild(this.wordsPanel);
        this.reportPanel = new ReportSprite();
        this.reportPanel.x = (GlobalModel.contentWidth - this.reportPanel.width) / 2;
        this.reportPanel.y = (GlobalModel.contentHeight - this.reportPanel.height) / 2;
        this.reportPanel.visible = false;
        this.addChild(this.reportPanel);
        this.detailSprite = new DetailSprite();
        this.detailSprite.x = (GlobalModel.contentWidth - this.detailSprite.width) / 2;
        this.detailSprite.y = (GlobalModel.contentHeight - this.detailSprite.height) / 2;
        this.detailSprite.visible = false;
        this.addChild(this.detailSprite);
    }
    var d = __define,c=PlayScene,p=c.prototype;
    p.animComplete = function (event) {
        var animation = event.currentTarget;
        animation.stop();
        switch (animation["animType"]) {
            case "right":
                this.checkCorrect(true);
                break;
            case "wrong":
                this.checkCorrect(false);
                break;
            case "normal":
                this.showAnimationType("normal");
                break;
        }
    };
    p.pause = function () {
        if (GlobalModel.isWin == null && !GlobalModel.isTimeEnd) {
            this.reportPanel.visible = true;
            this.timeSprite.stopTime();
            this.reportPanel.refresh();
            this.timeSprite.visible = false;
            this.labaSprite.visible = false;
            this.wordNumberTextShadow.visible = false;
            this.wordNumberText.visible = false;
            this.birdAnimationSprite.visible = false;
            this.backButton.visible = false;
        }
    };
    p.resumePlay = function () {
        if (GlobalModel.isWin == null && !GlobalModel.isTimeEnd) {
            this.reportPanel.visible = false;
            this.timeSprite.visible = true;
            this.labaSprite.visible = true;
            this.wordNumberTextShadow.visible = true;
            this.wordNumberText.visible = true;
            this.birdAnimationSprite.visible = true;
            this.backButton.visible = true;
            this.timeSprite.resume();
        }
    };
    p.showDetailSprite = function (bool) {
        this.reportPanel.visible = !bool;
        this.detailSprite.visible = bool;
        if (bool)
            this.detailSprite.refresh();
    };
    p.showAnimationType = function (type) {
        var array = this.birdAnimations[type];
        var len = array.length;
        var index = Math.floor(Math.random() * len);
        var anim = array[index];
        this.birdAnimationSprite.removeChildren();
        this.birdAnimationSprite.addChild(anim);
        anim.gotoAndPlay(1, 1);
    };
    p.timeEnd = function () {
        if (GlobalModel.isWin == null && !this.reportPanel.visible) {
            this.touchEnabled = false;
            this.touchChildren = false;
            GlobalModel.isTimeEnd = true;
            GlobalModel.isWin = false;
            this.timeSprite.visible = false;
            GlobalModel.doneNumber += 1;
            GlobalModel.wrongWords.push(this.playingWordIndex);
            this.showAnimationType("wrong");
        }
    };
    p.wordsPanelStartMoving = function (thisObj) {
        egret.Tween.get(thisObj.wordsPanel).to({ y: thisObj.wordsPanelY }, 300).call(thisObj.wordsPanelMoveUpComplete, thisObj);
    };
    p.wordsPanelMoveDownComplete = function () {
        GlobalModel.audioManager.play(this.currentWordInfo.sound, false, this.currentSoundPlayFunc, this);
    };
    p.currentSoundPlayFunc = function () {
        setTimeout(this.wordsPanelStartMoving, 3000, this);
    };
    p.wordsPanelMoveUpComplete = function () {
        this.maskBg.visible = false;
        this.playNextWord();
    };
    p.checkCorrect = function (bool) {
        this.maskBg.visible = true;
        this.englishText.text = this.currentWordInfo.pronounce;
        this.englishText.x = (this.wordsPanel.width - this.englishText.width) / 2;
        this.englishText.y = (this.wordsPanel.height - this.englishText.height) / 2 + 180;
        egret.Tween.get(this.wordsPanel).to({ y: this.wordsPanelToY }, 800, egret.Ease.backInOut).call(this.wordsPanelMoveDownComplete, this);
    };
    ;
    p.answerCorrect = function (bool, shouldAnswer, factAnswer) {
        if (!GlobalModel.isTimeEnd) {
            GlobalModel.isWin = bool;
            this.touchEnabled = false;
            this.touchChildren = false;
            this.backButton.visible = false;
            this.timeSprite.stopTime();
            this.timeSprite.visible = false;
            GlobalModel.doneNumber += 1;
            var type;
            var score;
            var should_entity = [shouldAnswer];
            var fact_entity = [factAnswer];
            if (bool) {
                type = "right";
                GlobalModel.rightWords.push(this.playingWordIndex);
                GlobalModel.rightNumber++;
                score = 100;
            }
            else {
                type = "wrong";
                GlobalModel.wrongWords.push(this.playingWordIndex);
                score = 0;
            }
            GlobalModel.main.generateRecord(this.playingWordIndex, score, "VLearning_WordSpell_LetterSpellScore", 100, should_entity, fact_entity, 1);
            this.showAnimationType(type);
            GlobalModel.audioManager.play(type, false, null, this, true);
        }
    };
    p.playNextWord = function () {
        GlobalModel.isTimeEnd = false;
        GlobalModel.isWin = null;
        this.touchEnabled = false;
        this.touchChildren = false;
        this.showAnimationType("normal");
        this.currentWordInfo = this.wordInfos.shift();
        if (this.currentWordInfo) {
            var words = [this.currentWordInfo.pronounce];
            words = words.concat(this.currentWordInfo.confusingwords);
            this.labaSprite.start(words, this.currentWordInfo.sound);
            var playingNumber = GlobalModel.wordsInfo.length - this.wordInfos.length;
            this.playingWordIndex = playingNumber - 1;
            var progressString = playingNumber + " / " + GlobalModel.wordsInfo.length;
            this.wordNumberTextShadow.text = progressString;
            this.wordNumberText.text = progressString;
        }
        else {
            GlobalModel.main.commitRecord();
            GlobalModel.isPlayEnd = true;
            this.reportPanel.visible = true;
            this.timeSprite.stopTime();
            this.reportPanel.refresh(true);
            this.timeSprite.visible = false;
            this.labaSprite.visible = false;
            this.wordNumberTextShadow.visible = false;
            this.wordNumberText.visible = false;
            this.birdAnimationSprite.visible = false;
            this.backButton.visible = false;
            this.touchEnabled = true;
            this.touchChildren = true;
        }
    };
    p.startTime = function () {
        this.timeSprite.start(this.timeEnd, this);
        this.timeSprite.visible = true;
        this.touchEnabled = true;
        this.touchChildren = true;
        this.backButton.visible = true;
    };
    p.start = function () {
        GlobalModel.isPlayEnd = false;
        GlobalModel.playTime = 0;
        GlobalModel.rightNumber = 0;
        GlobalModel.doneNumber = 0;
        GlobalModel.rightWords.length = 0;
        GlobalModel.wrongWords.length = 0;
        this.wordInfos = GlobalModel.wordsInfo.concat();
        this.reportPanel.visible = false;
        this.timeSprite.visible = false;
        this.labaSprite.visible = true;
        this.wordNumberTextShadow.visible = true;
        this.wordNumberText.visible = true;
        this.birdAnimationSprite.visible = true;
        this.backButton.visible = true;
        var currentWordInfo;
        for (var i = 0; i < this.wordInfos.length; i++) {
            currentWordInfo = this.wordInfos[i];
            GlobalModel.main.generateRecord(i, 0, "VLearning_WordSpell_LetterSpellScore", 100, [currentWordInfo.pronounce], [], 1);
        }
        this.playNextWord();
    };
    return PlayScene;
}(egret.DisplayObjectContainer));
egret.registerClass(PlayScene,'PlayScene');
