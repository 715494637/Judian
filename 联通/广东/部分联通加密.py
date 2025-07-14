import random
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64
import json

class Encryptor:
    @staticmethod
    def get_key(key_type):
        if key_type == 1:
            return ["@", "!", "#", "$"]
        elif key_type == 3:
            return [chr(i) for i in range(97, 123)]  # a-z
        elif key_type == 4:
            return [chr(i) for i in range(65, 91)]   # A-Z
        return None

    @staticmethod
    def generate_iv():
        t = []
        for n in range(16):
            if n == 0 or n == 4:
                t.append(random.randint(0, 3))
            elif n < 4 or n == 9 or n == 14:
                t.append(random.randint(0, 9))
            else:
                t.append(random.randint(0, 25))
        return t

    @staticmethod
    def generate_key(iv):
        s = ""
        for i in range(16):
            if i == 0 or i == 4:
                s += Encryptor.get_key(1)[iv[i]]
            elif i < 4 or i == 9 or i == 14:
                s += str(iv[i])
            elif i == 6 or i == 8:
                s += Encryptor.get_key(3)[iv[i]]
            elif i < 12 or i == 13:
                s += Encryptor.get_key(4)[iv[i]]
            else:
                s += Encryptor.get_key(3)[iv[i]]
        return s

    @staticmethod
    def encrypt(data, key):
        # Convert to bytes
        key_bytes = key.encode('utf-8')
        data_bytes = data.encode('utf-8')
        
        # Create cipher
        cipher = AES.new(key_bytes[:16], AES.MODE_ECB)
        
        # Pad and encrypt
        padded_data = pad(data_bytes, AES.block_size)
        encrypted_bytes = cipher.encrypt(padded_data)
        
        # Convert to base64
        return base64.b64encode(encrypted_bytes).decode('utf-8')

    @staticmethod
    def decrypt(encrypted_data, key):
        # Convert from base64
        encrypted_bytes = base64.b64decode(encrypted_data)
        
        # Create cipher
        key_bytes = key.encode('utf-8')
        cipher = AES.new(key_bytes[:16], AES.MODE_ECB)
        
        # Decrypt and unpad
        decrypted_bytes = cipher.decrypt(encrypted_bytes)
        unpadded_data = unpad(decrypted_bytes, AES.block_size)
        
        return unpadded_data.decode('utf-8')

def simulate_request(data, sms_code="123456", serial_number="987654321", trade_id="trade123"):
    encryptor = Encryptor()
    
    # Generate IV and encryption key
    iv = encryptor.generate_iv()
    encryption_key = encryptor.generate_key(iv)
    
    # Prepare headers
    headers = {
        'iv': iv,
        'tokenSession': 'dummy_session_token',
        'tradeId': trade_id
    }
    
    # If URL contains 'rights', encrypt the data
    if isinstance(data, dict):
        data_str = json.dumps(data)
        encrypted_data = encryptor.encrypt(data_str, encryption_key)
        data = encrypted_data
    
    # Generate token
    token_data = f"{serial_number},{sms_code}"
    headers['token'] = encryptor.encrypt(token_data, encryption_key)
    
    return {
        'headers': headers,
        'data': data,
        'encryption_key': encryption_key  # For testing purposes
    }

# Example usage
if __name__ == "__main__":
    # Test data
    test_data = {
        "test": "hello",
        "value": 123
        }

    # Simulate request
    result = simulate_request(test_data)
    print("Headers:", result['headers'])
    print("Encrypted Data:", result['data'])
    
    # Test encryption/decryption
    encryptor = Encryptor()
    test_str = "Hello World!"
    test_key = "abcdefghijklmnop"  # 16 bytes key
    
    encrypted = encryptor.encrypt(test_str, test_key)
    decrypted = encryptor.decrypt(encrypted, test_key)
    
    print("\nEncryption Test:")
    print("Original:", test_str)
    print("Encrypted:", encrypted)
    print("Decrypted:", decrypted)
