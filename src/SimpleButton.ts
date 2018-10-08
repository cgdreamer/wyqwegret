class SimpleButton extends egret.DisplayObjectContainer {
	public constructor(up: string, down: string = "", disenable: string = "", isClip: boolean = false, hitArea: egret.Rectangle = null) {
		super();
		this.touchEnabled = true;
		this.isClip = isClip;
		this.init(up, down, disenable, hitArea);
	}

	private upbit: egret.Bitmap = null;
	private downbit: egret.Bitmap = null;
	private disenablebit: egret.Bitmap = null;
	private hitAreaObj: egret.Shape;

	private isClip: boolean;
	private currentState: number = 1;
	private _enable: boolean = true;

	public changeState: Function;

	public set enable(value: boolean) {
		this._enable = value;
		if (this.hitAreaObj) {
			this.hitAreaObj.touchEnabled = value;
		}
		else {
			this.touchEnabled = value;
		}
		if (this.disenablebit != null) {
			this.disenablebit.visible = !value;
			this.upbit.visible = value;
			if (this.downbit != null) {
				this.downbit.visible = false;
			}
		}
	}

	public get enable(): boolean {
		return this._enable;
	}

	private init(up: string, down: string = "", disenable: string = "", hitArea: egret.Rectangle = null): void {
		let txtr: egret.Texture;

		txtr = RES.getRes(up);
		this.upbit = new egret.Bitmap(txtr);

		if (down != "") {
			txtr = RES.getRes(down);
			this.downbit = new egret.Bitmap(txtr);
			this.addChild(this.downbit);
			this.downbit.visible = false;
		}

		if (disenable != "") {
			txtr = RES.getRes(disenable);
			this.disenablebit = new egret.Bitmap(txtr);
			this.addChild(this.disenablebit);
			this.disenablebit.visible = false;
		}

		this.addChild(this.upbit);

		if (hitArea) {
			this.hitAreaObj = new egret.Shape();
			this.hitAreaObj.graphics.beginFill(0x000000, 0);
			this.hitAreaObj.graphics.drawRect(hitArea.x, hitArea.y, hitArea.width, hitArea.height);
			this.hitAreaObj.graphics.endFill();
			this.hitAreaObj.touchEnabled = true;
			this.touchEnabled = false;
			this.addChild(this.hitAreaObj);
			this.hitAreaObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			this.hitAreaObj.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			this.hitAreaObj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
		}
		else {
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
		}
	}

	private onTouchBegin(e: egret.TouchEvent): void {
		if (!this._enable) return;
		if (!this.isClip) {
			if (this.downbit != null) {
				this.downbit.visible = true;
				this.upbit.visible = false;
			}
		} else {
			if (this.downbit != null) {
				this.downbit.visible = !this.downbit.visible;
				this.upbit.visible = !this.downbit.visible;
				this.currentState = this.downbit.visible ? 2 : 1;
				if (this.changeState != null) {
					this.changeState(this.currentState);
				}
			}
		}
	}

	private onTouchEnd(e: egret.TouchEvent): void {
		if (!this._enable) return;
		if (!this.isClip) {
			if (this.downbit != null) {
				this.upbit.visible = true;
				this.downbit.visible = false;
			}
		}
	}

	public destroy(): void {
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
		this.upbit = null;
		this.downbit = null;
		this.disenablebit = null;
	}
}