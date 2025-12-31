import requests


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://aixldc09.shop",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://aixldc09.shop/viewVideoRecommend?shareUserId=1950808184285294592",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0",
    "x-client-id": "vue-client"
}
url = "https://aixldc09.shop/api/view/shareUserIncome/1950808184285294592"
data = {
    "\"wjRJWK3baizagc4xo6bR4A": "=\""
}
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)
