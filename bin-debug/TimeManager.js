var TimeManager = (function (_super) {
    __extends(TimeManager, _super);
    function TimeManager() {
        _super.call(this);
        this.runTime = 0;
        this.isForwarding = true;
        this.timeMode = "s";
        this.totalTime = 0;
        this.challengeStartTime = 0;
        this.twinkleTime = 30;
        this.twinkleStartTime = 0;
        this.lastRunTime = 0;
    }
    var d = __define,c=TimeManager,p=c.prototype;
    p.refreshTwinkleStartTime = function () {
        this.twinkleStartTime = new Date().getTime();
    };
    p.startTime = function () {
        var dateObject = new Date();
        this.runTime = dateObject.getTime();
        this.lastRunTime = this.runTime;
        if (!this.hasEventListener(egret.Event.ENTER_FRAME))
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHander, this);
    };
    p.onEnterFrameHander = function () {
        var dateObjectTime = new Date().getTime();
        var pastTime = (dateObjectTime - this.runTime) / 1000;
        var nowRunTime = dateObjectTime;
        var innerTime = nowRunTime - this.lastRunTime;
        this.lastRunTime = nowRunTime;
        var tempValue;
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
            this.timeFunction.call(this.thisObj, tempTime, innerTime);
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
    };
    p.getTimeString = function (value) {
        var minute = Math.ceil(value / 60) + "";
        var seconds = Math.ceil(value % 60) + "";
        var tempTime = "";
        if (this.timeMode == "ms") {
            if (minute.length < 2) {
                tempTime = "0" + minute;
            }
            else {
                tempTime = minute;
            }
            tempTime = tempTime + ":";
        }
        if (seconds.length < 2) {
            tempTime = tempTime + "0" + seconds;
        }
        else {
            tempTime = tempTime + seconds;
        }
        return tempTime;
    };
    p.stopTime = function () {
        if (this.hasEventListener(egret.Event.ENTER_FRAME)) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHander, this);
            this.totalTime = this.totalTime - (new Date().getTime() - this.runTime) / 1000;
            this.challengeStartTime = this.challengeStartTime + (new Date().getTime() - this.runTime) / 1000;
        }
    };
    p.resumeTime = function () {
        this.refreshTwinkleStartTime();
        if (!this.hasEventListener(egret.Event.ENTER_FRAME))
            this.startTime();
    };
    p.refresh = function (time, isForward, timeStringMode, timeFunc, timeEndFunc, thisObjParam) {
        this.thisObj = thisObjParam;
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
            this.timeFunction.call(this.thisObj, this.getTimeString(time), 0);
        this.refreshTwinkleStartTime();
        this.startTime();
    };
    TimeManager.MINUTE_AND_SECOND = "ms";
    TimeManager.SECOND = "s";
    return TimeManager;
}(egret.Sprite));
egret.registerClass(TimeManager,'TimeManager');
