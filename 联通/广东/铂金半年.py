import requests
import json
import uuid
import time
import datetime


cookies = {
    "_pk_ses.3.8064": "1",
    "_pk_id.3.8064": "6f6f765dcdfec8f1.1742351582.1.1742351605.1742351583."
}

# 1742364790967441要这个位数的时间戳

ts = int(time.time() * 1000000)





# 获取验证码
def get_code():
 
    url = "https://gdlive.17wo.cn/stVsed/getSmsCodeNew"
    data = {
    "serialNumber": phone,
    "tradeId": ts,
    "productId": "511205125519",
    "agentId": f"10010xxl_lyhzq&fixRecomdType=50&jump=qyzx&rsrvStr2=quanyi_home_1&serialNumber={phone}",
    "fixRecomdType": "50",
    "nextIntfKey": str(uuid.uuid4()),
    "pageSn": ts,
    "code": "26311910"
    }
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, cookies=cookies, data=data)
    return response.json()

def verify_captcha(code,nextIntfKey,bussinessId,key):
    url = "https://gdlive.17wo.cn/stVsed/verifyCaptcha"
    data = {
        "serialNumber": phone,
        "smsCode": code,
        "tradeId": ts,
        "smsType": 0,
        "guideSeat": "",
        "realChnl": "",
        "stationId": "",
        "pageSn": ts,
        "productId": "511205125519",
        "bussinessId": bussinessId,
        "key": key,
        "agentId": f"10010xxl_lyhzq&fixRecomdType=50&jump=qyzx&rsrvStr2=quanyi_home_1&serialNumber={phone}",
        "fixRecomdType": "50",
        "nextIntfKey": nextIntfKey
    }
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, cookies=cookies, data=data)
    return response.json()


# def qryForClOrderSed(code):
#     url = "https://gdlive.17wo.cn/stVsed/qryForClOrderSed"
#     data = {
#         "serialNumber": phone,
#         "productIds": "511205125519",
#         "dateType": "5",
#         "teamCode": "004",
#         "orderType": "2",
#         "smsCode": code
#     }
#     data = json.dumps(data, separators=(',', ':'))
#     response = requests.post(url, headers=headers, cookies=cookies, data=data)
#     return response.json()


def saveStOrder(code , nextIntfKey,bussinessId,sendCodeTime):

    url = "https://gdlive.17wo.cn/stVsed/saveStOrder"
    # 获取当前时间的ISO格式字符串
    current_time_iso = datetime.datetime.now().isoformat() + "Z"
    
    data = {
        "userId": phone,
        "productId": "511205125519",
        "productName": "<span style=\"font-size:7vw\">2款热门会员</span><br>15元/月",
        "goodId": "800000258",
        "goodName": "铂金半年会员",
        "fee": "0",
        "payFee": "0",
        "outOrderId": int(time.time() * 1000000),
        "tradeId": ts,
        "goodType": "畅享铂金半年会员",
        "rsrvStr13": "10010xxl_lyhzq",
        "puCon": {
            "serialNumber": ts,
            "userId": phone,
            "stage": "mounted",
            "channelId": "10010xxl_lyhzq",
            "business": "result",
            "businessDesc": "畅享铂金半年会员",
            "page": "/Playplatinum",
            "startTime": current_time_iso,
            "goodsId": "800000258",
            "productId": "511205125519",
            "pageIndex": "0",
            "fixRecomdType": "50",
            "homeIndex": "home",
            "rsrvStr2": "10010xxl_lyhzq",
            "sendCodeTime": sendCodeTime
        },
        "fixRecomdType": "50",
        "nextIntfKey": nextIntfKey,
        "bussinessId": bussinessId,
        "isSecureLimit": "0",
        "smsCode": code
    }

    # 将data写入文件
    with open("data.json", "w") as f:
        f.write(json.dumps(data, separators=(',', ':')))
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, cookies=cookies, data=data)
    return response.json()

phone = "13149080003"
headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "POST,GET",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://gdlive.17wo.cn",
    "Pragma": "no-cache",
    "Referer": f"https://gdlive.17wo.cn/olduser/Playplatinum/?chnl_id=10010xxl_lyhzq&fixRecomdType=50&jump=qyzx&rsrvStr2=quanyi_home_1&serialNumber={phone}",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 Edg/134.0.0.0",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\""
}
response_data = get_code()
sendCodeTime = int(time.time() * 1000)
print(response_data)
nextIntfKey = response_data["nextIntfKey"]
bussinessId = response_data["bussinessId"]
key = response_data["key"]
# # 控制台询问验证码，
code = input("请输入验证码：")
resp = verify_captcha(code,nextIntfKey,bussinessId,key)
print(resp)
while resp["respCode"] == "8888":
    code = input("验证码不正确，请重新输入：")
    resp = verify_captcha(code,nextIntfKey,bussinessId,key)
    print(resp)

if not resp["respCode"] == "0000":
    print("验证码不正确")
    exit()

nextIntfKey = resp["nextIntfKey"]
resp = saveStOrder(code,nextIntfKey,bussinessId,sendCodeTime)

print(resp)


