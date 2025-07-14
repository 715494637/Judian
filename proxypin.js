// 在请求到达服务器之前,调用此函数,您可以在此处修改请求数据
// e.g. Add/Update/Remove：Queries、Headers、Body
async function onRequest(context, request) {
    console.log(request.url);
    //URL queries
    //request.queries["name"] = "value";
    //Update or add Header
    var body = JSON.parse(request.body);
    if (body["PRODUCT_ID"]) {
        console.log(body["PRODUCT_ID"]);
        body["PRODUCT_ID"] = "91375678";
    }

    // Update Body use fetch API request，具体文档可网上搜索fetch API
    //request.body = await fetch('https://www.baidu.com/').then(response => response.text());
    return request;
}

//You can modify the Response Data here before it goes to the client
async function onResponse(context, request, response) {
    //Update or add Header
    // response.headers["Name"] = "Value";
    // response.statusCode = 200;

    //var body = JSON.parse(response.body);
    //body['key'] = "value";
    //response.body = JSON.stringify(body);
    return response;
}
