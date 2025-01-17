# import concurrent.futures
# import time
# def task(n):
#     """模拟一个耗时任务"""
#     print(f"开始任务 {n}")
#     time.sleep(2)  # 模拟耗时操作
#     print(f"完成任务 {n}")
#     return n * n
# def main():
#     # 创建一个包含5个线程的线程池
#     with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
#         # 提交任务到线程池
#         futures = [executor.submit(task, i) for i in range(10)]
#         # 获取任务结果
#         for future in concurrent.futures.as_completed(futures):
#             try:
#                 result = future.result()
#                 print(f"任务结果: {result}")
#             except Exception as e:
#                 print(f"任务发生异常: {e}")

# main()
from main import *
judian = Judian()
pool = dataBase().GetAllToken()
# for info in pool:
#     judian.login(info['account'],"dddd1111")
#多线程登录
def loginThread(info):
    judian.login(info['account'],"dddd1111")

if __name__ == "__main__":
    with concurrent.futures.ThreadPoolExecutor(max_workers=99) as executor:
        futures = [executor.submit(loginThread, info) for info in pool]
