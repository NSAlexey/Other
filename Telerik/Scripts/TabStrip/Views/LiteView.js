(function(a,b,g){if(!b.RadTab.Views){b.RadTab.Views={};
}b.RadTab.Views.Lite=function(h){this._owner=h;
};
b.RadTab.Views.Lite.prototype={_renderTab:function(h){var i=this._owner;
h[h.length]="<li class='";
h[h.length]=i._getElementCssClass();
if(i.get_tabStrip().get_enableAriaSupport()){h[h.length]="' role='tab' aria-level='"+i.get_level()+"' aria-disabled='"+!i.get_enabled()+"'>";
}else{h[h.length]="'>";
}if(i.get_navigateUrl()){i._renderLink(h);
}else{this._renderSpan(h);
}h[h.length]="</li>";
},_renderSpan:function(h){var i=this._owner;
h[h.length]="<span class='";
h[h.length]=i._getLinkCssClass();
h[h.length]="'>";
this._renderContent(h);
h[h.length]="</span>";
},_renderContent:function(h){this._owner._renderInnerContent(h);
},_replaceSpanElement:function(j){var i=this._owner.get_linkElement(),h=a("<a href='"+j+"' class='"+i.className+"'></a>");
this._replaceElement(h);
},_replaceLinkElement:function(){var i=this._owner.get_linkElement(),h=a("<span class='"+i.className+"' tabindex='"+i.tabIndex+"'></span>");
this._replaceElement(h);
},_replaceElement:function(h){var j=this._owner;
var i=a(j.get_linkElement());
h.html(i.html());
h.attr("accesskey",i.attr("accesskey"));
i.replaceWith(h);
j._linkElement=h.get(0);
},_setHighlight:function(i){var j=this._owner;
var h=a(j.get_element());
h.toggleClass("rtsHovered",i);
if(j.get_hoveredCssClass()){h.toggleClass(j.get_hoveredCssClass(),i);
}},_getElementCssClass:function(){var i=this._owner;
var h=["rtsLI"];
h=h.concat(i._determineStateCssClass());
if(a(i.get_element()).hasClass("rtsFocused")){h[h.length]="rtsFocused";
}if(i.get_outerCssClass()){h[h.length]=i.get_outerCssClass();
}return h;
},_getLinkCssClass:function(){var j=this._owner;
var h=["rtsLink"];
var i=j.get_linkElement()?j.get_linkElement().className:"";
if(i.search("rtsClicked")!=-1){h[h.length]="rtsClicked";
}return h;
},scrollIntoView:function(){var i=this._owner;
var h=i.get_parent();
if(h&&h._scroller){h._scroller._scrollTabIntoView(i);
}},scrollIntoViewWhenNeeded:function(){this.scrollIntoView();
},get_outerWrapElement:function(){return this._owner.get_linkElement();
},get_innerWrapElement:function(){return this._owner.get_linkElement();
},set_navigateUrl:function(j){var i=this._owner;
var h=i.get_linkElement();
if(!h){return;
}if(j&&j!=="#"){if(h.nodeName==="A"){h.href=j;
}else{this._replaceSpanElement(j);
}}else{this._replaceLinkElement();
}},select:function(){var h=function(j){if(j.get_tabs().get_count()>0){a(j.get_levelElement()).removeClass("rtsHidden");
}var i=j.get_selectedTab();
if(i){h(i);
}};
h(this._owner);
},unselect:function(){var h=function(j){a(j.get_levelElement()).addClass("rtsHidden");
var i=j.get_selectedTab();
if(i){h(i);
}};
h(this._owner);
}};
var e="rtsDisabled";
if(!b.RadTabStrip.Views){b.RadTabStrip.Views={};
}b.RadTabStrip.Views.Lite=function(h){this._tabstrip=h;
};
b.RadTabStrip.Views.Lite.prototype={_click:function(h){if(h.get_isEnabled()){h.scrollIntoViewWhenNeeded();
}},_mouseDown:function(h){Sys.UI.DomElement.addCssClass(h.get_element(),"rtsClicked");
},_initScrolling:function(){var j=this._tabstrip;
var i=j;
var h;
while(i){h=i._scroller;
if(j._tabContainerRequiresScrolling(i)){if(h){j._updateScroller(i);
}else{j._initScrollingForTabContainer(i);
}}else{if(h){h.dispose();
}}i=i.get_selectedTab();
}},_initScrollingForTabContainer:function(h){h._scroller=new b.TabScroller(h);
h._scroller.initialize();
},_updateScroller:function(j){var i=j._scroller;
var h=i._scrolledElement[i._scrollSizeField]-i._scrolledElement[i._offsetSizeField];
i.setScrollingLimits(0,h);
},_getDisabledClass:function(){return e;
}};
var f="rtsScroll";
var d=["rtsButtonsStart","rtsButtonsMiddle","rtsButtonsEnd"];
var c=Telerik.Web.Browser;
b.TabScroller=function(h){this._owner=h;
this._tabStrip=this._owner.get_tabStrip?this._owner.get_tabStrip():this._owner;
this._levelElement=h.get_levelElement();
this._isRtl=this._tabStrip._rightToLeft;
this._sizeProperty="width";
this._scrollSizeField="scrollWidth";
this._offsetField="offsetLeft";
this._offsetSizeField="clientWidth";
this._disabled=!(this._tabStrip.get_enabled()&&this._owner.get_enabled());
if(this._tabStrip._isVertical){this._sizeProperty="height";
this._scrollSizeField="scrollHeight";
this._offsetField="offsetTop";
this._offsetSizeField="clientHeight";
}b.TabScroller.initializeBase(this,[h.get_childListElement(),this._levelElement,this._tabStrip._isVertical?b.ScrollerOrientation.Vertical:b.ScrollerOrientation.Horizontal]);
};
b.TabScroller.prototype={initialize:function(){var j=this;
var h=this._owner._perTabScrolling?this._scrollTab:this._scroll;
var i=function(){if(j._orientation==b.ScrollerOrientation.Vertical){j._currentPosition=j._scrolledElement.scrollTop;
}else{j._currentPosition=$telerik.scrollLeft(j._scrolledElement);
}j._updateArrows();
j._owner._getControl()._updateScrollState(j._owner,j._currentPosition);
};
this._toggleMargin(true);
this._nextArrow=this._createArrow("rtsNextArrow");
this._previousArrow=this._createArrow("rtsPrevArrow");
a(this._levelElement).addClass(f+" "+d[this._tabStrip._scrollButtonsPosition]).append(this._nextArrow).append(this._previousArrow).onEvent("up",".rtsNextArrow, .rtsPrevArrow",a.proxy(this._stopScroll,this)).onEvent("down",".rtsNextArrow:not('.rtsDisabled'), .rtsPrevArrow:not('.rtsDisabled')",a.proxy(h,this));
a(this._scrolledElement).on("scroll",function(k){if(j._disabled){k.preventDefault();
return;
}clearTimeout(j.scrollTimeout);
j.scrollTimeout=setTimeout(function(){i();
},300);
});
b.TabScroller.callBaseMethod(this,"initialize");
this._positionChangedDelegate=Function.createDelegate(this,this._updateArrows);
this.add_positionChanged(this._positionChangedDelegate);
this.setScrollingLimits(0,this._scrolledElement[this._scrollSizeField]-this._scrolledElement[this._offsetSizeField]);
this._scrollTo(Math.abs(this._tabStrip._scrollPosition));
},dispose:function(){b.TabScroller.callBaseMethod(this,"dispose");
a(this._scrolledElement).off("scroll");
a(this._levelElement).removeClass(f+" "+d[this._tabStrip._scrollButtonsPosition]).offEvent("up").offEvent("down");
this._toggleMargin(false);
this._positionChangedDelegate=null;
this._nextArrow.remove();
this._nextArrow=null;
this._previousArrow.remove();
this._previousArrow=null;
this._levelElement=null;
this._scrolledElement=null;
this._owner._scroller=null;
},isAtMinPosition:function(h){if(!h){return this._currentPosition<=this._minPosition;
}else{return h<=this._minPosition;
}},isAtMaxPosition:function(h){if(!h){return this._currentPosition>=this._maxPosition;
}else{return h>=this._maxPosition;
}},_toggleMargin:function(k){var h="marginBottom";
var j=$telerik.getMarginBox(this._scrolledElement);
var i=j.vertical;
if(this._orientation==b.ScrollerOrientation.Vertical){h="marginRight";
i=j.right;
if(this._tabStrip._rightToLeft){h="marginLeft";
i=j.left;
}}if(k){i-=c.scrollBarWidth;
}else{i+=c.scrollBarWidth;
}a(this._scrolledElement).css(h,i);
},_createArrow:function(h){return a("<span>").addClass(h);
},_updateArrows:function(){this._previousArrow.toggleClass(e,this.isAtMinPosition()||this._disabled);
this._nextArrow.toggleClass(e,this.isAtMaxPosition()||this._disabled);
},_scroll:function(i){var h=a(i.target).is(".rtsNextArrow")?1:-1;
this.startScroll(b.ScrollerSpeed.Fast,h);
},_scrollTab:function(h){var n=this;
var j=1;
var o=this._currentPosition+this._scrolledElement[this._offsetSizeField];
var k;
var m=this._owner.get_tabs().toArray();
var i;
var l=0;
if(a(h.target).is(".rtsNextArrow")){o+=j;
a.each(m,function(p,q){if($telerik.isIE8){l+=parseFloat(a(q.get_element()).css(n._sizeProperty));
}else{l+=parseFloat($telerik.getComputedStyle(q.get_element(),n._sizeProperty));
}return Math.floor(l)<=o;
});
i=l-this._scrolledElement[this._offsetSizeField];
}else{k=this._scrolledElement[this._scrollSizeField]+j;
a.each(m.reverse(),function(p,q){if($telerik.isIE8){l+=parseFloat(a(q.get_element()).css(n._sizeProperty));
}else{l+=parseFloat($telerik.getComputedStyle(q.get_element(),n._sizeProperty));
}return o<=(k-Math.floor(l));
});
i=k-(l+this._scrolledElement[this._offsetSizeField]);
}i=Math.round(Math.max(i,this._minPosition));
i=Math.round(Math.min(i,this._maxPosition));
this._scrollTo(i);
},_scrollTabIntoView:function(k){var l=this;
var j;
var h=function(){var q=l._currentPosition+l._scrolledElement[l._offsetSizeField];
var m=k.get_element();
var o=m[l._offsetField];
var n=o+m[l._offsetSizeField];
var p=l._currentPosition;
if(n>q){p+=n-q;
}else{p=Math.min(l._currentPosition,o);
}return p;
};
var i=function(){var m=k.get_element();
var o=m.offsetLeft;
var p=m.offsetWidth;
var n=l._currentPosition;
var q=l._scrolledElement[l._offsetSizeField];
var r=Math.abs(l._currentPosition-q);
if(o<0){if(n+o+p>q){n-=(n+o+p)-q;
}else{n=Math.max(Math.abs(o),l._currentPosition);
}}if(o>0&&o+p>r){n-=o+p-r;
}return n;
};
if(this._orientation==b.ScrollerOrientation.Horizontal&&this._isRtl){j=i();
}else{j=h();
}j=Math.max(j,this._minPosition);
j=Math.min(j,this._maxPosition);
this._scrollTo(j);
},_stopScroll:function(){clearTimeout(this.scrollTimeout);
this.stopScroll();
this._owner._getControl()._updateScrollState(this._owner,this._currentPosition);
},_scrollTo:function(h){this._currentPosition=h;
if(this._orientation==b.ScrollerOrientation.Vertical){this._scrolledElement.scrollTop=h;
}else{$telerik.scrollLeft(this._scrolledElement,h);
}this._raiseEvent("positionChanged",Sys.EventArgs.Empty);
},_getElementSize:function(){return this._scrolledElement[this._scrollSizeField]-this._scrolledElement[this._offsetSizeField];
},_toggleEnabled:function(){this._disabled=!(this._tabStrip.get_enabled()&&this._owner.get_enabled());
this._previousArrow.toggleClass(e,this._disabled);
this._nextArrow.toggleClass(e,this._disabled);
}};
b.TabScroller.registerClass("Telerik.Web.UI.TabScroller",b.Scroller);
b.RadTabStrip._setSize=function(j,k){var h=a(j).find(".rtsLink").get(0),i;
h.style.height=k+"px";
i=j.offsetHeight-k;
if(i>0){h.style.height=k-i+"px";
}};
})($telerik.$,Telerik.Web.UI);
