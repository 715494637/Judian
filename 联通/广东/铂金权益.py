# import requests


# headers = {
#     "tradeId": "1743778391431617",
#     "Referer": "https://gdlive.17wo.cn/qyzx2/exchange",
#     "tokenSession;": "",
#     "Accept": "application/json, text/plain, */*",
#     "Content-Type": "application/json",
#     "iv": "1,6,0,1,2,2,22,16,21,9,16,10,14,20,1,13",
#     "token": "QXNDNjMUJyveISVH3UN9Xi7rh4d7vEs9sp47ssLSvtU%3D"
# }
# url = "https://gdlive.17wo.cn/rights/activeCoupon"
# data = 'tUxQ8fSw4Y0nXiq%2BO5yjCKk9f2FnnGaulB%2BQ4wMMkx9DQTu%2Bx9%2Bf5unIkoarLemzh4n%2Btkh1%2FKY0PwzrJ9chw%2F7JLbI9gt9rxD%2BCW8BRdCo4%2BaMK2kyRG5FgJGD5XaksnCOld1uDVKOMH4N25xFmfk8Tcq4lP%2BuJVe4V%2FzsMRREP3Q8Xad%2FdIqvVQPlvbLRDuuVdNUhBv2VH7kYojgwUqf0ZCSJtDK117XtfrKSY3oa4vLeTXAJpog887AE5DeY7FCJy0Xs68IoHTLeCeTeu1kWerp2uEWhTaum2jGlR3WBRKt04%2BGcJQxxm6yFykueGNh1nBgZu%2F%2FrFkUXjq6HOLvE2XEtLlD1XXNNtlQO9z40iH1nOyuU9qZz7BQkdwIjrq3y1Pm6JiiGFCbyuCu4hJnx44usDwflo%2BMzLN85f1r8%3D'.encode('unicode_escape')
# response = requests.post(url, headers=headers, data=data)

# print(response.text)
# print(response)

from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import base64
import urllib.parse  # Add this import for URL decoding

def decrypt(e, t):
    # 将密钥转换为 UTF-8 编码的字节
    key = t.encode('utf-8')
    
    # 创建 AES ECB 解密器
    cipher = AES.new(key, AES.MODE_ECB)
    
    # URL 解码
    e = urllib.parse.unquote(e)
    
    # Base64 解码密文
    encrypted_data = base64.b64decode(e)
    
    # 执行解密
    decrypted_data = cipher.decrypt(encrypted_data)
    
    # 移除 PKCS7 填充
    plaintext = unpad(decrypted_data, AES.block_size)
    
    # 转换为 UTF-8 字符串
    return plaintext.decode('utf-8')

a=decrypt("tUxQ8fSw4Y0nXiq+O5yjCKk9f2FnnGaulB+Q4wMMkx9DQTu+x9+f5unIkoarLemzh4n+tkh1/KY0PwzrJ9chw/7JLbI9gt9rxD+CW8BRdCo4+aMK2kyRG5FgJGD5XaksnCOld1uDVKOMH4N25xFmfk8Tcq4lP+uJVe4V/zsMRREP3Q8Xad/dIqvVQPlvbLRDuuVdNUhBv2VH7kYojgwUqf0ZCSJtDK117XtfrKSY3oa4vLeTXAJpog887AE5DeY7FCJy0Xs68IoHTLeCeTeu1kWerp2uEWhTaum2jGlR3WBRKt04+GcJQxxm6yFykueGNh1nBgZu//rFkUXjq6HOLvE2XEtLlD1XXNNtlQO9z40iH1nOyuU9qZz7BQkdwIjrq3y1Pm6JiiGFCbyuCu4hJnx44usDwflo+MzLN85f1r8=","!601#CwQv9QKoU1n")
print(a)
