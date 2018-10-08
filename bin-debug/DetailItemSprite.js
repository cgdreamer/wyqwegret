var DetailItemSprite = (function (_super) {
    __extends(DetailItemSprite, _super);
    function DetailItemSprite(wordInfo, isCorrect, wordIndex, detailSprite) {
        _super.call(this);
        this.FONT_SIZE = 14;
        this.GAP = 3;
        this.CORRECT_COLOR = 0x54b148;
        this.WRONG_COLOR_0 = 0xff6696;
        this.WRONG_COLOR_1 = 0xe0e0e0;
        this.DEFAULT_COLOR = 0xbbbcc1;
        this.CELL_H = 43;
        this.FIRST_CELL_X = 0;
        this.FIRST_CELL_W = 64;
        this.SECOND_CELL_W = 317;
        this.THIRD_CELL_W = 64;
        this.FORTH_CELL_W = 65;
        this.touchEnabled = true;
        this.theWordInfo = wordInfo;
        this.detail = detailSprite;
        this.bg = new egret.Shape();
        this.addChild(this.bg);
        this.rightWrongBtnBitmap = new egret.Bitmap();
        var color0;
        var color1;
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
        var indexText = new egret.TextField();
        indexText.multiline = false;
        indexText.wordWrap = false;
        indexText.fontFamily = GlobalModel.font;
        indexText.size = this.FONT_SIZE;
        indexText.textColor = 0xffffff;
        indexText.text = wordIndex + "";
        indexText.x = this.FIRST_CELL_X + (this.FIRST_CELL_W - indexText.width) / 2;
        indexText.y = (this.CELL_H - indexText.height) / 2;
        this.addChild(indexText);
        var wordText = new egret.TextField();
        wordText.multiline = false;
        wordText.wordWrap = false;
        wordText.fontFamily = GlobalModel.font;
        wordText.size = this.FONT_SIZE;
        wordText.textColor = 0x000000;
        wordText.text = wordInfo.pronounce;
        wordText.x = this.FIRST_CELL_X + this.FIRST_CELL_W + this.GAP + 5;
        wordText.y = (this.CELL_H - wordText.height) / 2;
        this.addChild(wordText);
        var data = RES.getRes("soundanimation_json");
        var txtr = RES.getRes("soundanimation_png");
        this.soundAnimation = AnimationManager.createAnimation(data, txtr);
        this.soundAnimation.addEventListener(egret.Event.COMPLETE, this.soundAnimCompleted, this);
        this.soundAnimation.gotoAndStop(1);
        this.soundAnimation.x = this.FIRST_CELL_X + this.FIRST_CELL_W + this.GAP + this.SECOND_CELL_W + this.GAP + 10;
        this.soundAnimation.y = (this.CELL_H - this.soundAnimation.height) / 2;
        this.addChild(this.soundAnimation);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.playSound, this);
    }
    var d = __define,c=DetailItemSprite,p=c.prototype;
    p.soundAnimCompleted = function (e) {
        this.soundAnimation.stop();
        this.detail.touchEnabled = true;
        this.detail.touchChildren = true;
    };
    ;
    p.playSound = function () {
        this.detail.touchEnabled = false;
        this.detail.touchChildren = false;
        GlobalModel.audioManager.play(this.theWordInfo.sound, false, this.startPlayAudio, this);
    };
    ;
    p.startPlayAudio = function () {
        this.soundAnimation.gotoAndPlay(1, 1);
    };
    return DetailItemSprite;
}(egret.DisplayObjectContainer));
egret.registerClass(DetailItemSprite,'DetailItemSprite');
