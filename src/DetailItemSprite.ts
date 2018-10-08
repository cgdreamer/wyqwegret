class DetailItemSprite extends egret.DisplayObjectContainer {

	private FONT_SIZE: number = 14;
    private GAP: number = 3;
    private CORRECT_COLOR: number = 0x54b148;
    private WRONG_COLOR_0: number = 0xff6696;
    private WRONG_COLOR_1: number = 0xe0e0e0;
    private DEFAULT_COLOR: number = 0xbbbcc1;
    private CELL_H: number = 43;
    private FIRST_CELL_X: number = 0;
    private FIRST_CELL_W: number = 64;
    private SECOND_CELL_W: number = 317;
    private THIRD_CELL_W: number = 64;
    private FORTH_CELL_W: number = 65;

    private bg: egret.Shape;
    private rightWrongBtnBitmap: egret.Bitmap;
	private soundAnimation: egret.MovieClip;
	private detail: DetailSprite;
	private theWordInfo:WordsInfo;

	public constructor(wordInfo: WordsInfo, isCorrect: boolean, wordIndex: number, detailSprite: DetailSprite) {
		super();
		this.touchEnabled=true;
		this.theWordInfo=wordInfo;
		this.detail = detailSprite;
		this.bg = new egret.Shape();
		this.addChild(this.bg);

		this.rightWrongBtnBitmap = new egret.Bitmap();
		var color0: number;
		var color1: number;
		if (isCorrect != null) {
			if (isCorrect) {
				color0 = this.CORRECT_COLOR;
				color1 = this.DEFAULT_COLOR;
				this.rightWrongBtnBitmap = new egret.Bitmap(RES.getRes("images.rightbtnbg"));
			}
			else {
				color0 = this.WRONG_COLOR_0;
				color1 = this.WRONG_COLOR_1;
				this.rightWrongBtnBitmap = new egret.Bitmap(RES.getRes("images.wrongbtnbg"));
			}
			this.rightWrongBtnBitmap.x = this.FIRST_CELL_X + this.FIRST_CELL_W + this.GAP + this.SECOND_CELL_W + this.GAP + this.THIRD_CELL_W + this.GAP;
			this.addChild(this.rightWrongBtnBitmap);
		}
		else {
			color0 = this.DEFAULT_COLOR;
			color1 = this.DEFAULT_COLOR;
			this.bg.graphics.beginFill(this.DEFAULT_COLOR, 1);
			this.bg.graphics.drawRect(this.FIRST_CELL_X + this.FIRST_CELL_W + this.GAP + this.SECOND_CELL_W + this.GAP + this.THIRD_CELL_W + this.GAP, 0, this.FORTH_CELL_W, this.CELL_H);
			this.bg.graphics.endFill();
		}
		this.bg.graphics.beginFill(color0, 1);
		this.bg.graphics.drawRect(this.FIRST_CELL_X, 0, this.FIRST_CELL_W, this.CELL_H);
		this.bg.graphics.endFill();
		this.bg.graphics.beginFill(color1, 1);
		this.bg.graphics.drawRect(this.FIRST_CELL_X + this.FIRST_CELL_W + this.GAP, 0, this.SECOND_CELL_W, this.CELL_H);
		this.bg.graphics.endFill();
		this.bg.graphics.beginFill(this.DEFAULT_COLOR, 1);
		this.bg.graphics.drawRect(this.FIRST_CELL_X + this.FIRST_CELL_W + this.GAP + this.SECOND_CELL_W + this.GAP, 0, this.THIRD_CELL_W, this.CELL_H);
		this.bg.graphics.endFill();

		var indexText: egret.TextField = new egret.TextField();
		indexText.multiline = false;
		indexText.wordWrap = false;
		indexText.fontFamily = GlobalModel.font;
		indexText.size = this.FONT_SIZE;
		indexText.textColor = 0xffffff;
		indexText.text = wordIndex + "";
		indexText.x = this.FIRST_CELL_X + (this.FIRST_CELL_W - indexText.width) / 2;
		indexText.y = (this.CELL_H - indexText.height) / 2;
		this.addChild(indexText);

		var wordText: egret.TextField = new egret.TextField();
		wordText.multiline = false;
		wordText.wordWrap = false;
		wordText.fontFamily = GlobalModel.font;
		wordText.size = this.FONT_SIZE;
		wordText.textColor = 0x000000;
		wordText.text = wordInfo.pronounce;
		wordText.x = this.FIRST_CELL_X + this.FIRST_CELL_W + this.GAP + 5;
		wordText.y = (this.CELL_H - wordText.height) / 2;
		this.addChild(wordText);

		var data: any = RES.getRes("soundanimation_json");
		var txtr: any = RES.getRes("soundanimation_png");
		this.soundAnimation = AnimationManager.createAnimation(data, txtr);
		this.soundAnimation.addEventListener(egret.Event.COMPLETE, this.soundAnimCompleted, this);
		this.soundAnimation.gotoAndStop(1);
		this.soundAnimation.x = this.FIRST_CELL_X + this.FIRST_CELL_W + this.GAP + this.SECOND_CELL_W + this.GAP + 10;
		this.soundAnimation.y = (this.CELL_H - this.soundAnimation.height) / 2;
		this.addChild(this.soundAnimation);

		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.playSound,this);
	}

	private soundAnimCompleted(e: egret.Event): void {
		this.soundAnimation.stop();
		this.detail.touchEnabled = true;
		this.detail.touchChildren = true;
	};

	private playSound(): void {
		this.detail.touchEnabled = false;
		this.detail.touchChildren = false;
		GlobalModel.audioManager.play(this.theWordInfo.sound, false, this.startPlayAudio,this);
	};

	private startPlayAudio():void{
		this.soundAnimation.gotoAndPlay(1,1);
	}
}