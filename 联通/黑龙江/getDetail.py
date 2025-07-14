import requests
import json


headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://app1.hlj165.com",
    "Pragma": "no-cache",
    "Referer": "https://app1.hlj165.com/app/activiteDraw/index?source=sms&custCode=aaJFGi",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 Edg/134.0.0.0",
    "app_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJib25jIiwidXNlckAjJEluZm9AYm9uYyI6IntcImFyZWFfY29kZVwiOlwiMDQ1MVwiLFwiY2l0eV9jb2RlXCI6XCI5NzFcIixcImludmFsaWRfYXRcIjpcIjIwMjUtMDQtMDIgMjA6MDg6MDBcIixcInByb3ZpbmNlX2NvZGVcIjpcIjk3XCIsXCJ1c2VyX2lkXCI6XCIxMzEzNjY3MDkyM1wifSIsImV4cCI6MTc0MzQyMjg4MCwiaWF0IjoxNzQzMzM2NDgwfQ.RkK1aJjgNiujlIlc719rqWyjOm9zVLFZqtboVAJJxcM",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\""
}
cookies = {
    "_pk_ses.3.c569": "1",
    "JSESSIONID": "0FB8EE75C393597A27388B59786FB3BE",
    "_pk_id.3.c569": "8bfb181b46af848a.1743253354.10.1743337526.1743335519."
}
url = "https://app1.hlj165.com/bonc-api/rest/app/product/getProductDetailByCond"
data = {
    "productIdSet": [
        "91238517",
        "91376244",
        "91326526",
        "90987862",
        "90987873",
    ]
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, data=data)

print(response.text)
print(response)