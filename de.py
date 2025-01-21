from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from base64 import b64decode
import hashlib


def reverse(byte_array):
    return byte_array[::-1]


def rsa_decrypt(ciphertext, private_key):
    # 假设这是一个 RSA 解密函数，需要用适当的库（如 PyCryptodome 或 rsa）实现
    # 你需要替换它为实际的解密逻辑
    raise NotImplementedError("RSA decryptor needs to be implemented")


def api_decrypt(str, rsa_decryptor, private_key):
    try:
        split = str.split('.')

        # 解密 RSA 密钥
        decrypt = rsa_decryptor(b64decode(split[0]), private_key)

        # 创建 AES 密钥和 IV
        secret_key = decrypt
        iv = reverse(decrypt)

        # 初始化 AES 解密器
        cipher = AES.new(secret_key, AES.MODE_CBC, iv)

        # 解密消息
        decrypted_data = cipher.decrypt(b64decode(split[1]))

        # 去除填充并返回解密字符串
        return unpad(decrypted_data, AES.block_size).decode('utf-8')

    except Exception as e:
        print(f"Decryption failed: {e}")
        return str


# 示例用法
# 请注意，rsa_decryptor 和 private_key 应该根据您的实际需求实现
# rsa_decryptor 是一个函数，private_key 是您定义的 RSA 私钥
str_input = "hySf6SKlR4SuA/2gk2oYr0nyzKQJb7Mh8A7pstSFz5ZGxYq9cwbbL0EsAl4UZx+gSdAI5rPg2e3Yu8LWF2D9+oIW/Xw5YajgkvGDcuyHWzYGUMXQbQ3n1cFkZhh1Tn2XF8Nr95M0X2OQ5UQ5NGdJWbzGs3eZZrIG9AGhDPZ05PT3ibALI74d4DDElhTZf85OahgiuJ3wPvCaMiLnbSYDXvtlF/cZvub8+/LyyiFec0v8pdh2lHVdo7FYn5Ayua1irWjorbZHr/oQoKGtCTQxbngOM+7AAbCA2DN2uVceYBoPjyciy7AqiQXXTmDS7751csuDnp8A2KMelMKs8exGuQ==.vP9neZBjSssiZnbGyuwscxNk71Sb8lW1fVWNk9Rlf2sGi8mRaaeWS1YebZDSrwBTuww1oTaBnwqWBsXQK/+WDchriBl6mkTuEi/kn6NInLF6Wunsav+PauiO/pxGjyUE+8wO31QvlGQmYuRH67fOqKTvgd/C7NRKu3MsEIhkqP/YAUSFmSJWnIE2+ei3+VoFF1ddhghhuHvfFKEufp7xscs7t9QhlDDle/ti5+wB15cmM2wW85CCRNoPwr4URGS6VjFuwV8EqLSEmjG2YpEn444TNX7TKbnIZCn2hIrcpnds8n5aYYkrAieLcZ63kQJNRX/U0wBJhU+xA+d6prp+v3/ZJ13hcShUc2yyWZR9dUA="
result = api_decrypt(str_input, rsa_decrypt, private_key)
print(result)
