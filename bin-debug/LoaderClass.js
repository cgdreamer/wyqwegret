var LoaderClass = (function () {
    function LoaderClass() {
    }
    var d = __define,c=LoaderClass,p=c.prototype;
    p.sendPostRequest = function (url, dataString, resultHandler, faultHandler, method, dataFormat) {
        if (dataString === void 0) { dataString = null; }
        if (resultHandler === void 0) { resultHandler = null; }
        if (faultHandler === void 0) { faultHandler = null; }
        if (method === void 0) { method = egret.URLRequestMethod.GET; }
        if (dataFormat === void 0) { dataFormat = egret.URLLoaderDataFormat.TEXT; }
        this.theResultHandler = resultHandler;
        this.theFaultHandler = faultHandler == null ? this.ioErrorHandler : faultHandler;
        var urlRequest;
        urlRequest = new egret.URLRequest(url);
        var header = new egret.URLRequestHeader("Access-Control-Allow-Origin", "*");
        urlRequest.requestHeaders.push(header);
        header = new egret.URLRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1");
        urlRequest.requestHeaders.push(header);
        var urlVariables = new egret.URLVariables(dataString);
        urlRequest.method = method;
        urlRequest.data = urlVariables;
        var urlLoader = new egret.URLLoader();
        urlLoader.dataFormat = dataFormat;
        urlLoader.addEventListener(egret.Event.COMPLETE, this.completeHandler, this);
        urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);
        urlLoader.load(urlRequest);
    };
    p.completeHandler = function (e) {
        if (e === void 0) { e = null; }
        var info = JSON.parse(e.target.data);
        if (this.theResultHandler != null) {
            this.theResultHandler(info);
        }
    };
    p.ioErrorHandler = function (e) {
        if (e === void 0) { e = null; }
        console.warn("网络问题,出现网络问题,请稍后再试");
    };
    return LoaderClass;
}());
egret.registerClass(LoaderClass,'LoaderClass');
