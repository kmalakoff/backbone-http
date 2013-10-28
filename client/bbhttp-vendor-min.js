(function(){!function(){"use strict";var a="undefined"!=typeof window?window:global;if("function"!=typeof a.require){var b={},c={},d=function(a,b){return{}.hasOwnProperty.call(a,b)},e=function(a,b){var c,d,e=[];c=/^\.\.?(\/|$)/.test(b)?[a,b].join("/").split("/"):b.split("/");for(var f=0,g=c.length;g>f;f++)d=c[f],".."===d?e.pop():"."!==d&&""!==d&&e.push(d);return e.join("/")},f=function(a){return a.split("/").slice(0,-1).join("/")},g=function(b){return function(c){var d=f(b),g=e(d,c);return a.require(g,b)}},h=function(a,b){var d={id:a,exports:{}};return c[a]=d,b(d.exports,g(a),d),d.exports},i=function(a,f){var g=e(a,".");if(null==f&&(f="/"),d(c,g))return c[g].exports;if(d(b,g))return h(g,b[g]);var i=e(g,"./index");if(d(c,i))return c[i].exports;if(d(b,i))return h(i,b[i]);throw new Error('Cannot find module "'+a+'" from "'+f+'"')},j=function(a,c){if("object"==typeof a)for(var e in a)d(a,e)&&(b[e]=a[e]);else b[a]=c},k=function(){var a=[];for(var c in b)d(b,c)&&a.push(c);return a};a.require=i,a.require.define=j,a.require.register=j,a.require.list=k,a.require.brunch=!0}}();var a,b,c,d,e=function f(a,b,c){function d(h,i){if(!b[h]){if(!a[h]){var j="function"==typeof e&&e;if(!i&&j)return j(h,!0);if(g)return g(h,!0);throw new Error("Cannot find module '"+h+"'")}var k=b[h]={exports:{}};a[h][0].call(k.exports,function(b){var c=a[h][1][b];return d(c?c:b)},k,k.exports,f,a,b,c)}return b[h].exports}for(var g="function"==typeof e&&e,h=0;h<c.length;h++)d(c[h]);return d}({rXKoM5:[function(a,b){function c(){}function d(a){var b={}.toString.call(a);switch(b){case"[object File]":case"[object Blob]":case"[object FormData]":return!0;default:return!1}}function e(){if(q.XMLHttpRequest&&("file:"!=q.location.protocol||!q.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(a){}return!1}function f(a){return a===Object(a)}function g(a){if(!f(a))return a;var b=[];for(var c in a)b.push(encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return b.join("&")}function h(a){for(var b,c,d={},e=a.split("&"),f=0,g=e.length;g>f;++f)c=e[f],b=c.split("="),d[decodeURIComponent(b[0])]=decodeURIComponent(b[1]);return d}function i(a){var b,c,d,e,f=a.split(/\r?\n/),g={};f.pop();for(var h=0,i=f.length;i>h;++h)c=f[h],b=c.indexOf(":"),d=c.slice(0,b).toLowerCase(),e=r(c.slice(b+1)),g[d]=e;return g}function j(a){return a.split(/ *; */).shift()}function k(a){return p(a.split(/ *; */),function(a,b){var c=b.split(/ *= */),d=c.shift(),e=c.shift();return d&&e&&(a[d]=e),a},{})}function l(a,b){b=b||{},this.req=a,this.xhr=this.req.xhr,this.text=this.xhr.responseText,this.setStatusProperties(this.xhr.status),this.header=this.headers=i(this.xhr.getAllResponseHeaders()),this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this.setHeaderProperties(this.header),this.body=this.parseBody(this.text)}function m(a,b){var c=this;o.call(this),this._query=this._query||[],this.method=a,this.url=b,this.header={},this._header={},this.on("end",function(){var b=new l(c);"HEAD"==a&&(b.text=null),c.callback(null,b)})}function n(a,b){return"function"==typeof b?new m("GET",a).end(b):1==arguments.length?new m("GET",a):new m(a,b)}var o=a("emitter"),p=a("reduce"),q="undefined"==typeof window?this:window,r="".trim?function(a){return a.trim()}:function(a){return a.replace(/(^\s*|\s*$)/g,"")};n.serializeObject=g,n.parseString=h,n.types={html:"text/html",json:"application/json",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},n.serialize={"application/x-www-form-urlencoded":g,"application/json":JSON.stringify},n.parse={"application/x-www-form-urlencoded":h,"application/json":JSON.parse},l.prototype.get=function(a){return this.header[a.toLowerCase()]},l.prototype.setHeaderProperties=function(){var a=this.header["content-type"]||"";this.type=j(a);var b=k(a);for(var c in b)this[c]=b[c]},l.prototype.parseBody=function(a){var b=n.parse[this.type];return b?b(a):null},l.prototype.setStatusProperties=function(a){var b=0|a/100;this.status=a,this.statusType=b,this.info=1==b,this.ok=2==b,this.clientError=4==b,this.serverError=5==b,this.error=4==b||5==b?this.toError():!1,this.accepted=202==a,this.noContent=204==a||1223==a,this.badRequest=400==a,this.unauthorized=401==a,this.notAcceptable=406==a,this.notFound=404==a,this.forbidden=403==a},l.prototype.toError=function(){var a=this.req,b=a.method,c=a.path,d="cannot "+b+" "+c+" ("+this.status+")",e=new Error(d);return e.status=this.status,e.method=b,e.path=c,e},n.Response=l,o(m.prototype),m.prototype.timeout=function(a){return this._timeout=a,this},m.prototype.clearTimeout=function(){return this._timeout=0,clearTimeout(this._timer),this},m.prototype.abort=function(){return this.aborted?void 0:(this.aborted=!0,this.xhr.abort(),this.clearTimeout(),this.emit("abort"),this)},m.prototype.set=function(a,b){if(f(a)){for(var c in a)this.set(c,a[c]);return this}return this._header[a.toLowerCase()]=b,this.header[a]=b,this},m.prototype.getHeader=function(a){return this._header[a.toLowerCase()]},m.prototype.type=function(a){return this.set("Content-Type",n.types[a]||a),this},m.prototype.auth=function(a,b){var c=btoa(a+":"+b);return this.set("Authorization","Basic "+c),this},m.prototype.query=function(a){return"string"!=typeof a&&(a=g(a)),a&&this._query.push(a),this},m.prototype.send=function(a){var b=f(a),c=this.getHeader("Content-Type");if(b&&f(this._data))for(var d in a)this._data[d]=a[d];else"string"==typeof a?(c||this.type("form"),c=this.getHeader("Content-Type"),this._data="application/x-www-form-urlencoded"==c?this._data?this._data+"&"+a:a:(this._data||"")+a):this._data=a;return b?(c||this.type("json"),this):this},m.prototype.callback=function(a,b){var c=this._callback;return 2==c.length?c(a,b):a?this.emit("error",a):(c(b),void 0)},m.prototype.crossDomainError=function(){var a=new Error("Origin is not allowed by Access-Control-Allow-Origin");a.crossDomain=!0,this.callback(a)},m.prototype.timeoutError=function(){var a=this._timeout,b=new Error("timeout of "+a+"ms exceeded");b.timeout=a,this.callback(b)},m.prototype.withCredentials=function(){return this._withCredentials=!0,this},m.prototype.end=function(a){var b=this,f=this.xhr=e(),g=this._query.join("&"),h=this._timeout,i=this._data;if(this._callback=a||c,this._withCredentials&&(f.withCredentials=!0),f.onreadystatechange=function(){return 4==f.readyState?0==f.status?b.aborted?b.timeoutError():b.crossDomainError():(b.emit("end"),void 0):void 0},f.upload&&(f.upload.onprogress=function(a){a.percent=100*(a.loaded/a.total),b.emit("progress",a)}),h&&!this._timer&&(this._timer=setTimeout(function(){b.abort()},h)),g&&(g=n.serializeObject(g),this.url+=~this.url.indexOf("?")?"&"+g:"?"+g),f.open(this.method,this.url,!0),"GET"!=this.method&&"HEAD"!=this.method&&"string"!=typeof i&&!d(i)){var j=n.serialize[this.getHeader("Content-Type")];j&&(i=j(i))}for(var k in this.header)null!=this.header[k]&&f.setRequestHeader(k,this.header[k]);return f.send(i),this},n.Request=m,n.get=function(a,b,c){var d=n("GET",a);return"function"==typeof b&&(c=b,b=null),b&&d.query(b),c&&d.end(c),d},n.head=function(a,b,c){var d=n("HEAD",a);return"function"==typeof b&&(c=b,b=null),b&&d.send(b),c&&d.end(c),d},n.del=function(a,b){var c=n("DELETE",a);return b&&c.end(b),c},n.patch=function(a,b,c){var d=n("PATCH",a);return"function"==typeof b&&(c=b,b=null),b&&d.send(b),c&&d.end(c),d},n.post=function(a,b,c){var d=n("POST",a);return"function"==typeof b&&(c=b,b=null),b&&d.send(b),c&&d.end(c),d},n.put=function(a,b,c){var d=n("PUT",a);return"function"==typeof b&&(c=b,b=null),b&&d.send(b),c&&d.end(c),d},b.exports=n},{emitter:3,reduce:4}],superagent:[function(a,b){b.exports=a("rXKoM5")},{}],3:[function(a,b){function c(a){return a?d(a):void 0}function d(a){for(var b in c.prototype)a[b]=c.prototype[b];return a}b.exports=c,c.prototype.on=function(a,b){return this._callbacks=this._callbacks||{},(this._callbacks[a]=this._callbacks[a]||[]).push(b),this},c.prototype.once=function(a,b){function c(){d.off(a,c),b.apply(this,arguments)}var d=this;return this._callbacks=this._callbacks||{},b._off=c,this.on(a,c),this},c.prototype.off=c.prototype.removeListener=c.prototype.removeAllListeners=function(a,b){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var c=this._callbacks[a];if(!c)return this;if(1==arguments.length)return delete this._callbacks[a],this;var d=c.indexOf(b._off||b);return~d&&c.splice(d,1),this},c.prototype.emit=function(a){this._callbacks=this._callbacks||{};var b=[].slice.call(arguments,1),c=this._callbacks[a];if(c){c=c.slice(0);for(var d=0,e=c.length;e>d;++d)c[d].apply(this,b)}return this},c.prototype.listeners=function(a){return this._callbacks=this._callbacks||{},this._callbacks[a]||[]},c.prototype.hasListeners=function(a){return!!this.listeners(a).length}},{}],4:[function(a,b){b.exports=function(a,b,c){for(var d=0,e=a.length,f=3==arguments.length?c:a[d++];e>d;)f=b.call(null,f,a[d],++d,a);return f}},{}]},{},[]);for(a=["superagent"],b=function(a){return window.require.register(a,function(b,c,d){return d.exports=e.call(this,a)}),window.require.register(""+a+"/index",function(b,c,d){return d.exports=e.call(this,a)})},c=0,d=a.length;d>c;c++)b(a[c])}).call(this);