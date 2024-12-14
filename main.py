
from datetime import datetime, timezone, timedelta
import requests
import json
import time
import random
import re
import threading
from supabase import create_client, Client

url = "https://gsqhzvncrktdbnajsyxj.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzcWh6dm5jcmt0ZGJuYWpzeXhqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTAzNTk4OCwiZXhwIjoyMDI2NjExOTg4fQ.wgUq0pfO9TcdQS2fwDVaE3WTAbLp7s0M-6dqJmmEux8"
defualtInvitedCode = "USND7YZDRX"
defualtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjk2MzUyLCJBcHAtTnVtYmVyIjoiNDdiZmEwNmI5MGFkNDE3NCIsImlhdCI6MTczNDA1OTg4MSwibmJmIjoxNzM0MDU5ODgxLCJleHAiOjE3MzUzNTU4ODF9.3Whaz8-DtoS1LAThoTl9TpDoOk94UOFV3-sXdIcCLMs"
passWord = "dddd1111"

class Register:
    def __init__(self) -> None:
        self.acc = ""
        self.headers:str =  {
            "Host": "api.mail.cx",
            "Connection": "keep-alive",
            "Authorization": f"Bearer {Register.auth()}",
            "Referer": "https://api.mail.cx/",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9"
        }
        pass

    
    def getAccount(self) -> str:
        #随机生成一个9位英文和数字组合@nqmo.com的邮箱
        acc =  "".join(random.sample('1234567890abcdefghijklmnopqrstuvwxyz', 9)) + "@nqmo.com"
        print("账号为：" + acc)
        self.acc = acc
        return acc

    @staticmethod
    def auth() -> str:
        url = "https://api.mail.cx/api/v1/auth/authorize_token"
        response = requests.post(url)
        return response.json()
        

    def getId(self,account : str):
        url = f"https://api.mail.cx/api/v1/mailbox/{account}"
        response = requests.get(url, headers=self.headers)

        # 检查响应状态码是否为200，确保请求成功
        if response.status_code != 200:
            print(f"请求失败，状态码: {response.status_code}")
            return False
        data = response.json()
        
        # 检查返回的数据是否为空列表
        if not data:
            print(self.acc + "---无邮件")
            return False
        
        # 检查第一个元素的 "from" 字段
        if data[0].get("from") == "JuDian <notification@email.judian.jp>":
            return data[0].get("id")
        else:
            print(self.acc + "---无邮件")
            return False
        
    def getCode(self,account:str,id:str)->str:
        url = f"https://api.mail.cx/api/v1/mailbox/{account}/{id}"
        response = requests.get(url, headers=self.headers)
        text = response.json()["body"]["text"]
        # 帮我提取出句子中验证码的6位数
        pattern = r"\d{6}"
        matches = re.findall(pattern, text)
        return matches[0]

     
class Judian:

    def __init__(self, accessToken  = False) -> None:
        self.expireTime = ""
        self.accessToken = accessToken
        self.headers = {
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 14; PGT-AN10 Build/HONORPGT-AN10)",
            "App-Version": "2.0.3",
            "App-Number": "47bfa06b90ad4174",
            "Content-Type": "application/json; charset=utf-8",
            "Host": "111.230.160.82",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip"
        }
        if self.accessToken:
            self.headers["Authorization"] = f"Bearer {self.accessToken}"

    @staticmethod
    def sendcode(account:str):
        url = "http://111.230.160.82/user/emailSend"
        data = {
            "type": 1,
            "account": account
        }
        data = json.dumps(data, separators=(',', ':'))
        response = requests.post(url, headers=Judian().headers, data=data)
        return response

    def login(self,account,passWord):
        url = "http://111.230.160.82/user/login"
        data = {
            "account": account,
            "appKey": "android",
            "code": passWord,
            "inviteCode": "",
            "type": 2
        }
        data = json.dumps(data, separators=(',', ':'))
        response = requests.post(url, headers=self.headers, data=data)
        self.expireTime = response.json()["data"]["expireTime"]
        self.accessToken = response.json()["data"]["accessToken"]
        self.headers["Authorization"] = f"Bearer {self.accessToken}"
        return {
            "expireTime":self.expireTime,
            "accessToken":self.accessToken
        }

    def regist(self,account:str,code:str,inviteCode:str):
        url = "http://111.230.160.82/user/login"
        data = {
            "account": account,
            "appKey": "android",
            "code": code,
            "inviteCode": inviteCode,
            "type": 1
        }
        data = json.dumps(data, separators=(',', ':'))
        response = requests.post(url, headers=self.headers, data=data)
        print(response.json())
        self.expireTime = response.json()["data"]["expireTime"]
        self.accessToken = response.json()["data"]["accessToken"]
        self.headers["Authorization"] = f"Bearer {self.accessToken}"
        return {
            "expireTime":self.expireTime,
            "accessToken":self.accessToken
        }
    
    def submit(self,advertNo:str,costModel:str,platformCode:str,platformId:str,spaceId:str,typeId:str):
        url = "http://111.230.160.82/advert/info/advertSubmit"
        data = {
            "advertNo": advertNo,
            "costModel":costModel ,
            "phoneBrand": "HONOR",
            "platformCode": platformCode,
            "platformId": platformId,
            "spaceId": spaceId,
            "systemType": "1",
            "systemVersion": "14",
            "typeId": typeId,
            "typePlatformId": 0
        }
        data = json.dumps(data, separators=(',', ':'))
        response = requests.post(url, headers=self.headers, data=data)
        return response

    
    def getInfo(self):
        def baseInfo() -> json:
            res = requests.get("http://111.230.160.82/user/info",headers=self.headers)
            j = res.json()
            return j['data']
            
        def quantity() -> str:
            res = requests.get("http://111.230.160.82/user/fund/getFund",headers=self.headers)
            j = res.json()
            return j["data"]["quantity"]
        
        return {
            "account": baseInfo()["account"],
            "passWord":passWord,
            "id":baseInfo()["id"],
            "nickName":baseInfo()["nickName"],
            "inviteCode":baseInfo()["inviteCode"],
            "quantity":quantity(),
            "accessToken":self.accessToken,
        }
        
    def getad(self)->json:
        url = "http://111.230.160.82/advert/info/getAdvert"
        data = {
            "systemType": 1
        }
        data = json.dumps(data, separators=(',', ':'))
        response = requests.post(url, headers=self.headers, data=data)
        return response.json()
    
    def extract_advert_info(ads:json)->list[dict]:
        advert_info_list = []
        if ads.get('success') and 'data' in ads:
            for datum in ads['data']:
                if 'adverts' in datum:
                    for advert in datum['adverts']:
                        if 'advertNo' in advert and 'costModel' in advert:
                            advert_info_list.append({
                                'advertNo': advert['advertNo'],
                                'costModel': advert['costModel'],
                                'platformCode': advert['platformCode'],
                                'platformId': advert['platformId'],
                                'spaceId': advert['spaceId'],
                                'typeId': advert['typeId']
                            })
        return advert_info_list

    def getSpaceAdvert(self)->json:
        url = "http://111.230.160.82/advert/info/getSpaceAdvert"
        data = {
            "spaceId": 19,
            "systemType": 1,
            "sort": 2
        }
        data = json.dumps(data, separators=(',', ':'))
        response = requests.post(url, headers=self.headers, data=data)
        return response.json()

class dataBase:
    def __init__(self) -> None:
        self.supabase = create_client(url, key)
  
    @staticmethod
    def GetFormatedTime():
        utc_now = datetime.now(timezone.utc)
        beijing_time = utc_now + timedelta(hours=8)
        return beijing_time.strftime('%Y-%m-%d')
    
    
    def GetRadomToken(self,):
        tokenPool = []
        res = (
        self.supabase
        .table("Judian-Accounts")
        .select("account,passWord,expireTime,accessToken")
        .execute()
        )
        time_format = '%Y-%m-%d %H:%M:%S'
        given_time = datetime.strptime(res["expireTime"], time_format)
        utc_now = datetime.now(timezone.utc)
        beijing_time = utc_now + timedelta(hours=8)
        for info in res:
            if beijing_time < given_time:
                tokenPool.append(info["accessToken"])
            else:
                judian = Judian()
                judian.login(info["account"],info["passWord"])[""]
                info = judian.getInfo()
                self.upsertAcc(info)
                tokenPool.append(judian.accessToken)
                print("更新cookie成功---"+info["account"])
        return tokenPool
        
    
    def upsertAcc(self,info:json,NewAcc:bool=False,InviteAcc:bool=False):
        if NewAcc:
            info["lastInvited"] = ""
        if InviteAcc:
            info["lastInvited"] = self.GetFormatedTime()
            
        return (
            self.supabase
            .table("Judian-Accounts")
            .upsert(info)
            .execute()
            )

    def getInviteCode(self)->str:
            return (
            self.supabase
            .table("Judian-Accounts")
            .select("inviteCode")
            .neq("lastInvited",dataBase.GetFormatedTime())
            .order("quantity", ascending=False)
            .execute()[0]
            .inviteCode
            )
    
    # def selectAccByCode(self,inviteCode:str):
    #     return(
    #         self.supabase
    #         .table("Judian-Accounts")
    #         .select("inviteCode")
    #     )
   

def CompleteTasks(account:str,accessToken:str,NewAcc:bool=False,InviteAcc=False):
    db = dataBase()
    judian = Judian(accessToken)
    ads = judian.getad()
    advert_info_list = judian.extract_advert_info(ads)
    print(f"{account}---获取到---{len(advert_info_list)}条广告")
    # 帮我subimit
    for item in advert_info_list:
        res = judian.submit(accessToken,item['advertNo'], item['costModel'], item['platformCode'], item['platformId'], item['spaceId'], item['typeId'])
        if(res.status_code==200):
            print(f"{account}---提交广告成功---{item['advertNo']}")
        else:
            print(f"{account}---提交广告失败---{str(res.json())}")
        time.sleep(4)
    info = judian.getInfo()
    print(db.upsertAcc(info,NewAcc,InviteAcc))

# def UpdateInviteAcc(inviteCode:str):
#     db = dataBase()
#     judian = Judian()

    


def RegistThread(inviteCode:str = None):
    db = dataBase()
    register = Register()
    judian = Judian()
    account =  register.getAccount()
    if not inviteCode:
        inviteCode = db.getInviteCode()

    if Judian.sendcode(account)["code"] == 200:
        print(account + "---发送验证码成功")
    else:
        print(account + "---发送验证码失败")
    id = False
    while not id:
        print(account + "---正在获取邮件中")
        id = register.getId(account)
        time.sleep(5)
    code = register.getCode(account,id)
    print(account + "---获取到验证码："+ code)
    tkInfo = judian.regist(account,code,inviteCode)
    print(account + "---获取到token："+ tkInfo["accessToken"]+"\n有效期至---"+tkInfo["expireTime"])
    info = judian.getInfo()
    db.upsertAcc(info,NewAcc=True)
    CompleteTasks(account,tkInfo["accessToken"],NewAcc=True)
    # 更新Invited账号待添加

    # for _ in range(25):
    #     ad = getSpaceAdvert(tk)
    #     print(account + "---获取到广告："+ ad['data']['advertNo'])
    #     submit(tk,ad['data']['advertNo'], ad['data']['costModel'], ad['data']['platformCode'], ad['data']['platformId'],
    #             ad['data']['spaceId'], ad['data']['typeId'])
    #     print(account + "---观看广告---"+ str(i)+"次")
    #     time.sleep(4)


def DateBaseThread():
    pass



def run_multiple_Regist(num_accounts,inviteCode=None):
    threads = []
    for _ in range(num_accounts):
        thread = threading.Thread(target=RegistThread,args=(inviteCode,))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

if __name__ == "__main__":
    num_accounts = 1  # 设置要运行的账号数量
    run_multiple_Regist(num_accounts,defualtInvitedCode)



 






