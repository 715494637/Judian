import requests


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://aixldc01.cc",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://aixldc01.cc/",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Microsoft Edge\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0",
    "x-client-id": "vue-client"
}
url = "https://ld01.aixwebfx001.top/view/shareUserIncome/1950808184285294592"
data = {
    "\"wjRJWK3baizagc4xo6bR4A": "=\""
}
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)
