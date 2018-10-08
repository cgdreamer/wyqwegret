var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.params = null;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        GlobalModel.main = this;
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        this.onResize();
        this.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    p.onResize = function (e) {
        this.scaleX = this.stage.stageWidth / GlobalModel.contentWidth;
        this.scaleY = this.stage.stageHeight / GlobalModel.contentHeight;
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoaded, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onLoaded = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoaded, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        // console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        // console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onLoaded(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "resource") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        this.addChild(this.createBitmapByName("gamescenebg"));
        this.loadingView = new LoadingUI();
        this.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoaded, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("resource");
    };
    p.onResourceLoaded = function (e) {
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
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 根据场景名称切换到场景中
     **/
    p.changeToSceneByName = function (sceneName) {
        if (GlobalModel.scenes[sceneName]) {
            this.showSceneWhenSceneIsReady(GlobalModel.scenes[sceneName], sceneName);
        }
        else {
            var clazz = egret.getDefinitionByName(sceneName);
            GlobalModel.scenes[sceneName] = new clazz();
            this.showSceneWhenSceneIsReady(GlobalModel.scenes[sceneName], sceneName);
        }
    };
    p.getSceneByName = function (sceneName) {
        if (GlobalModel.scenes[sceneName])
            return GlobalModel.scenes[sceneName];
    };
    p.commitRecord = function () {
        // if (!Globals.recordCommitted) {
        //     Globals.recordCommitted = true;
        //     IComInfo.commitRecord(getSubmitScoreHander, getSubmitErrorHander);
        // }
    };
    p.generateRecord = function (ke, score, quota, should, should_entity, fact_entity, mode) {
        // if (!Globals.recordCommitted) {
        //     IComInfo.generateRecord(ke, score, quota, should, should_entity, fact_entity, mode);
        // }
    };
    p.showSceneWhenSceneIsReady = function (scene, sceneName) {
        if (GlobalModel.currentScene) {
            this.removeChild(GlobalModel.currentScene);
        }
        GlobalModel.currentScene = scene;
        GlobalModel.currentSceneName = sceneName;
        this.addChild(scene);
        if (sceneName == "PlayScene")
            scene.start();
    };
    p.loadFromServer = function () {
        var entity;
        if (GlobalModel.isDebug) {
            entity = "<data><psIds>1,2,3,4,5,6,7,8</psIds></data>";
        }
        var parser = new DOMParser();
        this.params = parser.parseFromString(entity, "text/xml");
        var ids = this.params.getElementsByTagName("psIds")[0].childNodes[0].nodeValue;
        var data = {};
        var infoData = { ids: ids };
        data.info = infoData;
        data.app_key = "wyqw";
        data.token = "";
        var params = "info=" + JSON.stringify(data);
        new LoaderClass().sendPostRequest("http://" + GlobalModel.host + "/api_cache/", "q=json/oauth/apps/phonetic/lists&" + params, this.getUnitWorldResultHander);
    };
    p.getUnitWorldResultHander = function (value) {
        GlobalModel.audioManager = new AudioManager();
        var recordSet = value.recordset;
        var num = recordSet.length;
        GlobalModel.wordsInfo = new Array();
        var obj;
        for (var i = 0; i < num; i++) {
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
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
