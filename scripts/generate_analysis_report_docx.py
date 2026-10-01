# -*- coding: utf-8 -*-
import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def generate_report():
    doc = docx.Document()

    # --- Setup Page Margins (A4, 2cm) ---
    for section in doc.sections:
        section.page_width = Inches(8.27)
        section.page_height = Inches(11.69)
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.85)
        section.right_margin = Inches(0.85)

        # Header
        hp = section.header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("Giai đoạn 02: Báo Cáo Phân Tích Hệ Thống | SportBooking")
        hrun.font.name = "Calibri"
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = RGBColor(148, 163, 184)

        # Footer with Page Number
        fp = section.footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        frun = fp.add_run("Trang ")
        frun.font.name = "Calibri"
        frun.font.size = Pt(9)
        frun.font.color.rgb = RGBColor(148, 163, 184)
        f_fld = parse_xml(r'<w:fldSimple %s w:instr="PAGE"/>' % nsdecls('w'))
        fp._element.append(f_fld)

    # Palette
    PRIMARY = RGBColor(30, 58, 138)    # #1E3A8A
    SECONDARY = RGBColor(2, 132, 199)  # #0284C7
    TEXT_COLOR = RGBColor(30, 41, 59)  # #1E293B
    MUTED = RGBColor(100, 116, 139)    # #64748B

    def sp(p, before=0, after=5, line=1.15):
        p.paragraph_format.space_before = Pt(before)
        p.paragraph_format.space_after = Pt(after)
        p.paragraph_format.line_spacing = line

    def add_h1(text):
        p = doc.add_paragraph()
        sp(p, before=16, after=6)
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.size = Pt(13.5)
        r.font.bold = True
        r.font.color.rgb = PRIMARY
        pPr = p._element.get_or_add_pPr()
        pBdr = parse_xml(r'<w:pBdr %s><w:bottom w:val="single" w:sz="12" w:space="4" w:color="0284C7"/></w:pBdr>' % nsdecls('w'))
        pPr.append(pBdr)
        return p

    def add_h2(text):
        p = doc.add_paragraph()
        sp(p, before=12, after=4)
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.size = Pt(11.5)
        r.font.bold = True
        r.font.color.rgb = SECONDARY
        return p

    def add_h3(text):
        p = doc.add_paragraph()
        sp(p, before=8, after=3)
        r = p.add_run(text)
        r.font.name = "Calibri"
        r.font.size = Pt(11)
        r.font.bold = True
        r.font.color.rgb = TEXT_COLOR
        return p

    def add_body(text, bold_prefix=None, italic=False):
        p = doc.add_paragraph()
        sp(p, before=0, after=5, line=1.15)
        if bold_prefix:
            br = p.add_run(bold_prefix)
            br.font.name = "Calibri"
            br.font.size = Pt(11)
            br.font.bold = True
            br.font.color.rgb = TEXT_COLOR
        r = p.add_run(text)
        r.font.name = "Calibri"
        r.font.size = Pt(11)
        r.font.italic = italic
        r.font.color.rgb = TEXT_COLOR
        return p

    def add_bullet(text, bold_prefix=None):
        p = doc.add_paragraph(style='List Bullet')
        sp(p, before=0, after=3, line=1.15)
        if bold_prefix:
            br = p.add_run(bold_prefix)
            br.font.name = "Calibri"
            br.font.size = Pt(11)
            br.font.bold = True
            br.font.color.rgb = TEXT_COLOR
        r = p.add_run(text)
        r.font.name = "Calibri"
        r.font.size = Pt(11)
        r.font.color.rgb = TEXT_COLOR
        return p

    def style_cell(cell, fill_hex=None, bold=False, font_size=9.5, color=None, align=WD_ALIGN_PARAGRAPH.LEFT):
        tcPr = cell._element.get_or_add_tcPr()
        if fill_hex:
            shd = parse_xml(r'<w:shd %s w:fill="%s"/>' % (nsdecls('w'), fill_hex))
            tcPr.append(shd)
        tcMar = parse_xml(
            r'<w:tcMar %s>'
            r'<w:top w:w="120" w:type="dxa"/>'
            r'<w:bottom w:w="120" w:type="dxa"/>'
            r'<w:left w:w="140" w:type="dxa"/>'
            r'<w:right w:w="140" w:type="dxa"/>'
            r'</w:tcMar>' % nsdecls('w')
        )
        tcPr.append(tcMar)
        for p in cell.paragraphs:
            p.alignment = align
            sp(p, before=0, after=0)
            for r in p.runs:
                r.font.name = "Calibri"
                r.font.size = Pt(font_size)
                r.font.bold = bold
                if color:
                    r.font.color.rgb = color

    def add_image_with_caption(img_path, caption, width=Inches(6.2)):
        if os.path.exists(img_path):
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            sp(p, before=8, after=4)
            p.add_run().add_picture(img_path, width=width)

            cp = doc.add_paragraph()
            cp.alignment = WD_ALIGN_PARAGRAPH.CENTER
            sp(cp, before=0, after=10)
            crun = cp.add_run(f"📷 {caption}")
            crun.font.name = "Calibri"
            crun.font.size = Pt(9.5)
            crun.font.italic = True
            crun.font.bold = True
            crun.font.color.rgb = SECONDARY
        else:
            print(f"Warning: Image not found: {img_path}")

    # ==================== TRANG BÌA & TIÊU ĐỀ ====================
    bp = doc.add_paragraph()
    sp(bp, before=6, after=2)
    bp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    brun = bp.add_run("HỌC VIỆN / TRƯỜNG ĐẠI HỌC - KHOA CÔNG NGHỆ THÔNG TIN")
    brun.font.name = "Calibri"
    brun.font.size = Pt(11)
    brun.font.bold = True
    brun.font.color.rgb = MUTED

    tp = doc.add_paragraph()
    sp(tp, before=4, after=4)
    tp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    trun = tp.add_run("BÁO CÁO GIAI ĐOẠN 02: PHÂN TÍCH HỆ THỐNG\n(SYSTEM ANALYSIS SPECIFICATION)")
    trun.font.name = "Arial"
    trun.font.size = Pt(17)
    trun.font.bold = True
    trun.font.color.rgb = PRIMARY

    subp = doc.add_paragraph()
    sp(subp, before=2, after=12)
    subp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    subrun = subp.add_run("Đề tài: Hệ Thống Quản Lý Và Đặt Sân Thể Thao Trực Tuyến Toàn Diện (SportBooking)")
    subrun.font.name = "Calibri"
    subrun.font.size = Pt(12)
    subrun.font.bold = True
    subrun.font.color.rgb = SECONDARY

    # --- KHUNG NHẬN XÉT CỦA GIẢNG VIÊN HƯỚNG DẪN (GVHD) ---
    eval_table = doc.add_table(rows=6, cols=2)
    eval_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    eval_data = [
        ("Tên đề tài:", "Hệ thống Quản lý và Đặt sân Thể thao Trực tuyến Toàn diện (SportBooking)"),
        ("Giai đoạn đánh giá:", "02. PHÂN TÍCH: Yêu cầu nghiệp vụ, Use Case, Luồng xử lý, Dữ liệu, Ràng buộc"),
        ("Sinh viên / Nhóm thực hiện:", "Nhóm Phát triển Dự án SportBooking"),
        ("Giảng viên hướng dẫn (GVHD):", ".........................................................................................................."),
        ("Điểm đánh giá giai đoạn:", "............ / 10 điểm                      (Chữ ký GVHD: .....................................)"),
        ("Nhận xét của GVHD:", "\n\n\n\n")
    ]
    for idx, (k, v) in enumerate(eval_data):
        c0 = eval_table.cell(idx, 0)
        c1 = eval_table.cell(idx, 1)
        c0.width = Inches(2.2)
        c1.width = Inches(4.37)
        c0.paragraphs[0].text = k
        c1.paragraphs[0].text = v
        style_cell(c0, fill_hex="F1F5F9", bold=True, font_size=9.5, color=PRIMARY)
        style_cell(c1, fill_hex="FFFFFF", bold=False, font_size=9.5, color=TEXT_COLOR)

    sp_mid = doc.add_paragraph()
    sp(sp_mid, before=0, after=10)

    # =========================================================================
    # CHƯƠNG 1: XÁC ĐỊNH NGƯỜI DÙNG & TÁC NHÂN HỆ THỐNG
    # =========================================================================
    add_h1("CHƯƠNG 1: XÁC ĐỊNH NGƯỜI DÙNG & TÁC NHÂN HỆ THỐNG (ACTORS)")
    add_body(
        "Hệ thống SportBooking áp dụng mô hình phân quyền chặt chẽ theo vai trò (Role-Based Access Control - RBAC). "
        "Dựa trên khảo sát thực tế quy trình vận hành cụm sân thể thao, hệ thống xác định rõ 4 nhóm đối tượng tác nhân (Actors):"
    )

    actor_table = doc.add_table(rows=5, cols=4)
    actor_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    headers = ["Tác nhân (Actor)", "Mục đích sử dụng", "Quyền hạn chính", "Phân hệ phụ trách"]
    for i, h in enumerate(headers):
        c = actor_table.cell(0, i)
        c.paragraphs[0].text = h
        style_cell(c, fill_hex="1E3A8A", bold=True, font_size=9.5, color=RGBColor(255, 255, 255))

    actors_info = [
        ("Khách hàng\n(Customer)", "Người chơi thể thao có nhu cầu tìm kiếm, đặt sân, thanh toán và gửi đánh giá.", "• Tìm kiếm, lọc sân, xem slot giờ theo ngày.\n• Đặt sân online, nhận vé điện tử QR Code.\n• Hủy đơn đặt sân và nhận hoàn tiền mô phỏng.\n• Đánh giá chất lượng sân (1-5 sao).", "Phân hệ Khách hàng\n(Web Portal)"),
        ("Nhân viên\n(Staff)", "Nhân sự trực tiếp vận hành, điều phối trận đấu tại các cụm sân.", "• Xem lịch ca trực được phân công theo ngày.\n• Chấm công vào/ra trực quan kèm đồng hồ thời gian thực.\n• Quét mã QR tại sân để xác thực có mặt.\n• Gửi đơn xin nghỉ phép trực tuyến.", "Phân hệ Nhân viên\n(Staff Portal)"),
        ("Quản lý\n(Manager)", "Trưởng ca hoặc Quản lý chi nhánh cụm sân thể thao.", "• Quản lý danh mục sân và trạng thái hoạt động.\n• Xếp lịch phân ca trực cho nhân viên.\n• Giám sát bảng chấm công, duyệt đơn nghỉ phép.\n• Tạo mã QR Token động cho từng sân.", "Phân hệ Vận hành\n(Manager Dashboard)"),
        ("Quản trị viên\n(Admin)", "Chủ doanh nghiệp, Ban giám đốc trung tâm thể thao.", "• Toàn quyền quản trị hệ thống, tài khoản & nhân sự.\n• Hiệu chỉnh chấm công kèm Audit Log bắt buộc.\n• Tự động tính và duyệt bảng lương nhân viên.\n• Xem Dashboard báo cáo KPI & 4 biểu đồ Recharts.", "Phân hệ Quản trị\n(Admin Dashboard)")
    ]

    for row_idx, row in enumerate(actors_info, start=1):
        for col_idx, text in enumerate(row):
            cell = actor_table.cell(row_idx, col_idx)
            cell.paragraphs[0].text = text
            fill = "F8FAFC" if row_idx % 2 == 1 else "FFFFFF"
            bold = (col_idx == 0)
            color = PRIMARY if col_idx == 0 else TEXT_COLOR
            style_cell(cell, fill_hex=fill, bold=bold, font_size=9, color=color)

    # Set col widths
    col_widths = [Inches(1.2), Inches(1.8), Inches(2.4), Inches(1.17)]
    for row in actor_table.rows:
        for idx, width in enumerate(col_widths):
            row.cells[idx].width = width

    sp_ch1 = doc.add_paragraph()
    sp(sp_ch1, before=0, after=6)

    # =========================================================================
    # CHƯƠNG 2: YÊU CẦU NGHIỆP VỤ & ĐẶC TẢ ĐẦU VÀO / ĐẦU RA
    # =========================================================================
    add_h1("CHƯƠNG 2: YÊU CẦU NGHIỆP VỤ & ĐẶC TẢ ĐẦU VÀO / ĐẦU RA")
    add_body(
        "Hệ thống phân chia thành 5 phân hệ nghiệp vụ chính. Mỗi nghiệp vụ được xác định tường minh về điều kiện xử lý, "
        "dữ liệu đầu vào (Inputs) và kết quả đầu ra (Outputs):"
    )

    io_table = doc.add_table(rows=7, cols=4)
    io_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    io_headers = ["Phân hệ / Chức năng", "Yêu cầu nghiệp vụ chính", "Dữ liệu Đầu vào (Inputs)", "Dữ liệu Đầu ra (Outputs)"]
    for i, h in enumerate(io_headers):
        c = io_table.cell(0, i)
        c.paragraphs[0].text = h
        style_cell(c, fill_hex="1E3A8A", bold=True, font_size=9.5, color=RGBColor(255, 255, 255))

    io_data = [
        ("1. Xác thực & Phân quyền", "Đăng ký, đăng nhập stateless JWT, đổi mật khẩu, phân quyền 4 Roles chặt chẽ.", "Email, mật khẩu, họ tên, số điện thoại, mật khẩu cũ/mới.", "JWT Bearer Token, thông tin User profile, điều hướng dashboard theo Role."),
        ("2. Tra cứu & Xem lịch sân", "Bộ lọc tìm kiếm đa tiêu chí (môn thể thao, vị trí, giá, tiện ích), sơ đồ slot theo ngày.", "Môn thể thao, khoảng giá, tiện ích, ngày xem lịch.", "Danh sách sân thể thao, sơ đồ các slot bận (màu đỏ) và trống (màu xanh)."),
        ("3. Đặt sân Chống trùng lịch", "Thuật toán kiểm tra giao thoa giờ, chặn trùng lịch 100%, sinh mã vé tự động.", "courtId, date, startTime, endTime, paymentMethod.", "Mã đơn BK-YYYYMMDD-XXXX, vé điện tử QR Code, cập nhật trạng thái confirmed."),
        ("4. Chấm công QR & Audit Log", "Check-in/out có bấm giờ, tự động tính đi muộn (gracePeriod), trừ giờ nghỉ, lưu vết sửa.", "workScheduleId, qrToken, giờ vào/ra, lý do sửa (bắt buộc đối với Admin).", "Bản ghi Attendance, workHours thực tế, bản ghi Audit Log lưu vết không thể xóa."),
        ("5. Quản lý Nghỉ phép", "Nộp đơn trực tuyến, tự động chặn trùng ngày, Quản lý phê duyệt hoặc từ chối.", "Loại nghỉ (annual, sick...), startDate, endDate, lý do.", "Trạng thái đơn (pending/approved/rejected), lý do phản hồi, cập nhật ngày công."),
        ("6. Bảng lương & Dashboard", "Tính lương tự động từ ngày công chuẩn 26 công, tổng hợp doanh thu 6 tháng qua Recharts.", "Tháng, năm, phụ cấp, tăng ca, khấu trừ.", "Bảng lương chi tiết, 4 biểu đồ KPI (Area, Line, Bar, Pie charts).")
    ]

    for row_idx, row in enumerate(io_data, start=1):
        for col_idx, text in enumerate(row):
            cell = io_table.cell(row_idx, col_idx)
            cell.paragraphs[0].text = text
            fill = "F8FAFC" if row_idx % 2 == 1 else "FFFFFF"
            bold = (col_idx == 0)
            color = PRIMARY if col_idx == 0 else TEXT_COLOR
            style_cell(cell, fill_hex=fill, bold=bold, font_size=9, color=color)

    io_col_widths = [Inches(1.3), Inches(1.9), Inches(1.7), Inches(1.67)]
    for row in io_table.rows:
        for idx, width in enumerate(io_col_widths):
            row.cells[idx].width = width

    sp_ch2 = doc.add_paragraph()
    sp(sp_ch2, before=0, after=6)

    # =========================================================================
    # CHƯƠNG 3: BIỂU ĐỒ USE CASE & CÁC LUỒNG XỬ LÝ (KÈM HÌNH ẢNH)
    # =========================================================================
    add_h1("CHƯƠNG 3: BIỂU ĐỒ USE CASE & CÁC LUỒNG XỬ LÝ (PROCESS FLOWS)")
    add_body(
        "Chương này trực quan hóa các chức năng hệ thống qua Biểu đồ Use Case, Biểu đồ Hoạt động (Activity Diagram) "
        "và Biểu đồ Tuần tự (Sequence Diagram) được tạo và tích hợp trực tiếp vào tài liệu:"
    )

    # --- 3.1 USE CASE TỔNG QUAN ---
    add_h2("3.1. Biểu đồ Use Case Tổng Quan Hệ Thống")
    add_body("Biểu đồ thể hiện mối quan hệ giữa 4 nhóm tác nhân với các Use Case trong ranh giới hệ thống SportBooking:")
    add_image_with_caption("docs/images/diag_usecase_general.png", "Hình 3.1: Biểu đồ Use Case Tổng quan Hệ thống SportBooking")

    add_body(
        "Đặc tả Use Case trọng tâm (UC03 - Đặt sân chống trùng lịch):", bold_prefix="Đặc tả Use Case UC03: "
    )
    add_bullet(" Khách hàng (Customer) đã đăng nhập vào hệ thống.", "Tác nhân chính:")
    add_bullet(" Khách hàng đã chọn sân hợp lệ và chọn một ngày chơi cụ thể.", "Tiền điều kiện (Pre-condition):")
    add_bullet(
        " Khách hàng chọn khung giờ (startTime - endTime) -> Hệ thống gửi request -> Backend kiểm tra xung đột -> "
        "Tính tổng tiền -> Tạo bản ghi Booking confirmed -> Sinh vé QR Code và hiển thị thông báo thành công.",
        "Luồng sự kiện chính (Main Flow):"
    )
    add_bullet(
        " Nếu phát hiện trùng khung giờ đã có người đặt, hệ thống trả về HTTP 409 Conflict kèm cảnh báo để khách hàng chọn giờ khác.",
        "Luồng ngoại lệ (Exception Flow):"
    )
    add_bullet(" Đơn đặt sân được lưu vào cơ sở dữ liệu, slot giờ được khóa ngay lập tức trên sơ đồ sân.", "Hậu điều kiện (Post-condition):")

    # --- 3.2 BIỂU ĐỒ HOẠT ĐỘNG: ĐẶT SÂN ---
    add_h2("3.2. Biểu đồ Hoạt động (Activity Diagram) - Quy Trình Đặt Sân Chống Trùng Lịch")
    add_body(
        "Biểu đồ hoạt động mô tả chi tiết thuật toán kiểm tra giao thoa thời gian (Time Overlap Collision Detection). "
        "Điều kiện trùng lịch được định nghĩa: max(startTime_mới, startTime_cũ) < min(endTime_mới, endTime_cũ)."
    )
    add_image_with_caption("docs/images/diag_activity_booking.png", "Hình 3.2: Biểu đồ Hoạt động - Đặt sân và Kiểm tra Chống trùng lịch")

    # --- 3.3 BIỂU ĐỒ HOẠT ĐỘNG: CHẤM CÔNG QR & AUDIT LOG ---
    add_h2("3.3. Biểu đồ Hoạt động (Activity Diagram) - Chấm Công QR & Audit Log Kiểm Toán")
    add_body(
        "Mô tả hai luồng song song: Check-in (so sánh giờ vào với gracePeriod để phân loại 'late' hay 'present') "
        "và Check-out (tính thời gian thực tế trừ giờ nghỉ). Đồng thời quy định cơ chế bắt buộc nhập lý do khi Admin hiệu chỉnh công."
    )
    add_image_with_caption("docs/images/diag_activity_attendance.png", "Hình 3.3: Biểu đồ Hoạt động - Chấm công QR Vào/Ra & Audit Log Kiểm toán")

    # --- 3.4 BIỂU ĐỒ TUẦN TỰ: ĐẶT SÂN ---
    add_h2("3.4. Biểu đồ Tuần tự (Sequence Diagram) - Quy Trình Đặt Sân & Xử Lý Xung Đột")
    add_body(
        "Minh họa luồng thông điệp theo thời gian giữa các thành phần kiến trúc: Client UI (React) -> BookingController -> "
        "BookingService -> MongoDB Collection. Thể hiện rõ việc quét Compound Index để đạt tốc độ phản hồi tối ưu."
    )
    add_image_with_caption("docs/images/diag_sequence_booking.png", "Hình 3.4: Biểu đồ Tuần tự - Đặt sân và Xử lý Xung đột Lịch")

    # =========================================================================
    # CHƯƠNG 4: MÔ HÌNH DỮ LIỆU & BIỂU ĐỒ LỚP (DATA MODEL & CLASS DIAGRAM)
    # =========================================================================
    add_h1("CHƯƠNG 4: MÔ HÌNH DỮ LIỆU & BIỂU ĐỒ LỚP THỰC THỂ (DATA MODEL)")
    add_body(
        "Cơ sở dữ liệu SportBooking được thiết kế chuẩn hóa trên nền tảng MongoDB NoSQL với 12 Collections. "
        "Dưới đây là Biểu đồ Lớp Thực thể (UML Class Diagram / ERD) thể hiện đầy đủ cấu trúc thuộc tính, phương thức và các mối liên kết 1-N:"
    )

    add_image_with_caption("docs/images/diag_class_erd.png", "Hình 4.1: Biểu đồ Lớp Thực thể Dữ liệu (UML Class Diagram / ERD)", width=Inches(6.4))

    add_h2("4.1. Từ Điển Dữ Liệu Chi Tiết (Data Dictionary)")
    add_body("Bảng tóm tắt 12 Collections cốt lõi trong hệ thống:")

    dict_table = doc.add_table(rows=7, cols=3)
    dict_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    d_headers = ["Tên Collection", "Các trường thông tin chính (Fields)", "Ý nghĩa & Ràng buộc nghiệp vụ"]
    for i, h in enumerate(d_headers):
        c = dict_table.cell(0, i)
        c.paragraphs[0].text = h
        style_cell(c, fill_hex="1E3A8A", bold=True, font_size=9.5, color=RGBColor(255, 255, 255))

    dict_data = [
        ("users", "_id, email (unique), password (hash), fullName, phone, role, isActive", "Lưu thông tin đăng nhập và phân quyền 4 nhóm tài khoản."),
        ("courts", "_id, name, type (football, tennis...), pricePerHour, openingTime, closingTime, status", "Danh mục sân thể thao, khung giờ mở cửa và giá thuê theo giờ."),
        ("bookings", "_id, bookingCode (unique), user, court, date, startTime, endTime, totalPrice, status", "Lưu đơn đặt sân. Có Compound Index: { court: 1, date: 1, status: 1 }."),
        ("attendances", "_id, employee, workSchedule, date, checkIn, checkOut, workHours, status, qrVerified", "Bản ghi chấm công từng ngày, lưu giờ làm thực tế sau khi trừ giờ nghỉ."),
        ("attendance_logs", "_id, attendance, action, oldValue, newValue, performedBy, reason, createdAt", "Bảng lưu vết kiểm toán bất biến khi có thao tác can thiệp chấm công."),
        ("payrolls", "_id, employee, month, year, baseSalary, totalWorkDays, totalSalary, status", "Bảng lương tự động tính toán dựa trên số ngày công thực tế x (lương / 26 công).")
    ]

    for row_idx, row in enumerate(dict_data, start=1):
        for col_idx, text in enumerate(row):
            cell = dict_table.cell(row_idx, col_idx)
            cell.paragraphs[0].text = text
            fill = "F8FAFC" if row_idx % 2 == 1 else "FFFFFF"
            bold = (col_idx == 0)
            color = PRIMARY if col_idx == 0 else TEXT_COLOR
            style_cell(cell, fill_hex=fill, bold=bold, font_size=9, color=color)

    d_col_widths = [Inches(1.4), Inches(2.7), Inches(2.47)]
    for row in dict_table.rows:
        for idx, width in enumerate(d_col_widths):
            row.cells[idx].width = width

    sp_ch4 = doc.add_paragraph()
    sp(sp_ch4, before=0, after=6)

    # =========================================================================
    # CHƯƠNG 5: CÁC RÀNG BUỘC NGHIỆP VỤ & KỸ THUẬT (BUSINESS RULES)
    # =========================================================================
    add_h1("CHƯƠNG 5: CÁC RÀNG BUỘC NGHIỆP VỤ & KỸ THUẬT (CONSTRAINTS)")
    add_body("Nhằm đảm bảo tính chính xác, minh bạch và an toàn dữ liệu, hệ thống thiết lập các quy tắc ràng buộc nghiêm ngặt:")

    add_h2("5.1. Ràng Buộc Nghiệp Vụ Đặt Sân (Booking Constraints)")
    add_bullet(" Không được phép đặt lịch cho những ngày trong quá khứ so với thời điểm hiện tại.", "Ràng buộc thời gian:")
    add_bullet(" Khung giờ đặt (startTime - endTime) bắt buộc phải nằm trọn trong khoảng mở cửa của sân (openingTime - closingTime).", "Ràng buộc giờ hoạt động:")
    add_bullet(" Tuyệt đối không cho phép 2 đơn đặt sân có trạng thái khác 'cancelled' bị trùng lặp hoặc giao thoa khung giờ trên cùng một sân.", "Ràng buộc chống trùng lịch (Bắt buộc):")
    add_bullet(" Khách hàng chỉ được phép gửi đánh giá và chấm sao (Rating 1-5) đối với các đơn đặt sân đã hoàn thành ('completed').", "Ràng buộc đánh giá chất lượng:")

    add_h2("5.2. Ràng Buộc Quản Lý Ca Trực & Chấm Công (Attendance Constraints)")
    add_bullet(" Một nhân viên không được phân công 2 ca trực có khung thời gian trùng nhau trong cùng một ngày làm việc.", "Ràng buộc phân ca:")
    add_bullet(" Không cho phép nhân viên bấm check-in 2 lần trong 1 ca trực; không cho phép check-out khi chưa có check-in.", "Ràng buộc lượt bấm công:")
    add_bullet(" Nếu giờ check-in vượt quá startTime + gracePeriod (ân hạn trễ), hệ thống tự động gắn trạng thái 'late' (Đi muộn).", "Quy tắc tính đi muộn:")
    add_bullet(" Mọi thao tác hiệu chỉnh giờ công của Admin bắt buộc phải nhập lý do và tự động ghi vào AttendanceLog. Bản ghi này có tính toàn vẹn bất biến, không hỗ trợ API chỉnh sửa hay xóa.", "Ràng buộc kiểm toán Audit Log:")

    add_h2("5.3. Ràng Buộc Nghỉ Phép & Bảng Lương (Payroll Constraints)")
    add_bullet(" Ngày kết thúc đơn nghỉ (endDate) phải lớn hơn hoặc bằng ngày bắt đầu (startDate); không cho phép gửi đơn nếu đã có đơn khác trùng thời gian.", "Ràng buộc nghỉ phép:")
    add_bullet(" Lương ngày công tính theo công thức chuẩn 26 công: workPay = round((baseSalary / 26) * totalWorkDays).", "Quy tắc tính lương:")
    add_bullet(" Bảng lương phải trải qua các bước phê duyệt tuần tự: Bản nháp ('draft') -> Đã duyệt ('approved') -> Đã chi trả ('paid').", "Quy trình duyệt chi:")

    add_h2("5.4. Ràng Buộc Bảo Mật & Kỹ Thuật (Security Constraints)")
    add_bullet(" Mật khẩu người dùng được mã hóa một chiều qua thuật toán bcrypt với muối ngẫu nhiên (salt 10 vòng) trước khi lưu vào MongoDB.", "Mã hóa mật khẩu:")
    add_bullet(" Mọi request gửi đến các Endpoint bảo vệ phải đính kèm JWT Bearer Token hợp lệ và chưa hết hạn (thời hạn 7 ngày).", "Xác thực phiên:")
    add_bullet(" Áp dụng Express Rate Limit giới hạn tối đa 100 requests / 15 phút trên mỗi địa chỉ IP để chống tấn công brute-force và DDoS.", "Giới hạn tần suất:")

    # =========================================================================
    # CHƯƠNG 6: KẾT LUẬN & ĐỀ XUẤT CHO BẢN THIẾT KẾ KỸ THUẬT
    # =========================================================================
    add_h1("CHƯƠNG 6: KẾT LUẬN & ĐỀ XUẤT CHO GIAI ĐOẠN TIẾP THEO")
    add_body(
        "Báo cáo phân tích Giai đoạn 02 đã hoàn thành trọn vẹn việc khảo sát, đặc tả yêu cầu nghiệp vụ, "
        "mô hình hóa Use Case, xây dựng luồng xử lý (Activity & Sequence Diagrams), thiết kế cấu trúc dữ liệu thực thể (Class Diagram) "
        "và xác lập các quy tắc ràng buộc toàn vẹn cho hệ thống SportBooking."
    )
    add_body(
        "Đây là cơ sở vững chắc và tiền đề quan trọng để chuyển sang **Giai đoạn 03: Thiết kế kỹ thuật chi tiết và Hiện thực hóa mã nguồn (Implementation)**, "
        "đảm bảo hệ thống phát triển đúng hướng, ổn định, an toàn và sẵn sàng đưa vào vận hành thực tế."
    )

    # Save to multiple locations
    root_file = "Bao_Cao_Phan_Tich_SportBooking.docx"
    docs_file = "docs/Bao_Cao_Phan_Tich_SportBooking.docx"
    pub_file = "frontend/public/Bao_Cao_Phan_Tich_SportBooking.docx"

    doc.save(root_file)
    doc.save(docs_file)
    doc.save(pub_file)

    print("Document successfully created and saved at:")
    print(f"- {os.path.abspath(root_file)}")
    print(f"- {os.path.abspath(docs_file)}")
    print(f"- {os.path.abspath(pub_file)}")

if __name__ == "__main__":
    generate_report()
