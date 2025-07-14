import requests
import json
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import base64
import json

# phone = "13149080003"
# token = "a1283eca-ba27-4a64-9329-a041b0e57975"

phone = "13696458853"
token = "5cfd12fc-5075-4ebe-8277-ed25fb2c1893"
benefitId = 2

param = f'{{"operateType":"1","phone":"{phone}"}}'

def encrypt(data, key="Py1J67PAQoCb8Iel"):
    key = key[:16] if key and len(key) > 16 else key
    data_bytes = json.dumps(data).encode('utf-8') if isinstance(data, dict) else data.encode('utf-8')
    key_bytes = key.encode('utf-8')
    iv_bytes = "wNSOYIB1k1DjY5lA".encode('utf-8')
    cipher = AES.new(key_bytes, AES.MODE_CBC, iv_bytes)
    padded_data = pad(data_bytes, AES.block_size)
    encrypted_bytes = cipher.encrypt(padded_data)
    return base64.b64encode(encrypted_bytes).decode('utf-8')

param = encrypt(param)
print("加密后参数：",param)

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Access-Token": token,
    "Cache-Control": "no-cache",
    "Client-Id": "1001000003",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://panservice.mail.wo.cn",
    "Pragma": "no-cache",
    "Referer": f"https://panservice.mail.wo.cn/h5/wocloudorder/benefitMenu?clientId=1001000003&token={token}",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36 Edg/136.0.0.0",
    "X-YP-Access-Token": token,
    "X-YP-Client-Id": "1001000003",
    "accesstoken": token,
    "requestTime": "1748745835916",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Microsoft Edge\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\""
}


url = "https://panservice.mail.wo.cn/api-user/sendMessageCodeBase"
data = {
    "func": "token_send",
    "clientId": 1001000003,
    "param": param
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers,  data=data)
print(response.text)
print(response)

code = input("请输入验证码：")
url = "https://panservice.mail.wo.cn/wohome/api/v1/membership/claimBenefit"
data = {
    "cloudPkgId": 266799324,
    "benefitId": benefitId,
    "smsCode": code
}
data = json.dumps(data, separators=(',', ':'))
response = requests.put(url, headers=headers, data=data)
print(response.text)
print(response)
