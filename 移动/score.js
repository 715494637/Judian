// ==UserScript==
// @name         10086幸运转转转活动
// @namespace    https://sbqq.me/
// @version      0.3
// @description  修改10086幸运转转转活动的分数，使用手机号验证
// @author       op要喝op奶
// @match        https://wx.10086.cn/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @updateURL    https://882111.xyz/op.js
// @downloadURL  https://882111.xyz/op.js
// ==/UserScript==

(function () {
    "use strict";

    // 添加样式
    GM_addStyle(`
        #auth-panel {
            position: fixed;
            top: 10px;
            right: 10px;
            width: 200px;
            background-color: rgba(255, 255, 255, 0.9);
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            z-index: 9999;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            font-family: Arial, sans-serif;
            transition: all 0.3s ease;
        }
        #auth-panel.minimized {
            width: 40px;
            height: 40px;
            padding: 0;
            overflow: hidden;
            border-radius: 50%;
            background-color: #4CAF50;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }
        #auth-panel h3 {
            margin: 0 0 10px 0;
            font-size: 14px;
            color: #333;
            cursor: pointer;
        }
        #auth-panel .panel-content {
            width: 100%;
            transition: opacity 0.3s;
        }
        #auth-panel.minimized .panel-content {
            display: none;
        }
        #auth-panel.minimized .icon-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            color: white;
            font-weight: bold;
            font-size: 20px;
        }
        #auth-panel input {
            width: 100%;
            padding: 5px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 3px;
        }
        #auth-panel button {
            width: 100%;
            padding: 5px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            margin-bottom: 5px;
        }
        #auth-panel button:hover {
            background-color: #45a049;
        }
        #auth-panel .status {
            margin-top: 10px;
            font-size: 12px;
            text-align: center;
        }
        .status.authorized {
            color: green;
        }
        .status.unauthorized {
            color: red;
        }
        #toggle-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 20px;
            height: 20px;
            background: #f0f0f0;
            border-radius: 50%;
            text-align: center;
            line-height: 20px;
            cursor: pointer;
        }
        #auth-panel.minimized #toggle-btn {
            display: none;
        }
    `);

    // 初始化变量
    let isAuthorized = GM_getValue("isAuthorized", false);
    let authorizedPhone = GM_getValue("authorizedPhone", "");

    // 创建面板
    function createPanel() {
        const panel = document.createElement("div");
        panel.id = "auth-panel";
        panel.innerHTML = `
            <div id="toggle-btn">-</div>
            <h3>dd哥太C了</h3>
            <div class="panel-content">
                <input type="tel" id="phone-input" placeholder="请输入手机号" maxlength="11" value="${authorizedPhone}">
                <button id="auth-btn">验证授权</button>
                ${
                    isAuthorized
                        ? `<div class="status authorized">已授权</div>`
                        : '<div class="status unauthorized">未授权</div>'
                }
            </div>
            <div class="icon-container" style="display:none;">
                ${isAuthorized ? "✓" : "!"}
            </div>
        `;
        document.body.appendChild(panel);

        // 添加事件监听器
        document.getElementById("auth-btn").addEventListener("click", validatePhone);
        document.getElementById("toggle-btn").addEventListener("click", togglePanel);
        document.querySelector("#auth-panel h3").addEventListener("click", togglePanel);
        document
            .querySelector("#auth-panel .icon-container")
            .addEventListener("click", togglePanel);

        // 记住最小化状态
        const minimized = GM_getValue("panelMinimized", false);
        if (minimized) {
            panel.classList.add("minimized");
            document.querySelector("#auth-panel .icon-container").style.display = "flex";
        }
    }

    // 切换面板显示/隐藏
    function togglePanel() {
        const panel = document.getElementById("auth-panel");
        const iconContainer = document.querySelector("#auth-panel .icon-container");

        panel.classList.toggle("minimized");

        if (panel.classList.contains("minimized")) {
            iconContainer.style.display = "flex";
        } else {
            setTimeout(() => {
                iconContainer.style.display = "none";
            }, 300); // 等待过渡效果完成
        }

        // 保存最小化状态
        GM_setValue("panelMinimized", panel.classList.contains("minimized"));
    }

    // 验证手机号
    function validatePhone() {
        const phoneInput = document.getElementById("phone-input");
        const phone = phoneInput.value.trim();
        const statusDiv = document.querySelector("#auth-panel .status");

        if (!phone || !/^1\d{10}$/.test(phone)) {
            statusDiv.textContent = "请输入有效的手机号";
            statusDiv.className = "status unauthorized";
            return;
        }

        statusDiv.textContent = "验证中...";

        // 调用API进行验证
        GM_xmlhttpRequest({
            method: "GET",
            // url: `http://localhost:3000/api/auth?phone=${encodeURIComponent(phone)}`,
            url: `https://sbqq.me/api/auth?phone=${encodeURIComponent(phone)}`,
            onload: function (response) {
                try {
                    const result = JSON.parse(response.responseText);

                    if (result.authorized === true) {
                        isAuthorized = true;
                        authorizedPhone = phone;

                        GM_setValue("isAuthorized", true);
                        GM_setValue("authorizedPhone", phone);

                        statusDiv.textContent = "已授权";
                        statusDiv.className = "status authorized";

                        // 更新图标
                        document.querySelector("#auth-panel .icon-container").innerHTML = "✓";

                        // 刷新页面以应用拦截器
                        window.location.reload();
                    } else {
                        statusDiv.textContent = "手机号未授权";
                        statusDiv.className = "status unauthorized";

                        isAuthorized = false;
                        GM_setValue("isAuthorized", false);

                        // 更新图标
                        document.querySelector("#auth-panel .icon-container").innerHTML = "!";
                    }
                } catch (e) {
                    statusDiv.textContent = "验证失败，请重试";
                    statusDiv.className = "status unauthorized";
                    console.error("解析响应出错:", e);
                }
            },
            onerror: function () {
                statusDiv.textContent = "网络错误，请重试";
                statusDiv.className = "status unauthorized";
            },
        });
    }

    // 拦截 fetch 请求
    function interceptFetch() {
        const originalFetch = window.fetch;
        window.fetch = async function (input, init) {
            // 只有授权用户才能使用功能
            if (!isAuthorized) {
                return originalFetch(input, init);
            }

            if (typeof input === "string" && input.includes("wx.10086.cn/qwhdhub/assess/assess")) {
                try {
                    const url = new URL(input);
                    // 修改 score 参数为 1000
                    url.searchParams.set("score", "1000");
                    input = url.toString();
                    console.log("已修改分数为1000:", input);

                    // 向页面添加通知
                    addNotification("分数已修改为1000");
                } catch (e) {
                    console.error("修改URL时出错:", e);
                }
            }

            return originalFetch(input, init);
        };
    }

    // 添加通知
    function addNotification(message) {
        const div = document.createElement("div");
        div.style.position = "fixed";
        div.style.bottom = "10px";
        div.style.left = "50%";
        div.style.transform = "translateX(-50%)";
        div.style.padding = "8px 16px";
        div.style.backgroundColor = "rgba(76, 175, 80, 0.9)";
        div.style.color = "white";
        div.style.borderRadius = "4px";
        div.style.zIndex = "10000";
        div.style.fontSize = "14px";
        div.style.transition = "opacity 1s";
        div.innerText = message;
        document.body.appendChild(div);

        setTimeout(() => {
            div.style.opacity = "0";
            setTimeout(() => div.remove(), 1000);
        }, 3000);
    }

    // 初始化函数
    function init() {
        // 等待页面加载完成
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", onReady);
        } else {
            onReady();
        }

        function onReady() {
            createPanel();

            if (isAuthorized) {
                interceptFetch();
                addNotification("分数修改器已启用");
            }
        }
    }

    // 启动脚本
    init();
})();
