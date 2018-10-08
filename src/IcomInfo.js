/**
 * Created by mjs on 2014/8/4.
 */
var IComInfo = ( function () {
    
	 function IComInfo() {
		//初始化学习记录对像
		 IComInfo.prototype.recordObject=this.initRecordObject();
	 }
	 IComInfo.prototype={
	 	pageName:"",
	 	recordObject:{},
	 	
	 	/**
		*获取decomEntity数据
		**/
		getDcomEntity:function(){
			var dcomInfo=this.getDcomInfo();
			if(dcomInfo){
                console.log(dcomInfo);
                this.host="http://"+dcomInfo.config.recordset[0].server_domain;                
                var obj;
				var s=dcomInfo.content_item_id; 
				obj=JSON.parse(decodeURIComponent(s));
				if (obj.visitor == "student")
				{
					this.isTeacher = false;
				}
				else
				{
					this.isTeacher = true;
				}
				
                return dcomInfo.dcom.entity;
			}else{
				return "<data><docIds>1-1,2-1,3-0,4-1,5-1,6-0,12-0,12-1,17-0,17-1</docIds></data>";
			}
			return null;
		},
		
		 /**
		   *销毁
		   **/
		   destroy:function(){
			   this.commitRecord(null,null);
		   },
		   
		  exit:function(){
		     if(window.JSIcomUtil){
				window.JSIcomUtil.icomsExit();
			}
		   },
		
		formatData:function(date, format) {   
			if (!date) return;   
			if (!format) format = "yyyy-MM-dd";   
			switch(typeof date) {   
				case "string":   
					date = new Date(date.replace(/-/, "/"));   
					break;   
				case "number":   
					date = new Date(date);   
					break;   
			}    
			if (!date instanceof Date) return;   
			var dict = {   
				"yyyy": date.getFullYear(),   
				"M": date.getMonth() + 1,   
				"d": date.getDate(),   
				"H": date.getHours(),   
				"m": date.getMinutes(),   
				"s": date.getSeconds(),   
				"MM": ("" + (date.getMonth() + 101)).substr(1),   
				"dd": ("" + (date.getDate() + 100)).substr(1),   
				"HH": ("" + (date.getHours() + 100)).substr(1),   
				"mm": ("" + (date.getMinutes() + 100)).substr(1),   
				"ss": ("" + (date.getSeconds() + 100)).substr(1)   
			};       
			return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {   
				return dict[arguments[0]];   
			});                   
		},
				
		/**
		 * 获取信息存储信息
		 */
		getDcomInfo:function(){
		  var icomId=this.getUrlParam("icom");
		  var dcomInfo=this.getIcomData(icomId);
		 return dcomInfo;
	 
		},
		/**
		**
		**/
		getConfig:function(){
			var dcomInfo=this.getDcomInfo();
			if(dcomInfo){
				return dcomInfo.config;
			}
			return null;
		},
		getIcomPath:function(){
			var dcomInfo=this.getDcomInfo();
			if(dcomInfo){
				return dcomInfo.config.recordset[0].icoms_path+dcomInfo.config.recordset[0].package_name+"/";
			}
			return null;
		}
		,
		
		/**
		 * 获取url参数
		 */
		getUrlParam:function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
				return unescape(r[2]);
			return null;
		},
		/**
		 * 获取icom信息数据
		 */
		getIcomData:function(icomId){
		    if(window.parent && window.parent.icoms_obj_data){
				var icomInfo=window.parent.icoms_obj_data[icomId];
			}else{
				//从android应用盒子中获取jsicom适配器中的数据
				if(window.JSIcomUtil){
					var infos=window.JSIcomUtil.icoms_obj_data();
					console.log("获取小机配置："+infos);
					var infoObject=JSON.parse(infos);
				
					if(infoObject[icomId]){
						return infoObject[icomId];
					}
				}else{
					 console.log("非icom环境");
				}
			}
			return icomInfo;
		},
		/**
		*装载xml字符串
		**/
		 loadXML:function(xmlString){  
			var xmlDoc;  
			if (window.ActiveXObject)  
			{  
				xmlDoc = new ActiveXObject('Microsoft.XMLDOM');  
				if(!xmlDoc) xmldoc = new ActiveXObject("MSXML2.DOMDocument.3.0");  
				xmlDoc.async = false;  
				xmlDoc.loadXML(xmlString);  
			}else if (document.implementation && document.implementation.createDocument)  
			{  
				//xmlDoc = document.implementation.createDocument('', '', null);  
				//xmlDoc.load(xmlFile);  
				var domParser = new DOMParser();  
				xmlDoc = domParser.parseFromString(xmlString, 'text/xml');  
			}else  
			{  
				return null;  
			}  
			return xmlDoc;  
		},
		/**
		*初始化学习记录对像
		***/
	    initRecordObject:function(){
			var dcomInfo=this.getDcomInfo();
				var recordObject={app_key:"",token:""};
				recordObject.info={};
				if(dcomInfo)
				recordObject.info.content_item_id=JSON.parse(decodeURIComponent(dcomInfo.content_item_id));
				recordObject.info.end_time="";
				if(dcomInfo)
				recordObject.info.icom_id=dcomInfo.icom_id;
				recordObject.info.inst_id="0";
				if(dcomInfo)
				recordObject.info.dcom_id=dcomInfo.dcom.gid;
				recordObject.info.package_name=this.pageName;
				recordObject.info.record_data={};
				if(dcomInfo)
				 recordObject.info.record_data.dcom_id=dcomInfo.dcom.gid;
				 if(dcomInfo)
				 recordObject.info.record_data.start_time=this.formatData(new Date(),"yyyy-MM-dd HH:mm:ss");
				recordObject.info.record_data.ke_record=[];
				//使用方法 
				var now = new Date(); 
				
				var nowStr = this.formatData(now,"yyyy-MM-dd HH:mm:ss"); 
				recordObject.info.start_time=nowStr;
				if(dcomInfo){
				      if(!dcomInfo.user_id || dcomInfo.user_id =="null" || dcomInfo.user_id ==""){
							recordObject.info.user_id=0;
					  }else{
						recordObject.info.user_id=dcomInfo.user_id;
					}
				}
				return recordObject;
		},
		/**
		*初始化组件学习源
		*/
		initLearningSource:function(){
		var keObject={
			ke_time: this.formatData(new Date(),"yyyy-MM-dd HH:mm:ss"),
			  export:{
				should_entity: [], 
				guid: "0", 
				fact_entity: [], 
				fact: "0", 
				name: "组件学习源", 
				rule_code: "0", 
				quota_var: "VLearning_LearningSource", 
				quota_name: "组件学习源", 
				should: "100", 
				kind: "1", 
				mode: ""
			  }, 
			  ke_id: "learningSource:1", 
			  rule_code: "0"};
			 return keObject;
		},
		/**
	 	 * 生成学习记录对像
	 	 */
	 
		/**
		 * 生成学习记录
		 * @param kp
		 *        知识点定位标识（具有URL定位功能）
		 * @param ruleId(没指定规则时，则使用默认规则)
		 *        规则
		 * @param score
		 *        得分
		 * @param quota
		 *        相应指标的得分
		 * @param kind
		 *        检测指标类型，1效果 0次数
		 * @param mode
		 *        模式（可选），默认为空字符串
		 */
		generateRecord:function(ke,score,quota,should,should_entity,fact_entity,mode){
			this.deleteRepeat(ke);
			var learningSource=null;	
			if(this.recordObject.info.record_data.ke_record.length==0){
				learningSource=this.initLearningSource();
				this.recordObject.info.record_data.ke_record.push(learningSource);
			}else{
				learningSource=this.recordObject.info.record_data.ke_record[0];
			}
			//添加学习源
			var tempFactEntity=learningSource.export.fact_entity;		
			if(tempFactEntity.indexOf(ke)==-1){
				tempFactEntity.push(ke);
			}
		    var now = new Date(); 
			var nowStr = this.formatData(now,"yyyy-MM-dd HH:mm:ss");
			var keObject={ke_id:ke,ke_time:nowStr,rule_code:0};
			var exportVar={};
			exportVar.fact=score;
			exportVar.fact_entity=fact_entity;
			exportVar.guid="1";
			exportVar.kind=mode;
			exportVar.mode=mode;
			exportVar.name=name;
			exportVar.quota_name="";
			exportVar.quota_var=quota;
			exportVar.rule_code="0";
			exportVar.should=should;
			exportVar.should_entity=should_entity;
			keObject.export=exportVar;
			this.recordObject.info.record_data.ke_record.push(keObject);
			
		},
		
		deleteRepeat:function(ke){
			var recordArr = this.recordObject.info.record_data.ke_record;
			for (x in recordArr)
			{
				if(recordArr[x].ke_id == ke)
				{
					recordArr.splice(x,1);
				}				
			}			
		},
		
		sortRecord:function(){
			var recordArr = this.recordObject.info.record_data.ke_record;
			recordArr.sort(function(a,b){
	            return a.ke_id-b.ke_id});	
		},		
		
		/**
		*保存学习记录
		**/
	   commitRecord:function(fn,error){
		var dcomInfo=this.getDcomInfo();
		
		if(this.recordObject && this.recordObject.info &&  this.recordObject.info.content_item_id && this.recordObject.info.content_item_id.publish_id!=0){
			var tempItemId=this.recordObject.info.content_item_id;
			var argss=JSON.stringify(tempItemId);
			if(this.host){
				var url=this.host+"/api_router/?q=json/icom/AppInstance/saveRecord&args="+argss;
			}else{
				var url="http://"+dcomInfo.config.recordset[0].server_domain+"/api_router/?q=json/icom/AppInstance/saveRecord&args="+argss;;
			}
			this.recordObject.info.end_time=this.formatData(new Date(),"yyyy-MM-dd HH:mm:ss");
		    this.recordObject.info.record_data.end_time=this.recordObject.info.end_time;
			var info={};
			var self=this;
			this.recordObject.info.record_data.ke_record.shift();
			this.sortRecord();	
			info.info=encodeURIComponent(JSON.stringify(this.recordObject.info));
			
			 console.log("提交学习记录:"+JSON.stringify(this.recordObject).info);
			NoahAjax.post(url,info,function(data){
			   self.recordObject.info.record_data.ke_record.length=0;
			   if(fn){
			    console.log("提交返回:"+data);
				fn(data);
			   }
				
			},function(data){
			   console.log("提示学习记录出错:"+data);
			   
			   if(error){
				error(data);
			   }
			});
		}else{
		  console.log("非电子书包环境不能提交学习记录,模拟返回数据");
		  if(this.recordObject && this.recordObject.info && this.recordObject.info.content_item_id){
			  console.log(this.recordObject.info.content_item_id);
			  console.log("public_id:"+this.recordObject.info.content_item_id.publish_id);
		  }
		  var result="{\"recordset\":[{\"id\":\"140862\"}],\"msg\":\"ok\",\"status\":1}";
		  fn(result);
		}		
			
	   }
		
	};
	return  new  IComInfo();
})();

var NoahAjax = (function () {
    function NoahAjax () {
	  this.responseType = null;
    }
    NoahAjax.prototype = {
        TEXT : "text",
        ARRAY_BUFFER : "arraybuffer",
        BLOB : "blob",
        get : function (url, data, oncomplete, onerror) {
            this.getRequest("GET", url, data, oncomplete, onerror);
        },
        post : function (url, data, oncomplete, onerror) {
            this.getRequest("POST", url, data, oncomplete, onerror);
        },
        getRequest : function (t, url, d, oncomplete, err) {
            var s = this, k, data = "", a = "";
            s.err = err;
            var ajax = s.getHttp();
            if (!ajax) {
                return;
            }
            if (d) {
                for (k in d) {
                    data += (a + k + "=" + d[k]);
                    a = "&";
                }
            }
            if (t.toLowerCase() == "get") {
                url += ((url.indexOf('?') >= 0 ? '&' : '?') + data);
                data = null;
            }
            ajax.open(t, url, true);
            if (s.responseType) {
                ajax.responseType = s.responseType;
                s.responseType = s.TEXT;
            }
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4) {
                    if (ajax.status >= 200 && ajax.status < 300 || ajax.status === 304) {
                        if (oncomplete) {
                            if (ajax.responseType == s.ARRAY_BUFFER || ajax.responseType == s.BLOB) {
                                oncomplete(ajax.response);
                            } else if (ajax.responseText.length > 0) {
                                oncomplete(ajax.responseText);
                            } else {
                                oncomplete(null);
                            }
                        }
                    } else {
                        if (err) {
                            err(ajax);
                        }
                    }
                }
            };
            ajax.send(data);
        },
        getHttp : function () {
            if (typeof XMLHttpRequest != undefined) {
                return new XMLHttpRequest();
            }
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    if (!this.err) {
                        this.err(e);
                    }
                }
            }
            return false;
        }
    };
    return new NoahAjax();
})();