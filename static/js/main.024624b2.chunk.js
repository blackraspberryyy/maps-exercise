(this["webpackJsonpmaps-exercises"]=this["webpackJsonpmaps-exercises"]||[]).push([[0],{149:function(e,t,n){"use strict";n.r(t);var a,c,r,s,i,o=n(0),l=n.n(o),d=n(4),u=n.n(d),j=(n(73),n(74),n(19)),p=n.n(j),b=n(28),O=n(8),h=n(10),f=n(33),g=n(11),m=n(7),v=n(2),x={lat:10.3005178,lng:123.8861904},y=g.a.div(a||(a=Object(h.a)(["\n  display: flex;\n  height: 100vh;\n"]))),w=g.a.div(c||(c=Object(h.a)(["\n  height: 100%;\n  width: 100%;\n"]))),C=g.a.div(r||(r=Object(h.a)(["\n  width: 500px;\n  background: white;\n"])));function S(e){var t=e.className,n=Object(o.useState)(null),a=Object(O.a)(n,2),c=a[0],r=a[1],s=Object(o.useState)([]),i=Object(O.a)(s,2),l=i[0],d=i[1],u=Object(o.useState)(!1),j=Object(O.a)(u,2),h=j[0],g=j[1],S=Object(o.useState)(),k=Object(O.a)(S,2),E=k[0],M=k[1],P=Object(o.useState)(),R=Object(O.a)(P,2),A=R[0],I=R[1],L=function(){var e=Object(b.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c&&c.maps&&E&&(t=c.maps,E.textSearch({query:"Restaurants in Cebu City",type:"restaurant"},(function(e,n){var a=[];n===t.places.PlacesServiceStatus.OK&&e.forEach((function(e){a.push({address:e.formatted_address,name:e.name,location:{lat:e.geometry.location.lat(),lng:e.geometry.location.lng()}})})),d(a)})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(o.useEffect)((function(){if(A&&c&&c.map&&c.maps){var e=c.map,t=c.maps;h?A.setMap(e):A.setMap(null),t.event.addListener(A,"overlaycomplete",(function(e){var n=e.overlay.getBounds();E.textSearch({query:"Restaurants in Cebu City",type:"restaurant",bounds:n},(function(e,n){var a=[];n===t.places.PlacesServiceStatus.OK&&e.forEach((function(e){a.push({address:e.formatted_address,name:e.name,location:{lat:e.geometry.location.lat(),lng:e.geometry.location.lng()}})})),d(a)}))}))}}),[h,c,null===c||void 0===c?void 0:c.map,null===c||void 0===c?void 0:c.maps,A,E]),Object(v.jsxs)(y,{className:t,children:[Object(v.jsx)(w,{children:Object(v.jsx)(f.a,{bootstrapURLKeys:{key:"AIzaSyCrWA0GMWAD5vVLl1z6fmwlNgQoTINGm34",libraries:["places","drawing"]},center:x,defaultZoom:14,onGoogleApiLoaded:function(e){return function(e){if(r(e),e&&e.map&&e.maps){var t=e.map,n=e.maps;M(new n.places.PlacesService(t)),I(new n.drawing.DrawingManager({drawingMode:n.drawing.OverlayType.CIRCLE,drawingControl:!0,drawingControlOptions:{position:n.ControlPosition.TOP_CENTER,drawingModes:[n.drawing.OverlayType.CIRCLE,n.drawing.OverlayType.RECTANGLE]}}))}}(e)},yesIWantToUseGoogleMapApiInternals:!0,children:l&&l.map((function(e,t){return Object(v.jsx)(T,{restaurant:e,lat:e.location.lat,lng:e.location.lng},"restaurant-"+t)}))})}),Object(v.jsx)(C,{children:Object(v.jsxs)(m.b,{children:[Object(v.jsx)(m.c,{onClick:L,children:"Show Restaurants in Cebu"}),Object(v.jsx)(m.c,{onClick:function(){g(!h)},children:"Draw Polygon"})]})})]})}var k=g.a.div(s||(s=Object(h.a)(["\n  width: 250px;\n  background: white;\n  border-radius: 3px;\n  padding: 8px;\n"]))),E=g.a.div(i||(i=Object(h.a)(["\n  display: flex;\n  align-items: stretch;\n  justify-content: stretch;\n"])));function T(e){var t=e.restaurant,n=Object(o.useState)(!1),a=Object(O.a)(n,2),c=a[0],r=a[1];return Object(v.jsx)("div",{onClick:function(e){e.stopPropagation()},children:Object(v.jsxs)(m.e,{children:[Object(v.jsx)(m.d,{open:c,onClose:function(){return r(!1)},children:Object(v.jsxs)(k,{children:[Object(v.jsxs)(E,{children:[Object(v.jsx)(m.f,{use:"headline6",children:t.name}),Object(v.jsx)("div",{style:{flex:1}}),Object(v.jsx)(m.a,{icon:"close",onClick:function(){return r(!1)}})]}),Object(v.jsx)("hr",{}),Object(v.jsx)(m.f,{use:"caption",style:{paddingTop:16},children:t.address})]})}),Object(v.jsx)(m.a,{icon:"place",style:{color:"#ea4335"},onClick:function(e){e.stopPropagation(),r(!c)}})]})})}function M(){return Object(v.jsx)(S,{})}var P=function(){return Object(v.jsx)("div",{className:"App",children:Object(v.jsx)(M,{})})};u.a.render(Object(v.jsx)(l.a.StrictMode,{children:Object(v.jsx)(P,{})}),document.getElementById("root"))},73:function(e,t,n){}},[[149,1,2]]]);
//# sourceMappingURL=main.024624b2.chunk.js.map