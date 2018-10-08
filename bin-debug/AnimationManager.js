var AnimationManager = (function () {
    function AnimationManager() {
    }
    var d = __define,c=AnimationManager,p=c.prototype;
    AnimationManager.createAnimation = function (data, texture) {
        var mcFactory = new egret.MovieClipDataFactory(data, texture);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData());
        return mc;
    };
    return AnimationManager;
}());
egret.registerClass(AnimationManager,'AnimationManager');
