class AnimationManager {
	public static createAnimation(data: any, texture: any): egret.MovieClip {
		var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        var mc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData());
		return mc;
	}
}