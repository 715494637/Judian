from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from base64 import b64decode, b64encode
from urllib.parse import unquote
import binascii
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5

def encrypt_rsa(data):
    """
    对应JavaScript函数I的Python实现，使用RSA加密
    """
    # 混淆的公钥(直接从JavaScript代码复制)
    obfuscated_key = "BAQADIQc1Aq9yLXYrorzKGEzDVk8IZrGygu0yT1hSpM/AJze77B85WtlSHBUXdEuMj+OWSY5wMyAOifok4RAFzkzst+l6L/WWsEqdmO8G5l/vp3uNSWiz7gQGpbR1xtrA/v3NRMaBuWJ/7D1DqGDwa91xX0mBQhNKF/+NOJU54tW8jOWSCQgBKQiBCDANG4AAUQABEQD3bISGqSCG0AMfGIM"
    
    # 恢复正常顺序，与JavaScript中split().reverse().join()相同
    public_key = ''.join(reversed(obfuscated_key))
    
    # 创建RSA密钥对象
    key = RSA.importKey(public_key)
    # 创建加密器
    cipher = PKCS1_v1_5.new(key)
    # 加密数据
    encrypted = cipher.encrypt(data.encode())
    # 返回Base64编码的加密结果
    return b64encode(encrypted).decode()

def decrypt_aes(encrypted_data):
    """
    对应JavaScript函数P的Python实现，使用AES-ECB解密
    """
    # URL解码
    decoded = unquote(encrypted_data)
    # Base64解码
    data = b64decode(decoded)
    # 16进制密钥
    hex_key = "6b8b4567327b23c6643c527d5b8c8a17"
    key = binascii.unhexlify(hex_key)
    
    # 创建AES-ECB解密器
    cipher = AES.new(key, AES.MODE_ECB)
    # 解密
    decrypted = cipher.decrypt(data)
    
    # 尝试去除填充并返回UTF-8字符串
    try:
        return unpad(decrypted, AES.block_size).decode('utf-8')
    except:
        # 如果无填充，直接返回
        return decrypted.decode('utf-8') 
    
ENCRYPT_RSA = encrypt_rsa("202411181458410003")
print(ENCRYPT_RSA)

