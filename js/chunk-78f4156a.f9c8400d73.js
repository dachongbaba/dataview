(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78f4156a"],{"489e":function(t,e,a){"use strict";(function(t){a("ac1f"),a("5319"),a("1276"),a("96cf");var r=a("1da1"),s=a("81b0"),i=a.n(s),n=a("bc3a"),o=a.n(n),l=a("db49"),c=a("c3bf"),u=a.n(c);function d(t){var e=i.a.merge({},l["a"].fetchs,JSON.parse(t.datas.fetchs));e.params.page=e.pages.page+e.pages.index,e.params.size=e.pages.size,o()(e).then((function(e){e&&e.data&&(t.result=t.format(e.data))})).catch((function(e){t.result=t.format(e)}))}e["a"]={name:"Views",props:[],data:function(){return{config:{},datas:{},result:"",view:""}},created:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.datas.config){e.next=7;break}return e.next=3,o.a.get(t.datas.config);case 3:a=e.sent,t.config=i.a.merge({},l["a"],a.data),e.next=8;break;case 7:t.config=i.a.merge({},l["a"]);case 8:t.datas=i.a.merge({view:"",title:"",desc:"",fetchs:"{}",columns:"[]",filters:"[]",options:"{}"},t.$route.query),t.view=t.viewurl();case 10:case"end":return e.stop()}}),e)})))()},computed:{jq:function(){return t},fetch:function(){return i.a.debounce(d,500)}},methods:{loadConfig:function(t){return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t){e.next=5;break}return e.next=3,o.a.get(t);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:return e.abrupt("return",l["a"]);case 6:case"end":return e.stop()}}),e)})))()},fetchData:function(){return this.fetch(this)},buildData:function(){var t=JSON.parse(this.datas.fetchs),e=JSON.parse(this.datas.columns),a=JSON.parse(this.datas.filters),r=JSON.parse(this.datas.options);return i.a.merge({},this.datas,{fetchs:JSON.stringify(t),columns:JSON.stringify(e),filters:JSON.stringify(a),options:JSON.stringify(r)})},buildConfig:function(){this.result=this.format(this.buildData())},buildLink:function(){this.$router.replace({path:"views",query:this.buildData()})},viewurl:function(){return u()("dataview/#/"+this.datas.view,{queryParams:this.buildData()})},format:function(t){if(t)return"string"===typeof t&&(t=JSON.parse(t)),JSON.stringify(t,null,2)},textline:function(t){var e=t.split("\n").length;return e||1}}}}).call(this,a("c5ec"))},5319:function(t,e,a){"use strict";var r=a("d784"),s=a("825a"),i=a("7b0b"),n=a("50c4"),o=a("a691"),l=a("1d80"),c=a("8aa5"),u=a("14c3"),d=Math.max,f=Math.min,v=Math.floor,m=/\$([$&'`]|\d\d?|<[^>]*>)/g,p=/\$([$&'`]|\d\d?)/g,g=function(t){return void 0===t?t:String(t)};r("replace",2,(function(t,e,a,r){var h=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,w=r.REPLACE_KEEPS_$0,C=h?"$":"$0";return[function(a,r){var s=l(this),i=void 0==a?void 0:a[t];return void 0!==i?i.call(a,s,r):e.call(String(s),a,r)},function(t,r){if(!h&&w||"string"===typeof r&&-1===r.indexOf(C)){var i=a(e,t,this,r);if(i.done)return i.value}var l=s(t),v=String(this),m="function"===typeof r;m||(r=String(r));var p=l.global;if(p){var x=l.unicode;l.lastIndex=0}var _=[];while(1){var y=u(l,v);if(null===y)break;if(_.push(y),!p)break;var S=String(y[0]);""===S&&(l.lastIndex=c(v,n(l.lastIndex),x))}for(var P="",k=0,N=0;N<_.length;N++){y=_[N];for(var $=String(y[0]),O=d(f(o(y.index),v.length),0),q=[],D=1;D<y.length;D++)q.push(g(y[D]));var E=y.groups;if(m){var J=[$].concat(q,O,v);void 0!==E&&J.push(E);var R=String(r.apply(void 0,J))}else R=b($,v,O,q,E,r);O>=k&&(P+=v.slice(k,O)+R,k=O+$.length)}return P+v.slice(k)}];function b(t,a,r,s,n,o){var l=r+t.length,c=s.length,u=p;return void 0!==n&&(n=i(n),u=m),e.call(o,u,(function(e,i){var o;switch(i.charAt(0)){case"$":return"$";case"&":return t;case"`":return a.slice(0,r);case"'":return a.slice(l);case"<":o=n[i.slice(1,-1)];break;default:var u=+i;if(0===u)return e;if(u>c){var d=v(u/10);return 0===d?e:d<=c?void 0===s[d-1]?i.charAt(1):s[d-1]+i.charAt(1):e}o=s[u-1]}return void 0===o?"":o}))}}))},c3bf:function(t,e,a){(function(){"use strict";var a=this,r=a.buildUrl,s=function(t,e){var a,r,s,i=[];if(s=!(!e||!e.lowerCase)&&!!e.lowerCase,null===t?r="":"object"===typeof t?(r="",e=t):r=t,e){if(e.path){r&&"/"===r[r.length-1]&&(r=r.slice(0,-1));var n=String(e.path).trim();s&&(n=n.toLowerCase()),0===n.indexOf("/")?r+=n:r+="/"+n}if(e.queryParams){for(a in e.queryParams){var o;if(e.queryParams.hasOwnProperty(a)&&void 0!==e.queryParams[a])if(e.disableCSV&&Array.isArray(e.queryParams[a])&&e.queryParams[a].length)for(var l=0;l<e.queryParams[a].length;l++)o=encodeURIComponent(String(e.queryParams[a][l]).trim()),i.push(a+"="+o);else o=s?encodeURIComponent(String(e.queryParams[a]).trim().toLowerCase()):encodeURIComponent(String(e.queryParams[a]).trim()),i.push(a+"="+o)}r+="?"+i.join("&")}e.hash&&(r+=s?"#"+String(e.hash).trim().toLowerCase():"#"+String(e.hash).trim())}return r};s.noConflict=function(){return a.buildUrl=r,s},t.exports&&(e=t.exports=s),e.buildUrl=s}).call(this)},e5c2:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"jumbotron"},[a("form",[t._v(t._s(t.datas.view||"aaa")+" "),a("div",{staticClass:"form-group"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.datas.view,expression:"datas.view"}],staticClass:"form-control font-weight-bolder",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.datas,"view",e.target.multiple?a:a[0])}}},t._l(t.config.views,(function(e){return a("option",{key:e,domProps:{value:e}},[t._v(" "+t._s(e)+" ")])})),0),a("small",{staticClass:"form-text text-muted",attrs:{id:"viewHelp"}},[t._v("dataview type")])]),a("div",{staticClass:"form-group"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.datas.title,expression:"datas.title"}],staticClass:"col form-control font-weight-bolder",attrs:{rows:t.textline(t.datas.title),placeholder:"Title","data-toggle":"collapse","data-target":"#titleConfig"},domProps:{value:t.datas.title},on:{input:function(e){e.target.composing||t.$set(t.datas,"title",e.target.value)}}}),a("small",{staticClass:"form-text text-muted",attrs:{id:"viewHelp"}},[t._v("dataview desc")]),a("pre",{staticClass:"collapse",attrs:{id:"descConfig"}},[a("code",[t._v(t._s(t.config.title))])])]),a("div",{staticClass:"form-group"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.datas.desc,expression:"datas.desc"}],staticClass:"col form-control font-weight-bolder",attrs:{rows:t.textline(t.datas.desc),placeholder:"Desc","data-toggle":"collapse","data-target":"#descConfig"},domProps:{value:t.datas.desc},on:{input:function(e){e.target.composing||t.$set(t.datas,"desc",e.target.value)}}}),a("small",{staticClass:"form-text text-muted",attrs:{id:"viewHelp"}},[t._v("dataview desc")]),a("pre",{staticClass:"collapse",attrs:{id:"descConfig"}},[a("code",[t._v(t._s(t.config.desc))])])]),a("div",{staticClass:"form-group"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.datas.fetchs,expression:"datas.fetchs"}],staticClass:"col form-control font-weight-bolder",attrs:{rows:t.textline(t.datas.fetchs),placeholder:"Fetch","data-toggle":"collapse","data-target":"#fetchConfig"},domProps:{value:t.datas.fetchs},on:{input:function(e){e.target.composing||t.$set(t.datas,"fetchs",e.target.value)}}}),a("small",{staticClass:"form-text text-muted",attrs:{id:"viewHelp"}},[t._v("data fetch")]),a("pre",{staticClass:"collapse",attrs:{id:"fetchConfig"}},[a("code",[t._v(t._s(t.format(t.config.fetchs)))])])]),a("div",{staticClass:"form-group"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.datas.columns,expression:"datas.columns"}],staticClass:"form-control font-weight-bolder",attrs:{id:"columns",rows:t.textline(t.datas.columns),placeholder:"Column","data-toggle":"collapse","data-target":"#columnConfig"},domProps:{value:t.datas.columns},on:{input:function(e){e.target.composing||t.$set(t.datas,"columns",e.target.value)}}}),a("small",{staticClass:"form-text text-muted",attrs:{id:"viewHelp"}},[t._v("data column")]),a("pre",{staticClass:"collapse",attrs:{id:"columnConfig"}},[a("code",[t._v(t._s(t.format(t.config.columns)))])])]),a("div",{staticClass:"form-group"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.datas.filters,expression:"datas.filters"}],staticClass:"form-control font-weight-bolder",attrs:{id:"filter",rows:t.textline(t.datas.filters),placeholder:"Filter","data-toggle":"collapse","data-target":"#filterConfig"},domProps:{value:t.datas.filters},on:{input:function(e){e.target.composing||t.$set(t.datas,"filters",e.target.value)}}}),a("small",{staticClass:"form-text text-muted",attrs:{id:"viewHelp"}},[t._v("data filter")]),a("pre",{staticClass:"collapse",attrs:{id:"filterConfig"}},[a("code",[t._v(t._s(t.format(t.config.filters)))])])]),a("div",{staticClass:"form-group"},[a("div",{staticClass:"form-row justify-content-center"},[a("div",{staticClass:"col-auto"},[a("button",{staticClass:"btn btn-primary",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.fetchData(e)}}},[t._v("Load Data")])]),a("div",{staticClass:"col-auto"},[a("button",{staticClass:"btn btn-primary",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.buildConfig(e)}}},[t._v("Build Config")])]),a("div",{staticClass:"col-auto"},[a("button",{staticClass:"btn btn-primary",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.buildLink(e)}}},[t._v("Build Link")])])])]),a("div",{staticClass:"form-group"},[a("div",{staticClass:"text-break"},[a("router-link",{attrs:{to:{path:t.datas.view,query:t.$route.query}}},[t._v(t._s(t.view))])],1),a("pre",[t._v(t._s(t.result))])])])])},s=[],i=a("489e"),n=i["a"],o=a("2877"),l=Object(o["a"])(n,r,s,!1,null,"42d2e003",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-78f4156a.f9c8400d73.js.map