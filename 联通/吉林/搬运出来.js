// import NodeRSA from "node-rsa";

// const I = (t) => {
//     const reversedKey =
//         "BAQADIQc1Aq9yLXYrorzKGEzDVk8IZrGygu0yT1hSpM/AJze77B85WtlSHBUXdEuMj+OWSY5wMyAOifok4RAFzkzst+l6L/WWsEqdmO8G5l/vp3uNSWiz7gQGpbR1xtrA/v3NRMaBuWJ/7D1DqGDwa91xX0mBQhNKF/+NOJU54tW8jOWSCQgBKQiBCDANG4AAUQABEQD3bISGqSCG0AMfGIM"
//             .split("")
//             .reverse()
//             .join("");

//     // console.log(reversedKey)
//     const publicKeyPem = `-----BEGIN PUBLIC KEY-----\n${reversedKey}\n-----END PUBLIC KEY-----`;

//     const rsa = new NodeRSA(publicKeyPem, {
//         encryptionScheme: "pkcs1", // 与 JSEncrypt 的填充方式一致
//     });

//     return rsa.encrypt(t, "base64", "utf8");
// };

// const a = I("2024202411181458410003");
// console.log(a);
window = function window() { };
const JSEncrypt = require("jsencrypt")

var interNo = "checkSmsCode";
var productId = "2024202411181458410003";
var smsInfo = { smsCode: 1111, smsServiceCode: "YZMX40000" };

var rsa_enc = function (t) {
    var e = new JSEncrypt();
    return (
        e.setPublicKey(
            "BAQADIQc1Aq9yLXYrorzKGEzDVk8IZrGygu0yT1hSpM/AJze77B85WtlSHBUXdEuMj+OWSY5wMyAOifok4RAFzkzst+l6L/WWsEqdmO8G5l/vp3uNSWiz7gQGpbR1xtrA/v3NRMaBuWJ/7D1DqGDwa91xX0mBQhNKF/+NOJU54tW8jOWSCQgBKQiBCDANG4AAUQABEQD3bISGqSCG0AMfGIM"
                .split("")
                .reverse()
                .join("")
        ),
        e.encrypt(t)
    );
};


a = rsa_enc("2024202411181458410003");
console.log(a);

var all_encypt_fuc = function (t = interNo, e = "", n = smsInfo) {
    function w(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
                (r = r.filter(function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                })),
                n.push.apply(n, r);
        }
        return n;
    }
    function x(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
                ? w(Object(n), !0).forEach(function (e) {
                      (0, i.A)(t, e, n[e]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                : w(Object(n)).forEach(function (e) {
                      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                  });
        }
        return t;
    }
    var S = a().create();
    (S.defaults.timeout = 15e3), (S.defaults.withCredentials = !0);
    var E = function (t) {
            return (
                decodeURIComponent(
                    (new RegExp("[?|&]" + t + "=([^&;]+?)(&|#|;|$)").exec(location.href) || [
                        ,
                        "",
                    ])[1].replace(/\%20/g, "+")
                ) || ""
            );
        },
        T = {
            duanlianjieabc: E("duanlianjieabc"),
            channelCode: E("channelCode"),
            serviceType: E("serviceType"),
            saleChannel: E("saleChannel"),
            externalSources: E("externalSources"),
            contactCode: E("contactCode"),
            ticket: E("ticket"),
            ticketPhone: E("ticketPhone"),
            ticketChannel: E("ticketChannel"),
        },
        C = E("yacemobile") || sessionStorage.getItem("un_mobile");
    C && ((T.yacetype = "yace"), (T.yacemobile = C));
    var _ = c().stringify(T);
    S.interceptors.request.use(
        function (t) {
            return (
                "post" === t.method
                    ? ((t.headers["Content-Type"] = t.url.includes(
                          "/verificationCode/generateGraphicalCode"
                      )
                          ? "application/x-www-form-urlencoded"
                          : "application/json;charset=UTF-8"),
                      (t.url += (t.url.match(/\?/) ? "&" : "?") + "".concat(_)))
                    : "get" === t.method && (t.params = x(x({}, t.params), T)),
                t
            );
        },
        function (t) {
            return Promise.reject(t);
        }
    ),
        S.interceptors.response.use(
            function (t) {
                return t.data;
            },
            function (t) {
                return Promise.reject(t);
            }
        );
    var k = function (t, e) {
            var n = 0;
            return function () {
                for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++)
                    i[o] = arguments[o];
                var a = this,
                    s = new Date().getTime(),
                    c = s - n;
                return new Promise(function (r, o) {
                    if (c > e)
                        try {
                            var l = t.apply(a, i);
                            (n = s), r(l);
                        } catch (t) {
                            o(t);
                        }
                    else r(null);
                });
            };
        },
        O = function (t, e) {
            if (!t || null == t || t == "llun".split("").reverse().join("")) return null;
            var n = decodeURIComponent(t),
                r = f().parse("5*^+HG;EN1Yb}3>k".split("").reverse().join("")),
                i = f().parse("EzY]n8CFL}wXNUfI".split("").reverse().join("")),
                o = u().decrypt(n, r, {
                    iv: i,
                    padding: m(),
                });
            return f().stringify(o).toString();
        },
        A = function (t, e) {
            if (!t) return null;
            var n = f().parse("5*^+HG;EN1Yb}3>k".split("").reverse().join("")),
                r = f().parse(t),
                i = f().parse("EzY]n8CFL}wXNUfI".split("").reverse().join("")),
                o = u().encrypt(r, n, {
                    iv: i,
                    padding: m(),
                }),
                a = h().stringify(o.ciphertext);
            return encodeURIComponent(a);
        },
        I = function (t) {
            var e = new g.JSEncrypt();
            return (
                e.setPublicKey(
                    "BAQADIQc1Aq9yLXYrorzKGEzDVk8IZrGygu0yT1hSpM/AJze77B85WtlSHBUXdEuMj+OWSY5wMyAOifok4RAFzkzst+l6L/WWsEqdmO8G5l/vp3uNSWiz7gQGpbR1xtrA/v3NRMaBuWJ/7D1DqGDwa91xX0mBQhNKF/+NOJU54tW8jOWSCQgBKQiBCDANG4AAUQABEQD3bISGqSCG0AMfGIM"
                        .split("")
                        .reverse()
                        .join("")
                ),
                e.encrypt(t)
            );
        },
        P = function (t) {
            return (
                (e = decodeURIComponent(t)),
                (n = y.enc.Base64.parse(decodeURIComponent(e))),
                (r = (function (t) {
                    return y.enc.Hex.parse(t);
                })("6b8b4567327b23c6643c527d5b8c8a17")),
                y.AES.decrypt(
                    {
                        ciphertext: n,
                    },
                    r,
                    {
                        mode: y.mode.ECB,
                    }
                ).toString(y.enc.Utf8)
            );
            var e, n, r;
        },
        M = "https://m.client.10010.com",
        D = window.location.host;
    "imgxhm.client.10010.com" == D
        ? (M = "https://mxhm.client.10010.com")
        : "imgxx.client.10010.com" == D && (M = "https://mxx.client.10010.com");
    var z = M,
        R = M,
        j =
            window.location.origin.includes("http://client.10010.com") ||
            (window.location.host.includes("localhost") &&
                (sessionStorage.getItem("YZMCLIENT") || localStorage.getItem("YZMCLIENT")))
                ? "http:"
                : "https:",
        $ = "".concat(j, "//client.10010.com"),
        B = $,
        L = $,
        N =
            window.location.origin.includes("http://ecstest2018.10010.com") ||
            (window.location.host.includes("localhost") &&
                (sessionStorage.getItem("YZMCLIENT") || localStorage.getItem("YZMCLIENT")))
                ? "http:"
                : "https:",
        V = "".concat(N, "//ecstest2018.10010.com"),
        F = V,
        H = V,
        U = V,
        W =
            window.location.origin.includes("http://client.10010.com") ||
            (window.location.host.includes("localhost") &&
                (sessionStorage.getItem("YZMCLIENT") || localStorage.getItem("YZMCLIENT")))
                ? "http:"
                : "https:",
        q = {
            pro: z,
            huidu: R,
            prepub: $,
            pre: B,
            sf_prepub: L,
            dev: V,
            devs: H,
            dev_4000: F,
            dev_6000: U,
            api: "".concat(W, "//client.10010.com"),
        };
    function Y(t, e, n, r, i, o, a) {
        try {
            var s = t[o](a),
                c = s.value;
        } catch (t) {
            return void n(t);
        }
        s.done ? e(c) : Promise.resolve(c).then(r, i);
    }
    var G = n(756),
        X = n.n(G);
    function K() {
        for (
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 16,
                e = Math.random().toString(36).substr(2);
            e.length < t;

        )
            e += Math.random().toString(36).substr(2);
        return e.substr(0, t);
    }
    var J = (function () {
        var t,
            e =
                ((t = X().mark(function t(e) {
                    var n, r, i, o, a, s, c, l, u, d;
                    return X().wrap(
                        function (t) {
                            for (;;)
                                switch ((t.prev = t.next)) {
                                    case 0:
                                        if (
                                            ((n = e.scene),
                                            (r = void 0 === n ? "" : n),
                                            (i = e.url),
                                            (o = void 0 === i ? "" : i),
                                            r && o)
                                        ) {
                                            t.next = 3;
                                            break;
                                        }
                                        throw new Error("初始化initPublicKey方法参数错误");
                                    case 3:
                                        return (
                                            (t.prev = 3),
                                            (t.next = 6),
                                            Promise.race([
                                                fetch(o, {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        scene: r,
                                                    }),
                                                }),
                                                new Promise(function (t, e) {
                                                    setTimeout(function () {
                                                        return e(new Error("Request timed out"));
                                                    }, 5e3);
                                                }),
                                            ])
                                        );
                                    case 6:
                                        if ((a = t.sent).ok) {
                                            t.next = 9;
                                            break;
                                        }
                                        throw new Error("Server error: ".concat(a.status));
                                    case 9:
                                        return (t.next = 11), a.json();
                                    case 11:
                                        return (
                                            (s = t.sent),
                                            (c = s.data.value),
                                            (l = K()),
                                            (u = new g.JSEncrypt()).setPublicKey(c),
                                            (d = u.encrypt(l)),
                                            t.abrupt("return", {
                                                url: o,
                                                scene: r,
                                                paramKey: d,
                                                encrypt: Z.bind({
                                                    AesKey: l,
                                                }),
                                                decrypt: Q.bind({
                                                    AesKey: l,
                                                }),
                                            })
                                        );
                                    case 20:
                                        throw ((t.prev = 20), (t.t0 = t.catch(3)), t.t0);
                                    case 23:
                                        return t.abrupt("return", "初始化成功");
                                    case 25:
                                    case "end":
                                        return t.stop();
                                }
                        },
                        t,
                        null,
                        [[3, 20]]
                    );
                })),
                function () {
                    var e = this,
                        n = arguments;
                    return new Promise(function (r, i) {
                        var o = t.apply(e, n);
                        function a(t) {
                            Y(o, r, i, a, s, "next", t);
                        }
                        function s(t) {
                            Y(o, r, i, a, s, "throw", t);
                        }
                        a(void 0);
                    });
                });
        return function (t) {
            return e.apply(this, arguments);
        };
    })();
    function Z(t) {
        return (
            (this.AesKey &&
                (function (t, e) {
                    var n = b().enc.Utf8.parse(e),
                        r = b().enc.Utf8.parse(t);
                    return b()
                        .AES.encrypt(r, n, {
                            mode: b().mode.ECB,
                            padding: b().pad.Pkcs7,
                        })
                        .toString();
                })(t, this.AesKey)) ||
            ""
        );
    }
    function Q(t) {
        return (
            (this.AesKey &&
                (function (t, e) {
                    var n = b().enc.Utf8.parse(e),
                        r = b().AES.decrypt(t, n, {
                            mode: b().mode.ECB,
                            padding: b().pad.Pkcs7,
                        });
                    return b().enc.Utf8.stringify(r).toString();
                })(t, this.AesKey)) ||
            ""
        );
    }
    window.$JSEncrypt = J;
    var tt,
        et,
        nt,
        rt = n(576),
        it = n.n(rt),
        ot = "servicebusiness",
        at = "serviceBusiness_new",
        st = "serviceBusiness_6000",
        ct = {
            projectpro: ot,
            projecthuidu: "servicebusinesshd",
            projectprepub: ot,
            projectpre: ot,
            projectsf_prepub: ot,
            projectdev: at,
            projectdevs: st,
            projectdev_4000: at,
            projectdev_6000: st,
            projectapi: ot,
        },
        lt = {
            fadeTimer: null,
            setOpacity: function (t, e) {
                var n = e / 100;
                (t.style.opacity = n.toString()),
                    (t.style.filter = "alpha(opacity=".concat(e, ")"));
            },
            fadeIn: function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20,
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100,
                    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 5,
                    i = this;
                (e = e || 20), (n = n || 100), (t.style.display = "flex"), i.setOpacity(t, 0);
                var o = 0;
                this.fadeTimer && (this.fadeTimer = null),
                    (function a() {
                        i.setOpacity(t, o), (o += r || 5) <= n && (i.fadeTimer = setTimeout(a, e));
                    })();
            },
            fadeOut: function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20,
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                    r = this;
                (e = e || 20), (n = n || 0);
                var i = 100;
                this.fadeTimer && (this.fadeTimer = null),
                    (function o() {
                        r.setOpacity(t, i),
                            (i -= 10) >= n
                                ? (r.fadeTimer = setTimeout(o, e))
                                : i < 0 && (t.style.display = "none");
                    })();
            },
        },
        ut = {
            toastTimer: null,
            ratio: 1,
            toast: function () {
                var t = this,
                    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    n = (e.type, e.inline),
                    r = void 0 !== n && n,
                    i = e.title,
                    o = e.text,
                    a = e.duration,
                    s = void 0 === a ? 2100 : a,
                    c = e.version;
                setTimeout(function () {
                    "WT" !== c && (t.ratio = t.calcRatio());
                    var n = document.querySelector(".real-veri-box");
                    e.container = !r && n ? ".real-veri-box" : "";
                    var a = document.getElementsByClassName("unicomverify-fade-toast"),
                        l = document.getElementById("unicomverifytoast-mask");
                    if (
                        (a.forEach(function (t) {
                            t.remove();
                        }),
                        l ||
                            ((l = document.createElement("div")).setAttribute(
                                "id",
                                "unicomverifytoast-mask"
                            ),
                            l.setAttribute(
                                "style",
                                "\n                        position:fixed;\n                        width: 100%;\n                        height: 100%;\n                        margin:0 auto;\n                        box-sizing:border-box;\n                        display: flex;\n                        flex-direction: column;\n                        justify-content: center;\n                        align-items: center;\n                        background: rgba(0, 0, 0, 0);\n                        text-align: center;\n                        left: 0;\n                        top: 0;\n                        z-index: 99998;\n                        display: none;\n                    "
                            ),
                            document.body.appendChild(l)),
                        0 == a.length || e.container)
                    ) {
                        var u = document.createElement("div");
                        (u.className = "unicomverify-fade-toast"),
                            u.setAttribute(
                                "style",
                                "\n                        display:none;\n                        width: max-content;\n                        max-width: 90%;\n                        white-space: inherit;\n                        height: auto;\n                        margin:0 auto;\n                        box-sizing:border-box;\n                        display: flex;\n                        flex-direction: column;\n                        justify-content: center;\n                        align-items: center;\n                        background: rgba(0, 0, 0, 0.808);\n                        backdrop-filter: blur(10px);\n                        -webkit-backdrop-filter:blur(10px);\n                        border-radius: "
                                    .concat(
                                        6 * t.ratio + "px",
                                        ";\n                        color: #fff;\n                        text-align: center;\n                        font-size: "
                                    )
                                    .concat(
                                        14 * t.ratio + "px",
                                        ";\n                        line-height:1.5;\n                        padding: "
                                    )
                                    .concat(
                                        10 * t.ratio + "px " + 20 * t.ratio + "px",
                                        ";\n                        top: 50%;\n                        left: 50%;\n                        transform: translate3D(-50%, -50%, 0);\n                        z-index: 99999;\n                    "
                                    )
                            ),
                            (u.style.position = "fixed"),
                            t.removeAndAddToast(e.container, u);
                    }
                    a.forEach(function (e) {
                        i
                            ? (e.innerHTML =
                                  '<p class="fade-title" style="\n                        font-size: '
                                      .concat(
                                          15 * t.ratio + "px",
                                          ";\n                        maxWidth: 80%;\n                        box-sizing: border-box;\n                        margin: 0;\n                        margin: 0;\n                        padding: "
                                      )
                                      .concat(8 * t.ratio + "px", " 0 ")
                                      .concat(5 * t.ratio + "px", ';\n                    ">')
                                      .concat(
                                          i,
                                          '</p><p class="fade-text" style="\n                        font-size: '
                                      )
                                      .concat(
                                          14 * t.ratio + "px",
                                          ";\n                        line-height: 1.1;\n                        margin: 0;\n                        padding: "
                                      )
                                      .concat(12 * t.ratio + "px", ' 0;\n                    ">')
                                      .concat(o, "</p>"))
                            : ((e.innerHTML = o),
                              (e.style.padding = "".concat(
                                  11 * t.ratio + "px " + 22 * t.ratio + "px"
                              )));
                    }),
                        clearTimeout(t.toastTimer),
                        lt.fadeIn(l),
                        a.forEach(function (e) {
                            lt.fadeIn(e),
                                (t.toastTimer = setTimeout(function () {
                                    lt.fadeOut(e), lt.fadeOut(l);
                                }, s));
                        });
                }, 10);
            },
            calcRatio: function () {
                var t = 16,
                    e = window.document.documentElement.getBoundingClientRect().width;
                e > this.designWidth && (e = this.designWidth);
                var n = (e / this.designWidth) * 100;
                t = n;
                var r = parseFloat(window.getComputedStyle(document.documentElement)["font-size"]);
                r !== n && r > 0 && Math.abs(r - n) > 1 && (t = (n * n) / r);
                var i = window.getComputedStyle(document.documentElement).fontSize;
                return parseInt(i) !== parseInt(t) &&
                    window.innerWidth > 450 &&
                    window.innerWidth >= 850
                    ? 2
                    : 1;
            },
            removeAndAddToast: function (t, e) {
                var n = function (t) {
                        t.querySelectorAll(".unicomverify-fade-toast").forEach(function (e) {
                            return t.removeChild(e);
                        });
                    },
                    r = function (t) {
                        n(t);
                        var r = e.cloneNode(!0);
                        t.appendChild(r);
                    };
                if (t)
                    if (((e.style.position = "absolute"), t.startsWith("#"))) {
                        var i = document.getElementById(t.slice(1));
                        r(i);
                    } else
                        document.querySelectorAll(t).forEach(function (t) {
                            return r(t);
                        });
                else {
                    (e.style.position = "fixed"), n(document.body);
                    var o = e.cloneNode(!0);
                    document.body.appendChild(o);
                }
            },
        },
        dt = {
            modal: function () {
                var t,
                    e = this,
                    n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    r = n.version,
                    i = void 0 === r ? "" : r,
                    o = n.title,
                    a = void 0 === o ? "温馨提示" : o,
                    s = n.content,
                    c = void 0 === s ? "" : s,
                    l = n.cancelbtntxt,
                    u = void 0 === l ? "" : l,
                    d = n.surebtntxt,
                    f = void 0 === d ? "完成" : d,
                    p = n.confirm,
                    h = void 0 === p ? function () {} : p,
                    v = n.cancel,
                    m = void 0 === v ? function () {} : v,
                    g = n.closeOnClickOverlay,
                    y = void 0 !== g && g,
                    b = n.closeOnConfirm,
                    w = void 0 === b || b;
                document.querySelectorAll("input, textarea").forEach(function (t) {
                    t.blur();
                }),
                    this.removeModal(".unicom-modal-template"),
                    ((t = document.createElement("div")).id = "unicom-modal-template"),
                    (t.className = "unicom-modal-template"),
                    (t.innerHTML =
                        ' \n            <div class="unicom-modal-overlay"></div>  \n            <div class="unicom-modal '.concat(
                            "WT" === i ? "wt-modal" : "",
                            '">  \n                <div class="unicom-modal-content">  \n                    <h2 class="unicom-modal-title"></h2>  \n                    <p class="unicom-modal-message"></p>\n                    <div class="unicom-modal-footer">\n                        <button class="unicom-modal-button unicom-modal-cancel" style="display: none"></button>  \n                        <button class="unicom-modal-button unicom-modal-confirm"></button>\n                    </div>\n                </div>  \n            </div>'
                        ));
                var x = t.cloneNode(!0),
                    S = x.querySelector(".unicom-modal-overlay"),
                    E = x.querySelector(".unicom-modal"),
                    T = E.querySelector(".unicom-modal-title"),
                    C = E.querySelector(".unicom-modal-message"),
                    _ = E.querySelector(".unicom-modal-cancel"),
                    k = E.querySelector(".unicom-modal-confirm");
                y &&
                    S.addEventListener("click", function () {
                        e.hideModal();
                    }),
                    u &&
                        ((_.style.display = "inline-block"),
                        (_.textContent = u),
                        _.addEventListener("click", function () {
                            m(), e.hideModal();
                        })),
                    (T.textContent = a),
                    (C.innerHTML = c),
                    (k.textContent = f),
                    k.addEventListener("click", function () {
                        h(), w && e.hideModal();
                    }),
                    E.addEventListener("animationend", function () {
                        E.classList.contains("visible") || document.body.removeChild(x);
                    }),
                    document.body.appendChild(x),
                    setTimeout(function () {
                        (S.style.display = "flex"),
                            lt.fadeIn(S, 1, 100, 20),
                            setTimeout(function () {
                                E.classList.add("visible"), e.fixedBody();
                            }, 50);
                    }, 10);
            },
            removeModal: function (t) {
                document.querySelectorAll(t).forEach(function (t) {
                    t.parentNode.removeChild(t);
                });
            },
            hideModal: function () {
                var t = this;
                document.querySelectorAll(".unicom-modal-overlay").forEach(function (t) {
                    lt.fadeOut(t);
                }),
                    document.querySelectorAll(".unicom-modal").forEach(function (t) {
                        t.classList.remove("visible");
                    }),
                    setTimeout(function () {
                        t.removeModal(".unicom-modal-template");
                    }, 550),
                    this.looseBody();
            },
            fixedBody: function () {
                var t = document.body.scrollTop || document.documentElement.scrollTop;
                (document.body.style.cssText += "position:fixed;left:0;right:0;top:-" + t + "px;"),
                    (document.body.style.cssText += "z-index:1000;");
            },
            looseBody: function () {
                var t = document.body;
                t.style.position = "static";
                var e = t.style.top;
                (document.body.scrollTop = document.documentElement.scrollTop = -parseInt(e)),
                    (t.style.top = ""),
                    (t.style.zIndex = "");
            },
        };
    function ft(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
                (r = r.filter(function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                })),
                n.push.apply(n, r);
        }
        return n;
    }
    function pt(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
                ? ft(Object(n), !0).forEach(function (e) {
                      (0, i.A)(t, e, n[e]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                : ft(Object(n)).forEach(function (e) {
                      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                  });
        }
        return t;
    }
    n(606);
    var ht = (function () {
            function t(t, e) {
                void 0 === t && (t = "Default"),
                    void 0 === e && (e = !0),
                    (this.category = t),
                    (this.debug = e);
            }
            function e() {
                for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
                var r = Array(t),
                    i = 0;
                for (e = 0; e < n; e++)
                    for (var o = arguments[e], a = 0, s = o.length; a < s; a++, i++) r[i] = o[a];
                return r;
            }
            return (
                (t.prototype.loggerHandler = function (t) {
                    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                    if (this.debug) {
                        var r = t.title ? t.title + " " : "",
                            i = t.color1,
                            o = t.color2,
                            a =
                                "background: " +
                                i +
                                "; padding: " +
                                (t.title ? "2px" : "2px 0px") +
                                "; border-radius: 3px 0 0 3px;  color: #ffe6e6",
                            s =
                                "background: " +
                                o +
                                "; padding: " +
                                (t.title ? "2px" : "2px 0px") +
                                "; border-radius: 0 3px 3px 0;  color: #52380f",
                            c = ["%c " + this.category + " ", a];
                        "" !== r && void 0 !== r && ((c[0] += "%c " + r), c.push(s)),
                            c.push.apply(c, e);
                    }
                }),
                (t.prototype.infoWithTitle = function (t) {
                    for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
                    this.loggerHandler.apply(
                        this,
                        e(
                            [
                                {
                                    title: t,
                                    color1: "#E60027",
                                    color2: "#c39b5e",
                                },
                            ],
                            n
                        )
                    );
                }),
                (t.prototype.info = function (t) {
                    for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
                    this.loggerHandler.apply(
                        this,
                        e(
                            [
                                {
                                    title: t,
                                    color1: "#c39b5e",
                                    color2: "#f1f1f1",
                                },
                            ],
                            n
                        )
                    );
                }),
                (t.prototype.warn = function (t) {
                    for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
                    this.loggerHandler.apply(
                        this,
                        e(
                            [
                                {
                                    title: t,
                                    color1: "#eece14",
                                    color2: "#f1f1f1",
                                },
                            ],
                            n
                        )
                    );
                }),
                (t.prototype.err = function (t) {
                    for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
                    this.loggerHandler.apply(
                        this,
                        e(
                            [
                                {
                                    title: t,
                                    color1: "#f10b40",
                                    color2: "#f1f1f1",
                                },
                            ],
                            n
                        )
                    );
                }),
                t
            );
        })(),
        vt = {
            name: "unicom-verify",
            components: {},
            props: {
                value: {
                    type: String,
                },
                phone: {
                    type: String,
                },
                code: {
                    type: String,
                },
                reqphone: {
                    type: String,
                },
                scale: {
                    type: Number,
                    default: 1,
                },
                aria: {
                    type: Boolean,
                    default: !1,
                },
                inline: {
                    type: Boolean,
                    default: !1,
                },
                designWidth: {
                    type: Number,
                    default: 1242,
                    required: !0,
                },
                resetSize: {
                    type: Number,
                    default: 1,
                },
                inputLength: {
                    type: Number,
                },
                env: {
                    type: String,
                    default: "pro",
                },
                version: {
                    type: String,
                },
                second: {
                    type: Boolean,
                    default: !1,
                },
                serviceName: {
                    type: String,
                },
                serviceCode: {
                    type: String,
                },
                productId: {
                    type: String,
                },
                soleId: {
                    type: String,
                },
                serviceChannel: {
                    type: String,
                },
                veriIntro: {
                    type: String,
                    default: "尊敬的用户，为保证安全，请您完成校验后，继续进行办理。",
                },
                veriExplain: {
                    type: String,
                    default: "尊敬的用户，为保证安全，请您完成校验后，继续进行办理。",
                },
                diffPhone: {
                    type: Boolean,
                    default: !1,
                },
                diffDesc: {
                    type: String,
                    default: "输入的手机号码不能与登录号码一致！",
                },
                phonePlaceholder: {
                    type: String,
                    default: "请输入手机号码",
                },
                lang: {
                    type: String,
                    default: "chinese",
                },
                themeColor: {
                    type: String,
                    default: "#e60027",
                },
                showUniVerify: {
                    type: Boolean,
                    default: !0,
                },
                popupStyle: {
                    type: Boolean,
                    default: !1,
                },
                matomo: {
                    type: [Object],
                    default: function () {
                        return {};
                    },
                },
                matomoTriggerCode: {
                    type: Array,
                    default: function () {
                        return [];
                    },
                },
            },
            model: {
                prop: "value",
                event: "input",
            },
            watch: {
                inputVal: {
                    immediate: !0,
                    handler: function (t) {
                        this.$emit("input", t);
                    },
                },
                value: {
                    immediate: !0,
                    handler: function (t) {
                        this.inputVal = t;
                    },
                },
                scale: {
                    handler: function (t) {
                        this.size = parseFloat(Number(this.designWidth) / 1242).toFixed(4) * t;
                    },
                },
                showUniVerify: {
                    deep: !0,
                    handler: function (t, e) {
                        var n = this;
                        this.$nextTick(function () {
                            t && n.begin();
                        });
                    },
                },
            },
            data: function () {
                return {
                    log: null,
                    isAndroid: !1,
                    isiOS: !1,
                    isHarmony: !1,
                    isInApp: !1,
                    cookiePhone: this.reqphone,
                    inputVal: this.value,
                    showNone: !1,
                    showWhole: !1,
                    showModal: !1,
                    showSend: !1,
                    showInput: !0,
                    flag: "",
                    flagSMS: !1,
                    showVoice: !1,
                    flagVoice: !1,
                    showInitiative: !1,
                    flagInitiative: !1,
                    cookiesTime: "",
                    cookiesTimeVoice: "",
                    cookiesTimeInit: "",
                    countShow: !1,
                    countShowVoice: !1,
                    countShowInit: !1,
                    count: 60,
                    countVoice: 60,
                    countInit: 60,
                    countDownTime: 1e3 * this.count,
                    countDownTimeVoice: 1e3 * this.countVoice,
                    countDownTimeInit: 1e3 * this.countInit,
                    virginseek: !0,
                    virginseekVoice: !0,
                    virginseekInit: !0,
                    timer: null,
                    timerVoice: null,
                    timerInit: null,
                    maxlength: 4,
                    letterallow: !1,
                    smsCodeRule: "",
                    voiceCodeRule: "",
                    inputtype: "tel",
                    btnDisabled: !1,
                    btnDisabledVoice: !1,
                    btnDisabledInit: !1,
                    copyValue: "",
                    clipboard: null,
                    motionCode: "",
                    smscopyhtml: "",
                    checkInterNo: "",
                    initstate: !1,
                    initdesc: "",
                    inputover: !1,
                    syncPhone: "",
                    syncCode: "",
                    inputNum: "",
                    zinputVal: "",
                    zshowNone: !1,
                    zshowWhole: !1,
                    zshowSend: !1,
                    zshowInput: !0,
                    symbol: "",
                    zflagSMS: !1,
                    zshowVoice: !1,
                    zflagVoice: !1,
                    zshowInitiative: !1,
                    zflagInitiative: !1,
                    isGraphicSms: !1,
                    isGraphicVoice: !1,
                    syncImgCode: "",
                    imgCodeUrl: "",
                    zcookiesTime: "",
                    zcookiesTimeVoice: "",
                    zcookiesTimeInit: "",
                    zcountShow: !1,
                    zcountShowVoice: !1,
                    zcountShowInit: !1,
                    zcount: 60,
                    zcountVoice: 60,
                    zcountInit: 60,
                    zcountDownTime: 1e3 * this.count,
                    zcountDownTimeVoice: 1e3 * this.countVoice,
                    zcountDownTimeInit: 1e3 * this.countInit,
                    zvirginseek: !0,
                    zvirginseekVoice: !0,
                    zvirginseekInit: !0,
                    ztimer: null,
                    ztimerVoice: null,
                    ztimerInit: null,
                    zmaxlength: 4,
                    zletterallow: !1,
                    zsmsCodeRule: "",
                    zvoiceCodeRule: "",
                    zinputtype: "tel",
                    zbtnDisabled: !1,
                    zbtnDisabledVoice: !1,
                    zbtnDisabledInit: !1,
                    zcopyValue: "",
                    zclipboard: null,
                    zmotionCode: "",
                    zsmscopyhtml: "",
                    zcheckInterNo: "",
                    zinitstate: !1,
                    zinitdesc: "",
                    inputdone: !1,
                };
            },
            computed: {
                size: function () {
                    return "WT" === this.version
                        ? this.resetSize
                            ? this.resetSize
                            : 1
                        : parseFloat(Number(this.designWidth) / 1242).toFixed(4) * this.scale;
                },
                piwik: function () {
                    var t =
                            "WT" === this.version
                                ? this.serviceName || ""
                                : (this.serviceName || "") + "验证码",
                        e = "WT" === this.version ? this.matomoTriggerCode[0] || "" : "690",
                        n = "WT" === this.version ? this.matomoTriggerCode[1] || "" : "691",
                        r = "WT" === this.version ? this.matomoTriggerCode[2] || "" : "692";
                    return pt(
                        pt(
                            {},
                            {
                                SMSCode: {
                                    storey: t,
                                    code: e,
                                    value: "获取验证码",
                                    customdimension: "[]",
                                },
                                VoiceCode: {
                                    storey: t,
                                    code: n,
                                    value: "获取(语音)",
                                    customdimension: "[]",
                                },
                                InitCode: {
                                    storey: t,
                                    code: r,
                                    value: "获取(上行短信)",
                                    customdimension: "[]",
                                },
                                SMSCode2: {
                                    storey: t,
                                    code: e,
                                    value: "获取验证码",
                                    customdimension: "[]",
                                },
                                VoiceCode2: {
                                    storey: t,
                                    code: n,
                                    value: "获取(语音)",
                                    customdimension: "[]",
                                },
                                InitCode2: {
                                    storey: t,
                                    code: r,
                                    value: "获取(上行短信)",
                                    customdimension: "[]",
                                },
                            }
                        ),
                        this.matomo
                    );
                },
                showImgCode: function () {
                    return (
                        new RegExp("^1[3-9]\\d{9}$", "ig").test(this.syncPhone) &&
                        (this.zflagSMS || this.zflagVoice) &&
                        (this.isGraphicSms || this.isGraphicVoice)
                    );
                },
            },
            filters: {
                sec: function (t) {
                    return parseInt(t / 1e3);
                },
            },
            beforeRouteLeave: function (t, e, n) {
                n();
            },
            created: function () {
                new ht("Unicom", "pro" !== this.env).infoWithTitle("Verify", "0.0.60"),
                    (this.log = new ht("UV", "pro" !== this.env));
                var t = navigator.userAgent;
                (this.isAndroid = t.indexOf("Android") > -1 || t.indexOf("Adr") > -1),
                    (this.isiOS = !!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)),
                    (this.isHarmony = /ArkWeb|OpenHarmony|HarmonyOS/.test(t)),
                    (this.isInApp = t.indexOf("unicom") > -1);
                var e = ""
                        .concat(q[this.env || "pro"], "/")
                        .concat(ct["project" + (this.env || "pro")]),
                    n =
                        ("WT" === this.version &&
                            -1 == window.location.host.indexOf("localhost")) ||
                        sessionStorage.getItem("YZMWT") ||
                        localStorage.getItem("YZMWT")
                            ? "?version=WT"
                            : "";
                (tt = function (t) {
                    return (function (t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return new Promise(function (n, r) {
                            ms.isEdop()
                                ? ((t += (t.match(/\?/) ? "&" : "?") + "".concat(_)),
                                  ms
                                      .request({
                                          url: t,
                                          method: "POST",
                                          timeout: 15e3,
                                          requestDataType: "JSON",
                                          data: e,
                                      })
                                      .then(function (t) {
                                          n(JSON.parse(t));
                                      })
                                      .catch(function (t) {
                                          r(t);
                                      }))
                                : S.post(t, e)
                                      .then(function (t) {
                                          n(t);
                                      })
                                      .catch(function (t) {
                                          r(t);
                                      });
                        });
                    })("".concat(e, "/verificationCode/pageCalls").concat(n), t);
                }),
                    (nt = "".concat(e, "/safe/key")),
                    (et = function (t, r) {
                        return (function (t) {
                            var e =
                                    arguments.length > 1 && void 0 !== arguments[1]
                                        ? arguments[1]
                                        : {},
                                n =
                                    arguments.length > 2 && void 0 !== arguments[2]
                                        ? arguments[2]
                                        : {};
                            return new Promise(function (r, i) {
                                ms.isEdop()
                                    ? ((t += (t.match(/\?/) ? "&" : "?") + "".concat(_)),
                                      ms
                                          .request({
                                              url: t,
                                              method: "POST",
                                              timeout: 15e3,
                                              header: n,
                                              data: e,
                                          })
                                          .then(function (t) {
                                              r(t);
                                          })
                                          .catch(function (t) {
                                              i(t);
                                          }))
                                    : S.post(t, c().stringify(e), {
                                          headers: n,
                                      })
                                          .then(function (t) {
                                              r(t);
                                          })
                                          .catch(function (t) {
                                              i(t);
                                          });
                            });
                        })("".concat(e, "/verificationCode/generateGraphicalCode").concat(n), t, r);
                    });
            },
            mounted: function () {
                this.showUniVerify && this.begin();
            },
            methods: {
                fadetoast: function (t) {
                    ut.toast(
                        pt(
                            pt(
                                {},
                                {
                                    inline: this.inline,
                                    version: this.version,
                                }
                            ),
                            t
                        )
                    );
                },
                getPublicKey: function () {
                    var t = this;
                    return new Promise(function (e, n) {
                        J({
                            scene: "CheckPaymentOfficeDefault",
                            url: nt,
                        })
                            .then(function (r) {
                                t.isValidJSEncryptAction(r)
                                    ? ((t.jiaMi = r), e(r))
                                    : (t.fadetoast({
                                          type: "error",
                                          text: "图形验证码暂时获取失败，请您稍后再试。",
                                      }),
                                      n(r),
                                      t.log.err("Invalid JSEncryptAction", r));
                            })
                            .catch(function (e) {
                                t.fadetoast({
                                    type: "error",
                                    text: "图形验证码暂时获取异常，请您稍后再试。",
                                }),
                                    t.log.err("Failed to initialize JSEncrypt:", e),
                                    (t.jiaMi = null),
                                    n(e);
                            });
                    });
                },
                isValidJSEncryptAction: function (t) {
                    return t && "object" === (0, r.A)(t) && t.paramKey;
                },
                inputCode: function (t, e) {
                    if ("WT" === this.version || this.matomoTriggerCode.length > 0) {
                        var n = {
                            eventId: 9,
                            matomotriggercode:
                                ("输入图形验证码" === t
                                    ? this.matomoTriggerCode[6]
                                    : "输入手机号" === t
                                    ? this.matomoTriggerCode[4]
                                    : e
                                    ? this.matomoTriggerCode[5]
                                    : this.matomoTriggerCode[3]) || "",
                            value: t,
                            storey: this.serviceName || "",
                        };
                        this.$matomo && this.$matomo.btnClickHandle(n);
                    }
                },
                begin: function () {
                    var t = this;
                    if ("undefined" == typeof ms)
                        this.loadJS(
                            "https://img.client.10010.com/mslab/libs/msJSBridge-harmony-1.6.js",
                            function () {
                                t.$nextTick(function () {
                                    try {
                                        t.cookiePhone =
                                            "WT" === t.version
                                                ? P(t.getCookie("u_account"))
                                                : t.getCookie("u_account");
                                    } catch (e) {
                                        t.log.err("getCookieFromDocument", e);
                                    }
                                    t.second ? t.getSecondState() : t.getBtnState(),
                                        t.keyBoardKill();
                                });
                            }
                        );
                    else {
                        try {
                            this.cookiePhone =
                                "WT" === this.version
                                    ? P(this.getCookie("u_account"))
                                    : this.getCookie("u_account");
                        } catch (t) {
                            this.log.err("getCookieFromDocument", t);
                        }
                        this.second ? this.getSecondState() : this.getBtnState(),
                            this.keyBoardKill();
                    }
                },
                validating: k(function () {
                    var t = this;
                    return new Promise(function (e, n) {
                        if ("6" == t.flag)
                            return (
                                t.log.warn("验证码关闭，请查看配置"),
                                void e({
                                    code: 200,
                                    desc: "验证码均为关闭状态",
                                })
                            );
                        if (((t.showModal = !0), !t.initstate))
                            return (
                                t.fadetoast({
                                    type: "error",
                                    text:
                                        t.initdesc ||
                                        "很抱歉，验证码服务暂时不可用。请您稍后再试或检查网络连接。",
                                }),
                                n({
                                    code: 300,
                                    desc:
                                        t.initdesc ||
                                        "很抱歉，验证码服务暂时不可用。请您稍后再试或检查网络连接。",
                                }),
                                void (t.showModal = !1)
                            );
                        if (!t.checkInterNo)
                            return (
                                t.fadetoast({
                                    type: "warning",
                                    text: "请先获取验证码！",
                                }),
                                n({
                                    code: 400,
                                    desc: "请先获取验证码！",
                                }),
                                void (t.showModal = !1)
                            );
                        if ("checkInitiative" != t.checkInterNo) {
                            if (
                                !t.letterallow &&
                                !new RegExp("[\\d]{" + t.maxlength + "}", "ig").test(t.inputVal)
                            )
                                return (
                                    t.fadetoast({
                                        type: "error",
                                        text: "请输入正确的验证码！",
                                    }),
                                    n({
                                        code: 400,
                                        desc: "请输入正确的验证码！[数字验证未通过]" + t.inputVal,
                                    }),
                                    void (t.showModal = !1)
                                );
                            if (
                                t.letterallow &&
                                !new RegExp("[a-zA-Z]{3}[\\d]{3}", "ig").test(t.inputVal)
                            )
                                return (
                                    t.fadetoast({
                                        type: "error",
                                        text: "请输入正确的验证码！",
                                    }),
                                    n({
                                        code: 400,
                                        desc:
                                            "请输入正确的验证码！[字母数字验证未通过]" + t.inputVal,
                                    }),
                                    void (t.showModal = !1)
                                );
                        }
                        var r = t.setSeq(t.checkInterNo, "", {
                            smsServiceCode: t.serviceCode,
                            smsCode: t.inputVal,
                        });
                        tt(r)
                            .then(function (r) {
                                (t.showModal = !1),
                                    r && "0000" == r.code
                                        ? e({
                                              code: 200,
                                              data: r,
                                          })
                                        : (t.fadetoast({
                                              type: "error",
                                              text: (r && r.desc) || "验证未成功！",
                                              duration: 3e3,
                                          }),
                                          n({
                                              code: 500,
                                              data: r,
                                              desc:
                                                  (r && r.desc) ||
                                                  "验证服务超时或异常，请稍后再试！",
                                          }));
                            })
                            .catch(function (e) {
                                t.log.err("validating", e),
                                    (t.showModal = !1),
                                    t.fadetoast({
                                        type: "error",
                                        text: "验证服务异常！",
                                    }),
                                    n({
                                        code: 500,
                                        data: e,
                                        desc: "验证服务异常！",
                                    });
                            });
                    });
                }, 2e3),
                verifying: k(function () {
                    var t = this;
                    return new Promise(function (e, n) {
                        if ("6" == t.symbol)
                            return (
                                t.log.warn("验证码关闭，请查看配置"),
                                void e({
                                    code: 200,
                                    desc: "验证码均为关闭状态",
                                })
                            );
                        if (((t.showModal = !0), !t.zinitstate))
                            return (
                                t.fadetoast({
                                    type: "error",
                                    text:
                                        t.zinitdesc ||
                                        "很抱歉，验证码服务暂时不可用。请您稍后再试或检查网络连接。",
                                }),
                                n({
                                    code: 300,
                                    desc:
                                        t.zinitdesc ||
                                        "很抱歉，验证码服务暂时不可用。请您稍后再试或检查网络连接。",
                                }),
                                void (t.showModal = !1)
                            );
                        if (!new RegExp("^1[3-9]\\d{9}$", "ig").test(t.syncPhone))
                            return (
                                t.fadetoast({
                                    type: "error",
                                    text: "请输入正确的手机号码！",
                                    mask: !1,
                                }),
                                n({
                                    code: 400,
                                    desc: "请输入正确的手机号码！",
                                }),
                                void (t.showModal = !1)
                            );
                        if (t.diffPhone)
                            return (
                                t.fadetoast({
                                    type: "info",
                                    text: t.diffDesc,
                                    mask: !1,
                                }),
                                void (t.showModal = !1)
                            );
                        if (!t.zcheckInterNo)
                            return (
                                t.fadetoast({
                                    type: "warning",
                                    text: "请先获取验证码！",
                                }),
                                n({
                                    code: 400,
                                    desc: "请先获取验证码！",
                                }),
                                void (t.showModal = !1)
                            );
                        var r = new RegExp("[\\d]{4}", "ig");
                        if (t.showImgCode && !r.test(t.syncImgCode))
                            return (
                                t.fadetoast({
                                    type: "error",
                                    text: "请输入正确的图形验证码！",
                                }),
                                n({
                                    code: 400,
                                    desc:
                                        "请输入正确的图形验证码！[数字验证未通过]" + t.syncImgCode,
                                }),
                                void (t.showModal = !1)
                            );
                        if ("checkInitiative" != t.zcheckInterNo) {
                            if (
                                !t.zletterallow &&
                                !new RegExp("[\\d]{" + t.zmaxlength + "}", "ig").test(t.syncCode)
                            )
                                return (
                                    t.fadetoast({
                                        type: "error",
                                        text: "请输入正确的验证码！",
                                    }),
                                    n({
                                        code: 400,
                                        desc: "请输入正确的验证码！[数字验证未通过]" + t.syncCode,
                                    }),
                                    void (t.showModal = !1)
                                );
                            if (
                                t.zletterallow &&
                                !new RegExp("[a-zA-Z]{3}[\\d]{3}", "ig").test(t.syncCode)
                            )
                                return (
                                    t.fadetoast({
                                        type: "error",
                                        text: "请输入正确的验证码！",
                                    }),
                                    n({
                                        code: 400,
                                        desc:
                                            "请输入正确的验证码！[字母数字验证未通过]" + t.syncCode,
                                    }),
                                    void (t.showModal = !1)
                                );
                        }
                        var i = t.zsetSeq(t.zcheckInterNo, "", {
                            smsServiceCode: t.serviceChannel,
                            smsCode: t.syncCode,
                            mobile: t.syncPhone,
                        });
                        tt(i)
                            .then(function (r) {
                                (t.showModal = !1),
                                    r && "0000" == r.code
                                        ? e({
                                              code: 200,
                                              data: r,
                                          })
                                        : (t.fadetoast({
                                              type: "error",
                                              text: (r && r.desc) || "验证未成功！",
                                              duration: 3e3,
                                          }),
                                          n({
                                              code: 500,
                                              data: r,
                                              desc:
                                                  (r && r.desc) ||
                                                  "验证服务超时或异常，请稍后再试！",
                                          }));
                            })
                            .catch(function (e) {
                                t.log.err("verifying", e),
                                    (t.showModal = !1),
                                    t.fadetoast({
                                        type: "error",
                                        text: "验证服务异常！",
                                    }),
                                    n({
                                        code: 500,
                                        data: e,
                                        desc: "验证服务异常！",
                                    });
                            });
                    });
                }, 2e3),
                setInput: function (t) {
                    this.letterallow
                        ? (this.inputVal = this.inputVal
                              .replace(/[\u4e00-\u9fa5/\s+/]|[^a-zA-Z0-9\u4E00-\u9FA5]/g, "")
                              .slice(0, this.maxlength))
                        : (this.inputVal = this.inputVal
                              .replace(/[^\d]/g, "")
                              .slice(0, this.maxlength)),
                        this.$emit("oninput", t);
                },
                setSyncCode: function (t, e) {
                    e && (this.syncCode = e),
                        this.zletterallow
                            ? (this.syncCode = this.syncCode
                                  .replace(/[\u4e00-\u9fa5/\s+/]|[^a-zA-Z0-9\u4E00-\u9FA5]/g, "")
                                  .slice(0, this.zmaxlength))
                            : (this.syncCode = this.syncCode
                                  .replace(/[^\d]/g, "")
                                  .slice(0, this.zmaxlength)),
                        this.okcheck(),
                        this.$emit("update:code", this.syncCode),
                        this.$emit("inputcode", t);
                },
                setSyncPhone: function (t, e) {
                    if (
                        (e && (this.syncPhone = e),
                        (this.syncPhone = this.syncPhone.replace(/[^\d]/g, "").slice(0, 11)),
                        t && "input" === t.type)
                    ) {
                        var n = new RegExp("^1[3-9]\\d{9}$", "ig").test(this.syncPhone);
                        this.showImgCode && n && this.changeImg();
                    }
                    this.okcheck(),
                        this.$emit("update:phone", this.syncPhone),
                        this.$emit("inputphone", t);
                },
                setSyncImgCode: function (t, e) {
                    e && (this.syncImgCode = e),
                        (this.syncImgCode = this.syncImgCode.replace(/[^\d]/g, "").slice(0, 4)),
                        this.okcheck(),
                        this.$emit("update:imgcode", this.syncImgCode),
                        this.$emit("inputimgcode", t);
                },
                changeImg: function (t) {
                    var e = this,
                        n = new RegExp("^1[3-9]\\d{9}$", "ig").test(this.syncPhone);
                    this.showImgCode && n
                        ? this.isValidJSEncryptAction(this.jiaMi)
                            ? this.loadImgCode()
                            : this.getPublicKey().then(function () {
                                  e.loadImgCode();
                              })
                        : t &&
                          this.fadetoast({
                              type: "warning",
                              text: "请先输入手机号码！",
                          });
                },
                loadImgCode: function () {
                    var t = this;
                    this.syncImgCode = "";
                    var e = Math.floor(1e4 * Math.random());
                    et(
                        {
                            num: e,
                            smsServiceCode: this.serviceChannel,
                            encryptionMobile: this.jiaMi.encrypt(this.syncPhone),
                        },
                        {
                            "encrypt-key": this.jiaMi.paramKey,
                            "scene-key": this.jiaMi.scene,
                        }
                    )
                        .then(function (e) {
                            var n = e.code,
                                r = e.data,
                                i = e.desc;
                            (t.imgCodeUrl = ""),
                                e && "0000" == n && r && r.img
                                    ? (t.imgCodeUrl = r.img)
                                    : t.fadetoast({
                                          type: "error",
                                          text: i || "获取图形验证码失败！",
                                      });
                        })
                        .catch(function (e) {
                            (t.imgCodeUrl = ""),
                                t.fadetoast({
                                    type: "error",
                                    text: "获取图形验证码异常！",
                                });
                        });
                },
                okcheck: function () {
                    var t = new RegExp("[\\d]{" + this.zmaxlength + "}", "ig");
                    this.zletterallow &&
                        (t = new RegExp(
                            "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{" + this.zmaxlength + "}$",
                            "ig"
                        ));
                    var e = new RegExp("^1[3-9]\\d{9}$", "ig"),
                        n = t.test(this.syncCode),
                        r = e.test(this.syncPhone),
                        i = new RegExp("[\\d]{4}", "ig").test(this.syncImgCode);
                    ("checkInitiative" == this.zcheckInterNo && r) ||
                    ("checkInitiative" != this.zcheckInterNo &&
                        n &&
                        r &&
                        ((this.showImgCode && i) || !this.showImgCode))
                        ? ((this.inputdone = !0),
                          this.$emit("inputdone", {
                              ok: !0,
                              phone: this.syncPhone,
                              code: this.syncCode,
                              imgcode: this.syncImgCode,
                          }))
                        : ((this.inputdone = !1),
                          this.$emit("inputdone", {
                              ok: !1,
                              phone: this.syncPhone,
                              code: this.syncCode,
                              imgcode: this.syncImgCode,
                          }));
                },
                getBtnState: function (t) {
                    var e = this,
                        n = this.setSeq("queryProcess", "", {
                            smsServiceCode: this.serviceCode,
                        });
                    tt(n)
                        .then(function (n) {
                            if (!n || !n.data || !n.data.encryptData || "0000" != n.code)
                                return (
                                    (e.initstate = !1),
                                    (e.initdesc =
                                        (n && n.desc) ||
                                        "很抱歉，暂时无法为您服务，感谢您的使用，请稍后再试！"),
                                    void e.log.err("queryProcess", n)
                                );
                            e.initstate = !0;
                            var r = JSON.parse(O(n.data.encryptData));
                            switch (
                                (e.log.warn("opt", r),
                                (e.count = Number(r.smsSendingInterval) + 1),
                                (e.countVoice = Number(r.voiceSendingInterval) + 1),
                                (e.countInit = Number(r.upSendingInterval) + 1),
                                (e.countDownTime =
                                    r.smsSendingInterval &&
                                    1e3 * (Number(r.smsSendingInterval) + 1)),
                                (e.countDownTimeVoice =
                                    r.voiceSendingInterval &&
                                    1e3 * (Number(r.voiceSendingInterval) + 1)),
                                (e.countDownTimeInit =
                                    r.upSendingInterval && 1e3 * (Number(r.upSendingInterval) + 1)),
                                (e.smsCodeRule = r.smsCodeRule),
                                (e.voiceCodeRule = r.voiceCodeRule),
                                (e.flag = r.flag),
                                r.flag)
                            ) {
                                case "1":
                                    (e.flagSMS = !0),
                                        (e.flagVoice = !0),
                                        (e.flagInitiative = !1),
                                        e.initCount("sms"),
                                        e.initCount("voice"),
                                        e.switchRule("sms", e.smsCodeRule),
                                        (e.checkInterNo = "checkSmsCode"),
                                        (e.showWhole = !0),
                                        (e.showInput = !0),
                                        (e.showNone = !1);
                                    break;
                                case "2":
                                    (e.flagSMS = !0),
                                        (e.flagVoice = !1),
                                        (e.flagInitiative = !0),
                                        e.initCount("sms"),
                                        e.initCount("init"),
                                        e.switchRule("sms", e.smsCodeRule),
                                        (e.checkInterNo = "checkSmsCode"),
                                        (e.showWhole = !0),
                                        (e.showInput = !0),
                                        (e.showNone = !1);
                                    break;
                                case "3":
                                    (e.flagSMS = !0),
                                        (e.flagVoice = !1),
                                        (e.flagInitiative = !1),
                                        e.initCount("sms"),
                                        e.switchRule("sms", e.smsCodeRule),
                                        (e.checkInterNo = "checkSmsCode"),
                                        (e.showWhole = !0),
                                        (e.showInput = !0),
                                        (e.showNone = !1);
                                    break;
                                case "4":
                                    (e.flagVoice = !0),
                                        (e.flagSMS = !1),
                                        (e.flagInitiative = !1),
                                        e.initCount("voice"),
                                        e.switchRule("voice", e.voiceCodeRule),
                                        (e.checkInterNo = "checkVoice"),
                                        (e.showWhole = !0),
                                        (e.showInput = !0),
                                        (e.showNone = !1);
                                    break;
                                case "5":
                                    (e.flagInitiative = !0),
                                        (e.flagVoice = !1),
                                        (e.flagSMS = !1),
                                        e.initCount("init"),
                                        e.switchRule("sms", 4),
                                        (e.checkInterNo = "checkInitiative"),
                                        (e.showInput = !1),
                                        (e.showWhole = !0),
                                        (e.showNone = !1);
                                    break;
                                case "6":
                                    (e.flagSMS = !1),
                                        (e.flagVoice = !1),
                                        (e.flagInitiative = !1),
                                        (e.checkInterNo = ""),
                                        (e.showWhole = !1),
                                        (e.showInput = !1),
                                        (e.showNone = !0),
                                        e.log.warn("queryProcess", "验证码未配置或为关闭");
                                    break;
                                default:
                                    (e.flagSMS = !1),
                                        (e.flagVoice = !1),
                                        (e.flagInitiative = !1),
                                        (e.checkInterNo = ""),
                                        (e.showWhole = !1),
                                        (e.showInput = !1),
                                        (e.showNone = !0),
                                        e.fadetoast({
                                            type: "error",
                                            text: "很抱歉，未获取到验证码服务状态，请您稍后再试！",
                                        }),
                                        (e.initstate = !1);
                            }
                            e.$emit("init", e), t && e.$emit("reinit", e);
                        })
                        .catch(function (t) {
                            e.fadetoast({
                                type: "error",
                                text: "很抱歉，验证码服务异常，请您稍后再试！",
                            }),
                                (e.initstate = !1),
                                e.$emit("init", e),
                                e.log.err("queryProcess", t);
                        });
                },
                getSecondState: function (t) {
                    var e = this,
                        n = this.zsetSeq("queryProcess", "", {
                            smsServiceCode: this.serviceChannel,
                        });
                    tt(n)
                        .then(function (n) {
                            if (!n || !n.data || !n.data.encryptData || "0000" != n.code)
                                return (
                                    (e.zinitstate = !1),
                                    (e.zinitdesc =
                                        (n && n.desc) ||
                                        "很抱歉，暂时无法为您服务，感谢您的使用，请稍后再试！"),
                                    void e.log.err("queryProcess", n)
                                );
                            e.zinitstate = !0;
                            var r = JSON.parse(O(n.data.encryptData));
                            switch (
                                (e.log.warn("opt", r),
                                (e.zcount = Number(r.smsSendingInterval) + 1),
                                (e.zcountVoice = Number(r.voiceSendingInterval) + 1),
                                (e.zcountInit = Number(r.upSendingInterval) + 1),
                                (e.zcountDownTime =
                                    r.smsSendingInterval &&
                                    1e3 * (Number(r.smsSendingInterval) + 1)),
                                (e.zcountDownTimeVoice =
                                    r.voiceSendingInterval &&
                                    1e3 * (Number(r.voiceSendingInterval) + 1)),
                                (e.zcountDownTimeInit =
                                    r.upSendingInterval && 1e3 * (Number(r.upSendingInterval) + 1)),
                                (e.zsmsCodeRule = r.smsCodeRule),
                                (e.zvoiceCodeRule = r.voiceCodeRule),
                                (e.isGraphicSms = "1" === r.isGraphicVerificationCodeBySms),
                                (e.isGraphicVoice = "1" === r.isGraphicVerificationCodeByVoice),
                                (e.symbol = r.flag),
                                e.symbol)
                            ) {
                                case "1":
                                    (e.zflagSMS = !0),
                                        (e.zflagVoice = !0),
                                        (e.zflagInitiative = !1),
                                        e.initCount("zsms"),
                                        e.initCount("zvoice"),
                                        e.zswitchRule("zsms", e.zsmsCodeRule),
                                        (e.zcheckInterNo = "checkSmsCode"),
                                        (e.zshowWhole = !0),
                                        (e.zshowInput = !0),
                                        (e.zshowNone = !1);
                                    break;
                                case "2":
                                    (e.zflagSMS = !0),
                                        (e.zflagVoice = !1),
                                        (e.zflagInitiative = !0),
                                        e.initCount("zsms"),
                                        e.initCount("zinit"),
                                        e.zswitchRule("zsms", e.zsmsCodeRule),
                                        (e.zcheckInterNo = "checkSmsCode"),
                                        (e.zshowWhole = !0),
                                        (e.zshowInput = !0),
                                        (e.zshowNone = !1);
                                    break;
                                case "3":
                                    (e.zflagSMS = !0),
                                        (e.zflagVoice = !1),
                                        (e.zflagInitiative = !1),
                                        e.initCount("zsms"),
                                        e.zswitchRule("zsms", e.zsmsCodeRule),
                                        (e.zcheckInterNo = "checkSmsCode"),
                                        (e.zshowWhole = !0),
                                        (e.zshowInput = !0),
                                        (e.zshowNone = !1);
                                    break;
                                case "4":
                                    (e.zflagVoice = !0),
                                        (e.zflagSMS = !1),
                                        (e.zflagInitiative = !1),
                                        e.initCount("zvoice"),
                                        e.zswitchRule("zvoice", e.zvoiceCodeRule),
                                        (e.zcheckInterNo = "checkVoice"),
                                        (e.zshowWhole = !0),
                                        (e.zshowInput = !0),
                                        (e.zshowNone = !1);
                                    break;
                                case "5":
                                    (e.zflagInitiative = !0),
                                        (e.zflagVoice = !1),
                                        (e.zflagSMS = !1),
                                        e.initCount("zinit"),
                                        e.zswitchRule("zsms", 4),
                                        (e.zcheckInterNo = "checkInitiative"),
                                        (e.zshowInput = !1),
                                        (e.zshowWhole = !0),
                                        (e.zshowNone = !1);
                                    break;
                                case "6":
                                    (e.zflagSMS = !1),
                                        (e.zflagVoice = !1),
                                        (e.zflagInitiative = !1),
                                        (e.zcheckInterNo = ""),
                                        (e.zshowWhole = !1),
                                        (e.zshowInput = !1),
                                        (e.zshowNone = !0),
                                        e.log.warn("queryProcess", "验证码未配置或为关闭");
                                    break;
                                default:
                                    (e.zflagSMS = !1),
                                        (e.zflagVoice = !1),
                                        (e.zflagInitiative = !1),
                                        (e.zcheckInterNo = ""),
                                        (e.zshowWhole = !1),
                                        (e.zshowInput = !1),
                                        (e.zshowNone = !0),
                                        e.fadetoast({
                                            type: "error",
                                            text: "很抱歉，未获取到验证码服务状态，请您稍后再试！",
                                        }),
                                        (e.zinitstate = !1);
                            }
                            e.showImgCode && e.changeImg(),
                                e.$emit("reset", e),
                                t && e.$emit("reinit", e);
                        })
                        .catch(function (t) {
                            e.fadetoast({
                                type: "error",
                                text: "很抱歉，验证码服务异常，请您稍后再试！",
                            }),
                                (e.zinitstate = !1),
                                e.$emit("reset", e),
                                e.log.err("queryProcess", t);
                        });
                },
                switchRule: function (t, e) {
                    "sms" == t
                        ? ((this.maxlength = Number(e)),
                          (this.letterallow = !1),
                          (this.inputtype = "tel"))
                        : ((this.maxlength = "1" == e ? 4 : "2" == e || "3" == e ? 6 : 4),
                          "3" == e
                              ? ((this.letterallow = !0), (this.inputtype = "text"))
                              : ((this.letterallow = !1), (this.inputtype = "tel"))),
                        this.inputLength && (this.maxlength = Number(this.inputLength));
                },
                zswitchRule: function (t, e) {
                    "zsms" == t
                        ? ((this.zmaxlength = Number(e)),
                          (this.zletterallow = !1),
                          (this.zinputtype = "tel"))
                        : ((this.zmaxlength = "1" == e ? 4 : "2" == e || "3" == e ? 6 : 4),
                          "3" == e
                              ? ((this.zletterallow = !0), (this.zinputtype = "text"))
                              : ((this.zletterallow = !1), (this.zinputtype = "tel"))),
                        this.inputLength && (this.zmaxlength = Number(this.inputLength));
                },
                copyClip: function (t) {
                    this.copyValue = t.target.innerText;
                },
                openSMS: function (t, e) {
                    var n = this;
                    this.log.info("发送短信", e),
                        this.$emit("openSMS"),
                        ms.appVersion() >= 9
                            ? "undefined" != typeof ms &&
                              ms
                                  .sendSMS({
                                      phoneNumber: [t],
                                      smsBody: e,
                                  })
                                  .then()
                                  .catch(function (t) {
                                      n.log.err("发送短信异常", t.data),
                                          "11" == t.data.status
                                              ? ms.openSystemSetting()
                                              : n.fadetoast({
                                                    type: "error",
                                                    text: "发送短信异常",
                                                });
                                  })
                            : this.fadetoast({
                                  type: "error",
                                  text: "您当前应用版本过低，请您更新至9.0及以上应用版本",
                              });
                },
                countStore: function (t) {
                    var e = sessionStorage.getItem(t);
                    return e && Date.parse(JSON.parse(e));
                },
                initCount: function (t) {
                    var e = this;
                    if ("sms" == t) {
                        this.cookiesTime = this.countStore("sms".concat(this.serviceCode));
                        var n = Date.now();
                        (this.countDownTime = this.cookiesTime - n),
                            (this.showSend = !0),
                            this.countDownTime <= 0
                                ? this.countFinish("sms")
                                : ((this.btnDisabled = !0),
                                  (this.countShow = !0),
                                  (this.timer = setInterval(function () {
                                      var t = Date.now();
                                      (e.countDownTime = e.cookiesTime - t),
                                          e.countDownTime <= 0 && e.countFinish("sms");
                                  }, 1e3)));
                    }
                    if ("voice" == t) {
                        this.cookiesTimeVoice = this.countStore("voice".concat(this.serviceCode));
                        var r = Date.now();
                        (this.countDownTimeVoice = this.cookiesTimeVoice - r),
                            (this.showVoice = !0),
                            this.countDownTimeVoice <= 0
                                ? this.countFinish("voice")
                                : ((this.btnDisabledVoice = !0),
                                  (this.countShowVoice = !0),
                                  (this.timerVoice = setInterval(function () {
                                      var t = Date.now();
                                      (e.countDownTimeVoice = e.cookiesTimeVoice - t),
                                          e.countDownTimeVoice <= 0 && e.countFinish("voice");
                                  }, 1e3)));
                    }
                    if ("init" == t) {
                        this.cookiesTimeInit = this.countStore("moti".concat(this.serviceCode));
                        var i = Date.now();
                        (this.countDownTimeInit = this.cookiesTimeInit - i),
                            (this.showInitiative = !0),
                            this.countDownTimeInit <= 0
                                ? this.countFinish("init")
                                : ((this.btnDisabledInit = !0),
                                  (this.countShowInit = !0),
                                  (this.timerInit = setInterval(function () {
                                      var t = Date.now();
                                      (e.countDownTimeInit = e.cookiesTimeInit - t),
                                          e.countDownTimeInit <= 0 && e.countFinish("init");
                                  }, 1e3)));
                    }
                    if ("zsms" == t) {
                        this.zcookiesTime = this.countStore("zsms".concat(this.serviceChannel));
                        var o = Date.now();
                        (this.zcountDownTime = this.zcookiesTime - o),
                            (this.zshowSend = !0),
                            this.zcountDownTime <= 0
                                ? this.countFinish("zsms")
                                : ((this.zbtnDisabled = !0),
                                  (this.zcountShow = !0),
                                  (this.ztimer = setInterval(function () {
                                      var t = Date.now();
                                      (e.zcountDownTime = e.zcookiesTime - t),
                                          e.zcountDownTime <= 0 && e.countFinish("zsms");
                                  }, 1e3)));
                    }
                    if ("zvoice" == t) {
                        this.zcookiesTimeVoice = this.countStore(
                            "zvoice".concat(this.serviceChannel)
                        );
                        var a = Date.now();
                        (this.zcountDownTimeVoice = this.zcookiesTimeVoice - a),
                            (this.zshowVoice = !0),
                            this.zcountDownTimeVoice <= 0
                                ? this.countFinish("zvoice")
                                : ((this.zbtnDisabledVoice = !0),
                                  (this.zcountShowVoice = !0),
                                  (this.ztimerVoice = setInterval(function () {
                                      var t = Date.now();
                                      (e.zcountDownTimeVoice = e.zcookiesTimeVoice - t),
                                          e.zcountDownTimeVoice <= 0 && e.countFinish("zvoice");
                                  }, 1e3)));
                    }
                    if ("zinit" == t) {
                        this.zcookiesTimeInit = this.countStore(
                            "zmoti".concat(this.serviceChannel)
                        );
                        var s = Date.now();
                        (this.zcountDownTimeInit = this.zcookiesTimeInit - s),
                            (this.zshowInitiative = !0),
                            this.zcountDownTimeInit <= 0
                                ? this.countFinish("zinit")
                                : ((this.zbtnDisabledInit = !0),
                                  (this.zcountShowInit = !0),
                                  (this.ztimerInit = setInterval(function () {
                                      var t = Date.now();
                                      (e.zcountDownTimeInit = e.zcookiesTimeInit - t),
                                          e.zcountDownTimeInit <= 0 && e.countFinish("zinit");
                                  }, 1e3)));
                    }
                },
                receiving: function (t, e, n) {
                    var r = this;
                    (n = 1e3 * Number(n)),
                        setTimeout(function () {
                            var n, i;
                            if (
                                !(r.second
                                    ? (null === (n = r.syncCode) || void 0 === n
                                          ? void 0
                                          : n.length) > 0
                                    : (null === (i = r.inputVal) || void 0 === i
                                          ? void 0
                                          : i.length) > 0)
                            ) {
                                var o = r.setSeq("usersmsstate", "", {
                                    smsServiceCode: r.second ? r.serviceChannel : r.serviceCode,
                                    mobile: e,
                                    seqid: t,
                                });
                                tt(o).then(function (t) {
                                    var e = t.code,
                                        n = t.data;
                                    if (t && n && n.encryptData && "0000" == e) {
                                        var i = JSON.parse(O(t.data.encryptData));
                                        r.log.info("usersmsstate", i), r.$emit("usersmsstate", i);
                                        var o = i.flag,
                                            a = i.content,
                                            s = i.smsCode,
                                            c = i.link;
                                        switch (o) {
                                            case "1":
                                            case "2":
                                                dt.modal({
                                                    version: r.version,
                                                    content: a,
                                                    surebtntxt: "我知道了",
                                                    confirm: function () {
                                                        r.$emit("stateConfirm");
                                                    },
                                                    cancel: function () {
                                                        r.$emit("stateCancel");
                                                    },
                                                });
                                                break;
                                            case "3":
                                                dt.modal({
                                                    version: r.version,
                                                    content: a,
                                                    cancelbtntxt: "取消",
                                                    surebtntxt: "前往发送短信",
                                                    closeOnConfirm: !1,
                                                    confirm: function () {
                                                        r.$emit("stateConfirm"),
                                                            r.$emit("stateOpenSMS"),
                                                            r.openSMS("10010", s);
                                                    },
                                                    cancel: function () {
                                                        r.$emit("stateCancel");
                                                    },
                                                });
                                                break;
                                            case "4":
                                                dt.modal({
                                                    version: r.version,
                                                    content: a,
                                                    cancelbtntxt: "取消",
                                                    surebtntxt: "去交费",
                                                    closeOnConfirm: !1,
                                                    confirm: function () {
                                                        r.$emit("stateConfirm"),
                                                            r.$emit("stateOpenLink"),
                                                            ms.navigateTo({
                                                                target: c,
                                                            });
                                                    },
                                                    cancel: function () {
                                                        r.$emit("stateCancel");
                                                    },
                                                });
                                                break;
                                            default:
                                                return;
                                        }
                                    } else r.log.err("usersmsstate", t);
                                });
                            }
                        }, n);
                },
                handleGetSMSCode: function () {
                    var t = this;
                    if ((this.$emit("sendSmsClick"), !this.btnDisabled)) {
                        var e = this.setSeq("sendSms", "", {
                            smsServiceCode: this.serviceCode,
                        });
                        (this.btnDisabled = !0),
                            this.$refs.realinputcode.focus(),
                            tt(e)
                                .then(function (e) {
                                    if (!e || "0000" != e.code)
                                        return (
                                            t.fadetoast({
                                                type: "error",
                                                text:
                                                    e.desc ||
                                                    "很抱歉暂无法获取短信验证码，请稍后再试！",
                                            }),
                                            void (t.btnDisabled = !1)
                                        );
                                    if (
                                        (t.$emit("sendSms"),
                                        t.fadetoast({
                                            type: "success",
                                            text: e.desc || "发送成功",
                                            mask: !1,
                                        }),
                                        t.switchRule("sms", t.smsCodeRule),
                                        (t.virginseek = !1),
                                        (t.checkInterNo = "checkSmsCode"),
                                        e.data && e.data.encryptData && "WT" !== t.version)
                                    ) {
                                        var n = JSON.parse(O(e.data.encryptData));
                                        t.log.info("sendSms res", n),
                                            t.receiving(e.seq, "", n.time);
                                    }
                                    clearInterval(t.timer);
                                    var r = new Date(new Date().getTime() + 1e3 * t.count);
                                    sessionStorage.setItem(
                                        "sms".concat(t.serviceCode),
                                        JSON.stringify(r)
                                    ),
                                        (t.cookiesTime = Date.parse(r)),
                                        (t.countShow = !0);
                                    var i = Date.now();
                                    (t.countDownTime = t.cookiesTime - i),
                                        (t.timer = setInterval(function () {
                                            (i = Date.now()),
                                                (t.countDownTime = t.cookiesTime - i),
                                                t.countDownTime <= 0 && t.countFinish("sms");
                                        }, 1e3));
                                })
                                .catch(function (e) {
                                    (t.btnDisabled = !1),
                                        t.log.err("sendSms", e),
                                        t.fadetoast({
                                            type: "error",
                                            text: "很抱歉，获取短信验证码异常，请稍后再试！",
                                        });
                                });
                    }
                },
                handleGetVoiceCode: function () {
                    var t = this;
                    if ((this.$emit("sendVoiceClick"), !this.btnDisabledVoice)) {
                        var e = this.setSeq("sendVoice", "", {
                            smsServiceCode: this.serviceCode,
                        });
                        (this.btnDisabledVoice = !0),
                            this.$refs.realinputcode.focus(),
                            tt(e)
                                .then(function (e) {
                                    if (!e || "0000" != e.code) {
                                        var n = "GGYZM10019" == e.code;
                                        return (
                                            t.fadetoast({
                                                inline: n,
                                                type: "error",
                                                text:
                                                    e.desc ||
                                                    "很抱歉暂无法获取到语音验证码，请稍后再试！",
                                            }),
                                            void (n ? t.getBtnState(!0) : (t.btnDisabledVoice = !1))
                                        );
                                    }
                                    t.$emit("sendVoice"),
                                        t.fadetoast({
                                            type: "success",
                                            text: e.desc || "发送成功，请注意接听",
                                            mask: !1,
                                        }),
                                        t.switchRule("voice", t.voiceCodeRule),
                                        (t.virginseekVoice = !1),
                                        (t.checkInterNo = "checkVoice"),
                                        clearInterval(t.timerVoice);
                                    var r = new Date(new Date().getTime() + 1e3 * t.countVoice);
                                    sessionStorage.setItem(
                                        "voice".concat(t.serviceCode),
                                        JSON.stringify(r)
                                    ),
                                        (t.cookiesTimeVoice = Date.parse(r)),
                                        (t.countShowVoice = !0);
                                    var i = Date.now();
                                    (t.countDownTimeVoice = t.cookiesTimeVoice - i),
                                        (t.timerVoice = setInterval(function () {
                                            (i = Date.now()),
                                                (t.countDownTimeVoice = t.cookiesTimeVoice - i),
                                                t.countDownTimeVoice <= 0 && t.countFinish("voice");
                                        }, 1e3));
                                })
                                .catch(function (e) {
                                    (t.btnDisabledVoice = !1),
                                        t.log.err("sendVoice", e),
                                        t.fadetoast({
                                            type: "error",
                                            text: "很抱歉，获取语音验证码异常，请稍后再试！",
                                        });
                                });
                    }
                },
                handleGetInitCode: function () {
                    var t = this;
                    if ((this.$emit("initiativeSendClick"), !this.btnDisabledInit)) {
                        var e = this.setSeq("initiativeSend", "", {
                            smsServiceCode: this.serviceCode,
                        });
                        (this.btnDisabledInit = !0),
                            tt(e)
                                .then(function (e) {
                                    if (!e || !e.data || !e.data.encryptData || "0000" != e.code) {
                                        var n = "GGYZM10032" == e.code;
                                        return (
                                            t.fadetoast({
                                                inline: n,
                                                type: "error",
                                                text:
                                                    e.desc ||
                                                    "很抱歉暂无法获取到动态验证码，请稍后再试！",
                                            }),
                                            void (n ? t.getBtnState(!0) : (t.btnDisabledInit = !1))
                                        );
                                    }
                                    t.$emit("initiativeSend"),
                                        t.switchRule("sms", t.smsCodeRule),
                                        (t.virginseekInit = !1),
                                        (t.checkInterNo = "checkInitiative");
                                    var r = JSON.parse(O(e.data.encryptData));
                                    t.log.info("initiativeSend", r), (t.motionCode = r.smsCode);
                                    var i = new RegExp(t.motionCode, "ig"),
                                        o = new RegExp("一键发送", "ig"),
                                        a = r.smsContent.replace(
                                            i,
                                            "<font "
                                                .concat(
                                                    r.colour
                                                        ? ' style="color:' + r.colour + '"'
                                                        : "",
                                                    '" role="button" class="vcopy copytxt" >'
                                                )
                                                .concat(t.motionCode, "</font>")
                                        );
                                    (t.smscopyhtml = a.replace(
                                        o,
                                        "<font ".concat(
                                            r.colour ? ' style="color:' + r.colour + '"' : "",
                                            '" role="button" class="vcopy copybtn" id="copybtn"><a href="javascript:;">一键发送</a></font>'
                                        )
                                    )),
                                        t.isInApp &&
                                            t.$nextTick(function () {
                                                t.$refs.smshtml.children[1].addEventListener(
                                                    "click",
                                                    function (e) {
                                                        t.openSMS("10010", t.motionCode);
                                                    }
                                                );
                                            }),
                                        (t.clipboard = new (it())(".copytxt", {
                                            target: function (t) {
                                                return t;
                                            },
                                            text: function (t) {
                                                return t.innerText;
                                            },
                                        })),
                                        t.clipboard.on("success", function (e) {
                                            e.clearSelection(),
                                                t.$emit("clipboard"),
                                                t.fadetoast({
                                                    type: "success",
                                                    text: "复制成功",
                                                    duration: 1500,
                                                });
                                        }),
                                        t.clipboard.on("error", function (e) {
                                            t.log.err("clipboard e:", e),
                                                t.$emit("clipboard"),
                                                t.fadetoast({
                                                    type: "error",
                                                    text: "复制失败, 请尝试手动复制或输入",
                                                    duration: 1500,
                                                });
                                        }),
                                        clearInterval(t.timerInit);
                                    var s = new Date(new Date().getTime() + 1e3 * t.countInit);
                                    sessionStorage.setItem(
                                        "moti".concat(t.serviceCode),
                                        JSON.stringify(s)
                                    ),
                                        (t.cookiesTimeInit = Date.parse(s)),
                                        (t.countShowInit = !0);
                                    var c = Date.now();
                                    (t.countDownTimeInit = t.cookiesTimeInit - c),
                                        (t.timerInit = setInterval(function () {
                                            (c = Date.now()),
                                                (t.countDownTimeInit = t.cookiesTimeInit - c),
                                                t.countDownTimeInit <= 0 && t.countFinish("init");
                                        }, 1e3));
                                })
                                .catch(function (e) {
                                    (t.btnDisabledInit = !1),
                                        t.log.err("initiativeSend", e),
                                        t.fadetoast({
                                            type: "error",
                                            text: "很抱歉，获取动态验证码异常，请稍后再试！",
                                        });
                                });
                    }
                },
                zhandleGetSMSCode: function () {
                    var t = this;
                    if (
                        (this.$emit("sendSmsClick"),
                        !new RegExp("^1[3-9]\\d{9}$", "ig").test(this.syncPhone))
                    )
                        return (
                            this.fadetoast({
                                type: "error",
                                text: "请输入正确的手机号码！",
                                mask: !1,
                            }),
                            void (this.showModal = !1)
                        );
                    var e = new RegExp("[\\d]{4}", "ig");
                    if (this.showImgCode && !e.test(this.syncImgCode))
                        return (
                            this.fadetoast({
                                type: "error",
                                text: "请输入正确的图形验证码！",
                            }),
                            void (this.showModal = !1)
                        );
                    if (this.diffPhone)
                        return (
                            this.fadetoast({
                                type: "info",
                                text: this.diffDesc,
                                mask: !1,
                            }),
                            void (this.showModal = !1)
                        );
                    if (!this.zbtnDisabled) {
                        var n = this.zsetSeq("sendSms", "", {
                            smsServiceCode: this.serviceChannel,
                            mobile: this.syncPhone,
                            imgCode: this.syncImgCode,
                        });
                        (this.zbtnDisabled = !0),
                            this.$refs.zrealinputcode.focus(),
                            tt(n)
                                .then(function (e) {
                                    if (!e || "0000" != e.code)
                                        return (
                                            t.fadetoast({
                                                type: "error",
                                                text:
                                                    e.desc ||
                                                    "很抱歉暂无法获取短信验证码，请稍后再试！",
                                            }),
                                            void (t.zbtnDisabled = !1)
                                        );
                                    if (
                                        (t.$emit("sendSmsS"),
                                        t.fadetoast({
                                            type: "success",
                                            text: e.desc || "发送成功",
                                            mask: !1,
                                        }),
                                        t.zswitchRule("zsms", t.zsmsCodeRule),
                                        (t.zvirginseek = !1),
                                        (t.zcheckInterNo = "checkSmsCode"),
                                        e.data && e.data.encryptData && "WT" !== t.version)
                                    ) {
                                        var n = JSON.parse(O(e.data.encryptData));
                                        t.log.info("sendSms res", n),
                                            t.receiving(e.seq, t.syncPhone, n.time);
                                    }
                                    clearInterval(t.ztimer);
                                    var r = new Date(new Date().getTime() + 1e3 * t.zcount);
                                    sessionStorage.setItem(
                                        "zsms".concat(t.serviceChannel),
                                        JSON.stringify(r)
                                    ),
                                        (t.zcookiesTime = Date.parse(r)),
                                        (t.zcountShow = !0);
                                    var i = Date.now();
                                    (t.zcountDownTime = t.zcookiesTime - i),
                                        (t.ztimer = setInterval(function () {
                                            (i = Date.now()),
                                                (t.zcountDownTime = t.zcookiesTime - i),
                                                t.zcountDownTime <= 0 && t.countFinish("zsms");
                                        }, 1e3));
                                })
                                .catch(function (e) {
                                    (t.zbtnDisabled = !1),
                                        t.log.err("sendSms", e),
                                        t.fadetoast({
                                            type: "error",
                                            text: "很抱歉，获取短信验证码异常，请稍后再试！",
                                        });
                                });
                    }
                },
                zhandleGetVoiceCode: function () {
                    var t = this;
                    if (
                        (this.$emit("sendVoiceClick"),
                        !new RegExp("^1[3-9]\\d{9}$", "ig").test(this.syncPhone))
                    )
                        return (
                            this.fadetoast({
                                type: "error",
                                text: "请输入正确的手机号码！",
                                mask: !1,
                            }),
                            void (this.showModal = !1)
                        );
                    var e = new RegExp("[\\d]{4}", "ig");
                    if (this.showImgCode && !e.test(this.syncImgCode))
                        return (
                            this.fadetoast({
                                type: "error",
                                text: "请输入正确的图形验证码！",
                            }),
                            void (this.showModal = !1)
                        );
                    if (this.diffPhone)
                        return (
                            this.fadetoast({
                                type: "info",
                                text: this.diffDesc,
                                mask: !1,
                            }),
                            void (this.showModal = !1)
                        );
                    if (!this.zbtnDisabledVoice) {
                        var n = this.zsetSeq("sendVoice", "", {
                            smsServiceCode: this.serviceChannel,
                            mobile: this.syncPhone,
                            imgCode: this.syncImgCode,
                        });
                        (this.zbtnDisabledVoice = !0),
                            this.$refs.zrealinputcode.focus(),
                            tt(n)
                                .then(function (e) {
                                    if (!e || "0000" != e.code) {
                                        var n = "GGYZM10019" == e.code;
                                        return (
                                            t.fadetoast({
                                                inline: n,
                                                type: "error",
                                                text:
                                                    e.desc ||
                                                    "很抱歉暂无法获取到语音验证码，请稍后再试！",
                                            }),
                                            void (n
                                                ? t.getSecondState(!0)
                                                : (t.zbtnDisabledVoice = !1))
                                        );
                                    }
                                    t.$emit("sendVoiceS"),
                                        t.fadetoast({
                                            type: "success",
                                            text: e.desc || "发送成功，请注意接听",
                                            mask: !1,
                                        }),
                                        t.zswitchRule("zvoice", t.zvoiceCodeRule),
                                        (t.zvirginseekVoice = !1),
                                        (t.zcheckInterNo = "checkVoice"),
                                        clearInterval(t.ztimerVoice);
                                    var r = new Date(new Date().getTime() + 1e3 * t.zcountVoice);
                                    sessionStorage.setItem(
                                        "zvoice".concat(t.serviceChannel),
                                        JSON.stringify(r)
                                    ),
                                        (t.zcookiesTimeVoice = Date.parse(r)),
                                        (t.zcountShowVoice = !0);
                                    var i = Date.now();
                                    (t.zcountDownTimeVoice = t.zcookiesTimeVoice - i),
                                        (t.ztimerVoice = setInterval(function () {
                                            (i = Date.now()),
                                                (t.zcountDownTimeVoice = t.zcookiesTimeVoice - i),
                                                t.zcountDownTimeVoice <= 0 &&
                                                    t.countFinish("zvoice");
                                        }, 1e3));
                                })
                                .catch(function (e) {
                                    (t.zbtnDisabledVoice = !1),
                                        t.log.err("sendVoice", e),
                                        t.fadetoast({
                                            type: "error",
                                            text: "很抱歉，获取语音验证码异常，请稍后再试！",
                                        });
                                });
                    }
                },
                zhandleGetInitCode: function () {
                    var t = this;
                    if (
                        (this.$emit("initiativeSendClick"),
                        !new RegExp("^1[3-9]\\d{9}$", "ig").test(this.syncPhone))
                    )
                        return (
                            this.fadetoast({
                                type: "error",
                                text: "请输入正确的手机号码！",
                                mask: !1,
                            }),
                            void (this.showModal = !1)
                        );
                    if (this.diffPhone)
                        return (
                            this.fadetoast({
                                type: "info",
                                text: this.diffDesc,
                                mask: !1,
                            }),
                            void (this.showModal = !1)
                        );
                    if (!this.zbtnDisabledInit) {
                        var e = this.zsetSeq("initiativeSend", "", {
                            smsServiceCode: this.serviceChannel,
                            mobile: this.syncPhone,
                        });
                        (this.zbtnDisabledInit = !0),
                            tt(e)
                                .then(function (e) {
                                    if (!e || !e.data || !e.data.encryptData || "0000" != e.code) {
                                        var n = "GGYZM10032" == e.code;
                                        return (
                                            t.fadetoast({
                                                inline: n,
                                                type: "error",
                                                text:
                                                    e.desc ||
                                                    "很抱歉暂无法获取到动态验证码，请稍后再试！",
                                            }),
                                            void (n
                                                ? t.getSecondState(!0)
                                                : (t.zbtnDisabledInit = !1))
                                        );
                                    }
                                    t.$emit("initiativeSendS"),
                                        t.zswitchRule("zsms", t.zsmsCodeRule),
                                        (t.zvirginseekInit = !1),
                                        (t.zcheckInterNo = "checkInitiative");
                                    var r = JSON.parse(O(e.data.encryptData));
                                    t.log.info("initiativeSend", r), (t.zmotionCode = r.smsCode);
                                    var i = new RegExp(t.zmotionCode, "ig"),
                                        o = new RegExp("一键发送", "ig"),
                                        a = r.smsContent.replace(
                                            i,
                                            "<font "
                                                .concat(
                                                    r.colour
                                                        ? ' style="color:' + r.colour + '"'
                                                        : "",
                                                    '" class="vcopy zcopytxt" >'
                                                )
                                                .concat(t.zmotionCode, "</font>")
                                        );
                                    (t.zsmscopyhtml = a.replace(
                                        o,
                                        "<font ".concat(
                                            r.colour ? ' style="color:' + r.colour + '"' : "",
                                            '" class="vcopy copybtn" id="copybtn" ><a href="javascript:;">一键发送</a></font>'
                                        )
                                    )),
                                        t.isInApp &&
                                            t.$nextTick(function () {
                                                t.$refs.zsmshtml.children[1].addEventListener(
                                                    "click",
                                                    function (e) {
                                                        t.openSMS("10010", t.zmotionCode);
                                                    }
                                                );
                                            }),
                                        (t.zclipboard = new (it())(".zcopytxt", {
                                            target: function (t) {
                                                return t;
                                            },
                                            text: function (t) {
                                                return t.innerText;
                                            },
                                        })),
                                        t.zclipboard.on("success", function (e) {
                                            e.clearSelection(),
                                                t.$emit("clipboard"),
                                                t.fadetoast({
                                                    type: "success",
                                                    text: "复制成功",
                                                    duration: 1500,
                                                });
                                        }),
                                        t.zclipboard.on("error", function (e) {
                                            t.log.err("clipboard e:", e),
                                                t.$emit("clipboard"),
                                                t.fadetoast({
                                                    type: "error",
                                                    text: "复制失败, 请尝试手动复制或输入",
                                                    duration: 1500,
                                                });
                                        }),
                                        clearInterval(t.ztimerInit);
                                    var s = new Date(new Date().getTime() + 1e3 * t.zcountInit);
                                    sessionStorage.setItem(
                                        "zmoti".concat(t.serviceChannel),
                                        JSON.stringify(s)
                                    ),
                                        (t.zcookiesTimeInit = Date.parse(s)),
                                        (t.zcountShowInit = !0);
                                    var c = Date.now();
                                    (t.zcountDownTimeInit = t.zcookiesTimeInit - c),
                                        (t.timerInit = setInterval(function () {
                                            (c = Date.now()),
                                                (t.zcountDownTimeInit = t.zcookiesTimeInit - c),
                                                t.zcountDownTimeInit <= 0 && t.countFinish("zinit");
                                        }, 1e3)),
                                        t.okcheck();
                                })
                                .catch(function (e) {
                                    (t.zbtnDisabledInit = !1),
                                        t.log.err("initiativeSend", e),
                                        t.fadetoast({
                                            type: "error",
                                            text: "很抱歉，获取动态验证码异常，请稍后再试！",
                                        });
                                });
                    }
                },
                countFinish: function (t) {
                    "sms" == t &&
                        (clearInterval(this.timer),
                        (this.countDownTime = 1e3 * this.count),
                        (this.countShow = !1),
                        (this.btnDisabled = !1)),
                        "voice" == t &&
                            (clearInterval(this.timerVoice),
                            (this.countDownTimeVoice = 1e3 * this.countVoice),
                            (this.countShowVoice = !1),
                            (this.btnDisabledVoice = !1)),
                        "init" == t &&
                            (clearInterval(this.timerInit),
                            (this.countDownTimeInit = 1e3 * this.countInit),
                            (this.countShowInit = !1),
                            (this.btnDisabledInit = !1)),
                        "zsms" == t &&
                            (clearInterval(this.ztimer),
                            (this.zcountDownTime = 1e3 * this.zcount),
                            (this.zcountShow = !1),
                            (this.zbtnDisabled = !1)),
                        "zvoice" == t &&
                            (clearInterval(this.ztimerVoice),
                            (this.zcountDownTimeVoice = 1e3 * this.zcountVoice),
                            (this.zcountShowVoice = !1),
                            (this.zbtnDisabledVoice = !1)),
                        "zinit" == t &&
                            (clearInterval(this.ztimerInit),
                            (this.zcountDownTimeInit = 1e3 * this.zcountInit),
                            (this.zcountShowInit = !1),
                            (this.zbtnDisabledInit = !1));
                },
                sec: function (t) {
                    return parseInt(t / 1e3);
                },
                setSeq: function (t, e, n) {
                    var r = this.LogTime({
                        type: "point",
                    });
                    return (
                        e ||
                            (e = this.reqphone
                                ? this.reqphone
                                : -1 != window.location.host.indexOf("localhost")
                                ? E("yacemobile") || this.cookiePhone
                                : this.cookiePhone ||
                                  P(this.getCookie("u_account")) ||
                                  this.getCookie("WT")),
                        this.productId && (n.productId = I(this.productId)),
                        this.soleId && (n.soleId = this.soleId),
                        this.log.info(
                            "req",
                            "productId:",
                            this.productId,
                            "soleId:",
                            this.soleId,
                            n
                        ),
                        {
                            interNo: t,
                            reqTime: r.reqTime,
                            encryptData: A(JSON.stringify(n)),
                            seq: ""
                                .concat(t, "_")
                                .concat(r.seqTime, "_")
                                .concat(this.randomString(6), "_")
                                .concat(e ? e.slice(e.length - 4) : ""),
                        }
                    );
                },
                zsetSeq: function (t, e, n) {
                    var r = this.LogTime({
                        type: "point",
                    });
                    return (
                        e || (e = this.syncPhone),
                        this.productId && (n.productId = I(this.productId)),
                        this.soleId && (n.soleId = this.soleId),
                        this.log.info(
                            "req",
                            "productId:",
                            this.productId,
                            "soleId:",
                            this.soleId,
                            n
                        ),
                        {
                            interNo: t,
                            reqTime: r.reqTime,
                            encryptData: A(JSON.stringify(n)),
                            seq: ""
                                .concat(t, "_")
                                .concat(r.seqTime, "_")
                                .concat(this.randomString(6), "_")
                                .concat(e ? e.slice(e.length - 4) : ""),
                        }
                    );
                },
                randomString: function (t) {
                    t = t || 32;
                    for (var e = "", n = 0; n < t; n++)
                        e += "0123456789".charAt(Math.floor(10 * Math.random()));
                    return e;
                },
                LogTime: function () {
                    var t =
                            arguments.length > 0 && void 0 !== arguments[0]
                                ? arguments[0]
                                : {
                                      date: "",
                                      type: "",
                                  },
                        e = (t.date, t.type),
                        n = t.date ? new Date(t.date) : new Date(),
                        r = n.getFullYear(),
                        i = n.getMonth() + 1;
                    i = i < 10 ? "0" + i : i;
                    var o = n.getDate();
                    o = o < 10 ? "0" + o : o;
                    var a = n.getHours();
                    a = a < 10 ? "0" + a : a;
                    var s = n.getMinutes();
                    s = s < 10 ? "0" + s : s;
                    var c = n.getSeconds();
                    c = c < 10 ? "0" + c : c;
                    var l = n.getMilliseconds();
                    switch (((l = l < 10 ? "0" + l : l), e)) {
                        case "-":
                            return [r, i, o].join("-");
                        case "utf8":
                            return r + "年" + i + "月" + o + "日 " + a + ":" + s + ":" + c;
                        case 1:
                            return [r, i, o, a, s, c, l].join("");
                        case "point":
                            return {
                                reqTime: n.getTime(),
                                seqTime: [r, i, o, a, s, c].join(""),
                            };
                        default:
                            return [r, i, o, a, s, c].join("");
                    }
                },
                getCookie: function (t) {
                    var e,
                        n = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
                    if ((e = document.cookie.match(n))) return unescape(e[2]);
                    var r = document.URL;
                    (r = (r = r.substring(r.indexOf("?")))
                        .replace(/#\//gi, "&")
                        .replace(/\?/gi, "&")),
                        (n = new RegExp("/".concat(t, "=([^&]+)($|[^&])/")));
                    var i = r.match(n);
                    return i ? unescape(i[2]) : null;
                },
                keyBoardKill: function () {
                    var t,
                        e = this;
                    if (!this.isiOS) {
                        var n = document.documentElement.clientHeight || document.body.clientHeight;
                        window.addEventListener(
                            "resize",
                            function () {
                                var t =
                                    document.documentElement.clientHeight ||
                                    document.body.clientHeight;
                                ("INPUT" !== document.activeElement.tagName &&
                                    "TEXTAREA" !== document.activeElement.tagName) ||
                                    window.setTimeout(function () {
                                        "scrollIntoView" in document.activeElement
                                            ? document.activeElement.scrollIntoView({
                                                  block: "end",
                                              })
                                            : document.activeElement.scrollIntoViewIfNeeded({
                                                  block: "end",
                                              });
                                    }, 10),
                                    n < t
                                        ? e.$emit("focusout", "Android")
                                        : e.$emit("focusin", "Android"),
                                    (n = t);
                            },
                            !1
                        );
                    }
                    if (!this.isiOS) return !1;
                    document.body.addEventListener("focusin", function () {
                        e.$emit("focusin", "iOS"), clearTimeout(t);
                    }),
                        document.body.addEventListener("focusout", function () {
                            e.$emit("focusout", "iOS"),
                                (t = setTimeout(function () {
                                    window.scrollTo({
                                        top: 0,
                                        left: 0,
                                        behavior: "smooth",
                                    });
                                }, 10));
                        });
                },
                loadJS: function (t, e) {
                    var n = document.createElement("script");
                    (n.type = "text/javascript"),
                        void 0 !== e &&
                            (n.readyState
                                ? (n.onreadystatechange = function () {
                                      ("loaded" != n.readyState && "complete" != n.readyState) ||
                                          ((n.onreadystatechange = null), e());
                                  })
                                : (n.onload = function () {
                                      e();
                                  })),
                        (n.src = t),
                        document.head.appendChild(n);
                },
            },
            destroyed: function () {
                this.clipboard && this.clipboard.destroy && this.clipboard.destroy();
            },
        },
        mt = n(72),
        gt = n.n(mt),
        yt = n(825),
        bt = n.n(yt),
        wt = n(659),
        xt = n.n(wt),
        St = n(56),
        Et = n.n(St),
        Tt = n(540),
        Ct = n.n(Tt),
        _t = n(113),
        kt = n.n(_t),
        Ot = n(2),
        At = {};
    (At.styleTagTransform = kt()),
        (At.setAttributes = Et()),
        (At.insert = xt().bind(null, "head")),
        (At.domAPI = bt()),
        (At.insertStyleElement = Ct()),
        gt()(Ot.A, At),
        Ot.A && Ot.A.locals && Ot.A.locals;
    var It = n(331),
        Pt = {};
    (Pt.styleTagTransform = kt()),
        (Pt.setAttributes = Et()),
        (Pt.insert = xt().bind(null, "head")),
        (Pt.domAPI = bt()),
        (Pt.insertStyleElement = Ct()),
        gt()(It.A, Pt),
        It.A && It.A.locals && It.A.locals;
    var Mt = n(200),
        Dt = {};
    (Dt.styleTagTransform = kt()),
        (Dt.setAttributes = Et()),
        (Dt.insert = xt().bind(null, "head")),
        (Dt.domAPI = bt()),
        (Dt.insertStyleElement = Ct()),
        gt()(Mt.A, Dt),
        Mt.A && Mt.A.locals && Mt.A.locals;
    var zt = (function (t, e, n, r, i, o, a, s) {
        var c,
            l = "function" == typeof t ? t.options : t;
        if (
            (e && ((l.render = e), (l.staticRenderFns = []), (l._compiled = !0)),
            (l._scopeId = "data-v-" + o),
            c)
        )
            if (l.functional) {
                l._injectStyles = c;
                var u = l.render;
                l.render = function (t, e) {
                    return c.call(e), u(t, e);
                };
            } else {
                var d = l.beforeCreate;
                l.beforeCreate = d ? [].concat(d, c) : [c];
            }
        return {
            exports: t,
            options: l,
        };
    })(
        vt,
        function () {
            var t = this,
                e = t.$createElement,
                n = t._self._c || e;
            return n(
                "div",
                {
                    directives: [
                        {
                            name: "show",
                            rawName: "v-show",
                            value: t.showUniVerify,
                            expression: "showUniVerify",
                        },
                    ],
                    staticClass: "veri-box",
                    class: {
                        "wt-veri": "WT" == t.version,
                        "point-none": t.showModal,
                        "pop-style": t.popupStyle,
                        dn: t.showNone,
                    },
                    style: {
                        "--size": t.size,
                    },
                },
                [
                    t._t("head"),
                    t._v(" "),
                    t.showWhole
                        ? n(
                              "div",
                              {
                                  staticClass: "real-veri-box",
                              },
                              [
                                  t.veriIntro
                                      ? n("div", {
                                            staticClass: "veri-title",
                                            domProps: {
                                                innerHTML: t._s(t.veriIntro),
                                            },
                                        })
                                      : t._e(),
                                  t._v(" "),
                                  n(
                                      "div",
                                      {
                                          directives: [
                                              {
                                                  name: "show",
                                                  rawName: "v-show",
                                                  value: t.showInput,
                                                  expression: "showInput",
                                              },
                                          ],
                                          staticClass: "veri-input",
                                          class: {
                                              mt0: !t.veriIntro,
                                          },
                                      },
                                      [
                                          "checkbox" === t.inputtype
                                              ? n("input", {
                                                    directives: [
                                                        {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value: t.inputVal,
                                                            expression: "inputVal",
                                                        },
                                                    ],
                                                    ref: "realinputcode",
                                                    attrs: {
                                                        role: "textbox",
                                                        maxlength: t.maxlength,
                                                        placeholder: "请输入验证码",
                                                        type: "checkbox",
                                                    },
                                                    domProps: {
                                                        checked: Array.isArray(t.inputVal)
                                                            ? t._i(t.inputVal, null) > -1
                                                            : t.inputVal,
                                                    },
                                                    on: {
                                                        focus: function (e) {
                                                            return t.inputCode("输入验证码");
                                                        },
                                                        input: t.setInput,
                                                        paste: t.setInput,
                                                        change: [
                                                            function (e) {
                                                                var n = t.inputVal,
                                                                    r = e.target,
                                                                    i = !!r.checked;
                                                                if (Array.isArray(n)) {
                                                                    var o = t._i(n, null);
                                                                    r.checked
                                                                        ? o < 0 &&
                                                                          (t.inputVal = n.concat([
                                                                              null,
                                                                          ]))
                                                                        : o > -1 &&
                                                                          (t.inputVal = n
                                                                              .slice(0, o)
                                                                              .concat(
                                                                                  n.slice(o + 1)
                                                                              ));
                                                                } else t.inputVal = i;
                                                            },
                                                            t.setInput,
                                                        ],
                                                    },
                                                })
                                              : "radio" === t.inputtype
                                              ? n("input", {
                                                    directives: [
                                                        {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value: t.inputVal,
                                                            expression: "inputVal",
                                                        },
                                                    ],
                                                    ref: "realinputcode",
                                                    attrs: {
                                                        role: "textbox",
                                                        maxlength: t.maxlength,
                                                        placeholder: "请输入验证码",
                                                        type: "radio",
                                                    },
                                                    domProps: {
                                                        checked: t._q(t.inputVal, null),
                                                    },
                                                    on: {
                                                        focus: function (e) {
                                                            return t.inputCode("输入验证码");
                                                        },
                                                        input: t.setInput,
                                                        paste: t.setInput,
                                                        change: [
                                                            function (e) {
                                                                t.inputVal = null;
                                                            },
                                                            t.setInput,
                                                        ],
                                                    },
                                                })
                                              : n("input", {
                                                    directives: [
                                                        {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value: t.inputVal,
                                                            expression: "inputVal",
                                                        },
                                                    ],
                                                    ref: "realinputcode",
                                                    attrs: {
                                                        role: "textbox",
                                                        maxlength: t.maxlength,
                                                        placeholder: "请输入验证码",
                                                        type: t.inputtype,
                                                    },
                                                    domProps: {
                                                        value: t.inputVal,
                                                    },
                                                    on: {
                                                        focus: function (e) {
                                                            return t.inputCode("输入验证码");
                                                        },
                                                        input: [
                                                            function (e) {
                                                                e.target.composing ||
                                                                    (t.inputVal = e.target.value);
                                                            },
                                                            t.setInput,
                                                        ],
                                                        paste: t.setInput,
                                                        change: t.setInput,
                                                    },
                                                }),
                                          t._v(" "),
                                          n(
                                              "div",
                                              {
                                                  directives: [
                                                      {
                                                          name: "show",
                                                          rawName: "v-show",
                                                          value: t.showSend && t.flagSMS,
                                                          expression: "showSend && flagSMS",
                                                      },
                                                  ],
                                                  staticClass: "veri-send",
                                                  class: {
                                                      counting: t.countShow,
                                                  },
                                                  attrs: {
                                                      role: "button",
                                                      "aria-atomic": "true",
                                                      "aria-label": t.countShow
                                                          ? t.sec(t.countDownTime) + "秒"
                                                          : t.virginseek
                                                          ? "获取验证码"
                                                          : "重新获取",
                                                      "data-storey": t.piwik.SMSCode.storey,
                                                      type: "button",
                                                      matomotriggerbutton: t.piwik.SMSCode.code,
                                                      value: t.piwik.SMSCode.value,
                                                      customdimension:
                                                          t.piwik.SMSCode.customdimension,
                                                  },
                                                  on: {
                                                      click: t.handleGetSMSCode,
                                                  },
                                              },
                                              [
                                                  t._v(
                                                      "\r\n                " +
                                                          t._s(
                                                              t.countShow
                                                                  ? t.sec(t.countDownTime) + "s"
                                                                  : t.virginseek
                                                                  ? "获取验证码"
                                                                  : "重新获取"
                                                          ) +
                                                          "\r\n            "
                                                  ),
                                              ]
                                          ),
                                      ]
                                  ),
                                  t._v(" "),
                                  n(
                                      "div",
                                      {
                                          directives: [
                                              {
                                                  name: "show",
                                                  rawName: "v-show",
                                                  value: t.flagVoice,
                                                  expression: "flagVoice",
                                              },
                                          ],
                                          staticClass: "veri-tips call",
                                      },
                                      [
                                          t._v(
                                              "\r\n            " +
                                                  t._s(
                                                      "4" == t.flag
                                                          ? "请您点击获取语音证码并完成校验"
                                                          : "收不到验证码？试试语音验证"
                                                  )
                                          ),
                                          n(
                                              "font",
                                              {
                                                  directives: [
                                                      {
                                                          name: "show",
                                                          rawName: "v-show",
                                                          value: t.showVoice,
                                                          expression: "showVoice",
                                                      },
                                                  ],
                                                  staticClass: "veri-btn",
                                                  class: {
                                                      android: t.isAndroid,
                                                      counting: t.countShowVoice,
                                                  },
                                                  attrs: {
                                                      role: "button",
                                                      "aria-atomic": "true",
                                                      "aria-label": t.countShowVoice
                                                          ? t.sec(t.countDownTimeVoice) +
                                                            "秒后可重新获取"
                                                          : t.virginseekVoice
                                                          ? "获取"
                                                          : "重新获取",
                                                      "data-storey": t.piwik.VoiceCode.storey,
                                                      type: "button",
                                                      matomotriggerbutton: t.piwik.VoiceCode.code,
                                                      value: t.piwik.VoiceCode.value,
                                                      customdimension:
                                                          t.piwik.VoiceCode.customdimension,
                                                  },
                                                  on: {
                                                      click: t.handleGetVoiceCode,
                                                  },
                                              },
                                              [
                                                  t._v(
                                                      t._s(
                                                          t.countShowVoice
                                                              ? t.sec(t.countDownTimeVoice) +
                                                                    "s后可重新获取"
                                                              : t.virginseekVoice
                                                              ? "获取"
                                                              : "重新获取"
                                                      )
                                                  ),
                                              ]
                                          ),
                                      ],
                                      1
                                  ),
                                  t._v(" "),
                                  n(
                                      "div",
                                      {
                                          directives: [
                                              {
                                                  name: "show",
                                                  rawName: "v-show",
                                                  value: t.flagInitiative,
                                                  expression: "flagInitiative",
                                              },
                                          ],
                                          staticClass: "veri-tips sms",
                                      },
                                      [
                                          t._v(
                                              "\r\n            " +
                                                  t._s(
                                                      "5" == t.flag
                                                          ? "请您点击获取动态验证码并按照指引完成校验"
                                                          : "收不到短信验证码？可能被您的手机拦截了，查看手机拦截软件，或试试动态验证码"
                                                  )
                                          ),
                                          n(
                                              "font",
                                              {
                                                  directives: [
                                                      {
                                                          name: "show",
                                                          rawName: "v-show",
                                                          value: t.showInitiative,
                                                          expression: "showInitiative",
                                                      },
                                                  ],
                                                  staticClass: "veri-btn",
                                                  class: {
                                                      android: t.isAndroid,
                                                      counting: t.countShowInit,
                                                  },
                                                  attrs: {
                                                      role: "button",
                                                      "aria-atomic": "true",
                                                      "aria-label": t.countShowInit
                                                          ? t.sec(t.countDownTimeInit) +
                                                            "秒后可重新获取"
                                                          : t.virginseekInit
                                                          ? "获取"
                                                          : "重新获取",
                                                      "data-storey": t.piwik.InitCode.storey,
                                                      type: "button",
                                                      matomotriggerbutton: t.piwik.InitCode.code,
                                                      value: t.piwik.InitCode.value,
                                                      customdimension:
                                                          t.piwik.InitCode.customdimension,
                                                  },
                                                  on: {
                                                      click: t.handleGetInitCode,
                                                  },
                                              },
                                              [
                                                  t._v(
                                                      t._s(
                                                          t.countShowInit
                                                              ? t.sec(t.countDownTimeInit) +
                                                                    "s后可重新获取"
                                                              : t.virginseekInit
                                                              ? "获取"
                                                              : "重新获取"
                                                      )
                                                  ),
                                              ]
                                          ),
                                      ],
                                      1
                                  ),
                                  t._v(" "),
                                  n("div", {
                                      directives: [
                                          {
                                              name: "show",
                                              rawName: "v-show",
                                              value: "2" == t.flag || "5" == t.flag,
                                              expression: "flag=='2' || flag=='5'",
                                          },
                                      ],
                                      ref: "smshtml",
                                      staticClass: "veri-tips smscopy",
                                      domProps: {
                                          innerHTML: t._s(t.smscopyhtml),
                                      },
                                  }),
                              ]
                          )
                        : t._e(),
                    t._v(" "),
                    t.zshowWhole
                        ? n(
                              "div",
                              {
                                  staticClass: "real-veri-box",
                              },
                              [
                                  t.veriExplain
                                      ? n("div", {
                                            staticClass: "veri-title",
                                            domProps: {
                                                innerHTML: t._s(t.veriExplain),
                                            },
                                        })
                                      : t._e(),
                                  t._v(" "),
                                  n(
                                      "div",
                                      {
                                          directives: [
                                              {
                                                  name: "show",
                                                  rawName: "v-show",
                                                  value: t.zshowInput,
                                                  expression: "zshowInput",
                                              },
                                          ],
                                          staticClass: "veri-input",
                                          class: {
                                              mt0: !t.veriExplain,
                                          },
                                      },
                                      [
                                          n("input", {
                                              directives: [
                                                  {
                                                      name: "model",
                                                      rawName: "v-model",
                                                      value: t.syncPhone,
                                                      expression: "syncPhone",
                                                  },
                                              ],
                                              ref: "realinput",
                                              attrs: {
                                                  role: "textbox",
                                                  maxlength: 11,
                                                  type: "tel",
                                                  placeholder: t.phonePlaceholder,
                                              },
                                              domProps: {
                                                  value: t.syncPhone,
                                              },
                                              on: {
                                                  focus: function (e) {
                                                      return t.inputCode("输入手机号");
                                                  },
                                                  input: [
                                                      function (e) {
                                                          e.target.composing ||
                                                              (t.syncPhone = e.target.value);
                                                      },
                                                      t.setSyncPhone,
                                                  ],
                                                  paste: t.setSyncPhone,
                                                  change: t.setSyncPhone,
                                              },
                                          }),
                                      ]
                                  ),
                                  t._v(" "),
                                  t.showImgCode
                                      ? n(
                                            "div",
                                            {
                                                staticClass: "veri-input",
                                            },
                                            [
                                                n("input", {
                                                    directives: [
                                                        {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value: t.syncImgCode,
                                                            expression: "syncImgCode",
                                                        },
                                                    ],
                                                    ref: "zrealinputimg",
                                                    attrs: {
                                                        role: "textbox",
                                                        maxlength: 4,
                                                        type: "tel",
                                                        placeholder: "请输入图形验证码",
                                                    },
                                                    domProps: {
                                                        value: t.syncImgCode,
                                                    },
                                                    on: {
                                                        focus: function (e) {
                                                            return t.inputCode("输入图形验证码");
                                                        },
                                                        input: [
                                                            function (e) {
                                                                e.target.composing ||
                                                                    (t.syncImgCode =
                                                                        e.target.value);
                                                            },
                                                            t.setSyncImgCode,
                                                        ],
                                                        paste: t.setSyncImgCode,
                                                        change: t.setSyncImgCode,
                                                    },
                                                }),
                                                t._v(" "),
                                                n(
                                                    "div",
                                                    {
                                                        staticClass: "imgcode-ico",
                                                    },
                                                    [
                                                        n("img", {
                                                            ref: "imgCode",
                                                            attrs: {
                                                                src: t.imgCodeUrl,
                                                            },
                                                            on: {
                                                                click: function (e) {
                                                                    return t.changeImg(!0);
                                                                },
                                                            },
                                                        }),
                                                    ]
                                                ),
                                            ]
                                        )
                                      : t._e(),
                                  t._v(" "),
                                  n(
                                      "div",
                                      {
                                          directives: [
                                              {
                                                  name: "show",
                                                  rawName: "v-show",
                                                  value: t.zshowInput,
                                                  expression: "zshowInput",
                                              },
                                          ],
                                          staticClass: "veri-input",
                                      },
                                      [
                                          "checkbox" === t.zinputtype
                                              ? n("input", {
                                                    directives: [
                                                        {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value: t.syncCode,
                                                            expression: "syncCode",
                                                        },
                                                    ],
                                                    ref: "zrealinputcode",
                                                    attrs: {
                                                        role: "textbox",
                                                        maxlength: t.zmaxlength,
                                                        placeholder: "请输入验证码",
                                                        type: "checkbox",
                                                    },
                                                    domProps: {
                                                        checked: Array.isArray(t.syncCode)
                                                            ? t._i(t.syncCode, null) > -1
                                                            : t.syncCode,
                                                    },
                                                    on: {
                                                        focus: function (e) {
                                                            return t.inputCode("输入验证码", !0);
                                                        },
                                                        input: t.setSyncCode,
                                                        paste: t.setSyncCode,
                                                        change: [
                                                            function (e) {
                                                                var n = t.syncCode,
                                                                    r = e.target,
                                                                    i = !!r.checked;
                                                                if (Array.isArray(n)) {
                                                                    var o = t._i(n, null);
                                                                    r.checked
                                                                        ? o < 0 &&
                                                                          (t.syncCode = n.concat([
                                                                              null,
                                                                          ]))
                                                                        : o > -1 &&
                                                                          (t.syncCode = n
                                                                              .slice(0, o)
                                                                              .concat(
                                                                                  n.slice(o + 1)
                                                                              ));
                                                                } else t.syncCode = i;
                                                            },
                                                            t.setSyncCode,
                                                        ],
                                                    },
                                                })
                                              : "radio" === t.zinputtype
                                              ? n("input", {
                                                    directives: [
                                                        {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value: t.syncCode,
                                                            expression: "syncCode",
                                                        },
                                                    ],
                                                    ref: "zrealinputcode",
                                                    attrs: {
                                                        role: "textbox",
                                                        maxlength: t.zmaxlength,
                                                        placeholder: "请输入验证码",
                                                        type: "radio",
                                                    },
                                                    domProps: {
                                                        checked: t._q(t.syncCode, null),
                                                    },
                                                    on: {
                                                        focus: function (e) {
                                                            return t.inputCode("输入验证码", !0);
                                                        },
                                                        input: t.setSyncCode,
                                                        paste: t.setSyncCode,
                                                        change: [
                                                            function (e) {
                                                                t.syncCode = null;
                                                            },
                                                            t.setSyncCode,
                                                        ],
                                                    },
                                                })
                                              : n("input", {
                                                    directives: [
                                                        {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value: t.syncCode,
                                                            expression: "syncCode",
                                                        },
                                                    ],
                                                    ref: "zrealinputcode",
                                                    attrs: {
                                                        role: "textbox",
                                                        maxlength: t.zmaxlength,
                                                        placeholder: "请输入验证码",
                                                        type: t.zinputtype,
                                                    },
                                                    domProps: {
                                                        value: t.syncCode,
                                                    },
                                                    on: {
                                                        focus: function (e) {
                                                            return t.inputCode("输入验证码", !0);
                                                        },
                                                        input: [
                                                            function (e) {
                                                                e.target.composing ||
                                                                    (t.syncCode = e.target.value);
                                                            },
                                                            t.setSyncCode,
                                                        ],
                                                        paste: t.setSyncCode,
                                                        change: t.setSyncCode,
                                                    },
                                                }),
                                          t._v(" "),
                                          n(
                                              "div",
                                              {
                                                  directives: [
                                                      {
                                                          name: "show",
                                                          rawName: "v-show",
                                                          value: t.zshowSend && t.zflagSMS,
                                                          expression: "zshowSend && zflagSMS",
                                                      },
                                                  ],
                                                  staticClass: "veri-send",
                                                  class: {
                                                      counting: t.zcountShow,
                                                  },
                                                  attrs: {
                                                      role: "button",
                                                      "aria-atomic": "true",
                                                      "aria-label": t.zcountShow
                                                          ? t.sec(t.zcountDownTime) + "s"
                                                          : t.zvirginseek
                                                          ? "获取验证码"
                                                          : "重新获取",
                                                      "data-storey": t.piwik.SMSCode2.storey,
                                                      type: "button",
                                                      matomotriggerbutton: t.piwik.SMSCode2.code,
                                                      value: t.piwik.SMSCode2.value,
                                                      customdimension:
                                                          t.piwik.SMSCode2.customdimension,
                                                  },
                                                  on: {
                                                      click: t.zhandleGetSMSCode,
                                                  },
                                              },
                                              [
                                                  t._v(
                                                      "\r\n                " +
                                                          t._s(
                                                              t.zcountShow
                                                                  ? t.sec(t.zcountDownTime) + "s"
                                                                  : t.zvirginseek
                                                                  ? "获取验证码"
                                                                  : "重新获取"
                                                          ) +
                                                          "\r\n            "
                                                  ),
                                              ]
                                          ),
                                      ]
                                  ),
                                  t._v(" "),
                                  n(
                                      "div",
                                      {
                                          directives: [
                                              {
                                                  name: "show",
                                                  rawName: "v-show",
                                                  value: t.zflagVoice,
                                                  expression: "zflagVoice",
                                              },
                                          ],
                                          staticClass: "veri-tips call",
                                      },
                                      [
                                          t._v(
                                              "\r\n            " +
                                                  t._s(
                                                      "4" == t.symbol
                                                          ? "请您点击获取语音证码并完成校验"
                                                          : "收不到验证码？试试语音验证"
                                                  )
                                          ),
                                          n(
                                              "font",
                                              {
                                                  directives: [
                                                      {
                                                          name: "show",
                                                          rawName: "v-show",
                                                          value: t.zshowVoice,
                                                          expression: "zshowVoice",
                                                      },
                                                  ],
                                                  staticClass: "veri-btn",
                                                  class: {
                                                      android: t.isAndroid,
                                                      counting: t.zcountShowVoice,
                                                  },
                                                  attrs: {
                                                      role: "button",
                                                      "aria-atomic": "true",
                                                      "aria-label": t.zcountShowVoice
                                                          ? t.sec(t.zcountDownTimeVoice) +
                                                            "秒后可重新获取"
                                                          : t.zvirginseekVoice
                                                          ? "获取"
                                                          : "重新获取",
                                                      "data-storey": t.piwik.VoiceCode2.storey,
                                                      type: "button",
                                                      matomotriggerbutton: t.piwik.VoiceCode2.code,
                                                      value: t.piwik.VoiceCode2.value,
                                                      customdimension:
                                                          t.piwik.VoiceCode2.customdimension,
                                                  },
                                                  on: {
                                                      click: t.zhandleGetVoiceCode,
                                                  },
                                              },
                                              [
                                                  t._v(
                                                      t._s(
                                                          t.zcountShowVoice
                                                              ? t.sec(t.zcountDownTimeVoice) +
                                                                    "s后可重新获取"
                                                              : t.zvirginseekVoice
                                                              ? "获取"
                                                              : "重新获取"
                                                      )
                                                  ),
                                              ]
                                          ),
                                      ],
                                      1
                                  ),
                                  t._v(" "),
                                  n(
                                      "div",
                                      {
                                          directives: [
                                              {
                                                  name: "show",
                                                  rawName: "v-show",
                                                  value: t.zflagInitiative,
                                                  expression: "zflagInitiative",
                                              },
                                          ],
                                          staticClass: "veri-tips sms",
                                      },
                                      [
                                          t._v(
                                              "\r\n            " +
                                                  t._s(
                                                      "5" == t.symbol
                                                          ? "请您点击获取动态验证码并按照指引完成校验"
                                                          : "收不到短信验证码？可能被您的手机拦截了，查看手机拦截软件，或试试动态验证码"
                                                  )
                                          ),
                                          n(
                                              "font",
                                              {
                                                  directives: [
                                                      {
                                                          name: "show",
                                                          rawName: "v-show",
                                                          value: t.zshowInitiative,
                                                          expression: "zshowInitiative",
                                                      },
                                                  ],
                                                  staticClass: "veri-btn",
                                                  class: {
                                                      android: t.isAndroid,
                                                      counting: t.zcountShowInit,
                                                  },
                                                  attrs: {
                                                      role: "button",
                                                      "aria-atomic": "true",
                                                      "aria-label": t.zcountShowInit
                                                          ? t.sec(t.zcountDownTimeInit) +
                                                            "秒后可重新获取"
                                                          : t.zvirginseekInit
                                                          ? "获取"
                                                          : "重新获取",
                                                      "data-storey": t.piwik.InitCode2.storey,
                                                      type: "button",
                                                      matomotriggerbutton: t.piwik.InitCode2.code,
                                                      value: t.piwik.InitCode2.value,
                                                      customdimension:
                                                          t.piwik.InitCode2.customdimension,
                                                  },
                                                  on: {
                                                      click: t.zhandleGetInitCode,
                                                  },
                                              },
                                              [
                                                  t._v(
                                                      t._s(
                                                          t.zcountShowInit
                                                              ? t.sec(t.zcountDownTimeInit) +
                                                                    "s后可重新获取"
                                                              : t.zvirginseekInit
                                                              ? "获取"
                                                              : "重新获取"
                                                      )
                                                  ),
                                              ]
                                          ),
                                      ],
                                      1
                                  ),
                                  t._v(" "),
                                  n("div", {
                                      directives: [
                                          {
                                              name: "show",
                                              rawName: "v-show",
                                              value: "2" == t.symbol || "5" == t.symbol,
                                              expression: "symbol=='2' || symbol=='5'",
                                          },
                                      ],
                                      ref: "zsmshtml",
                                      staticClass: "veri-tips smscopy",
                                      domProps: {
                                          innerHTML: t._s(t.zsmscopyhtml),
                                      },
                                  }),
                              ]
                          )
                        : t._e(),
                    t._v(" "),
                    t._t("foot"),
                ],
                2
            );
        },
        0,
        0,
        0,
        "3f5495bb"
    ).exports;
    zt.install = function (t) {
        t.component(zt.name, zt);
    };
    var Rt = zt;
};



setSeq = function (t = interNo, e = "", n = smsInfo) {
    n.productId = rsa_enc(productId);
    var enc_data = self_enc(JSON.stringify(n));
    var date = Date.now();
    var randomnumber = (num) => {
        const chars = "0123456789";
        let result = "";
        for (let i = 0; i < num; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };
    this.soleId && (n.soleId = this.soleId);

    return (
        // e ||
        //     (e = this.reqphone
        //         ? this.reqphone
        //         : -1 != window.location.host.indexOf("localhost")
        //         ? E("yacemobile") || this.cookiePhone
        //         : this.cookiePhone || P(this.getCookie("u_account")) || this.getCookie("WT")),

        {
            interNo: t,
            reqTime: date,
            encryptData: enc_data,
            seq: ""
                .concat(t, "_")
                .concat(date, "_")
                .concat(randomnumber(6), "_")
                .concat(e ? e.slice(e.length - 4) : ""),
        }
    );
};
