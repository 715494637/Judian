import requests
import json
import concurrent.futures
import os
from tqdm import tqdm
import time
import logging
import datetime

# 配置日志
log_dir = "logs"
if not os.path.exists(log_dir):
    os.makedirs(log_dir)

log_file = os.path.join(log_dir, f"product_scan_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.log")
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler(log_file, encoding='utf-8'),
        logging.StreamHandler()
    ]
)

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://app1.hlj165.com",
    "Pragma": "no-cache",
    "Referer": "https://app1.hlj165.com/app/activiteDraw/index?source=sms&custCode=aaJFGi",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 Edg/134.0.0.0",
    "app_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJib25jIiwidXNlckAjJEluZm9AYm9uYyI6IntcImFyZWFfY29kZVwiOlwiMDQ1MVwiLFwiY2l0eV9jb2RlXCI6XCI5NzFcIixcImludmFsaWRfYXRcIjpcIjIwMjUtMDQtMDIgMjA6MDg6MDBcIixcInByb3ZpbmNlX2NvZGVcIjpcIjk3XCIsXCJ1c2VyX2lkXCI6XCIxMzEzNjY3MDkyM1wifSIsImV4cCI6MTc0MzQyMjg4MCwiaWF0IjoxNzQzMzM2NDgwfQ.RkK1aJjgNiujlIlc719rqWyjOm9zVLFZqtboVAJJxcM",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\""
}
cookies = {
    "_pk_ses.3.c569": "1",
    "JSESSIONID": "0FB8EE75C393597A27388B59786FB3BE",
    "_pk_id.3.c569": "8bfb181b46af848a.1743253354.10.1743337526.1743335519."
}
url = "https://app1.hlj165.com/bonc-api/rest/app/product/getProductDetailByCond"

# 创建结果目录
result_dir = "product_results"
if not os.path.exists(result_dir):
    os.makedirs(result_dir)

# 配置参数
START_ID = 90000000
END_ID = 100000000
BATCH_SIZE = 50  # 每批次处理的ID数量，增加批次大小以减少批次总数
MAX_WORKERS = 5  # 减少线程数以避免过载
RETRY_LIMIT = 3  # 失败重试次数
DELAY_BETWEEN_BATCHES = 0.5  # 每批次之间的延迟（秒）
SUBMIT_CHUNK_SIZE = 50  # 每次提交给线程池的批次数
STATUS_UPDATE_INTERVAL = 20  # 状态更新间隔（秒）

def process_batch(batch_ids, batch_num):
    """处理单个批次的ID"""
    batch_start_id = batch_ids[0]
    batch_end_id = batch_ids[-1]
    
    logging.debug(f"开始处理批次 {batch_num}，ID范围: {batch_start_id}-{batch_end_id}")
    
    retry_count = 0
    while retry_count < RETRY_LIMIT:
        try:
            data = {
                "productIdSet": [str(i) for i in batch_ids]
            }
            json_data = json.dumps(data, separators=(',', ':'))
            
            start_time = time.time()
            response = requests.post(url, headers=headers, cookies=cookies, data=json_data, timeout=30)
            end_time = time.time()
            
            logging.debug(f"批次 {batch_num} 请求完成，耗时: {end_time - start_time:.2f}秒，状态码: {response.status_code}")
            
            if response.status_code == 200:
                result = response.json()
                items_count = len(result.get("result", []))
                logging.debug(f"批次 {batch_num} 获取到 {items_count} 个产品信息")
                
                # 保存批次结果
                output_file = os.path.join(result_dir, f"batch_{batch_num}.json")
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(result, f, ensure_ascii=False, indent=4)
                
                # 只有找到实际产品时才记录详细日志
                if items_count > 0:
                    logging.info(f"批次 {batch_num} (ID: {batch_start_id}-{batch_end_id}) 发现 {items_count} 个产品")
                
                return True, batch_num, items_count
            else:
                retry_count += 1
                logging.warning(f"批次 {batch_num} 请求失败，状态码: {response.status_code}，重试 ({retry_count}/{RETRY_LIMIT})")
                time.sleep(2)  # 失败后等待2秒再重试
        except Exception as e:
            retry_count += 1
            logging.warning(f"批次 {batch_num} 请求异常: {str(e)}，重试 ({retry_count}/{RETRY_LIMIT})")
            time.sleep(2)
            
    logging.error(f"批次 {batch_num} (ID: {batch_start_id}-{batch_end_id}) 处理失败，已达最大重试次数")
    return False, batch_num, 0

def main():
    start_time = time.time()
    logging.info("开始执行产品扫描任务")
    logging.info(f"配置信息: ID范围 {START_ID}-{END_ID}, 批次大小 {BATCH_SIZE}, 最大线程数 {MAX_WORKERS}")
    
    # 生成批次
    total_ids = END_ID - START_ID
    total_batches = (total_ids + BATCH_SIZE - 1) // BATCH_SIZE  # 向上取整
    
    logging.info(f"开始生成批次，总ID数: {total_ids}, 预计批次数: {total_batches}")
    
    # 分块处理所有批次以避免一次性创建过多批次导致内存问题
    successful_batches = 0
    failed_batches = []
    total_items_found = 0
    last_status_time = time.time()
    
    # 计算总批次数
    num_chunks = (total_batches + SUBMIT_CHUNK_SIZE - 1) // SUBMIT_CHUNK_SIZE
    logging.info(f"将分 {num_chunks} 轮处理所有批次")
    
    for chunk_idx in range(num_chunks):
        chunk_start = START_ID + chunk_idx * SUBMIT_CHUNK_SIZE * BATCH_SIZE
        chunk_end = min(chunk_start + SUBMIT_CHUNK_SIZE * BATCH_SIZE, END_ID)
        
        # 生成当前块的批次
        batches = []
        for i in range(chunk_start, chunk_end, BATCH_SIZE):
            end = min(i + BATCH_SIZE, END_ID)
            batch_num = (i - START_ID) // BATCH_SIZE
            batches.append((list(range(i, end)), batch_num))
        
        logging.info(f"第 {chunk_idx+1}/{num_chunks} 轮: 处理 {len(batches)} 个批次 (ID范围: {chunk_start}-{chunk_end})")
        
        # 使用线程池处理当前块的批次
        with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
            futures = []
            for batch_ids, batch_num in batches:
                future = executor.submit(process_batch, batch_ids, batch_num)
                futures.append(future)
                time.sleep(DELAY_BETWEEN_BATCHES)  # 控制请求频率
            
            # 使用 tqdm 显示进度
            for future in tqdm(concurrent.futures.as_completed(futures), total=len(futures), desc=f"处理第 {chunk_idx+1} 轮批次"):
                success, batch_num, items_count = future.result()
                if success:
                    successful_batches += 1
                    total_items_found += items_count
                else:
                    failed_batches.append(batch_num)
                
                # 定期输出状态更新
                current_time = time.time()
                if current_time - last_status_time > STATUS_UPDATE_INTERVAL:
                    elapsed = current_time - start_time
                    progress = (chunk_idx * SUBMIT_CHUNK_SIZE + len(futures)) / total_batches * 100
                    logging.info(f"状态更新 - 进度: {progress:.2f}%, 成功: {successful_batches}, 失败: {len(failed_batches)}, 发现产品: {total_items_found}, 耗时: {elapsed:.2f}秒")
                    last_status_time = current_time
    
    elapsed_time = time.time() - start_time
    logging.info(f"处理完成！成功: {successful_batches} 批, 失败: {len(failed_batches)} 批, 总耗时: {elapsed_time:.2f}秒")
    
    # 合并结果
    logging.info("开始合并结果...")
    all_results = {"respCode": "0000", "respDesc": "Success", "result": []}
    
    result_files = [f for f in os.listdir(result_dir) if f.endswith(".json")]
    logging.info(f"找到 {len(result_files)} 个结果文件")
    
    for filename in tqdm(result_files, desc="合并结果文件"):
        file_path = os.path.join(result_dir, filename)
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                batch_data = json.load(f)
                if "result" in batch_data and isinstance(batch_data["result"], list):
                    items_count = len(batch_data["result"])
                    if items_count > 0:
                        logging.debug(f"从 {filename} 中合并 {items_count} 条产品信息")
                    all_results["result"].extend(batch_data["result"])
        except Exception as e:
            logging.error(f"读取 {filename} 失败: {str(e)}")
    
    # 保存合并后的结果
    total_results = len(all_results["result"])
    logging.info(f"合并完成！共获取到 {total_results} 条产品信息")
    
    with open('product_details_all.json', 'w', encoding='utf-8') as f:
        json.dump(all_results, f, ensure_ascii=False, indent=4)
    
    logging.info(f"任务完成！结果已保存到 product_details_all.json")

if __name__ == "__main__":
    main()
