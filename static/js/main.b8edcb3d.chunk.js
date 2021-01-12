(this["webpackJsonpfrontend-applications"]=this["webpackJsonpfrontend-applications"]||[]).push([[0],{192:function(t,e,n){"use strict";n.r(e);var r=n(1),a=n(0),c=n.n(a),i=n(56),o=n.n(i),s=n(3),l=(n(184),n(6)),u=n(5),d=n(57);function f(){var t=Object(l.a)(["\n    ",";\n\n\t* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n  }\n  html {\n\t\n\t  box-sizing: border-box;\n        overflow-y: scroll;\n\t\t\n  }\n  #root {\n\t  ","\n\t  ","\n\t  ","\n\t  padding-top: min(16px, env(safe-area-inset-top));\n\t  padding-left: min(16px, env(safe-area-inset-left));\n        padding-right: min(16px, env(safe-area-inset-right));\n        padding-bottom: min(16px, env(safe-area-inset-bottom));\n\t\t\n  }\n  :root {\n\t--safe-area-inset-top   : 16px;\n    --safe-area-inset-right : 16px;\n    --safe-area-inset-bottom: 16px;\n    --safe-area-inset-left  : 16px;  \n\tbody {\n\t\tbackground-color: ",";\n\t\tfont-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',\n\t\t'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',\n\t\t'Helvetica Neue', sans-serif;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n\t","\n\tmin-width:100%;\n\t\tmin-height:100%;\n\t\n\t}\n\tcode {\n\tfont-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n\t\tmonospace;\n}\n\n      font-size: 14px;\n\n      @media (min-width: 768px) {\n        font-size: 16px;\n      }\n\n      @media (min-width: 1024px) {\n        font-size: 18px;\n      }\n    }\n\n\n.App {\n  background-color: ",";\n  width:100vw;\n\theight:100vh;\n\tmax-height:100%;\n\tmax-width:100%;\n  ","\n}\n.viz-wrapper {\n\twidth:100%;\n\theight:100%;\n\tdisplay:flex;\n\tposition:relative;\n\tpadding-bottom:50px;\n\tpadding-bottom:calc(50px + env(safe-area-inset-bottom));\n\t.title {\n\t\tposition: absolute;\n\t\tpadding-left:1em;\n\t}\n}\n\n.province {\n\tstroke-opacity: 0.5;\n\tstroke-width: 1px;\n\t/* stroke: none; */\n\tstroke-linejoin: round;\n\tstroke-linecap: round;\n\n&:hover {opacity:0.9;}\n\n}\n.gemeente {\n\tfill-opacity: 1;\n\t\n\t/* stroke: white; */\n}\n.gemeente-borders{\n\tfill: none;\n\tstroke: ",";\n\t","\n\tstroke-linejoin: round;\n\t","\n\tpointer-events: none;\n}\n.provinces {\n\tfill: ",";\n\tstroke: ",";\n\t","\n}\n\n.provinces .active {\n\topacity: .8;\n\ttransition: visibility 0s, opacity 0.3s linear;\n}\n\n.province-borders {\n\tfill: none;\n\tstroke: var(--white);\n\tstroke-width: 1;\n\tstroke-linejoin: round;\n\tstroke-linecap: round;\n\tpointer-events: none;\n}\n\n.gemeente-grens {\n\tstroke-linejoin: round;\n\tstroke-linecap: round;\n\tstroke: ",";\n\tstroke-opacity: 1;\n\t/* stroke-width: 0.1em; */\n\t/* transition-duration: 0.5s; */\n\tfill: ",";\n}\n\n.legend-label {\n\tfont-weight:bold;\n}\n\n    "]);return f=function(){return t},t}var j={darkBlue:"#2F80ED",blue:"#2D9CDB",lightBlue:"#B3E5FC",dark:"#333333",darkGray:"#4F4F4F",midGray:"#828282",lightGray:"#BDBDBD",light:"#E0E0E0",white:"#F2F2F2",darkGreen:"#219653",green:"#27AE60",lightGreen:"#6FCF97",orange:"#F2994A",darkPurple:"#9B51E0",purple:"#BB6BD9",red:"#EB5757",yellow:"#F2C94C"},b=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1440;return"".concat(t/e*100,"vw")},p=Object(u.createGlobalStyle)(f(),d.normalize,"","","",j.white,"",j.white,"",j.lightGreen,"","",j.lightGreen,j.white,"",j.green,j.lightGreen),h=n(2),v=n(11),g=n(28),O=function(){var t=Object(a.useState)(null),e=Object(s.a)(t,2),n=e[0],r=e[1];return Object(a.useEffect)((function(){Object(h.c)(";","https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/5f69fabb70e85ae64cf19633aadd38fcf26a75a4/parkeerData.csv",h.b,(function(t){return function(t){if(t.province)t.province=t.province.replace("Frysl\xe2n","Friesland")}(t),function(t){t.usage=t.usage.replace("park and ride","P+R Parkeerplaats").replace("garage","Parkeergarage").replace("terrain","Parkeerterrein")}(t),t.id=+t.id,t.minimumHeightInMeters=+t.minimumHeightInMeters,t.latitude=+t.latitude,t.longitude=+t.longitude,t.capacity=+t.capacity,t})).then((function(t){(function(t){Object(h.j)(t,(function(t){return t})).keys((function(t){return t.usage}))})(t),function(t){if(t&&null!==t){var e=Object(h.p)(t,(function(t){return Object(g.sum)(t,(function(t){return t.capacity}))}),(function(t){return t.province}));Object(h.o)(t,(function(t){return Object(g.sum)(t,(function(t){return t.capacity}))}),(function(t){return t.usage}))}}(t);return r(t)}))}),[]),n};var m=function(t){var e=Object(a.useState)(x(t?t.current:null)),n=Object(s.a)(e,2),r=n[0],c=n[1],i=Object(a.useCallback)((function(){t.current&&c(x(t.current))}),[t]);return Object(a.useLayoutEffect)((function(){var e=t.current;if(e){if(i(),"function"===typeof ResizeObserver){var n=new ResizeObserver((function(){return i()}));return n.observe(e),function(){n&&(n.disconnect(),n=null)}}return window.addEventListener("resize",i),function(){window.removeEventListener("resize",i)}}}),[t,i]),r};function x(t){return t?t.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0}}var k=Object(a.createContext)(null),y=function(t){var e=t.size,n=t.children,c=t.className,i=e.width,o=e.height,l=Object(a.useRef)(null),u=Object(a.useState)(null),d=Object(s.a)(u,2),f=d[0],j=d[1];return Object(a.useEffect)((function(){return j(l.current)}),[e]),Object(r.jsx)("svg",{className:c,ref:l,viewBox:"0 0 ".concat(i," ").concat(o),width:i,height:o,children:Object(r.jsx)(k.Provider,{value:f,children:n})})};function w(){return Object(a.useContext)(k)}function S(){var t=Object(l.a)(["\n\theight: 100vh;\n\twidth: 100vw;\n\tbackground: ",";\n\tz-index: 4;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n"]);return S=function(){return t},t}function z(){var t=Object(l.a)(["\n\tanimation: rotate 2s linear infinite;\n\tmargin: -25px 0 0 -25px;\n\twidth: 50px;\n\theight: 50px;\n\n\t& .path {\n\t\tstroke: ",";\n\t\tstroke-linecap: round;\n\t\tanimation: dash 1.5s ease-in-out infinite;\n\t}\n\n\t@keyframes rotate {\n\t\t100% {\n\t\t\ttransform: rotate(360deg);\n\t\t}\n\t}\n\n\t@keyframes dash {\n\t\t0% {\n\t\t\tstroke-dasharray: 1, 150;\n\t\t\tstroke-dashoffset: 0;\n\t\t}\n\t\t50% {\n\t\t\tstroke-dasharray: 90, 150;\n\t\t\tstroke-dashoffset: -35;\n\t\t}\n\t\t100% {\n\t\t\tstroke-dasharray: 90, 150;\n\t\t\tstroke-dashoffset: -124;\n\t\t}\n\t}\n"]);return z=function(){return t},t}var N=function(){return Object(r.jsx)(F,{children:Object(r.jsxs)(P,{viewBox:"0 0 50 50",children:[Object(r.jsx)("circle",{className:"path",cx:"25",cy:"25",r:"20",fill:"none",strokeWidth:"4"}),Object(r.jsx)("circle",{className:"path",cx:"25",cy:"25",r:"20",fill:"none",strokeWidth:"4"}),Object(r.jsx)("circle",{className:"path",cx:"25",cy:"25",r:"20",fill:"none",strokeWidth:"4"})]})})},P=u.default.svg(z(),j.green),F=u.default.div(S(),j.primary);function B(){var t=Object(l.a)(["\n\ttransition-duration: 100ms;\n\t/* fill: ","; */\n\tfill-opacity: 1;\n\t/* stroke: ","; */\n\tstroke-width: 1;\n\t/* stroke-width: ","; */\n\t/* stroke: ","; */\n\t&:hover {\n\t\t/* stroke: ","; */\n\t}\n"]);return B=function(){return t},t}function E(){var t=Object(l.a)(["\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: stretch;\n\tjustify-content: center;\n\tpadding-top: ",";\n\tpadding-left: ",";\n\tpadding-right: ",";\n\tpadding-bottom: ",";\n\tmax-width: 100%;\n\theight: 100%;\n\n\t.map {\n\t\tcolor: red;\n\t}\n\t.legend {\n\t\tposition: absolute;\n\n\t\tbottom: 0;\n\t\tleft: 10px;\n\t}\n"]);return E=function(){return t},t}var U=u.default.div(E(),b(32),b(32),b(32),b(32)),C=u.default.circle(B(),(function(t){return t.active,j.blue}),(function(t){return t.active?t.fill:j.blue}),(function(t){return t.active?1:3}),(function(t){return t.fill}),(function(t){return j.red})),D=n(61),A=n.n(D),R=n(17),M=function(t){var e=t.colorScale,n=t.tickSpacing,c=void 0===n?25:n,i=t.tickSize,o=void 0===i?8:i,s=t.tickTextOffset,l=void 0===s?-25:s,u=t.onHover,d=t.hoveredUsage,f=t.fadeOpacity,j=t.LegendLabel,b=(t.className,t.dimensions),p=t.sizeScale,v=b.width,g=(b.height,w()),O=Object(a.useRef)();return Object(a.useEffect)((function(){if(g){Object(h.t)(g);var t=Object(h.t)(O.current);t.append("text").text("Capaciteit Parkeergarage").attr("transform","translate(".concat(0,",80)")).attr("class","legend-label");var e=t.append("g").attr("fill","#444").attr("transform","translate(".concat(0,",140)")).attr("text-anchor","end").selectAll("g").data([100,1e3,2500]).join("g");e.append("circle").attr("fill","none").attr("stroke","#444").attr("cy",(function(t){return-p(t)})).attr("r",p),e.append("text").attr("y",(function(t){return-10-3*p(t)})).attr("x",l).attr("dy","1.3em").text(Object(h.d)(".0f")).attr("class","legend-text")}}),[g,O]),Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)("g",{transform:"translate(".concat(v-20,", ",100,")"),textAnchor:"end",children:[Object(r.jsxs)("g",{className:"color-legend",children:[Object(r.jsx)("text",{x:0,y:-25,className:"legend-label",children:j}),e.domain().map((function(t,n){return Object(r.jsxs)("g",{className:"tick",transform:"translate(0,".concat(n*c,")"),onMouseEnter:function(){u(t)},onMouseOut:function(){u(null)},children:[Object(r.jsx)("text",{x:l,dy:".32em",children:t}),Object(r.jsx)(C,{fill:e(t),r:o,opacity:d&&t!==d?f:1})]},n)}))]}),Object(r.jsx)("g",{ref:O,className:"size-legend"})]})})},V=n(12),G=function(t){var e=t.children,n=t.path,c=t.activeProvince,i=t.setActiveProvince,o=w(),l=Object(a.useState)({x:0,y:0,k:1}),u=Object(s.a)(l,2),d=u[0],f=d.x,j=d.y,b=d.k,p=u[1],v=Object(a.useRef)(Object(h.u)().scaleExtent([1,10]).on("zoom",(function(t){var e=t.transform;p(e)})));return Object(a.useEffect)((function(){if(o){var t=Object(h.t)(o),e=o.clientWidth,r=o.clientHeight,a=Object(h.t)(c).node();if(c){var l=n.bounds(a),u=Object(s.a)(l,2),d=Object(s.a)(u[0],2),f=d[0],j=d[1],b=Object(s.a)(u[1],2),p=b[0],g=b[1];t.selectAll("path"),t.transition().duration(750).call(v.current.transform,h.v.translate(e/2,r/2).scale(Math.min(8,.9/Math.max((p-f)/e,(g-j)/r))).translate(-(f+p)/2,-(j+g)/2))}else i(null),t.transition().duration(750).call(v.current.transform,h.v,Object(h.w)(t).invert([e/2,r/2]));t.call(v.current)}}),[o,c]),Object(r.jsx)("g",{transform:"translate(".concat(f,", ").concat(j,") scale(").concat(b,")"),strokeWidth:1/b,children:e})};function H(){var t=Object(l.a)(["\n\t/* transition-duration: 500ms; */\n\t/* fill: ","; */\n\t/* fill-opacity: 1; */\n\t/* stroke: ","; */\n\t/* stroke-width: 0.5; */\n\t/* stroke-width: ","; */\n\t&:hover {\n\t\tstroke: ",";\n\t}\n"]);return H=function(){return t},t}function L(){var t=Object(l.a)(["\n\t/* transition-duration: 700ms; */\n\n\t:hover {\n\t\topacity: 0.7;\n\t}\n"]);return L=function(){return t},t}var I=function(t){var e=t.nld,n=t.data,c=(t.colorScale,t.colorValue,t.sizeScale,t.sizeValue,t.activeProvince),i=t.activateProvince,o=t.setActiveProvince,l=(t.filteredUsage,t.hoveredUsage,t.filteredData,t.fadeOpacity,t.dimensions),u=(e.gemeente,e.gemeenteBorder),d=e.province,f=e.provinceBorder,j=l.width,b=l.height,p=(w(),Object(a.useState)(d)),v=Object(s.a)(p,2),g=v[0],O=(v[1],Object(h.f)(g)),m=Object(h.e)(g),x=b+j/Object(h.g)(m[1],m[0])/Math.sqrt(2),k=Object(h.h)().scale(x).center(O).translate([j/2,b/2]),y=Object(h.i)().projection(k);return Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)(G,{setActiveProvince:o,activeProvince:c,path:y,size:l,width:j,height:b,children:[n.length&&Object(r.jsx)(r.Fragment,{children:Object(a.useMemo)((function(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("g",{className:"gemeentes",children:Object(r.jsx)("path",{className:"gemeente-borders",d:y(u)})}),Object(r.jsxs)("g",{className:"provinces",children:[d.features.map((function(t){return Object(r.jsx)("path",{className:c===t?"province active":"province",d:y(t),onClick:function(){return i(t)},title:t.properties.statnaam},t.id)})),Object(r.jsx)("path",{className:"province-borders",d:y(f)})]})]})}),[y,d,f,u])}),n&&Object(r.jsx)(T,Object(R.a)(Object(R.a)({},t),{},{projection:k}))]})})},T=(u.default.path(L()),function(t){var e=t.data,n=t.hoveredUsage,c=t.projection,i=t.sizeScale,o=t.colorScale,l=t.sizeValue,u=t.colorValue,d=(t.fadeOpacity,t.filteredData),f=(Object(a.useRef)(),Object(a.useState)(e)),j=Object(s.a)(f,2),b=(j[0],j[1]);return Object(a.useEffect)((function(){e&&b(d)}),[e]),Object(r.jsx)("g",{className:"parking-locations",children:e.map((function(t){var e=c([t.longitude,t.latitude]),a=i(l(t)),s=o(u(t));return Object(r.jsx)(W,{proj:e,r:a,fill:s,value:t.usage,active:!(!n||t.usage===n),children:Object(r.jsxs)("title",{children:[" ",t.name]})},t.id)}))})}),W=function(t){t.value;var e=t.r,n=t.fill,a=(t.transform,t.active,t.proj);t.isShowing;return Object(r.jsx)(V.a.circle,{fill:n,r:e,transform:"translate(".concat(a,")")})},_=(Object(u.default)(V.a.circle)(H(),(function(t){return t.active,j.blue}),(function(t){return t.active?j.red:j.blue}),(function(t){return t.active?1:3}),j.white),n(7)),J=n.n(_),q=n(62),K=(function(){var t=Object(q.a)(J.a.mark((function t(e,n){return J.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e({t:1});case 2:case"end":return t.stop()}}),t)})))}(),function(t){var e=t.data,n=t.dimensions,c=t.colorScale,i=(t.onHover,n.width),o=n.height,s=Object(h.p)(e,(function(t){return t.length}),(function(t){return t.usage})),l=w(),u=Object(a.useRef)(),d=Object(a.useRef)(s),f=m(u);return Object(a.useEffect)((function(){if(e&&n&&u&&f){!function(t){var e=Math.min(i,o)/10-1,n=Object(h.n)().padAngle(0).value((function(t){return t[1]})).sort(null),r=Object(h.a)().innerRadius(20).outerRadius(e),a=n(t),s=n(d.current),l=Object(h.t)(u.current).selectAll("g.arc").data(a);l.exit().remove();l.enter().append("g").attr("class","arc").append("path").merge(l.select("path.arc")).attr("class","arc").transition().attrTween("d",(function(t,e){var n=Object(h.k)(s[e],t);return function(t){return r(n(t))}})).style("fill",(function(t){return c(t.data[0])})).style("stroke","#ffffff").style("stroke-width",2)}(s),d.current=s}}),[l,e,u,n]),Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("g",{transform:"translate(".concat(i-10-f.width/2,", ").concat(o-10-f.width/2,")"),children:Object(r.jsx)("g",{ref:u,className:"arc"})})})}),Q=function(t){var e=t.nld,n=t.data,c=t.filteredUsage,i=t.filteredData,o=t.colorScale,l=t.colorValue,u=t.sizeValue,d=t.hoveredUsage,f=t.fadeOpacity,j=t.children,b=t.activeProvince,p=t.setActiveProvince,v=t.setHoveredUsage,g=(e.gemeente,e.gemeenteBorder,e.province,e.provinceBorder,n.allData,Object(a.useState)(null)),O=Object(s.a)(g,2),x=(O[0],O[1],Object(a.useState)(10)),k=Object(s.a)(x,2),w=k[0],S=(k[1],Object(a.useRef)()),z=(m(S),A()()),N=Object(s.a)(z,2),P=N[0],F=N[1],B=Object(h.s)().domain([0,Object(h.m)(n,u)]).range([0,w]);return Object(a.useEffect)((function(){}),[F]),Object(r.jsxs)("div",{className:"viz-wrapper",ref:S,children:[P,Object(r.jsxs)(y,{className:"map",size:F,children:[Object(r.jsx)(I,{nld:e,data:n,colorScale:o,colorValue:l,activeProvince:b,activateProvince:function(t){null!==b||b===t?b===t&&p(null):p(t)},hoveredUsage:d,filteredUsage:c,fadeOpacity:f,sizeScale:B,sizeValue:u,dimensions:F,setActiveProvince:p}),Object(r.jsx)(M,{className:"legend",data:n,onHover:v,hoveredUsage:d,colorScale:o,colorValue:l,tickSpacing:22,tickSize:8,tickTextOffset:-18,fadeOpacity:.2,LegendLabel:"Soort Parkeermogelijkheid",dimensions:F,sizeScale:B}),Object(r.jsx)(K,{data:i,onHover:v,hoveredUsage:d,filteredUsage:c,colorScale:o,colorValue:l,sizeValue:u,fadeOpacity:.2,setActiveProvince:p,activeProvince:b,setHoveredUsage:v,dimensions:F,sizeScale:B})]}),j]})};function X(){var t=Object(l.a)([""]);return X=function(){return t},t}u.default.g(X());var Y=function(){var t=function(){var t=Object(a.useState)(null),e=Object(s.a)(t,2),n=e[0],r=e[1];return Object(a.useEffect)((function(){Object(h.l)("https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/1f4e17c5e2a072e12ed5b2dce628413294a13c5e/nl_2020.json").then((function(t){var e=t.objects,n=e.gemeente_2020,a=e.provincie_2020;r({gemeente:Object(v.a)(t,n),gemeenteBorder:Object(v.b)(t,n,(function(t,e){return t!==e})),province:Object(v.a)(t,a),provinceBorder:Object(v.b)(t,a,(function(t,e){return t!==e}))})}))}),[]),n}(),e=O(),n=(function(){var t=Object(a.useState)(null),e=Object(s.a)(t,2),n=e[0],r=e[1];Object(a.useEffect)((function(){Object(h.l)("https://unpkg.com/world-atlas@2.0.2/countries-10m.json").then((function(t){var e=t.objects,n=e.countries,a=e.land;r({land:Object(v.a)(t,a),countries:Object(v.b)(t,n,(function(t,e){return t!==e}))})}))}),[])}(),Object(a.useState)(null)),c=Object(s.a)(n,2),i=c[0],o=c[1],l=Object(a.useState)(null),u=Object(s.a)(l,2),d=u[0],f=u[1],b=Object(a.useState)({allData:[],activeUsage:[]}),g=Object(s.a)(b,2),m=(g[0],g[1],Object(a.useRef)());if(!t||!e)return Object(r.jsx)("div",{className:"App",children:Object(r.jsx)(N,{})});var x=function(t){return t.usage},k=[j.darkBlue,j.darkGray,j.yellow],y=e.filter((function(t){return i===x(t)})),w=function(){try{return e.filter((function(t){return d.properties.statnaam===function(t){return t.province}(t)}))}catch(t){return e}}(),S=Object(h.r)().domain(e.map(x)).range(k);return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",{className:"App",children:Object(r.jsx)(U,{ref:m,children:Object(r.jsx)(Q,{nld:t,data:e,hoveredUsage:i,filteredUsage:y,filteredData:w,colorScale:S,colorValue:x,sizeValue:function(t){return t.capacity},fadeOpacity:.2,setActiveProvince:f,activeProvince:d,setHoveredUsage:o,children:Object(r.jsxs)("h1",{className:"title",children:["Parkeer plaatsen van Nederland"," ",Object(r.jsx)("span",{className:"current-province",onClick:function(){return f(null)},children:d?"in ".concat(d.properties.statnaam):""})]})})})}),Object(r.jsx)(p,{})]})},Z=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,193)).then((function(e){var n=e.getCLS,r=e.getFID,a=e.getFCP,c=e.getLCP,i=e.getTTFB;n(t),r(t),a(t),c(t),i(t)}))};o.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(Y,{})}),document.getElementById("root")),Z()}},[[192,1,2]]]);
//# sourceMappingURL=main.b8edcb3d.chunk.js.map