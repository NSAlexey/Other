(function(d){Type.registerNamespace("Telerik.Web.UI");
var b=Telerik.Web.UI;
var c=b.Grid;
var a=$telerik.$;
Telerik.Web.UI.GridMobileColumnView=function(e){b.GridMobileColumnView.initializeBase(this,[e]);
this._groupText="";
this._ungroupText="";
};
b.GridMobileColumnView.prototype={initialize:function(){b.GridMobileColumnView.callBaseMethod(this,"initialize");
},dispose:function(){b.GridMobileColumnView.callBaseMethod(this,"dispose");
},show:function(e){b.GridMobileColumnView.callBaseMethod(this,"show");
this.set_title(e._data.HeaderText||e._data.DataField);
this._column=e;
this._setGroupOption();
this._updateFreezeOption();
},onInit:function(){var e=this;
this._$groupOption=this.get_$element().on("click",a.proxy(e._click,e)).find(".rgButtonGroup");
this.get_$element().gestures({tap:a.proxy(e._click,e),alwaysPreventDefault:false});
},_click:function(g){var f=a(g.target);
var i=this.get_owner();
var j=this._column.get_uniqueName();
var k;
if(f.hasClass("rgFilter")){k=i._getViewByType(c.MobileViewType.Filter);
}else{if(f.hasClass("rgColumns")){k=i._getViewByType(c.MobileViewType.Columns);
}else{if(f.hasClass("rgButtonSortAsc")){this._handleSort(j+" ASC");
}else{if(f.hasClass("rgButtonSortDesc")){this._handleSort(j+" DESC");
}else{if(f.hasClass("rgButtonSortClear")){this._handleSort(j+" NONE");
}else{if(f.hasClass("rgFreeze")){this._column._toggleFreeze();
this.close();
}else{if(f.is(this._$groupOption)){if(this._$groupOption.prop("checked")){i.fireCommand("UnGroupByColumn",j);
}else{var h=!!i._owner._clientDataSourceID;
i.fireCommand("GroupByColumn",h?this._column.get_dataField():j);
}}}}}}}}if(k){k.show(this._column);
g.preventDefault();
}},_handleSort:function(e){var f=this.get_owner();
if(f._createSortExpression(e,true)){if(e.indexOf(" NONE")==-1){f.fireCommand("HeaderSort",e);
}else{f.fireCommand("ClearSort",e.replace(" NONE",""));
}this.applyChanges();
}},_setGroupOption:function(){var g=this._$groupOption.prop("checked",false).text(this._groupText);
var e=this._column;
var f=this.get_owner()._data.GroupByExpressions;
if(f){f.forEach(function(h){if(h.field==e.get_uniqueName()){g.prop("checked",true).text(this._ungroupText);
}},this);
}},_updateFreezeOption:function(){var f=this._column;
var i=this.get_owner();
var h=i._owner.ClientSettings.Scrolling.FrozenColumnsCount;
var g=Array.indexOf(i.get_columns(),f);
var e=this._$element.find(".rgFreeze");
if(g>=h){e.text(i._owner._freezeText);
}else{e.text(i._owner._unfreezeText);
}}};
b.GridMobileColumnView.registerClass("Telerik.Web.UI.GridMobileColumnView",Telerik.Web.UI.GridMobileView);
})();
