var DetailSprite = (function (_super) {
    __extends(DetailSprite, _super);
    function DetailSprite() {
        _super.call(this);
        this.NUM_IN_PAGE = 5;
        this.ITEM_X = 38;
        this.ITEM_START_Y = 136;
        this.ITEM_GAP = 3;
        this.totalPage = 0;
        this.pageIndex = 0;
        this.itemSprite = new egret.DisplayObjectContainer();
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
    var d = __define,c=DetailSprite,p=c.prototype;
    p.returnBtnMouseDown = function (e) {
        if (this.rankBitmap) {
            if (this.rankBitmap.parent)
                this.rankBitmap.parent.removeChild(this.rankBitmap);
            this.rankBitmap = null;
        }
        GlobalModel.main.getSceneByName("PlayScene")["showDetailSprite"](false);
    };
    p.pageBtnMouseDownHandler = function (event) {
        event.currentTarget.enable = false;
        if (event.currentTarget == this.leftPageBtn) {
            this.pageIndex = this.pageIndex - 1;
        }
        else {
            this.pageIndex = this.pageIndex + 1;
        }
        this.gotoPageByIndex(this.pageIndex);
    };
    p.gotoPageByIndex = function (index) {
        this.pageIndexText.text = index + 1 + "/" + this.totalPage;
        this.rightPageBtn.x = this.pageIndexText.x + this.pageIndexText.width + 19;
        this.pageSprite.x = (this.bg.width - this.pageSprite.width) / 2;
        var wordsInfo = GlobalModel.wordsInfo.concat().splice(index * this.NUM_IN_PAGE, 5);
        var item;
        var wordIndex;
        var isCorrect = null;
        var i;
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
    ;
    p.refresh = function () {
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
    };
    return DetailSprite;
}(egret.DisplayObjectContainer));
egret.registerClass(DetailSprite,'DetailSprite');
