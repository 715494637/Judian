
import requests
import time
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import base64
import hashlib




class Heilongjiang:
    def __init__(self, phoneNumber):
        self.awards = []
        self.phoneNumber = phoneNumber
        self.private_key = "e997e6895ff2418e811166f5a2b5db8a"
        self.key = 'boncAes23Monitor'.encode('utf-8')
        self.iv = 'iv.bonc.20231234'.encode('utf-8')
        self.session = requests.session()
        self.session.headers = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Content-Type": "application/json",
            "Origin": "https://app1.hlj165.com",
            "Referer": "https://app1.hlj165.com/app/activiteDraw/index?source=sms&custCode=aaJFGi",
        }

    def encrypt_data(self, data):
        cipher = AES.new(self.key, AES.MODE_CBC, self.iv)
        padded_data = pad(data.encode('utf-8'), AES.block_size)
        encrypted = cipher.encrypt(padded_data)
        return base64.b64encode(encrypted).decode('utf-8')
    
    def get_token(self):
        url = "https://app1.hlj165.com/bonc-api/rest/app/unicom/getAppTokenByCond"
        data = {
            "phoneNumber": self.encrypt_data(self.phoneNumber),
            "flag": "0"
        }
        response = self.session.post(url, json=data)
        self.session.headers['app_token'] = response.json()['value']['app_token']

    def add_header_sign(self,ts=int(time.time()*1000)):
        key = self.private_key
        phone = self.phoneNumber
        sign = hashlib.md5(f"{phone}{ts}{key}".encode('utf-8')).hexdigest()
        self.session.headers.update({"timestamp": str(ts)})
        self.session.headers.update({"phoneNumber": phone})
        self.session.headers.update({"sign":sign})
        return sign


    def get_award(self):
        # random_phone = "134" + str(random.randint(10000000, 99999999))
        # print("随机手机号",random_phone)
        random_phone = self.phoneNumber
        url = "https://app1.hlj165.com/bonc-api/bonc-activity/draw/awradResult"
        data = {
            "activityId": "h1F1uWNdV35BuVMFT9IYJg%3D%3D",
            "mobile": random_phone
        }
        response = self.session.post(url, json=data)
        return response.json()
    
    def award_list(self):
        url = "https://app1.hlj165.com/bonc-api/bonc-activity/draw/userAwardLogNoAesList"
        data = {
            "startDate": "2025-03-01 00:00:00",
            "activityInstanceIds": "10009",
            "endDate": "2099-12-31 23:59:59",
            "phoneNumber": self.phoneNumber
        }
        response = self.session.post(url, json=data)
        for i in response.json()['data']:
            if i['receiveStatus'] == '0':
                self.awards.append({
                    "awardId":i['awardId'],
                    "extendId": i['extendId']
                  })
        print (self.awards)
        return self.awards
    
    
    def process_award(self,awardId,extendId):
        data = {
            "param": f'{{"drawRecordId":"{awardId}"}}',
            "productId": extendId,
            "verifyCode": None,
            "productIdSet": None,
            "phoneNumber": self.phoneNumber,
            "provinceCode": "97",
            "cityCode": "971",
            "optType": "00",
            "orderType": "1",
            "enableTag": "1",
            "productType": "1",
            "activityId": "",
            "strategyId": "",
            "remark": "",
            "pageName": "幸运九宫格",
            "sourcePage": "黑龙江联通老用户专区-短信",
            "tenantId": "900005",
            "price": 0
            }
        if extendId == "90987862":
            data.update({
                "productName": "1GB流量日包(免费版) (1)",
                "commId": "973211083547"
                })
        elif extendId == "90987873":
             data.update({
                 "productName": "2GB流量日包(免费版)",
                "commId": "973211083712"
                })
        else: 
            print("DEBUG_MODE")
            data.update({
                
                })
        return data
    
    def  get_sms_code(self,productId):
        url = "https://app1.hlj165.com/bonc-api/rest/app/sms/getSMSCode"
        data = {
         "commId":"",
         "phoneNumber":self.phoneNumber,
         "productId":productId,
         "templateFlag":"1"
         }
        response = self.session.post(url, json=data)
        return response.json()      
    
    def check_sms_code(self,verifyCode):
        url = "https://app1.hlj165.com/bonc-api/rest/app/sms/checkSMSCode"
        data = {
            "verifyCode": verifyCode,
            "phoneNumber": self.phoneNumber
        }
        response = self.session.post(url, json=data)
        return response.json()
    
    def product_order(self,awardId,extendId):
        url = "https://app1.hlj165.com/bonc-api/rest/app/order/addProductOrder"
        self.add_header_sign()
        data = self.process_award(awardId,extendId)
        response = self.session.post(url, json=data)
        print(response.json())
        return response.json()
    

    

hei = Heilongjiang('13136670923')
hei.get_token()
# get_award = hei.get_award()
# print(get_award)
# awardId = get_award["data"]["awardId"]
# extend = get_award["data"]["extend"]
# print("awardId",awardId,"extend",extend)
awardId = "1879415500017025027"
extend = "90987862"
get_sms = hei.get_sms_code(extend)
print("验证码发送响应：")
print(get_sms)
code = input("请输入验证码：")
check_sms = hei.check_sms_code(code)
print("验证码检查响应：")
print(check_sms)
hei.product_order(awardId,extend)

