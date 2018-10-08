class GlobalModel {
    static isDebug: boolean=true;
    static version: string="1.1.0";
    static contentWidth: number = 800;
    static contentHeight: number = 600;
    static font:string="微软雅黑";
    static host:string= "www.anoah.com";

    static main:Main;
    static scenes:Array<egret.DisplayObject>=new Array<egret.DisplayObject>();
    static currentScene:egret.DisplayObject;
    static currentSceneName:string;
    static startTime:number=6;
    static playTime:number=0;

    static wordsInfo: Array<WordsInfo>;
    static recordCommitted:boolean=false;

    static audioManager:AudioManager;
    static soundUrls:Object={right:"right",wrong:"wrong",bg:"bgm"};

    static rightPercent:number=0;
    static isPlayEnd:boolean=false;
    static isTimeEnd:boolean=false;
    static isWin:boolean=null;
    static doneNumber:number=0;
    static rightNumber:number=0;
    static wrongWords:Array<number>=new Array<number>();
    static rightWords:Array<number>=new Array<number>();
}