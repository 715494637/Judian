from datetime import datetime, timezone, timedelta
import sys
import requests
import json
import time
import random
import re
import threading
from supabase import create_client
import concurrent.futures
from fake_useragent import UserAgent


url = "https://gsqhzvncrktdbnajsyxj.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzcWh6dm5jcmt0ZGJuYWpzeXhqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTAzNTk4OCwiZXhwIjoyMDI2NjExOTg4fQ.wgUq0pfO9TcdQS2fwDVaE3WTAbLp7s0M-6dqJmmEux8"
defualtInvitedCode = "USND7YZDRX"
defualtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjk2MzUyLCJBcHAtTnVtYmVyIjoiNDdiZmEwNmI5MGFkNDE3NCIsImlhdCI6MTczNDA1OTg4MSwibmJmIjoxNzM0MDU5ODgxLCJleHAiOjE3MzUzNTU4ODF9.3Whaz8-DtoS1LAThoTl9TpDoOk94UOFV3-sXdIcCLMs"
passWord = "dddd1111"
proxylist = requests.get("https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/refs/heads/main/socks5_checked.txt").text.split("\n")
print("代理池长度：" + str(len(proxylist)))



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

    def __init__(self, accessToken  = "") -> None:
        self.expireTime = ""
        self.accessToken = accessToken
        self.proxy = ""
        self.headers = {
            "User-Agent": UserAgent().random,
            "App-Version": "2.0.3",
            # "App-Number": "47bfa06b90ad4174",
            # 帮我生成随机的App-Number
            "App-Number": "".join(random.sample('1234567890abcdefghijklmnopqrstuvwxyz', 16)),
            "Content-Type": "application/json; charset=utf-8",
            "Host": "111.230.160.82",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip"
        }
        if self.accessToken:
            self.headers["Authorization"] = f"Bearer {self.accessToken}"
        self.getProxy()

    def getProxy(self):
        p = random.choice(proxylist)
        self.proxy = {
            "http": f"socks5://{p}",
            "https": f"socks5://{p}"
        }
        print("使用代理：" + self.proxy["http"])

    def sendcode(self,account:str):
        url = "http://111.230.160.82/user/emailSend"
        data = {
            "type": 1,
            "account": account
        }
        data = json.dumps(data, separators=(',', ':'))
        try:
               response = requests.post(url, headers=self.headers, data=data, proxies=self.proxy)
        except Exception:
            print("发送验证码失败，更换代理")
            self.getProxy()
            return self.sendcode(account)

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
        res = response.json()
        if not res["data"] or res["code"] == 300:
            dataBase().deleteAcc
            return False
        self.expireTime = res["data"]["expireTime"]
        self.accessToken = res["data"]["accessToken"]
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
        try:
            data = json.dumps(data, separators=(',', ':'))
            response = requests.post(url, headers=self.headers, data=data,proxies=self.proxy).json()
            print(response)
            self.expireTime = response["data"]["expireTime"]
            self.accessToken = response["data"]["accessToken"]
        except Exception :
            return False
        self.headers["Authorization"] = f"Bearer {self.accessToken}"
        def setPassWord():
            url = "http://111.230.160.82/user/setPassword"
            data = {
                "newPassword":passWord,
                "confirmPassword":passWord
            }
            data = json.dumps(data, separators=(',', ':'))
            return requests.post(url,headers=self.headers,data=data,proxies=self.proxy)
        print(setPassWord().json())
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
        try:
            response = requests.post(url, headers=self.headers, data=data,proxies=self.proxy)
        except Exception:
            self.getProxy()
            return self.submit(advertNo,costModel,platformCode,platformId,spaceId,typeId)
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
        if not baseInfo():
            dataBase().deleteAcc()
        info =  {
            "account": baseInfo()["account"],
            "passWord":passWord,
            "id":baseInfo()["id"],
            "nickName":baseInfo()["nickName"],
            "inviteCode":baseInfo()["inviteCode"],
            "quantity":quantity(),
            "accessToken":self.accessToken,
        }
        if self.expireTime:
            info["expireTime"] = self.expireTime
        
        return info
        
    def getad(self)->json:
        url = "http://111.230.160.82/advert/info/getAdvert"
        data = {
            "systemType": 1
        }
        data = json.dumps(data, separators=(',', ':'))
        try:
            response = requests.post(url, headers=self.headers, data=data)
        except Exception :
            self.getProxy()
            return self.getad()
        return response.json()
    
    def extract_advert_info(self,ads:json)->list[dict]:
        advert_info_list = []
        if ads.get('success') and 'data' in ads:
            for datum in ads['data']:
                if 'adverts' in datum:
                    for advert in datum['adverts']:
                        if advert['platformCode']:
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
    def deleteAcc(self,account:str):
        return(
        self.supabase
        .table("Judian-Accounts")
        .delete()
        .eq("account", account)
        .execute()
        ).data

    def process_account(self, info):
        judian = Judian()
        if not judian.login(info["account"], info["passWord"]):
            self.deleteAcc(info["account"])
            print("删除封禁账号---" + info["account"])
            return None
        info = judian.getInfo()
        self.upsertAcc(info)
        print("更新cookie成功---" + info["account"])
        return {"account":info["account"], "accessToken":info["accessToken"]}
    
    def GetAllToken(self):
        # def tokenValid(t_str,now_ts): 
        #     target = datetime.strptime(t_str, "%Y-%m-%d %H:%M:%S")
        #     t_ts = time.mktime(target.timetuple()) + 8 * 3600
        #     return now_ts < t_ts

        tokenPool = []
        res = (
            self.supabase
            .table("Judian-Accounts")
            .select("account,passWord,accessToken")
            .order("quantity", desc=True)
            .execute()
        ).data
        # now_ts = time.time() - (time.timezone if (time.daylight == 0) else time.altzone) + 8 * 3600
        # for info in res :
            # if tokenValid(info["expireTime"],now_ts):
            #     tokenPool.append({"account":info["account"],"accessToken":info["accessToken"]})
            # else:
            #     print("账号已过期---" + info["account"])
        # if not update:
        #     for info in res :
        #        tokenPool.append({"account":info["account"],"accessToken":info["accessToken"]})
        #     return tokenPool
        
        with concurrent.futures.ThreadPoolExecutor() as executor:
            # 使用字典推导式来提交任务并创建一个映射
            future_to_info = {executor.submit(self.process_account, info): info for info in res}
            # 遍历完成的任务
            for future in concurrent.futures.as_completed(future_to_info):
                try:
                    result = future.result()
                    if result:
                        tokenPool.append(result)
                except Exception as e:
                    print(f"任务发生异常: {e}")
                
            
        
        return tokenPool   
    def upsertAcc(self,info:json):
        data =  (
            self.supabase
            .table("Judian-Accounts")
            .upsert(info)
            .execute()
            ).data
        return data     
    def getInviteCode(self) -> str:
        try:
            result = (
            self.supabase
            .table("Judian-Accounts")
            .select("inviteCode")
            .neq("lastInvited", dataBase.GetFormatedTime())
            .order("quantity", desc=True)
            .limit(1)
            .single()
            .execute()
        ).data
            return result["inviteCode"]
        except Exception :
            return ""
      
        
    
    def updateLastInvitedByCode(self, inviteCode: str):
        return (
            self.supabase
            .table("Judian-Accounts")
            .update({"lastInvited": self.GetFormatedTime()})
            .eq("inviteCode", inviteCode)
            .execute()
        ).data
   


def CompleteTasks(account:str,accessToken:str):
    db = dataBase()
    judian = Judian(accessToken)
    print(f"{account}---本次使用代理：{judian.proxy["https"]}")
    # 循环两次
    for _ in range(2):
        ads = judian.getad()
        advert_info_list = judian.extract_advert_info(ads)
        print(f"{account}---获取到---{len(advert_info_list)}条广告")
        # 帮我subimit
        for item in advert_info_list:
            res = judian.submit(item['advertNo'], item['costModel'], item['platformCode'], item['platformId'], item['spaceId'], item['typeId'])
            if(res.status_code==200):
                # print(res.text)
                print(f"{account}---提交广告成功---{item['advertNo']}")
            else:
                print(f"{account}---提交广告失败---{str(res.json())}")
            time.sleep(10)
    info = judian.getInfo()
    if not info:
        dataBase().deleteAcc(account)
        print(f"{account}---账号已封禁")
    print(db.upsertAcc(info))
    print(f"{account}---数据库更新账号成功")

# def UpdateInviteAcc(inviteCode:str):
#     db = dataBase()
#     judian = Judian()

def RegistThread(inviteCode:str):
    db = dataBase()
    register = Register()
    judian = Judian()
    account = register.getAccount()
    res = judian.sendcode(account).json()
    if res["code"] == 200:
        print(account + "---发送验证码成功")
    else:
        print(account + "---发送验证码失败\n"+str(res))
        return
        
    # Initialize id first
    id = False
    while not id:
        print(account + "---正在获取邮件中")
        id = register.getId(account)
        time.sleep(5)  # Add small delay to avoid hammering the API
        
    code = register.getCode(account,id)
    print(account + "---获取到验证码："+ code)
    tkInfo = judian.regist(account,code,inviteCode)
    if not tkInfo:
        print(account + "---注册失败")
        return
    print(account + "---获取到token："+ tkInfo["accessToken"]+"\n有效期至---"+tkInfo["expireTime"])
    info = judian.getInfo()
    db.upsertAcc(info)
    print(account + "---数据库新增账号成功")
    return


    # CompleteTasks(account,tkInfo["accessToken"],NewAcc=True)

    

    # 更新Invited账号待添加

    # for _ in range(25):
    #     ad = getSpaceAdvert(tk)
    #     print(account + "---获取到广告："+ ad['data']['advertNo'])
    #     submit(tk,ad['data']['advertNo'], ad['data']['costModel'], ad['data']['platformCode'], ad['data']['platformId'],
    #             ad['data']['spaceId'], ad['data']['typeId'])
    #     print(account + "---观看广告---"+ str(i)+"次")
    #     time.sleep(4)


def run_multiple_Regist(num_accounts):
    db = dataBase()
    inviteCode = db.getInviteCode()
    print("---使用数据库邀请码---"+inviteCode)
    threads = []
    for _ in range(num_accounts):
        thread = threading.Thread(target=RegistThread,args=(inviteCode or "",))
        threads.append(thread)
        thread.start()
    for thread in threads:
        thread.join()
    print(db.updateLastInvitedByCode(inviteCode))
    print("更新lastInvited成功")

def run_multiple_Task():
    db = dataBase()
    pool = db.GetAllToken()
    threadPool = []
    for info in pool:
        t = threading.Thread(target=CompleteTasks,args=(info["account"],info["accessToken"]))
        threadPool.append(t)
        t.start()
    for t in threadPool:
        t.join()
    print("线程结束")



if __name__ == "__main__":
    
    
    if len(sys.argv) > 1:
        function_name = sys.argv[1]
        if function_name == 'regist':
            run_multiple_Regist(5)
        elif function_name == 'task':
            run_multiple_Task()
        elif function_name == 'test':
            print("test")
        else:
            print(f"Unknown function: {function_name}")
    else:
        print("No function specified")
    # judian= Judian()
    # proxy= judian.proxy
    # res =requests.get("https://www.ip.cn/api/index?ip&type=0",proxies=proxy)
    # print(res.text)


        

        
    

    # h= CompleteTasks("7171","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjk2MzUyLCJBcHAtTnVtYmVyIjoiNDdiZmEwNmI5MGFkNDE3NCIsImlhdCI6MTczNDE4MDg2NywibmJmIjoxNzM0MTgwODY3LCJleHAiOjE3MzU0NzY4Njd9.CF6R5VSAz2Er32SuqDCR7ajBoCC4ijXoNVrTnxMYgDo")
    # h.createConnect()
    # run_multiple_Regist(num_accounts)
    # print((Judian.sendcode("123abcc@nqmo.com")).json())



 







