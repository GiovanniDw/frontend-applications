(this["webpackJsonpfrontend-applications"]=this["webpackJsonpfrontend-applications"]||[]).push([[0],{130:function(e,t,n){},131:function(e,t,n){},137:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n(0),i=n.n(r),o=n(40),a=n.n(o),u=(n(130),n(131),n(11)),s=n(7),l=n(41);function j(){var e=Object(u.a)(["\n    ",";\n.App {\n  background-color: ",";\n  width: 100%;\n  height: 100%;\n}\n    "]);return j=function(){return e},e}var b="#2F80ED",f="#2D9CDB",d="#F2F2F2",O=Object(s.createGlobalStyle)(j(),l.normalize,d),v=n(2),h=n(3),p=n(4),g=Object(r.createContext)(null),x=function(e){var t=e.children,n=e.width,i=e.height,o=Object(r.useRef)(null),a=Object(r.useState)(null),u=Object(v.a)(a,2),s=u[0],l=u[1];return Object(r.useEffect)((function(){return l(o.current)}),[]),Object(c.jsx)("svg",{ref:o,width:n,height:i,children:Object(c.jsx)(g.Provider,{value:s,children:t})})};var m=function(e){var t=e.children,n=e.activeProvince,i=Object(r.useContext)(g),o=Object(r.useState)({x:0,y:0,k:1}),a=Object(v.a)(o,2),u=a[0],s=u.x,l=u.y,j=u.k,b=a[1],f=function(e){b(e.transform)};if(n)Object(h.f)(n);return Object(r.useEffect)((function(){if(i){var e=Object(h.f)(i),t=Object(h.g)().scaleExtent([1,8]).on("zoom",f);return e.call(t),function(){return e.on(".zoom",null)}}}),[i]),Object(c.jsx)("g",{transform:"translate(".concat(s,", ").concat(l,") scale(").concat(j,")"),children:t})};function w(){var e=Object(u.a)(["\n\tfill: ",";\n\tfill-opacity: 1;\n\n\t&:hover {\n\t\tfill: ",";\n\t}\n"]);return w=function(){return e},e}var k=Object(h.b)().scale(6e3).center([5.55,52.2]),y=Object(h.c)(k),C=function(e){var t=e.d,n=e.isActive,r=e.onClick;return Object(c.jsx)("path",{className:n?"province active":"province",d:t,onClick:r})},P=s.default.circle(w(),f,b),S=function(e){var t=e.nld,n=t.gemeente,i=t.province,o=t.provinceBorder,a=e.penr.allPenR;console.log(a);var u=i.features,s=Object(r.useState)(null),l=Object(v.a)(s,2),j=l[0],b=l[1];return Object(c.jsx)(m,{activeProvince:j,children:Object(c.jsxs)("g",{className:"nld",children:[Object(c.jsx)("g",{id:"gemeentes",children:n.features.map((function(e){return Object(c.jsx)("path",{className:"gemeente-grens",d:y(e)},e.id)}))}),Object(c.jsx)("g",{id:"provinces",children:u.map((function(e){return Object(c.jsx)(C,{data:e,d:y(e),isActive:j===e,onClick:function(){return b(e)}},e.id)}))}),Object(c.jsx)("path",{id:"province-borders",d:y(o)}),a.map((function(e){var t=k([e.longitude,e.latitude]),n=Object(v.a)(t,2),r=n[0],i=n[1];return Object(c.jsx)(P,{cx:r,cy:i,r:1},e.id)}))]})})},E=function(){var e=function(){var e=Object(r.useState)(null),t=Object(v.a)(e,2),n=t[0],c=t[1];return Object(r.useEffect)((function(){Object(h.e)("https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/1f4e17c5e2a072e12ed5b2dce628413294a13c5e/nl_2020.json").then((function(e){var t=e.objects,n=t.gemeente_2020,r=t.provincie_2020;c({gemeente:Object(p.a)(e,n),province:Object(p.a)(e,r),provinceBorder:Object(p.b)(e,r,(function(e,t){return e!==t}))})}))}),[]),n}(),t=function(){var e=Object(r.useState)(null),t=Object(v.a)(e,2),n=t[0],c=t[1];return Object(r.useEffect)((function(){Object(h.a)("https://gist.githubusercontent.com/GiovanniDw/9ebe42d142f40e58e333e546a82f9b0d/raw/1f4e17c5e2a072e12ed5b2dce628413294a13c5e/OpenParkingPenR.csv").then((function(e){var t,n=Object(h.d)(e,(function(e){return e.province})),r=Object(h.d)(e,(function(e){return e.city}));c({byProvince:n,byCity:r,allPenR:(t=e,t.province=+t.province,t.latitude=+t.latitude,t.longitude=+t.longitude,t)})}))}),[]),n}(),n=function(){var e=Object(r.useState)(null),t=Object(v.a)(e,2),n=t[0],c=t[1];return Object(r.useEffect)((function(){Object(h.e)("https://unpkg.com/world-atlas@2.0.2/countries-10m.json").then((function(e){var t=e.objects,n=t.countries,r=t.land;c({land:Object(p.a)(e,r),countries:Object(p.b)(e,n,(function(e,t){return e!==t}))})}))}),[]),n}();return e&&t&&n?Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)(x,{width:"100%",height:"100%",children:Object(c.jsx)(S,{nld:e,penr:t,wrld:n})}),Object(c.jsx)(O,{})]}):Object(c.jsx)("pre",{children:"Loading..."})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,138)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),i(e),o(e)}))};a.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(E,{})}),document.getElementById("root")),F()}},[[137,1,2]]]);
//# sourceMappingURL=main.290e7830.chunk.js.map