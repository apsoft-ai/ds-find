    function 剪贴板(name){   
        //name表示组件在被创建时的名称，event表示组件拥有的事件
        //如果组件有多个事件，可以在后面继续填写这些事件名称
        //例如：function 剪贴板(name,event1,event2,event3){
        
		//注意：在js资源目录中引入了一个clipboard.min.js,修改版已经不需要这个js文件,已经删掉了
		
        //组件内部属性，仅供组件内部使用：
        //this.名称 = name;
        
        //组件命令：
		this.置剪贴板内容 = function(neirong){
			if(mui.os.plus){
				if (plus.os.name == "Android") {//安卓系统
					var Context = plus.android.importClass("android.content.Context");
					var main = plus.android.runtimeMainActivity();
					var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
					plus.android.invoke(clip,"setText",neirong);
				}else{//苹果系统
					var UIPasteboard  = plus.ios.importClass("UIPasteboard");
					var generalPasteboard = UIPasteboard.generalPasteboard();
					generalPasteboard.plusCallMethod({setValue:neirong, forPasteboardType:"public.utf8-plain-text"});
				}			
			}else{//浏览器
    			/*var clipboard = new Clipboard(".mui-content", {  //这种方式会导致在网页中设置剪贴板内容后无法点击编辑框和下拉框
        			text: function() {
            			return neirong;
        			}
    			});*/
				copyToClipboard(neirong);				
			}

		}

		function copyToClipboard(s){
   			if(window.clipboardData){
      			window.clipboardData.setData("text",s);
   			}else{
      			(function(s){
         			document.oncopy=function(e){
            		e.clipboardData.setData("text",s);
            		e.preventDefault();
            		document.oncopy=null;
         		}
      		})(s);
      			document.execCommand("Copy");
   			}
		}
        
        //组件命令：
        this.取剪贴板内容 = function (){
			if(!mui.os.plus){//浏览器
				if(window.clipboardData){
      			    return window.clipboardData.getData("text");//只支持IE浏览器
   			    }else{
				    console.log("取剪贴板内容命令只能在手机APP中使用");
				    return "";
				}
			}
			if (plus.os.name == "Android") {//安卓系统
				var Context = plus.android.importClass("android.content.Context");
				var main = plus.android.runtimeMainActivity();
				var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
				return plus.android.invoke(clip,"getText");
			}else{//苹果系统
				var UIPasteboard  = plus.ios.importClass("UIPasteboard");
				var generalPasteboard = UIPasteboard.generalPasteboard();
				var clip = generalPasteboard.plusCallMethod({valueForPasteboardType:"public.utf8-plain-text"});
				return clip;
			}           
        }  
       
    }