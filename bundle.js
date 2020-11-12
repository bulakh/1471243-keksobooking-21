(()=>{"use strict";window.util={enterPressHandler:(e,t)=>{"Enter"===e.key&&t()},mouseClickHandler:(e,t)=>{1===e.which&&t()},escPressHandler:(e,t)=>{"Escape"===e.key&&(e.preventDefault(),t())}},window.backend={load(e,t){const o=new XMLHttpRequest;o.responseType="json",o.addEventListener("load",(()=>{200===o.status?e(o.response):t("Статус ответа: "+o.status+" "+o.statusText)})),o.addEventListener("error",(()=>{t("Произошла ошибка соединения")})),o.addEventListener("timeout",(()=>{t("Запрос не успел выполниться за "+o.timeout+" мс")})),o.timeout=1e4,o.open("GET","https://21.javascript.pages.academy/keksobooking/data"),o.send()},save(e,t,o){const n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(()=>{200===n.status?t(n.response):o("Статус ответа: "+n.status+" "+n.statusText)})),n.addEventListener("error",(()=>{o("Произошла ошибка соединения")})),n.addEventListener("timeout",(()=>{o("Запрос не успел выполниться за "+n.timeout+" мс")})),n.timeout=1e4,n.open("POST","https://21.javascript.pages.academy/keksobooking"),n.send(e)}},window.debounce={setDebounce:e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}}},(()=>{const e="any",t=document.querySelector(".map__filters"),o=t.querySelector("#housing-type"),n=t.querySelector("#housing-price"),r=t.querySelector("#housing-rooms"),a=t.querySelector("#housing-guests"),s=t.querySelector("#housing-features");window.filter={allOptions:t=>(e=>{const t=s.querySelectorAll(".map__checkbox");for(let o of t)o.checked&&(e=e.filter((e=>e.offer.features.includes(o.value))));return e})(t=(t=>t.filter((t=>a.value===e||t.offer.guests===parseInt(a.value,10))))(t=(t=>t.filter((t=>r.value===e||t.offer.rooms===parseInt(r.value,10))))(t=(t=>t.filter((t=>{switch(n.value){case e:return!0;case"low":return t.offer.price<1e4;case"middle":return t.offer.price>=1e4&&t.offer.price<5e4;case"high":return t.offer.price>=5e4}return!1})))(t=(t=>t.filter((t=>o.value===e||t.offer.type===o.value)))(t))))),map:t}})(),(()=>{const e={FLAT:"flat",BUNGALOW:"bungalow",HOUSE:"house",PALACE:"palace"},t={[e.FLAT]:"Квартира",[e.BUNGALOW]:"Бунгало",[e.HOUSE]:"Дом",[e.PALACE]:"Дворец"},o=window.util.escPressHandler,n=document.querySelector("#card").content.querySelector(".map__card"),r=document.querySelector(".map__filters-container"),a=()=>{const e=document.querySelector(".map__pin--active");e&&e.classList.remove("map__pin--active")};window.card={create:e=>{const s=n.cloneNode(!0),i=s.querySelector(".popup__title");e.offer.title?i.textContent=e.offer.title:i.remove();const d=s.querySelector(".popup__text--address");e.offer.address?d.textContent=e.offer.address:d.remove();const c=s.querySelector(".popup__text--price");e.offer.price?c.textContent=e.offer.price+" руб/ночь":c.remove();const l=s.querySelector(".popup__type");e.offer.type?l.textContent=t[e.offer.type]:l.remove();const u=s.querySelector(".popup__text--capacity");e.offer.rooms&&e.offer.guests?u.textContent=e.offer.rooms+" комнаты для "+e.offer.guests+" гостей":u.remove();const p=s.querySelector(".popup__text--time");e.offer.checkin&&e.offer.checkout?p.textContent="Заезд после: "+e.offer.checkin+", выезд до "+e.offer.checkout:p.remove();const m=s.querySelector(".popup__features");e.offer.features.length?((e,t)=>{const o=document.createDocumentFragment();t.innerHTML="",e.forEach((e=>{const t=document.createElement("li"),n="popup__feature--"+e;t.textContent=e,t.classList.add("popup__feature",n),o.appendChild(t)})),t.appendChild(o)})(e.offer.features,m):m.remove();const v=s.querySelector(".popup__photos");e.offer.photos.length?((e,t)=>{const o=document.createDocumentFragment();t.innerHTML="",e.forEach((e=>{const t=document.createElement("img");t.alt="Фотография жилья",t.src=e,t.style.width=45,t.style.height=40,t.classList.add("popup__photo"),o.appendChild(t)})),t.appendChild(o)})(e.offer.photos,v):v.remove();const f=s.querySelector(".popup__description");e.offer.description?f.textContent=e.offer.description:f.remove();const w=s.querySelector(".popup__avatar");e.author.avatar?w.src=e.author.avatar:w.remove(),e.location.x&&e.location.y?s.style="left: "+e.location.x+"px; top: "+e.location.y+"px;":s.style="left: 0px; top: 0px;",r.insertAdjacentElement("beforebegin",s);const y=e=>{o(e,h)},h=()=>{a(),s.remove(),document.removeEventListener("keydown",y),_.removeEventListener("click",L)},L=()=>{h()},_=document.querySelector(".popup__close");return _.addEventListener("click",L),document.addEventListener("keydown",y),s},deactivatePin:a,removeCards:()=>{const e=document.querySelectorAll(".popup");for(let t of e)t.remove()},HouseType:e}})(),(()=>{const e={WIDTH:65,HEIGHT:65},t=window.debounce.setDebounce,o=window.card.create,n=window.card.deactivatePin,r=window.card.removeCards,a=window.filter.map,s=window.filter.allOptions,i=document.querySelector(".map"),d=document.querySelector("#pin").content.querySelector(".map__pin"),c=i.querySelector(".map__pins"),l=t=>{const o=d.cloneNode(!0),n=o.querySelector("img");n.src=t.author.avatar,n.alt=t.offer.title;const r=t.location.x-Math.round(e.WIDTH/2),a=t.location.y-e.HEIGHT;return o.style="left: "+r+"px; top: "+a+"px;",o.dataset.id=t.offer.address,o};let u=[];const p=e=>{let t;if(e.target.matches(".map__pin:not(.map__pin--active):not(.map__pin--main)"))t=e.target;else{if(!e.target.parentElement.matches(".map__pin:not(.map__pin--active):not(.map__pin--main)"))return;t=e.target.parentElement}n(),t.classList.add("map__pin--active"),r();let a=t.dataset.id;o(u.find((e=>a===e.offer.address)))},m=e=>{const t=document.createDocumentFragment();let o=5<e.length?5:e.length;for(let n=0;n<o;n++)t.appendChild(l(e[n]));c.appendChild(t)},v=()=>{const e=i.querySelectorAll(".map__pin:not(.map__pin--main)");for(let t of e)t.remove()},f=()=>{const e=s(u);r(),v(),m(e)};window.pin={Size:e,userMap:i,removePins:v,successLoadHandler:e=>{u=e,m(u),a.addEventListener("change",t(f))},activatePins:()=>{c.addEventListener("click",p)},deactivatePins:()=>{c.removeEventListener("click",p),a.removeEventListener("change",t(f))}}})(),(()=>{const e=window.util.escPressHandler,t=document.querySelector("main"),o=document.querySelector("#success").content,n=document.querySelector("#error").content,r=()=>{t.querySelector(".success").remove(),document.removeEventListener("keydown",a),document.removeEventListener("click",r)},a=t=>{e(t,r)},s=()=>{t.querySelector(".error").remove(),document.removeEventListener("keydown",i),document.removeEventListener("click",s)},i=t=>{e(t,s)};window.modals={showErrorSend:()=>{const e=n.cloneNode(!0);e.querySelector(".error").addEventListener("click",s),document.addEventListener("keydown",i),t.appendChild(e)},showSuccessSend:()=>{const e=o.cloneNode(!0);e.querySelector(".success").addEventListener("click",r),document.addEventListener("keydown",a),t.appendChild(e)},errorLoadHandler:e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)}}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".ad-form"),o=t.querySelector(".ad-form-header__input"),n=t.querySelector(".ad-form-header__avatar"),r=t.querySelector(".ad-form__input"),a=t.querySelector(".ad-form__photo-preview"),s=(t,o)=>{const n=t.files[0],r=n.name.toLowerCase();if(e.some((e=>r.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{o.src=e.result,o.matches(".hidden")&&o.classList.remove("hidden")})),e.readAsDataURL(n)}},i=()=>{s(o,n)},d=()=>{s(r,a)};window.upload={adForm:t,resetPreviewInputs:()=>{r.removeEventListener("change",d),o.removeEventListener("change",i),n.src="img/muffin-grey.svg",a.src="#",a.classList.add("hidden")},activatePreviewInputs:()=>{r.addEventListener("change",d),o.addEventListener("change",i)}}})(),(()=>{const e=window.pin.Size,t=window.upload.adForm,o=document.querySelector(".map__pin--main"),n=t.querySelector("#address"),r=Math.floor(e.WIDTH/2),a=Math.floor(e.HEIGHT/2),s=570+r,i=375+a,d=()=>{let t=parseInt(o.style.left,10)+r,a=parseInt(o.style.top,10)+e.HEIGHT+22;n.value=t+", "+a},c=e=>{e.preventDefault();let t={x:e.clientX,y:e.clientY},n=!1;const r=e=>{e.preventDefault(),n=!0;const r=t.x-e.clientX,s=t.y-e.clientY;t={x:e.clientX,y:e.clientY};const i=o.offsetLeft-r,c=o.offsetTop-s;i>=-32&&i<=1168&&(o.style.left=i+"px"),c>=75-a&&c<=543&&(o.style.top=c+"px"),d()},s=e=>{if(e.preventDefault(),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",s),n){const e=t=>{t.preventDefault(),o.removeEventListener("click",e)};o.addEventListener("click",e)}};document.addEventListener("mousemove",r),document.addEventListener("mouseup",s)};window.move={mainPin:o,activatePin:()=>{o.addEventListener("mousedown",c),d()},deactivatePin:()=>{n.placeholder=s+", "+i,o.removeEventListener("mousedown",c),o.style.left="570px",o.style.top="375px"}}})(),(()=>{const e=1e3,t="1",o="2",n="3",r="0",a=window.card.HouseType,s=window.upload.adForm,i=s.querySelector("#room_number"),d=s.querySelector("#capacity"),c=s.querySelector("#type"),l=s.querySelector("#price"),u=s.querySelector("#timein"),p=s.querySelector("#timeout"),m=()=>{i.value===t?(d.value=parseInt(t,10),d.options[1].setAttribute("disabled","disabled")):i.value===o?(d.value=parseInt(o,10),d.options[0].setAttribute("disabled","disabled"),d.options[3].setAttribute("disabled","disabled"),d.options[2].removeAttribute("disabled","disabled"),d.options[1].removeAttribute("disabled","disabled")):i.value===n?(d.value=parseInt(n,10),d.options[3].setAttribute("disabled","disabled"),d.options[1].removeAttribute("disabled","disabled"),d.options[2].removeAttribute("disabled","disabled"),d.options[0].removeAttribute("disabled","disabled")):(d.value=parseInt(r,10),d.options[0].setAttribute("disabled","disabled"),d.options[2].setAttribute("disabled","disabled"),d.options[1].setAttribute("disabled","disabled"),d.options[3].setAttribute("disabled","disabled"))},v=()=>{c.value===a.BUNGALOW?(l.min=0,l.placeholder=0):c.value===a.FLAT?(l.min=e,l.placeholder=e):c.value===a.HOUSE?(l.min=5e3,l.placeholder=5e3):c.value===a.PALACE&&(l.min=1e4,l.placeholder=1e4)},f=()=>{p.value=u.value},w=()=>{u.value=p.value};window.form={activateValidation:()=>{i.addEventListener("change",m),c.addEventListener("change",v),u.addEventListener("change",f),p.addEventListener("change",w)},deactivateValidation:()=>{i.removeEventListener("change",m),c.removeEventListener("change",v),u.removeEventListener("change",f),p.removeEventListener("change",w),d.options[0].setAttribute("disabled","disabled"),d.options[1].setAttribute("disabled","disabled"),l.placeholder=e,s.reset()}}})(),(()=>{const e=window.util.enterPressHandler,t=window.util.mouseClickHandler,o=window.backend.load,n=window.backend.save,r=window.filter.map,a=window.card.removeCards,s=window.pin.userMap,i=window.pin.removePins,d=window.pin.activatePins,c=window.pin.deactivatePins,l=window.modals.showErrorSend,u=window.modals.showSuccessSend,p=window.modals.errorLoadHandler,m=window.upload.resetPreviewInputs,v=window.upload.activatePreviewInputs,f=window.upload.adForm,w=window.move.mainPin,y=window.move.activatePin,h=window.move.deactivatePin,L=window.form.activateValidation,_=window.form.deactivateValidation,E=f.querySelectorAll("fieldset"),b=document.querySelector(".map__filters"),S=b.querySelectorAll(".map__filter"),g=f.querySelector(".ad-form__reset"),q=e=>{for(let t of e)t.setAttribute("disabled","disabled")},k=e=>{for(let t of e)t.removeAttribute("disabled","disabled")},A=t=>{e(t,I)},x=e=>{t(e,I)},H=()=>{u(),T()},P=()=>{l(),T()},C=e=>{n(new FormData(f),H,P),e.preventDefault()},T=()=>{s.classList.add("map--faded"),f.classList.add("ad-form--disabled"),i(),a(),q(E),q(S),r.reset(),w.addEventListener("keydown",A),w.addEventListener("mousedown",x),f.removeEventListener("submit",C),c(),h(),_(),m(),g.removeEventListener("click",T)};T();const I=()=>{s.classList.remove("map--faded"),f.classList.remove("ad-form--disabled"),k(E),o((e=>{window.pin.successLoadHandler(e),e.length&&(k(S),b.classList.remove("hidden"))}),p),w.removeEventListener("keydown",A),w.removeEventListener("mousedown",x),f.addEventListener("submit",C),d(),v(),y(),L(),g.addEventListener("click",T)}})()})();