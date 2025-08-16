import requests
import json
import time
import threading

data = [
    {
        "phone": "18327067711",
        "access_token": "f939be3b-19dd-4937-8e9c-c8bd5339ed5b",    
        "refresh_token": "e138847a-9163-4b3d-adb7-8f2865e66cbf", 
    },
    {
        "phone": "13696458853",
        "access_token": "2398dfa6-2426-4cb8-8724-d78227ee5b64"
    },
    {
        "phone": "13828737448",
        "access_token": "c5f0f9ef-524c-4718-b312-8281052d73a4"
    },
    {
        "phone": "18124666606",
        "access_token": "47229d41-aa34-4355-acbe-144ee8eb3541"
    },
    {
        "phone": "13914428326",
        "access_token": "d0798263-dab5-4dd7-92be-5eeb5a07f362"
    },
    {
        "phone": "18926804834",
        "access_token": "b78bb09b-4cfa-4b3c-9a1a-ba2db7e79689"
    }
]

def vote(id, access_token, phone):
    headers = {
        "Host": "panservice.mail.wo.cn",
        "Connection": "keep-alive",
        "sec-ch-ua-platform": "\"Android\"",
        "requestTime": str(int(time.time() * 1000)),
        "sec-ch-ua": "\"Android WebView\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
        "clientId": "1001000165",
        "X-YP-Client-Id": "1001000165",
        "sec-ch-ua-mobile": "?1",
        "X-SH-Access-Token": "",
        "User-Agent": "Mozilla/5.0 (Linux; Android 14; PGT-AN10 Build/HONORPGT-AN10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/137.0.7151.115 Mobile Safari/537.36/woapp LianTongYunPan/5.0.3 (Android 14)",
        "Accept": "application/json, text/plain, */*",
        "source-type": "woapi",
        "X-YP-Access-Token": access_token,
        "Content-Type": "application/json",
        "access_token": access_token,
        "Origin": "https://panservice.mail.wo.cn",
        "X-Requested-With": "com.chinaunicom.bol.cloudapp",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Referer": "https://panservice.mail.wo.cn/h5/activitymobile/memoryDetail?id=803&clientId=1001000035&activityId=MjQ%3D&token=" + access_token,
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
    }

    url = "https://panservice.mail.wo.cn/activity/activity-task/vote"
    payload = {
        "activityId": "MjQ=",
        "id": id
    }
    payload = json.dumps(payload, separators=(',', ':'))
    
    for i in range(3):  # 每个token发送3次请求
        try:
            response = requests.post(url, headers=headers, data=payload)
            print(f"[{time.strftime('%H:%M:%S')}] Phone: {phone} | 请求 {i+1}/3 | 状态码: {response.status_code} | 响应: {response.text.strip()}")
        except Exception as e:
            print(f"[{time.strftime('%H:%M:%S')}] Phone: {phone} | 请求 {i+1}/3 失败: {str(e)}")
        time.sleep(0.5)  # 每次请求间隔0.5秒

# 创建并启动线程
threads = []
for entry in data:
    thread = threading.Thread(target=vote, args=(803, entry["access_token"], entry["phone"]))
    threads.append(thread)
    thread.start()

# 等待所有线程完成
for thread in threads:
    thread.join()

print("所有投票请求已完成！")
