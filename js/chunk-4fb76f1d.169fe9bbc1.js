(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4fb76f1d"],{c503:function(t,e,a){"use strict";(function(t){a("d81d"),a("a9e3"),a("d3b7"),a("ac1f"),a("1276");var s=a("81b0"),n=a.n(s),r=a("bc3a"),i=a.n(r),c=a("c1df"),o=a.n(c);function f(t,e,a){e.data=a,e.params.page=(null===this.page?e.pages.page:this.page)+e.pages.index,e.params.size=null===this.size?e.pages.size:this.size,i()(e).then((function(a){t.datas=n.a.get(a.data,e.paths.dataPath,[]);var s={};s.page=1*n.a.get(a.data,e.paths.pagePath,0)-e.pages.index,s.total=1*n.a.get(a.data,e.paths.totalPath,0),s.count=1*n.a.get(a.data,e.paths.countPath,0),s.size=1*n.a.get(a.data,e.paths.sizePath,20),s.length=t.datas.length,t.$emit("update:pages",s)})).catch((function(t){console.error(fetch,t)})).finally((function(){}))}e["a"]={name:"DataCard",props:{fields:{type:Object,default:function(){return{}}},fetchs:{type:Object,default:function(){return{}}},filters:{type:Object,default:function(){return{}}},pages:{type:Object,default:function(){return{}}},page:{type:Number,default:function(){return null}},size:{type:Number,default:function(){return null}}},data:function(){return{datas:this.fetchs.datas}},watch:{filters:{handler:function(){this.resetPage(),this.fetchData()},deep:!0},page:{handler:function(){this.fetchData()},deep:!0}},created:function(){var t=this;n.a.map(this.fields,(function(e){if(e.length)n.a.map(e,(function(e){if(e.format){var a=e.format.split("|"),s=t[a[0]];e.format=function(e){return a[0]=e,s.apply(t,a)}}}));else if(e.format){var a=e.format.split("|"),s=t[a[0]];e.format=function(e){return a[0]=e,s.apply(t,a)}}})),this.fetchData()},computed:{jq:function(){return t},fetch:function(){return n.a.debounce(f,500)}},methods:{fetchData:function(){return this.fetch(this,this.fetchs,this.filters,this.pages)},resetPage:function(){this.page=this.fetchs.pages.page||0,this.fetchData()},format:function(t,e){return e?e.format?e.format(t[e.data]):t[e.data]:"-"},formatDate:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"YYYY-MM-DD";if(t/=1,!t)return"";var a=new Date(t),s=o()(a).format(e);return s},formatStat:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return t/=1,e=JSON.parse(e),e[t]||t||"-"}}}}).call(this,a("c5ec"))},cdff:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.views&&t.views.columns&&t.views.fetchs?a("div",[t.views.title?a("h2",[t._v(t._s(t.views.title))]):t._e(),t.views.desc?a("p",{staticClass:"text-muted"},[t._v(t._s(t.views.desc))]):t._e(),a("data-filter",{attrs:{items:t.views.filters,filters:t.filters},on:{"update:filters":function(e){t.filters=e}}}),a("br"),a("data-card",{staticClass:"row row-cols-1 row-cols-sm-2 row-cols-md-4",attrs:{fields:t.views.columns,fetchs:t.views.fetchs,filters:t.filters,page:t.page,size:t.size,pages:t.pages},on:{"update:pages":function(e){t.pages=e}}}),a("br"),a("data-page",{staticClass:"justify-content-center",attrs:{pages:t.pages,page:t.page,size:t.size},on:{"update:page":function(e){t.page=e},"update:size":function(e){t.size=e}}})],1):t._e()},n=[],r=(a("d81d"),a("96cf"),a("1da1")),i=a("81b0"),c=a.n(i),o=a("bc3a"),f=a.n(o),u=a("db49"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},t._l(t.datas,(function(e,s){return a("div",{key:s,staticClass:"col mb-4"},[a("div",{staticClass:"card"},[t.fields.header?a("div",{staticClass:"card-header"},[t._l(t.fields.header,(function(s,n){return[a("span",{key:n},[a("b",[t._v(t._s(s.title)+":")]),t._v(" "+t._s(t.format(e,s)))])]}))],2):t._e(),t.fields.body?a("div",{staticClass:"card-body"},[t._l(t.fields.body,(function(s,n){return[a("span",{key:n},[a("b",[t._v(t._s(s.title)+":")]),t._v(" "+t._s(t.format(e,s)))])]}))],2):t._e(),t.fields.length?a("ul",{staticClass:"list-group list-group-flush"},t._l(t.fields,(function(s,n){return a("li",{key:n,staticClass:"list-group-item"},[a("b",[t._v(t._s(s)+":")]),t._v(" "+t._s(t.format(e,s))+" ")])})),0):t._e(),t.fields.footer?a("div",{staticClass:"card-footer"},[t._l(t.fields.footer,(function(s,n){return[a("small",{key:n,staticClass:"text-muted"},[t._v(t._s(s.title)+": "+t._s(t.format(e,s)))])]}))],2):t._e()])])})),0)},p=[],d=a("c503"),g=d["a"],h=a("2877"),m=Object(h["a"])(g,l,p,!1,null,"9992d836",null),v=m.exports,b=a("43c2"),_=a("2696"),w={name:"Cards",props:[],data:function(){return{config:{},views:{},filters:{},pages:{},page:null,size:null}},created:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,s,n,r,i,o,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=t,!t.$route.query.config){e.next=16;break}return s={},e.prev=3,e.next=6,f.a.get(t.$route.query.config);case 6:s=e.sent,t.config=c.a.merge({},u["a"],s.data||{}),e.next=14;break;case 10:return e.prev=10,e.t0=e["catch"](3),alert("config "+t.$route.query.config+" load error\n"+e.t0.message+" "),e.abrupt("return");case 14:e.next=17;break;case 16:t.config=c.a.merge({},u["a"]);case 17:n=t.$route.query,r=JSON.parse(n.options||{}),i=JSON.parse(n.fetchs||{}),o=JSON.parse(n.columns||[]),l=JSON.parse(n.filters||[]),n.options=c.a.merge({},t.config.options,r),n.fetchs=c.a.merge({},t.config.fetchs,i),n.columns={},c.a.map(o,(function(t,e){"header"==e||"body"==e||"footer"==e?n.columns[e]=c.a.map(t,(function(t,e){return"number"===typeof e?"string"===typeof t?a.config.columns[t]:t:c.a.merge({},a.config.columns[e],t)})):("number"===typeof e&&(n.columns[e]="string"===typeof t?a.config.columns[t]:t),n.columns[e]=c.a.merge({},a.config.columns[e],t))})),n.filters=c.a.map(l,(function(t,e){return"number"===typeof e?"string"===typeof t?a.config.filters[t]:t:c.a.merge({},a.config.filters[e],t)})),t.views=c.a.merge({view:"",title:"",desc:"",fetchs:"{}",columns:"[]",filters:"[]",options:"{}"},n);case 28:case"end":return e.stop()}}),e,null,[[3,10]])})))()},components:{DataCard:v,DataFilter:b["a"],DataPage:_["a"]}},y=w,C=Object(h["a"])(y,s,n,!1,null,"d2af145a",null);e["default"]=C.exports}}]);
//# sourceMappingURL=chunk-4fb76f1d.169fe9bbc1.js.map