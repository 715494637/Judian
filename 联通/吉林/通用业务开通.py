import requests
import json
import execjs
import base64
import json
import requests

def create_encrypt_js_environment():
    """创建包含JSEncrypt库和加密函数的JavaScript环境"""
    
    # 需要首先下载JSEncrypt库
    jsencrypt_lib = requests.get("https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/3.2.1/jsencrypt.min.js").text
    
    # 构建完整的JavaScript代码，包含原始加密逻辑
    js_code = jsencrypt_lib + """
    function encrypt(data) {
        var JSEncrypt = this.JSEncrypt;
        var encryptor = new JSEncrypt();
        // 注意这里的公钥是反转后的字符串，我们在这里执行相同的反转操作
        var reversed_key = "BAQADIQc1Aq9yLXYrorzKGEzDVk8IZrGygu0yT1hSpM/AJze77B85WtlSHBUXdEuMj+OWSY5wMyAOifok4RAFzkzst+l6L/WWsEqdmO8G5l/vp3uNSWiz7gQGpbR1xtrA/v3NRMaBuWJ/7D1DqGDwa91xX0mBQhNKF/+NOJU54tW8jOWSCQgBKQiBCDANG4AAUQABEQD3bISGqSCG0AMfGIM";
        var public_key = reversed_key.split("").reverse().join("");
        encryptor.setPublicKey(public_key);
        return encryptor.encrypt(data);
    }
    """
    
    return execjs.compile(js_code)


def main():
    print("JSEncrypt 加密测试脚本")
    print("-----------------------")
    
    try:
        # 安装必要的库
        print("初始化 JavaScript 环境...")
        js_env = create_encrypt_js_environment()
        
        # 接收用户输入
        product_id = input("请输入要加密的 productId: ")
        
        # 执行加密
        print("\n正在加密...")
        encrypted_result = js_env.call("encrypt", product_id)
        
        print("\n加密结果:")
        print("-----------------------")
        print(encrypted_result)
        print("-----------------------")
        
        # 输出模拟的完整请求对象
        sample_request = {
            "productId": encrypted_result,
            # 可以添加其他字段
        }
        
        print("\n模拟请求对象:")
        print(json.dumps(sample_request, indent=2))
        
    except Exception as e:
        print(f"错误: {str(e)}")
        print("\n请确保安装了必要的库:")
        print("pip install PyExecJS requests")


if __name__ == "__main__":
    main()



productId = "202411181458410003"
smsCode = "1111"
smsServiceCode = "YZMX40000"
soleId = "1742698488801877507"


# headers = {
#     "Accept": "application/json, text/plain, */*",
#     "Accept-Language": "zh-CN,zh;q=0.9",
#     "Connection": "keep-alive",
#     "Content-Type": "application/json;charset=UTF-8",
#     "Origin": "https://img.client.10010.com",
#     "Referer": "https://img.client.10010.com/",
#     "Sec-Fetch-Dest": "empty",
#     "Sec-Fetch-Mode": "cors",
#     "Sec-Fetch-Site": "same-site",
#     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
#     "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
#     "sec-ch-ua-mobile": "?0",
#     "sec-ch-ua-platform": "\"Windows\""
# }
# cookies = {
#     "JSESSIONID": "B4B647923008C580FC2816B84F0FADE9",
#     "unicomMallUid": "P07mMZpc9zB9v5r",
#     "acw_tc": "1a0c651e17426984253298132e0061c25ed8d8b1da051026294eccbd960a35",
#     "ecs_cook": "3420bbe4a81f8ce38c0c0b09210eb660",
#     "city": "031|",
#     "enc_acc": "982970a22bee08bbdb716312492d874c",
#     "epLoginType": "1",
#     "ecs_acc": "",
#     "req_mobile": "",
#     "req_serial": "",
#     "clientid": "98|0",
#     "req_wheel": "ssss"
# }
# url = "https://m.client.10010.com/servicebusiness/verificationCode/pageCalls"
# params = {
#     "duanlianjieabc": "",
#     "channelCode": "",
#     "serviceType": "",
#     "saleChannel": "",
#     "externalSources": "",
#     "contactCode": "",
#     "ticket": "",
#     "ticketPhone": "",
#     "ticketChannel": ""
# }
# data = {
#     "interNo": "sendSms",
#     "reqTime": 1742699656042,
#     "encryptData": "OR6bPFLEENjfCWoIDe%2Fuxr0%2BgzwokWq9R7rWhxrb0f2cyoyE4gpUGx0ojPEmwy81JCDe08nqtOuW7Zl3OILBnzsMhxoeLZ42Gux6fQLP9qa5MIlKEpH6wKTqplB0zF4nGu7FcfYN%2BTX3Bus9wEdnJrNWBL1lqceLQtp4Ac0l1InEqayrQTp%2BFoYxfVQkS296RlOOOpYKx2A92Q0Q8boz9EhY82cTz4e5FwrVuCvHwnJClK92ABj2xliXbHcYmtsnEVxjMmv5zyEUIB3OZ8ifP1Ofapc7fnJ%2F%2Bo45kE27KUso%2FyK0AF6pXOT9fIxJynInGD9dIsUkyPsYCc0RB9FaOA%3D%3D",
#     "seq": "sendSms_20250323111416_440517_"
# }
# data = json.dumps(data, separators=(',', ':'))
# response = requests.post(url, headers=headers, cookies=cookies, params=params, data=data)

# print(response.text)
# print(response)