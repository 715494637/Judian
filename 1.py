import requests

headers = {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjk2MzUyLCJBcHAtTnVtYmVyIjoiNDdiZmEwNmI5MGFkNDE3NCIsImlhdCI6MTczNDIzOTYyOCwibmJmIjoxNzM0MjM5NjI4LCJleHAiOjE3MzU1MzU2Mjh9.TUsrySWP3ZcZ0tJRfqeEfrRJHvbvWf5KuT98GIYiwNo",
    "Host": "42.194.188.126",
    "Connection": "Keep-Alive",
    "Accept-Encoding": "gzip",
    "User-Agent": "okhttp/3.14.9"
}
url = "http://42.194.188.126/sse/createConnect"

response = requests.get(url, headers=headers, stream=True)

if response.status_code == 200:
    for line in response.iter_lines(decode_unicode=True):
        if line:
            print(line)
else:
    print(f"Failed to connect: {response.status_code}")