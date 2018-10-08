var LabaSprite = (function (_super) {
    __extends(LabaSprite, _super);
    function LabaSprite() {
        _super.call(this);
        this.wordBarPos = [[80, 0], [88, 108], [80, 158]];
        this.wordBars = [];
        this.wordBtnMaskInfos = [[28, 15, 226, 54], [14, 13, 261, 57], [28, 66, 232, 61]];
        this.wordTextPos = [[10, -25], [21, -5], [10, 21]];
        this.wordBarTexts = [];
        this.wordBarMoved = 0;
        this.wordPlayOnce = false;
        var btn;
        var text;
        for (var i = 0; i < this.wordBarPos.length; i++) {
            btn = new SimpleButton("images.wBtnUp" + (i + 1), "images.wBtnOver" + (i + 1), "", false, new egret.Rectangle(this.wordBtnMaskInfos[i][0], this.wordBtnMaskInfos[i][1], this.wordBtnMaskInfos[i][2], this.wordBtnMaskInfos[i][3]));
            btn.y = this.wordBarPos[i][1];
            this.wordBars.push(btn);
            text = new egret.TextField();
            text.multiline = false;
            text.wordWrap = false;
            text.fontFamily = GlobalModel.font;
            text.bold = true;
            text.size = 19;
            text.textColor = 0x000000;
            text["selfParent"] = btn;
            btn["wordText"] = text;
            this.wordBarTexts.push(text);
            btn.addChild(text);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.check, this);
            this.addChild(btn);
        }
        var data = RES.getRes("laba_json");
        var txtr = RES.getRes("laba_png");
        this.labaAnimation = AnimationManager.createAnimation(data, txtr);
        this.labaAnimation.addEventListener(egret.Event.COMPLETE, this.labaPlayComplete, this);
        this.labaAnimation.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pronounce, this);
        this.labaAnimation.stop();
        this.labaAnimation.y = (this.height - this.labaAnimation.height) / 2;
        this.addChild(this.labaAnimation);
    }
    var d = __define,c=LabaSprite,p=c.prototype;
    p.labaPlayComplete = function () {
        this.labaAnimation.stop();
        if (!this.wordPlayOnce) {
            this.wordPlayOnce = true;
            GlobalModel.main.getSceneByName("PlayScene")["startTime"]();
        }
    };
    p.resetBtns = function () {
        var btn;
        for (var i = 0; i < this.wordBars.length; i++) {
            btn = this.wordBars[i];
            btn.x = -btn.width - 5;
            this.wordBarTexts[i].visible = false;
        }
    };
    p.check = function (event) {
        GlobalModel.main.getSceneByName("PlayScene")["answerCorrect"](event.currentTarget.isCorrect, this.correctAnswer, event.currentTarget.wordText.text);
    };
    p.pronounce = function () {
        GlobalModel.audioManager.play(this.soundUrl, false, this.labaAnimationPlay, this);
    };
    p.labaAnimationPlay = function () {
        this.labaAnimation.gotoAndPlay(1, 1);
    };
    p.wordBarMoveComplete = function (btn) {
        this.wordBarMoved++;
        var btn = btn;
        btn["wordText"].visible = true;
        if (this.wordBarMoved >= this.wordBars.length) {
            GlobalModel.audioManager.play(this.soundUrl, false, this.labaAnimationPlay, this);
        }
    };
    p.start = function (words, sURL) {
        this.wordPlayOnce = false;
        this.resetBtns();
        var wordBarTextsLength = this.wordBarTexts.length;
        words.length = wordBarTextsLength;
        this.soundUrl = sURL;
        this.wordBarMoved = 0;
        var text;
        var btn;
        this.correctAnswer = words[0];
        var index;
        var wordsArrayLength;
        var textText;
        for (var i = 0; i < wordBarTextsLength; i++) {
            text = this.wordBarTexts[i];
            wordsArrayLength = words.length;
            index = Math.floor(Math.random() * wordsArrayLength);
            textText = words.splice(index, 1)[0];
            text.text = textText;
            btn = text["selfParent"];
            btn["isCorrect"] = textText == this.correctAnswer;
            var offsetY = 0;
            text.x = (btn.width - text.width) / 2 + this.wordTextPos[i][0];
            text.y = (btn.height - text.height) / 2 + this.wordTextPos[i][1] + offsetY;
            egret.setTimeout(this.delayWordBarMoveFunction, this, i * 190, [btn, this.wordBarPos[i][0]]);
        }
    };
    p.delayWordBarMoveFunction = function (obj) {
        egret.Tween.get(obj[0]).to({ x: obj[1] }, 380, egret.Ease.backInOut).call(this.wordBarMoveComplete, this, [obj[0]]);
    };
    return LabaSprite;
}(egret.DisplayObjectContainer));
egret.registerClass(LabaSprite,'LabaSprite');
