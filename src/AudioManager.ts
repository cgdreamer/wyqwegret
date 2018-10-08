class AudioManager {
    private sounds: Array<egret.Sound> = new Array<egret.Sound>();
    private soundUrlPrefix: string = "resource/";
    private currentBgSound: egret.Sound = null;
    private currentBgSoundC: egret.SoundChannel;
    private isBgsound:boolean=false;
    private sound: egret.Sound;
    private isPlayBgsound: boolean = false;
    private functionWhenSoundStartPlaying: Function;
    private currentSoundName: string;

    private thisObj:any;

    public constructor() {
    }

    public play(soundName: string, isBgsound: boolean, funcWhenSoundPlayStart: Function, thisObjParam: any, notRecordUtilSound: boolean = false): void {
        // if(window.RecordUtil && !notRecordUtilSound) {
        //     trace("通过壳子播放声音~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        //     //var soundUrl=Globals.host+"/icom/CulturalMatching/"+soundUrlPrefix+Globals.soundUrls[soundName]+".mp3";
        //     if(isBgsound)
        //     {
        //         if(!isPlayBgsound)
        //         {
        //             window.RecordUtil.playloop(soundName);
        //             isPlayBgsound=true;
        //         }
        //     }
        //     else
        //     {
        //         window.RecordUtil.play(soundName,"");
        //         trace("声音:"+soundName);
        //     }
        //     if(funcWhenSoundPlayStart)
        //         funcWhenSoundPlayStart();
        // }
        // else
        // {
        // 	var reg=new RegExp("http:\\/\\/[^/]+","g");
        // 	soundName = soundName.replace(reg,Globals.host);
        //     currentSoundName=soundName;

        //     var sound;
        //     if(_this.sounds.hasOwnProperty(soundName))
        //     {
        //         if(!_this.sounds[soundName].playing)
        //         {
        //             if(isBgsound)
        //             {
        //                 currentBgSound=_this.sounds[soundName];
        //                 currentBgSound.play(0,999);
        //             }
        //             else
        //             {
        //                 sound=_this.sounds[soundName];
        //                 sound.play(0,1);
        //             }
        //             if(funcWhenSoundPlayStart)
        //                 funcWhenSoundPlayStart();
        //         }
        //     }
        //     else
        //     {
        //         var url="";
        //         functionWhenSoundStartPlaying=funcWhenSoundPlayStart;
        //         if(Globals.soundUrls.hasOwnProperty(soundName))
        //         {
        //             url=soundUrlPrefix+Globals.soundUrls[soundName];
        //             if(LGlobal.isFirefox){
        //                 url=url + ".mp3";
        //             }else {
        //                 url=url + ".mp3," + url + ".ogg," + url + ".aac";
        //             }
        //             if(isBgsound)
        //             {
        //                 currentBgSound=new LSound();
        //                 currentBgSound.addEventListener(LEvent.COMPLETE,loadComplete);
        //                 currentBgSound.load(url);
        //             }
        //             else
        //             {
        //                 sound=new LSound();
        //                 sound.addEventListener(LEvent.COMPLETE,loadComplete);
        //                 sound.load(url);
        //             }
        //         }
        //         else
        //         {
        //             if(isBgsound)
        //             {
        //                 currentBgSound=new LSound();
        //                 currentBgSound.addEventListener(LEvent.COMPLETE,loadComplete);
        //                 currentBgSound.load(soundName);
        //             }
        //             else
        //             {
        //                 sound=new LSound();
        //                 sound.addEventListener(LEvent.COMPLETE,loadComplete);
        //                 sound.load(soundName);
        //                 trace("语音路径:"+soundName);
        //             }
        //         }
        //         if(isBgsound)
        //             _this.sounds[soundName]=currentBgSound;
        //         else
        //             _this.sounds[soundName]=sound;
        //     }
        this.isBgsound=isBgsound;
        this.thisObj=thisObjParam;
        var reg = new RegExp("http:\\/\\/[^/]+", "g");
        soundName = soundName.replace(reg, "http://" + GlobalModel.host);
        this.currentSoundName = soundName;
        if (this.sounds.hasOwnProperty(soundName)) {
            if (isBgsound) {
                this.currentBgSound = this.sounds[soundName];
                this.currentBgSoundC = this.currentBgSound.play(0, 999);
            }
            else {
                this.sound = this.sounds[soundName];
                this.sound.play(0, 1);
            }
            if (funcWhenSoundPlayStart)
                funcWhenSoundPlayStart.call(thisObjParam);
        }
        else {
            var url = "";
            this.functionWhenSoundStartPlaying = funcWhenSoundPlayStart;
            if (GlobalModel.soundUrls.hasOwnProperty(soundName)) {
                url = GlobalModel.soundUrls[soundName] + "_mp3";
                if (isBgsound) {
                    this.currentBgSound = <egret.Sound>RES.getRes(url);
                    this.currentBgSoundC = this.currentBgSound.play(0, 998)
                }
                else {
                    this.sound = <egret.Sound>RES.getRes(url);
                    this.sound.play(0, 1);
                }
            }
            else {
                if (isBgsound) {
                    this.currentBgSound = new egret.Sound();
                    this.currentBgSound.addEventListener(egret.Event.COMPLETE, this.loadComplete, this);
                    this.currentBgSound.load(soundName);
                }
                else {
                    this.sound = new egret.Sound();
                    this.sound.addEventListener(egret.Event.COMPLETE, this.loadComplete, this);
                    this.sound.load(soundName);
                    console.log("语音路径:" + soundName);
                }
            }
            if (isBgsound)
                this.sounds[soundName] = this.currentBgSound;
            else
                this.sounds[soundName] = this.sound;
        }
    }

    private loadComplete(event: egret.Event): void {
        if (this.isBgsound)
            this.currentBgSoundC = this.currentBgSound.play(0, 998);
        else {
            this.sound = this.sounds[this.currentSoundName];
            this.sound.play(0, 1);
            console.log("语音加载完成:" + this.currentSoundName);
        }
        if (this.functionWhenSoundStartPlaying)
            this.functionWhenSoundStartPlaying.call(this.thisObj);
    }

    public stopBgSound(): void {
        if (this.currentBgSoundC)
            this.currentBgSoundC.stop();
    }
}