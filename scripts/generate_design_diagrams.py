# -*- coding: utf-8 -*-
import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches

os.makedirs("docs/images", exist_ok=True)
plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['axes.edgecolor'] = '#94A3B8'

# ==============================================================================
# 1. KIẾN TRÚC PHÂN TẦNG TỔNG THỂ HỆ THỐNG (SYSTEM ARCHITECTURE)
# ==============================================================================
def create_sys_architecture():
    fig, ax = plt.subplots(figsize=(11, 8.5), dpi=300)
    ax.set_xlim(0, 11)
    ax.set_ylim(0, 9.0)
    ax.axis('off')

    ax.text(5.5, 8.6, "SƠ ĐỒ KIẾN TRÚC PHÂN TẦNG HỆ THỐNG SPORTBOOKING (LAYERED ARCHITECTURE)",
            ha='center', va='center', fontsize=11, fontweight='bold', color='#1E3A8A')

    def draw_layer_box(y, h, title, subtitle, color, bg_color):
        box = patches.FancyBboxPatch((0.5, y), 10, h, boxstyle='round,pad=0.15',
                                     fc=bg_color, ec=color, lw=2)
        ax.add_patch(box)
        ax.text(0.8, y + h - 0.25, title, fontsize=9.5, fontweight='bold', color=color, va='center')
        ax.text(0.8, y + h - 0.5, subtitle, fontsize=8, color='#64748B', va='center')

    # Layer 1: Client Presentation Layer
    draw_layer_box(6.8, 1.5, "1. PRESENTATION LAYER (TẦNG GIAO DIỆN NGƯỜI DÙNG - SPA)",
                   "React 18 + TypeScript + Vite 6 + Tailwind CSS 3", '#0284C7', '#F0F9FF')
    # Components inside
    components = [
        (1.2, 7.0, "Customer Portal\n(Tìm sân, Slot, QR)"),
        (3.6, 7.0, "Staff Portal\n(Ca trực, Chấm công)"),
        (6.0, 7.0, "Manager Portal\n(Phân ca, Duyệt phép)"),
        (8.4, 7.0, "Admin Dashboard\n(Lương, Recharts KPI)")
    ]
    for x, y, name in components:
        cbox = patches.FancyBboxPatch((x, y), 1.9, 0.65, boxstyle='round,pad=0.1',
                                      fc='#FFFFFF', ec='#0284C7', lw=1.2)
        ax.add_patch(cbox)
        ax.text(x + 0.95, y + 0.32, name, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#1E293B')

    # Connection Arrow
    ax.annotate('', xy=(5.5, 6.2), xytext=(5.5, 6.75),
                arrowprops=dict(arrowstyle='<->', color='#2563EB', lw=1.8))
    ax.text(5.5, 6.5, "HTTPS / RESTful API (JSON Body, Bearer JWT Header)",
            ha='center', va='center', fontsize=8, fontweight='bold', color='#2563EB',
            bbox=dict(boxstyle='round,pad=0.2', fc='#FFFFFF', ec='#CBD5E1', lw=1))

    # Layer 2: API Gateway & Security Middleware Layer
    draw_layer_box(4.8, 1.35, "2. API GATEWAY & SECURITY MIDDLEWARE LAYER",
                   "Express.js Routing, Token Authentication, RBAC, Validation & Defense", '#7C3AED', '#F5F3FF')
    mws = [
        (1.0, 4.95, "Helmet & CORS\n(Bảo mật Headers)"),
        (3.4, 4.95, "Rate Limiter\n(Chống DoS/Brute)"),
        (5.8, 4.95, "JWT & RBAC\n(Xác thực 4 Roles)"),
        (8.2, 4.95, "Zod Validation\n(Kiểm tra dữ liệu)")
    ]
    for x, y, name in mws:
        cbox = patches.FancyBboxPatch((x, y), 2.0, 0.65, boxstyle='round,pad=0.1',
                                      fc='#FFFFFF', ec='#7C3AED', lw=1.2)
        ax.add_patch(cbox)
        ax.text(x + 1.0, y + 0.32, name, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#1E293B')

    # Connection Arrow
    ax.annotate('', xy=(5.5, 4.3), xytext=(5.5, 4.75),
                arrowprops=dict(arrowstyle='->', color='#7C3AED', lw=1.8))

    # Layer 3: Controllers & Core Business Service Layer
    draw_layer_box(2.4, 1.85, "3. BUSINESS LOGIC & SERVICE LAYER (NGHIỆP VỤ CỐT LÕI)",
                   "Controllers tiếp nhận request, Services xử lý thuật toán & logic hệ thống", '#1E3A8A', '#EFF6FF')
    services = [
        (0.8, 2.6, "AuthService\n(bcrypt, JWT, Profile)"),
        (2.7, 2.6, "BookingService\n(Anti-Collision Engine)"),
        (4.7, 2.6, "AttendanceService\n(QR Code, Audit Log)"),
        (6.7, 2.6, "PayrollService\n(Tính lương 26 công)"),
        (8.7, 2.6, "ReportService\n(Recharts Analytics)")
    ]
    for x, y, name in services:
        cbox = patches.FancyBboxPatch((x, y), 1.8, 0.75, boxstyle='round,pad=0.1',
                                      fc='#FFFFFF', ec='#1E3A8A', lw=1.2)
        ax.add_patch(cbox)
        ax.text(x + 0.9, y + 0.37, name, ha='center', va='center', fontsize=7.2, fontweight='bold', color='#1E3A8A')

    # Connection Arrow
    ax.annotate('', xy=(5.5, 1.8), xytext=(5.5, 2.35),
                arrowprops=dict(arrowstyle='<->', color='#1E3A8A', lw=1.8))
    ax.text(5.5, 2.05, "Mongoose ODM (Schema, Hooks, Compound Indexes)",
            ha='center', va='center', fontsize=8, color='#1E3A8A',
            bbox=dict(boxstyle='round,pad=0.2', fc='#FFFFFF', ec='#CBD5E1', lw=1))

    # Layer 4: Database Layer
    draw_layer_box(0.3, 1.45, "4. PERSISTENCE DATA LAYER (CƠ SỞ DỮ LIỆU)",
                   "MongoDB Database Engine - 12 Collections", '#059669', '#ECFDF5')
    dbs = [
        (1.0, 0.5, "users, courts, reviews\n(Quản trị danh mục)"),
        (4.0, 0.5, "bookings, qr_tokens\n(Compound Index Booking)"),
        (7.0, 0.5, "attendances, logs, payrolls\n(Chấm công, Audit Log, Lương)")
    ]
    for x, y, name in dbs:
        cbox = patches.FancyBboxPatch((x, y), 2.8, 0.65, boxstyle='round,pad=0.1',
                                      fc='#FFFFFF', ec='#059669', lw=1.2)
        ax.add_patch(cbox)
        ax.text(x + 1.4, y + 0.32, name, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#065F46')

    plt.tight_layout()
    out = "docs/images/diag_sys_architecture.png"
    plt.savefig(out, dpi=300, bbox_inches='tight', facecolor='#F8FAFC')
    plt.close()
    print("Created:", out)

# ==============================================================================
# 2. SƠ ĐỒ THỰC THỂ CƠ SỞ DỮ LIỆU (DATABASE ERD & INDEXES)
# ==============================================================================
def create_database_erd():
    fig, ax = plt.subplots(figsize=(11, 8.5), dpi=300)
    ax.set_xlim(0, 11)
    ax.set_ylim(0, 9.0)
    ax.axis('off')

    ax.text(5.5, 8.6, "SƠ ĐỒ CƠ SỞ DỮ LIỆU & CHIẾN LƯỢC ĐÁNH CHỈ MỤC (DATABASE ERD & INDEXES)",
            ha='center', va='center', fontsize=11, fontweight='bold', color='#1E3A8A')

    def draw_entity(x, y, w, h, name, fields, index_str=None):
        hdr = patches.Rectangle((x, y - 0.4), w, 0.4, fc='#1E3A8A', ec='#1E3A8A', lw=1.2)
        ax.add_patch(hdr)
        ax.text(x + w/2, y - 0.2, name, ha='center', va='center', fontsize=8, fontweight='bold', color='#FFFFFF')

        body = patches.Rectangle((x, y - h), w, h - 0.4, fc='#FFFFFF', ec='#1E3A8A', lw=1.2)
        ax.add_patch(body)

        cy = y - 0.6
        for f in fields:
            ax.text(x + 0.1, cy, f, fontsize=7, color='#1E293B')
            cy -= 0.21

        if index_str:
            ax.text(x + 0.1, y - h + 0.15, index_str, fontsize=6.5, color='#D97706', fontstyle='italic')

    # Collections
    draw_entity(0.4, 8.1, 2.9, 2.5, "User (Tài khoản)", [
        "PK: _id: ObjectId", "email: String (Unique)", "password: String (Hash)",
        "fullName: String", "phone: String", "role: enum (4 roles)", "isActive: Boolean"
    ], "Index: { email: 1 }")

    draw_entity(4.0, 8.1, 3.2, 2.7, "Court (Sân thể thao)", [
        "PK: _id: ObjectId", "name: String", "type: enum (6 môn)",
        "pricePerHour: Number", "openingTime: String", "closingTime: String",
        "status: enum (active/maintenance)"
    ], "Index: { type: 1, status: 1 }")

    draw_entity(7.8, 8.1, 2.8, 2.5, "Review (Đánh giá)", [
        "PK: _id: ObjectId", "FK: court -> Court", "FK: user -> User",
        "FK: booking -> Booking", "rating: Number (1-5)", "comment: String"
    ], "Index: { court: 1 }")

    draw_entity(4.0, 5.0, 3.2, 3.0, "Booking (Đơn đặt sân)", [
        "PK: _id: ObjectId", "bookingCode: String (Unique)", "FK: user -> User",
        "FK: court -> Court", "date: String (YYYY-MM-DD)", "startTime: String (HH:mm)",
        "endTime: String (HH:mm)", "totalPrice: Number", "status: enum"
    ], "★ Index: { court: 1, date: 1, status: 1 }")

    draw_entity(0.4, 5.0, 2.9, 2.5, "Employee (Hồ sơ nhân sự)", [
        "PK: _id: ObjectId", "employeeCode: String (Unique)", "FK: user -> User",
        "department: String", "position: String", "baseSalary: Number", "status: String"
    ], "Index: { employeeCode: 1 }")

    draw_entity(7.8, 5.0, 2.8, 2.5, "WorkSchedule (Phân ca)", [
        "PK: _id: ObjectId", "FK: employee -> Employee", "FK: shift -> Shift",
        "FK: court -> Court", "date: String", "status: String"
    ], "Index: { employee: 1, date: 1 }")

    draw_entity(0.4, 2.0, 2.9, 1.8, "Shift (Ca làm việc)", [
        "PK: _id: ObjectId", "name: String", "startTime, endTime: String",
        "breakStart, breakEnd: String", "gracePeriod: Number (phút)"
    ])

    draw_entity(4.0, 1.7, 3.2, 2.5, "Attendance (Chấm công)", [
        "PK: _id: ObjectId", "FK: employee -> Employee", "FK: workSchedule -> WorkSchedule",
        "date: String", "checkIn, checkOut: Date", "workHours: Number",
        "status: enum (present/late)", "qrVerified: Boolean"
    ], "Index: { employee: 1, date: 1 }")

    draw_entity(7.8, 1.7, 2.8, 2.3, "AttendanceLog (Audit Log)", [
        "PK: _id: ObjectId", "FK: attendance -> Attendance", "action: enum (check_in/out/override)",
        "oldValue, newValue: Object", "reason: String (Bắt buộc)", "performedBy: ObjectId"
    ], "Lưu vết bất biến")

    # Connecting lines with cardinalities
    # Court to Booking (1 - N)
    ax.plot([5.6, 5.6], [5.4, 5.0], color='#2563EB', lw=1.5)
    ax.text(5.7, 5.25, "1 : N", fontsize=7.5, fontweight='bold', color='#2563EB')

    # User to Booking (1 - N)
    ax.plot([3.3, 4.0], [6.8, 4.5], color='#2563EB', lw=1.5)
    ax.text(3.5, 5.5, "1 : N", fontsize=7.5, fontweight='bold', color='#2563EB')

    # Attendance to AttendanceLog (1 - N)
    ax.plot([7.2, 7.8], [0.8, 0.8], color='#DC2626', lw=1.5)
    ax.text(7.35, 0.95, "1 : N", fontsize=7.5, fontweight='bold', color='#DC2626')

    plt.tight_layout()
    out = "docs/images/diag_database_erd.png"
    plt.savefig(out, dpi=300, bbox_inches='tight', facecolor='#F8FAFC')
    plt.close()
    print("Created:", out)

# ==============================================================================
# 3. SƠ ĐỒ LUỒNG XỬ LÝ API PIPELINE & RESPONSE FORMAT
# ==============================================================================
def create_api_flow():
    fig, ax = plt.subplots(figsize=(11, 7.5), dpi=300)
    ax.set_xlim(0, 11)
    ax.set_ylim(0, 8.5)
    ax.axis('off')

    ax.text(5.5, 8.1, "THIẾT KẾ ĐẶC TẢ API & LUỒNG XỬ LÝ REQUEST / RESPONSE PIPELINE",
            ha='center', va='center', fontsize=11, fontweight='bold', color='#1E3A8A')

    # Pipeline nodes horizontally
    stages = [
        (1.0, 6.2, "1. Client Request", "HTTP POST /api/bookings\nkèm JWT Bearer Token\nvà JSON Payload", '#0284C7', '#F0F9FF'),
        (3.3, 6.2, "2. Security & Auth", "• Helmet & CORS check\n• verifyToken(JWT)\n• RBAC authorizeRole", '#7C3AED', '#F5F3FF'),
        (5.6, 6.2, "3. Zod Validator", "Kiểm tra schema DTO:\n• courtId hợp lệ ObjectId\n• startTime < endTime\n• date >= today", '#D97706', '#FEF3C7'),
        (7.9, 6.2, "4. Service Engine", "• checkConflict (Anti-overlap)\n• calcPrice = hours * price\n• generateBookingCode\n• create Transaction", '#1E3A8A', '#EFF6FF'),
        (10.1, 6.2, "5. Persistence", "Ghi vào MongoDB:\n• Document Booking\n• Update Court slot\n• Index update", '#059669', '#ECFDF5')
    ]

    for x, y, title, desc, color, bg in stages:
        box = patches.FancyBboxPatch((x - 0.95, y - 0.9), 1.9, 1.8, boxstyle='round,pad=0.1',
                                     fc=bg, ec=color, lw=1.5)
        ax.add_patch(box)
        ax.text(x, y + 0.65, title, ha='center', va='center', fontsize=8, fontweight='bold', color=color)
        ax.text(x, y - 0.1, desc, ha='center', va='center', fontsize=7.2, color='#1E293B')

        if x < 9.5:
            ax.annotate('', xy=(x + 1.25, y), xytext=(x + 0.95, y),
                        arrowprops=dict(arrowstyle='->', color='#64748B', lw=1.8))

    # Response Standard Box
    res_box = patches.FancyBboxPatch((1.0, 1.2), 9.0, 3.4, boxstyle='round,pad=0.15',
                                     fc='#FFFFFF', ec='#1E3A8A', lw=2)
    ax.add_patch(res_box)
    ax.text(1.3, 4.2, "CHUẨN HÓA CẤU TRÚC PHẢN HỒI API (STANDARDIZED RESTful JSON RESPONSE)",
            fontsize=9.5, fontweight='bold', color='#1E3A8A')

    # Success Response Sample
    ax.text(1.4, 3.8, "● Thành công (HTTP 200 OK / 201 Created):", fontsize=8, fontweight='bold', color='#059669')
    success_json = (
        '{\n'
        '  "success": true,\n'
        '  "message": "Đặt sân thành công!",\n'
        '  "data": {\n'
        '    "bookingCode": "BK-20261015-8492",\n'
        '    "court": { "_id": "65f...", "name": "Sân Bóng Đá Số 1" },\n'
        '    "date": "2026-10-15", "startTime": "18:00", "endTime": "20:00",\n'
        '    "totalPrice": 400000, "status": "confirmed", "paymentStatus": "paid"\n'
        '  }\n'
        '}'
    )
    ax.text(1.4, 2.5, success_json, fontsize=7.2, color='#0F172A',
            bbox=dict(boxstyle='round,pad=0.2', fc='#F8FAFC', ec='#CBD5E1', lw=1))

    # Error Response Sample
    ax.text(5.8, 3.8, "- That bai / Xung dot (HTTP 400 / 401 / 409 Conflict):", fontsize=8, fontweight='bold', color='#DC2626')
    error_json = (
        '{\n'
        '  "success": false,\n'
        '  "message": "Khung gio tu 18:00 den 20:00 da co nguoi dat truoc!",\n'
        '  "errorCode": "BOOKING_CONFLICT",\n'
        '  "statusCode": 409\n'
        '}'
    )
    ax.text(5.8, 2.8, error_json, fontsize=7.2, color='#0F172A',
            bbox=dict(boxstyle='round,pad=0.2', fc='#F8FAFC', ec='#CBD5E1', lw=1))

    plt.tight_layout()
    out = "docs/images/diag_api_flow.png"
    plt.savefig(out, dpi=300, bbox_inches='tight', facecolor='#F8FAFC')
    plt.close()
    print("Created:", out)

# ==============================================================================
# 4. SƠ ĐỒ ĐIỀU HƯỚNG GIAO DIỆN & SITEMAP (UI/UX SITEMAP)
# ==============================================================================
def create_uiux_sitemap():
    fig, ax = plt.subplots(figsize=(11, 8.0), dpi=300)
    ax.set_xlim(0, 11)
    ax.set_ylim(0, 8.5)
    ax.axis('off')

    ax.text(5.5, 8.1, "THIẾT KẾ CẤU TRÚC GIAO DIỆN & SƠ ĐỒ ĐIỀU HƯỚNG (UI/UX SITEMAP)",
            ha='center', va='center', fontsize=11, fontweight='bold', color='#1E3A8A')

    # Root: SportBooking Portal
    root = patches.FancyBboxPatch((4.2, 7.0), 2.6, 0.65, boxstyle='round,pad=0.1',
                                  fc='#1E3A8A', ec='#1E3A8A', lw=1.5)
    ax.add_patch(root)
    ax.text(5.5, 7.32, "SportBooking Web Portal\n(Public Entry & Auth)", ha='center', va='center',
            fontsize=8.5, fontweight='bold', color='#FFFFFF')

    # 4 Role Branches
    roles = [
        (1.4, 5.8, "Khách hàng (Customer)", "/ (Trang chủ & Đặt sân)", '#0284C7', '#EFF6FF'),
        (4.1, 5.8, "Nhân viên (Staff)", "/staff (Ca trực & Chấm công)", '#059669', '#ECFDF5'),
        (6.8, 5.8, "Quản lý (Manager)", "/manager (Vận hành sân)", '#D97706', '#FEF3C7'),
        (9.5, 5.8, "Quản trị viên (Admin)", "/admin (Toàn quyền quản trị)", '#DC2626', '#FFF1F2')
    ]

    for x, y, rname, rpath, color, bg in roles:
        rbox = patches.FancyBboxPatch((x - 1.2, y - 0.4), 2.4, 0.7, boxstyle='round,pad=0.1',
                                      fc=bg, ec=color, lw=1.5)
        ax.add_patch(rbox)
        ax.text(x, y, rname, ha='center', va='center', fontsize=8, fontweight='bold', color=color)
        ax.text(x, y - 0.22, rpath, ha='center', va='center', fontsize=6.8, color='#64748B')
        ax.plot([5.5, x], [7.0, y + 0.3], color='#94A3B8', lw=1.2)

    # Sub-pages per Role
    subpages = [
        # Customer
        [(1.4, 4.6, "1. Tìm & Lọc sân (/courts)"),
         (1.4, 3.8, "2. Chi tiết & Slot (/courts/:id)"),
         (1.4, 3.0, "3. Vé của tôi & QR (/my-bookings)"),
         (1.4, 2.2, "4. Đánh giá sân (/reviews)")],
        # Staff
        [(4.1, 4.6, "1. Lịch ca tuần (/staff/schedule)"),
         (4.1, 3.8, "2. Chấm công QR (/staff/attendance)"),
         (4.1, 3.0, "3. Đơn nghỉ phép (/staff/leaves)"),
         (4.1, 2.2, "4. Hồ sơ cá nhân (/profile)")],
        # Manager
        [(6.8, 4.6, "1. Phân ca trực (/manager/schedules)"),
         (6.8, 3.8, "2. Duyệt đơn nghỉ (/manager/leaves)"),
         (6.8, 3.0, "3. Giám sát sân (/manager/courts)"),
         (6.8, 2.2, "4. Sinh mã QR sân (/manager/qr)")],
        # Admin
        [(9.5, 4.6, "1. Dashboard Recharts (/admin)"),
         (9.5, 3.8, "2. Bảng lương 26 công (/admin/payrolls)"),
         (9.5, 3.0, "3. Audit Log chấm công (/admin/audit)"),
         (9.5, 2.2, "4. Quản lý nhân sự & User (/admin/users)")]
    ]

    for col in subpages:
        for x, y, name in col:
            sbox = patches.FancyBboxPatch((x - 1.15, y - 0.25), 2.3, 0.5, boxstyle='round,pad=0.08',
                                          fc='#FFFFFF', ec='#CBD5E1', lw=1)
            ax.add_patch(sbox)
            ax.text(x, y, name, ha='center', va='center', fontsize=7.2, color='#1E293B')

    plt.tight_layout()
    out = "docs/images/diag_uiux_sitemap.png"
    plt.savefig(out, dpi=300, bbox_inches='tight', facecolor='#F8FAFC')
    plt.close()
    print("Created:", out)

# ==============================================================================
# 5. BẢN VẼ BỐ CỤC GIAO DIỆN UI/UX (WIREFRAME LAYOUTS)
# ==============================================================================
def create_ui_wireframes():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 6.5), dpi=300)

    for ax in [ax1, ax2]:
        ax.set_xlim(0, 10)
        ax.set_ylim(0, 10)
        ax.axis('off')

    # Wireframe 1: Giao diện Đặt sân (Customer Slot Booking)
    ax1.set_title("Layout 1: Giao diện Chọn Slot & Đặt Sân (Khách hàng)", fontsize=9.5, fontweight='bold', color='#1E3A8A')
    frame1 = patches.FancyBboxPatch((0.2, 0.2), 9.6, 9.4, boxstyle='round,pad=0.1', fc='#FFFFFF', ec='#0284C7', lw=1.5)
    ax1.add_patch(frame1)

    # Navbar
    ax1.add_patch(patches.Rectangle((0.2, 8.8), 9.6, 0.8, fc='#1E3A8A'))
    ax1.text(0.5, 9.2, "[SportBooking Portal]", color='#FFFFFF', fontsize=9, fontweight='bold')
    ax1.text(8.3, 9.2, "User: Nguyen Van A", color='#E0F2FE', fontsize=7.5)

    # Court Info card
    ax1.add_patch(patches.Rectangle((0.6, 6.8), 8.8, 1.7, fc='#F8FAFC', ec='#CBD5E1', lw=1))
    ax1.text(0.9, 8.1, "SAN BONG DA MINI SO 1 - CHUAN FIFA (CO NHAN TAO)", fontsize=8.5, fontweight='bold', color='#1E3A8A')
    ax1.text(0.9, 7.6, "Dia diem: Quan 7, TP.HCM | Gio mo cua: 06:00 - 23:00 | Don gia: 200,000 d/gio", fontsize=7.5, color='#475569')
    ax1.text(0.9, 7.1, "Tien ich: [Wifi Mien Phi] [Den LED Chieu Sang] [Phong Tam Nong Lanh] [Cho De Xe]", fontsize=7.2, color='#0284C7')

    # Date Picker & Slot Grid
    ax1.text(0.6, 6.3, "Chon ngay: [ 2026-10-15 v ]       Chu thich: [ Trong (Xanh) ]  [ Da dat (Do) ]  [ Dang chon (Cam) ]", fontsize=7.2, fontweight='bold', color='#1E3A8A')

    # Slot Buttons Grid
    slots = [
        ("06:00-08:00", '#ECFDF5', '#059669', "Trong"),
        ("08:00-10:00", '#FEE2E2', '#DC2626', "Da dat"),
        ("10:00-12:00", '#ECFDF5', '#059669', "Trong"),
        ("14:00-16:00", '#ECFDF5', '#059669', "Trong"),
        ("16:00-18:00", '#FEF3C7', '#D97706', "Dang chon"),
        ("18:00-20:00", '#FEE2E2', '#DC2626', "Da dat"),
        ("20:00-22:00", '#ECFDF5', '#059669', "Trong"),
        ("22:00-23:00", '#ECFDF5', '#059669', "Trong")
    ]
    for idx, (time_s, bg, border, status) in enumerate(slots):
        x = 0.6 + (idx % 4) * 2.25
        y = 4.8 if idx < 4 else 3.6
        box = patches.FancyBboxPatch((x, y), 2.05, 0.9, boxstyle='round,pad=0.08', fc=bg, ec=border, lw=1.2)
        ax1.add_patch(box)
        ax1.text(x + 1.02, y + 0.55, time_s, ha='center', fontsize=7.5, fontweight='bold', color=border)
        ax1.text(x + 1.02, y + 0.25, status, ha='center', fontsize=6.8, color='#475569')

    # Booking Summary & CTA
    ax1.add_patch(patches.Rectangle((0.6, 0.6), 8.8, 2.5, fc='#EFF6FF', ec='#0284C7', lw=1.2))
    ax1.text(0.9, 2.6, "TONG KET DON DAT SAN:", fontsize=8.2, fontweight='bold', color='#1E3A8A')
    ax1.text(0.9, 2.1, "Khung gio: 16:00 - 18:00 (2 gio) | Tong tien thanh toan: 400,000 VND", fontsize=7.8, color='#0F172A')
    ax1.text(0.9, 1.6, "Hinh thuc: Thanh toan mo phong (Sandbox) | Nhan ve dien tu QR ngay lap tuc", fontsize=7.2, color='#64748B')

    cta = patches.FancyBboxPatch((5.8, 0.8), 3.2, 0.6, boxstyle='round,pad=0.1', fc='#059669', ec='#059669')
    ax1.add_patch(cta)
    ax1.text(7.4, 1.1, "XAC NHAN DAT SAN & XUAT VE QR", ha='center', va='center', fontsize=7.5, fontweight='bold', color='#FFFFFF')

    # Wireframe 2: Giao diện Chấm công & Audit Log (Staff & Manager)
    ax2.set_title("Layout 2: Bảng Điều Khiển Chấm Công & Audit Log (Nhân viên/Admin)", fontsize=9.5, fontweight='bold', color='#1E3A8A')
    frame2 = patches.FancyBboxPatch((0.2, 0.2), 9.6, 9.4, boxstyle='round,pad=0.1', fc='#FFFFFF', ec='#7C3AED', lw=1.5)
    ax2.add_patch(frame2)

    # Navbar
    ax2.add_patch(patches.Rectangle((0.2, 8.8), 9.6, 0.8, fc='#0F172A'))
    ax2.text(0.5, 9.2, "[SportBooking Staff Portal]", color='#FFFFFF', fontsize=9, fontweight='bold')
    ax2.text(7.8, 9.2, "Ca sang: 06:00 - 14:00", color='#A7F3D0', fontsize=7.5)

    # Realtime Clock & Status
    ax2.add_patch(patches.Rectangle((0.6, 6.6), 8.8, 1.9, fc='#F5F3FF', ec='#7C3AED', lw=1.2))
    ax2.text(5.0, 8.0, "DONG HO THOI GIAN THUC: 07:15:32 (Thu Nam, 24/09/2026)", ha='center', fontsize=8.5, fontweight='bold', color='#4C1D95')
    ax2.text(5.0, 7.4, "Ca truc phan cong: San bong da so 1 | An han tre: 15 phut (Dung gio)", ha='center', fontsize=7.5, color='#059669')

    # Check In / Check Out Buttons
    btn_in = patches.FancyBboxPatch((1.2, 6.8), 3.2, 0.7, boxstyle='round,pad=0.1', fc='#059669', ec='#059669')
    ax2.add_patch(btn_in)
    ax2.text(2.8, 7.15, "CHECK-IN (DA VAO: 07:05)", ha='center', va='center', fontsize=7.8, fontweight='bold', color='#FFFFFF')

    btn_out = patches.FancyBboxPatch((5.6, 6.8), 3.2, 0.7, boxstyle='round,pad=0.1', fc='#7C3AED', ec='#7C3AED')
    ax2.add_patch(btn_out)
    ax2.text(7.2, 7.15, "CHECK-OUT (BAM TAN CA)", ha='center', va='center', fontsize=7.8, fontweight='bold', color='#FFFFFF')

    # QR Code Token Section
    ax2.add_patch(patches.Rectangle((0.6, 4.6), 8.8, 1.7, fc='#F8FAFC', ec='#CBD5E1', lw=1))
    ax2.text(0.9, 5.9, "XAC MINH CO MAT TAI SAN BANG MA QR DONG:", fontsize=8, fontweight='bold', color='#1E3A8A')
    ax2.text(0.9, 5.4, "Quet ma QR tai ban dieu phoi hoac nhap token san: [ QR-SBD-849201 ]", fontsize=7.2, color='#475569')
    ax2.text(0.9, 4.9, "Trang thai xac thuc: [V DA XAC MINH VI TRI TAI SAN THANH CONG]", fontsize=7.5, fontweight='bold', color='#059669')

    # Audit Log Table (Admin View)
    ax2.add_patch(patches.Rectangle((0.6, 0.6), 8.8, 3.7, fc='#FFF1F2', ec='#DC2626', lw=1.2))
    ax2.text(0.9, 3.9, "AUDIT LOG: LICH SU KIEM TOAN HIEU CHINH CHAM CONG (BAT BUOC LY DO)", fontsize=8, fontweight='bold', color='#991B1B')

    logs_text = (
        "Thoi gian         Thao tac        Nguoi sua      Ly do bat buoc           Trang thai\n"
        "------------------------------------------------------------------------------------\n"
        "07:05:12          check_in        Nhan vien      Quet ma QR tai san       qrVerified: true\n"
        "14:10:45          check_out       Nhan vien      Bam ket thuc ca lam      workHours: 7.5h\n"
        "15:30:00          admin_override  Admin          Quen bam tan ca luc 14h  Da duyet cong\n"
        "* Du lieu Audit Log duoc bao toan toan ven va bat bien, khong the sua xoa khoi he thong."
    )
    ax2.text(0.8, 1.8, logs_text, fontsize=6.8, fontfamily='monospace', color='#1E293B',
            bbox=dict(boxstyle='round,pad=0.2', fc='#FFFFFF', ec='#CBD5E1', lw=1))

    plt.tight_layout()
    out = "docs/images/diag_ui_wireframes.png"
    plt.savefig(out, dpi=300, bbox_inches='tight', facecolor='#F8FAFC')
    plt.close()
    print("Created:", out)

if __name__ == "__main__":
    create_sys_architecture()
    create_database_erd()
    create_api_flow()
    create_uiux_sitemap()
    create_ui_wireframes()
    print("All design diagrams generated successfully!")
