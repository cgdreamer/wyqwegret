class LabaSprite extends egret.DisplayObjectContainer {

	private wordBarPos = [[80, 0], [88, 108], [80, 158]];
    private wordBars: Array<any> = [];
    private wordBtnMaskInfos = [[28, 15, 226, 54], [14, 13, 261, 57], [28, 66, 232, 61]];
    private wordTextPos = [[10, -25], [21, -5], [10, 21]];
    private wordBarTexts = [];
	private labaAnimation: egret.MovieClip;

    private wordBarMoved: number = 0;
    private soundUrl: string;

    private wordPlayOnce = false;
    private correctAnswer;

	public constructor() {
		super();
		var btn: SimpleButton;
		var text: egret.TextField;
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

		var data: any = RES.getRes("laba_json");
		var txtr: any = RES.getRes("laba_png");
		this.labaAnimation = AnimationManager.createAnimation(data, txtr);
		this.labaAnimation.addEventListener(egret.Event.COMPLETE, this.labaPlayComplete, this);
		this.labaAnimation.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pronounce, this);
		this.labaAnimation.stop();
		this.labaAnimation.y = (this.height - this.labaAnimation.height) / 2;
		this.addChild(this.labaAnimation);
	}

    private labaPlayComplete(): void {
        this.labaAnimation.stop();
        if (!this.wordPlayOnce) {
            this.wordPlayOnce = true;
            GlobalModel.main.getSceneByName("PlayScene")["startTime"]();
        }
    }

    private resetBtns(): void {
        var btn: SimpleButton;
        for (var i: number = 0; i < this.wordBars.length; i++) {
            btn = this.wordBars[i];
            btn.x = -btn.width - 5;
            this.wordBarTexts[i].visible = false;
        }
    }

    private check(event): void {
        GlobalModel.main.getSceneByName("PlayScene")["answerCorrect"](event.currentTarget.isCorrect, this.correctAnswer, event.currentTarget.wordText.text);
    }

    private pronounce(): void {
        GlobalModel.audioManager.play(this.soundUrl, false, this.labaAnimationPlay, this);
    }

	private labaAnimationPlay(): void {
		this.labaAnimation.gotoAndPlay(1,1);
	}

	private wordBarMoveComplete(btn: SimpleButton): void {
		this.wordBarMoved++;
		var btn = btn;
		btn["wordText"].visible = true;
		if (this.wordBarMoved >= this.wordBars.length) {
			GlobalModel.audioManager.play(this.soundUrl, false, this.labaAnimationPlay, this);
		}
	}

	public start(words, sURL): void {
		this.wordPlayOnce = false;
		this.resetBtns();
		var wordBarTextsLength: number = this.wordBarTexts.length;
		words.length = wordBarTextsLength;
		this.soundUrl = sURL;
		this.wordBarMoved = 0;
		var text: egret.TextField;
		var btn: SimpleButton;
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
	}

	private delayWordBarMoveFunction(obj: any): void {
		egret.Tween.get(obj[0]).to({ x: obj[1] }, 380, egret.Ease.backInOut).call(this.wordBarMoveComplete, this, [obj[0]]);
	}
}