(this["webpackJsonpsong-visualizations"]=this["webpackJsonpsong-visualizations"]||[]).push([[5],{400:function(e,t,a){"use strict";a.r(t),a.d(t,"FeaturesByGenreVis",(function(){return u}));var i=a(295),n=a(377),s=a(399);function r(e){return{$schema:"https://vega.github.io/schema/vega-lite/v5.json",mark:{type:"area"},width:e.width,height:e.height,data:{values:e.data},encoding:{x:{field:"year",type:"quantitative",title:"Year",axis:{format:"d"}},y:{aggregate:"sum",field:"value",title:"Feature Dominance",stack:"normalize"},color:{field:"feature_name",type:"nominal",title:"Audio Feature"}}}}var o=a(2);function u(e){return Object(o.jsx)(n.a,{children:Object(o.jsx)(s.a,{spec:r(Object(i.a)(Object(i.a)({},e),{},{data:e.dataset.toGenreVisRow(e)}))})})}t.default=u}}]);
//# sourceMappingURL=5.5fd91170.chunk.js.map