//跨浏览器的事件对象

//

//参数列表：
//element: 操作对象名
//type: 事件类型名儿
//handler: 事件处理程序
var  EventUtil = {
	addHandler: function(element, type, handler){
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		}
		else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}
		else {
			element["on"+type] = handler;
		}
	},

	//获取event对象的relatedTarget属性
	getRelatedTarget:function(event){
		if (event.relatedTarget) {
			return event.relatedTarget;
		}else if(event.toElement){
			return event.toElement;
		}else if(event.fromElement){
			return event.fromElement;
		}else {
			return null;
		}
	},

	//获取button属性值
	getButton: function(event){
		if(document.implementation.hasFeature("MouseEvents","2.0")){
			return event.button;
		} else {//兼容IE8及以下
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		};
	},

	//获取滚轮滚动时滚动的值多少
	getWheelDelta:function(event){
		if(event.wheelDelta){
			return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta:event.wheelDelta);
		} else {
			return -event.detail*40;
		}
	},

	//兼容event 访问方法
	getEvent: function(event){
		return event ? event: window.event;
	},

	//兼容获取的目标
	getTarget: function(event){
		return event.target || event.srcElement;
	},


	//取消事件的默认行为
	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue()=false;
		}
	},

	//---------------------------------------------
	removeHandler:function(element, type, handler){
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		}
		else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		}
		else {
			element["on"+type] = handler;
		}
	},

	//取消进一步的冒泡
	stopPropagation: function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
}