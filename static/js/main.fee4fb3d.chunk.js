(this["webpackJsonpfrontend-applications"]=this["webpackJsonpfrontend-applications"]||[]).push([[0],{194:function(t,e,n){"use strict";n.r(e);var a=n(1),r=n(0),c=n.n(r),i=n(58),o=n.n(i),s=n(5),l=n(3),u=(n(186),n(8)),d=n(7),f=n(59);function b(){var t=Object(u.a)(["\n    ",";\n\n\t* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n  }\n  html {\n\t\n\t  box-sizing: border-box;\n        overflow-y: scroll;\n\t\t\n  }\n  #root {\n\t  ","\n\t  ","\n\t  ","\n\t  padding-top: min(16px, env(safe-area-inset-top));\n\t  padding-left: min(16px, env(safe-area-inset-left));\n        padding-right: min(16px, env(safe-area-inset-right));\n        padding-bottom: min(16px, env(safe-area-inset-bottom));\n\t\t\n  }\n  :root {\n\t--safe-area-inset-top   : 16px;\n    --safe-area-inset-right : 16px;\n    --safe-area-inset-bottom: 16px;\n    --safe-area-inset-left  : 16px;  \n\tbody {\n\t\tbackground-color: ",";\n\t\tfont-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',\n\t\t'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',\n\t\t'Helvetica Neue', sans-serif;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n\t","\n\tmin-width:100%;\n\t\tmin-height:100%;\n\t\n\t}\n\tcode {\n\tfont-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n\t\tmonospace;\n}\n\n      font-size: 14px;\n\n      @media (min-width: 768px) {\n        font-size: 16px;\n      }\n\n      @media (min-width: 1024px) {\n        font-size: 18px;\n      }\n    }\n\n\n.App {\n  background-color: ",";\n  width:100vw;\n\theight:100vh;\n\tmax-height:100%;\n\tmax-width:100%;\n  ","\n}\n.viz-wrapper {\n\twidth:100%;\n\theight:100%;\n\tdisplay:flex;\n\tposition:relative;\n\tpadding-bottom:50px;\n\tpadding-bottom:calc(50px + env(safe-area-inset-bottom));\n\t.title {\n\t\tposition: absolute;\n\t\tpadding-left:1em;\n\t}\n}\n\n.province {\n\tstroke-opacity: 0.5;\n\tstroke-width: 1px;\n\t/* stroke: none; */\n\tstroke-linejoin: round;\n\tstroke-linecap: round;\n\n&:hover {opacity:0.9;}\n\n}\n.gemeente {\n\tfill-opacity: 1;\n\t\n\t/* stroke: white; */\n}\n.gemeente-borders{\n\tfill: none;\n\tstroke: ",";\n\t","\n\tstroke-linejoin: round;\n\t","\n\tpointer-events: none;\n}\n.provinces {\n\tfill: ",";\n\tstroke: ",";\n\t","\n}\n\n.provinces .active {\n\topacity: .8;\n\ttransition: visibility 0s, opacity 0.3s linear;\n}\n\n.province-borders {\n\tfill: none;\n\tstroke: var(--white);\n\tstroke-width: 1;\n\tstroke-linejoin: round;\n\tstroke-linecap: round;\n\tpointer-events: none;\n}\n\n.gemeente-grens {\n\tstroke-linejoin: round;\n\tstroke-linecap: round;\n\tstroke: ",";\n\tstroke-opacity: 1;\n\t/* stroke-width: 0.1em; */\n\t/* transition-duration: 0.5s; */\n\tfill: ",";\n}\n\n.legend-label {\n\tfont-weight:bold;\n}\n\n    "]);return b=function(){return t},t}var j={darkBlue:"#2F80ED",blue:"#2D9CDB",lightBlue:"#B3E5FC",dark:"#333333",darkGray:"#4F4F4F",midGray:"#828282",lightGray:"#BDBDBD",light:"#E0E0E0",white:"#F2F2F2",darkGreen:"#219653",green:"#27AE60",lightGreen:"#6FCF97",orange:"#F2994A",darkPurple:"#9B51E0",purple:"#BB6BD9",red:"#EB5757",yellow:"#F2C94C"},p=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1440;return"".concat(t/e*100,"vw")},v=Object(d.createGlobalStyle)(b(),f.normalize,"","","",j.white,"",j.white,"",j.lightGreen,"","",j.lightGreen,j.white,"",j.green,j.lightGreen),O=n(2),h=n(15),g=(n(22),function(t,e){var n=Object(r.useState)(e),a=Object(l.a)(n,2),c=a[0],i=a[1],o=Object(r.useState)(t),s=Object(l.a)(o,2),u=s[0],d=s[1],f=Object(r.useState)(!1),b=Object(l.a)(f,2),j=b[0],p=b[1];return Object(r.useEffect)((function(){var e=function(t){return function(t){if(t.province)t.province=t.province.replace("Frysl\xe2n","Friesland")}(t),function(t){t.usage=t.usage.replace("park and ride","P+R Parkeerplaats").replace("garage","Parkeergarage").replace("terrain","Parkeerterrein")}(t),t.id=+t.id,t.minimumHeightInMeters=+t.minimumHeightInMeters,t.latitude=+t.latitude,t.longitude=+t.longitude,t.capacity=+t.capacity,t};!function(){var n=localStorage.getItem(t);if(n){p(!0);try{Object(O.c)(";",u,O.b,e).then(i),localStorage.setItem(t,u)}catch(a){console.log("err",a)}}else Object(O.c)(";",n,O.b,e).then(i);p(!1)}()}),[u]),[{data:c,isLoading:j},d]});var m=function(t){var e=Object(r.useState)(x(t?t.current:null)),n=Object(l.a)(e,2),a=n[0],c=n[1],i=Object(r.useCallback)((function(){t.current&&c(x(t.current))}),[t]);return Object(r.useLayoutEffect)((function(){var e=t.current;if(e){if(i(),"function"===typeof ResizeObserver){var n=new ResizeObserver((function(){return i()}));return n.observe(e),function(){n&&(n.disconnect(),n=null)}}return window.addEventListener("resize",i),function(){window.removeEventListener("resize",i)}}}),[t,i]),a};function x(t){return t?t.getBoundingClientRect():{bottom:0,height:0,left:0,right:0,top:0,width:0}}var y=Object(r.createContext)(null),k=function(t){var e=t.size,n=t.children,c=t.className,i=e.width,o=e.height,s=Object(r.useRef)(null),u=Object(r.useState)(null),d=Object(l.a)(u,2),f=d[0],b=d[1];return Object(r.useEffect)((function(){return b(s.current)}),[e]),Object(a.jsx)("svg",{className:c,ref:s,viewBox:"0 0 ".concat(i," ").concat(o),width:i,height:o,children:Object(a.jsx)(y.Provider,{value:f,children:n})})};function w(){return Object(r.useContext)(y)}function S(){var t=Object(u.a)(["\n\theight: 100vh;\n\twidth: 100vw;\n\tbackground: ",";\n\tz-index: 4;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n"]);return S=function(){return t},t}function E(){var t=Object(u.a)(["\n\tanimation: rotate 2s linear infinite;\n\tmargin: -25px 0 0 -25px;\n\twidth: 50px;\n\theight: 50px;\n\n\t& .path {\n\t\tstroke: ",";\n\t\tstroke-linecap: round;\n\t\tanimation: dash 1.5s ease-in-out infinite;\n\t}\n\n\t@keyframes rotate {\n\t\t100% {\n\t\t\ttransform: rotate(360deg);\n\t\t}\n\t}\n\n\t@keyframes dash {\n\t\t0% {\n\t\t\tstroke-dasharray: 1, 150;\n\t\t\tstroke-dashoffset: 0;\n\t\t}\n\t\t50% {\n\t\t\tstroke-dasharray: 90, 150;\n\t\t\tstroke-dashoffset: -35;\n\t\t}\n\t\t100% {\n\t\t\tstroke-dasharray: 90, 150;\n\t\t\tstroke-dashoffset: -124;\n\t\t}\n\t}\n"]);return E=function(){return t},t}var F=function(){return Object(a.jsx)(P,{children:Object(a.jsxs)(L,{viewBox:"0 0 50 50",children:[Object(a.jsx)("circle",{className:"path",cx:"25",cy:"25",r:"20",fill:"none",strokeWidth:"4"}),Object(a.jsx)("circle",{className:"path",cx:"25",cy:"25",r:"20",fill:"none",strokeWidth:"4"}),Object(a.jsx)("circle",{className:"path",cx:"25",cy:"25",r:"20",fill:"none",strokeWidth:"4"})]})})},L=d.default.svg(E(),j.green),P=d.default.div(S(),j.primary);function z(){var t=Object(u.a)(["\n\t/* transition-duration: 100ms; */\n\t/* fill: ","; */\n\tfill-opacity: 1;\n\t/* stroke: ","; */\n\tstroke-width: 1;\n\t/* stroke-width: ","; */\n\t/* stroke: ","; */\n\t&:hover {\n\t\t/* stroke: ","; */\n\t}\n"]);return z=function(){return t},t}function A(){var t=Object(u.a)(["\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: stretch;\n\tjustify-content: center;\n\tpadding-top: ",";\n\tpadding-left: ",";\n\tpadding-right: ",";\n\tpadding-bottom: ",";\n\tmax-width: 100%;\n\theight: 100%;\n\n\t.map {\n\t\tcolor: red;\n\t}\n\t.legend {\n\t\tposition: absolute;\n\n\t\tbottom: 0;\n\t\tleft: 10px;\n\t}\n"]);return A=function(){return t},t}var N=d.default.div(A(),p(32),p(32),p(32),p(32)),R=(d.default.circle(z(),(function(t){return t.active,j.blue}),(function(t){return t.active?t.fill:j.blue}),(function(t){return t.active?1:3}),(function(t){return t.fill}),(function(t){return j.red})),n(63)),B=n.n(R),I=function(t){var e=t.colorScale,n=t.tickSpacing,c=void 0===n?25:n,i=t.tickSize,o=void 0===i?8:i,s=t.tickTextOffset,u=void 0===s?-25:s,d=(t.onHover,t.fadeOpacity),f=(t.LegendLabel,t.className,t.dimensions),b=t.sizeScale,j=t.dispatch,p=f.width,v=(f.height,w()),h=Object(r.useRef)(),g=Object(r.useState)(null),m=Object(l.a)(g,2),x=m[0],y=m[1];return Object(r.useEffect)((function(){if(v&&b){Object(O.t)(v);var t=Object(O.t)(h.current);t.append("text").text("Capaciteit Parkeergarage").attr("transform","translate(".concat(0,",80)")).attr("class","legend-label");var e=t.append("g").attr("fill","#444").attr("transform","translate(".concat(0,",140)")).attr("text-anchor","end").selectAll("g").data([100,1e3,2500]).join("g");e.append("circle").attr("fill","none").attr("stroke","#444").attr("cy",(function(t){return-b(t)})).attr("r",b),e.append("text").attr("y",(function(t){return-10-3*b(t)})).attr("x",u).attr("dy","1.3em").text(Object(O.d)(".0f")).attr("class","legend-text")}}),[v,h,b]),Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("g",{transform:"translate(".concat(p-20,", ",100,")"),textAnchor:"end",children:[Object(a.jsxs)("g",{className:"color-legend",children:[Object(a.jsx)("text",{x:0,y:-25,className:"legend-label",children:"Soort Parkeermogelijkheid"}),e.domain().map((function(t,n){return Object(a.jsxs)("g",{className:"tick",transform:"translate(0,".concat(n*c,")"),onMouseEnter:function(){var e=t;y(t),j({type:"FILTER_PARKING_USAGE",payload:{usage:e}})},onMouseOut:function(){y(null),j({type:"RESET"})},children:[Object(a.jsx)("text",{x:u,dy:".32em",children:t}),Object(a.jsx)("circle",{fill:e(t),r:o,opacity:x&&t!==x?d:1})]},n)}))]}),b&&Object(a.jsx)("g",{ref:h,className:"size-legend"})]})})},C=n(14),G=function(t){var e=t.children,n=t.path,c=t.activeProvinceFeature,i=t.setActiveProvinceFeature,o=w(),s=Object(r.useState)({x:0,y:0,k:1}),u=Object(l.a)(s,2),d=u[0],f=d.x,b=d.y,j=d.k,p=u[1];return Object(r.useEffect)((function(){if(o){var t=Object(O.t)(o),e=o.clientWidth,a=o.clientHeight,r=Object(O.u)().scaleExtent([1,10]).on("zoom",(function(t){var e=t.transform;p(e)})),s=Object(O.t)(c).node();if(c){var u=n.bounds(s),d=Object(l.a)(u,2),f=Object(l.a)(d[0],2),b=f[0],j=f[1],v=Object(l.a)(d[1],2),h=v[0],g=v[1];t.selectAll("path"),t.transition().duration(750).call(r.transform,O.v.translate(e/2,a/2).scale(Math.min(8,.9/Math.max((h-b)/e,(g-j)/a))).translate(-(b+h)/2,-(j+g)/2))}else i(null),t.transition().duration(750).call(r.transform,O.v,Object(O.w)(t).invert([e/2,a/2]));t.call(r)}}),[o,c]),Object(a.jsx)("g",{transform:"translate(".concat(f,", ").concat(b,") scale(").concat(j,")"),strokeWidth:1/j,children:e})};function M(){var t=Object(u.a)(["\n\ttransition-duration: 500ms;\n\t/* fill: ","; */\n\t/* fill-opacity: 1; */\n\t/* stroke: ","; */\n\t/* stroke-width: 0.5; */\n\t/* stroke-width: ","; */\n\t&:hover {\n\t\tstroke: ",";\n\t}\n"]);return M=function(){return t},t}function T(){var t=Object(u.a)(["\n\ttransition-duration: 700ms;\n\n\t:hover {\n\t\topacity: 0.7;\n\t}\n"]);return T=function(){return t},t}var _=function(t){var e=t.nld,n=t.activeProvinceFeature,c=t.activateProvince,i=t.setActiveProvinceFeature,o=t.dimensions,u=(e.gemeente,e.gemeenteBorder),d=e.province,f=e.provinceBorder,b=o.width,j=o.height,p=(w(),Object(r.useState)(d)),v=Object(l.a)(p,2),h=v[0],g=(v[1],Object(O.f)(h)),m=Object(O.e)(h),x=j+b/Object(O.g)(m[1],m[0])/Math.sqrt(2),y=Object(O.h)().scale(x).center(g).translate([b/2,j/2]),k=Object(O.i)().projection(y),S=function(){return Object(a.jsx)(a.Fragment,{children:Object(r.useMemo)((function(){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("g",{className:"gemeentes",children:Object(a.jsx)("path",{className:"gemeente-borders",d:k(u)})}),Object(a.jsxs)("g",{className:"provinces",children:[d.features.map((function(t){return Object(a.jsx)("path",{className:n===t?"province active":"province",d:k(t),onClick:function(){return c(t)},title:t.properties.statnaam},t.id)})),Object(a.jsx)("path",{className:"province-borders",d:k(f)})]})]})}),[k,d,f,u])})};return Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)(G,Object(s.a)(Object(s.a)({},e),{},{setActiveProvinceFeature:i,activeProvinceFeature:n,path:k,size:o,width:b,height:j,children:[t.nld&&Object(a.jsx)(S,{}),Object(a.jsx)(U,Object(s.a)(Object(s.a)({},t),{},{projection:y}))]}))})},U=(d.default.path(T()),function(t){var e=t.projection,n=t.sizeScale,c=t.colorScale,i=t.sizeValue,o=t.colorValue,u=t.allLocations,d=t.activeLocations,f=(Object(r.useRef)(),Object(r.useState)(!0)),b=Object(l.a)(f,2);b[0],b[1];return Object(a.jsx)("g",{className:"parking-locations",children:u.map((function(t){var l=e([t.longitude,t.latitude]);n(i(t)),c(o(t));return Object(r.createElement)(D,Object(s.a)(Object(s.a)({},t),{},{key:t.id,proj:l,r:t.capacitySizeScale,fill:t.color,value:t.usage,active:d&&d.includes(t)}),Object(a.jsxs)("title",{children:[" ",t.name]}))}))})}),D=function(t){t.value;var e=t.r,n=t.fill,r=(t.transform,t.active),c=t.proj;t.isShowing,t.opacity,Object(C.b)({config:{duration:100},opacity:r?1:.1,r:r?e:e/2}),Object(C.b)({opacity:r?1:.1,to:[{opacity:1,color:"#ffaaee",r:e},{opacity:0,color:"rgb(14,26,19)",r:1}],from:{opacity:0,color:"red",r:e}});return Object(a.jsx)(H,{fill:n,r:t.active&&t.active?e:e/2,opacity:t.active&&t.active?1:.3,transform:"translate(".concat(c,")")})},H=Object(d.default)(C.a.circle)(M(),(function(t){return t.active,j.blue}),(function(t){return t.active?j.red:j.blue}),(function(t){return t.active?1:3}),j.white),V=n(9),W=n.n(V),J=n(64),K=(function(){var t=Object(J.a)(W.a.mark((function t(e,n){return W.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e({t:1});case 2:case"end":return t.stop()}}),t)})))}(),function(t){var e=t.data,n=t.dimensions,c=t.colorScale,i=(t.onHover,t.nestedActiveLocations),o=n.width,s=n.height,l=w(),u=Object(r.useRef)(),d=m(u),f=Object(r.useRef)();return Object(r.useEffect)((function(){if(e&&n&&u&&d){return f.current=i,function(t){var e=Math.min(o,s)/10-1,n=Object(O.n)().padAngle(0).value((function(t){return t[1]})).sort(null),a=Object(O.a)().innerRadius(20).outerRadius(e),r=n(t),i=n(f.current),l=Object(O.t)(u.current).selectAll("g.arc").data(r);l.exit().remove();l.enter().append("g").attr("class","arc").append("path").merge(l.select("path.arc")).attr("class","arc").transition().attrTween("d",(function(t,e){var n=Object(O.k)(i[e],t);return function(t){return a(n(t))}})).style("fill",(function(t){return c(t.data[0])})).style("stroke","#ffffff").style("stroke-width",2)}(i)}}),[l,i,u,n]),Object(a.jsx)(a.Fragment,{children:Object(a.jsx)("g",{transform:"translate(".concat(o-10-d.width/2,", ").concat(s-10-d.width/2,")"),children:Object(a.jsx)("g",{ref:u,className:"arc"})})})}),q=function(t){var e=t.nld,n=(t.data,t.filteredData,t.hoveredUsage),c=(t.fadeOpacity,t.children),i=t.setHoveredUsage,o=t.colorRange,u=t.allLocations,d=(t.dispatch,e.gemeente,e.gemeenteBorder,e.province,e.provinceBorder,Object(r.useState)(null)),f=Object(l.a)(d,2),b=(f[0],f[1],Object(r.useState)(10)),j=Object(l.a)(b,2),p=j[0],v=(j[1],Object(r.useRef)()),h=m(v),g=Object(r.useState)(null),x=Object(l.a)(g,2),y=x[0],w=x[1],S=B()(),E=Object(l.a)(S,2),F=E[0],L=E[1],P=function(t){return t.capacity},z=function(t){return t.usage},A=Object(r.useMemo)((function(){return Object(O.r)().domain(u.map(z)).range(o)}),[u,z,o]),N=Object(r.useMemo)((function(){return Object(O.s)().domain([0,Object(O.m)(u,P)]).range([0,p])}),[u,P,p]);return Object(r.useEffect)((function(){}),[L]),Object(a.jsxs)("div",{className:"viz-wrapper",ref:v,children:[F,Object(a.jsxs)(k,{className:"map",size:h,children:[Object(a.jsx)(_,Object(s.a)(Object(s.a)({},t),{},{nld:e,colorScale:A,colorValue:z,activeProvinceFeature:y,activateProvince:function(e){var n=e.properties.statnaam;if(null===y&&y!==e)return w(e),void t.dispatch({type:"FILTER_ACTIVE_PROVINCE",payload:{province:n}});y===e&&(w(null),t.dispatch({type:"RESET"}))},hoveredUsage:n,fadeOpacity:.2,sizeScale:N,sizeValue:P,dimensions:h,setActiveProvinceFeature:w})),Object(a.jsx)(I,Object(s.a)(Object(s.a)({},t),{},{className:"legend",onHover:i,hoveredUsage:n,colorScale:A,colorValue:z,tickSpacing:22,tickSize:8,tickTextOffset:-18,fadeOpacity:.2,dimensions:h,sizeScale:N})),Object(a.jsx)(K,Object(s.a)(Object(s.a)({},t),{},{data:t.activeLocations,onHover:i,hoveredUsage:n,colorScale:A,colorValue:z,sizeValue:P,fadeOpacity:.2,setActiveProvinceFeature:w,activeProvinceFeature:y,setHoveredUsage:i,dimensions:h,sizeScale:N}))]}),c]})};function Q(){var t=Object(u.a)([""]);return Q=function(){return t},t}d.default.g(Q());var X=[j.darkBlue,j.darkGray,j.yellow],Y=function(t){return t.usage},Z=function(t){return t.capacity},$=function(t){var e=Object(O.m)(t,Z);console.log(e);var n=Object(O.r)().domain(t.map(Y)).range(X),a=Object(O.s)().domain([0,e]).range([0,10]);return t.map((function(t){return{id:t.id,name:t.name,province:t.province,usage:t.usage,city:t.city,latitude:t.latitude,longitude:t.longitude,capacity:t.capacity,minHeign:t.minimumHeightInMeters,active:!1,color:n(Y(t)),capacitySizeScale:a(Z(t))}}))},tt=function(t){return Object(O.p)(t,(function(t){return t.length}),(function(t){return t.usage}))},et=function(t,e){return t.province===e},nt=function(t,e){var n,a,r,c;switch(e.type){case"INITIAL_API_CALL":return Object(s.a)(Object(s.a)({},t),{},{allLocations:e.payload.data,activeLocations:e.payload.data,nestedActiveLocations:tt(e.payload.data)});case"FILTER_PARKING_USAGE":return c=e.payload.usage,n=t.allLocations.filter((function(t){return function(t,e){return t.usage===e}(t,c)})),"all"!==t.activeProvince&&(n=n.filter((function(e){return et(e,t.activeProvince)}))),Object(s.a)(Object(s.a)({},t),{},{activeLocations:n,activeUsage:c});case"FILTER_ACTIVE_PROVINCE":return n=null!==(r=e.payload.province)?t.allLocations.filter((function(t){return et(t,r)})):t.allLocations.filter((function(e){return et(e,t.activeUsage)})),a=tt(n),Object(s.a)(Object(s.a)({},t),{},{activeLocations:n,nestedActiveLocations:a,activeProvince:r});case"RESET":return Object(s.a)(Object(s.a)({},t),{},{activeLocations:t.allLocations,nestedActiveLocations:tt(t.allLocations),activeProvince:"all",activeUsage:"all",reset:!1});default:return t}},at={allLocations:[],activeLocations:[],nestedActiveLocations:[],activeUsage:"all",activeCity:[],activeProvince:"all",provinces:[],sizeScale:[],colorRange:[j.darkBlue,j.darkGray,j.yellow],reset:!1},rt=function(){var t=Object(r.useState)(),e=Object(l.a)(t,2),n=(e[0],e[1],Object(r.useState)(null)),c=Object(l.a)(n,2),i=(c[0],c[1],Object(r.useReducer)(nt,at)),o=Object(l.a)(i,2),u=o[0],d=o[1],f=g("https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/5f69fabb70e85ae64cf19633aadd38fcf26a75a4/parkeerData.csv",[]),b=Object(l.a)(f,1)[0],j=b.data,p=b.isLoading,m=Object(r.useRef)(),x=function(){var t=Object(r.useState)(null),e=Object(l.a)(t,2),n=e[0],a=e[1];return Object(r.useEffect)((function(){Object(O.l)("https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/1f4e17c5e2a072e12ed5b2dce628413294a13c5e/nl_2020.json").then((function(t){var e=t.objects,n=e.gemeente_2020,r=e.provincie_2020;a({gemeente:Object(h.a)(t,n),gemeenteBorder:Object(h.b)(t,n,(function(t,e){return t!==e})),province:Object(h.a)(t,r),provinceBorder:Object(h.b)(t,r,(function(t,e){return t!==e}))})}))}),[]),n}();!function(){var t=Object(r.useState)(null),e=Object(l.a)(t,2),n=e[0],a=e[1];Object(r.useEffect)((function(){Object(O.l)("https://unpkg.com/world-atlas@2.0.2/countries-10m.json").then((function(t){var e=t.objects,n=e.countries,r=e.land;a({land:Object(h.a)(t,r),countries:Object(h.b)(t,n,(function(t,e){return t!==e}))})}))}),[])}();return Object(r.useEffect)((function(){j.length&&d({type:"INITIAL_API_CALL",payload:{data:$(j)}})}),[j]),x&&u?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(N,{ref:m,children:p?Object(a.jsx)(F,{}):Object(a.jsx)(q,Object(s.a)(Object(s.a)({nld:x},u),{},{dispatch:d,children:Object(a.jsxs)("h1",{className:"title",children:["Parkeer plaatsen van Nederland"," "]})}))})}),Object(a.jsx)(v,{})]}):Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(F,{})})},ct=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,196)).then((function(e){var n=e.getCLS,a=e.getFID,r=e.getFCP,c=e.getLCP,i=e.getTTFB;n(t),a(t),r(t),c(t),i(t)}))};o.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(rt,{})}),document.getElementById("root")),ct()}},[[194,1,2]]]);
//# sourceMappingURL=main.fee4fb3d.chunk.js.map