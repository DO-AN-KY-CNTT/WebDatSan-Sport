# -*- coding: utf-8 -*-
import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Ensure output directory exists
os.makedirs("docs/images", exist_ok=True)

plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['axes.edgecolor'] = '#94A3B8'

def draw_actor(ax, x, y, name, color='#1E3A8A'):
    # Head
    circle = patches.Circle((x, y + 0.4), 0.18, fc='#DBEAFE', ec=color, lw=2, zorder=4)
    ax.add_patch(circle)
    # Body
    ax.plot([x, x], [y + 0.22, y - 0.2], color=color, lw=2.5, zorder=4)
    # Arms
    ax.plot([x - 0.28, x + 0.28], [y + 0.05, y + 0.05], color=color, lw=2.5, zorder=4)
    # Legs
    ax.plot([x, x - 0.25], [y - 0.2, y - 0.55], color=color, lw=2.5, zorder=4)
    ax.plot([x, x + 0.25], [y - 0.2, y - 0.55], color=color, lw=2.5, zorder=4)
    # Label
    ax.text(x, y - 0.75, name, ha='center', va='top', fontsize=9, fontweight='bold', color=color, zorder=5)

def draw_usecase(ax, x, y, w, h, text, color='#0284C7', fc='#EFF6FF'):
    ellipse = patches.Ellipse((x, y), w, h, fc=fc, ec=color, lw=1.8, zorder=3)
    ax.add_patch(ellipse)
    ax.text(x, y, text, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#0F172A', zorder=4)

def draw_arrow(ax, x1, y1, x2, y2, color='#64748B', style='->', lw=1.2, ls='solid'):
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle=style, color=color, lw=lw, ls=ls, shrinkA=4, shrinkB=4),
                zorder=2)

# ==============================================================================
# DIAGRAM 1: USE CASE TỔNG QUAN HỆ THỐNG
# ==============================================================================
def create_usecase_general():
    fig, ax = plt.subplots(figsize=(11, 7.5), dpi=300)
    ax.set_xlim(0, 11)
    ax.set_ylim(0, 8.5)
    ax.axis('off')

    # Background boundary box
    sys_box = patches.FancyBboxPatch((2.2, 0.4), 6.6, 7.6, boxstyle='round,pad=0.2',
                                     fc='#FFFFFF', ec='#0284C7', lw=2.5, ls='--')
    ax.add_patch(sys_box)
    ax.text(5.5, 7.7, "HỆ THỐNG QUẢN LÝ & ĐẶT SÂN SPORTBOOKING",
            ha='center', va='center', fontsize=12, fontweight='bold', color='#1E3A8A')

    # Actors
    draw_actor(ax, 1.0, 6.2, "Khách hàng\n(Customer)")
    draw_actor(ax, 1.0, 2.4, "Nhân viên\n(Staff)")
    draw_actor(ax, 10.0, 6.2, "Quản lý\n(Manager)")
    draw_actor(ax, 10.0, 2.4, "Quản trị viên\n(Admin)")

    # Use cases
    # Customer
    draw_usecase(ax, 4.0, 7.0, 2.6, 0.7, "UC01: Đăng ký / Đăng nhập")
    draw_usecase(ax, 4.0, 6.0, 2.6, 0.7, "UC02: Tìm kiếm & Xem sân")
    draw_usecase(ax, 4.0, 5.0, 2.6, 0.7, "UC03: Đặt sân chống trùng")
    draw_usecase(ax, 4.0, 4.0, 2.6, 0.7, "UC04: Xem vé QR / Hủy đặt")
    draw_usecase(ax, 4.0, 3.0, 2.6, 0.7, "UC05: Đánh giá sân (Review)")

    # Staff
    draw_usecase(ax, 4.0, 1.8, 2.6, 0.7, "UC06: Xem lịch làm việc")
    draw_usecase(ax, 4.0, 0.9, 2.6, 0.7, "UC07: Chấm công QR Vào/Ra")

    # Manager & Admin
    draw_usecase(ax, 7.0, 6.9, 2.6, 0.7, "UC08: Quản lý Sân thể thao")
    draw_usecase(ax, 7.0, 5.8, 2.6, 0.7, "UC09: Phân ca làm việc")
    draw_usecase(ax, 7.0, 4.7, 2.6, 0.7, "UC10: Duyệt đơn nghỉ phép")
    draw_usecase(ax, 7.0, 3.6, 2.6, 0.7, "UC11: Giám sát & Audit Log")
    draw_usecase(ax, 7.0, 2.3, 2.6, 0.7, "UC12: Tính bảng lương")
    draw_usecase(ax, 7.0, 1.1, 2.6, 0.7, "UC13: Dashboard KPI Recharts")

    # Connect Customer
    for y in [7.0, 6.0, 5.0, 4.0, 3.0]:
        draw_arrow(ax, 1.3, 6.2, 2.7, y)

    # Connect Staff
    for y in [7.0, 1.8, 0.9]:
        draw_arrow(ax, 1.3, 2.4, 2.7, y)
    draw_arrow(ax, 1.3, 2.4, 5.7, 4.7) # xin nghỉ

    # Connect Manager
    for y in [6.9, 5.8, 4.7, 3.6]:
        draw_arrow(ax, 9.7, 6.2, 8.3, y)

    # Connect Admin
    for y in [6.9, 5.8, 4.7, 3.6, 2.3, 1.1]:
        draw_arrow(ax, 9.7, 2.4, 8.3, y)

    plt.tight_layout()
    out = "docs/images/diag_usecase_general.png"
    plt.savefig(out, dpi=300, bbox_inches='tight', facecolor='#F8FAFC')
    plt.close()
    print("Created:", out)

# ==============================================================================
# DIAGRAM 2: HOẠT ĐỘNG (ACTIVITY DIAGRAM) - ĐẶT SÂN CHỐNG TRÙNG LỊCH
# ==============================================================================
def create_activity_booking():
    fig, ax = plt.subplots(figsize=(10, 8), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 9.5)
    ax.axis('off')

    # Title
    ax.text(5, 9.1, "QUY TRÌNH HOẠT ĐỘNG: ĐẶT SÂN VÀ KIỂM TRA CHỐNG TRÙNG LỊCH",
            ha='center', va='center', fontsize=11.5, fontweight='bold', color='#1E3A8A')

    # Start Node
    start = patches.Circle((5, 8.4), 0.18, fc='#0F172A', ec='#0F172A', zorder=4)
    ax.add_patch(start)
    ax.text(5.3, 8.4, "Bắt đầu", va='center', fontsize=9, fontweight='bold', color='#0F172A')

    # Nodes helper
    def act_box(y, text, color='#2563EB', fc='#EFF6FF', w=3.4, h=0.65):
        rect = patches.FancyBboxPatch((5 - w/2, y - h/2), w, h, boxstyle='round,pad=0.15',
                                     fc=fc, ec=color, lw=1.5, zorder=3)
        ax.add_patch(rect)
        ax.text(5, y, text, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#0F172A', zorder=4)

    def decision_diamond(y, text, color='#D97706', fc='#FEF3C7', w=3.0, h=0.7):
        pts = [(5, y + h/2), (5 + w/2, y), (5, y - h/2), (5 - w/2, y)]
        diamond = patches.Polygon(pts, closed=True, fc=fc, ec=color, lw=1.5, zorder=3)
        ax.add_patch(diamond)
        ax.text(5, y, text, ha='center', va='center', fontsize=8, fontweight='bold', color='#78350F', zorder=4)

    # Sequence of nodes
    draw_arrow(ax, 5, 8.22, 5, 7.8)
    act_box(7.5, "1. Khách hàng chọn sân, ngày & khung giờ")

    draw_arrow(ax, 5, 7.15, 5, 6.75)
    decision_diamond(6.4, "Giờ đặt có hợp lệ & trong\ngiờ mở cửa sân?")

    # Branch No
    draw_arrow(ax, 6.5, 6.4, 8.2, 6.4)
    act_box(6.4, "Báo lỗi giờ không hợp lệ (400)", color='#DC2626', fc='#FEE2E2', w=2.4, h=0.6)
    draw_arrow(ax, 8.2, 6.1, 8.2, 1.8)

    # Branch Yes
    ax.text(5.15, 5.9, "[Hợp lệ]", fontsize=8, color='#059669', fontweight='bold')
    draw_arrow(ax, 5, 6.05, 5, 5.6)
    act_box(5.3, "2. Backend truy vấn các booking cùng ngày\nIndex: { court: 1, date: 1, status: 1 }")

    draw_arrow(ax, 5, 4.95, 5, 4.55)
    decision_diamond(4.2, "Kiểm tra giao thoa khoảng giờ:\nmax(start) < min(end)?")

    # Conflict Found
    ax.text(6.6, 4.3, "[Bị trùng]", fontsize=8, color='#DC2626', fontweight='bold')
    draw_arrow(ax, 6.5, 4.2, 8.2, 4.2)
    act_box(4.2, "Báo lỗi trùng lịch (409 Conflict)\nKhung giờ đã có người đặt", color='#DC2626', fc='#FEE2E2', w=2.6, h=0.65)
    draw_arrow(ax, 8.2, 3.85, 8.2, 1.8)

    # Conflict Free
    ax.text(5.15, 3.75, "[Trống 100%]", fontsize=8, color='#059669', fontweight='bold')
    draw_arrow(ax, 5, 3.85, 5, 3.4)
    act_box(3.1, "3. Tính tổng tiền & sinh mã BK-YYYYMMDD-XXXX")

    draw_arrow(ax, 5, 2.75, 5, 2.35)
    act_box(2.0, "4. Lưu Booking status='confirmed'\nSinh vé điện tử kèm mã QR", color='#059669', fc='#ECFDF5')

    draw_arrow(ax, 5, 1.65, 5, 1.25)

    # End Node Success
    end_s = patches.Circle((5, 1.0), 0.22, fc='#FFFFFF', ec='#059669', lw=2, zorder=3)
    end_s_in = patches.Circle((5, 1.0), 0.13, fc='#059669', ec='#059669', zorder=4)
    ax.add_patch(end_s)
    ax.add_patch(end_s_in)
    ax.text(5, 0.6, "Thành công", ha='center', fontsize=8.5, fontweight='bold', color='#059669')

    # End Node Fail
    end_f = patches.Circle((8.2, 1.6), 0.22, fc='#FFFFFF', ec='#DC2626', lw=2, zorder=3)
    end_f_in = patches.Circle((8.2, 1.6), 0.13, fc='#DC2626', ec='#DC2626', zorder=4)
    ax.add_patch(end_f)
    ax.add_patch(end_f_in)
    ax.text(8.2, 1.2, "Thất bại / Hủy", ha='center', fontsize=8.5, fontweight='bold', color='#DC2626')

    plt.tight_layout()
    out = "docs/images/diag_activity_booking.png"
    plt.savefig(out, dpi=300, bbox_inches='tight', facecolor='#F8FAFC')
    plt.close()
    print("Created:", out)

# ==============================================================================
# DIAGRAM 3: HOẠT ĐỘNG (ACTIVITY DIAGRAM) - CHẤM CÔNG QR & AUDIT LOG
# ==============================================================================
def create_activity_attendance():
    fig, ax = plt.subplots(figsize=(10, 8), dpi=300)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 9.5)
    ax.axis('off')

    ax.text(5, 9.1, "QUY TRÌNH HOẠT ĐỘNG: CHẤM CÔNG VÀO/RA & AUDIT LOG KIỂM TOÁN",
            ha='center', va='center', fontsize=11.5, fontweight='bold', color='#1E3A8A')

    # Start
    start = patches.Circle((5, 8.4), 0.18, fc='#0F172A', ec='#0F172A', zorder=4)
    ax.add_patch(start)

    # Choice Fork
    draw_arrow(ax, 5, 8.22, 5, 7.8)
    def decision_diamond(x, y, text, color='#D97706', fc='#FEF3C7', w=3.2, h=0.7):
        pts = [(x, y + h/2), (x + w/2, y), (x, y - h/2), (x - w/2, y)]
        diamond = patches.Polygon(pts, closed=True, fc=fc, ec=color, lw=1.5, zorder=3)
        ax.add_patch(diamond)
        ax.text(x, y, text, ha='center', va='center', fontsize=8, fontweight='bold', color='#78350F', zorder=4)

    def act_box(x, y, text, color='#2563EB', fc='#EFF6FF', w=3.4, h=0.65):
        rect = patches.FancyBboxPatch((x - w/2, y - h/2), w, h, boxstyle='round,pad=0.15',
                                     fc=fc, ec=color, lw=1.5, zorder=3)
        ax.add_patch(rect)
        ax.text(x, y, text, ha='center', va='center', fontsize=8.2, fontweight='bold', color='#0F172A', zorder=4)

    decision_diamond(5, 7.4, "Hành động chấm công?")

    # Left: Check-in
    ax.text(3.0, 7.55, "[Check-in Vào ca]", fontsize=8.5, color='#2563EB', fontweight='bold')
    draw_arrow(ax, 3.4, 7.4, 2.5, 6.7)
    act_box(2.5, 6.4, "1. Lấy ca trực trong ngày & Quét mã QR")
    draw_arrow(ax, 2.5, 6.05, 2.5, 5.5)
    decision_diamond(2.5, 5.15, "Giờ vào <= startTime\n+ gracePeriod?", w=3.0, h=0.7)

    ax.text(1.2, 4.6, "[Đúng giờ]", fontsize=8, color='#059669', fontweight='bold')
    draw_arrow(ax, 1.8, 4.8, 1.4, 4.1)
    act_box(1.4, 3.75, "status = 'present'", color='#059669', fc='#ECFDF5', w=2.0, h=0.55)

    ax.text(3.1, 4.6, "[Đi muộn]", fontsize=8, color='#D97706', fontweight='bold')
    draw_arrow(ax, 3.2, 4.8, 3.6, 4.1)
    act_box(3.6, 3.75, "status = 'late'", color='#D97706', fc='#FEF3C7', w=2.0, h=0.55)

    draw_arrow(ax, 1.4, 3.45, 2.5, 2.9)
    draw_arrow(ax, 3.6, 3.45, 2.5, 2.9)
    act_box(2.5, 2.6, "Lưu Attendance: checkIn=now()\nGhi Audit Log action='check_in'", color='#2563EB', fc='#EFF6FF')

    # Right: Check-out
    ax.text(6.8, 7.55, "[Check-out Tan ca]", fontsize=8.5, color='#7C3AED', fontweight='bold')
    draw_arrow(ax, 6.6, 7.4, 7.5, 6.7)
    act_box(7.5, 6.4, "1. Tìm bản ghi Attendance hôm nay")
    draw_arrow(ax, 7.5, 6.05, 7.5, 5.5)
    decision_diamond(7.5, 5.15, "Đã có checkIn & chưa checkOut?", w=3.2, h=0.7)

    ax.text(8.7, 4.6, "[Hợp lệ]", fontsize=8, color='#059669', fontweight='bold')
    draw_arrow(ax, 7.5, 4.8, 7.5, 4.1)
    act_box(7.5, 3.75, "2. Tính diffMinutes = (out - in)\nTrừ thời gian nghỉ giữa ca (break)", w=3.4, h=0.65)
    draw_arrow(ax, 7.5, 3.4, 7.5, 2.9)
    act_box(7.5, 2.6, "3. Lưu checkOut=now(), workHours\nGhi Audit Log action='check_out'", color='#7C3AED', fc='#F5F3FF')

    # Bottom Admin Override Box
    draw_arrow(ax, 2.5, 2.25, 5, 1.5)
    draw_arrow(ax, 7.5, 2.25, 5, 1.5)
    act_box(5, 1.2, "Admin / Manager hiệu chỉnh chấm công:\nBắt buộc nhập Lý do -> Ghi vết vào attendance_logs (Không thể xóa)",
            color='#DC2626', fc='#FFF1F2', w=6.5, h=0.7)

    plt.tight_layout()
    out = "docs/images/diag_activity_attendance.png"
    plt.savefig(out, dpi=300, bbox_inches='tight', facecolor='#F8FAFC')
    plt.close()
    print("Created:", out)

# ==============================================================================
# DIAGRAM 4: TUẦN TỰ (SEQUENCE DIAGRAM) - ĐẶT SÂN VÀ CHỐNG TRÙNG LỊCH
# ==============================================================================
def create_sequence_booking():
    fig, ax = plt.subplots(figsize=(11, 7.5), dpi=300)
    ax.set_xlim(0, 11)
    ax.set_ylim(0, 8.5)
    ax.axis('off')

    ax.text(5.5, 8.1, "BIỂU ĐỒ TUẦN TỰ: ĐẶT SÂN & KIỂM TRA CHỐNG TRÙNG LỊCH (ANTI-COLLISION)",
            ha='center', va='center', fontsize=11, fontweight='bold', color='#1E3A8A')

    # Lifeline Participants
    lifelines = [
        (1.2, "Khách hàng\n(User)"),
        (3.3, "Giao diện React\n(Client UI)"),
        (5.5, "BookingController\n(API Router)"),
        (7.7, "BookingService\n(Nghiệp vụ)"),
        (9.8, "MongoDB\n(Database)")
    ]

    for x, label in lifelines:
        box = patches.FancyBboxPatch((x - 0.9, 7.1), 1.8, 0.6, boxstyle='round,pad=0.1',
                                     fc='#1E3A8A', ec='#1E3A8A', lw=1.5)
        ax.add_patch(box)
        ax.text(x, 7.4, label, ha='center', va='center', fontsize=8, fontweight='bold', color='#FFFFFF')
        ax.plot([x, x], [7.1, 0.5], color='#94A3B8', lw=1.2, ls='--')

    # Step arrows & labels
    steps = [
        (1.2, 3.3, 6.6, "1. Chọn ngày, slot giờ, bấm 'Xác nhận đặt sân'", False),
        (3.3, 5.5, 6.1, "2. POST /api/bookings (kèm Bearer JWT)", False),
        (5.5, 7.7, 5.6, "3. createBooking(userId, bookingData)", False),
        (7.7, 9.8, 5.1, "4. find({ court, date, status: { $ne: 'cancelled' } })", False),
        (9.8, 7.7, 4.6, "5. Trả về danh sách existingBookings[]", True),
        (7.7, 7.7, 4.1, "6. Thuật toán: max(start) < min(end) => Trống!", False),
        (7.7, 9.8, 3.5, "7. create({ bookingCode, totalPrice, status: 'confirmed' })", False),
        (9.8, 7.7, 3.0, "8. Lưu thành công document Booking", True),
        (7.7, 5.5, 2.4, "9. Trả về newBooking populated", True),
        (5.5, 3.3, 1.8, "10. HTTP 201 Created { success: true, data }", True),
        (3.3, 1.2, 1.2, "11. Toast thành công & hiển thị Vé điện tử QR", True)
    ]

    for x1, x2, y, msg, is_return in steps:
        if x1 == x2: # self call
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
    out = "docs/images/diag_sequence_booking.png"
    plt.savefig(out, dpi=300, bbox_inches='tight', facecolor='#F8FAFC')
    plt.close()
    print("Created:", out)

# ==============================================================================
# DIAGRAM 5: BIỂU ĐỒ LỚP / THỰC THỂ DỮ LIỆU (CLASS DIAGRAM / ERD)
# ==============================================================================
def create_class_erd():
    fig, ax = plt.subplots(figsize=(11, 8.5), dpi=300)
    ax.set_xlim(0, 11)
    ax.set_ylim(0, 8.5)
    ax.axis('off')

    ax.text(5.5, 8.2, "MÔ HÌNH DỮ LIỆU & BIỂU ĐỒ LỚP THỰC THỂ (UML CLASS DIAGRAM / ERD)",
            ha='center', va='center', fontsize=11, fontweight='bold', color='#1E3A8A')

    def draw_uml_class(x, y, w, h, name, attrs, methods):
        # Header
        hdr = patches.Rectangle((x, y - 0.45), w, 0.45, fc='#1E3A8A', ec='#1E3A8A', lw=1.2)
        ax.add_patch(hdr)
        ax.text(x + w/2, y - 0.22, name, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#FFFFFF')

        # Body (Attrs & Methods)
        body = patches.Rectangle((x, y - h), w, h - 0.45, fc='#F8FAFC', ec='#1E3A8A', lw=1.2)
        ax.add_patch(body)

        curr_y = y - 0.65
        for attr in attrs:
            ax.text(x + 0.1, curr_y, attr, fontsize=7.2, color='#1E293B')
            curr_y -= 0.24

        # Divider line
        ax.plot([x, x + w], [curr_y, curr_y], color='#CBD5E1', lw=1)
        curr_y -= 0.22

        for m in methods:
            ax.text(x + 0.1, curr_y, m, fontsize=7.2, color='#0284C7', fontstyle='italic')
            curr_y -= 0.24

    # Classes layout
    # Court
    draw_uml_class(0.4, 7.8, 2.8, 2.7, "Court (Sân thể thao)",
                   ["- _id: ObjectId", "- name: String", "- type: CourtType",
                    "- pricePerHour: Number", "- status: CourtStatus", "- openingTime: String"],
                   ["+ getOccupiedSlots()", "+ updateStatus()"])

    # Booking
    draw_uml_class(3.8, 7.8, 3.2, 3.2, "Booking (Đơn đặt sân)",
                   ["- _id: ObjectId", "- bookingCode: String", "- court: ObjectId (Ref)",
                    "- user: ObjectId (Ref)", "- date: String", "- startTime: String",
                    "- endTime: String", "- totalPrice: Number", "- status: BookingStatus"],
                   ["+ checkConflict()", "+ calculatePrice()", "+ cancelBooking()"])

    # User
    draw_uml_class(7.6, 7.8, 3.0, 2.8, "User (Người dùng)",
                   ["- _id: ObjectId", "- fullName: String", "- email: String",
                    "- password: String (hash)", "- role: UserRole (4 roles)", "- isActive: Boolean"],
                   ["+ comparePassword()", "+ generateJWT()"])

    # Review
    draw_uml_class(0.4, 4.5, 2.8, 2.2, "Review (Đánh giá sân)",
                   ["- _id: ObjectId", "- court: ObjectId (Ref)", "- user: ObjectId (Ref)",
                    "- booking: ObjectId (Ref)", "- rating: Number (1-5)", "- comment: String"],
                   ["+ createReview()"])

    # Shift & Attendance
    draw_uml_class(3.8, 4.0, 3.2, 3.2, "Attendance (Chấm công)",
                   ["- _id: ObjectId", "- employee: ObjectId (Ref)", "- workSchedule: ObjectId",
                    "- date: String", "- checkIn: Date", "- checkOut: Date",
                    "- workHours: Number", "- status: AttStatus", "- qrVerified: Boolean"],
                   ["+ checkIn()", "+ checkOut()", "+ adminOverride()"])

    # AttendanceLog
    draw_uml_class(7.6, 4.4, 3.0, 2.4, "AttendanceLog (Audit Log)",
                   ["- _id: ObjectId", "- attendance: ObjectId (Ref)", "- action: AuditAction",
                    "- oldValue: Object", "- newValue: Object", "- reason: String (Req)",
                    "- performedBy: ObjectId"],
                   ["+ logAction()"])

    # LeaveRequest
    draw_uml_class(0.4, 1.8, 2.8, 1.6, "LeaveRequest (Nghỉ phép)",
                   ["- employee: ObjectId", "- startDate: String", "- endDate: String", "- status: LeaveStatus"],
                   ["+ approve()", "+ reject()"])

    # Payroll
    draw_uml_class(7.6, 1.6, 3.0, 1.5, "Payroll (Bảng lương)",
                   ["- employee: ObjectId", "- totalWorkDays: Number", "- totalSalary: Number", "- status: String"],
                   ["+ calculatePayroll()"])

    # Connecting relationship arrows
    # Court to Booking (1 - N)
    ax.annotate('', xy=(3.8, 6.8), xytext=(3.2, 6.8),
                arrowprops=dict(arrowstyle='<->', color='#2563EB', lw=1.5))
    ax.text(3.3, 7.0, "1", fontsize=9, fontweight='bold', color='#2563EB')
    ax.text(3.6, 7.0, "*", fontsize=9, fontweight='bold', color='#2563EB')

    # Booking to User (N - 1)
    ax.annotate('', xy=(7.0, 6.8), xytext=(7.6, 6.8),
                arrowprops=dict(arrowstyle='<->', color='#2563EB', lw=1.5))
    ax.text(7.1, 7.0, "*", fontsize=9, fontweight='bold', color='#2563EB')
    ax.text(7.4, 7.0, "1", fontsize=9, fontweight='bold', color='#2563EB')

    # Booking to Review (1 - 0..1)
    ax.annotate('', xy=(2.0, 4.5), xytext=(4.2, 5.0),
                arrowprops=dict(arrowstyle='->', color='#059669', lw=1.3, ls='--'))
    ax.text(2.3, 4.8, "đánh giá", fontsize=7.5, color='#059669')

    # Attendance to AttendanceLog (1 - N)
    ax.annotate('', xy=(7.6, 3.3), xytext=(7.0, 3.3),
                arrowprops=dict(arrowstyle='->', color='#DC2626', lw=1.5))
    ax.text(7.1, 3.5, "lưu vết", fontsize=7.5, fontweight='bold', color='#DC2626')

    plt.tight_layout()
    out = "docs/images/diag_class_erd.png"
    plt.savefig(out, dpi=300, bbox_inches='tight', facecolor='#F8FAFC')
    plt.close()
    print("Created:", out)

if __name__ == "__main__":
    create_usecase_general()
    create_activity_booking()
    create_activity_attendance()
    create_sequence_booking()
    create_class_erd()
    print("All diagram images generated successfully!")
