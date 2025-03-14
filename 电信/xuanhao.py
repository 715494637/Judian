import requests

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Access-Control-Allow-Origin": "*",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Origin": "https://gd.189.cn",
    "Referer": "https://gd.189.cn/TS/tysj/xhb/index.html",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 Edg/134.0.0.0",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\""
}
url = "https://gd.189.cn/uniteWeb/J/J50091.j"
data = {
    "d.d01": "755",
    "d.d02": "UNITETOUCH",
    "d.d03": "01",
    "d.d04": "321002200402130030",
    "d.d05": "%E6%88%B4%E7%B2%A4%E9%B9%8F",
    "d.d06": "13696458853",
    "d.d07": "19168772664",
    "d.d08": "JK_NUMPOOL_pool_755",
    "d.d09": "https://gd.189.cn/TS/tysj/xhb/index.html#/"
}
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)