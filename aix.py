import requests


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://ld01.aixwebfx001.top",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://ld01.aixwebfx001.top/viewVideoRecommend?shareUserId=1944756899444338688",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36 Edg/138.0.0.0",
    "x-client-id": "vue-client"
}

url = "https://ld01.aixwebfx001.top/view/shareUserIncome/1944756899444338688"
data = {
    "\"wjRJWK3baizagc4xo6bR4A": "=\""
}
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)