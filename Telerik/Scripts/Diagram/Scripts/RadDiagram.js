(function(a,b,g){b.RadDiagram=function(h){var i=this;
b.RadDiagram.initializeBase(i,[h]);
i._initialized=false;
i._options={};
i._widgetEvents={};
i.kendoWidget=null;
};
b.RadDiagram.prototype={initialize:function(){var i=this,h=i._options;
if(i._initialized){return;
}b.RadDiagram.callBaseMethod(i,"initialize");
d();
if(!h.theme){h.theme="Default";
}if(h.pdf&&h.pdf.date){h.pdf.date=f(h.pdf.date);
}if(h.dataSource&&h.connectionsDataSource){this._initBindDiagram();
}else{delete h.dataSource;
delete h.connectionsDataSource;
this._initKendoDiagram();
}i._initialized=true;
i.raiseEvent("load");
},dispose:function(){var h=this;
if(h.kendoWidget){h.kendoWidget.destroy();
}delete h.kendoWidget;
delete h._widgetEvents;
delete h._options;
b.RadDiagram.callBaseMethod(h,"dispose");
},get_kendoWidget:function(){return this.kendoWidget;
},_initKendoDiagram:function(){var j=this;
var i=j._options;
var h=a(j.get_element()).kendoDiagram(i);
j.kendoWidget=h.data("kendo-diagram");
if(i&&i.layout){j.kendoWidget.layout(i.layout);
}},_initBindDiagram:function(){var j=this;
var k=j._options;
var i=k.dataSource;
var h=k.connectionsDataSource;
if(!e(i)||!e(h)){Sys.Application.add_load(function(){j._initDataSources(i,h);
});
}else{j._initDataSources(i,h);
}},_initDataSources:function(l,h){var k=this._options;
var j=$find(l);
var i=$find(h);
if(j&&i){k.dataSource=j._kendoDataSource;
k.connectionsDataSource=i._kendoDataSource;
this._initKendoDiagram();
}}};
function e(h){var i=$find(h);
return i&&b.RadClientDataSource.isInstanceOfType(i);
}function f(i){var h=i.match(/\d+/)[0];
return new Date(h-0);
}b.RadDiagram.registerClass("Telerik.Web.UI.RadDiagram",b.RadWebControl);
a.registerControlEvents(b.RadDiagram,["load"]);
function d(){var l=window.kendo;
var h=l.deepExtend;
var i=l.dataviz.diagram;
var m=i.Shape;
var j=i.Group;
var o=i.Utils;
var n=i.TextBlock;
var k=o.isDefined;
a.extend(m.prototype,{_content:function(q){var u=this;
if(q!==g){var v=this.options;
if(q.html){delete v.content.text;
}else{if(q.text){delete v.content.html;
}}if(i.Utils.isString(q)){v.content.text=q;
}else{h(v.content,q);
}var s=v.content;
var t=this._contentVisual;
if(t){this.visual.remove(t);
}if(s.html){var p=c(u.bounds());
var r=a("<div>").append(s.html);
a(document.body).append(p);
p.append(r);
var w=this.visual;
l.dataviz.drawing.drawDOM(r).then(function(x){if(k(x)){x.drawingContainer=function(){return this;
};
x.parent=null;
}var y=u._contentVisual=new j(s);
y.append(x);
y._includeInBBox=false;
w.append(y);
p.remove();
u._alignContent();
});
}else{if(s.text){this._contentVisual=new n(s);
this._contentVisual._includeInBBox=false;
this.visual.append(this._contentVisual);
}}}return this.options.content.text||this.options.content.html;
}});
}function c(h){return a("<div>").css({position:"absolute",left:"-1000000px",top:"-1000000px"});
}})($telerik.$,Telerik.Web.UI);
