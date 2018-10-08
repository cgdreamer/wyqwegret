class DetailSprite extends egret.DisplayObjectContainer {
	private NUM_IN_PAGE: number = 5;
    private ITEM_X: number = 38;
    private ITEM_START_Y: number = 136;
    private ITEM_GAP: number = 3;
    private totalPage: number = 0;
    private pageIndex: number = 0;

	private bg: egret.Bitmap;
	private itemSprite: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
	private pageSprite: egret.DisplayObjectContainer;
	private leftPageBtn: SimpleButton;
	private pageIndexText: egret.TextField;
	private rightPageBtn: SimpleButton;
	private returnBtn: SimpleButton;
	private rankBitmap: egret.Bitmap;
	private perfectBitmap: egret.Bitmap;
	private veryGoodBitmap: egret.Bitmap;
	private goodBitmap: egret.Bitmap;
	private lostBitmap: egret.Bitmap;

	public constructor() {
		super();
		this.bg = new egret.Bitmap(RES.getRes("images.detailtablebg"));
		this.addChild(this.bg);

		this.itemSprite.x = this.ITEM_X;
		this.itemSprite.y = this.ITEM_START_Y;
		this.addChild(this.itemSprite);

		this.pageSprite = new egret.DisplayObjectContainer();
		this.leftPageBtn = new SimpleButton("images.lefttbtnup", "images.lefttbtnover", "images.lefttbtndisabled");
		this.leftPageBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pageBtnMouseDownHandler, this);
		this.leftPageBtn.enable = false;
		this.pageSprite.addChild(this.leftPageBtn);

		this.pageIndexText = new egret.TextField();
		this.pageIndexText.multiline = false;
		this.pageIndexText.wordWrap = false;
		this.pageIndexText.fontFamily = GlobalModel.font;
		this.pageIndexText.size = 15;
		this.pageIndexText.textColor = 0x000000;
		this.pageIndexText.x = this.leftPageBtn.x + this.leftPageBtn.width + 19;
		this.pageSprite.addChild(this.pageIndexText);

		this.rightPageBtn = new SimpleButton("images.rightbtnup", "images.rightbtnover", "images.rightbtndisabled");
		this.rightPageBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pageBtnMouseDownHandler, this);
		this.pageSprite.addChild(this.rightPageBtn);
		this.pageSprite.y = 381;
		this.addChild(this.pageSprite);

		this.perfectBitmap = new egret.Bitmap(RES.getRes("images.perfect"));
		this.veryGoodBitmap = new egret.Bitmap(RES.getRes("images.very good"));
		this.goodBitmap = new egret.Bitmap(RES.getRes("images.good"));
		this.lostBitmap = new egret.Bitmap(RES.getRes("images.you lost"));

		this.returnBtn = new SimpleButton("images.detailreturnbtnup", "images.detailreturnbtnover");
		this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.returnBtnMouseDown, this);
		this.returnBtn.x = 238;
		this.returnBtn.y = 458;
		this.addChild(this.returnBtn);
	}

	private returnBtnMouseDown(e: egret.TouchEvent): void {
		if (this.rankBitmap) {
			if (this.rankBitmap.parent)
				this.rankBitmap.parent.removeChild(this.rankBitmap);
			this.rankBitmap = null;
		}
		GlobalModel.main.getSceneByName("PlayScene")["showDetailSprite"](false);
	}

	private pageBtnMouseDownHandler(event: egret.TouchEvent) {
		event.currentTarget.enable = false;
		if (event.currentTarget == this.leftPageBtn) {
			this.pageIndex = this.pageIndex - 1;
		}
		else {
			this.pageIndex = this.pageIndex + 1;
		}
		this.gotoPageByIndex(this.pageIndex);
	}

	private gotoPageByIndex(index: number) {
		this.pageIndexText.text = index + 1 + "/" + this.totalPage;
		this.rightPageBtn.x = this.pageIndexText.x + this.pageIndexText.width + 19;
		this.pageSprite.x = (this.bg.width - this.pageSprite.width) / 2;
		var wordsInfo: Array<WordsInfo> = GlobalModel.wordsInfo.concat().splice(index * this.NUM_IN_PAGE, 5);
		var item: DetailItemSprite;
		var wordIndex: number;
		var isCorrect: boolean = null;
		var i: number;
		this.itemSprite.removeChildren();
		for (i = 0; i < wordsInfo.length; i++) {
			wordIndex = index * this.NUM_IN_PAGE + i;
			if (wordIndex <= GlobalModel.doneNumber - 1) {
				if (GlobalModel.rightWords.indexOf(wordIndex) != -1)
					isCorrect = true;
				else
					isCorrect = false;
			}
			else {
				isCorrect = null;
			}
			item = new DetailItemSprite(wordsInfo[i], isCorrect, wordIndex + 1, this);
			item.y = i * (item.height + this.ITEM_GAP);
			this.itemSprite.addChild(item);
		}

		if (this.pageIndex > 0) {
			this.leftPageBtn.enable = true;
		}
		else {
			this.leftPageBtn.enable = false;
		}
		if (this.pageIndex < this.totalPage - 1) {
			this.rightPageBtn.enable = true;
		}
		else {
			this.rightPageBtn.enable = false;
		}
	};

	public refresh(): void {
		this.totalPage = Math.ceil(GlobalModel.wordsInfo.length / this.NUM_IN_PAGE);
		this.pageIndex = 0;
		if (this.totalPage > 1) {
			this.rightPageBtn.enable = true;
		}
		else {
			this.rightPageBtn.enable = false;
		}
		if (GlobalModel.isPlayEnd) {
			if (GlobalModel.rightPercent >= 90) {
				this.rankBitmap = this.perfectBitmap;
			}
			else if (GlobalModel.rightPercent >= 75) {
				this.rankBitmap = this.veryGoodBitmap;
			}
			else if (GlobalModel.rightPercent >= 60) {
				this.rankBitmap = this.goodBitmap;
			}
			else {
				this.rankBitmap = this.lostBitmap;
			}
			var targetX = this.width - 56 - this.rankBitmap.width;
			var targetY = 380;
			this.rankBitmap.scaleX = 3;
			this.rankBitmap.scaleY = 3;
			this.rankBitmap.alpha = 0.1;
			this.rankBitmap.x = targetX - 138;
			this.rankBitmap.y = 328;
			this.addChild(this.rankBitmap);
			egret.Tween.get(this.rankBitmap).to({ x: targetX, y: targetY, scaleX: 1, scaleY: 1, alpha: 1 }, 600);
		}
		this.gotoPageByIndex(this.pageIndex);
	}
}