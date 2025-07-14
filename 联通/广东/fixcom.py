import requests
import json
import concurrent.futures
import time
import os
from datetime import datetime

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "POST,GET",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://gdlive.17wo.cn",
    "Pragma": "no-cache",
    "Referer": "https://gdlive.17wo.cn/olduser/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36 Edg/135.0.0.0",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\""
}
cookies = {
    "_pk_id.1.8064": "abd96aa98827838e.1743950994.",
    "fisrtIndexDate": "2025-04-06",
    "fisrtIndexHomeCount": "2",
    "fisrtIndexDateRight": "2025-04-06",
    "fisrtIndexCountRight": "3"
}
url = "https://gdlive.17wo.cn/stVsed/fixConfigRemond"

def make_request(fix_type):
    data = {
        "userId": "13149080003",
        "fixRecomdType": str(fix_type),
        "code": "7692",
        "CHANNEL_CODE": "004",
        "agentId": "10010xxl_lyhzq"
    }
    json_data = json.dumps(data, separators=(',', ':'))
    try:
        response = requests.post(url, headers=headers, cookies=cookies, data=json_data)
        result = response.json()
        
        # Check if goodsInfos exists and is not empty
        if 'goodsInfos' in result and len(result['goodsInfos']) > 0:
            return fix_type, True, len(result['goodsInfos']), result
        return fix_type, False, 0, None
    except Exception as e:
        print(f"Error with fixRecomdType {fix_type}: {str(e)}")
        return fix_type, False, 0, None

# Define the range of fixRecomdType to test
start_range = 100
end_range = 200  # Adjust the range as needed

# Create directory for storing results if it doesn't exist
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
results_dir = f"fixcom_results_{timestamp}"
if not os.path.exists(results_dir):
    os.makedirs(results_dir)

# File for summary
summary_file = os.path.join(results_dir, "summary.txt")

# Use ThreadPoolExecutor for concurrent requests
valid_types = []
print(f"Testing fixRecomdType values from {start_range} to {end_range}...")

with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    futures = [executor.submit(make_request, fix_type) for fix_type in range(start_range, end_range + 1)]
    
    for future in concurrent.futures.as_completed(futures):
        fix_type, is_valid, items_count, result = future.result()
        if is_valid:
            valid_types.append((fix_type, items_count))
            
            # Save each valid response to its own file named after the fixRecomdType
            file_name = os.path.join(results_dir, f"{fix_type}.json")
            with open(file_name, 'w', encoding='utf-8') as f:
                json.dump(result, f, ensure_ascii=False, indent=2)
                
            print(f"Found valid fixRecomdType: {fix_type} with {items_count} items - saved to {file_name}")

# Sort by fixRecomdType
valid_types.sort()

# Write the summary to a text file
with open(summary_file, 'w', encoding='utf-8') as f:
    f.write(f"Testing fixRecomdType values from {start_range} to {end_range}\n")
    f.write(f"Timestamp: {timestamp}\n\n")
    f.write("Summary of valid fixRecomdType values with non-empty goodsInfos:\n")
    for fix_type, count in valid_types:
        f.write(f"fixRecomdType: {fix_type}, Items count: {count}\n")
    f.write(f"\nTotal valid types found: {len(valid_types)}\n")

print("\nSummary of valid fixRecomdType values with non-empty goodsInfos:")
for fix_type, count in valid_types:
    print(f"fixRecomdType: {fix_type}, Items count: {count}")

print(f"\nTotal valid types found: {len(valid_types)}")
print(f"\nResults saved to individual files in: {results_dir}")
print(f"Summary saved to: {summary_file}")