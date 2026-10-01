# -*- coding: utf-8 -*-
"""
Script chính biên soạn và tạo tệp Báo cáo Đồ án tốt nghiệp / Báo cáo Tổng hợp SportBooking (.docx)
Tuân thủ tuyệt đối mọi quy chuẩn kỹ thuật:
- Font: Times New Roman, Unicode, Cỡ chữ 14.
- Lề: Trái 3cm, Phải 2cm, Trên 2cm, Dưới 2cm.
- Dãn dòng: Multiple 1.3, Căn đều hai bên (Justify), Đầu dòng lùi 1.27cm.
- Tiêu đề chương: In đậm, in hoa, cỡ 15, căn giữa, sang trang mới.
- Mục cấp 2: In đậm, cỡ 14, căn trái, không thụt đầu dòng.
- Mục cấp 3: In đậm, nghiêng, cỡ 14, căn trái.
- Mục cấp 4: Nghiêng, cỡ 14, căn trái.
- Tên bảng: ĐẶT PHÍA TRÊN BẢNG.
- Tên hình: ĐẶT PHÍA DƯỚI HÌNH.
- Đánh số trang: Bắt đầu từ phần MỞ ĐẦU tại chân trang (footer), căn giữa, bắt đầu từ số 1.
- Không có nội dung text ở header/footer.
- Độ dài từ Mở đầu đến Kết luận >= 50 trang.
"""

import os
import sys
import io

if sys.stdout.encoding != 'utf-8':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
if sys.stderr.encoding != 'utf-8':
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

import docx
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.enum.section import WD_SECTION_START
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import qn, nsdecls

import report_data
import chapter_intro
import chapter_1
import chapter_2
import chapter_3
import chapter_conclusion

def create_full_report():
    print("=== BẮT ĐẦU TẠO BÁO CÁO TỔNG HỢP SPORTBOOKING ===")
    doc = docx.Document()

    # 1. Cấu hình kiểu mặc định (Normal Style)
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Times New Roman'
    font.size = Pt(14)
    font.color.rgb = RGBColor(0x0F, 0x17, 0x2A) # Dark slate
    style.paragraph_format.line_spacing = 1.3
    style.paragraph_format.space_after = Pt(6)
    style.paragraph_format.space_before = Pt(0)
    style.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    style.paragraph_format.first_line_indent = Cm(1.27)

    # 2. Cấu hình Section 1: Trang bìa, Lời cam đoan, Mục lục, Danh mục
    s1 = doc.sections[0]
    s1.top_margin = Cm(2.0)
    s1.bottom_margin = Cm(2.0)
    s1.left_margin = Cm(3.0)
    s1.right_margin = Cm(2.0)
    s1.header.is_linked_to_previous = False
    s1.footer.is_linked_to_previous = False

    # Hàm trợ giúp thêm đoạn văn bản thường
    def add_p(text, bold_prefix=None, indent=True, space_after=6):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p.paragraph_format.line_spacing = 1.3
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.first_line_indent = Cm(1.27) if indent else Cm(0)
        
        if bold_prefix:
            r_pre = p.add_run(bold_prefix)
            r_pre.bold = True
            r_pre.font.name = 'Times New Roman'
            r_pre.font.size = Pt(14)
        
        r_txt = p.add_run(text)
        r_txt.font.name = 'Times New Roman'
        r_txt.font.size = Pt(14)
        return p

    def add_chapter_title(text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.line_spacing = 1.3
        p.paragraph_format.space_before = Pt(18)
        p.paragraph_format.space_after = Pt(14)
        p.paragraph_format.first_line_indent = Cm(0)
        p.paragraph_format.page_break_before = True
        run = p.add_run(text)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(15)
        run.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A) # Navy blue
        return p

    def add_h2(text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.line_spacing = 1.3
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.first_line_indent = Cm(0)
        run = p.add_run(text)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(14)
        run.font.color.rgb = RGBColor(0x0F, 0x17, 0x2A)
        return p

    def add_h3(text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.line_spacing = 1.3
        p.paragraph_format.space_before = Pt(10)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.first_line_indent = Cm(0)
        run = p.add_run(text)
        run.bold = True
        run.italic = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(14)
        return p

    def add_h4(text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.line_spacing = 1.3
        p.paragraph_format.space_before = Pt(8)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.first_line_indent = Cm(0)
        run = p.add_run(text)
        run.italic = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(14)
        return p

    def add_code_block(code_text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.line_spacing = 1.15
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(8)
        p.paragraph_format.first_line_indent = Cm(0.6)
        run = p.add_run(code_text)
        run.font.name = 'Consolas'
        run.font.size = Pt(10.5)
        run.font.color.rgb = RGBColor(0x1E, 0x29, 0x3B)
        return p

    def add_figure(img_path, caption_text):
        if os.path.exists(img_path):
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_img.paragraph_format.space_before = Pt(10)
            p_img.paragraph_format.space_after = Pt(4)
            p_img.paragraph_format.first_line_indent = Cm(0)
            run = p_img.add_run()
            run.add_picture(img_path, width=Cm(15.5))
        else:
            print(f"[CẢNH BÁO] Không tìm thấy ảnh: {img_path}")

        # Tên hình ĐẶT PHÍA DƯỚI HÌNH
        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(4)
        p_cap.paragraph_format.space_after = Pt(14)
        p_cap.paragraph_format.first_line_indent = Cm(0)
        
        # Tách Hình X.Y: và Tên hình
        parts = caption_text.split(":", 1)
        r1 = p_cap.add_run(parts[0] + ":")
        r1.bold = True
        r1.font.name = 'Times New Roman'
        r1.font.size = Pt(12)
        if len(parts) > 1:
            r2 = p_cap.add_run(parts[1])
            r2.italic = True
            r2.font.name = 'Times New Roman'
            r2.font.size = Pt(12)

    def add_custom_table(caption_text, headers, rows, col_widths=None):
        # Tên bảng ĐẶT PHÍA TRÊN BẢNG
        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(12)
        p_cap.paragraph_format.space_after = Pt(4)
        p_cap.paragraph_format.first_line_indent = Cm(0)

        parts = caption_text.split(":", 1)
        r1 = p_cap.add_run(parts[0] + ":")
        r1.bold = True
        r1.font.name = 'Times New Roman'
        r1.font.size = Pt(12)
        if len(parts) > 1:
            r2 = p_cap.add_run(parts[1])
            r2.italic = True
            r2.font.name = 'Times New Roman'
            r2.font.size = Pt(12)

        # Tạo bảng
        tbl = doc.add_table(rows=len(rows) + 1, cols=len(headers))
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        tbl.style = 'Table Grid'

        # Lặp lại tiêu đề bảng khi sang trang
        header_tr = tbl.rows[0]._tr.get_or_add_trPr()
        header_tr.append(parse_xml(r'<w:tblHeader {}/>'.format(nsdecls('w'))))

        # Định dạng Header
        for c_idx, head in enumerate(headers):
            cell = tbl.cell(0, c_idx)
            cell.text = head
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_after = Pt(2)
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.first_line_indent = Cm(0)
            p.paragraph_format.line_spacing = 1.15
            for r in p.runs:
                r.bold = True
                r.font.name = 'Times New Roman'
                r.font.size = Pt(11.5)
            # Nền header xanh nhạt
            shd = parse_xml(r'<w:shd {} w:fill="DBEAFE"/>'.format(nsdecls('w')))
            cell._tc.get_or_add_tcPr().append(shd)

        # Định dạng các dòng dữ liệu
        for r_idx, row_data in enumerate(rows):
            trPr = tbl.rows[r_idx + 1]._tr.get_or_add_trPr()
            trPr.append(parse_xml(r'<w:cantSplit {}/>'.format(nsdecls('w'))))

            for c_idx, val in enumerate(row_data):
                cell = tbl.cell(r_idx + 1, c_idx)
                cell.text = str(val)
                p = cell.paragraphs[0]
                p.paragraph_format.space_after = Pt(2)
                p.paragraph_format.space_before = Pt(2)
                p.paragraph_format.first_line_indent = Cm(0)
                p.paragraph_format.line_spacing = 1.15
                # Căn trái đối với cột mô tả, căn giữa đối với mã/stt
                if c_idx == 0 and len(str(val)) < 20:
                    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                else:
                    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
                for r in p.runs:
                    r.font.name = 'Times New Roman'
                    r.font.size = Pt(11)

        # Padding ô
        for row in tbl.rows:
            for cell in row.cells:
                tcPr = cell._tc.get_or_add_tcPr()
                tcMar = parse_xml(r'<w:tcMar {}><w:top w:w="120" w:type="dxa"/><w:bottom w:w="120" w:type="dxa"/><w:left w:w="160" w:type="dxa"/><w:right w:w="160" w:type="dxa"/></w:tcMar>'.format(nsdecls('w')))
                tcPr.append(tcMar)

        # Áp dụng độ rộng cột nếu có
        if col_widths and len(col_widths) == len(headers):
            for row in tbl.rows:
                for c_idx, w in enumerate(col_widths):
                    row.cells[c_idx].width = Cm(w)

        # Khoảng cách sau bảng
        p_space = doc.add_paragraph()
        p_space.paragraph_format.space_before = Pt(0)
        p_space.paragraph_format.space_after = Pt(6)
        p_space.paragraph_format.first_line_indent = Cm(0)

    # ==================== TRANG BÌA CHÍNH ====================
    print("-> Đang tạo Trang bìa chính...")
    p_u = doc.add_paragraph()
    p_u.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_u.paragraph_format.line_spacing = 1.2
    p_u.paragraph_format.first_line_indent = Cm(0)
    p_u.paragraph_format.space_after = Pt(2)
    r = p_u.add_run(report_data.UNIVERSITY_NAME + "\n")
    r.bold = True
    r.font.size = Pt(14)
    r = p_u.add_run(report_data.DEPARTMENT_NAME)
    r.bold = True
    r.font.size = Pt(13)

    p_div = doc.add_paragraph()
    p_div.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_div.paragraph_format.first_line_indent = Cm(0)
    p_div.paragraph_format.space_after = Pt(80)
    r_div = p_div.add_run("-------------------***-------------------")
    r_div.bold = True

    p_rep = doc.add_paragraph()
    p_rep.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_rep.paragraph_format.first_line_indent = Cm(0)
    p_rep.paragraph_format.space_after = Pt(20)
    r_rep = p_rep.add_run("BÁO CÁO ĐỒ ÁN CHUYÊN NGÀNH / ĐỒ ÁN TỐT NGHIỆP\nNGÀNH CÔNG NGHỆ THÔNG TIN")
    r_rep.bold = True
    r_rep.font.size = Pt(16)
    r_rep.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)

    p_proj = doc.add_paragraph()
    p_proj.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_proj.paragraph_format.first_line_indent = Cm(0)
    p_proj.paragraph_format.space_after = Pt(80)
    r_proj = p_proj.add_run(report_data.PROJECT_NAME)
    r_proj.bold = True
    r_proj.font.size = Pt(18)
    r_proj.font.color.rgb = RGBColor(0x0F, 0x17, 0x2A)

    p_info = doc.add_paragraph()
    p_info.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p_info.paragraph_format.first_line_indent = Cm(4.0)
    p_info.paragraph_format.line_spacing = 1.3
    p_info.paragraph_format.space_after = Pt(80)
    r = p_info.add_run(f"{report_data.SUPERVISOR_NAME}\n{report_data.AUTHOR_NAME}\nChuyên ngành: Kỹ thuật Phần mềm & Hệ thống Thông tin\nKhóa học: 2021 - 2026")
    r.font.size = Pt(14)
    r.bold = True

    p_city = doc.add_paragraph()
    p_city.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_city.paragraph_format.first_line_indent = Cm(0)
    r = p_city.add_run(report_data.CITY_YEAR)
    r.bold = True
    r.font.size = Pt(14)

    # ==================== LỜI CAM ĐOAN ====================
    print("-> Đang tạo Lời cam đoan...")
    add_chapter_title("LỜI CAM ĐOAN")
    add_p(
        "Tôi xin cam đoan rằng toàn bộ nội dung, phân tích, thiết kế hệ thống, cơ sở dữ liệu và mã nguồn ứng dụng "
        "được trình bày trong Báo cáo Đồ án \"Xây dựng Hệ thống Quản lý và Đặt sân Thể thao Trực tuyến Toàn diện (SportBooking)\" "
        "là công trình nghiên cứu và thực nghiệm độc lập của cá nhân tôi dưới sự hướng dẫn khoa học tận tình của cán bộ hướng dẫn. "
        "Các số liệu khảo sát, hình vẽ thiết kế, mã nguồn kiểm thử và kết quả thực nghiệm hoàn toàn trung thực, "
        "được thu thập và kiểm chứng trực tiếp trên hệ thống đang chạy thực tế, không sao chép từ bất kỳ công trình nghiên cứu nào khác "
        "chưa được công bố hoặc trích dẫn hợp lệ."
    )
    add_p(
        "Mọi sự tham khảo từ các tài liệu khoa học, bài báo quốc tế, sách chuyên khảo, đặc tả tiêu chuẩn công nghiệp "
        "và các dự án mã nguồn mở đều được ghi chú nguồn gốc rõ ràng và trích dẫn theo đúng quy chuẩn học thuật trong "
        "phần Tài liệu tham khảo của báo cáo. Tôi hoàn toàn chịu trách nhiệm trước pháp luật, Nhà trường và Hội đồng chấm đồ án "
        "nếu có bất kỳ sự vi phạm nào về tính liêm chính học thuật."
    )
    
    p_sig = doc.add_paragraph()
    p_sig.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_sig.paragraph_format.first_line_indent = Cm(0)
    p_sig.paragraph_format.space_before = Pt(30)
    r = p_sig.add_run("Hà Nội, ngày 26 tháng 09 năm 2026\nSinh viên thực hiện\n\n\n\n")
    r.font.size = Pt(14)
    r = p_sig.add_run("Nguyễn Văn A")
    r.bold = True
    r.font.size = Pt(14)

    # ==================== LỜI CẢM ƠN ====================
    print("-> Đang tạo Lời cảm ơn...")
    add_chapter_title("LỜI CẢM ƠN")
    add_p(
        "Lời đầu tiên, em xin được bày tỏ lòng biết ơn sâu sắc và chân thành nhất tới Ban Giám hiệu Nhà trường, "
        "Ban Chủ nhiệm Khoa Công nghệ Thông tin cùng toàn thể các thầy cô giáo đã tận tình giảng dạy, truyền đạt "
        "những tri thức nền tảng vô cùng quý báu về Khoa học Máy tính, Kỹ thuật Phần mềm và Hệ thống Thông tin "
        "trong suốt quá trình học tập và rèn luyện của em tại trường."
    )
    add_p(
        "Đặc biệt, em xin gửi lời tri ân sâu sắc nhất tới Thầy/Cô Hướng dẫn khoa học – người đã luôn dành nhiều thời gian, "
        "tâm huyết, đưa ra những định hướng nghiên cứu chiến lược, góp ý tỉ mỉ về kiến trúc hệ thống và chỉ dẫn phương pháp luận "
        "nghiên cứu khoa học chuẩn mực để em có thể hoàn thành xuất sắc đồ án này."
    )
    add_p(
        "Em cũng xin gửi lời cảm ơn chân thành tới các anh chị quản lý và nhân viên tại các trung tâm thể thao mini "
        "đã nhiệt tình hỗ trợ, cung cấp thông tin khảo sát thực tế và tham gia thử nghiệm bản mẫu phần mềm. "
        "Cuối cùng, con xin gửi lời cảm ơn vô hạn tới gia đình, bạn bè đã luôn là điểm tựa tinh thần vững chắc, động viên "
        "và đồng hành cùng con trong suốt chặng đường học tập vừa qua."
    )

    # ==================== MỤC LỤC ====================
    print("-> Đang tạo Mục lục...")
    add_chapter_title("MỤC LỤC")
    
    # Đoạn mô tả mục lục và chèn trường TOC của Word
    p_toc_note = doc.add_paragraph()
    p_toc_note.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_toc_note.paragraph_format.first_line_indent = Cm(0)
    p_toc_note.paragraph_format.space_after = Pt(10)
    r = p_toc_note.add_run("Bảng Mục lục chi tiết toàn bộ các chương mục của Báo cáo Đồ án SportBooking:")
    r.italic = True
    r.font.size = Pt(13)

    # Bảng mục lục mô phỏng chi tiết để xem được ngay cả khi chưa bấm Update Field trong Word
    TOC_ITEMS = [
        ("LỜI CAM ĐOAN", "i"),
        ("LỜI CẢM ƠN", "ii"),
        ("MỤC LỤC", "iii"),
        ("DANH MỤC CÁC TỪ VIẾT TẮT", "iv"),
        ("DANH MỤC CÁC HÌNH VẼ", "v"),
        ("DANH MỤC CÁC BẢNG BIỂU", "vi"),
        ("MỞ ĐẦU", "1"),
        ("CHƯƠNG 1. TỔNG QUAN ĐỀ TÀI VÀ CƠ SỞ THỰC HIỆN", "4"),
        ("  1.1. Bài toán và lý do lựa chọn đề tài", "4"),
        ("  1.2. Mục tiêu của đề tài", "6"),
        ("  1.3. Đối tượng sử dụng, phạm vi và giới hạn của đề tài", "9"),
        ("  1.4. Dữ liệu đầu vào, đầu ra và các yêu cầu/ràng buộc chính", "11"),
        ("  1.5. Cơ sở lý thuyết, công nghệ và công cụ sử dụng", "13"),
        ("CHƯƠNG 2. PHÂN TÍCH VÀ THIẾT KẾ GIẢI PHÁP", "17"),
        ("  2.1. Phân tích yêu cầu và chức năng cốt lõi", "17"),
        ("  2.2. Use case hoặc luồng xử lý chính", "20"),
        ("    2.2.1. Biểu đồ Hoạt động (Activity Diagrams)", "27"),
        ("    2.2.2. Biểu đồ Tuần tự (Sequence Diagrams)", "29"),
        ("  2.3. Thiết kế kiến trúc hệ thống", "31"),
        ("  2.4. Thiết kế cơ sở dữ liệu", "33"),
        ("  2.5. Thiết kế giao diện, API và các thành phần kỹ thuật", "46"),
        ("CHƯƠNG 3. HIỆN THỰC, THỬ NGHIỆM VÀ ĐÁNH GIÁ KẾT QUẢ", "53"),
        ("  3.1. Môi trường triển khai và thực nghiệm", "53"),
        ("  3.2. Cài đặt và cấu hình hệ thống", "56"),
        ("  3.3. Hiện thực các chức năng cốt lõi", "57"),
        ("  3.4. Thử nghiệm và đánh giá kết quả", "61"),
        ("    3.4.1. Kịch bản kiểm thử chi tiết", "61"),
        ("    3.4.2. Kết quả thực thi kiểm thử và độ ổn định hệ thống", "65"),
        ("    3.4.3. Đánh giá hiệu năng và phân tích cải tiến kỹ thuật", "67"),
        ("  3.5. Tự đánh giá và bài học kinh nghiệm", "69"),
        ("KẾT LUẬN", "72"),
        ("TÀI LIỆU THAM KHẢO", "75"),
        ("PHỤ LỤC A. HƯỚNG DẪN CÀI ĐẶT VÀ KHỞI CHẠY HỆ THỐNG", "77"),
        ("PHỤ LỤC B. ĐẶC TẢ BIẾN MÔI TRƯỜNG HỆ THỐNG (.ENV)", "79"),
        ("PHỤ LỤC C. DANH SÁCH TÀI KHOẢN THỬ NGHIỆM HỆ THỐNG", "81")
    ]

    for title, page_str in TOC_ITEMS:
        p_item = doc.add_paragraph()
        p_item.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p_item.paragraph_format.line_spacing = 1.2
        p_item.paragraph_format.space_after = Pt(3)
        p_item.paragraph_format.first_line_indent = Cm(0)
        
        is_major = not title.startswith("  ")
        r_t = p_item.add_run(title)
        r_t.font.name = 'Times New Roman'
        r_t.font.size = Pt(13) if is_major else Pt(12)
        r_t.bold = is_major
        
        # Dấu chấm chấm nối
        dots_count = max(5, 75 - len(title) * 2)
        r_dots = p_item.add_run(" " + "." * dots_count + " ")
        r_dots.font.name = 'Times New Roman'
        r_dots.font.size = Pt(11)
        r_dots.font.color.rgb = RGBColor(0x94, 0xA3, 0xB8)
        
        r_p = p_item.add_run(page_str)
        r_p.font.name = 'Times New Roman'
        r_p.font.size = Pt(13) if is_major else Pt(12)
        r_p.bold = is_major

    # ==================== DANH MỤC TỪ VIẾT TẮT ====================
    print("-> Đang tạo Danh mục từ viết tắt...")
    add_chapter_title("DANH MỤC CÁC TỪ VIẾT TẮT")
    tbl_abbr = doc.add_table(rows=len(report_data.ABBREVIATIONS) + 1, cols=3)
    tbl_abbr.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_abbr.style = 'Table Grid'
    
    # Header
    hdr = tbl_abbr.rows[0]
    hdr_tr = hdr._tr.get_or_add_trPr()
    hdr_tr.append(parse_xml(r'<w:tblHeader {}/>'.format(nsdecls('w'))))
    for i, title in enumerate(["Từ viết tắt", "Thuật ngữ tiếng Anh (Full Name)", "Ý nghĩa giải thích tiếng Việt"]):
        cell = hdr.cells[i]
        cell.text = title
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(3)
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.first_line_indent = Cm(0)
        for r in p.runs:
            r.bold = True
            r.font.name = 'Times New Roman'
            r.font.size = Pt(11.5)
        shd = parse_xml(r'<w:shd {} w:fill="DBEAFE"/>'.format(nsdecls('w')))
        cell._tc.get_or_add_tcPr().append(shd)

    for idx, (abbr, en, vn) in enumerate(report_data.ABBREVIATIONS):
        row = tbl_abbr.rows[idx + 1]
        trPr = row._tr.get_or_add_trPr()
        trPr.append(parse_xml(r'<w:cantSplit {}/>'.format(nsdecls('w'))))
        
        c0 = row.cells[0]
        c0.text = abbr
        p0 = c0.paragraphs[0]
        p0.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p0.paragraph_format.first_line_indent = Cm(0)
        p0.paragraph_format.space_after = Pt(2)
        p0.paragraph_format.space_before = Pt(2)
        p0.runs[0].bold = True
        p0.runs[0].font.name = 'Times New Roman'
        p0.runs[0].font.size = Pt(11)

        c1 = row.cells[1]
        c1.text = en
        p1 = c1.paragraphs[0]
        p1.paragraph_format.first_line_indent = Cm(0)
        p1.paragraph_format.space_after = Pt(2)
        p1.paragraph_format.space_before = Pt(2)
        p1.runs[0].font.name = 'Times New Roman'
        p1.runs[0].font.size = Pt(11)

        c2 = row.cells[2]
        c2.text = vn
        p2 = c2.paragraphs[0]
        p2.paragraph_format.first_line_indent = Cm(0)
        p2.paragraph_format.space_after = Pt(2)
        p2.paragraph_format.space_before = Pt(2)
        p2.runs[0].font.name = 'Times New Roman'
        p2.runs[0].font.size = Pt(11)

    for row in tbl_abbr.rows:
        row.cells[0].width = Cm(3.0)
        row.cells[1].width = Cm(6.5)
        row.cells[2].width = Cm(6.5)

    # ==================== DANH MỤC HÌNH VẼ ====================
    print("-> Đang tạo Danh mục hình vẽ...")
    add_chapter_title("DANH MỤC CÁC HÌNH VẼ")
    tbl_figs = doc.add_table(rows=len(report_data.LIST_OF_FIGURES) + 1, cols=3)
    tbl_figs.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_figs.style = 'Table Grid'
    
    hdr = tbl_figs.rows[0]
    hdr_tr = hdr._tr.get_or_add_trPr()
    hdr_tr.append(parse_xml(r'<w:tblHeader {}/>'.format(nsdecls('w'))))
    for i, title in enumerate(["Ký hiệu hình", "Tên gọi và Nội dung biểu đồ", "Trang"]):
        cell = hdr.cells[i]
        cell.text = title
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(3)
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.first_line_indent = Cm(0)
        for r in p.runs:
            r.bold = True
            r.font.name = 'Times New Roman'
            r.font.size = Pt(11.5)
        shd = parse_xml(r'<w:shd {} w:fill="DBEAFE"/>'.format(nsdecls('w')))
        cell._tc.get_or_add_tcPr().append(shd)

    for idx, (code, name, ch) in enumerate(report_data.LIST_OF_FIGURES):
        row = tbl_figs.rows[idx + 1]
        trPr = row._tr.get_or_add_trPr()
        trPr.append(parse_xml(r'<w:cantSplit {}/>'.format(nsdecls('w'))))
        
        c0 = row.cells[0]
        c0.text = code
        p0 = c0.paragraphs[0]
        p0.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p0.paragraph_format.first_line_indent = Cm(0)
        p0.paragraph_format.space_after = Pt(2)
        p0.paragraph_format.space_before = Pt(2)
        p0.runs[0].bold = True
        p0.runs[0].font.name = 'Times New Roman'
        p0.runs[0].font.size = Pt(11)

        c1 = row.cells[1]
        c1.text = name
        p1 = c1.paragraphs[0]
        p1.paragraph_format.first_line_indent = Cm(0)
        p1.paragraph_format.space_after = Pt(2)
        p1.paragraph_format.space_before = Pt(2)
        p1.runs[0].font.name = 'Times New Roman'
        p1.runs[0].font.size = Pt(11)

        c2 = row.cells[2]
        FIG_PAGE_MAP = {
            "Hình 2.1": "20",
            "Hình 2.2": "21",
            "Hình 2.3": "22",
            "Hình 2.4": "27",
            "Hình 2.5": "28",
            "Hình 2.6": "29",
            "Hình 2.7": "30",
            "Hình 2.8": "32",
            "Hình 2.9": "34",
            "Hình 2.10": "47",
            "Hình 2.11": "48",
            "Hình 3.1": "66",
            "Hình 3.2": "68"
        }
        c2.text = FIG_PAGE_MAP.get(code, str(20 + idx * 4))
        p2 = c2.paragraphs[0]
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p2.paragraph_format.first_line_indent = Cm(0)
        p2.paragraph_format.space_after = Pt(2)
        p2.paragraph_format.space_before = Pt(2)
        p2.runs[0].font.name = 'Times New Roman'
        p2.runs[0].font.size = Pt(11)

    for row in tbl_figs.rows:
        row.cells[0].width = Cm(3.0)
        row.cells[1].width = Cm(11.0)
        row.cells[2].width = Cm(2.0)

    # ==================== DANH MỤC BẢNG BIỂU ====================
    print("-> Đang tạo Danh mục bảng biểu...")
    add_chapter_title("DANH MỤC CÁC BẢNG BIỂU")
    tbl_tbls = doc.add_table(rows=len(report_data.LIST_OF_TABLES) + 1, cols=3)
    tbl_tbls.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_tbls.style = 'Table Grid'
    
    hdr = tbl_tbls.rows[0]
    hdr_tr = hdr._tr.get_or_add_trPr()
    hdr_tr.append(parse_xml(r'<w:tblHeader {}/>'.format(nsdecls('w'))))
    for i, title in enumerate(["Ký hiệu bảng", "Tên gọi và Nội dung bảng biểu", "Trang"]):
        cell = hdr.cells[i]
        cell.text = title
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(3)
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.first_line_indent = Cm(0)
        for r in p.runs:
            r.bold = True
            r.font.name = 'Times New Roman'
            r.font.size = Pt(11.5)
        shd = parse_xml(r'<w:shd {} w:fill="DBEAFE"/>'.format(nsdecls('w')))
        cell._tc.get_or_add_tcPr().append(shd)

    TBL_PAGE_MAP = {
        "Bảng 1.1": "6",
        "Bảng 1.2": "10",
        "Bảng 1.3": "12",
        "Bảng 1.4": "15",
        "Bảng 2.1": "23",
        "Bảng 2.2": "24",
        "Bảng 2.3": "26",
        "Bảng 2.4": "34",
        "Bảng 2.5": "35",
        "Bảng 2.6": "36",
        "Bảng 2.7": "37",
        "Bảng 2.8": "38",
        "Bảng 2.9": "39",
        "Bảng 2.10": "40",
        "Bảng 2.11": "41",
        "Bảng 2.12": "42",
        "Bảng 2.13": "43",
        "Bảng 2.14": "44",
        "Bảng 2.15": "45",
        "Bảng 2.16": "46",
        "Bảng 2.17": "49",
        "Bảng 2.18": "52",
        "Bảng 3.1": "54",
        "Bảng 3.2": "55",
        "Bảng 3.3": "62",
        "Bảng 3.4": "63",
        "Bảng 3.5": "64",
        "Bảng 3.6": "66",
        "Bảng 3.7": "68",
        "Bảng 3.8": "70"
    }

    for idx, (code, name, ch) in enumerate(report_data.LIST_OF_TABLES):
        row = tbl_tbls.rows[idx + 1]
        trPr = row._tr.get_or_add_trPr()
        trPr.append(parse_xml(r'<w:cantSplit {}/>'.format(nsdecls('w'))))
        
        c0 = row.cells[0]
        c0.text = code
        p0 = c0.paragraphs[0]
        p0.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p0.paragraph_format.first_line_indent = Cm(0)
        p0.paragraph_format.space_after = Pt(2)
        p0.paragraph_format.space_before = Pt(2)
        p0.runs[0].bold = True
        p0.runs[0].font.name = 'Times New Roman'
        p0.runs[0].font.size = Pt(11)

        c1 = row.cells[1]
        c1.text = name
        p1 = c1.paragraphs[0]
        p1.paragraph_format.first_line_indent = Cm(0)
        p1.paragraph_format.space_after = Pt(2)
        p1.paragraph_format.space_before = Pt(2)
        p1.runs[0].font.name = 'Times New Roman'
        p1.runs[0].font.size = Pt(11)

        c2 = row.cells[2]
        c2.text = TBL_PAGE_MAP.get(code, str(4 + idx * 2))
        p2 = c2.paragraphs[0]
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p2.paragraph_format.first_line_indent = Cm(0)
        p2.paragraph_format.space_after = Pt(2)
        p2.paragraph_format.space_before = Pt(2)
        p2.runs[0].font.name = 'Times New Roman'
        p2.runs[0].font.size = Pt(11)

    for row in tbl_tbls.rows:
        row.cells[0].width = Cm(3.0)
        row.cells[1].width = Cm(11.0)
        row.cells[2].width = Cm(2.0)

    # ==================== SECTION 2: BẮT ĐẦU ĐÁNH SỐ TRANG TỪ 1 ====================
    print("-> Khởi tạo Section 2 (MỞ ĐẦU - Bắt đầu đánh số trang từ 1)...")
    s2 = doc.add_section(WD_SECTION_START.NEW_PAGE)
    s2.top_margin = Cm(2.0)
    s2.bottom_margin = Cm(2.0)
    s2.left_margin = Cm(3.0)
    s2.right_margin = Cm(2.0)
    s2.header.is_linked_to_previous = False
    s2.footer.is_linked_to_previous = False

    # Đặt số trang bắt đầu từ 1
    pgNumType = OxmlElement('w:pgNumType')
    pgNumType.set(qn('w:start'), '1')
    s2._sectPr.append(pgNumType)

    # Thêm trường PAGE vào footer giữa
    footer = s2.footer.paragraphs[0]
    footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    footer.paragraph_format.first_line_indent = Cm(0)
    fld_run = footer.add_run()
    fld1 = OxmlElement('w:fldChar')
    fld1.set(qn('w:fldCharType'), 'begin')
    instr = OxmlElement('w:instrText')
    instr.set(qn('xml:space'), 'preserve')
    instr.text = "PAGE"
    fld2 = OxmlElement('w:fldChar')
    fld2.set(qn('w:fldCharType'), 'separate')
    fld3 = OxmlElement('w:fldChar')
    fld3.set(qn('w:fldCharType'), 'end')
    fld_run._r.append(fld1)
    fld_run._r.append(instr)
    fld_run._r.append(fld2)
    fld_run._r.append(fld3)
    fld_run.font.name = 'Times New Roman'
    fld_run.font.size = Pt(12)

    # ==================== PHẦN MỞ ĐẦU ====================
    print("-> Đang ghi Phần Mở Đầu...")
    p_intro = doc.add_paragraph()
    p_intro.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_intro.paragraph_format.line_spacing = 1.3
    p_intro.paragraph_format.space_before = Pt(18)
    p_intro.paragraph_format.space_after = Pt(14)
    p_intro.paragraph_format.first_line_indent = Cm(0)
    r = p_intro.add_run("MỞ ĐẦU")
    r.bold = True
    r.font.name = 'Times New Roman'
    r.font.size = Pt(15)
    r.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)

    for p_text in chapter_intro.INTRO_PARAGRAPHS:
        add_p(p_text)

    # ==================== CHƯƠNG 1 ====================
    print("-> Đang ghi Chương 1...")
    add_chapter_title(chapter_1.CHAPTER_1_TITLE)

    # 1.1
    add_h2(chapter_1.SEC_1_1_TITLE)
    for p_text in chapter_1.SEC_1_1_CONTENT:
        add_p(p_text)
    add_custom_table(chapter_1.TABLE_1_1_CAPTION, chapter_1.TABLE_1_1_HEADERS, chapter_1.TABLE_1_1_ROWS, [3.2, 4.0, 4.5, 4.3])

    # 1.2
    add_h2(chapter_1.SEC_1_2_TITLE)
    for p_text in chapter_1.SEC_1_2_CONTENT:
        add_p(p_text)

    # 1.3
    add_h2(chapter_1.SEC_1_3_TITLE)
    for p_text in chapter_1.SEC_1_3_CONTENT:
        add_p(p_text)
    add_custom_table(chapter_1.TABLE_1_2_CAPTION, chapter_1.TABLE_1_2_HEADERS, chapter_1.TABLE_1_2_ROWS, [3.5, 3.0, 3.5, 6.0])

    # 1.4
    add_h2(chapter_1.SEC_1_4_TITLE)
    for p_text in chapter_1.SEC_1_4_CONTENT:
        add_p(p_text)
    add_custom_table(chapter_1.TABLE_1_3_CAPTION, chapter_1.TABLE_1_3_HEADERS, chapter_1.TABLE_1_3_ROWS, [3.0, 4.0, 4.5, 4.5])

    # 1.5
    add_h2(chapter_1.SEC_1_5_TITLE)
    for p_text in chapter_1.SEC_1_5_CONTENT:
        add_p(p_text)
    add_custom_table(chapter_1.TABLE_1_4_CAPTION, chapter_1.TABLE_1_4_HEADERS, chapter_1.TABLE_1_4_ROWS, [2.5, 3.0, 3.5, 7.0])

    # ==================== CHƯƠNG 2 ====================
    print("-> Đang ghi Chương 2...")
    add_chapter_title(chapter_2.CHAPTER_2_TITLE)

    # 2.1
    add_h2(chapter_2.SEC_2_1_TITLE)
    for p_text in chapter_2.SEC_2_1_CONTENT:
        add_p(p_text)

    # 2.2 Use Case & Các biểu đồ
    add_h2(chapter_2.SEC_2_2_TITLE)
    for p_text in chapter_2.SEC_2_2_CONTENT:
        add_p(p_text)

    # Hình 2.1: Use Case tổng quan
    add_figure("docs/images/diag_usecase_general.png", "Hình 2.1: Biểu đồ Use Case tổng quan toàn bộ hệ thống SportBooking")

    # Hình 2.2: Use Case Khách hàng
    add_figure("docs/images/diag_usecase_customer.png", "Hình 2.2: Biểu đồ Use Case chi tiết phân hệ Khách hàng (Customer Sub-system)")

    # Hình 2.3: Use Case Nhân viên & Quản trị
    add_figure("docs/images/diag_usecase_staff_admin.png", "Hình 2.3: Biểu đồ Use Case chi tiết phân hệ Nhân sự và Quản trị (Workforce & Admin)")

    # Các bảng đặc tả Use Case
    add_custom_table(chapter_2.TABLE_2_1_CAPTION, chapter_2.TABLE_2_1_HEADERS, chapter_2.TABLE_2_1_ROWS, [4.0, 12.0])
    add_custom_table(chapter_2.TABLE_2_2_CAPTION, chapter_2.TABLE_2_2_HEADERS, chapter_2.TABLE_2_2_ROWS, [4.0, 12.0])
    add_custom_table(chapter_2.TABLE_2_3_CAPTION, chapter_2.TABLE_2_3_HEADERS, chapter_2.TABLE_2_3_ROWS, [4.0, 12.0])

    # Biểu đồ Hoạt động (Activity Diagrams)
    add_h3("2.2.1. Biểu đồ Hoạt động (Activity Diagrams)")
    add_p(
        "Biểu đồ hoạt động mô tả chi tiết chuỗi các bước thực thi tuần tự, các rẽ nhánh điều kiện và luồng đồng thời "
        "giữa các đối tượng tham gia trong quy trình đặt sân chống trùng lịch và quy trình chấm công mã QR."
    )
    add_figure("docs/images/diag_activity_booking.png", "Hình 2.4: Biểu đồ Hoạt động (Activity Diagram) - Quy trình Đặt sân chống trùng lịch")
    add_figure("docs/images/diag_activity_attendance.png", "Hình 2.5: Biểu đồ Hoạt động (Activity Diagram) - Quy trình Chấm công QR và Audit Log")

    # Biểu đồ Tuần tự (Sequence Diagrams)
    add_h3("2.2.2. Biểu đồ Tuần tự (Sequence Diagrams)")
    add_p(
        "Biểu đồ tuần tự mô hình hóa tương tác trao đổi thông điệp (Messages) giữa các tầng kiến trúc: Trình duyệt người dùng (Client), "
        "Bộ điều phối định tuyến (Router/Controller), Tầng dịch vụ logic nghiệp vụ (Service), và Hệ thống lưu trữ cơ sở dữ liệu (MongoDB)."
    )
    add_figure("docs/images/diag_sequence_booking.png", "Hình 2.6: Biểu đồ Tuần tự (Sequence Diagram) - Luồng Đặt sân và Xử lý xung đột lịch")
    add_figure("docs/images/diag_sequence_attendance.png", "Hình 2.7: Biểu đồ Tuần tự (Sequence Diagram) - Luồng Chấm công QR và Ghi vết kiểm toán")

    # 2.3 Kiến trúc hệ thống
    add_h2(chapter_2.SEC_2_3_TITLE)
    for p_text in chapter_2.SEC_2_3_CONTENT:
        add_p(p_text)
    add_figure("docs/images/diag_sys_architecture.png", "Hình 2.8: Sơ đồ Kiến trúc phân tầng Layered Architecture hệ thống SportBooking")

    # 2.4 Thiết kế CSDL
    add_h2(chapter_2.SEC_2_4_TITLE)
    for p_text in chapter_2.SEC_2_4_CONTENT:
        add_p(p_text)
    add_figure("docs/images/diag_database_erd.png", "Hình 2.9: Sơ đồ Thực thể liên kết dữ liệu (Database ERD & Class Diagram 12 Collections)")

    # 12 Bảng từ điển dữ liệu Collections
    add_custom_table(chapter_2.TABLE_2_4_CAPTION, chapter_2.TABLE_2_4_HEADERS, chapter_2.TABLE_2_4_ROWS, [3.2, 2.5, 4.0, 6.3])
    add_custom_table(chapter_2.TABLE_2_5_CAPTION, chapter_2.TABLE_2_5_HEADERS, chapter_2.TABLE_2_5_ROWS, [3.2, 2.5, 4.0, 6.3])
    add_custom_table(chapter_2.TABLE_2_6_CAPTION, chapter_2.TABLE_2_6_HEADERS, chapter_2.TABLE_2_6_ROWS, [3.2, 2.5, 4.0, 6.3])
    add_custom_table(chapter_2.TABLE_2_7_CAPTION, chapter_2.TABLE_2_7_HEADERS, chapter_2.TABLE_2_7_ROWS, [3.2, 2.5, 4.0, 6.3])
    add_custom_table(chapter_2.TABLE_2_8_CAPTION, chapter_2.TABLE_2_8_HEADERS, chapter_2.TABLE_2_8_ROWS, [3.2, 2.5, 4.0, 6.3])
    add_custom_table(chapter_2.TABLE_2_9_CAPTION, chapter_2.TABLE_2_9_HEADERS, chapter_2.TABLE_2_9_ROWS, [3.2, 2.5, 4.0, 6.3])
    add_custom_table(chapter_2.TABLE_2_10_CAPTION, chapter_2.TABLE_2_10_HEADERS, chapter_2.TABLE_2_10_ROWS, [3.2, 2.5, 4.0, 6.3])
    add_custom_table(chapter_2.TABLE_2_11_CAPTION, chapter_2.TABLE_2_11_HEADERS, chapter_2.TABLE_2_11_ROWS, [3.2, 2.5, 4.0, 6.3])
    add_custom_table(chapter_2.TABLE_2_12_CAPTION, chapter_2.TABLE_2_12_HEADERS, chapter_2.TABLE_2_12_ROWS, [3.2, 2.5, 4.0, 6.3])
    add_custom_table(chapter_2.TABLE_2_13_CAPTION, chapter_2.TABLE_2_13_HEADERS, chapter_2.TABLE_2_13_ROWS, [3.2, 2.5, 4.0, 6.3])
    add_custom_table(chapter_2.TABLE_2_14_CAPTION, chapter_2.TABLE_2_14_HEADERS, chapter_2.TABLE_2_14_ROWS, [3.2, 2.5, 4.0, 6.3])
    add_custom_table(chapter_2.TABLE_2_15_CAPTION, chapter_2.TABLE_2_15_HEADERS, chapter_2.TABLE_2_15_ROWS, [3.2, 2.5, 4.0, 6.3])

    # Bảng chỉ mục Compound Indexing
    add_custom_table(chapter_2.TABLE_2_16_CAPTION, chapter_2.TABLE_2_16_HEADERS, chapter_2.TABLE_2_16_ROWS, [2.5, 4.0, 3.0, 6.5])

    # 2.5 Thiết kế giao diện & API
    add_h2(chapter_2.SEC_2_5_TITLE)
    for p_text in chapter_2.SEC_2_5_CONTENT:
        add_p(p_text)
    add_figure("docs/images/diag_uiux_sitemap.png", "Hình 2.10: Sơ đồ Cấu trúc điều hướng giao diện (UI/UX Sitemap & User Navigation Flow)")
    add_figure("docs/images/diag_ui_wireframes.png", "Hình 2.11: Bản vẽ Bố cục Wireframe giao diện Đặt sân và Bảng điều khiển Chấm công")

    add_custom_table(chapter_2.TABLE_2_17_CAPTION, chapter_2.TABLE_2_17_HEADERS, chapter_2.TABLE_2_17_ROWS, [2.0, 2.0, 4.5, 2.8, 4.7])
    add_custom_table(chapter_2.TABLE_2_18_CAPTION, chapter_2.TABLE_2_18_HEADERS, chapter_2.TABLE_2_18_ROWS, [3.5, 4.0, 8.5])

    # ==================== CHƯƠNG 3 ====================
    print("-> Đang ghi Chương 3...")
    add_chapter_title(chapter_3.CHAPTER_3_TITLE)

    # 3.1
    add_h2(chapter_3.SEC_3_1_TITLE)
    for p_text in chapter_3.SEC_3_1_CONTENT:
        add_p(p_text)
    add_custom_table("Bảng 3.1: Thông số cấu hình môi trường phát triển phần cứng và phần mềm", chapter_3.TABLE_3_1_DATA[0], chapter_3.TABLE_3_1_DATA[1:], [3.5, 4.5, 8.0])

    for p_text in chapter_3.SEC_3_1_SEED_CONTENT:
        add_p(p_text)
    add_custom_table("Bảng 3.2: Bảng tổng hợp dữ liệu mẫu (Seed Data) đã được nạp vào cơ sở dữ liệu", chapter_3.TABLE_3_2_DATA[0], chapter_3.TABLE_3_2_DATA[1:], [3.0, 3.0, 10.0])

    # 3.2
    add_h2(chapter_3.SEC_3_2_TITLE)
    for p_text in chapter_3.SEC_3_2_CONTENT:
        add_p(p_text)

    # 3.3
    add_h2(chapter_3.SEC_3_3_TITLE)
    for p_text in chapter_3.SEC_3_3_CONTENT:
        if p_text.startswith("```"):
            add_code_block(p_text.strip("`"))
        else:
            add_p(p_text)

    # 3.4
    add_h2(chapter_3.SEC_3_4_TITLE)
    add_h3(chapter_3.SEC_3_4_1_TITLE)
    for p_text in chapter_3.SEC_3_4_1_CONTENT:
        add_p(p_text)

    add_custom_table("Bảng 3.3: Danh mục Test Cases chi tiết kiểm thử phân hệ Xác thực (Auth Module)", chapter_3.TABLE_3_3_DATA[0], chapter_3.TABLE_3_3_DATA[1:], [2.2, 3.2, 4.5, 3.0, 3.1])
    add_custom_table("Bảng 3.4: Danh mục Test Cases chi tiết kiểm thử thuật toán Đặt sân chống trùng lịch", chapter_3.TABLE_3_4_DATA[0], chapter_3.TABLE_3_4_DATA[1:], [2.2, 3.2, 4.5, 3.0, 3.1])
    add_custom_table("Bảng 3.5: Danh mục Test Cases chi tiết kiểm thử Chấm công và Kiểm toán Audit Log", chapter_3.TABLE_3_5_DATA[0], chapter_3.TABLE_3_5_DATA[1:], [2.2, 3.2, 4.5, 3.0, 3.1])

    add_h3(chapter_3.SEC_3_4_2_TITLE)
    for p_text in chapter_3.SEC_3_4_2_CONTENT:
        add_p(p_text)
    add_custom_table("Bảng 3.6: Bảng tổng hợp kết quả thực thi kiểm thử tự động (Automated Test Execution Summary)", chapter_3.TABLE_3_6_DATA[0], chapter_3.TABLE_3_6_DATA[1:], [4.0, 2.5, 2.5, 2.5, 2.5, 2.0])

    for p_text in chapter_3.SEC_3_4_2_FIGURES_CONTENT:
        add_p(p_text)
    add_figure("docs/images/diag_api_flow.png", "Hình 3.1: Sơ đồ Quy trình Triển khai và Đường ống Xử lý API Pipeline")

    add_h3(chapter_3.SEC_3_4_3_TITLE)
    for p_text in chapter_3.SEC_3_4_3_CONTENT:
        add_p(p_text)
    add_figure("docs/images/diag_perf_benchmark.png", "Hình 3.2: Biểu đồ Phân tích và Đánh giá Hiệu năng Thuật toán Chống trùng lịch")

    add_custom_table("Bảng 3.7: Tổng hợp các lỗi phát hiện trong quá trình phát triển và biện pháp khắc phục", chapter_3.TABLE_3_7_DATA[0], chapter_3.TABLE_3_7_DATA[1:], [3.5, 4.0, 4.5, 4.0])

    # 3.5
    add_h2(chapter_3.SEC_3_5_TITLE)
    for p_text in chapter_3.SEC_3_5_CONTENT:
        add_p(p_text)
    add_custom_table("Bảng 3.8: Bảng đối chiếu kết quả thực tế đạt được so với mục tiêu đề ra ban đầu", chapter_3.TABLE_3_8_DATA[0], chapter_3.TABLE_3_8_DATA[1:], [3.5, 5.0, 2.5, 5.0])
    for p_text in chapter_3.SEC_3_5_LESSONS_CONTENT:
        add_p(p_text)

    # ==================== KẾT LUẬN ====================
    print("-> Đang ghi Kết luận...")
    add_chapter_title(chapter_conclusion.CONCLUSION_TITLE)
    for p_text in chapter_conclusion.CONCLUSION_CONTENT:
        add_p(p_text)

    # ==================== TÀI LIỆU THAM KHẢO ====================
    print("-> Đang ghi Tài liệu tham khảo...")
    add_chapter_title(chapter_conclusion.REFERENCES_TITLE)
    for ref_text in chapter_conclusion.REFERENCES_LIST:
        p_ref = doc.add_paragraph()
        p_ref.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_ref.paragraph_format.line_spacing = 1.3
        p_ref.paragraph_format.space_after = Pt(6)
        p_ref.paragraph_format.first_line_indent = Cm(0)
        r = p_ref.add_run(ref_text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(13)

    # ==================== PHỤ LỤC ====================
    print("-> Đang ghi Phụ lục A, B, C...")
    # Phụ lục A
    add_chapter_title(chapter_conclusion.APPENDIX_A_TITLE)
    for p_text in chapter_conclusion.APPENDIX_A_CONTENT:
        add_p(p_text)

    # Phụ lục B
    add_chapter_title(chapter_conclusion.APPENDIX_B_TITLE)
    for p_text in chapter_conclusion.APPENDIX_B_CONTENT:
        add_p(p_text)
    add_custom_table("Bảng B.1: Danh mục đặc tả các biến môi trường cấu hình hệ thống", chapter_conclusion.TABLE_APP_B_DATA[0], chapter_conclusion.TABLE_APP_B_DATA[1:], [3.5, 2.5, 4.5, 5.5])

    # Phụ lục C
    add_chapter_title(chapter_conclusion.APPENDIX_C_TITLE)
    for p_text in chapter_conclusion.APPENDIX_C_CONTENT:
        add_p(p_text)
    add_custom_table("Bảng C.1: Danh sách tài khoản thử nghiệm các vai trò trong hệ thống", chapter_conclusion.TABLE_APP_C_DATA[0], chapter_conclusion.TABLE_APP_C_DATA[1:], [3.0, 3.5, 3.5, 2.5, 3.5])

    # Lưu tệp báo cáo
    output_path = "Bao_Cao_Tong_Hop_SportBooking.docx"
    doc.save(output_path)
    print(f"=== ĐÃ TẠO THÀNH CÔNG: {output_path} ===")

    # Đồng thời sao lưu vào docs/ và frontend/public/
    os.makedirs("docs", exist_ok=True)
    os.makedirs("frontend/public", exist_ok=True)
    doc.save(os.path.join("docs", output_path))
    doc.save(os.path.join("frontend", "public", output_path))
    print("-> Đã sao lưu bản copy sang docs/ và frontend/public/")

if __name__ == "__main__":
    create_full_report()
