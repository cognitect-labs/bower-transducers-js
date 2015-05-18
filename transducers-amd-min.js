// transducers-js 0.4.169
// http://github.com/cognitect-labs/transducers-js
// 
// Copyright 2014-2015 Cognitect. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License..
;(function(){function c(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var d=Object.prototype.toString.call(a);if("[object Window]"==d)return"object";if("[object Array]"==d||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==d||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b};var f={e:function(a){return"string"==typeof a}};f.isArray="undefined"!=typeof Array.isArray?function(a){return Array.isArray(a)}:function(a){return"array"==c(a)};f.d=function(a){return"object"==c(a)};f.k=function(a){return a["@@iterator"]||a.next};f.slice=function(a,b,d){return null==d?Array.prototype.slice.call(a,b):Array.prototype.slice.call(a,b,d)};f.complement=function(a){return function(b){return!a.apply(null,f.slice(arguments,0))}};function g(a){this.a=a}
g.prototype["@@transducer/init"]=function(){throw Error("init not implemented");};g.prototype["@@transducer/result"]=function(a){return a};g.prototype["@@transducer/step"]=function(a,b){return this.a(a,b)};f.wrap=function(a){return"function"==typeof a?new g(a):a};function h(a){this["@@transducer/reduced"]=!0;this["@@transducer/value"]=a}f.reduced=function(a){return new h(a)};f.isReduced=function(a){return a instanceof h||a&&a["@@transducer/reduced"]};
f.ensureReduced=function(a){return f.isReduced(a)?a:f.reduced(a)};f.deref=function(a){return a["@@transducer/value"]};f.unreduced=function(a){return f.isReduced(a)?f.deref(a):a};f.j=function(a){return a};f.comp=function(a){var b=arguments.length;if(2==b){var d=arguments[0],e=arguments[1];return function(a){return d(e.apply(null,f.slice(arguments,0)))}}if(2<b)return f.reduce(f.comp,arguments[0],f.slice(arguments,1))};function k(a,b){this.b=a;this.a=b}k.prototype["@@transducer/init"]=function(){return this.a["@@transducer/init"]()};
k.prototype["@@transducer/result"]=function(a){return this.a["@@transducer/result"](a)};k.prototype["@@transducer/step"]=function(a,b){return this.a["@@transducer/step"](a,this.b(b))};f.map=function(a){return function(b){return new k(a,b)}};function l(a,b){this.b=a;this.a=b}l.prototype["@@transducer/init"]=function(){return this.a["@@transducer/init"]()};l.prototype["@@transducer/result"]=function(a){return this.a["@@transducer/result"](a)};
l.prototype["@@transducer/step"]=function(a,b){return this.b(b)?this.a["@@transducer/step"](a,b):a};f.filter=function(a){return function(b){return new l(a,b)}};f.remove=function(a){return f.filter(f.complement(a))};function m(a,b){this.b=a;this.a=b}m.prototype["@@transducer/init"]=function(){return this.a["@@transducer/init"]()};m.prototype["@@transducer/result"]=function(a){return this.a["@@transducer/result"](a)};
m.prototype["@@transducer/step"]=function(a,b){0<this.b?a=this.a["@@transducer/step"](a,b):a=f.ensureReduced(a);this.b--;return a};f.take=function(a){return function(b){return new m(a,b)}};function n(a,b){this.b=a;this.a=b}n.prototype["@@transducer/init"]=function(){return this.a["@@transducer/init"]()};n.prototype["@@transducer/result"]=function(a){return this.a["@@transducer/result"](a)};n.prototype["@@transducer/step"]=function(a,b){return this.b(b)?this.a["@@transducer/step"](a,b):f.reduced(a)};
f.takeWhile=function(a){return function(b){return new n(a,b)}};function p(a,b){this.b=-1;this.c=a;this.a=b}p.prototype["@@transducer/init"]=function(){return this.a["@@transducer/init"]()};p.prototype["@@transducer/result"]=function(a){return this.a["@@transducer/result"](a)};p.prototype["@@transducer/step"]=function(a,b){this.b++;return 0==this.b%this.c?this.a["@@transducer/step"](a,b):a};f.takeNth=function(a){return function(b){return new p(a,b)}};function q(a,b){this.b=a;this.a=b}
q.prototype["@@transducer/init"]=function(){return this.a["@@transducer/init"]()};q.prototype["@@transducer/result"]=function(a){return this.a["@@transducer/result"](a)};q.prototype["@@transducer/step"]=function(a,b){return 0<this.b?(this.b--,a):this.a["@@transducer/step"](a,b)};f.drop=function(a){return function(b){return new q(a,b)}};function r(a,b){this.drop=!0;this.b=a;this.a=b}r.prototype["@@transducer/init"]=function(){return this.a["@@transducer/init"]()};
r.prototype["@@transducer/result"]=function(a){return this.a["@@transducer/result"](a)};r.prototype["@@transducer/step"]=function(a,b){if(this.drop&&this.b(b))return a;this.drop&&(this.drop=!1);return this.a["@@transducer/step"](a,b)};f.dropWhile=function(a){return function(b){return new r(a,b)}};f.NONE={};function t(a,b){this.i=a;this.b=b;this.a=[];this.c=f.NONE}t.prototype["@@transducer/init"]=function(){return this.b["@@transducer/init"]()};
t.prototype["@@transducer/result"]=function(a){0<this.a.length&&(a=f.unreduced(this.b["@@transducer/step"](a,this.a)),this.a=[]);return this.b["@@transducer/result"](a)};t.prototype["@@transducer/step"]=function(a,b){var d=this.c,e=this.i(b);this.c=e;if(d==f.NONE||d==e)return this.a.push(b),a;d=this.b["@@transducer/step"](a,this.a);this.a=[];f.isReduced(d)||this.a.push(b);return d};f.partitionBy=function(a){return function(b){return new t(a,b)}};function u(a,b){this.c=a;this.b=b;this.a=[]}
u.prototype["@@transducer/init"]=function(){return this.b["@@transducer/init"]()};u.prototype["@@transducer/result"]=function(a){0<this.a.length&&(a=f.unreduced(this.b["@@transducer/step"](a,this.a)),this.a=[]);return this.b["@@transducer/result"](a)};u.prototype["@@transducer/step"]=function(a,b){this.a.push(b);if(this.c==this.a.length){var d=this.a;this.a=[];return this.b["@@transducer/step"](a,d)}return a};f.partitionAll=function(a){return function(b){return new u(a,b)}};
function v(a,b){this.b=a;this.a=b}v.prototype["@@transducer/init"]=function(){return this.a["@@transducer/init"]()};v.prototype["@@transducer/result"]=function(a){return this.a["@@transducer/result"](a)};v.prototype["@@transducer/step"]=function(a,b){return null==this.b(b)?a:this.a["@@transducer/step"](a,b)};f.keep=function(a){return function(b){return new v(a,b)}};function w(a,b){this.b=-1;this.c=a;this.a=b}w.prototype["@@transducer/init"]=function(){return this.a["@@transducer/init"]()};
w.prototype["@@transducer/result"]=function(a){return this.a["@@transducer/result"](a)};w.prototype["@@transducer/step"]=function(a,b){this.b++;return null==this.c(this.b,b)?a:this.a["@@transducer/step"](a,b)};f.keepIndexed=function(a){return function(b){return new w(a,b)}};
f.n=function(a){return{"@@transducer/init":function(){return a["@@transducer/init"]()},"@@transducer/result":function(a){return a},"@@transducer/step":function(b,d){var e=a["@@transducer/step"](b,d);return f.isReduced(e)?f.reduced(e):e}}};f.cat=function(a){var b=f.n(a);return{"@@transducer/init":function(){return a["@@transducer/init"]()},"@@transducer/result":function(b){return a["@@transducer/result"](b)},"@@transducer/step":function(a,e){return f.reduce(b,a,e)}}};
f.mapcat=function(a){return f.comp(f.map(a),f.cat)};f.p=function(a,b,d){for(var e=0;e<d.length;e++)if(b=a["@@transducer/step"](b,d.charAt(e)),f.isReduced(b)){b=f.deref(b);break}return a["@@transducer/result"](b)};f.h=function(a,b,d){for(var e=0;e<d.length;e++)if(b=a["@@transducer/step"](b,d[e]),f.isReduced(b)){b=f.deref(b);break}return a["@@transducer/result"](b)};f.m=function(a,b,d){for(var e in d)if(d.hasOwnProperty(e)&&(b=a["@@transducer/step"](b,[e,d[e]]),f.isReduced(b))){b=f.deref(b);break}return a["@@transducer/result"](b)};
f.l=function(a,b,d){d["@@iterator"]&&(d=d["@@iterator"]());for(var e=d.next();!e.done;){b=a["@@transducer/step"](b,e.value);if(f.isReduced(b)){b=f.deref(b);break}e=d.next()}return a["@@transducer/result"](b)};f.reduce=function(a,b,d){if(d){a="function"==typeof a?f.wrap(a):a;if(f.e(d))return f.p(a,b,d);if(f.isArray(d))return f.h(a,b,d);if(f.k(d))return f.l(a,b,d);if(f.d(d))return f.m(a,b,d);throw Error("Cannot reduce instance of "+d.constructor.name);}};
f.transduce=function(a,b,d,e){if(3==arguments.length){e=d;if("function"==typeof b)throw Error("If given only three arguments f must satisfy the ITransformer interface.");d=b["@@transducer/init"]()}b="function"==typeof b?f.wrap(b):b;a=a(b);return f.reduce(a,d,e)};f.o=function(a,b){return a+b};f.g=function(a,b){a.push(b);return a};f.f=function(a,b){a[b[0]]=b[1];return a};
f.into=function(a,b,d){if(f.e(a))return f.transduce(b,f.o,a,d);if(f.isArray(a))return f.transduce(b,f.g,a,d);if(f.d(a))return f.transduce(b,f.f,a,d)};function x(a,b){this.b=a;this.a=b}x.prototype["@@transducer/init"]=function(){return this.a["@@transducer/init"]()};x.prototype["@@transducer/result"]=function(a){return this.b(a)};x.prototype["@@transducer/step"]=function(a,b){return this.a["@@transducer/step"](a,b)};
f.completing=function(a,b){a="function"==typeof a?f.wrap(a):a;b=b||f.j;return new x(b,a)};f.toFn=function(a,b){"function"==typeof b&&(b=f.wrap(b));var d=a(b);return d["@@transducer/step"].bind(d)};f.first=f.wrap(function(a,b){return f.reduced(b)});f.q={};define("transducers",[],function(){return f});})();
