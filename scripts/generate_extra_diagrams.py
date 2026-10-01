# -*- coding: utf-8 -*-
import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches

os.makedirs("docs/images", exist_ok=True)
plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['axes.edgecolor'] = '#94A3B8'

def draw_actor(ax, x, y, name, color='#1E3A8A'):
    circle = patches.Circle((x, y + 0.4), 0.18, fc='#DBEAFE', ec=color, lw=2, zorder=4)
    ax.add_patch(circle)
    ax.plot([x, x], [y + 0.22, y - 0.2], color=color, lw=2.5, zorder=4)
    ax.plot([x - 0.28, x + 0.28], [y + 0.05, y + 0.05], color=color, lw=2.5, zorder=4)
    ax.plot([x, x - 0.25], [y - 0.2, y - 0.55], color=color, lw=2.5, zorder=4)
    ax.plot([x, x + 0.25], [y - 0.2, y - 0.55], color=color, lw=2.5, zorder=4)
    ax.text(x, y - 0.75, name, ha='center', va='top', fontsize=9, fontweight='bold', color=color, zorder=5)

def draw_usecase(ax, x, y, w, h, text, color='#0284C7', fc='#EFF6FF'):
    ellipse = patches.Ellipse((x, y), w, h, fc=fc, ec=color, lw=1.8, zorder=3)
    ax.add_patch(ellipse)
    ax.text(x, y, text, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#0F172A', zorder=4)

def draw_arrow(ax, x1, y1, x2, y2, color='#64748B', style='->', lw=1.2, ls='solid'):
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle=style, color=color, lw=lw, ls=ls, shrinkA=4, shrinkB=4),
                zorder=2)

# 1. Use Case Customer
def create_usecase_customer():
    fig, ax = plt.subplots(figsize=(10, 6.5), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7.5)
    ax.axis('off')

    box = patches.FancyBboxPatch((2.2, 0.4), 7.4, 6.7, boxstyle='round,pad=0.15', fc='#FFFFFF', ec='#0284C7', lw=2, ls='--')
    ax.add_patch(box)
    ax.text(5.9, 6.7, "PHAN HE KHACH HANG (CUSTOMER SUB-SYSTEM)", ha='center', fontsize=11, fontweight='bold', color='#1E3A8A')

    draw_actor(ax, 1.0, 3.8, "Khach hang\n(Customer)")

    ucs = [
        (4.2, 5.8, "UC-C01: Dang ky tai khoan"),
        (4.2, 4.8, "UC-C02: Dang nhap he thong"),
        (4.2, 3.8, "UC-C03: Tim kiem & Loc san"),
        (4.2, 2.8, "UC-C04: Xem slot gio theo ngay"),
        (4.2, 1.8, "UC-C05: Dat san truc tuyen"),
        (7.8, 4.8, "UC-C06: Xem ve dien tu QR"),
        (7.8, 3.5, "UC-C07: Huy dat san & Hoan tien"),
        (7.8, 2.2, "UC-C08: Danh gia chat luong (Review)")
    ]

    for x, y, name in ucs:
        draw_usecase(ax, x, y, 3.2, 0.75, name)

    for y in [5.8, 4.8, 3.8, 2.8, 1.8]:
        draw_arrow(ax, 1.3, 3.8, 2.6, y)

    # includes / extends
    draw_arrow(ax, 5.8, 1.8, 6.2, 4.8, color='#059669', ls='--')
    ax.text(6.0, 3.3, "<<include>>", fontsize=7.5, color='#059669', fontweight='bold', rotation=45)

    draw_arrow(ax, 5.8, 1.8, 6.2, 3.5, color='#D97706', ls='--')
    ax.text(6.2, 2.5, "<<extend>>", fontsize=7.5, color='#D97706', fontweight='bold')

    plt.tight_layout()
    out = "docs/images/diag_usecase_customer.png"
    plt.savefig(out, dpi=300, bbox_inches='tight', facecolor='#F8FAFC')
    plt.close()
    print("Created:", out)

# 2. Use Case Staff & Admin
def create_usecase_staff_admin():
    fig, ax = plt.subplots(figsize=(10.5, 7.5), dpi=300)
    ax.set_xlim(0, 10.5)
    ax.set_ylim(0, 8.5)
    ax.axis('off')

    box = patches.FancyBboxPatch((2.2, 0.3), 6.1, 7.9, boxstyle='round,pad=0.15', fc='#FFFFFF', ec='#7C3AED', lw=2, ls='--')
    ax.add_patch(box)
    ax.text(5.25, 7.8, "PHAN HE NHAN SU & QUAN TRI (WORKFORCE & ADMIN)", ha='center', fontsize=10.5, fontweight='bold', color='#1E3A8A')

    draw_actor(ax, 1.0, 5.5, "Nhan vien\n(Staff)")
    draw_actor(ax, 9.5, 6.0, "Quan ly\n(Manager)")
    draw_actor(ax, 9.5, 2.5, "Admin\n(Quan tri vien)")

    ucs = [
        (5.25, 7.0, "UC-S01: Xem lich ca truc phan cong"),
        (5.25, 6.1, "UC-S02: Cham cong Vao/Ra realtime"),
        (5.25, 5.2, "UC-S03: Quet ma QR Token tai san"),
        (5.25, 4.3, "UC-S04: Gui don xin nghi phep"),
        (5.25, 3.4, "UC-M01: Xep lich phan ca lam viec"),
        (5.25, 2.5, "UC-M02: Phe duyet / Tu choi nghi phep"),
        (5.25, 1.6, "UC-A01: Hieu chinh cong & Audit Log"),
        (5.25, 0.7, "UC-A02: Tinh bang luong & Recharts KPI")
    ]

    for x, y, name in ucs:
        draw_usecase(ax, x, y, 3.4, 0.65, name)

    # Connect Staff
    for y in [7.0, 6.1, 5.2, 4.3]:
        draw_arrow(ax, 1.3, 5.5, 3.5, y)

    # Connect Manager
    for y in [7.0, 3.4, 2.5]:
        draw_arrow(ax, 9.2, 6.0, 7.0, y)

    # Connect Admin
    for y in [3.4, 2.5, 1.6, 0.7]:
        draw_arrow(ax, 9.2, 2.5, 7.0, y)

    plt.tight_layout()
    out = "docs/images/diag_usecase_staff_admin.png"
    plt.savefig(out, dpi=300, bbox_inches='tight', facecolor='#F8FAFC')
    plt.close()
    print("Created:", out)

# 3. Sequence Attendance
def create_sequence_attendance():
    fig, ax = plt.subplots(figsize=(11, 7.5), dpi=300)
    ax.set_xlim(0, 11)
    ax.set_ylim(0, 8.5)
    ax.axis('off')

    ax.text(5.5, 8.1, "BIEU DO TUAN TU: QUY TRINH CHAM CONG QR VA LUU VET AUDIT LOG",
            ha='center', va='center', fontsize=11, fontweight='bold', color='#1E3A8A')

    lifelines = [
        (1.2, "Nhan vien\n(Staff)"),
        (3.3, "Client UI\n(React Web)"),
        (5.5, "AttendanceCtrl\n(API Router)"),
        (7.7, "AttendanceSvc\n(Service Logic)"),
        (9.8, "MongoDB\n(Database)")
    ]

    for x, label in lifelines:
        box = patches.FancyBboxPatch((x - 0.9, 7.1), 1.8, 0.6, boxstyle='round,pad=0.1', fc='#1E3A8A', ec='#1E3A8A', lw=1.5)
        ax.add_patch(box)
        ax.text(x, 7.4, label, ha='center', va='center', fontsize=8, fontweight='bold', color='#FFFFFF')
        ax.plot([x, x], [7.1, 0.5], color='#94A3B8', lw=1.2, ls='--')

    steps = [
        (1.2, 3.3, 6.6, "1. Quet ma QR tai san & Bam Check-in", False),
        (3.3, 5.5, 6.1, "2. POST /api/attendance/check-in { scheduleId, qrToken }", False),
        (5.5, 7.7, 5.6, "3. checkIn(userId, scheduleId, qrToken)", False),
        (7.7, 9.8, 5.1, "4. findOne({ code: qrToken, expiresAt: { $gt: now } })", False),
        (9.8, 7.7, 4.6, "5. Token hop le & Chua het han", True),
        (7.7, 7.7, 4.1, "6. So sanh gio hien tai voi startTime + gracePeriod", False),
        (7.7, 9.8, 3.5, "7. create({ checkIn: now, status: 'present', qrVerified: true })", False),
        (7.7, 9.8, 3.0, "8. createLog({ action: 'check_in', reason: 'QR Verify' })", False),
        (9.8, 7.7, 2.5, "9. Ghi thanh cong ban ghi Attendance & AuditLog", True),
        (7.7, 5.5, 2.0, "10. Tra ve du lieu cham cong da cap nhat", True),
        (5.5, 3.3, 1.5, "11. HTTP 201 Created { success: true, data }", True),
        (3.3, 1.2, 1.0, "12. Hien thi thong bao Check-in thanh cong", True)
    ]

    for x1, x2, y, msg, is_return in steps:
        if x1 == x2:
            ax.annotate('', xy=(x1, y - 0.25), xytext=(x1, y),
                        arrowprops=dict(arrowstyle='->', color='#2563EB', lw=1.3,
                                        connectionstyle="arc,angleA=0,armA=25,angleB=180,armB=25,rad=4"))
            ax.text(x1 + 0.35, y - 0.12, msg, fontsize=7.5, fontweight='bold', color='#1E293B', va='center')
        else:
            style = '<-' if is_return and x1 > x2 else '->'
            color = '#059669' if is_return else '#2563EB'
            ls = '--' if is_return else '-'
            ax.annotate('', xy=(x2, y), xytext=(x1, y),
                        arrowprops=dict(arrowstyle=style, color=color, lw=1.3, ls=ls, shrinkA=3, shrinkB=3))
            ax.text((x1 + x2)/2, y + 0.15, msg, ha='center', va='bottom', fontsize=7.5, fontweight='bold', color='#1E293B')

    plt.tight_layout()
    out = "docs/images/diag_sequence_attendance.png"
    plt.savefig(out, dpi=300, bbox_inches='tight', facecolor='#F8FAFC')
    plt.close()
    print("Created:", out)

if __name__ == "__main__":
    create_usecase_customer()
    create_usecase_staff_admin()
    create_sequence_attendance()
    print("All supplementary diagrams generated successfully!")
