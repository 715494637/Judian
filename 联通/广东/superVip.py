import requests
headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    "origin": "https://txwk.10010.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://txwk.10010.com/",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 Edg/134.0.0.0",
    "x-referer": "https://txwk.10010.com/KCard/mPages/unicom-super.html?channel=CJHY_LTYOUTH_fulishe1#/"
}
cookies = {
    "KSESSIONID": "ZTdiNDg1ODUtZjI5My00NzkxLTk3ZGUtYWFlNTE2YWVlZGUz",
    "tfstk": "g8eKxZTb5NbnL9kcK91MEEhKFLsGi8EeCyrXE40HNPUT0kTnKuGQflioVbwnKk4O78a-q8DQxlD8lrpnRDqle4U_WX9nxYv-NVUBEX4ue5J80uyhYYjELkkrFZbcnzEUYYziu8oUpf9sYl9BR21iCIeZpE7cntqI7D2nuZ2H3Svt80MSAXOB1GnxVY9SRzgs1miDRYM7PGhsq0oWdYgSCfiS54MSFzZ1X0DNL93JRqv8Ge0r9bOhSE84BDhKyL0peUjo5X3bAYbbsJnpzqZIWL9S-UHxJlEhJKriLkaxmyX6prE4QPn_lTQtUPP7P0U13UDUiyyq6yfXClMZ7jgUA_Ox_b3L1JG9VLZZdWc7wyQpT2N3Wjos13Bqjr0_YJNO4FZQo2HIffXfDlG7sJl4KN9KhSrnK7aPiCkLVWMO4Qy0HjhWoqnkOGI9aQlIbdS_tY02qTSiXqjswQRr9RntoGI9aQlIbc3cfbdyaXeO."
}
url = "https://kapi.10010.com/captcha/op/checkCode"
data = {
    "phone": "RNC(AAAAGnsidiI6InYxIiwiYSI6IjEiLCJ0IjoiNCJ9k91mOKYHTUTYQn8JE5QPpg)",
    "templateId": "RNC(AAAAGnsidiI6InYxIiwiYSI6IjEiLCJ0IjoiNCJ9ERXxO_U4NbIZuHpM7CI6DA)",
    "key": "superVip",
    "code": "1111"
}
response = requests.post(url, headers=headers, cookies=cookies, data=data)

print(response.text)
print(response)

# import requests


# headers = {
#     "accept": "application/json, text/plain, */*",
#     "accept-language": "zh-CN,zh;q=0.9",
#     "cache-control": "no-cache",
#     "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
#     "origin": "https://txwk.10010.com",
#     "pragma": "no-cache",
#     "priority": "u=1, i",
#     "referer": "https://txwk.10010.com/",
#     "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
#     "sec-ch-ua-mobile": "?1",
#     "sec-ch-ua-platform": "\"Android\"",
#     "sec-fetch-dest": "empty",
#     "sec-fetch-mode": "cors",
#     "sec-fetch-site": "same-site",
#     "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 Edg/134.0.0.0",
#     "x-referer": "https://txwk.10010.com/KCard/mPages/unicom-super.html?channel=CJHY_LTYOUTH_fulishe1#/index"
# }
# cookies = {
#     "acw_tc": "276aedc317422694550838027e3c4b97cc66e9cba0027ba4bf3c1c210c3a92",
#     "KSESSIONID": "NzU1MDk4ZDktNzM5ZC00MjBlLTkxMDctYjJmMzA1OWQyYTlk",
#     "tfstk": "gbgmA3OeKmrjUkDdHYzXvpZXqTK8lsa_tAQTBPew48y5WOQxH04z15P4QfJjIV2rlqObXdMoScMiHmeYuNoiHAwYDjyA7fkK6lkTBjdGG4DhWZpXcf7gWPJppeLKGIa_7pHRvSWVcSNBWZS47rayK4lcdeLKGjW_UHq2JqCKnfyQQPr4bbrzFWba7Rr2Z8PgOGWqQPRkZ5FFbNP40bWz18ya7PkZaQVtI7s3e5FZzLR-n9jL7LqYio2Eg-lra4PApRh4EN5TnSqc2jyl7Nuo2NVqt--CwRaYh2VmCe_bulmI65DDoZkiO4Muav8GJ-lS9DEjues_xry7XqlJxw4qh5qU7ufN7b4b3vgz8eWuN0lxbqMcsNPjk2EgduAN5lUrJkoEn1OIarPZCkg9dZwq_XgIvyYR0ylobvmG4TIPYiLN5JLo1Gs_07Nupqa8wP7z2ppBZQjTyoP7aDRkZGs_07NupQAlXzE4N7oF."
# }
# url = "https://kapi.10010.com/captcha/op/getCaptcha"
# data = {
#     "phone": "RNC(AAAAGnsidiI6InYxIiwiYSI6IjEiLCJ0IjoiNCJ9k91mOKYHTUTYQn8JE5QPpg)",
#     "templateId": "RNC(AAAAGnsidiI6InYxIiwiYSI6IjEiLCJ0IjoiNCJ9ERXxO_U4NbIZuHpM7CI6DA)",
#     "nvct": "%7B%22a%22%3A%22FFFF0N3N000000009296%22%2C%22c%22%3A%22FFFF0N3N000000009296%3Anvc_message_h5%3A1742268636755%3A0.809068487633541%22%2C%22d%22%3A%22nvc_message_h5%22%2C%22j%22%3A%7B%22test%22%3A1%7D%2C%22h%22%3A%7B%22umidToken%22%3A%22T2gAA7oeeSDrCLaB_dJvpueeWbT9Zsh0_hcr2bo-w_Je4E1XzZgUkPP7bYT_LmtNhaw%3D%22%7D%2C%22b%22%3A%22231!HJz3tAmU6I%2F%2BjoIv6rVN5k8FVXolRTJob%2BvClIbcpsKTbS8ErrJgBV%2B1HpRbhiJCEhFJMkR38W%2Fc45w7miotDDYOsQVgiH%2FJavBSKM3hGmZW4fOw1q2SpIDQw5uA3ssW47YURJDBxPw6Fyv8eT%2Fe6CasntC04PqSESBh6yf%2BaX%2BrniD%2BXw8e%2BZEjkFxs0hmYXbIFHHAa%2B%2B%2Bj%2BygH%2BTiOVkD%2BggtO3ItW%2B%2BjSqAmdweG%2BEpHW3%2Bj09a%2FjYsFS%2BIr5o4IWYA%2B%2BTaEj%2ByzP246yXjsCo%2B4oHoHrYllvGajKNtZP0VnAemgkYYvUdq2GMxg%2FcSry%2BxCn3Hi%2FRuxXgr2pG8YrSUzp5bpBT9%2F%2FkeAWTWfZtAkXj8FHXcgoglUMzB34%2FLqtOhLS2BvZ2V%2BLb8kBwCrOBp5HY%2Bz%2BLtyu8hWc4%2FMQt5FOdTm29lYXUCahh2lWAh%2FFkKF8TUCDmlGKOLs3tLfKhdfqUTZDLw2hT1K8O5twuCJ%2F1EXm%2BuzD2A7dAFZaGaLq8ql1A41oUKIE3Hmfb%2FmM40UgtQuVrrc2boGtbmvGqVISemXUaELtU83A6O6lmj93FzMrft0fCA%2F6lBsB%2BQtXWod63TzAwLaey%2FqoElsbcej2b9z0M3vMsmIrXqsSKaYAG9IYsfb5xUOU5Kn3yZFMJ2cTBM%2F12PIbI0G3Cd7gPB5hjBrU2rc4qq0ceC0y8RHiQ4aUFZy6HQNGQvQNHyIl3EJUqewAWImLgNN8gkRxblUIKC9%2FVtYir%2BleXnBLx%2F3M9Zz0LjQ7oe%2Bx28%2FG8N5ZyzGr%2BdkRxt5IqWPxiD04lDVZoTpyFb2%2FeuKetJmybp%2F5lwa1byxQXIAos8Gaw%2FhbiOVJ6RQkUGrP%2FInd5eKVMYxannQOtaUrAHseuCT%2FYzEDLk6WTjFg%2BIW3EGO4VMrDp1oLUc8tkl99pjepIG0xrwhQs2T%2FECVHKZRESn21wOOqyQbHu5AIxWHgpzGpmMEPcfKzDBH1za2RyzhqL%2B8shT7csB457dMSklWSYZi1gNj0bjsePFf2WoEYrbgdSpPqPMrJY2s4qCFHVePXfktKX1W6U6nIVguiKsg6shqEWGPxhMRD6Hyjo3CG1QeEnnpUvkw66mN%2BdAiflhcknvAJQGpgBE081ntJp2Pj6fpNj25Q0xImkj8rAOGNOMz%2F0l%2B%2FhddJChb0CPaUP0zkSjpCxPrPXviZBb4pUr%2B8sIKxH%2BQ0c%2FDbplRZyKwrXFPtEuXvi1IhPlEwHBBmV%2Bmx%2BIUjOi%2FdbFGQQ95XcX9yCj7Pe%2F3P%2BSqSV3uOmhMW0h8hmjSe8MSyFj3Cc9AiZm5di8Hx0KL4UjZSsNxKWHndhIoyZbVwf%2Fshx%2FtUZVdDEnNiiYo8PthQ4BOkwudNivvF7ZzYDUkVNPnESqLEcBErAYTVIYGOwa3899GN6FIt2eBFVfP8w8VFzfaE%2BtGMcerYeAJI4WM2zqyHpH32m58iavmL5LEyrWvI2nZNxz4%2FA9jACPQwiA%3D%3D%22%2C%22e%22%3A%22NWywdOdd1ymWREVqj4JmLQYm1fF7nWAmt-OpTI7kNxoZlBWRa2tQbjrw7NKKFgF2ce5OEIk1iWtIA2sZjwqm2oUKUl8J_WGp9xnVdRmlQF45WoNJI38-25zLhNmAke1HJLy-hrjr3Bctpe8I39gRvBmyxX6mv_axFgYVWEez6dNiQ0b39qgGJK6NqxtgpSM46hjWv1t9A3dyMRuxQq-8gdgpj4rHAyhVVnkUNhQrLfU%22%7D",
#     "key": "superVip"
# }
# response = requests.post(url, headers=headers, cookies=cookies, data=data)

# print(response.text)
# print(response)
