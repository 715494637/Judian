// ==UserScript==
// @name         10086响应解密脚本
// @updateURL    https://raw.githubusercontent.com/715494637/Judian/refs/heads/main/%E7%A7%BB%E5%8A%A8/Decypter.js
// @downloadURL  https://raw.githubusercontent.com/715494637/Judian/refs/heads/main/%E7%A7%BB%E5%8A%A8/Decypter.js
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  解密10086 APP响应数据，支持多请求查看和管理，可调整界面大小
// @author       op要喝op奶
// @match        https://h.app.coc.10086.cn/cmcc-app/*
// @grant        unsafeWindow
// @run-at       document-start
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js
// ==/UserScript==

(function () {
    "use strict";

    console.log("脚本已加载");

    // 存储解密的请求数据
    const decryptedRequests = [];

    // 初始侧边栏宽度
    const DEFAULT_SIDEBAR_WIDTH = 300;
    let currentSidebarWidth = DEFAULT_SIDEBAR_WIDTH;
    let isFullscreen = false;

    // 用于跟踪当前正在查看的请求索引
    let currentViewingIndex = -1;

    const byteToString = (input) => {
        if (typeof input === "string") return input;
        let str = "";
        const bytes = input;
        for (let i = 0; i < bytes.length; i++) {
            const binary = bytes[i].toString(2);
            const match = binary.match(/^1+?(?=0)/);
            if (match && binary.length === 8) {
                const count = match[0].length;
                const value = bytes[i].toString(2).slice(7 - count);
                for (let j = 1; j < count; j++) {
                    value += bytes[j + i].toString(2).slice(2);
                }
                str += String.fromCharCode(parseInt(value, 2));
                i += count - 1;
            } else {
                str += String.fromCharCode(bytes[i]);
            }
        }
        return str;
    };

    const KEY_1 = "57,55,57,49,48,50,55,51,52,49,55,49,49,56,49,57";
    const KEY_3 = "85,86,105,99,48,54,116,112,88,103,77,78,105,65,112,109";
    const KEY_4 = "49,50,51,52,53,54,55,56,57,48,49,50,51,52,53,54";
    const KEY_6 = "116,54,77,111,69,90,57,52,115,48,98,68,79,97,119,115";

    const decryptByAES = (text) => {
        let key = CryptoJS.enc.Utf8.parse(byteToString(KEY_3.split(",")));
        let iv = CryptoJS.enc.Utf8.parse(byteToString(KEY_1.split(",")));

        if (window.location.href.indexOf("cmcc-app-gray") > -1) {
            key = CryptoJS.enc.Utf8.parse(byteToString(KEY_6.split(",")));
            iv = CryptoJS.enc.Utf8.parse(byteToString(KEY_4.split(",")));
        }

        const decrypted = CryptoJS.AES.decrypt(text, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
        });

        return CryptoJS.enc.Utf8.stringify(decrypted);
    };

    // 获取URL路径部分（主机名后的路径）
    const getPathFromUrl = (url) => {
        try {
            const urlObj = new URL(url);
            return urlObj.pathname;
        } catch (e) {
            // 如果URL解析失败，返回原始URL
            return url;
        }
    };

    // 格式化文件大小
    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + " B";
        else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        else return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    };

    // 创建多请求查看器UI
    const createMultiRequestViewer = () => {
        // 创建主容器
        const container = document.createElement("div");
        container.id = "decrypt-container";
        container.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 10000;
        `;

        // 创建触发按钮
        const trigger = document.createElement("div");
        trigger.style.cssText = `
            background: rgba(0, 0, 0, 0.8);
            border-radius: 5px;
            padding: 10px;
            color: white;
            font-size: 12px;
            cursor: pointer;
        `;
        trigger.textContent = "解密数据查看器";
        trigger.id = "decrypt-trigger";

        // 创建主窗口
        const mainWindow = document.createElement("div");
        mainWindow.style.cssText = `
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            height: 80%;
            max-width: 1200px;
            background: white;
            border-radius: 5px;
            padding: 0;
            box-shadow: 0 0 20px rgba(0,0,0,0.3);
            z-index: 10001;
            overflow: hidden;
            display: flex;
            flex-direction: row;
        `;
        mainWindow.id = "decrypt-main-window";

        // 创建侧边栏（请求列表）
        const sidebar = document.createElement("div");
        sidebar.style.cssText = `
            width: ${DEFAULT_SIDEBAR_WIDTH}px;
            height: 100%;
            background: #f5f5f5;
            overflow-y: auto;
            border-right: 1px solid #ddd;
            padding: 10px 0;
            transition: width 0.3s ease;
            position: relative;
        `;
        sidebar.id = "decrypt-sidebar";

        // 创建分隔线（用于拖拽调整大小）
        const resizer = document.createElement("div");
        resizer.style.cssText = `
            position: absolute;
            right: -5px;
            top: 0;
            width: 10px;
            height: 100%;
            cursor: col-resize;
            z-index: 10002;
        `;
        resizer.id = "decrypt-resizer";

        // 向侧边栏添加隐藏/显示按钮
        const toggleSidebarBtn = document.createElement("button");
        toggleSidebarBtn.style.cssText = `
            position: absolute;
            right: 10px;
            top: 10px;
            background: #f5f5f5;
            border: 1px solid #ddd;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            cursor: pointer;
            z-index: 10003;
        `;
        toggleSidebarBtn.innerHTML = "◀";
        toggleSidebarBtn.title = "隐藏侧边栏";
        toggleSidebarBtn.id = "toggle-sidebar-btn";

        // 创建数据显示区域
        const contentArea = document.createElement("div");
        contentArea.style.cssText = `
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
        `;
        contentArea.id = "decrypt-content-area";

        // 工具栏
        const toolbar = document.createElement("div");
        toolbar.style.cssText = `
            padding: 10px;
            border-bottom: 1px solid #ddd;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        toolbar.id = "decrypt-toolbar";

        // 添加关闭按钮
        const closeBtn = document.createElement("button");
        closeBtn.style.cssText = `
            padding: 5px 10px;
            background: #f44336;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            margin-left: auto;
        `;
        closeBtn.textContent = "关闭";
        closeBtn.id = "decrypt-close-btn";

        // 添加复制按钮
        const copyBtn = document.createElement("button");
        copyBtn.style.cssText = `
            padding: 5px 10px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            margin-right: 10px;
        `;
        copyBtn.textContent = "复制内容";
        copyBtn.id = "decrypt-copy-btn";

        // 添加下载按钮
        const downloadBtn = document.createElement("button");
        downloadBtn.style.cssText = `
            padding: 5px 10px;
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            margin-right: 10px;
        `;
        downloadBtn.textContent = "下载内容";
        downloadBtn.id = "decrypt-download-btn";

        // 清空按钮
        const clearBtn = document.createElement("button");
        clearBtn.style.cssText = `
            padding: 5px 10px;
            background: #FF9800;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            margin-right: 10px;
        `;
        clearBtn.textContent = "清空记录";
        clearBtn.id = "decrypt-clear-btn";

        // 添加全屏按钮
        const fullscreenBtn = document.createElement("button");
        fullscreenBtn.style.cssText = `
            padding: 5px 10px;
            background: #9C27B0;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            margin-right: 10px;
        `;
        fullscreenBtn.textContent = "全屏查看";
        fullscreenBtn.id = "decrypt-fullscreen-btn";

        // 标题区域
        const titleArea = document.createElement("div");
        titleArea.style.cssText = `
            flex: 0 0 auto;
        `;
        titleArea.id = "decrypt-title-area";

        // 内容区域
        const contentDisplay = document.createElement("pre");
        contentDisplay.style.cssText = `
            flex: 1;
            margin: 0;
            padding: 10px;
            overflow: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
            font-family: monospace;
            font-size: 13px;
        `;
        contentDisplay.id = "decrypt-content-display";

        // 组装UI
        toolbar.appendChild(copyBtn);
        toolbar.appendChild(downloadBtn);
        toolbar.appendChild(clearBtn);
        toolbar.appendChild(fullscreenBtn);
        toolbar.appendChild(closeBtn);

        contentArea.appendChild(toolbar);
        contentArea.appendChild(titleArea);
        contentArea.appendChild(contentDisplay);

        sidebar.appendChild(resizer);
        mainWindow.appendChild(sidebar);
        mainWindow.appendChild(contentArea);

        contentArea.appendChild(toggleSidebarBtn);

        container.appendChild(trigger);
        container.appendChild(mainWindow);

        document.body.appendChild(container);

        // 添加拖拽调整大小事件
        let isResizing = false;
        resizer.addEventListener("mousedown", (e) => {
            isResizing = true;
            document.body.style.cursor = "col-resize";
            e.preventDefault();
        });

        document.addEventListener("mousemove", (e) => {
            if (!isResizing) return;

            const newWidth = e.clientX - sidebar.getBoundingClientRect().left;

            // 限制最小宽度和最大宽度
            if (newWidth >= 150 && newWidth <= 600) {
                currentSidebarWidth = newWidth;
                sidebar.style.width = `${newWidth}px`;

                // 记住用户设置的宽度
                try {
                    localStorage.setItem("decrypt-sidebar-width", newWidth);
                } catch (e) {
                    console.log("无法保存侧边栏宽度", e);
                }
            }
        });

        document.addEventListener("mouseup", () => {
            isResizing = false;
            document.body.style.cursor = "";
        });

        // 添加侧边栏切换事件
        let isSidebarVisible = true;
        toggleSidebarBtn.addEventListener("click", () => {
            if (isSidebarVisible) {
                // 隐藏侧边栏
                sidebar.style.width = "0";
                toggleSidebarBtn.innerHTML = "▶";
                toggleSidebarBtn.title = "显示侧边栏";
                toggleSidebarBtn.style.left = "10px";
                toggleSidebarBtn.style.right = "auto";
            } else {
                // 显示侧边栏
                sidebar.style.width = `${currentSidebarWidth}px`;
                toggleSidebarBtn.innerHTML = "◀";
                toggleSidebarBtn.title = "隐藏侧边栏";
                toggleSidebarBtn.style.right = "10px";
                toggleSidebarBtn.style.left = "auto";
            }
            isSidebarVisible = !isSidebarVisible;
        });

        // 添加全屏模式事件
        fullscreenBtn.addEventListener("click", () => {
            if (isFullscreen) {
                // 退出全屏
                mainWindow.style.width = "90%";
                mainWindow.style.height = "80%";
                mainWindow.style.maxWidth = "1200px";
                fullscreenBtn.textContent = "全屏查看";
            } else {
                // 进入全屏
                mainWindow.style.width = "98%";
                mainWindow.style.height = "96%";
                mainWindow.style.maxWidth = "none";
                fullscreenBtn.textContent = "退出全屏";
            }
            isFullscreen = !isFullscreen;

            // 如果有选中的请求，重新显示内容让滚动条等更新
            if (currentViewingIndex >= 0) {
                setTimeout(() => {
                    displayRequestDetails(currentViewingIndex);
                }, 100);
            }
        });

        // 加载之前保存的侧边栏宽度
        try {
            const savedWidth = localStorage.getItem("decrypt-sidebar-width");
            if (savedWidth) {
                currentSidebarWidth = parseInt(savedWidth);
                sidebar.style.width = `${currentSidebarWidth}px`;
            }
        } catch (e) {
            console.log("无法加载侧边栏宽度", e);
        }

        // 添加事件监听
        trigger.addEventListener("click", () => {
            mainWindow.style.display = mainWindow.style.display === "none" ? "flex" : "none";
        });

        closeBtn.addEventListener("click", () => {
            mainWindow.style.display = "none";
        });

        copyBtn.addEventListener("click", () => {
            const text = contentDisplay.textContent;
            if (!text) return;

            navigator.clipboard.writeText(text).then(() => {
                copyBtn.textContent = "已复制!";
                setTimeout(() => {
                    copyBtn.textContent = "复制内容";
                }, 1000);
            });
        });

        downloadBtn.addEventListener("click", () => {
            const selectedIndex = parseInt(contentDisplay.dataset.index);
            if (isNaN(selectedIndex) || !decryptedRequests[selectedIndex]) return;

            const requestData = decryptedRequests[selectedIndex];
            const jsonData = JSON.stringify(requestData.decryptedData, null, 2);

            // 获取URL路径作为文件名
            const urlPath = getPathFromUrl(requestData.url);
            // 创建文件名，替换路径中的 / 为 _
            let filename = urlPath.replace(/\//g, "_").replace(/^_/, "");
            if (!filename) filename = "decrypt";

            // 添加时间戳
            const now = new Date();
            const timestamp =
                now.getFullYear() +
                ("0" + (now.getMonth() + 1)).slice(-2) +
                ("0" + now.getDate()).slice(-2) +
                "_" +
                ("0" + now.getHours()).slice(-2) +
                ("0" + now.getMinutes()).slice(-2) +
                ("0" + now.getSeconds()).slice(-2);

            // 创建Blob对象
            const blob = new Blob([jsonData], { type: "application/json" });
            const url = window.URL.createObjectURL(blob);

            // 创建临时下载链接
            const a = document.createElement("a");
            a.href = url;
            a.download = `${filename}_${timestamp}.json`;
            document.body.appendChild(a);
            a.click();

            // 清理
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            // 显示下载反馈
            downloadBtn.textContent = "已下载!";
            setTimeout(() => {
                downloadBtn.textContent = "下载内容";
            }, 1000);
        });

        clearBtn.addEventListener("click", () => {
            if (confirm("确定要清空所有记录吗？")) {
                decryptedRequests.length = 0;
                updateRequestList();
                titleArea.innerHTML = "";
                contentDisplay.textContent = "";
                contentDisplay.dataset.index = "";
                currentViewingIndex = -1;
            }
        });

        return container;
    };

    // 更新请求列表
    const updateRequestList = () => {
        const sidebar = document.getElementById("decrypt-sidebar");
        if (!sidebar) return;

        sidebar.innerHTML = "";

        // 重新添加调整大小的元素
        const resizer = document.createElement("div");
        resizer.style.cssText = `
            position: absolute;
            right: -5px;
            top: 0;
            width: 10px;
            height: 100%;
            cursor: col-resize;
            z-index: 10002;
        `;
        resizer.id = "decrypt-resizer";
        sidebar.appendChild(resizer);

        // 重新添加拖拽调整大小事件
        let isResizing = false;
        resizer.addEventListener("mousedown", (e) => {
            isResizing = true;
            document.body.style.cursor = "col-resize";
            e.preventDefault();
        });

        document.addEventListener("mousemove", (e) => {
            if (!isResizing) return;

            const newWidth = e.clientX - sidebar.getBoundingClientRect().left;

            // 限制最小宽度和最大宽度
            if (newWidth >= 150 && newWidth <= 600) {
                currentSidebarWidth = newWidth;
                sidebar.style.width = `${newWidth}px`;

                // 记住用户设置的宽度
                try {
                    localStorage.setItem("decrypt-sidebar-width", newWidth);
                } catch (e) {
                    console.log("无法保存侧边栏宽度", e);
                }
            }
        });

        if (decryptedRequests.length === 0) {
            const emptyMsg = document.createElement("div");
            emptyMsg.style.cssText = `
                padding: 20px;
                color: #666;
                text-align: center;
            `;
            emptyMsg.textContent = "暂无解密数据";
            sidebar.appendChild(emptyMsg);
            return;
        }

        decryptedRequests.forEach((request, index) => {
            const item = document.createElement("div");
            item.className = "decrypt-request-item";
            item.style.cssText = `
                padding: 10px;
                border-bottom: 1px solid #ddd;
                cursor: pointer;
                transition: background 0.2s;
            `;
            item.dataset.index = index;

            // 获取路径部分
            const urlPath = getPathFromUrl(request.url);

            // 计算数据大小
            const dataStr = JSON.stringify(request.decryptedData);
            const dataSize = formatSize(new Blob([dataStr]).size);

            item.innerHTML = `
                <div style="font-weight: bold; font-size: 12px; margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${urlPath}">
                    ${urlPath}
                </div>
                <div style="font-size: 11px; color: #666;">
                    ${request.method} | ${dataSize} | ${request.timestamp}
                </div>
            `;

            item.addEventListener("mouseover", () => {
                if (currentViewingIndex !== index) {
                    item.style.background = "#e9e9e9";
                }
            });

            item.addEventListener("mouseout", () => {
                if (currentViewingIndex !== index) {
                    item.style.background = "";
                }
            });

            item.addEventListener("click", () => {
                // 高亮选中项
                document.querySelectorAll(".decrypt-request-item").forEach((el) => {
                    el.style.background = "";
                });
                item.style.background = "#e1f5fe";

                // 显示详情
                displayRequestDetails(index);
                currentViewingIndex = index;
            });

            // 如果是当前查看的项目，就设置背景色
            if (index === currentViewingIndex) {
                item.style.background = "#e1f5fe";
            }

            sidebar.appendChild(item);
        });
    };

    // 显示请求详情
    const displayRequestDetails = (index) => {
        const request = decryptedRequests[index];
        if (!request) return;

        const titleArea = document.getElementById("decrypt-title-area");
        const contentDisplay = document.getElementById("decrypt-content-display");

        if (!titleArea || !contentDisplay) return;

        // 更新内容区域索引
        contentDisplay.dataset.index = index;

        // 记录当前查看的索引
        currentViewingIndex = index;

        // 显示请求信息
        const urlPath = getPathFromUrl(request.url);
        titleArea.innerHTML = `
            <div style="padding: 10px; background: #f9f9f9; border-bottom: 1px solid #ddd;">
                <div style="font-weight: bold; margin-bottom: 5px; word-break: break-all;">${urlPath}</div>
                <div style="font-size: 12px; color: #666; display: flex; flex-wrap: wrap;">
                    <span style="margin-right: 15px; margin-bottom: 5px;">方法: ${
                        request.method
                    }</span>
                    <span style="margin-right: 15px; margin-bottom: 5px;">时间: ${
                        request.timestamp
                    }</span>
                    <span style="margin-bottom: 5px;">大小: ${formatSize(
                        new Blob([JSON.stringify(request.decryptedData)]).size
                    )}</span>
                </div>
            </div>
        `;

        // 显示解密内容
        contentDisplay.textContent = JSON.stringify(request.decryptedData, null, 2);

        // 滚动到顶部
        contentDisplay.scrollTop = 0;
    };

    // 添加解密请求
    const addDecryptedRequest = (url, method, decryptedData) => {
        const now = new Date();
        const timestamp =
            now.getFullYear() +
            "-" +
            ("0" + (now.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + now.getDate()).slice(-2) +
            " " +
            ("0" + now.getHours()).slice(-2) +
            ":" +
            ("0" + now.getMinutes()).slice(-2) +
            ":" +
            ("0" + now.getSeconds()).slice(-2);

        // 添加到请求数组
        decryptedRequests.unshift({
            url,
            method,
            decryptedData,
            timestamp,
        });

        // 更新请求列表
        updateRequestList();

        // 如果是第一个请求，自动显示详情
        if (decryptedRequests.length === 1) {
            displayRequestDetails(0);
        }
    };

    // 确保UI已初始化
    const ensureUIInitialized = () => {
        if (!document.getElementById("decrypt-container")) {
            createMultiRequestViewer();
        }
    };

    // 拦截所有网络请求
    const hookAjax = () => {
        // 保存原始的 open 方法
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;
        const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

        // 拦截 open 方法
        XMLHttpRequest.prototype.open = function (method, url, ...args) {
            console.log("拦截到请求:", method, url);
            this._url = url;
            this._method = method;
            this._requestHeaders = {};
            return originalOpen.apply(this, [method, url, ...args]);
        };

        // 拦截 setRequestHeader 方法
        XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
            this._requestHeaders = this._requestHeaders || {};
            this._requestHeaders[header] = value;
            return originalSetRequestHeader.apply(this, arguments);
        };

        // 拦截 send 方法
        XMLHttpRequest.prototype.send = function (body) {
            console.log("匹配到目标请求:", {
                url: this._url,
                method: this._method,
                headers: this._requestHeaders,
                body: body,
            });

            // 确保UI已初始化
            ensureUIInitialized();

            // 保存原始的 onreadystatechange
            const originalStateChange = this.onreadystatechange;
            this.onreadystatechange = function () {
                if (this.readyState === 4) {
                    console.log("收到响应:", this.status);
                    try {
                        const response = JSON.parse(this.responseText);
                        console.log("响应内容:", response);

                        // 检查 body 字段
                        if (response.body) {
                            console.log("发现加密数据在body字段中，开始解密");
                            try {
                                const decrypted = decryptByAES(response.body);
                                console.log("解密结果:", decrypted);
                                // 添加到解密请求列表
                                addDecryptedRequest(this._url, this._method, JSON.parse(decrypted));
                            } catch (e) {
                                console.error("响应体解密失败:", e);
                            }
                        } else if (response.encryptData) {
                            console.log("发现加密数据在encryptData字段中，开始解密");
                            try {
                                const decrypted = decryptByAES(response.encryptData);
                                // 添加到解密请求列表
                                addDecryptedRequest(this._url, this._method, JSON.parse(decrypted));
                            } catch (e) {
                                console.error("响应体解密失败:", e);
                            }
                        }

                        // 尝试解密请求体，如果是字符串的话
                        if (typeof body === "string") {
                            try {
                                console.log("尝试解密请求体");
                                const decryptedBody = decryptByAES(body);
                                // 添加到解密请求列表
                                addDecryptedRequest(
                                    this._url,
                                    this._method,
                                    JSON.parse(decryptedBody)
                                );
                            } catch (e) {
                                console.log("请求体解密失败 (可能不是加密数据):", e);
                            }
                        }
                    } catch (e) {
                        console.error("处理响应失败:", e);
                    }
                }
                // 调用原始的 onreadystatechange
                if (originalStateChange) {
                    originalStateChange.apply(this, arguments);
                }
            };

            return originalSend.apply(this, arguments);
        };
    };

    // 拦截 fetch
    const hookFetch = () => {
        const originalFetch = window.fetch;
        window.fetch = async function (input, init) {
            const url = typeof input === "string" ? input : input.url;
            console.log("拦截到fetch请求:", url);

            // 确保UI已初始化
            ensureUIInitialized();

            try {
                const response = await originalFetch.apply(this, arguments);
                const clonedResponse = response.clone();
                try {
                    const jsonData = await clonedResponse.json();

                    // 检查 body 字段
                    if (jsonData.body) {
                        console.log("发现加密数据在body字段中，开始解密");
                        try {
                            const decrypted = decryptByAES(jsonData.body);
                            console.log("解密结果:", decrypted);
                            // 添加到解密请求列表
                            addDecryptedRequest(url, init?.method || "GET", JSON.parse(decrypted));
                        } catch (e) {
                            console.error("响应体解密失败:", e);
                        }
                    } else if (jsonData.encryptData) {
                        console.log("发现加密数据在encryptData字段中，开始解密");
                        try {
                            const decrypted = decryptByAES(jsonData.encryptData);
                            // 添加到解密请求列表
                            addDecryptedRequest(url, init?.method || "GET", JSON.parse(decrypted));
                        } catch (e) {
                            console.error("响应体解密失败:", e);
                        }
                    }

                    // 尝试解密请求体
                    if (init?.body && typeof init.body === "string") {
                        try {
                            console.log("尝试解密fetch请求体");
                            const decryptedBody = decryptByAES(init.body);
                            // 添加到解密请求列表
                            addDecryptedRequest(
                                url,
                                init?.method || "GET",
                                JSON.parse(decryptedBody)
                            );
                        } catch (e) {
                            console.log("fetch请求体解密失败 (可能不是加密数据):", e);
                        }
                    }
                } catch (e) {
                    console.log("无法解析为JSON:", e);
                }

                return response;
            } catch (e) {
                console.error("处理fetch响应失败:", e);
                throw e;
            }
        };
    };

    // 初始化钩子
    const init = () => {
        console.log("初始化请求拦截");
        hookAjax();
        hookFetch();

        // 延迟初始化UI，确保DOM加载完成
        if (document.readyState === "complete") {
            createMultiRequestViewer();
        } else {
            window.addEventListener("load", createMultiRequestViewer);
        }
    };

    // 确保在页面加载最开始就执行
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
