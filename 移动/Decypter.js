// ==UserScript==
// @name         10086响应解密脚本
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  解密10086 APP响应数据，支持多请求查看和管理，可调整界面大小
// @author       op要喝op奶
// @updateURL    https://raw.githubusercontent.com/715494637/Judian/refs/heads/main/%E7%A7%BB%E5%8A%A8/Decypter.js
// @downloadURL  https://raw.githubusercontent.com/715494637/Judian/refs/heads/main/%E7%A7%BB%E5%8A%A8/Decypter.js
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

    // 添加设备检测函数 - 移到前面先定义再使用
    const isMobileDevice = () => {
        return (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            ) || window.innerWidth < 768
        );
    };

    // 初始侧边栏宽度 - 针对移动端优化
    const DEFAULT_SIDEBAR_WIDTH = isMobileDevice() ? 150 : 300;
    let currentSidebarWidth = DEFAULT_SIDEBAR_WIDTH;
    let isFullscreen = false;

    // 用于跟踪当前正在查看的请求索引
    let currentViewingIndex = -1;

    // 标记详细内容是否已加载
    let detailsLoaded = false;

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

    // 获取URL最后一段作为简短显示
    const getLastPathSegment = (url) => {
        try {
            const path = getPathFromUrl(url);
            const segments = path.split("/").filter((s) => s);
            return segments.length > 0 ? segments[segments.length - 1] : path;
        } catch (e) {
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
            bottom: 20px;
            right: 20px;
            z-index: 10000;
        `;

        // 创建确认对话框
        const confirmDialog = document.createElement("div");
        confirmDialog.id = "decrypt-confirm-dialog";
        confirmDialog.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10005;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const confirmContent = document.createElement("div");
        confirmContent.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            width: 90%;
            max-width: 400px;
            text-align: center;
            transition: transform 0.3s ease;
        `;

        confirmContent.innerHTML = `
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #333;">
                确认清空数据
            </div>
            <div style="color: #666; margin-bottom: 20px; line-height: 1.5;">
                确定要清空所有解密记录吗？此操作不可恢复。
            </div>
            <div style="display: flex; justify-content: center; gap: 10px;">
                <button id="decrypt-confirm-cancel" style="
                    padding: 8px 20px;
                    background: #f5f5f5;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    color: #666;
                    transition: all 0.2s ease;
                ">取消</button>
                <button id="decrypt-confirm-ok" style="
                    padding: 8px 20px;
                    background: #F44336;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    color: white;
                    transition: all 0.2s ease;
                ">确定清空</button>
            </div>
        `;

        confirmDialog.appendChild(confirmContent);
        container.appendChild(confirmDialog);

        // 创建圆形浮动按钮 - 显示数据包数量
        const trigger = document.createElement("div");
        trigger.style.cssText = `
            width: 60px;
            height: 60px;
            background: #2196F3;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            user-select: none;
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
        `;
        trigger.textContent = decryptedRequests.length.toString();
        trigger.id = "decrypt-trigger";
        trigger.title = "点击查看解密数据";

        // 创建主窗口 - 确保默认隐藏并优化移动端大小
        const mainWindow = document.createElement("div");
        mainWindow.style.cssText = `
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: ${isMobileDevice() ? "98%" : "90%"};
            height: ${isMobileDevice() ? "90%" : "80%"};
            max-width: 1200px;
            background: white;
            border-radius: 5px;
            padding: 0;
            box-shadow: 0 0 20px rgba(0,0,0,0.3);
            z-index: 10001;
            overflow: hidden;
            flex-direction: row;
        `;
        mainWindow.id = "decrypt-main-window";

        // 创建右上角关闭按钮
        const closeButton = document.createElement("div");
        closeButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            background: #f44336;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            z-index: 10003;
            transition: all 0.2s ease;
        `;
        closeButton.innerHTML = "✕";
        closeButton.title = "关闭窗口";
        closeButton.id = "decrypt-close-btn";

        // 添加按钮悬停效果
        closeButton.addEventListener("mouseover", () => {
            closeButton.style.transform = "scale(1.1)";
        });

        closeButton.addEventListener("mouseout", () => {
            closeButton.style.transform = "scale(1)";
        });

        // 添加点击事件 - 隐藏主窗口
        closeButton.addEventListener("click", () => {
            mainWindow.style.display = "none";
        });

        // 将关闭按钮添加到主窗口
        mainWindow.appendChild(closeButton);

        // 创建侧边栏（请求列表）- 针对移动端优化宽度
        const sidebar = document.createElement("div");
        sidebar.style.cssText = `
            width: ${currentSidebarWidth}px;
            height: 100%;
            background: #f5f5f5;
            overflow-y: auto;
            border-right: 1px solid #ddd;
            padding: 10px 0;
            transition: width 0.3s ease;
            position: relative;
        `;
        sidebar.id = "decrypt-sidebar";

        // 创建侧边栏底部的清理按钮
        const clearBtn = document.createElement("button");
        clearBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 40px;
            height: 40px;
            background: #FF9800;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
            z-index: 10003;
        `;
        clearBtn.innerHTML = "🧹";
        clearBtn.title = "清空所有记录";
        clearBtn.id = "decrypt-clear-btn";

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

        // 添加清理按钮的点击效果
        clearBtn.addEventListener("mousedown", () => {
            clearBtn.style.transform = "translateX(-50%) scale(0.95)";
        });

        clearBtn.addEventListener("mouseup", () => {
            clearBtn.style.transform = "translateX(-50%) scale(1)";
        });

        // 创建新的侧边栏切换按钮
        const sidebarToggleBtn = document.createElement("div");
        sidebarToggleBtn.style.cssText = `
            position: fixed;
            left: ${currentSidebarWidth}px;
            top: 50%;
            transform: translateY(-50%);
            width: 24px;
            height: 60px;
            background: #2196F3;
            color: white;
            border-radius: 0 4px 4px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10002;
            box-shadow: 2px 0 5px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        `;
        sidebarToggleBtn.innerHTML = "◀";
        sidebarToggleBtn.title = "隐藏侧边栏";
        sidebarToggleBtn.id = "sidebar-toggle-btn";

        // 标题区域
        const titleArea = document.createElement("div");
        titleArea.style.cssText = `
            flex: 0 0 auto;
        `;
        titleArea.id = "decrypt-title-area";

        // 内容区域 - 优化移动端文本大小和滚动
        const contentDisplay = document.createElement("pre");
        contentDisplay.style.cssText = `
            flex: 1;
            margin: 0;
            padding: 10px;
            overflow: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
            font-family: monospace;
            font-size: ${isMobileDevice() ? "11px" : "13px"};
            -webkit-overflow-scrolling: touch; /* 提升移动端滚动性能 */
        `;
        contentDisplay.id = "decrypt-content-display";

        // 创建加载指示器
        const loadingIndicator = document.createElement("div");
        loadingIndicator.style.cssText = `
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border-radius: 5px;
            z-index: 10004;
        `;
        loadingIndicator.textContent = "加载中...";
        loadingIndicator.id = "decrypt-loading";

        // 创建工具栏 - 针对移动端优化
        const toolbar = document.createElement("div");
        toolbar.style.cssText = `
            padding: 10px;
            border-bottom: 1px solid #ddd;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
        `;
        toolbar.id = "decrypt-toolbar";

        // 创建工具栏按钮函数 - 移动端使用小圆点
        const createToolbarButton = (id, color, icon, title) => {
            const isMobile =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                ) || window.innerWidth < 768;

            const btn = document.createElement("button");

            if (isMobile) {
                // 移动端使用小圆点按钮
                btn.style.cssText = `
                    width: 32px;
                    height: 32px;
                    background: ${color};
                    color: white;
                    border: none;
                    border-radius: 50%;
                    margin-right: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    box-shadow: 0 2px 3px rgba(0,0,0,0.2);
                    transition: all 0.2s ease;
                `;
                btn.innerHTML = icon;
            } else {
                // 桌面端使用常规按钮
                btn.style.cssText = `
                    padding: 5px 10px;
                    background: ${color};
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                    margin-right: 10px;
                    font-size: 13px;
                    transition: all 0.2s ease;
                `;
                btn.textContent = title;
            }

            btn.id = id;
            btn.title = title;

            // 添加点击效果
            btn.addEventListener("mousedown", () => {
                btn.style.transform = "scale(0.95)";
            });

            btn.addEventListener("mouseup", () => {
                btn.style.transform = "scale(1)";
            });

            return btn;
        };

        // 添加复制按钮
        const copyBtn = createToolbarButton("decrypt-copy-btn", "#4CAF50", "📋", "复制内容");

        // 添加下载按钮
        const downloadBtn = createToolbarButton(
            "decrypt-download-btn",
            "#2196F3",
            "💾",
            "下载内容"
        );

        // 组装UI
        toolbar.appendChild(copyBtn);
        toolbar.appendChild(downloadBtn);

        contentArea.appendChild(toolbar);
        contentArea.appendChild(titleArea);
        contentArea.appendChild(contentDisplay);
        contentArea.appendChild(loadingIndicator);

        sidebar.appendChild(clearBtn);
        sidebar.appendChild(sidebarToggleBtn);
        mainWindow.appendChild(sidebar);
        mainWindow.appendChild(contentArea);

        container.appendChild(trigger);
        container.appendChild(mainWindow);

        document.body.appendChild(container);

        // 修改侧边栏切换逻辑
        let isSidebarVisible = true;

        function toggleSidebar() {
            if (isSidebarVisible) {
                sidebar.style.width = "0";
                sidebarToggleBtn.innerHTML = "▶";
                sidebarToggleBtn.title = "显示侧边栏";
                sidebarToggleBtn.style.left = "0";
                clearBtn.style.left = "-40px"; // 隐藏清理按钮
            } else {
                sidebar.style.width = `${currentSidebarWidth}px`;
                sidebarToggleBtn.innerHTML = "◀";
                sidebarToggleBtn.title = "隐藏侧边栏";
                sidebarToggleBtn.style.left = `${currentSidebarWidth}px`;
                clearBtn.style.left = "20px"; // 显示清理按钮
            }
            isSidebarVisible = !isSidebarVisible;
        }

        sidebarToggleBtn.addEventListener("click", toggleSidebar);

        // 移除移动设备检测的默认隐藏
        sidebarToggleBtn.style.left = `${currentSidebarWidth}px`;

        // 复制按钮事件
        copyBtn.addEventListener("click", () => {
            const text = contentDisplay.textContent;
            if (!text) return;

            navigator.clipboard.writeText(text).then(() => {
                // 创建临时提示元素
                const toast = document.createElement("div");
                toast.style.cssText = `
                    position: fixed;
                    bottom: 100px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 4px;
                    font-size: 14px;
                    z-index: 10005;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                toast.textContent = "复制成功！";
                document.body.appendChild(toast);

                // 显示提示
                setTimeout(() => {
                    toast.style.opacity = "1";
                }, 10);

                // 移除提示
                setTimeout(() => {
                    toast.style.opacity = "0";
                    setTimeout(() => {
                        document.body.removeChild(toast);
                    }, 300);
                }, 2000);

                // 保持原有的按钮反馈效果
                if (window.innerWidth < 768) {
                    const originalColor = copyBtn.style.background;
                    copyBtn.style.background = "#45a049";
                    setTimeout(() => {
                        copyBtn.style.background = originalColor;
                    }, 1000);
                } else {
                    copyBtn.textContent = "已复制!";
                    setTimeout(() => {
                        copyBtn.textContent = "复制内容";
                    }, 1000);
                }
            });
        });

        // 下载按钮事件 - 保持原有逻辑，但添加移动端反馈
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

            // 移动端和桌面端的不同反馈
            if (window.innerWidth < 768) {
                const originalColor = downloadBtn.style.background;
                downloadBtn.style.background = "#1976d2";
                setTimeout(() => {
                    downloadBtn.style.background = originalColor;
                }, 1000);
            } else {
                downloadBtn.textContent = "已下载!";
                setTimeout(() => {
                    downloadBtn.textContent = "下载内容";
                }, 1000);
            }
        });

        // 修改清理按钮事件处理
        clearBtn.addEventListener("click", () => {
            const dialog = document.getElementById("decrypt-confirm-dialog");
            const content = dialog.querySelector("div");

            // 显示对话框
            dialog.style.display = "block";
            setTimeout(() => {
                dialog.style.opacity = "1";
                content.style.transform = "translate(-50%, -50%) scale(1)";
            }, 10);

            // 取消按钮事件
            document.getElementById("decrypt-confirm-cancel").onclick = () => {
                dialog.style.opacity = "0";
                content.style.transform = "translate(-50%, -50%) scale(0.9)";
                setTimeout(() => {
                    dialog.style.display = "none";
                }, 300);
            };

            // 确认按钮事件
            document.getElementById("decrypt-confirm-ok").onclick = () => {
                dialog.style.opacity = "0";
                content.style.transform = "translate(-50%, -50%) scale(0.9)";
                setTimeout(() => {
                    dialog.style.display = "none";
                    // 执行清空操作
                    decryptedRequests.length = 0;
                    updateRequestList();
                    titleArea.innerHTML = "";
                    contentDisplay.textContent = "";
                    contentDisplay.dataset.index = "";
                    currentViewingIndex = -1;
                    detailsLoaded = false;

                    // 添加视觉反馈
                    clearBtn.style.background = "#F44336";
                    setTimeout(() => {
                        clearBtn.style.background = "#FF9800";
                    }, 500);
                }, 300);
            };

            // 点击背景关闭
            dialog.onclick = (e) => {
                if (e.target === dialog) {
                    dialog.style.opacity = "0";
                    content.style.transform = "translate(-50%, -50%) scale(0.9)";
                    setTimeout(() => {
                        dialog.style.display = "none";
                    }, 300);
                }
            };
        });

        // 修改触发器悬停效果
        trigger.addEventListener("mouseover", () => {
            trigger.style.transform = "scale(1.1)";
        });

        trigger.addEventListener("mouseout", () => {
            trigger.style.transform = "scale(1)";
        });

        // 修改触发器点击事件
        trigger.addEventListener("click", function () {
            const mainWindow = document.getElementById("decrypt-main-window");
            if (mainWindow.style.display === "none") {
                mainWindow.style.display = "flex";
                // 如果有数据且没有选中的请求，自动选择第一个
                if (decryptedRequests.length > 0 && currentViewingIndex === -1) {
                    showRequestPreview(0);
                }
            } else {
                mainWindow.style.display = "none";
            }
        });

        return container;
    };

    // 更新请求列表
    const updateRequestList = () => {
        const sidebar = document.getElementById("decrypt-sidebar");
        if (!sidebar) return;

        // 保存清理按钮和切换按钮
        const clearBtn = document.getElementById("decrypt-clear-btn");
        const sidebarToggleBtn = document.getElementById("sidebar-toggle-btn");

        // 清空侧边栏内容，但保留按钮
        const requestListContainer = document.createElement("div");
        requestListContainer.style.cssText = `
            padding-bottom: 80px; /* 为底部按钮留出空间 */
        `;

        if (decryptedRequests.length === 0) {
            const emptyMsg = document.createElement("div");
            emptyMsg.style.cssText = `
                padding: 20px;
                color: #666;
                text-align: center;
            `;
            emptyMsg.textContent = "暂无解密数据";
            requestListContainer.appendChild(emptyMsg);
        } else {
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
                // 获取路径最后一段用于简洁显示
                const shortUrlPath = getLastPathSegment(request.url);

                // 计算数据大小
                const dataStr = JSON.stringify(request.decryptedData);
                const dataSize = formatSize(new Blob([dataStr]).size);

                item.innerHTML = `
                    <div style="font-weight: bold; font-size: 12px; margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${urlPath}">
                        ${shortUrlPath}
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
                    showRequestPreview(index);
                    currentViewingIndex = index;
                });

                // 如果是当前查看的项目，就设置背景色
                if (index === currentViewingIndex) {
                    item.style.background = "#e1f5fe";
                }

                requestListContainer.appendChild(item);
            });
        }

        // 清空侧边栏并重新添加内容
        sidebar.innerHTML = "";
        if (clearBtn) sidebar.appendChild(clearBtn);
        if (sidebarToggleBtn) sidebar.appendChild(sidebarToggleBtn);
        sidebar.appendChild(requestListContainer);

        // 更新计数器
        updateCounterNumber();
    };

    // 显示请求预览（仅显示基本信息，不加载所有数据）
    const showRequestPreview = (index) => {
        console.log("显示请求预览:", index);
        const request = decryptedRequests[index];
        if (!request) {
            console.error("请求不存在:", index);
            return;
        }

        const titleArea = document.getElementById("decrypt-title-area");
        const contentDisplay = document.getElementById("decrypt-content-display");

        if (!titleArea || !contentDisplay) {
            console.error("UI元素不存在");
            return;
        }

        // 更新内容区域索引
        contentDisplay.dataset.index = index;

        // 记录当前查看的索引
        currentViewingIndex = index;

        // 显示请求信息
        const urlPath = getPathFromUrl(request.url);
        const dataSize = formatSize(new Blob([JSON.stringify(request.decryptedData)]).size);

        titleArea.innerHTML = `
            <div style="padding: 10px; background: #f9f9f9; border-bottom: 1px solid #ddd;">
                <div style="font-weight: bold; margin-bottom: 5px; word-break: break-all;">${urlPath}</div>
                <div style="font-size: 12px; color: #666; display: flex; flex-wrap: wrap;">
                    <span style="margin-right: 15px; margin-bottom: 5px;">方法: ${request.method}</span>
                    <span style="margin-right: 15px; margin-bottom: 5px;">时间: ${request.timestamp}</span>
                    <span style="margin-bottom: 5px;">大小: ${dataSize}</span>
                </div>
            </div>
        `;

        // 移动端预加载优化: 只显示前1000个字符的内容预览
        if (isMobileDevice() && JSON.stringify(request.decryptedData).length > 2000) {
            const preview = JSON.stringify(request.decryptedData, null, 2).substring(0, 1000);
            contentDisplay.textContent =
                preview + "\n\n...\n\n(数据较大，已显示部分内容。滚动查看更多...)";

            // 添加延迟加载
            setTimeout(() => {
                if (currentViewingIndex === index) {
                    contentDisplay.textContent = JSON.stringify(request.decryptedData, null, 2);
                }
            }, 500);
        } else {
            // 直接显示完整数据
            contentDisplay.textContent = JSON.stringify(request.decryptedData, null, 2);
        }
    };

    // 加载并显示完整的请求详情
    const loadFullDetails = (index) => {
        const request = decryptedRequests[index];
        if (!request) return;

        // 显示加载指示器
        const loadingIndicator = document.getElementById("decrypt-loading");
        if (loadingIndicator) loadingIndicator.style.display = "block";

        // 使用延迟来允许UI更新并显示加载指示器
        setTimeout(() => {
            const contentDisplay = document.getElementById("decrypt-content-display");
            if (!contentDisplay) return;

            // 显示完整的解密内容
            contentDisplay.textContent = JSON.stringify(request.decryptedData, null, 2);

            // 标记详细内容已加载
            detailsLoaded = true;

            // 隐藏加载指示器
            if (loadingIndicator) loadingIndicator.style.display = "none";

            // 如果是手机设备，更新"查看完整内容"按钮为"已加载"状态
            if (isMobileDevice()) {
                const viewDetailsBtn = document.getElementById("view-details-btn");
                if (viewDetailsBtn) {
                    viewDetailsBtn.textContent = "数据已加载完成";
                    viewDetailsBtn.style.background =
                        "linear-gradient(to bottom, #4CAF50, #3d8b40)";
                    viewDetailsBtn.disabled = true;
                    viewDetailsBtn.style.cursor = "default";
                }
            }

            // 滚动到顶部
            contentDisplay.scrollTop = 0;
        }, 50); // 短延迟以确保UI更新
    };

    // 创建周期性计数器更新函数和监听器
    const setupCounterUpdater = () => {
        // 初始状态更新一次
        setTimeout(updateCounterFromData, 500);

        // 设置定期检查更新
        const counterInterval = setInterval(updateCounterFromData, 2000);

        // 页面可见性变化时更新
        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) {
                updateCounterFromData();
            }
        });

        // 如果页面关闭/刷新时清除定时器
        window.addEventListener("beforeunload", () => {
            clearInterval(counterInterval);
        });
    };

    // 从数据源直接更新计数器，不依赖调用位置
    const updateCounterFromData = () => {
        const count = decryptedRequests.length;
        const trigger = document.getElementById("decrypt-trigger");

        if (!trigger) {
            console.debug("计数器元素不存在，创建界面");
            ensureUIInitialized();
            return; // 下一个周期会再次尝试
        }

        const currentCount = parseInt(trigger.textContent || "0");

        // 只有当计数变化时才更新
        if (currentCount !== count) {
            console.log("更新计数器:", currentCount, "->", count);
            trigger.textContent = count.toString();

            // 当有新增数据时，提供视觉反馈
            if (count > currentCount && count > 0) {
                // 添加动画效果
                trigger.style.transition = "all 0.3s ease";
                trigger.style.background = "#F44336"; // 红色背景
                trigger.style.transform = "scale(1.2)";

                setTimeout(() => {
                    trigger.style.background = "#2196F3"; // 恢复蓝色
                    trigger.style.transform = "scale(1)";
                }, 1000);
            }
        }
    };
    // 修改原计数器更新函数，调用新函数
    function updateCounterNumber() {
        updateCounterFromData();
    }

    // 修改添加解密请求函数，优化移动端性能
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

        // 限制存储的请求数量，防止内存过度消耗
        if (decryptedRequests.length > 100) {
            decryptedRequests.pop();
        }

        console.log("添加解密请求:", decryptedRequests);

        // 确保UI已初始化
        ensureUIInitialized();

        // 立即尝试更新计数器一次
        updateCounterFromData();

        // 更新请求列表
        updateRequestList();

        // 如果是第一个请求，自动显示其详情
        if (decryptedRequests.length === 1) {
            showRequestPreview(0);
        }
    };

    // 确保UI已初始化
    const ensureUIInitialized = () => {
        if (!document.getElementById("decrypt-container")) {
            console.log("初始化UI");
            createMultiRequestViewer();
            // 在UI初始化后设置计数器更新系统
            setupCounterUpdater();
        }

        // 确保主窗口和内容区域存在
        const mainWindow = document.getElementById("decrypt-main-window");
        const contentDisplay = document.getElementById("decrypt-content-display");
        const trigger = document.getElementById("decrypt-trigger");

        if (mainWindow && contentDisplay) {
            // 确保内容显示区可见且正确定位
            contentDisplay.style.display = "block";
            contentDisplay.style.maxHeight = "calc(100% - 100px)";
            contentDisplay.style.overflow = "auto";
        }

        // 确保触发器存在且显示正确的数量
        if (trigger) {
            trigger.style.display = "flex";
            trigger.textContent = decryptedRequests.length.toString();
        }
    };

    // 拦截所有网络请求
    const hookAjax = () => {
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;
        const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

        XMLHttpRequest.prototype.open = function (method, url, ...args) {
            this._url = url;
            this._method = method;
            this._requestHeaders = {};
            return originalOpen.apply(this, [method, url, ...args]);
        };

        XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
            this._requestHeaders = this._requestHeaders || {};
            this._requestHeaders[header] = value;
            return originalSetRequestHeader.apply(this, arguments);
        };

        XMLHttpRequest.prototype.send = function (body) {
            ensureUIInitialized();

            const originalStateChange = this.onreadystatechange;
            this.onreadystatechange = function () {
                if (this.readyState === 4) {
                    try {
                        const response = JSON.parse(this.responseText);

                        if (response.body) {
                            try {
                                const decrypted = decryptByAES(response.body);
                                addDecryptedRequest(this._url, this._method, JSON.parse(decrypted));
                            } catch (e) {
                                console.error("响应体解密失败:", e);
                            }
                        } else if (response.encryptData) {
                            try {
                                const decrypted = decryptByAES(response.encryptData);
                                addDecryptedRequest(this._url, this._method, JSON.parse(decrypted));
                            } catch (e) {
                                console.error("响应体解密失败:", e);
                            }
                        }

                        if (typeof body === "string") {
                            try {
                                const decryptedBody = decryptByAES(body);
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
            ensureUIInitialized();

            try {
                const response = await originalFetch.apply(this, arguments);
                const clonedResponse = response.clone();
                try {
                    const jsonData = await clonedResponse.json();

                    if (jsonData.body) {
                        try {
                            const decrypted = decryptByAES(jsonData.body);
                            addDecryptedRequest(url, init?.method || "GET", JSON.parse(decrypted));
                        } catch (e) {
                            console.error("响应体解密失败:", e);
                        }
                    } else if (jsonData.encryptData) {
                        try {
                            const decrypted = decryptByAES(jsonData.encryptData);
                            addDecryptedRequest(url, init?.method || "GET", JSON.parse(decrypted));
                        } catch (e) {
                            console.error("响应体解密失败:", e);
                        }
                    }

                    if (init?.body && typeof init.body === "string") {
                        try {
                            const decryptedBody = decryptByAES(init.body);
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
        hookAjax();
        hookFetch();

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
