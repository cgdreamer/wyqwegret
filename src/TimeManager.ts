class TimeManager extends egret.Sprite {

	public static MINUTE_AND_SECOND:string="ms";
	public static SECOND:string="s";

	private runTime: number = 0;
	private isForwarding: boolean = true;
    private timeMode: string = "s";
    private timeEndFunction: Function;
    private timeFunction: Function;
    private isTwinkling: boolean;
    private totalTime: number = 0;
    private challengeStartTime: number = 0;
    private twinkleTime: number = 30;
    private twinkleStartTime: number = 0;
    private lastRunTime: number = 0;

	private thisObj:any;

	public constructor() {
		super();
	}

    public refreshTwinkleStartTime(): void {
        this.twinkleStartTime = new Date().getTime();
    }

    public startTime(): void {
        var dateObject = new Date();
        this.runTime = dateObject.getTime();
        this.lastRunTime = this.runTime;
        if (!this.hasEventListener(egret.Event.ENTER_FRAME))
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHander, this);
    }

    private onEnterFrameHander(): void {
        var dateObjectTime: number = new Date().getTime();
        var pastTime: number = (dateObjectTime - this.runTime) / 1000;
        var nowRunTime: number = dateObjectTime;
        var innerTime: number = nowRunTime - this.lastRunTime;
        this.lastRunTime = nowRunTime;
        var tempValue: number;
        if (this.isForwarding) {
            tempValue = this.challengeStartTime + pastTime;
        }
        else {
            tempValue = this.totalTime - pastTime;
        }
        if (tempValue < 0)
            tempValue = 0;
        var tempTime = this.getTimeString(tempValue);
        if (this.timeFunction)
            this.timeFunction.call(this.thisObj,tempTime, innerTime);
        if (tempValue <= 0) {
            if (!this.isForwarding) {
                if (this.timeEndFunction)
                    this.timeEndFunction.call(this.thisObj);
            }
        }
        if (this.isTwinkling) {
            var twinklePastTime = (dateObjectTime - this.twinkleStartTime) / 1000;
            if (twinklePastTime >= this.twinkleTime) {
                console.log("间歇计时到点");
            }
        }
    }

    public getTimeString(value): string {
        var minute = Math.ceil(value / 60) + "";
        var seconds = Math.ceil(value % 60) + "";
        var tempTime = "";
        if (this.timeMode == "ms") {
            if (minute.length < 2) {
                tempTime = "0" + minute;
            } else {
                tempTime = minute;
            }
            tempTime = tempTime + ":";
        }
        if (seconds.length < 2) {
            tempTime = tempTime + "0" + seconds;
        } else {
            tempTime = tempTime + seconds;
        }
        return tempTime;
    }

    public stopTime(): void {
        if (this.hasEventListener(egret.Event.ENTER_FRAME)) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHander,this);
            this.totalTime = this.totalTime - (new Date().getTime() - this.runTime) / 1000;
            this.challengeStartTime = this.challengeStartTime + (new Date().getTime() - this.runTime) / 1000;
        }
    }

    public resumeTime(): void {
        this.refreshTwinkleStartTime();
        if (!this.hasEventListener(egret.Event.ENTER_FRAME))
            this.startTime();
    }

	public refresh(time:number, isForward:boolean, timeStringMode:string, timeFunc:Function, timeEndFunc:Function,thisObjParam:any): void {
		this.thisObj=thisObjParam;
        if (isForward == null)
            isForward = true;
        this.isForwarding = isForward;
        if (time == null)
            time = 0;
        this.timeFunction = timeFunc;
        this.timeEndFunction = timeEndFunc;
        if (this.isForwarding)
            this.challengeStartTime = time;
        else
            this.totalTime = time;
        if (!timeStringMode)
            timeStringMode = TimeManager.SECOND;
        this.timeMode = timeStringMode;

        this.stopTime();
        if (this.timeFunction)
            this.timeFunction.call(this.thisObj,this.getTimeString(time), 0);
        this.refreshTwinkleStartTime();
        this.startTime();
    }
}