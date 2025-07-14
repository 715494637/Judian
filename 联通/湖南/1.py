import requests

url = "http://flow.hn.189.cn/hnfx/flow/getLoginCode?XhC8Wb=0YRyunqlqWoTQgsgI9O4rmpra_FfDA3Eiyud7cMXuK412Oof1GvLKU6.8xEzEsDCZVZGj8rpiLnqm8dMT8zsqcBuCRZ_kHFW_yiOGP9.2z0PCcz_.erusIA"
cookies = {
  "zhizhendata2015jssdkcross": "%7B%22distinct_id%22%3A%22MTk2MDhhNWRlZmU3YjktMDlhMjRmMTUyM2UzYS00YzY1N2I1OC05MzQxNDQtMTk2MDhhNWRlZmYyYjEw%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22login_type%22%3A%22%22%2C%22utms%22%3A%7B%7D%2C%22%24device_id%22%3A%2219608a5defe7b9-09a24f1523e3a-4c657b58-934144-19608a5deff2b10%22%7D",
  "FSSBBIl1UgzbN7NS": "60cF4SG9DWLBGHQb1rw.4VZxG3LSMyRb.v8OGr7VPHUYBVWOYGFt6TVQYePjgXscxMVgnZXCYX9HVe1r5nfXyjeq",
  "FSSBBIl1UgzbN7NT": "0.GQahtbXy7WCaxxP3sV2dlvV29suFK9MRYsvd_Fz80lDdZ3KPHgZxKqpTMhlcRK.Z_G.C3AmcDU6LFxdUsB1CF35DecumSnOrbCjXIDUwCa9MCnoBK1_HDSWEu2lNN40j7fRP6c2AmsbMxWwcMpwX9K7M4oyt18CG.akMlbNx85fYVhSF2bCPvWQ2kpV21xL88mOaltOufxVGbJ5C1VkDqcoDard0rA4rr0MBxw3GT6iVN34lDtuW_r8CudSy4EdJo67Jxb3nb3nsZ7aVZ2NXGlTGGbWdKzsBZjv6rSSQ3qnDk6.cBxI5GF0R1fAbaSN658OCb.AK4gU_x.qg.Yc1N3H_8RFsWqe0UdyVkXC3yOJj4M8Ws.cOzciFBugE0828Pcms.e5Qr.jyf53E5p5D2sMIMrvN2r3f9wvfNa.k37xx3YC3.vmndhyELYHQ6ihFlxA_kmBGjOsRR.gsfvf3fR9KZt2qheLOkY98p.Rhq9",
}

headers = {
  "Host": "flow.hn.189.cn",
  "Proxy-Connection": "keep-alive",
  "X-Requested-With": "XMLHttpRequest",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0",
  "Accept": "*/*",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  "Origin": "http://flow.hn.189.cn",
  "Referer": "http://flow.hn.189.cn/hnfx/hkly/newhlwkflzxqd?clientid=SMS&tk=",
  "Accept-Encoding": "gzip, deflate",
  "Accept-Language": "zh-CN,zh;q=0.9"
}
data = """phoneNo=17300790386&codeno=7155"""

res = requests.post(url, headers=headers, cookies=cookies, data=data)
print(res)
