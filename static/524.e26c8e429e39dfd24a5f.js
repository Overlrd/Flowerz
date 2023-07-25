"use strict";(self.webpackChunkflowerz=self.webpackChunkflowerz||[]).push([[524],{416:(e,t,n)=>{n.r(t),n.d(t,{default:()=>R});var a=n(294);const l=n.p+"925aa8e685ab0217bb34.png";var r=n(379),i=n.n(r),A=n(795),c=n.n(A),s=n(569),o=n.n(s),m=n(565),d=n.n(m),g=n(216),u=n.n(g),h=n(589),E=n.n(h),p=n(51),f={};f.styleTagTransform=E(),f.setAttributes=d(),f.insert=o().bind(null,"head"),f.domAPI=c(),f.insertStyleElement=u(),i()(p.Z,f),p.Z&&p.Z.locals&&p.Z.locals;const w=()=>a.createElement("nav",null,a.createElement("ul",null,a.createElement("li",{className:"flowerz-nav-li"},a.createElement("h1",{className:"flowerz-nav-title"},"Flowerz"),a.createElement("span",{className:"flowerz-nav-icon"},"🌺"),a.createElement("span",{className:"flowerz-nav-text"},"Cause their names matter"))),a.createElement("ul",null,a.createElement("li",{className:"gh-flowerz-nav-li"},a.createElement("a",{href:"#"},a.createElement("img",{className:"flowerz-nav-gh",src:l,alt:"Github Icon"})))));var b=n(440),B={};B.styleTagTransform=E(),B.setAttributes=d(),B.insert=o().bind(null,"head"),B.domAPI=c(),B.insertStyleElement=u(),i()(b.Z,B),b.Z&&b.Z.locals&&b.Z.locals;const x=({onclick:e,handleSearchSubmit:t})=>a.createElement("article",{className:"mc-article container"},a.createElement("form",{onSubmit:t,method:"get"},a.createElement("input",{type:"search",placeholder:"Passioflora","aria-label":"Search"})),a.createElement("button",{onClick:e,className:"outline"},"Search with an image"));var v=n(483),y={};y.styleTagTransform=E(),y.setAttributes=d(),y.insert=o().bind(null,"head"),y.domAPI=c(),y.insertStyleElement=u(),i()(v.Z,y),v.Z&&v.Z.locals&&v.Z.locals;const Y=({image_url:e,small_image_url:t,wiki_description:n,tabular_data:l,flower_name:r})=>{const[i,A]=a.useState(!1),[c,s]=(0,a.useState)(!1);(0,a.useEffect)((()=>{const t=new Image;t.src=e,t.onload=()=>{s(!0)}}),[e]);const o=r.split("-"),m=o[0],d=o[1];return a.createElement(a.Fragment,null,a.createElement("article",null,a.createElement("header",null,a.createElement("div",null,l&&l.length?a.createElement("table",null,a.createElement("tbody",null,l.map(((e,t)=>a.createElement("tr",{key:t},a.createElement("th",{scope:"row"},e.label),a.createElement("td",null,e.value)))))):a.createElement("a",{href:"#","aria-busy":"true"},"Loading data, please wait...")),a.createElement("div",{className:"header-img-div"},a.createElement("div",{className:"skeleton",style:{maxWidth:"500px",maxHeight:"500px",width:"300px",height:"300px"}},c&&a.createElement("img",{id:"header-flower-img",src:e,alt:"Header Flower"})),c&&a.createElement("div",{id:"header-flower-title",className:""},m,d&&a.createElement("span",null,"(",d,")")))),a.createElement("details",{className:"right-text"},a.createElement("summary",{onClick:()=>{A(!i)},role:"link"},i?"Less":"More"),a.createElement("div",{className:"description-div"},a.createElement("div",{className:"img-small skeleton"},a.createElement("img",{src:t})),a.createElement("div",{className:"description-text-div"},n)),a.createElement("div",{className:"footer"},a.createElement("p",null,"Image and description from ",a.createElement("a",{href:""},"wikipedia"))))))};async function k(e,t){return fetch(`/predict/flower/${e}/${t}`).then((e=>e.json())).then((e=>e)).catch((e=>{console.error("Error: ",e)}))}var N=n(411),Z={};Z.styleTagTransform=E(),Z.setAttributes=d(),Z.insert=o().bind(null,"head"),Z.domAPI=c(),Z.insertStyleElement=u(),i()(N.Z,Z),N.Z&&N.Z.locals&&N.Z.locals;var S=n(610),_=(n(39),n(204),n(29));const C=()=>{const[e,t]=(0,a.useState)([]),[n,l]=(0,a.useState)(0),[r,i]=(0,a.useState)({});return(0,a.useEffect)((()=>{fetch("/search").then((e=>e.json())).then((e=>e)).catch((e=>{console.error("Error:",e)})).then((e=>t(e.data))).catch((e=>console.error(e)))}),[]),(0,a.useEffect)((()=>{console.log(e)}),[e]),(0,a.useEffect)((()=>{const t=e[n],a=t?.slug,l=localStorage.getItem(a);l?i(JSON.parse(l)):e.length>0&&n>=0&&n<e.length&&(e=>{k(e,"all").then((t=>{console.log("additional data",t),i(t),localStorage.setItem(e,JSON.stringify(t))})).catch((e=>console.error(e)))})(a)}),[n,e]),a.createElement(S.tq,{onSlideChange:e=>l(e.activeIndex),navigation:!0,modules:[_.W_],className:"mySwiper"},e.map(((e,t)=>a.createElement(S.o5,{key:t},console.log(r.data?.page_text??"Nothing here !"),a.createElement(Y,{flower_name:e.common_name+"-"+e.slug,image_url:e.image_url,small_image_url:r.data?.page_image,wiki_description:r.data?.page_text||"No description available",tabular_data:r.data?.infobox_data})))))},G=n.p+"a672616e7c1923a2ac73.png";var D=n(405),I={};I.styleTagTransform=E(),I.setAttributes=d(),I.insert=o().bind(null,"head"),I.domAPI=c(),I.insertStyleElement=u(),i()(D.Z,I),D.Z&&D.Z.locals&&D.Z.locals;const Q=({visible:e,onclose:t,oncancel:n,handleSubmit:l})=>a.createElement("dialog",{open:e},a.createElement("article",null,a.createElement("header",null,a.createElement("p",null,a.createElement("strong",null,"Upload images 🌸")),a.createElement("span",{onClick:t},a.createElement("img",{src:G,alt:"X"}))),a.createElement("main",{className:"im-main"},a.createElement("form",{encType:"multipart/form-data",onSubmit:l},a.createElement("input",{type:"file",name:"images",multiple:!0,accept:"image/*",required:!0,id:"id_images"}),a.createElement("input",{type:"submit",value:"Upload"}))),a.createElement("footer",null,a.createElement("a",{href:"https://www.flaticon.com/free-icons/close",title:"close icons"},"Close icons created by adrianadam - Flaticon")))),M=({visible:e,onSpanClose:t,flowerData:n})=>{const{first_class_name:l,img_urls:r,additionalData:i}=n,{data:A}=i||{},{infobox_data:c,page_text:s,page_image:o}=A||{};return a.createElement("dialog",{open:e},a.createElement(Y,{image_url:r[0],tabular_data:c||[],flower_name:l,wiki_description:s||"",small_image_url:o||""}),a.createElement("span",{onClick:t,className:"close"},a.createElement("img",{src:G,alt:"X"})))};var P=n(575),F={};F.styleTagTransform=E(),F.setAttributes=d(),F.insert=o().bind(null,"head"),F.domAPI=c(),F.insertStyleElement=u(),i()(P.Z,F),P.Z&&P.Z.locals&&P.Z.locals;const j=n.p+"37958a5c78d4c92fba91.png",z=({searchData:e,onClick:t,onSpanClose:n,visible:l})=>{const[r,i]=(0,a.useState)([]),A=e=>{i((t=>[...t,e]))};return a.createElement("dialog",{open:l},a.createElement("span",{onClick:n,className:"close"},a.createElement("img",{src:G,alt:"X"})),a.createElement("article",{className:"container",id:"result-grid"},e.data.map(((e,n)=>a.createElement("div",{onClick:t,className:"grid rslt_item",key:n},r.includes(n)?a.createElement("img",{className:"rslt_art_img",src:e.image_url,alt:`Item ${n+1}`,onLoad:()=>A(n)}):a.createElement("img",{className:"rslt_art_img",src:j,alt:`Placeholder for Item ${n+1}`,onLoad:()=>A(n)}),a.createElement("div",{className:"rslt_text"},a.createElement("div",null,a.createElement("span",null,"name:")," ",a.createElement("span",null,e.common_name)),a.createElement("div",null,a.createElement("span",null,"scientific name:")," ",a.createElement("span",null,e.scientific_name))),a.createElement("input",{type:"hidden","data-slug":e.slug,"data-name":e.common_name,"data-image-url":e.image_url}),"        ")))))},R=()=>{const[e,t]=a.useState(!1),[n,l]=a.useState(!1),[r,i]=a.useState(!1),[A,c]=a.useState(null),[s,o]=a.useState(null);return a.useEffect((()=>{console.log(A)}),[A]),a.useEffect((()=>{console.log(s)}),[s]),a.createElement(a.Fragment,null,a.createElement(w,null),a.createElement(x,{onclick:()=>{t(!0)},handleSearchSubmit:e=>function(e,t,n){e.preventDefault();const a=e.target.querySelector('input[type="search"]').value;fetch(`/search/query/${a}`).then((e=>e.json())).then((e=>{console.log(e),t(e),n(!0)})).catch((e=>{console.error("Error:",e)}))}(e,o,i)}),a.createElement(C,{handleImageClick:()=>{handleImageClick}}),a.createElement(Q,{visible:e,onclose:()=>{t(!1)},oncancel:()=>{t(!1)},handleSubmit:e=>((e,t,n,a)=>{e.preventDefault();const l=document.getElementById("csrf_token").value,r=new FormData(e.target);r.append("csrfmiddlewaretoken",l),function(e){return fetch("/predict/",{method:"POST",body:e}).then((e=>e.json())).then((e=>e)).catch((e=>{console.error("Error:",e)}))}(r).then((l=>{e.target.reset(),t(l),n(!1),a(!0),k(l.first_class_name.split("-")[1]||l.first_class_name.split("-")[0],"*").then((e=>{console.log(e),t((t=>({...t,additionalData:e})))}))}))})(e,c,t,l)}),A&&a.createElement(M,{visible:n,flowerData:A,onSpanClose:()=>{l(!1)}}),s&&a.createElement(z,{visible:r,onSpanClose:()=>{i(!1)},searchData:s,onClick:e=>function(e,t,n,a){const l=e.currentTarget.querySelector('input[type="hidden"]'),r=l.dataset.slug,i=l.dataset.name,A=l.dataset.imageUrl;k(r,"all").then((e=>{const l={first_class_name:i,img_urls:[A],additionalData:e};t(l),n(!1),a(!0),console.log(l)}))}(e,c,i,l)}))}},483:(e,t,n)=>{n.d(t,{Z:()=>A});var a=n(81),l=n.n(a),r=n(645),i=n.n(r)()(l());i.push([e.id,"article {\n    width: 70%;\n    margin: auto;\n    margin-top: 1rem;\n    font-family: 'Roboto', sans-serif;\n}\nheader {\n    display: flex;\n    justify-content: space-between;\n}\n\n#header-flower-title span {\n    font-style: italic;\n    text-decoration: underline;\n}\n\n#header-flower-img {\n    min-width: 300px;\n    max-width: 300px;\n    min-height: 300px;\n    max-height: 300px;\n}\nheader > div {\n    display: flex;\n    flex-direction: column;\n    text-align: center;\n    gap: 10px;\n    width: 45%;\n}\n\ndetails summary {\n    width: max-content;\n    float: right;\n    clear: right;\n\n}\n\n.description-div {\n    display: flex;\n    flex-direction: row;\n    text-align: left;\n\n}\n.img-small {\n    margin: 2rem 1rem 1rem 0;\n    display: block;\n    width: 30%;\n    height: 30%;\n  }\n  \n\n.footer {\n    text-align: right;\n    font-size: small;\n    font-style: oblique;\n\n}\n.description-text-div {\n    margin-top: 2rem;\n    width: 70%;\n    min-width: 300px;\n    min-height: 400px;\n}\n\n.close {\n    position: absolute;\n    right: 0;\n    top: 0;\n    margin: 5rem;\n}\n\n@media (max-width: 740px ) {\n    article {\n        width: 100%;\n    }\n    article > header {\n        flex-direction: column-reverse;\n        align-items: center;\n        justify-content: center;\n    }\n    .header-img-div {\n        align-items: center;\n        justify-content: center;\n    }\n    article header > div {\n        width: 100%;\n    }\n    .description-div {\n        flex-direction: column;\n        align-items: center;\n        text-align: left;\n    }\n    .img-small {\n        width: 100%;\n        margin: 2rem 0 0 3rem;\n        display: flex;\n    }\n    .description-text-div{\n        width: 100%;\n        margin: 1rem 0 0 3rem;\n\n    }\n}\n\n\n.skeleton {\n    animation: skeleton-loading 1s linear infinite alternate;\n  }\n  \n  @keyframes skeleton-loading {\n    0% {\n      background-color: hsl(200, 20%, 80%);\n    }\n    100% {\n      background-color: hsl(200, 20%, 95%);\n    }\n  }\n  \n  .skeleton-text {\n    width: 100%;\n    height: 0.7rem;\n    margin-bottom: 0.5rem;\n    border-radius: 0.25rem;\n  }\n  \n  .skeleton-text__body {\n    width: 75%;\n  }\n  \n  .skeleton-footer {\n    width: 30%;\n  }\n  ",""]);const A=i},575:(e,t,n)=>{n.d(t,{Z:()=>A});var a=n(81),l=n.n(a),r=n(645),i=n.n(r)()(l());i.push([e.id,"#result-grid {\n    display: grid;\n    row-gap: 30px;\n    column-gap: 20px;\n}\n\narticle {\n    padding: 2rem!important;\n}\n\n.rslt_item {\n    background-color: black;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n}\n\n.rslt_item:hover {\n    background-color: #222;\n}\n\n.rslt_text {\n    margin: 1rem;\n}\n.rslt_text div {\n    margin-bottom: 1rem;\n}\n\n.rslt_art_img {\n    width: 100%; \n    height: 200px; \n    display: block;\n    object-fit: cover; \n}",""]);const A=i},954:e=>{e.exports="data:application/font-woff;charset=utf-8;base64, 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"}}]);