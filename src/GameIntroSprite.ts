class GameIntroSprite extends egret.Sprite {

    private bgWidth: number;
    private bgHeight: number;
    private FONT_SHADOW_SIZE: number = 21;
    private FONT_SIZE: number = 16;
    private LINE_GAP: number = 19;

	public constructor() {
		super();
		var bgShape: egret.Shape = new egret.Shape();
		bgShape.graphics.beginFill(0x000000, 0);
		bgShape.graphics.drawRect(0, 0, GlobalModel.contentWidth, GlobalModel.contentHeight);
		bgShape.graphics.endFill();
		this.addChild(bgShape);

		var introPanelBg: egret.Bitmap = new egret.Bitmap(RES.getRes("images.gameintropanelbg"));
		this.bgWidth = introPanelBg.width;
		this.bgHeight = introPanelBg.height;
		introPanelBg.x = (this.width - this.bgWidth) / 2;
		introPanelBg.y = (this.height - this.bgHeight) / 2;
		this.addChild(introPanelBg);

		var introTitleShadow: egret.TextField = new egret.TextField();
		introTitleShadow.multiline = false;
		introTitleShadow.wordWrap = false;
		introTitleShadow.type = egret.TextFieldType.DYNAMIC;
		introTitleShadow.fontFamily = GlobalModel.font;
		introTitleShadow.bold = true;
		introTitleShadow.size = this.FONT_SHADOW_SIZE;
		introTitleShadow.textColor = 0x000000;
		introTitleShadow.stroke = 3;
		introTitleShadow.strokeColor = 0x000000;
		introTitleShadow.text = "游戏说明";
		introTitleShadow.x = (this.width - introTitleShadow.width) / 2 + 3;
		introTitleShadow.y = introPanelBg.y + 50;
		introTitleShadow.alpha = 0.3;
		this.addChild(introTitleShadow);

		var introTitle: egret.TextField = new egret.TextField();
		introTitle.multiline = false;
		introTitle.wordWrap = false;
		introTitle.type = egret.TextFieldType.DYNAMIC;
		introTitle.fontFamily = GlobalModel.font;
		introTitle.bold = true;
		introTitle.size = this.FONT_SHADOW_SIZE;
		introTitle.textColor = 0x4B3412;
		introTitle.stroke = 3;
		introTitle.strokeColor = 0xffffff;
		introTitle.text = "游戏说明";
		introTitle.x = introTitleShadow.x - 3;
		introTitle.y = introTitleShadow.y - 3;
		this.addChild(introTitle);

		var textIntroContent:egret.TextField = new egret.TextField();
		textIntroContent.multiline=false;
		textIntroContent.wordWrap=true;
		textIntroContent.lineSpacing=this.LINE_GAP;
		textIntroContent.width = this.bgWidth - 150;
		textIntroContent.fontFamily = GlobalModel.font;
		textIntroContent.bold=true;
		textIntroContent.size = this.FONT_SIZE;
		textIntroContent.textColor = 0x333333;
		textIntroContent.text = "      森林里住着一只嘟嘟鸟，据说她能听懂英文单词，同学们快来验证一下吧！！\n       操作说明：先观察所给的单词，然后大喇叭会发出一个单词的读音，如果没有听清楚，可以点击叭再听一次。听听它读的是哪个单词呢？请在6秒内做出选择，如果你选中了正确单词，嘟嘟鸟便会高兴的舞蹈哦！";
		textIntroContent.x = (this.width - textIntroContent.width) / 2 - 16;
		textIntroContent.y = introPanelBg.y + 108;
		this.addChild(textIntroContent);

		var returnBtn = new SimpleButton("images.startscenereturnup","images.startscenereturnover");
		returnBtn.x = (this.width - returnBtn.width) / 2;
		returnBtn.y = introPanelBg.y + introPanelBg.height - 21;
		this.addChild(returnBtn);

		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.removeFromStage, this);
		this.touchEnabled = true;
	}

	private removeFromStage(e: egret.TouchEvent): void {
		this.parent.removeChild(this);
	}
}