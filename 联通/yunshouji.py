import requests
import json

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
     "Content-Type": "application/json",
    "Authorization": "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxODk5MDA3OTUzNTkwNjI4MzU0LCJ1c2VyX2tleSI6Ijc0NzFlYTQ5LWQyMjUtNDUxMi1iZDY3LTk5MmFkYmVkY2Y0MSIsImlzQWxsb3dMb2dpbiI6dHJ1ZSwiaXNBcHBVc2VyIjp0cnVlLCJ1c2VybmFtZSI6IjE1MzYxMzg0NDcxIn0.IilRLuE1QFS8i5nyHrHykG0heqaMgKFn4c9ZkYbdWS67vBAWH4Ozzju2Dleyql6OtCG4KK3ONsrEL0qLmU9KGQ",
    "Connection": "keep-alive",
    "Referer": "https://uphone.wo-adv.cn/cloudphone/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 Edg/134.0.0.0",
    "channelCode": "bucp-master",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\""
}

"""
获取商品列表和所需参数，可以Type改成别的试试
"""
# url = "https://uphone.wo-adv.cn/bucp/servers/resource/sku-product/list-activity"
# params = {
#     "activityType": "1"
# }
# response = requests.get(url, headers=headers, params=params)

# with open('sku_list.json', 'w', encoding='utf-8') as f:
#     json.dump(response.json(), f, ensure_ascii=False, indent=4)   



# print(response.text)
# print(response)


"""
创建订单

买付费云手机，但是这样只创建订单，不支付,而且改变部分参数异常无法支付
data = {
    "paymentType": 5,
    "channelCode": "bucp-master",
    "tradeSource": "4",
    "tradeType": 1,
    "authCode": "",
    "orderList": [
        {
            "skuNum": 1,
            "skuName": "尊享版",
            "skuId": 2,
            "skuCode": "ZXM0001",
            "regionId": 1,
            "currentSaleMoney": 8800
        }
    ]
}
买免费云手机7日;
data = {
    "paymentType": "0",
    "channelCode": "bucp-master",
    "tradeSource": "4",
    "orderList": [
        {
            "currentSaleMoney": 0,
            "skuCode": "ZXM0001",
            "skuId": 0,
            "skuName": "豪华版",
            "skuNum": 1
        }
    ]
}


"""
url = "https://uphone.wo-adv.cn/bucp/servers/order/trade/createTrade"

data = {
    "paymentType": "0",
    "channelCode": "bucp-master",
    "tradeSource": "4",
    "orderList": [
        {
            "currentSaleMoney": 0,
            "skuCode": "HHTY0001",
            "skuId": 12,
            "skuName": "豪华版",
            "skuNum": 1
        }
    ]
}


data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)
# 
"""
响应内容:
{
    "msg": "验证商品订单信息成功",
    "code": 200,
    "data": {
        "id": 1,
        "tradeCode": "CP3249FAJM1741704866",
        "tradeSource": "4",
        "channelCode": "bucp-master",
        "tradeType": "1",
        "paymentType": "0",
        "paymentMsg": null,
        "phonenumber": "13696458853",
        "totalMoney": 0,
        "totalPayMoney": 0,
        "totalReturnMoney": 0,
        "tradeStatus": "50",
        "payStatus": "51",
        "expireTime": "2025-03-11 23:24:26",
        "orderList": [
            {
                "tradeId": null,
                "tradeCode": "CP3249FAJM1741704866",
                "skuId": 12,
                "productId": null,
                "skuCode": "HHTY0001",
                "skuName": "豪华版",
                "skuShortName": "体验商品",
                "skuType": "1",
                "pictureUrl": "/tj-cloudphone-raw/bucp/sku/skutype/云手机豪华版.png",
                "skuNum": 1,
                "quotaLimit": -1,
                "saleMoney": 0,
                "distributionMoney": 0,
                "totalMoney": 0,
                "totalDistributionMoney": 0,
                "regionId": 9,


"""