class TimeSprite extends egret.DisplayObjectContainer {

	private text: egret.TextField
	private timeManager = new TimeManager();
	private timeEndFunction: Function;
	private thisObj:PlayScene;

	public constructor() {
		super();
		var bg: egret.Bitmap = new egret.Bitmap(RES.getRes("images.timepanelbg"));
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

    private refreshTime(time: string, innerTime: number): void {
        this.text.text = time;
        GlobalModel.playTime += innerTime;
    };

	private timeEnd(): void {
		GlobalModel.isTimeEnd = true;
		this.timeManager.stopTime();
		if (this.timeEndFunction)
			this.timeEndFunction.call(this.thisObj);
	};

	public stopTime(): void {
		this.timeManager.stopTime();
	};

	public resume(): void {
		this.timeManager.resumeTime();
	};

	public start(timeEndFunc: Function,thisParam:PlayScene): void {
		this.timeEndFunction = timeEndFunc;
		this.thisObj=thisParam;
		this.timeManager.refresh(GlobalModel.startTime, false, TimeManager.SECOND, this.refreshTime, this.timeEnd, this);
	}
}