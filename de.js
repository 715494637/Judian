// 在请求到达服务器之前,调用此函数,您可以在此处修改请求数据
// 例如Add/Update/Remove：Queries、Headers、Body

const num = 3100;
const url = "https://gsqhzvncrktdbnajsyxj.supabase.co";
const key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzcWh6dm5jcmt0ZGJuYWpzeXhqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTAzNTk4OCwiZXhwIjoyMDI2NjExOTg4fQ.wgUq0pfO9TcdQS2fwDVaE3WTAbLp7s0M-6dqJmmEux8";

async function updateQuantity(account, quantity) {
    const headers = {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
    };
    const body = {
        quantity: quantity,
    };
    return await fetch(`${url}?account=eq.${encodeURIComponent(account)}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(body),
    });
}
async function onRequest(context, request) {
    console.log("context---" + JSON.stringify(context));
    const queryParams = [
        `select=accessToken,account`,
        `quantity=gt.${num}`,
        `order=quantity.asc`,
        `limit=1`,
    ];
    const fullUrl = `${url}/rest/v1/Judian-Accounts?${queryParams.join("&")}`;
    const data = await fetch(fullUrl, {
        method: "GET",
        headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
        },
    });
    console.log("获取到的数据---" + JSON.stringify(data));
    if (data.length === 0) throw new Error("没有可用的账号");
    const account = data[0].account;
    const accessToken = data[0].accessToken;
    console.log("使用账号---" + account);
    console.log("使用token---" + accessToken);
    context.account = account;
    context.accessToken = accessToken;
    request.headers["Authorization"] = `Bearer ${accessToken}`;
    return request;
}

// 在将响应数据发送到客户端之前,调用此函数,您可以在此处修改响应数据
async function onResponse(context, request, response) {
    //Update or add Header
    // response.headers["Name"] = "Value";
    // response.statusCode = 200;
    var body = JSON.parse(response.body);
    if (response.data["code"] == "200") {
        const res = await fetch("http://111.230.160.82/user/fund/getFund", {
            headers: {
                Authorization: `Bearer ${context.accessToken}`,
            },
        });
        console.log("调试信息1---" + JSON.stringify(res));
        const data = await res.json();
        const quantity = data["data"]["quantity"];
        const r = await updateQuantity(context.account);
        console.log("调试信息2---" + JSON.stringify(r));
        if (!quantity) {
            body["dev"] = context.account + "信息更新失败";
        } else {
            body["dev"] = context.account + "信息更新成功, 当前数量为：" + quantity;
        }
    }
    response.body = JSON.stringify(body);
    return response;
}
