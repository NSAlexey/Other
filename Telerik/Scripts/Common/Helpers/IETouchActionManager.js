(function(a,c){Type.registerNamespace("Telerik.Web.UI");
Type.registerNamespace("Telerik.Web.UI.Helpers");
var b=Telerik.Web.UI.Helpers;
b.IETouchActionManager=function(d){this.element=d;
this.hasPointers="PointerEvent" in a||"MSPointerEvent" in a;
};
b.IETouchActionManager.prototype={allowUserTouch:function(){if(this.isPointerEnabled()){var d=this.getStyle();
this.touchActionProp="touchAction" in d?"touchAction":"msTouchAction";
this.cachedTouchAction=d[this.touchActionProp];
d[this.touchActionProp]="none";
}},restore:function(){if(this.isPointerEnabled()){this.getStyle()[this.touchActionProp]=this.cachedTouchAction;
}},getStyle:function(){return this.element?this.element.style:{};
},isPointerEnabled:function(){return this.hasPointers;
},dispose:function(){this.restore();
delete this.element;
}};
b.IETouchActionManager.registerClass("Telerik.Web.UI.Helpers.IETouchActionManager");
})(window);