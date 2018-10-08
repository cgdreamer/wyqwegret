var GlobalModel = (function () {
    function GlobalModel() {
    }
    var d = __define,c=GlobalModel,p=c.prototype;
    GlobalModel.isDebug = true;
    GlobalModel.version = "1.1.0";
    GlobalModel.contentWidth = 800;
    GlobalModel.contentHeight = 600;
    GlobalModel.font = "微软雅黑";
    GlobalModel.host = "www.anoah.com";
    GlobalModel.scenes = new Array();
    GlobalModel.startTime = 6;
    GlobalModel.playTime = 0;
    GlobalModel.recordCommitted = false;
    GlobalModel.soundUrls = { right: "right", wrong: "wrong", bg: "bgm" };
    GlobalModel.rightPercent = 0;
    GlobalModel.isPlayEnd = false;
    GlobalModel.isTimeEnd = false;
    GlobalModel.isWin = null;
    GlobalModel.doneNumber = 0;
    GlobalModel.rightNumber = 0;
    GlobalModel.wrongWords = new Array();
    GlobalModel.rightWords = new Array();
    return GlobalModel;
}());
egret.registerClass(GlobalModel,'GlobalModel');
