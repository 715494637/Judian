from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import base64
import json

phone = "13696458853"

def encrypt(data = f'{{"operateType":"1","phone":"{phone}"}}', key="Py1J67PAQoCb8Iel"):
    key = key[:16] if key and len(key) > 16 else key
    data_bytes = json.dumps(data).encode('utf-8') if isinstance(data, dict) else data.encode('utf-8')
    key_bytes = key.encode('utf-8')
    iv_bytes = "wNSOYIB1k1DjY5lA".encode('utf-8')
    cipher = AES.new(key_bytes, AES.MODE_CBC, iv_bytes)
    padded_data = pad(data_bytes, AES.block_size)
    encrypted_bytes = cipher.encrypt(padded_data)
    return base64.b64encode(encrypted_bytes).decode('utf-8')

