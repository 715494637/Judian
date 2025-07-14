import requests
import json
from Crypto.Util.Padding import unpad
from base64 import b64decode, b64encode
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad


def encrypt_axios(data):
    # 固定密钥和 IV（需转换为字节）
    key = "kd9!F6F@W9ER8s#9".encode('utf-8')  # 16字节（128位）
    iv = "#9k6F9ER8s@Wd9!F".encode('utf-8')   # 16字节
    
    # 1. 将输入对象转为 JSON 字符串
    json_str = json.dumps(data, separators=(',', ':'))  # 无空格，匹配 JS 行为
    
    # 2. 填充数据为块大小的倍数（PKCS7）
    padded_data = pad(json_str.encode('utf-8'), AES.block_size)
    
    # 3. 创建 AES-CBC 加密器
    cipher = AES.new(key, AES.MODE_CBC, iv)
    
    # 4. 加密并 Base64 编码
    encrypted = cipher.encrypt(padded_data)
    return b64encode(encrypted).decode('utf-8')



def get_recommend_product_list(id_list):
    headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Origin": "https://nmlyh.10010nm.com",
        "Pragma": "no-cache",
        "Referer": "https://nmlyh.10010nm.com/app/weekendHiBuy4/index?source=sms&custCode=aWHJX9",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 Edg/134.0.0.0",
        "app_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJib25jIiwidXNlckAjJEluZm9AYm9uYyI6IntcImFyZWFfY29kZVwiOlwiMDQ3MVwiLFwiY2l0eV9jb2RlXCI6XCIxMDFcIixcImludmFsaWRfYXRcIjpcIjIwMjUtMDUtMTIgMTk6MjI6MjdcIixcInByb3ZpbmNlX2NvZGVcIjpcIjEwXCIsXCJ1c2VyX2lkXCI6XCIxMzAxNTAwMTUwMFwifSIsImV4cCI6MTc0Njg3NjE0NywiaWF0IjoxNzQ2Nzg5NzQ3fQ.KlDDbrwPELnX2XevEfF-vxOTlsTZNjFUnc-sMVHbNPE",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\""
    }
    cookies = {
        "Path": "/",
        "JSESSIONID": "A76F642426F847975FD57B4519A96A75",
        "_pk_ses.3.e101": "1",
        "_pk_id.3.e101": "abc20d278ed75d12.1743413783.4.1743595092.1743594993."
    }
    url = "https://nmlyh.10010nm.com/bonc-api/rest/app/product/getProductDetailByCond"

    enc_data = encrypt_axios({
            "productIdSet": id_list
        })
    print("加密内容：",enc_data)
    data = {
        "encrypted": enc_data
    }

    response = requests.post(url, headers=headers,cookies=cookies, json=data)
    return response

# Example usage:
# response = get_recommend_product_list(['91254181', '91045264'])
# print(response.text)


# aesArr = ["aa1a412543fb9ddf73412f3decf5ff595ecd52b0cdb1113bc7a84dfdfc46198f"
# "b79f1ce43e5f1f77a063b2eff03d65975ecd52b0cdb1113bc7a84dfdfc46198f"]

# def get_aes_key(ciphertext_base64, key='wD12b&@qwEc3p&#E'):
#     # 步骤 1：解析参数
#     key_bytes = key.encode('utf-8')  # 密钥转为 UTF-8 字节
    
#     # 步骤 2：Base64 解码密文（假设输入是 Base64 字符串）
#     ciphertext_bytes = b64decode(ciphertext_base64)
    
#     # 步骤 3：创建 AES-ECB 解密器（ECB 模式不需要 IV）
#     cipher = AES.new(key_bytes, AES.MODE_ECB)
    
#     # 步骤 4：解密并去除 PKCS7 填充
#     decrypted_bytes = cipher.decrypt(ciphertext_bytes)
#     unpadded_bytes = unpad(decrypted_bytes, AES.block_size)
    
#     # 步骤 5：转为 UTF-8 字符串
#     return unpadded_bytes.decode('utf-8')
# print(get_aes_key(aesArr [0]))


# 测试用例
if __name__ == '__main__':
    id_list = ['91254181', '91045264']
    res = get_recommend_product_list(id_list)
    print(res.text)
    