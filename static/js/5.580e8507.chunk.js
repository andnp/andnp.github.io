(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{190:function(t,e,n){"use strict";var r,o=n(192),c=n(193),i=n(194),p=n.n(i),a=n(0),u=n(27),s=(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),f=c({highlight:function(t,e){if(e&&o.getLanguage(e))try{return o.highlight(e,t).value}catch(n){}return""}});f.use(p.a);var h=function(t){return f.render(t)},m=function(t){function e(e){var n=t.call(this,e)||this;return n.state={md:""},"raw"in e?n.state={md:h(e.raw)}:"remote"in e&&n.fetchRemote(e.remote),n}return s(e,t),e.prototype.componentDidUpdate=function(t){"raw"in t?this.setState({md:h(t.raw)}):"remote"in t&&this.fetchRemote(t.remote)},e.prototype.render=function(){var t=this.state.md;return a.createElement("div",{className:"markdown-body",style:{width:"100%"}},a.createElement("span",{dangerouslySetInnerHTML:{__html:t}}))},e.prototype.fetchRemote=function(t){var e=this;fetch(t).then(Object(u.a)("text")).then(h).then(function(t){return e.setState({md:t})})},e}(a.Component);e.a=m},495:function(t,e,n){"use strict";n.r(e);var r,o=n(0),c=(n(27),function(t,e){return"https://rawgit.com/"+t+"/"+e+"/master/README.md"}),i=n(190),p=(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return p(e,t),e.prototype.shouldComponentUpdate=function(t){return this.props.path!==t.path||this.props.user!==t.user},e.prototype.render=function(){var t=c("andnp",this.props.path);return o.createElement(i.a,{remote:t})},e}(o.Component);e.default=a}}]);
//# sourceMappingURL=5.580e8507.chunk.js.map