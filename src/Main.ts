//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
interface WordsInfo {
    pronounce: string;
    sound: string;
    confusingwords: Array<string>;
}

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    private params: Document = null;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        GlobalModel.main = this;
    }

    private onAddToStage(event: egret.Event) {
        this.onResize();
        this.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    private onResize(e?: egret.Event): void {
        this.scaleX = this.stage.stageWidth / GlobalModel.contentWidth;
        this.scaleY = this.stage.stageHeight / GlobalModel.contentHeight;
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoaded, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onLoaded(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoaded, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);

            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        // console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        // console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onLoaded(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "resource") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {
        this.addChild(this.createBitmapByName("gamescenebg"));
        this.loadingView = new LoadingUI();
        this.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoaded, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("resource");
    }

    private onResourceLoaded(e: RES.ResourceEvent): void {
        this.removeChild(this.loadingView);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoaded, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

        this.loadFromServer();
        // var data = RES.getRes("wrong0_json");
        // var txtr = RES.getRes("wrong0_png");
        // var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        // var mcWrong0: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData());
        // mcWrong0.scaleX=GlobalModel.contentWidth/mcWrong0.width;
        // mcWrong0.scaleY=mcWrong0.scaleX;
        // mcWrong0.y=100;
        // this.addChild(mcWrong0);
        // mcWrong0.play(-1);

        // var data1 = RES.getRes("right0_json");
        // var txtr1 = RES.getRes("right0_png");
        //  var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data1, txtr1);
        // var mcWrong1 = new egret.MovieClip(mcFactory.generateMovieClipData());
        // mcWrong1.scaleX=GlobalModel.contentWidth/mcWrong1.width;
        // mcWrong1.scaleY=mcWrong1.scaleX;
        // mcWrong1.x=-300;
        // mcWrong1.y=0;
        // this.addChild(mcWrong1);
        // mcWrong1.play(-1);
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 根据场景名称切换到场景中
     **/
    public changeToSceneByName(sceneName: string): void {
        if (GlobalModel.scenes[sceneName]) {
            this.showSceneWhenSceneIsReady(GlobalModel.scenes[sceneName], sceneName);
        }
        else {
            var clazz: any = egret.getDefinitionByName(sceneName);
            GlobalModel.scenes[sceneName] = new clazz();
            this.showSceneWhenSceneIsReady(GlobalModel.scenes[sceneName], sceneName);
        }
    }

    public getSceneByName(sceneName: string): egret.DisplayObject {
        if (GlobalModel.scenes[sceneName])
            return GlobalModel.scenes[sceneName];
    }

    public commitRecord(): void {
        // if (!Globals.recordCommitted) {
        //     Globals.recordCommitted = true;
        //     IComInfo.commitRecord(getSubmitScoreHander, getSubmitErrorHander);
        // }
    }

    public generateRecord(ke:number, score:number, quota:string, should:number, should_entity:Array<string>, fact_entity:Array<string>, mode:number): void {
        // if (!Globals.recordCommitted) {
        //     IComInfo.generateRecord(ke, score, quota, should, should_entity, fact_entity, mode);
        // }
    }

    private showSceneWhenSceneIsReady(scene: any, sceneName: string): void {
        if (GlobalModel.currentScene) {
            this.removeChild(GlobalModel.currentScene);
        }
        GlobalModel.currentScene = scene;
        GlobalModel.currentSceneName = sceneName;
        this.addChild(scene);
        if (sceneName == "PlayScene")
            scene.start();
    }

    private loadFromServer(): void {
        var entity: string;
        if (GlobalModel.isDebug) {
            entity = "<data><psIds>1,2,3,4,5,6,7,8</psIds></data>";
        }
        var parser = new DOMParser();
        this.params = parser.parseFromString(entity, "text/xml");
        var ids: string = this.params.getElementsByTagName("psIds")[0].childNodes[0].nodeValue;
        var data: any = {};
        var infoData: Object = { ids: ids };
        data.info = infoData;
        data.app_key = "wyqw";
        data.token = "";
        var params: string = "info=" + JSON.stringify(data);
        new LoaderClass().sendPostRequest("http://" + GlobalModel.host + "/api_cache/", "q=json/oauth/apps/phonetic/lists&" + params, this.getUnitWorldResultHander);

    }

    private getUnitWorldResultHander(value: any): void {
        GlobalModel.audioManager=new AudioManager();
        var recordSet: Array<any> = value.recordset;
        var num: number = recordSet.length;
        GlobalModel.wordsInfo = new Array<WordsInfo>();
        var obj: any;
        for (var i: number = 0; i < num; i++) {
            obj = {};
            obj.pronounce = recordSet[i]["content"];
            obj.sound = recordSet[i]["audio"];
            var confusingwords = recordSet[i]["confusingwords"];
            obj.confusingwords = [];
            for (var j in confusingwords) {
                obj.confusingwords.push(confusingwords[j].content);
            }
            GlobalModel.wordsInfo.push(obj);
        }
        GlobalModel.main.changeToSceneByName("StartScene");
    }
}