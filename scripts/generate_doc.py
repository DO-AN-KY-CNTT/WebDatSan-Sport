# -*- coding: utf-8 -*-
import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def create_document():
    doc = docx.Document()

    # --- Page setup (A4, 2cm margins) ---
    sections = doc.sections
    for section in sections:
        section.page_width = Inches(8.27)   # A4 width
        section.page_height = Inches(11.69) # A4 height
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.9)
        section.right_margin = Inches(0.9)
        
        # Header & Footer
        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("Dự án SportBooking | Đề tài - Phạm vi - Công nghệ")
        hrun.font.name = "Calibri"
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = RGBColor(148, 163, 184) # slate-400

        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        frun = fp.add_run("Trang ")
        frun.font.name = "Calibri"
        frun.font.size = Pt(9)
        frun.font.color.rgb = RGBColor(148, 163, 184)
        
        # Add page number field to footer
        f_pPr = fp._element.get_or_add_pPr()
        f_fld = parse_xml(r'<w:fldSimple %s w:instr="PAGE"/>' % nsdecls('w'))
        fp._element.append(f_fld)

    # --- Color Palette ---
    PRIMARY_COLOR = RGBColor(30, 58, 138)   # Deep Blue #1E3A8A
    SECONDARY_COLOR = RGBColor(2, 132, 199) # Sky Blue #0284C7
    TEXT_COLOR = RGBColor(30, 41, 59)       # Dark Slate #1E293B
    MUTED_COLOR = RGBColor(100, 116, 139)   # Slate #64748B
    ACCENT_COLOR = RGBColor(16, 185, 129)   # Emerald #10B981

    # --- Style helpers ---
    def style_paragraph(p, space_before=0, space_after=6, line_spacing=1.15):
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = line_spacing

    def add_title(text, subtitle=None):
        # Badge
        badge_p = doc.add_paragraph()
        style_paragraph(badge_p, space_before=6, space_after=4)
        badge_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        badge_run = badge_p.add_run("BÁO CÁO ĐẶC TẢ ĐỀ TÀI DỰ ÁN PHẦN MỀM")
        badge_run.font.name = "Calibri"
        badge_run.font.size = Pt(10)
        badge_run.font.bold = True
        badge_run.font.color.rgb = SECONDARY_COLOR

        # Main Title
        title_p = doc.add_paragraph()
        style_paragraph(title_p, space_before=2, space_after=6)
        title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        title_run = title_p.add_run(text)
        title_run.font.name = "Arial"
        title_run.font.size = Pt(20)
        title_run.font.bold = True
        title_run.font.color.rgb = PRIMARY_COLOR

        if subtitle:
            sub_p = doc.add_paragraph()
            style_paragraph(sub_p, space_before=2, space_after=14)
            sub_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            sub_run = sub_p.add_run(subtitle)
            sub_run.font.name = "Calibri"
            sub_run.font.size = Pt(11.5)
            sub_run.font.italic = True
            sub_run.font.color.rgb = MUTED_COLOR

        # Divider line
        div_p = doc.add_paragraph()
        style_paragraph(div_p, space_before=0, space_after=14)
        div_run = div_p.add_run("―" * 48)
        div_run.font.color.rgb = RGBColor(226, 232, 240)
        div_p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    def add_h1(text):
        p = doc.add_paragraph()
        style_paragraph(p, space_before=16, space_after=6)
        run = p.add_run(text)
        run.font.name = "Arial"
        run.font.size = Pt(14)
        run.font.bold = True
        run.font.color.rgb = PRIMARY_COLOR
        # Bottom border under H1
        pPr = p._element.get_or_add_pPr()
        pBdr = parse_xml(r'<w:pBdr %s><w:bottom w:val="single" w:sz="12" w:space="4" w:color="0284C7"/></w:pBdr>' % nsdecls('w'))
        pPr.append(pBdr)
        return p

    def add_h2(text):
        p = doc.add_paragraph()
        style_paragraph(p, space_before=12, space_after=4)
        run = p.add_run(text)
        run.font.name = "Arial"
        run.font.size = Pt(12)
        run.font.bold = True
        run.font.color.rgb = SECONDARY_COLOR
        return p

    def add_h3(text):
        p = doc.add_paragraph()
        style_paragraph(p, space_before=8, space_after=3)
        run = p.add_run(text)
        run.font.name = "Calibri"
        run.font.size = Pt(11)
        run.font.bold = True
        run.font.color.rgb = TEXT_COLOR
        return p

    def add_body(text, bold_prefix=None, italic=False):
        p = doc.add_paragraph()
        style_paragraph(p, space_before=0, space_after=5, line_spacing=1.15)
        if bold_prefix:
            b_run = p.add_run(bold_prefix)
            b_run.font.name = "Calibri"
            b_run.font.size = Pt(11)
            b_run.font.bold = True
            b_run.font.color.rgb = TEXT_COLOR
        run = p.add_run(text)
        run.font.name = "Calibri"
        run.font.size = Pt(11)
        run.font.italic = italic
        run.font.color.rgb = TEXT_COLOR
        return p

    def add_bullet(text, bold_prefix=None):
        p = doc.add_paragraph(style='List Bullet')
        style_paragraph(p, space_before=0, space_after=3, line_spacing=1.15)
        if bold_prefix:
            b_run = p.add_run(bold_prefix)
            b_run.font.name = "Calibri"
            b_run.font.size = Pt(11)
            b_run.font.bold = True
            b_run.font.color.rgb = TEXT_COLOR
        run = p.add_run(text)
        run.font.name = "Calibri"
        run.font.size = Pt(11)
        run.font.color.rgb = TEXT_COLOR
        return p

    def add_callout(text, title=None):
        table = doc.add_table(rows=1, cols=1)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        cell = table.cell(0, 0)
        cell.width = Inches(6.47)
        # Background
        tcPr = cell._element.get_or_add_tcPr()
        shd = parse_xml(r'<w:shd %s w:fill="F0F9FF"/>' % nsdecls('w'))
        tcPr.append(shd)
        # Left border solid blue, others none
        tcBorders = parse_xml(
            r'<w:tcBorders %s>'
            r'<w:top w:val="none"/>'
            r'<w:left w:val="single" w:sz="24" w:space="0" w:color="0284C7"/>'
            r'<w:bottom w:val="none"/>'
            r'<w:right w:val="none"/>'
            r'</w:tcBorders>' % nsdecls('w')
        )
        tcPr.append(tcBorders)
        # Margins
        tcMar = parse_xml(
            r'<w:tcMar %s>'
            r'<w:top w:w="140" w:type="dxa"/>'
            r'<w:bottom w:w="140" w:type="dxa"/>'
            r'<w:left w:w="200" w:type="dxa"/>'
            r'<w:right w:w="200" w:type="dxa"/>'
            r'</w:tcMar>' % nsdecls('w')
        )
        tcPr.append(tcMar)

        cp = cell.paragraphs[0]
        style_paragraph(cp, space_before=0, space_after=2)
        if title:
            trun = cp.add_run(f"📌 {title}\n")
            trun.font.name = "Calibri"
            trun.font.size = Pt(10.5)
            trun.font.bold = True
            trun.font.color.rgb = PRIMARY_COLOR
        crun = cp.add_run(text)
        crun.font.name = "Calibri"
        crun.font.size = Pt(10.5)
        crun.font.color.rgb = TEXT_COLOR

        # Spacer after table
        sp = doc.add_paragraph()
        style_paragraph(sp, space_before=0, space_after=4)

    def set_cell_styling(cell, fill_hex=None, bold=False, font_size=10, color=None, align=WD_ALIGN_PARAGRAPH.LEFT):
        tcPr = cell._element.get_or_add_tcPr()
        if fill_hex:
            shd = parse_xml(r'<w:shd %s w:fill="%s"/>' % (nsdecls('w'), fill_hex))
            tcPr.append(shd)
        # Cell internal margins
        tcMar = parse_xml(
            r'<w:tcMar %s>'
            r'<w:top w:w="120" w:type="dxa"/>'
            r'<w:bottom w:w="120" w:type="dxa"/>'
            r'<w:left w:w="140" w:type="dxa"/>'
            r'<w:right w:w="140" w:type="dxa"/>'
            r'</w:tcMar>' % nsdecls('w')
        )
        tcPr.append(tcMar)
        # Style text in cell
        for p in cell.paragraphs:
            p.alignment = align
            style_paragraph(p, space_before=0, space_after=0)
            for run in p.runs:
                run.font.name = "Calibri"
                run.font.size = Pt(font_size)
                run.font.bold = bold
                if color:
                    run.font.color.rgb = color

    # ==================== NỘI DUNG TÀI LIỆU ====================

    # --- TITLE ---
    add_title(
        text="HỆ THỐNG QUẢN LÝ VÀ ĐẶT SÂN THỂ THAO TRỰC TUYẾN TOÀN DIỆN (SPORTBOOKING)",
        subtitle="Tài liệu Đặc tả Đề tài: Tên Đề Tài, Phạm Vi Thực Hiện và Công Nghệ Dự Kiến Triển Khai"
    )

    # Info Summary Box
    info_table = doc.add_table(rows=4, cols=2)
    info_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    info_data = [
        ("Tên dự án:", "SportBooking (Hệ thống Quản lý & Đặt sân thể thao toàn diện)"),
        ("Loại hình phát triển:", "Dự án phần mềm ứng dụng Web (Fullstack Web Application)"),
        ("Kiến trúc triển khai:", "Kiến trúc phân tầng (Layered Architecture) với RESTful API"),
        ("Đối tượng phục vụ:", "Khách hàng cá nhân/nhóm thể thao, Nhân viên cụm sân, Quản lý & Quản trị viên")
    ]
    for row_idx, (k, v) in enumerate(info_data):
        c0 = info_table.cell(row_idx, 0)
        c1 = info_table.cell(row_idx, 1)
        c0.width = Inches(2.2)
        c1.width = Inches(4.27)
        c0.paragraphs[0].text = k
        c1.paragraphs[0].text = v
        set_cell_styling(c0, fill_hex="F1F5F9", bold=True, font_size=10, color=PRIMARY_COLOR)
        set_cell_styling(c1, fill_hex="FFFFFF", bold=False, font_size=10, color=TEXT_COLOR)

    # Add space
    sp = doc.add_paragraph()
    style_paragraph(sp, space_before=0, space_after=8)

    # =========================================================================
    # PHẦN 1: TÊN ĐỀ TÀI
    # =========================================================================
    add_h1("PHẦN 1: TÊN ĐỀ TÀI & BỐI CẢNH DỰ ÁN")

    add_h2("1.1. Tên Đề Tài Chính Thức")
    add_bullet(" Xây dựng Hệ thống Quản lý và Đặt sân Thể thao Trực tuyến Toàn diện (SportBooking).", "Tên tiếng Việt:")
    add_bullet(" Comprehensive Sports Court Management and Online Booking System.", "Tên tiếng Anh:")
    add_bullet(" SportBooking Platform.", "Tên thương hiệu / Viết tắt:")
    add_bullet(" Ứng dụng Web toàn diện (Fullstack Web Application), chuyển đổi số trong quản lý dịch vụ thể thao & giải trí.", "Lĩnh vực nghiên cứu & ứng dụng:")

    add_h2("1.2. Tính Cấp Thiết & Lý Do Chọn Đề Tài")
    add_body(
        "Tại các đô thị lớn hiện nay, phong trào rèn luyện sức khỏe thông qua các môn thể thao đối kháng và đồng đội như "
        "Bóng đá mini, Cầu lông, Tennis, Pickleball, Bóng rổ, Bóng chuyền đang bùng nổ mạnh mẽ. Tuy nhiên, quy trình quản lý "
        "và vận hành của phần lớn các trung tâm và cụm sân thể thao hiện nay vẫn phụ thuộc nhiều vào các phương thức truyền thống:"
    )
    add_bullet(" Giao dịch đặt sân thực hiện qua tin nhắn Zalo, Facebook hoặc gọi điện thủ công, ghi chép sổ sách hoặc Excel rời rạc.", "Quy trình đặt sân thủ công:")
    add_bullet(" Dễ phát sinh tình trạng hai khách hàng cùng đặt một sân trong cùng một khung giờ (Booking Collision), gây bức xúc và mất uy tín kinh doanh.", "Xung đột lịch sân (Conflict):")
    add_bullet(" Chủ cụm sân khó nắm bắt kịp thời nhân sự trực tại các sân, tình trạng đi muộn về sớm, chấm công không chuẩn xác, dẫn đến sai lệch khi tính lương.", "Quản lý nhân sự & chấm công phân tán:")
    add_bullet(" Ban quản lý thiếu các biểu đồ thống kê trực quan về doanh thu theo tháng, tỷ trọng đặt sân theo môn thể thao để ra quyết định đầu tư hay nâng cấp cơ sở vật chất.", "Thiếu hụt dữ liệu phân tích:")

    add_callout(
        "Đề tài 'SportBooking' được ra đời nhằm mục tiêu xây dựng một nền tảng chuyển đổi số toàn diện, kết nối liền mạch giữa "
        "Khách hàng (người chơi) và Ban điều hành trung tâm thể thao (Chủ sân, Quản lý, Nhân viên). Hệ thống không chỉ dừng lại "
        "ở giao diện thương mại điện tử đặt lịch, mà còn tích hợp trọn vẹn giải pháp quản trị doanh nghiệp (ERP thu nhỏ) bao gồm "
        "phân ca làm việc, chấm công QR Code kèm Audit Log, phê duyệt nghỉ phép và tính bảng lương tự động.",
        title="Ý Nghĩa Thực Tiễn Của Đề Tài"
    )

    add_h2("1.3. Mục Tiêu Của Dự Án")
    add_bullet(" Cung cấp cổng thông tin tra cứu sân trực quan với bộ lọc đa tiêu chí (môn thể thao, vị trí quận huyện, mức giá, tiện ích), xem slot giờ theo thời gian thực và đặt sân tự động hóa 100%.", "Mục tiêu đối với Khách hàng:")
    add_bullet(" Giải quyết triệt để bài toán chống trùng lịch (Anti-collision Time Overlap) ở tầng Backend, đảm bảo không bao giờ xảy ra tình trạng trùng giờ trên cùng một sân.", "Mục tiêu nghiệp vụ cốt lõi:")
    add_bullet(" Tự động hóa quy trình phân ca, chấm công vào/ra (hỗ trợ mã QR động có hạn dùng), tính công thực tế và tính bảng lương theo ngày công chuẩn.", "Mục tiêu đối với Nhân sự:")
    add_bullet(" Cung cấp Dashboard điều hành trực quan với các biểu đồ thống kê KPI thời gian thực giúp tối ưu hóa hiệu suất khai thác sân bãi.", "Mục tiêu đối với Quản lý & Admin:")

    # =========================================================================
    # PHẦN 2: PHẠM VI DỰ ÁN
    # =========================================================================
    add_h1("PHẦN 2: PHẠM VI DỰ ÁN (PROJECT SCOPE)")

    add_h2("2.1. Phạm Vi Người Dùng & Đối Tượng Tác Nhân (Actors & RBAC)")
    add_body("Hệ thống xây dựng mô hình phân quyền chặt chẽ dựa trên vai trò (Role-Based Access Control - RBAC) với 4 nhóm tác nhân chính:")

    # Table of Roles
    role_table = doc.add_table(rows=5, cols=3)
    role_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    headers = ["Vai trò (Role)", "Đối tượng mục tiêu", "Quyền hạn & Trách nhiệm chính"]
    for i, h in enumerate(headers):
        cell = role_table.cell(0, i)
        cell.paragraphs[0].text = h
        set_cell_styling(cell, fill_hex="1E3A8A", bold=True, font_size=10, color=RGBColor(255, 255, 255))

    role_data = [
        ("Khách hàng\n(Customer)", "Người chơi thể thao có nhu cầu thuê sân bãi tập luyện và thi đấu.", "Đăng ký/đăng nhập, tìm kiếm sân, xem slot giờ trống theo ngày, đặt sân online, xem vé QR Code, hủy đơn đặt, đánh giá sân (Review)."),
        ("Nhân viên\n(Staff)", "Nhân viên trực vận hành tại các sân bóng, nhà thi đấu.", "Xem lịch ca trực được phân công, thực hiện chấm công vào/ra trực quan, quét mã QR sân để xác nhận có mặt, gửi đơn xin nghỉ phép."),
        ("Quản lý\n(Manager)", "Quản lý chi nhánh cụm sân thể thao.", "Quản lý danh mục sân, xếp lịch phân ca cho nhân viên, giám sát bảng chấm công, phê duyệt đơn nghỉ phép, tạo mã QR check-in cho sân, theo dõi booking."),
        ("Quản trị viên\n(Admin)", "Chủ doanh nghiệp / Ban giám đốc điều hành hệ thống.", "Toàn quyền quản trị: Quản lý người dùng & nhân sự, can thiệp hiệu chỉnh chấm công kèm Audit Log bắt buộc, tính & duyệt bảng lương, xem Dashboard báo cáo Recharts.")
    ]
    for r_idx, (r, o, p) in enumerate(role_data, start=1):
        c0 = role_table.cell(r_idx, 0)
        c1 = role_table.cell(r_idx, 1)
        c2 = role_table.cell(r_idx, 2)
        c0.width = Inches(1.3)
        c1.width = Inches(1.7)
        c2.width = Inches(3.47)
        c0.paragraphs[0].text = r
        c1.paragraphs[0].text = o
        c2.paragraphs[0].text = p
        fill = "F8FAFC" if r_idx % 2 == 1 else "FFFFFF"
        set_cell_styling(c0, fill_hex=fill, bold=True, font_size=9.5, color=PRIMARY_COLOR)
        set_cell_styling(c1, fill_hex=fill, bold=False, font_size=9.5, color=TEXT_COLOR)
        set_cell_styling(c2, fill_hex=fill, bold=False, font_size=9.5, color=TEXT_COLOR)

    sp2 = doc.add_paragraph()
    style_paragraph(sp2, space_before=0, space_after=6)

    add_h2("2.2. Phạm Vi Phân Hệ Chức Năng (Functional Scope)")
    add_body("Hệ thống bao gồm 5 phân hệ chức năng nghiệp vụ trọng tâm:")

    add_h3("Phân hệ 1: Xác thực & Quản lý Tài khoản (Authentication & RBAC)")
    add_bullet(" Đăng ký tài khoản khách hàng mới, đăng nhập stateless cấp phát JWT Token (thời hạn 7 ngày).")
    add_bullet(" Mã hóa mật khẩu bảo mật một chiều với bcrypt (salt 10 rounds).")
    add_bullet(" Xem và cập nhật thông tin cá nhân (họ tên, số điện thoại, avatar), đổi mật khẩu.")
    add_bullet(" Quản trị viên cấp tài khoản nhân viên (kèm mật khẩu khởi tạo tạm), quản lý trạng thái kích hoạt/khóa tài khoản.")

    add_h3("Phân hệ 2: Quản lý Sân & Đặt sân Chống trùng lịch (Booking Engine)")
    add_bullet(" Quản lý 6 bộ môn thể thao phổ biến: Bóng đá (sân 5, 7), Cầu lông, Tennis, Pickleball, Bóng rổ, Bóng chuyền.")
    add_bullet(" Bộ lọc tìm kiếm thông minh: lọc theo môn thể thao, vị trí quận huyện, mức giá/giờ và các tiện ích (Wifi, phòng tắm, đèn LED, điều hòa, chỗ đỗ xe).")
    add_bullet(" Xem chi tiết sân, thư viện ảnh và sơ đồ slot bận/trống trực quan theo từng ngày lựa chọn.")
    add_bullet(" Thuật toán chống trùng lịch (Anti-collision Time Overlap): Ngăn chặn 100% tình trạng trùng giờ ở tầng Backend bằng kiểm tra giao thoa khoảng thời gian max(newStart, existStart) < min(newEnd, existEnd).")
    add_bullet(" Sinh mã vé tự động (BK-YYYYMMDD-XXXX), vé điện tử QR Code và quy trình hủy đơn hoàn tiền mô phỏng.")
    add_bullet(" Đánh giá & xếp hạng (Review & Rating 1-5 sao) dành riêng cho các đơn đặt sân đã hoàn thành.")

    add_h3("Phân hệ 3: Quản lý Ca trực, Phân ca & Chấm công QR, Audit Log (Attendance Module)")
    add_bullet(" Quản lý danh mục ca làm việc (Shifts): Giờ bắt đầu, giờ kết thúc, giờ nghỉ giữa ca, thời gian ân hạn trễ (gracePeriod tính bằng phút).")
    add_bullet(" Phân ca làm việc (Work Schedules): Phân công nhân viên theo ngày và sân; kiểm tra unique không phân trùng ca cùng ngày cho 1 nhân sự.")
    add_bullet(" Chấm công Vào/Ra trực quan: Nút bấm thời gian thực, tự động gắn cờ đi muộn ('late') hoặc đúng giờ ('present').")
    add_bullet(" Chấm công bằng mã QR động: Quản lý tạo mã QR token cho từng sân (có thời hạn 120 phút), nhân viên quét mã để chứng minh có mặt tại sân.")
    add_bullet(" Tự động tính tổng giờ làm việc thực tế (workHours) trừ đi thời gian nghỉ giải lao.")
    add_bullet(" Cơ chế Kiểm toán Audit Log: Mọi can thiệp sửa đổi chấm công của Admin/Manager bắt buộc phải nhập lý do và được lưu vết trong collection attendance_logs.")

    add_h3("Phân hệ 4: Quản lý Đơn xin Nghỉ phép (Leave Request Workflow)")
    add_bullet(" Nhân viên gửi đơn nghỉ trực tuyến với 4 loại phép: Nghỉ phép năm, Ốm đau, Việc riêng, Nghỉ không lương.")
    add_bullet(" Thuật toán kiểm tra hợp lệ khoảng ngày và tự động chặn gửi đơn nếu đã có đơn khác trùng thời gian.")
    add_bullet(" Quản lý / Admin tiếp nhận danh sách đơn chờ duyệt, thực hiện Phê duyệt (Approve) hoặc Từ chối (Reject) kèm lý do phản hồi.")
    add_bullet(" Tự động liên kết dữ liệu nghỉ phép vào thống kê chuyên cần tháng của nhân sự.")

    add_h3("Phân hệ 5: Tính Bảng lương Tự động & Báo cáo Thống kê Dashboard (Payroll & Analytics)")
    add_bullet(" Tự động truy vấn số ngày công và giờ làm việc thực tế từ bảng chấm công trong tháng.")
    add_bullet(" Áp dụng công thức tính lương chuẩn 26 ngày công: workPay = round((baseSalary / 26) * totalWorkDays) + allowance + overtimePay - deduction.")
    add_bullet(" Quản lý vòng đời bảng lương: Bản nháp ('draft') -> Đã duyệt ('approved') -> Đã chi trả ('paid').")
    add_bullet(" Dashboard trực quan cho Admin với 4 biểu đồ Recharts thời gian thực:")
    add_bullet("   • AreaChart: Biểu đồ doanh thu 6 tháng gần nhất.")
    add_bullet("   • LineChart: Lượng booking theo từng tháng.")
    add_bullet("   • BarChart: Phân bố lượt đặt sân theo bộ môn thể thao.")
    add_bullet("   • PieChart: Tỷ lệ nhân sự theo phòng ban.")

    add_h2("2.3. Phạm Vi Dữ Liệu (Database Schema Scope)")
    add_body("Cơ sở dữ liệu MongoDB được thiết kế chuẩn hóa với 12 Collections chuyên biệt:")
    add_bullet(" User, Court, Booking, Review (Phục vụ khách hàng và vận hành sân).", "Khối Dịch vụ & Đặt sân:")
    add_bullet(" Employee, Shift, WorkSchedule, Attendance, AttendanceLog, LeaveRequest, Payroll, QrToken (Phục vụ nhân sự & quản trị).", "Khối Quản trị Doanh nghiệp:")
    add_bullet(" Bộ dữ liệu mẫu phong phú tiếng Việt: 1 Admin, 2 Managers, 5 Staff, 10 Customers, 20 sân thể thao kèm ảnh thực tế, 30 bookings, 30 reviews, ca làm và bảng lương.", "Dữ liệu mẫu (Seed Data):")

    add_h2("2.4. Giới Hạn Triển Khai Trong Giai Đoạn Này (Out of Scope)")
    add_body("Để đảm bảo tính khả thi và tập trung vào chất lượng của các tính năng cốt lõi, một số phạm vi sau được quy hoạch cho các giai đoạn tiếp theo:")
    add_bullet(" Chưa kết nối cổng thanh toán ngân hàng trực tiếp có thu phí thật (hiện sử dụng cơ chế thanh toán mô phỏng Sandbox).")
    add_bullet(" Chưa tích hợp thiết bị phần cứng máy quét vân tay tại sân (sử dụng giải pháp Web Token QR động thay thế).")
    add_bullet(" Chưa phát triển ứng dụng di động độc lập (Native App) trên kho ứng dụng App Store/Google Play (hệ thống hiện tại đáp ứng chuẩn Responsive Web mượt mà trên trình duyệt Mobile).")

    # =========================================================================
    # PHẦN 3: CÔNG NGHỆ DỰ KIẾN
    # =========================================================================
    add_h1("PHẦN 3: CÔNG NGHỆ DỰ KIẾN (TECHNOLOGY STACK & ARCHITECTURE)")

    add_h2("3.1. Kiến Trúc Tổng Thể Hệ Thống")
    add_body(
        "Hệ thống SportBooking áp dụng mô hình Kiến trúc Phân tầng chuẩn doanh nghiệp (Layered Architecture), "
        "tách biệt hoàn toàn giữa tầng Giao diện (Client-side Single Page Application) và tầng Xử lý Nghiệp vụ (Server-side RESTful API):"
    )
    
    add_callout(
        "GIAO DIỆN (Frontend SPA)\n"
        "   React 18 + TypeScript + Vite + Tailwind CSS + React Router + Recharts\n"
        "          │\n"
        "          │  HTTP / HTTPS RESTful API (JSON Body, Bearer JWT Header)\n"
        "          ▼\n"
        "MÁY CHỦ DỊCH VỤ (Backend API Server)\n"
        "   Node.js (v20+ LTS) + Express.js + TypeScript\n"
        "   ├── Middleware: CORS, Helmet, RateLimit, Auth JWT, RBAC Guard, Zod Validator\n"
        "   ├── Controller Layer: Tiếp nhận Request, định dạng Response chuẩn { success, data, message }\n"
        "   ├── Service Layer: Thuật toán chống trùng lịch, tính công, tính lương, ghi Audit Log\n"
        "   └── Data Access Layer: Mongoose ODM (Schema, Compound Indexes, Hooks)\n"
        "          │\n"
        "          ▼\n"
        "CƠ SỞ DỮ LIỆU (Database Server)\n"
        "   MongoDB (NoSQL Document Store, 12 Collections)",
        title="Sơ Đồ Luồng Kiến Trúc Kỹ Thuật"
    )

    add_h2("3.2. Chi Tiết Công Nghệ Frontend (Client-side)")
    add_bullet(" Thư viện UI hiện đại bậc nhất, xây dựng giao diện dựa trên Component tái sử dụng cao, cơ chế Virtual DOM giúp render cực nhanh.", "React 18:")
    add_bullet(" Đảm bảo an toàn kiểu dữ liệu (Type Safety) ngay trong quá trình lập trình, ngăn chặn lỗi runtime, tăng tốc độ refactor code.", "TypeScript 5.x:")
    add_bullet(" Công cụ đóng gói (Build Tool) thế hệ mới thay thế Webpack, hỗ trợ Hot Module Replacement (HMR) tính bằng mili-giây.", "Vite 6:")
    add_bullet(" Framework CSS Utility-First, mang lại giao diện thể thao năng động, tối ưu 100% Responsive cho Desktop, Tablet và Mobile.", "Tailwind CSS 3:")
    add_bullet(" Thư viện điều hướng trang đơn (SPA Routing), hỗ trợ cơ chế Protected Route phân quyền truy cập theo vai trò (RBAC).", "React Router 7:")
    add_bullet(" HTTP Client mạnh mẽ, cấu hình Interceptor tự động gắn JWT Bearer Token vào header và xử lý bắt lỗi tập trung.", "Axios:")
    add_bullet(" Bộ thư viện biểu đồ trực quan hóa dữ liệu (Area, Line, Bar, Pie) cho Dashboard của Ban Quản trị.", "Recharts:")
    add_bullet(" Bộ icon SVG giao diện thể thao hiện đại, đồng bộ và tinh gọn.", "Lucide React:")

    add_h2("3.3. Chi Tiết Công Nghệ Backend (Server-side)")
    add_bullet(" Môi trường thực thi JavaScript bất đồng bộ hiệu năng cao (Non-blocking I/O), xử lý đồng thời hàng ngàn kết nối đặt sân nhẹ nhàng.", "Node.js (v20+ LTS):")
    add_bullet(" Web Framework tối giản, ổn định và linh hoạt hàng đầu cho hệ sinh thái Node.js.", "Express.js 4.21+:")
    add_bullet(" Áp dụng chặt chẽ cho toàn bộ Controllers, Services, Models, đảm bảo tính nhất quán giữa DTOs đầu vào và Entities.", "TypeScript:")
    add_bullet(" Thư viện ODM (Object Data Modeling) mạnh mẽ cho MongoDB, quản lý Schema, Validation, Hooks và Compound Indexing tối ưu truy vấn.", "Mongoose ODM 8.9+:")
    add_bullet(" Cơ chế xác thực người dùng không trạng thái (Stateless Authentication), mã hóa token chứa userId, email, role.", "JSON Web Token (JWT):")
    add_bullet(" Thuật toán băm mật khẩu một chiều an toàn kết hợp muối ngẫu nhiên (salt 10 vòng).", "bcryptjs:")
    add_bullet(" Thư viện xác thực dữ liệu đầu vào (Input Validation & Schema declaration) chặt chẽ trước khi đi vào tầng Service.", "Zod 3.24+:")
    add_bullet(" Bộ đôi bảo mật thiết lập HTTP Security Headers và kiểm soát chia sẻ tài nguyên nguồn gốc chéo an toàn.", "Helmet 8 & CORS:")
    add_bullet(" Giới hạn tần suất gửi request từ một địa chỉ IP, phòng ngừa tấn công Brute-force mật khẩu và DoS.", "Express Rate Limit:")
    add_bullet(" Thư viện sinh mã QR Code động dưới dạng DataURL phục vụ quy trình check-in chấm công tại sân.", "QRCode:")

    add_h2("3.4. Hệ Quản Trị Cơ Sở Dữ Liệu (Database)")
    add_bullet(" Hệ quản trị CSDL NoSQL hướng tài liệu (Document Database), lưu trữ linh hoạt dưới định dạng BSON, dễ dàng mở rộng và phân tán.", "MongoDB (v6.0+ / v7.0+):")
    add_bullet(" Thiết lập Compound Indexes trên các trường thường xuyên lọc như { court: 1, date: 1, status: 1 } và { employee: 1, date: 1 } giúp các thao tác kiểm tra trùng lịch đạt tốc độ mili-giây ngay cả khi lượng booking lên đến hàng trăm ngàn bản ghi.", "Chiến lược Đánh Chỉ Mục (Indexing):")

    add_h2("3.5. Kiểm Thử Tự Động & Công Cụ Phát Triển")
    add_bullet(" Bộ khung kiểm thử tích hợp tự động cho Backend (Integration Tests) kiểm tra các luồng xác thực, chống trùng lịch và Audit Log.", "Jest & Supertest:")
    add_bullet(" Quản lý phiên bản mã nguồn, nhánh phát triển (Branching strategy).", "Git & GitHub:")
    add_bullet(" Môi trường phát triển tích hợp (IDE) chính với các extension Tailwind IntelliSense, ESLint, TypeScript.", "Visual Studio Code:")
    add_bullet(" Công cụ kiểm thử các Endpoint RESTful API độc lập.", "Postman / Thunder Client:")

    add_h2("3.6. Bảng Tổng Hợp Công Nghệ Dự Kiến")

    # Table of Tech Stack
    tech_table = doc.add_table(rows=7, cols=3)
    tech_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_headers = ["Tầng công nghệ (Layer)", "Công nghệ sử dụng", "Mục đích & Lý do lựa chọn"]
    for i, h in enumerate(t_headers):
        cell = tech_table.cell(0, i)
        cell.paragraphs[0].text = h
        set_cell_styling(cell, fill_hex="1E3A8A", bold=True, font_size=10, color=RGBColor(255, 255, 255))

    tech_data = [
        ("Giao diện (Frontend)", "React 18, TypeScript, Vite 6, Tailwind CSS 3", "Xây dựng Single Page App hiện đại, tải trang siêu tốc, responsive đa thiết bị."),
        ("Điều hướng & Biểu đồ", "React Router 7, Recharts, Lucide React", "Bảo vệ route theo quyền RBAC, hiển thị 4 biểu đồ thống kê KPI thời gian thực."),
        ("Máy chủ (Backend API)", "Node.js (v20+), Express.js, TypeScript", "Xử lý nghiệp vụ tập trung, I/O bất đồng bộ hiệu năng cao, cấu trúc module rõ ràng."),
        ("Bảo mật & Xác thực", "JWT, bcryptjs, Helmet, CORS, Rate Limit", "Xác thực phiên stateless, mã hóa mật khẩu an toàn, chống tấn công dò quét."),
        ("Cơ sở Dữ liệu", "MongoDB 7.0+, Mongoose ODM 8.9+", "Lưu trữ tài liệu JSON/BSON linh hoạt, đánh chỉ mục kép chống xung đột lịch."),
        ("Kiểm thử & Đóng gói", "Jest, Supertest, ts-node-dev, tsc", "Kiểm thử tự động logic nghiệp vụ, biên dịch mã nguồn sẵn sàng cho Production.")
    ]
    for r_idx, (layer, tech, purpose) in enumerate(tech_data, start=1):
        c0 = tech_table.cell(r_idx, 0)
        c1 = tech_table.cell(r_idx, 1)
        c2 = tech_table.cell(r_idx, 2)
        c0.width = Inches(1.5)
        c1.width = Inches(2.2)
        c2.width = Inches(2.77)
        c0.paragraphs[0].text = layer
        c1.paragraphs[0].text = tech
        c2.paragraphs[0].text = purpose
        fill = "F8FAFC" if r_idx % 2 == 1 else "FFFFFF"
        set_cell_styling(c0, fill_hex=fill, bold=True, font_size=9.5, color=PRIMARY_COLOR)
        set_cell_styling(c1, fill_hex=fill, bold=True, font_size=9.5, color=SECONDARY_COLOR)
        set_cell_styling(c2, fill_hex=fill, bold=False, font_size=9.5, color=TEXT_COLOR)

    sp3 = doc.add_paragraph()
    style_paragraph(sp3, space_before=6, space_after=12)

    # --- KẾT LUẬN / KÝ DUYỆT ---
    add_h1("PHẦN 4: KẾT LUẬN & ĐÁNH GIÁ TÍNH KHẢ THI")
    add_body(
        "Đề tài **SportBooking** được thiết kế với phạm vi chức năng rõ ràng, giải quyết triệt để các bài toán thực tế "
        "trong ngành quản lý vận hành dịch vụ thể thao. Bộ công nghệ dự kiến (MERN Stack + TypeScript + Tailwind) là lựa chọn "
        "hiện đại, có cộng đồng phát triển rộng lớn, độ ổn định cao và sẵn sàng đáp ứng yêu cầu triển khai thực tế trên môi trường Production."
    )
    add_body(
        "Toàn bộ mã nguồn, kiến trúc cơ sở dữ liệu và các kịch bản kiểm thử đã được hiện thực hóa và đóng gói hoàn chỉnh, "
        "đảm bảo tính khả thi 100% trong quá trình bảo vệ đề tài và đưa vào ứng dụng thực tiễn."
    )

    # Output paths
    root_path = os.path.join(os.path.dirname(__file__), "..", "De_Tai_SportBooking.docx")
    docs_path = os.path.join(os.path.dirname(__file__), "..", "docs", "De_Tai_SportBooking.docx")
    
    os.makedirs(os.path.dirname(docs_path), exist_ok=True)
    
    doc.save(root_path)
    doc.save(docs_path)
    print(f"Document created successfully at:\n- {os.path.abspath(root_path)}\n- {os.path.abspath(docs_path)}")

if __name__ == "__main__":
    create_document()
