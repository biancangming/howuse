import{$ as l,a2 as k,o as p,d as g,au as m,av as f,g as _,v as o,s as e,c as r,ar as v,x as F,ax as b,r as C,I as c,aw as E,aE as h,b as q,A as y,Z as x,h as w,bu as B,S as A,e as D}from"./index.20ecd292.js";import"./ClickOutSide.vue_vue_type_style_index_0_scoped_edbeaf5e_lang.4a88cdb0.js";const $={key:0},M=l({props:{to:{type:[String,null,void 0],default:"body"},isBg:{type:Boolean,default:!0},position:{type:String,default:"center"},visible:{default:!1,type:Boolean},isClickMaskClose:{default:!0,type:Boolean}},emits:["after-close","update:visible"],setup(t,{emit:a}){const s=t,n=k(()=>s.isBg?"#00000073":"#00000000"),i=k(()=>s.position==="center"?"flex-center":s.position==="left"?"flex-left":s.position==="right"?"flex-right":s.position==="top"?"flex-top":s.position==="bottom"?"flex-bottom":"");function u(){!s.isClickMaskClose||(a("after-close",!1),a("update:visible",!1))}return(d,R)=>(p(),g(h,{to:s.to},[m(_("div",{style:C({"background-color":c(n)}),class:E(["mask-wrapper",c(i)]),onClick:u},[o(b,{name:"custom-classes","enter-active-class":"animate__animated animate__faster animate__zoomIn","leave-active-class":"animate__animated animate__faster animate__zoomOut"},{default:e(()=>[t.visible?(p(),r("div",$,[v(d.$slots,"default",{},void 0,!0)])):F("",!0)]),_:3})],6),[[f,t.visible]])],8,["to"]))}}),I=q(M,[["__scopeId","data-v-626a9210"]]),S=w("\u6253\u5F00\u906E\u677F"),z=_("div",{style:{width:"500px",height:"300px",backgroundColor:"#FFF"}},"\u6211\u662F\u7EC4\u4EF6",-1),H=l({setup(t){const a=y(!1);return(s,n)=>{const i=B;return p(),r(x,null,[o(i,{onClick:n[0]||(n[0]=u=>a.value=!0)},{default:e(()=>[S]),_:1}),o(c(I),{position:"center",visible:a.value,"onUpdate:visible":n[1]||(n[1]=u=>a.value=u)},{default:e(()=>[z]),_:1},8,["visible"])],64)}}}),O={class:"markdown-body"},Z=A(`<pre class="language-vue"><code class="language-vue"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\r
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a-button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>visible = true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u6253\u5F00\u906E\u677F<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a-button</span><span class="token punctuation">&gt;</span></span>\r
  <span class="token comment">&lt;!-- prop \u9884\u7559\u591A\u4E2A\u914D\u7F6E\uFF0Cto \u6302\u8F7D\u70B9\u3001isBg \u662F\u5426\u663E\u793A\u8499\u7248\u80CC\u666F\u8272\u3001position\u4F4D\u7F6Etop\u3001bottom\u3001left\u3001right\u3001center \u548C \u7A7A\u5B57\u7B26\u4E32\uFF0C\u9ED8\u8BA4\u662F\u5C45\u4E2D\r
  isClickMaskClose \u8868\u793A\u662F\u5426\u70B9\u51FB\u8499\u7248\u5173\u95ED\r
  @after-close \u662F\u5173\u95ED\u4E4B\u540E\u7684\u56DE\u8C03\u4E8B\u4EF6 --&gt;</span>\r
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>how-mask</span> <span class="token attr-name">position</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>center<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">v-model:</span>visible</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>visible<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\r
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span><span class="token property">height</span><span class="token punctuation">:</span>300px<span class="token punctuation">;</span><span class="token property">backgroundColor</span><span class="token punctuation">:</span>#FFF</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>\u6211\u662F\u7EC4\u4EF6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\r
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>how-mask</span><span class="token punctuation">&gt;</span></span>\r
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\r
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\r
<span class="token keyword">import</span> <span class="token punctuation">{</span> HowMask <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;howuse/vueComponent&quot;</span>\r
<span class="token keyword">const</span> visible <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>\r
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\r
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>less<span class="token punctuation">&quot;</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">\r
\r
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span></code></pre>`,1),j=[Z],K=l({setup(t,{expose:a}){return a({frontmatter:{},excerpt:void 0}),(s,n)=>(p(),r("div",O,j))}}),W=l({setup(t){return(a,s)=>{const n=D;return p(),g(n,{title:"\u8499\u7248\uFF0C\u6253\u5F00\u540E\u53EF\u6309\u7A7A\u767D\u533A\u57DF\u5173\u95ED"},{code:e(()=>[o(c(K))]),default:e(()=>[o(H)]),_:1})}}});export{W as default};
//# sourceMappingURL=Mask.727c80bb.js.map