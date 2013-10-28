/*
  backbone-http.js 0.0.1
  Copyright (c) 2013 Vidigami - https://github.com/vidigami/backbone-http
  License: MIT (http://www.opensource.org/licenses/mit-license.php)
  Dependencies: Backbone.js and Underscore.js.
*/
(function(){if(function(){"use strict";var a="undefined"!=typeof window?window:global;if("function"!=typeof a.require){var b={},c={},d=function(a,b){return{}.hasOwnProperty.call(a,b)},e=function(a,b){var c,d,e=[];c=/^\.\.?(\/|$)/.test(b)?[a,b].join("/").split("/"):b.split("/");for(var f=0,g=c.length;g>f;f++)d=c[f],".."===d?e.pop():"."!==d&&""!==d&&e.push(d);return e.join("/")},f=function(a){return a.split("/").slice(0,-1).join("/")},g=function(b){return function(c){var d=f(b),g=e(d,c);return a.require(g,b)}},h=function(a,b){var d={id:a,exports:{}};return c[a]=d,b(d.exports,g(a),d),d.exports},i=function(a,f){var g=e(a,".");if(null==f&&(f="/"),d(c,g))return c[g].exports;if(d(b,g))return h(g,b[g]);var i=e(g,"./index");if(d(c,i))return c[i].exports;if(d(b,i))return h(i,b[i]);throw new Error('Cannot find module "'+a+'" from "'+f+'"')},j=function(a,c){if("object"==typeof a)for(var e in a)d(a,e)&&(b[e]=a[e]);else b[a]=c},k=function(){var a=[];for(var c in b)d(b,c)&&a.push(c);return a};a.require=i,a.require.define=j,a.require.register=j,a.require.list=k,a.require.brunch=!0}}(),require.register("backbone-http/lib/cursor",function(a,b,c){var d,e,f,g,h,i={}.hasOwnProperty,j=function(a,b){function c(){this.constructor=a}for(var d in b)i.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};g=b("underscore"),d=b("backbone-orm/lib/cursor"),f=b("backbone-orm/lib/json_utils"),c.exports=e=function(a){function b(){return h=b.__super__.constructor.apply(this,arguments)}return j(b,a),b.prototype.toJSON=function(a){var b,c=this;return this.hasCursorQuery("$zero")?a(null,this.hasCursorQuery("$one")?null:[]):(b=f.toQuery(g.extend(g.extend({},this._find),this._cursor)),this.request.get(this.url).query(b).type("json").end(function(d,e){var h;return d?a(d):b.$one&&404===e.status?a(null,null):e.ok?(h=f.parse(e.body),a(null,c.hasCursorQuery("$count")||c.hasCursorQuery("$exists")?h.result:h)):a(new Error("Ajax failed with status "+e.status+" with: "+g.keys(e.body)))}))},b}(d)}),require.register("backbone-http/lib/index",function(a,b,c){b("backbone-orm/lib/client_utils").loadDependencies([{symbol:"superagent",path:"superagent"}]),c.exports={sync:b("./sync")}}),require.register("backbone-http/lib/sync",function(a,b,c){var d,e,f,g,h,i,j,k;k=b("underscore"),d=b("backbone"),i=b("backbone-orm/lib/schema"),j=b("backbone-orm/lib/utils"),g=b("backbone-orm/lib/json_utils"),h=b("backbone-orm/lib/cache/singletons").ModelCache,e=b("./cursor"),c.exports=f=function(){function a(a){if(this.model_type=a,this.model_type.model_name=j.findOrGenerateModelName(this.model_type),!(this.url=k.result(this.model_type.prototype,"url")))throw new Error("Missing url for model: "+this.model_type);this.schema=new i(this.model_type),this.request=b("superagent")}return a.prototype.initialize=function(){return this.is_initialized?void 0:(this.is_initialized=!0,this.schema.initialize())},a.prototype.resetSchema=function(a,b){return this.request.del(this.url).end(function(a,c){return a?b(a):c.ok?b():b(new Error("Ajax failed with status "+c.status+" for destroy with: "+k.keys(c.body)))})},a.prototype.cursor=function(a){return null==a&&(a={}),new e(a,{model_type:this.model_type,url:this.url,request:this.request})},a.prototype.destroy=function(a,b){return this.request.del(this.url).query(a).end(function(a,c){return a?b(a):c.ok?b():b(new Error("Ajax failed with status "+c.status+" for destroy with: "+k.keys(c.body)))})},a}(),c.exports=function(a){var d,e,i;return j.isCollection(new a)?(d=j.configureCollectionModelType(a,c.exports),a.prototype.sync=d.prototype.sync):(e=new f(a),a.prototype.sync=i=function(a,b,d){var f,h,i;if(null==d&&(d={}),e.initialize(),"createSync"===a)return c.exports.apply(null,Array.prototype.slice.call(arguments,1));if("sync"===a)return e;if("schema"===a)return e.schema;if("isRemote"===a)return!0;if(k.contains(["create","update","patch","delete","read"],a)){if(!(i=d.url||k.result(b,"url")))throw new Error("Missing url for model");switch(h=e.request,a){case"read":f=h.get(i).query({$one:!b.models}).type("json");break;case"create":f=h.post(i).send(d.attrs||b.toJSON(d)).type("json");break;case"update":f=h.put(i).send(d.attrs||b.toJSON(d)).type("json");break;case"patch":f=h.patch(i).send(d.attrs||b.toJSON(d)).type("json");break;case"delete":f=h.del(i)}return f.end(function(b,c){return b?d.error(b):c.ok?d.success(g.parse(c.body)):d.error(new Error("Ajax failed with status "+c.status+" for "+a+" with: "+k.keys(c.body)))}),void 0}return e[a]?e[a].apply(e,Array.prototype.slice.call(arguments,1)):void 0},b("backbone-orm/lib/extensions/model")(a),h.configureSync(a,i))}}),"object"==typeof exports)module.exports=require("backbone-http/lib/index");else if("function"==typeof define&&define.amd)define("backbone-http",["backbone-orm","superagent"],function(){return require("backbone-http/lib/index")});else{var a=this.Backbone;if(!a&&"function"==typeof require)try{a=require("backbone")}catch(b){a=this.Backbone={}}a.HTTP=require("backbone-http/lib/index")}}).call(this);
