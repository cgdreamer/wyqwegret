class LoaderClass {

    public theResultHandler: Function;
    public theFaultHandler: Function;

    public constructor() {

    }

    public sendPostRequest(url: string, dataString: string = null, resultHandler: Function = null, faultHandler: Function = null, method: string = egret.URLRequestMethod.GET, dataFormat: string = egret.URLLoaderDataFormat.TEXT): void {
        this.theResultHandler = resultHandler;
        this.theFaultHandler = faultHandler == null ? this.ioErrorHandler : faultHandler;
        var urlRequest: egret.URLRequest;
        urlRequest = new egret.URLRequest(url);
        var header: egret.URLRequestHeader = new egret.URLRequestHeader("Access-Control-Allow-Origin", "*");
        urlRequest.requestHeaders.push(header);
        header = new egret.URLRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1");
        urlRequest.requestHeaders.push(header);
        var urlVariables: egret.URLVariables = new egret.URLVariables(dataString);
        urlRequest.method = method;
        urlRequest.data = urlVariables;
        var urlLoader: egret.URLLoader = new egret.URLLoader();
        urlLoader.dataFormat = dataFormat;
        urlLoader.addEventListener(egret.Event.COMPLETE, this.completeHandler, this);
        urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);
        urlLoader.load(urlRequest);
    }

    private completeHandler(e: egret.Event = null): void {
        var info: any = JSON.parse(e.target.data);
        if (this.theResultHandler != null) {
            this.theResultHandler(info);
        }
    }

    private ioErrorHandler(e: egret.Event = null): void {
        console.warn("网络问题,出现网络问题,请稍后再试");
    }
}