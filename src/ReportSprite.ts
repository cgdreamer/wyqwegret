class ReportSprite extends egret.DisplayObjectContainer {

    private fontSz: number = 19;
	private bg: egret.Bitmap;

	private positions:Array<Array<{x:number,y:number,w:number,h:number}>> = [[{ x: 190, y: 87, w: 123, h: 51 }, { x: 490, y: 87, w: 118, h: 51 }], [{ x: 190, y: 140, w: 123, h: 51 }, { x: 490, y: 140, w: 118, h: 51 }], [{ x: 190, y: 194, w: 123, h: 51 }, { x: 490, y: 194, w: 118, h: 51 }]];

	private totalQT: egret.TextField;
	private doneQT: egret.TextField;
	private rightQT: egret.TextField;
	private timeQT: egret.TextField;
	private donePT: egret.TextField;
	private rightPT: egret.TextField;

	private continueBtn: SimpleButton;

	public constructor() {
		super();
		this.bg = new egret.Bitmap(RES.getRes("images.reporttablebg"));
		this.addChild(this.bg);

		this.totalQT = new egret.TextField();
		this.totalQT.multiline = false;
		this.totalQT.wordWrap = false;
		this.totalQT.fontFamily = GlobalModel.font;
		this.totalQT.bold = true;
		this.totalQT.size = this.fontSz;
		this.totalQT.textColor = 0x000000;
		this.addChild(this.totalQT);

		this.doneQT = new egret.TextField();
		this.doneQT.multiline = false;
		this.doneQT.wordWrap = false;
		this.doneQT.fontFamily = GlobalModel.font;
		this.doneQT.bold = true;
		this.doneQT.size = this.fontSz;
		this.doneQT.textColor = 0x000000;
		this.addChild(this.doneQT);

		this.rightQT = new egret.TextField();
		this.rightQT.multiline = false;
		this.rightQT.wordWrap = false;
		this.rightQT.fontFamily = GlobalModel.font;
		this.rightQT.bold = true;
		this.rightQT.size = this.fontSz;
		this.rightQT.textColor = 0x000000;
		this.addChild(this.rightQT);

		this.timeQT = new egret.TextField();
		this.timeQT.multiline = false;
		this.timeQT.wordWrap = false;
		this.timeQT.fontFamily = GlobalModel.font;
		this.timeQT.bold = true;
		this.timeQT.size = this.fontSz;
		this.timeQT.textColor = 0x000000;
		this.addChild(this.timeQT);

		this.donePT = new egret.TextField();
		this.donePT.multiline = false;
		this.donePT.wordWrap = false;
		this.donePT.fontFamily = GlobalModel.font;
		this.donePT.bold = true;
		this.donePT.size = this.fontSz;
		this.donePT.textColor = 0x680104;
		this.addChild(this.donePT);

		this.rightPT = new egret.TextField();
		this.rightPT.multiline = false;
		this.rightPT.wordWrap = false;
		this.rightPT.fontFamily = GlobalModel.font;
		this.rightPT.bold = true;
		this.rightPT.size = this.fontSz;
		this.rightPT.textColor = 0x680104;
		this.addChild(this.rightPT);

		var returnBtn = new SimpleButton("images.returnstartbtnup", "images.returnstartbtnover");
		returnBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e: egret.TouchEvent): void { GlobalModel.main.commitRecord(); GlobalModel.main.changeToSceneByName("StartScene"); }, this);
		returnBtn.x = 113;
		returnBtn.y = 283;
		this.addChild(returnBtn);

		var detailBtn = new SimpleButton("images.showdetailbtnup", "images.showdetailbtnover");
		detailBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e: egret.TouchEvent): void { GlobalModel.main.getSceneByName("PlayScene")["showDetailSprite"](true); }, this);
		detailBtn.x = 277;
		detailBtn.y = 283;
		this.addChild(detailBtn);

		this.continueBtn = new SimpleButton("images.continuebtnup", "images.continuebtnover", "images.continuebtndisabled");
		this.continueBtn.x = 437;
		this.continueBtn.y = 283;
		this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e: egret.TouchEvent): void { GlobalModel.main.getSceneByName("PlayScene")["resumePlay"](); }, this);
		this.addChild(this.continueBtn);
	}

	private getTimeString(value: number): string {
		var second = Math.round(value / 1000);
		var minute = Math.floor(second / 60);
		var seconds = Math.ceil(second % 60) + "";
		var tempTime = "";
		if (minute > 0) {
			tempTime = minute + "分";
		}
		tempTime = tempTime + seconds + "秒";
		return tempTime;
	}

	public refresh(isPlayEnd: boolean=false): void {
		this.totalQT.text = GlobalModel.wordsInfo.length+"";
		this.totalQT.x = this.positions[0][0].x + (this.positions[0][0].w - this.totalQT.width) / 2;
		this.totalQT.y = this.positions[0][0].y + (this.positions[0][0].h - this.totalQT.height) / 2;

		this.doneQT.text = GlobalModel.doneNumber+"";
		this.doneQT.x = this.positions[1][0].x + (this.positions[1][0].w - this.doneQT.width) / 2;
		this.doneQT.y = this.positions[1][0].y + (this.positions[1][0].h - this.doneQT.height) / 2;

		this.rightQT.text = GlobalModel.rightNumber+"";
		this.rightQT.x = this.positions[2][0].x + (this.positions[2][0].w - this.rightQT.width) / 2;
		this.rightQT.y = this.positions[2][0].y + (this.positions[2][0].h - this.rightQT.height) / 2;

		this.timeQT.text = this.getTimeString(GlobalModel.playTime);
		this.timeQT.x = this.positions[0][1].x + (this.positions[0][1].w - this.timeQT.width) / 2;
		this.timeQT.y = this.positions[0][1].y + (this.positions[0][1].h - this.timeQT.height) / 2;

		this.donePT.text = Math.round(GlobalModel.doneNumber / GlobalModel.wordsInfo.length * 100) + "%";
		this.donePT.x = this.positions[1][1].x + (this.positions[1][1].w - this.donePT.width) / 2;
		this.donePT.y = this.positions[1][1].y + (this.positions[1][1].h - this.donePT.height) / 2;

		var rightPercent;
		if (GlobalModel.doneNumber > 0) {
			rightPercent = Math.round(GlobalModel.rightNumber / GlobalModel.doneNumber * 100);
			GlobalModel.rightPercent = rightPercent;
			this.rightPT.text = rightPercent + "%";
		}
		else {
			this.rightPT.text = "0%";
		}
		this.rightPT.x = this.positions[2][1].x + (this.positions[2][1].w - this.rightPT.width) / 2;
		this.rightPT.y = this.positions[2][1].y + (this.positions[2][1].h - this.rightPT.height) / 2;

		if (isPlayEnd) {
			this.continueBtn.enable=false;
		}
		else {
			this.continueBtn.enable=true;
		}
	};
}