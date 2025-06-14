(() => {
  var __create = Object.create;
  var __getProtoOf = Object.getPrototypeOf;
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __toESM = (mod, isNodeMode, target) => {
    target = mod != null ? __create(__getProtoOf(mod)) : {};
    const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
    for (let key of __getOwnPropNames(mod))
      if (!__hasOwnProp.call(to, key))
        __defProp(to, key, {
          get: () => mod[key],
          enumerable: true
        });
    return to;
  };
  var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

  // node_modules/slugify/slugify.js
  var require_slugify = __commonJS((exports, module) => {
    (function(name, root, factory) {
      if (typeof exports === "object") {
        module.exports = factory();
        module.exports["default"] = factory();
      } else if (typeof define === "function" && define.amd) {
        define(factory);
      } else {
        root[name] = factory();
      }
    })("slugify", exports, function() {
      var charMap = JSON.parse('{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E\'","Ը":"Y\'","Թ":"T\'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C\'","Կ":"K","Հ":"H","Ձ":"D\'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R\'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P\'","Ք":"Q\'","Օ":"O\'\'","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"\'","’":"\'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}');
      var locales = JSON.parse('{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}');
      function replace(string, options) {
        if (typeof string !== "string") {
          throw new Error("slugify: string argument expected");
        }
        options = typeof options === "string" ? { replacement: options } : options || {};
        var locale = locales[options.locale] || {};
        var replacement = options.replacement === undefined ? "-" : options.replacement;
        var trim = options.trim === undefined ? true : options.trim;
        var slug = string.normalize().split("").reduce(function(result, ch) {
          var appendChar = locale[ch];
          if (appendChar === undefined)
            appendChar = charMap[ch];
          if (appendChar === undefined)
            appendChar = ch;
          if (appendChar === replacement)
            appendChar = " ";
          return result + appendChar.replace(options.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, "");
        }, "");
        if (options.strict) {
          slug = slug.replace(/[^A-Za-z0-9\s]/g, "");
        }
        if (trim) {
          slug = slug.trim();
        }
        slug = slug.replace(/\s+/g, replacement);
        if (options.lower) {
          slug = slug.toLowerCase();
        }
        return slug;
      }
      replace.extend = function(customMap) {
        Object.assign(charMap, customMap);
      };
      return replace;
    });
  });

  // src/frame.ts
  function generateDetailsObject(iframe) {
    const rootFrame = iframe;
    const rootWindow = iframe.contentWindow;
    const menuFrame = rootWindow.document.querySelector(`frame[name="menu"]`);
    const menuWindow = menuFrame?.contentWindow;
    const contentFrame = rootWindow.document.querySelector(`frame[name="body"]`);
    const contentWindow = contentFrame?.contentWindow;
    return {
      rootFrame,
      rootWindow,
      menuFrame,
      menuWindow,
      contentFrame,
      contentWindow
    };
  }

  // src/lib/createDeepProxy.ts
  var proxyCache = new WeakMap;
  function createDeepProxy(target, onSet) {
    if (proxyCache.has(target)) {
      return proxyCache.get(target);
    }
    const handler = {
      get(target2, property, receiver) {
        const value = Reflect.get(target2, property, receiver);
        if (value && typeof value === "object") {
          return createDeepProxy(value, onSet);
        }
        return value;
      },
      set(target2, property, value, receiver) {
        const proxiedValue = value && typeof value === "object" ? createDeepProxy(value, onSet) : value;
        const result = Reflect.set(target2, property, proxiedValue, receiver);
        onSet();
        return result;
      },
      deleteProperty(target2, property) {
        const result = Reflect.deleteProperty(target2, property);
        onSet();
        return result;
      }
    };
    const proxy = new Proxy(target, handler);
    proxyCache.set(target, proxy);
    return proxy;
  }

  // src/lib/EventEmitter.ts
  class EventEmitter {
    events;
    constructor() {
      this.events = {};
    }
    on(event, listener) {
      if (!this.events[event])
        this.events[event] = [];
      this.events[event].push(listener);
      return () => this.off(event, listener);
    }
    off(event, listener) {
      if (!this.events[event])
        return;
      const idx = this.events[event].indexOf(listener);
      if (idx > -1)
        this.events[event].splice(idx, 1);
    }
    emit(event, ...args) {
      console.log(event, args);
      if (!this.events[event])
        return;
      this.events[event].forEach((listener) => listener.apply(this, args));
    }
    once(event, listener) {
      const remove = this.on(event, (...args) => {
        remove();
        listener.apply(this, args);
      });
    }
    addEventListener(event, listener) {
      return this.on(event, listener);
    }
    removeEventListener(event, listener) {
      return this.off(event, listener);
    }
    dispatchEvent(event, ...args) {
      return this.emit(event, ...args);
    }
  }

  // src/menu.ts
  var import_slugify = __toESM(require_slugify());
  var menuCategoryTemplate = (category, options) => options.oldMenu ? `
			<a name="cat${category.id}"></a>
			<div class="tableborder">
				<div class="cattitle">${category.title}</div>
				<div class="plain">
					${category.links.map((link) => `<img src="/html/sys-img/item.gif" border="0" alt="" valign="absmiddle">&nbsp;<a href="${link.href}" target="body" style="text-decoration:none">${link.title}</a><br>`).join("")}
				</div>
			</div><br>` : `
			<a name="cat${category.id}"></a>
			<div class="tableborder">
				<div class="cattitle">
					<a href="#cat${category.id}" onclick="change(this)"><div class="cat-collapse"></div>
						${category.title}
					</a>
				</div>
				<div class="plain" style="display: none;">
					${category.links.map((link) => `<img src="/html/sys-img/item.gif" border="0" alt="" valign="absmiddle">&nbsp;<a href="${link.href}" target="body" style="${Object.entries({
    "text-decoration": "none",
    "font-weight": link.bold ? "bold" : "normal"
  }).map(([key, value]) => `${key}: ${value};`).join("")}">${link.title}</a><br>`).join("")}
				</div>
				<div class="plain">${category.description}</div>
			</div><br>`;
  function renderMenu(iframe) {
    const details = generateDetailsObject(iframe);
    const doc = details.menuWindow.document;
    const oldMenu = new URL(details.menuWindow.location.href).searchParams.get("expandold") === "1";
    Array.from(doc.body.childNodes).reduce((acc, node) => {
      if (acc)
        doc.body.removeChild(node);
      else if (node.nodeName === "BR")
        acc = true;
      return acc;
    }, false);
    window.AMF.menu.map((category) => {
      const categoryWithId = {
        ...category,
        id: category.id ?? import_slugify.default(category.title, { lower: true, strict: true })
      };
      return menuCategoryTemplate(categoryWithId, { oldMenu });
    }).forEach((category) => {
      const newCategory = doc.createElement("div");
      newCategory.innerHTML = category;
      doc.body.appendChild(newCategory);
    });
  }
  function parseMenu(iframe) {
    const details = generateDetailsObject(iframe);
    return Array.from(details.menuWindow.document.querySelectorAll(`.tableborder:has(.cattitle a[onclick="change(this)"])`)).map((categoryElement) => {
      const categoryToggle = categoryElement.querySelector(".cattitle a");
      const id = categoryToggle.href.split("#cat")[1];
      const title = categoryToggle.textContent?.trim() ?? "";
      const [linksElement, descriptionElement] = categoryElement.querySelectorAll(".plain");
      const description = descriptionElement?.textContent?.trim() ?? "";
      return {
        id,
        title,
        description,
        links: Array.from(linksElement?.querySelectorAll("a[href]") || []).map((a) => ({
          title: a.textContent?.trim() ?? "",
          href: a.href,
          bold: a.childNodes[0]?.nodeName === "B"
        }))
      };
    });
  }

  // src/amf.ts
  var import_slugify2 = __toESM(require_slugify());
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.addEventListener("load", () => {
        script.remove();
        resolve(undefined);
      });
      script.addEventListener("error", () => {
        script.remove();
        reject(new Error(`Failed to load script ${url}`));
      });
      script.src = url;
      script.async = true;
      document.head.appendChild(script);
    });
  }
  async function preloadScript(url) {
    try {
      const response = await fetch(url);
      const text = await response.text();
      const encoded = encodeURIComponent(text);
      return [`data:text/javascript;charset=utf-8,${encoded}`, url];
    } catch (error) {
      return [null, url];
    }
  }
  function initializeAmf() {
    const AMF = new EventEmitter;
    AMF.menu = [];
    const plugins = [];
    AMF.plugin = (name, plugin) => {
      if (!plugin)
        plugin = name;
      if (typeof plugin === "string") {
        plugins.push({
          name,
          init: () => preloadScript(plugin),
          run: ([preloadedUrl, url]) => preloadedUrl ? loadScript(preloadedUrl).catch(() => loadScript(url)) : loadScript(url)
        });
      } else if (typeof plugin === "function") {
        plugins.push({ name, run: plugin });
      } else if (typeof plugin === "object") {
        plugins.push({ name, ...plugin, initPromise: plugin.init?.() });
      }
    };
    const runPlugins = async () => {
      for (const plugin of plugins)
        try {
          await plugin.run(await plugin.initPromise);
        } catch (error) {
          console.error(`Error running plugin "${plugin.name}"`, error);
        }
    };
    AMF.openAcp = async () => {
      await runPlugins();
      const url = new URL(location.href);
      const adsess = url.searchParams.get("adsess");
      const iframe = document.createElement("iframe");
      iframe.src = "/admin.php" + (adsess ? "?adsess=" + adsess : "");
      Object.assign(iframe.style, {
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "1000",
        border: "none",
        overflow: "auto",
        borderRadius: "10px"
      });
      iframe.addEventListener("load", () => {
        const details = generateDetailsObject(iframe);
        const iframeUrl = new URL(details.rootWindow.location.href);
        if (iframeUrl.searchParams.has("adsess")) {
          let renderFrameId = null;
          AMF.menu = createDeepProxy([...AMF.menu, ...parseMenu(iframe)], () => {
            if (renderFrameId) {
              cancelAnimationFrame(renderFrameId);
            }
            renderFrameId = requestAnimationFrame(() => {
              renderMenu(iframe);
            });
          });
          AMF.on("menu-frame-load", () => renderMenu(iframe));
          AMF.emit("root-frame-load", details);
          const adSess = iframeUrl.searchParams.get("adsess");
          if (adSess) {
            url.searchParams.set("adsess", adSess);
          }
          history.replaceState(null, "", url.toString());
          details.contentFrame.addEventListener("load", () => {
            AMF.emit("content-frame-load", generateDetailsObject(iframe));
          });
          details.menuFrame.addEventListener("load", () => {
            AMF.emit("menu-frame-load", generateDetailsObject(iframe));
          });
          AMF.emit("content-frame-load", details);
          AMF.emit("menu-frame-load", details);
        } else {
          AMF.emit("login-frame-load", details);
        }
      });
      document.body.innerHTML = "";
      document.body.appendChild(iframe);
    };
    function parsePageOptions(options) {
      if (typeof options === "string")
        options = { name: options };
      if (!options.headline)
        options.headline = options.name;
      if (!options.slug)
        options.slug = import_slugify2.default(options.name);
      if (!options.act)
        options.act = "index";
      return options;
    }
    AMF.createPage = (options, callback) => {
      options = parsePageOptions(options);
      AMF.on("content-frame-load", (details) => {
        const window2 = details.contentFrame.contentWindow;
        const url = new URL(window2.location.href);
        if (url.searchParams.get("page") === options.slug) {
          const copyright = window2.document.querySelector(".copy").cloneNode(true);
          const jwrap = window2.document.querySelector("#jwrap").cloneNode(true);
          const submenu = window2.document.querySelector("#submenu").cloneNode(true);
          const originalBody = window2.document.createElement("div");
          originalBody.id = "original-body";
          originalBody.style.display = "none";
          originalBody.innerHTML = window2.document.body.innerHTML;
          window2.document.body.innerHTML = `<div id="maintop">${options.headline}</div>`;
          window2.document.body.appendChild(submenu);
          const body = document.createElement("div");
          body.id = "main";
          window2.document.body.appendChild(body);
          window2.document.body.appendChild(document.createElement("br"));
          window2.document.body.appendChild(document.createElement("br"));
          window2.document.body.appendChild(jwrap);
          window2.document.body.appendChild(copyright);
          window2.document.body.appendChild(originalBody);
          callback({
            ...details,
            url,
            window: window2,
            document: window2.document,
            body,
            originalBody
          });
        }
      });
      const adsess = new URL(location.href).searchParams.get("adsess");
      return `/admin.php?adsess=${adsess}&act=${options.act}&page=${options.slug}`;
    };
    return AMF;
  }

  // src/index.ts
  window.AMF = initializeAmf();
})();
