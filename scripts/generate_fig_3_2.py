# -*- coding: utf-8 -*-
import matplotlib.pyplot as plt
import numpy as np

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5), dpi=300)

# Chart 1: Latency vs Concurrent Users
users = [10, 50, 100, 200, 500, 1000]
naive_time = [18, 65, 145, 380, 1150, 2800] # ms
opt_time = [12, 22, 38, 75, 160, 310] # ms

ax1.plot(users, naive_time, marker='o', color='#EF4444', lw=2.5, label='Naive Query (Không chỉ mục)')
ax1.plot(users, opt_time, marker='s', color='#10B981', lw=2.5, label='Compound Index + Overlap Query (Tối ưu)')
ax1.set_title('Thời gian đáp ứng trung bình theo số lượng request đồng thời', fontsize=10, fontweight='bold', pad=10)
ax1.set_xlabel('Số lượng yêu cầu đồng thời (Concurrent Requests)', fontsize=9)
ax1.set_ylabel('Thời gian phản hồi - Latency (ms)', fontsize=9)
ax1.grid(True, ls='--', alpha=0.6)
ax1.legend(fontsize=8.5)

# Chart 2: Latency by Operations
ops = ['Tìm kiếm sân', 'Ma trận slot', 'Tạo Booking', 'Xác thực QR', 'Tính Lương']
latency = [24.5, 31.2, 45.8, 28.6, 62.4]
colors = ['#3B82F6', '#6366F1', '#EC4899', '#10B981', '#F59E0B']

bars = ax2.bar(ops, latency, color=colors, width=0.55, edgecolor='#334155', lw=1.2)
ax2.set_title('Độ trễ trung bình của các API Endpoints cốt lõi (ms)', fontsize=10, fontweight='bold', pad=10)
ax2.set_ylabel('Thời gian xử lý - Latency (ms)', fontsize=9)
ax2.grid(axis='y', ls='--', alpha=0.6)

for bar in bars:
    yval = bar.get_height()
    ax2.text(bar.get_x() + bar.get_width()/2.0, yval + 1.5, f'{yval} ms', ha='center', va='bottom', fontsize=8.5, fontweight='bold')

plt.tight_layout()
plt.savefig('docs/images/diag_perf_benchmark.png', dpi=300, bbox_inches='tight')
print('Generated docs/images/diag_perf_benchmark.png')
