(function(b,a){a("kendo.datetimepicker",["kendo.datepicker","kendo.timepicker"],b);
}(function(){var a={id:"datetimepicker",name:"DateTimePicker",category:"web",description:"The DateTimePicker allows the end user to select a value from a calendar or a time drop-down list.",depends:["datepicker","timepicker"]};
(function(b,R){var z=window.kendo,O=z.TimeView,I=z.parseDate,c=z._activeElement,s=z._extractFormat,i=z.calendar,y=i.isInRange,L=i.restrictValue,x=i.isEqualDatePart,u=O.getMilliseconds,Q=z.ui,S=Q.Widget,H="open",l="close",j="change",G=".kendoDateTimePicker",k="click"+G,q="disabled",K="readonly",p="k-state-default",t="k-state-focused",v="k-state-hover",N="k-state-disabled",w="mouseenter"+G+" mouseleave"+G,E="mousedown"+G,D="month",M="<span/>",d="aria-activedescendant",f="aria-expanded",g="aria-hidden",h="aria-owns",e="aria-disabled",m=Date,C=new m(1800,0,1),B=new m(2099,11,31),o={view:"date"},P={view:"time"},r=b.extend;
var n=S.extend({init:function(V,W){var X=this,T;
S.fn.init.call(X,V,W);
V=X.element;
W=X.options;
W.disableDates=z.calendar.disabled(W.disableDates);
W.min=I(V.attr("min"))||I(W.min);
W.max=I(V.attr("max"))||I(W.max);
F(W);
X._initialOptions=r({},W);
X._wrapper();
X._views();
X._icons();
X._reset();
X._template();
try{V[0].setAttribute("type","text");
}catch(U){V[0].type="text";
}V.addClass("k-input").attr({role:"combobox","aria-expanded":false});
X._midnight=X._calculateMidnight(W.min,W.max);
T=V.is("[disabled]")||b(X.element).parents("fieldset").is(":disabled");
if(T){X.enable(false);
}else{X.readonly(V.is("[readonly]"));
}X._old=X._update(W.value||X.element.val());
X._oldText=V.val();
z.notify(X);
},options:{name:"DateTimePicker",value:null,format:"",timeFormat:"",culture:"",parseFormats:[],dates:[],min:new m(C),max:new m(B),interval:30,height:200,footer:"",start:D,depth:D,animation:{},month:{},ARIATemplate:'Current focused date is #=kendo.toString(data.current, "d")#',dateButtonText:"Open the date view",timeButtonText:"Open the time view"},events:[H,l,j],setOptions:function(W){var X=this,Y=X._value,V,U,T;
S.fn.setOptions.call(X,W);
W=X.options;
W.min=V=I(W.min);
W.max=U=I(W.max);
F(W);
X._midnight=X._calculateMidnight(W.min,W.max);
T=W.value||X._value||X.dateView._current;
if(V&&!x(V,T)){V=new m(C);
}if(U&&!x(U,T)){U=new m(B);
}X.dateView.setOptions(W);
X.timeView.setOptions(r({},W,{format:W.timeFormat,min:V,max:U}));
if(Y){X.element.val(z.toString(Y,W.format,W.culture));
X._updateARIA(Y);
}},_editable:function(W){var Y=this,V=Y.element.off(G),T=Y._dateIcon.off(G),Z=Y._timeIcon.off(G),aa=Y._inputWrapper.off(G),X=W.readonly,U=W.disable;
if(!X&&!U){aa.addClass(p).removeClass(N).on(w,Y._toggleHover);
V.removeAttr(q).removeAttr(K).attr(e,false).on("keydown"+G,b.proxy(Y._keydown,Y)).on("focus"+G,function(){Y._inputWrapper.addClass(t);
}).on("focusout"+G,function(){Y._inputWrapper.removeClass(t);
if(V.val()!==Y._oldText){Y._change(V.val());
}Y.close("date");
Y.close("time");
});
T.on(E,J).on(k,function(){Y.toggle("date");
if(!z.support.touch&&V[0]!==c()){V.focus();
}});
Z.on(E,J).on(k,function(){Y.toggle("time");
if(!z.support.touch&&V[0]!==c()){V.focus();
}});
}else{aa.addClass(U?N:p).removeClass(U?p:N);
V.attr(q,U).attr(K,X).attr(e,U);
}},readonly:function(T){this._editable({readonly:T===R?true:T,disable:false});
},enable:function(T){this._editable({readonly:false,disable:!(T=T===R?true:T)});
},destroy:function(){var T=this;
S.fn.destroy.call(T);
T.dateView.destroy();
T.timeView.destroy();
T.element.off(G);
T._dateIcon.off(G);
T._timeIcon.off(G);
T._inputWrapper.off(G);
if(T._form){T._form.off("reset",T._resetHandler);
}},close:function(T){if(T!=="time"){T="date";
}this[T+"View"].close();
},open:function(T){if(T!=="time"){T="date";
}this[T+"View"].open();
},min:function(T){return this._option("min",T);
},max:function(T){return this._option("max",T);
},toggle:function(U){var T="timeView";
if(U!=="time"){U="date";
}else{T="dateView";
}this[U+"View"].toggle();
this[T].close();
},value:function(U){var T=this;
if(U===R){return T._value;
}T._old=T._update(U);
if(T._old===null){T.element.val("");
}T._oldText=T.element.val();
},_change:function(X){var W=this,U=W.element.val(),T;
X=W._update(X);
T=+W._old!=+X;
var Y=T&&!W._typing;
var V=U!==W.element.val();
if(Y||V){W.element.trigger(j);
}if(T){W._old=X;
W._oldText=W.element.val();
W.trigger(j);
}W._typing=false;
},_option:function(W,ab){var Y=this;
var X=Y.options;
var Z=Y.timeView;
var aa=Z.options;
var T=Y._value||Y._old;
var V;
var U;
if(ab===R){return X[W];
}ab=I(ab,X.parseFormats,X.culture);
if(!ab){return;
}if(X.min.getTime()===X.max.getTime()){aa.dates=[];
}X[W]=new m(ab.getTime());
Y.dateView[W](ab);
Y._midnight=Y._calculateMidnight(X.min,X.max);
if(T){V=x(X.min,T);
U=x(X.max,T);
}if(V||U){aa[W]=ab;
if(V&&!U){aa.max=A(X.interval);
}if(U){if(Y._midnight){Z.dataBind([B]);
return;
}else{if(!V){aa.min=C;
}}}}else{aa.max=B;
aa.min=C;
}Z.bind();
},_toggleHover:function(T){b(T.currentTarget).toggleClass(v,T.type==="mouseenter");
},_update:function(ah){var ae=this,ab=ae.options,Z=ab.min,Y=ab.max,V=ab.dates,af=ae.timeView,T=ae._value,U=I(ah,ab.parseFormats,ab.culture),X=U===null&&T===null||U instanceof Date&&T instanceof Date,ac,ag,aa,ad,W;
if(ab.disableDates&&ab.disableDates(U)){U=null;
if(!ae._old&&!ae.element.val()){ah=null;
}}if(+U===+T&&X){W=z.toString(U,ab.format,ab.culture);
if(W!==ah){ae.element.val(U===null?ah:W);
if(ah instanceof String){ae.element.trigger(j);
}}return U;
}if(U!==null&&x(U,Z)){U=L(U,Z,Y);
}else{if(!y(U,Z,Y)){U=null;
}}ae._value=U;
af.value(U);
ae.dateView.value(U);
if(U){aa=ae._old;
ag=af.options;
if(V[0]){V=b.grep(V,function(ai){return x(U,ai);
});
if(V[0]){af.dataBind(V);
ad=true;
}}if(!ad){if(x(U,Z)){ag.min=Z;
ag.max=A(ab.interval);
ac=true;
}if(x(U,Y)){if(ae._midnight){af.dataBind([B]);
ad=true;
}else{ag.max=Y;
if(!ac){ag.min=C;
}ac=true;
}}}if(!ad&&(!aa&&ac||aa&&!x(aa,U))){if(!ac){ag.max=B;
ag.min=C;
}af.bind();
}}ae.element.val(z.toString(U||ah,ab.format,ab.culture));
ae._updateARIA(U);
return U;
},_keydown:function(U){var W=this,T=W.dateView,X=W.timeView,Y=W.element.val(),V=T.popup.visible();
if(U.altKey&&U.keyCode===z.keys.DOWN){W.toggle(V?"time":"date");
}else{if(V){T.move(U);
W._updateARIA(T._current);
}else{if(X.popup.visible()){X.move(U);
}else{if(U.keyCode===z.keys.ENTER&&Y!==W._oldText){W._change(Y);
}else{W._typing=true;
}}}}},_views:function(){var aa=this,W=aa.element,Z=aa.options,X=W.attr("id"),U,ab,V,ac,Y,T;
aa.dateView=U=new z.DateView(r({},Z,{id:X,anchor:aa.wrapper,change:function(){var ai=U.calendar.value(),ah=+ai,ag=+Z.min,af=+Z.max,ae,ad;
if(ah===ag||ah===af){ae=ah===ag?ag:af;
ae=new m(aa._value||ae);
ae.setFullYear(ai.getFullYear(),ai.getMonth(),ai.getDate());
if(y(ae,ag,af)){ai=ae;
}}if(aa._value){ad=z.date.setHours(new Date(ai),aa._value);
if(y(ad,ag,af)){ai=ad;
}}aa._change(ai);
aa.close("date");
},close:function(ad){if(aa.trigger(l,o)){ad.preventDefault();
}else{W.attr(f,false);
V.attr(g,true);
if(!ab.popup.visible()){W.removeAttr(h);
}}},open:function(ad){if(aa.trigger(H,o)){ad.preventDefault();
}else{if(W.val()!==aa._oldText){T=I(W.val(),Z.parseFormats,Z.culture);
aa.dateView[T?"current":"value"](T);
}V.attr(g,false);
W.attr(f,true).attr(h,U._dateViewID);
aa._updateARIA(T);
}}}));
V=U.div;
Y=Z.min.getTime();
aa.timeView=ab=new O({id:X,value:Z.value,anchor:aa.wrapper,animation:Z.animation,format:Z.timeFormat,culture:Z.culture,height:Z.height,interval:Z.interval,min:new m(C),max:new m(B),dates:Y===Z.max.getTime()?[new Date(Y)]:[],parseFormats:Z.parseFormats,change:function(ae,ad){ae=ab._parse(ae);
if(ae<Z.min){ae=new m(+Z.min);
ab.options.min=ae;
}else{if(ae>Z.max){ae=new m(+Z.max);
ab.options.max=ae;
}}if(ad){aa._timeSelected=true;
aa._change(ae);
}else{W.val(z.toString(ae,Z.format,Z.culture));
U.value(ae);
aa._updateARIA(ae);
}},close:function(ad){if(aa.trigger(l,P)){ad.preventDefault();
}else{ac.attr(g,true);
W.attr(f,false);
if(!U.popup.visible()){W.removeAttr(h);
}}},open:function(ad){ab._adjustListWidth();
if(aa.trigger(H,P)){ad.preventDefault();
}else{if(W.val()!==aa._oldText){T=I(W.val(),Z.parseFormats,Z.culture);
aa.timeView.value(T);
}ac.attr(g,false);
W.attr(f,true).attr(h,ab._timeViewID);
ab.options.active(ab.current());
}},active:function(ad){W.removeAttr(d);
if(ad){W.attr(d,ab._optionID);
}}});
ac=ab.ul;
},_icons:function(){var W=this;
var T=W.element;
var V=W.options;
var U;
U=T.next("span.k-select");
if(!U[0]){U=b('<span unselectable="on" class="k-select"><span class="k-link k-link-date" aria-label="'+V.dateButtonText+'"><span unselectable="on" class="k-icon k-i-calendar"></span></span><span class="k-link k-link-time" aria-label="'+V.timeButtonText+'"><span unselectable="on" class="k-icon k-i-clock"></span></span></span>').insertAfter(T);
}U=U.children();
U=U.children();
W._dateIcon=U.eq(0).attr("aria-controls",W.dateView._dateViewID);
W._timeIcon=U.eq(1).attr("aria-controls",W.timeView._timeViewID);
},_wrapper:function(){var U=this,T=U.element,V;
V=T.parents(".k-datetimepicker");
if(!V[0]){V=T.wrap(M).parent().addClass("k-picker-wrap k-state-default");
V=V.wrap(M).parent();
}V[0].style.cssText=T[0].style.cssText;
T.css({width:"100%",height:T[0].style.height});
U.wrapper=V.addClass("k-widget k-datetimepicker k-header").addClass(T[0].className);
U._inputWrapper=b(V[0].firstChild);
},_reset:function(){var W=this,T=W.element,V=T.attr("form"),U=V?b("#"+V):T.closest("form");
if(U[0]){W._resetHandler=function(){W.value(T[0].defaultValue);
W.max(W._initialOptions.max);
W.min(W._initialOptions.min);
};
W._form=U.on("reset",W._resetHandler);
}},_template:function(){this._ariaTemplate=z.template(this.options.ARIATemplate);
},_calculateMidnight:function(U,T){return u(U)+u(T)===0;
},_updateARIA:function(V){var U;
var W=this;
var T=W.dateView.calendar;
W.element.removeAttr(d);
if(T){U=T._cell;
U.attr("aria-label",W._ariaTemplate({current:V||T.current()}));
W.element.attr(d,U.attr("id"));
}}});
function A(U){var T=new Date(2100,0,1);
T.setMinutes(-U);
return T;
}function J(T){T.preventDefault();
}function F(T){var V=z.getCulture(T.culture).calendars.standard.patterns,U=!T.parseFormats.length,W;
T.format=s(T.format||V.g);
T.timeFormat=W=s(T.timeFormat||V.t);
z.DateView.normalize(T);
if(U){T.parseFormats.unshift("yyyy-MM-ddTHH:mm:ss");
}if(b.inArray(W,T.parseFormats)===-1){T.parseFormats.splice(1,0,W);
}}Q.plugin(n);
}(window.kendo.jQuery));
return window.kendo;
},typeof define=="function"&&define.amd?define:function(a,b,c){(c||b)();
}));
