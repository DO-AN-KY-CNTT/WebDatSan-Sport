# -*- coding: utf-8 -*-
"""
Module chứa toàn bộ nội dung học thuật, đặc tả kỹ thuật và dữ liệu chi tiết
cho Báo cáo Đồ án tốt nghiệp / Đồ án chuyên ngành hệ thống SportBooking.
Đảm bảo độ dài, tính chuyên sâu, chuẩn quy cách học thuật đại học.
"""

PROJECT_NAME = "HỆ THỐNG QUẢN LÝ VÀ ĐẶT SÂN THỂ THAO TRỰC TUYẾN TOÀN DIỆN (SPORTBOOKING)"
PROJECT_SHORT = "SportBooking Platform"
AUTHOR_NAME = "Sinh viên thực hiện: Nguyễn Văn A - MSSV: 20210001"
SUPERVISOR_NAME = "Giảng viên hướng dẫn: TS. Trần Văn B"
DEPARTMENT_NAME = "KHOA CÔNG NGHỆ THÔNG TIN - BỘ MÔN HỆ THỐNG THÔNG TIN"
UNIVERSITY_NAME = "TRƯỜNG ĐẠI HỌC CÔNG NGHỆ"
CITY_YEAR = "HÀ NỘI, 2026"

# Danh mục từ viết tắt
ABBREVIATIONS = [
    ("API", "Application Programming Interface", "Giao diện lập trình ứng dụng"),
    ("BSON", "Binary JSON", "Định dạng nhị phân mở rộng của JSON dùng trong MongoDB"),
    ("CORS", "Cross-Origin Resource Sharing", "Cơ chế chia sẻ tài nguyên giữa các nguồn gốc khác nhau"),
    ("CRUD", "Create, Read, Update, Delete", "Bốn thao tác cơ bản trên cơ sở dữ liệu"),
    ("CSS", "Cascading Style Sheets", "Ngôn ngữ định kiểu cho trang web"),
    ("DOM", "Document Object Model", "Mô hình đối tượng tài liệu"),
    ("DTO", "Data Transfer Object", "Đối tượng truyền dữ liệu giữa các tầng kiến trúc"),
    ("ERD", "Entity Relationship Diagram", "Sơ đồ thực thể liên kết"),
    ("GVHD", "Giảng viên hướng dẫn", "Cán bộ phụ trách hướng dẫn học thuật cho đồ án"),
    ("HMR", "Hot Module Replacement", "Cơ chế cập nhật mô-đun nóng trong quá trình phát triển của Vite"),
    ("HTTP", "Hypertext Transfer Protocol", "Giao thức truyền tải siêu văn bản"),
    ("HTTPS", "Hypertext Transfer Protocol Secure", "Giao thức truyền tải siêu văn bản bảo mật"),
    ("IDE", "Integrated Development Environment", "Môi trường phát triển tích hợp"),
    ("JSON", "JavaScript Object Notation", "Định dạng trao đổi dữ liệu gọn nhẹ"),
    ("JWT", "JSON Web Token", "Chuẩn mở định nghĩa phương thức truyền tin an toàn qua token"),
    ("MERN", "MongoDB, Express.js, React, Node.js", "Ngăn xếp công nghệ phát triển ứng dụng web"),
    ("NoSQL", "Not Only SQL", "Hệ quản trị cơ sở dữ liệu phi quan hệ"),
    ("ODM", "Object Data Modeling", "Mô hình hóa đối tượng dữ liệu trong CSDL hướng tài liệu"),
    ("RBAC", "Role-Based Access Control", "Kiểm soát truy cập dựa trên vai trò người dùng"),
    ("REST", "Representational State Transfer", "Kiểu kiến trúc phần mềm cho các hệ thống siêu phương tiện phân tán"),
    ("SPA", "Single Page Application", "Ứng dụng web đơn trang"),
    ("UI", "User Interface", "Giao diện người dùng"),
    ("UML", "Unified Modeling Language", "Ngôn ngữ mô hình hóa thống nhất"),
    ("URI", "Uniform Resource Identifier", "Chuỗi ký tự định danh tài nguyên"),
    ("UX", "User Experience", "Trải nghiệm người dùng"),
    ("VND", "Việt Nam Đồng", "Đơn vị tiền tệ chính thức của Việt Nam")
]

# Danh mục hình vẽ
LIST_OF_FIGURES = [
    ("Hình 2.1", "Biểu đồ Use Case tổng quan toàn bộ hệ thống SportBooking", 2),
    ("Hình 2.2", "Biểu đồ Use Case chi tiết phân hệ Khách hàng (Customer Sub-system)", 2),
    ("Hình 2.3", "Biểu đồ Use Case chi tiết phân hệ Nhân sự và Quản trị (Workforce & Admin)", 2),
    ("Hình 2.4", "Biểu đồ Hoạt động (Activity Diagram) - Quy trình Đặt sân chống trùng lịch", 2),
    ("Hình 2.5", "Biểu đồ Hoạt động (Activity Diagram) - Quy trình Chấm công QR và Audit Log", 2),
    ("Hình 2.6", "Biểu đồ Tuần tự (Sequence Diagram) - Luồng Đặt sân và Xử lý xung đột lịch", 2),
    ("Hình 2.7", "Biểu đồ Tuần tự (Sequence Diagram) - Luồng Chấm công QR và Ghi vết kiểm toán", 2),
    ("Hình 2.8", "Sơ đồ Kiến trúc phân tầng Layered Architecture hệ thống SportBooking", 2),
    ("Hình 2.9", "Sơ đồ Thực thể liên kết dữ liệu (Database ERD & Class Diagram 12 Collections)", 2),
    ("Hình 2.10", "Sơ đồ Cấu trúc điều hướng giao diện (UI/UX Sitemap & User Navigation Flow)", 2),
    ("Hình 2.11", "Bản vẽ Bố cục Wireframe giao diện Đặt sân và Bảng điều khiển Chấm công", 2),
    ("Hình 3.1", "Sơ đồ Quy trình Triển khai và Đường ống Xử lý API Pipeline", 3),
    ("Hình 3.2", "Biểu đồ Phân tích và Đánh giá Hiệu năng Thuật toán Chống trùng lịch", 3)
]

# Danh mục bảng biểu
LIST_OF_TABLES = [
    ("Bảng 1.1", "Bảng khảo sát và so sánh các phương thức quản lý sân thể thao tại Việt Nam", 1),
    ("Bảng 1.2", "Ma trận phân quyền chức năng theo 4 nhóm đối tượng người dùng (RBAC Matrix)", 1),
    ("Bảng 1.3", "Bảng quy định dữ liệu đầu vào và đầu ra của các phân hệ nghiệp vụ chính", 1),
    ("Bảng 1.4", "Bảng tổng hợp công nghệ sử dụng và vai trò kỹ thuật trong hệ thống", 1),
    ("Bảng 2.1", "Đặc tả Use Case UC-C03: Đặt sân thể thao trực tuyến chống trùng lịch", 2),
    ("Bảng 2.2", "Đặc tả Use Case UC-S02: Chấm công Vào/Ra và quét mã QR Code", 2),
    ("Bảng 2.3", "Đặc tả Use Case UC-A01: Hiệu chỉnh công nhân viên và bắt buộc ghi Audit Log", 2),
    ("Bảng 2.4", "Từ điển dữ liệu chi tiết Collection User (Tài khoản người dùng)", 2),
    ("Bảng 2.5", "Từ điển dữ liệu chi tiết Collection Court (Sân thể thao)", 2),
    ("Bảng 2.6", "Từ điển dữ liệu chi tiết Collection Booking (Đơn đặt sân)", 2),
    ("Bảng 2.7", "Từ điển dữ liệu chi tiết Collection Shift (Ca làm việc)", 2),
    ("Bảng 2.8", "Từ điển dữ liệu chi tiết Collection WorkSchedule (Phân ca trực)", 2),
    ("Bảng 2.9", "Từ điển dữ liệu chi tiết Collection Attendance (Chấm công thực tế)", 2),
    ("Bảng 2.10", "Từ điển dữ liệu chi tiết Collection AttendanceLog (Lịch sử kiểm toán Audit Log)", 2),
    ("Bảng 2.11", "Từ điển dữ liệu chi tiết Collection LeaveRequest (Đơn xin nghỉ phép)", 2),
    ("Bảng 2.12", "Từ điển dữ liệu chi tiết Collection Payroll (Bảng tính lương tháng)", 2),
    ("Bảng 2.13", "Từ điển dữ liệu chi tiết Collection QrToken (Mã xác thực có thời hạn)", 2),
    ("Bảng 2.14", "Từ điển dữ liệu chi tiết Collection Review (Đánh giá nhận xét sân)", 2),
    ("Bảng 2.15", "Từ điển dữ liệu chi tiết Collection Employee (Hồ sơ nhân viên)", 2),
    ("Bảng 2.16", "Chiến lược đánh chỉ mục Compound Indexes và phân tích độ phức tạp thuật toán", 2),
    ("Bảng 2.17", "Đặc tả danh mục các RESTful API Endpoints cốt lõi của hệ thống SportBooking", 2),
    ("Bảng 2.18", "Bảng quy chuẩn thiết kế giao diện (Design System & Design Tokens)", 2),
    ("Bảng 3.1", "Thông số cấu hình môi trường phát triển phần cứng và phần mềm", 3),
    ("Bảng 3.2", "Bảng tổng hợp dữ liệu mẫu (Seed Data) đã được nạp vào cơ sở dữ liệu", 3),
    ("Bảng 3.3", "Danh mục Test Cases chi tiết kiểm thử phân hệ Xác thực (Auth Module)", 3),
    ("Bảng 3.4", "Danh mục Test Cases chi tiết kiểm thử thuật toán Đặt sân chống trùng lịch", 3),
    ("Bảng 3.5", "Danh mục Test Cases chi tiết kiểm thử Chấm công và Kiểm toán Audit Log", 3),
    ("Bảng 3.6", "Bảng tổng hợp kết quả thực thi kiểm thử tự động (Automated Test Execution Summary)", 3),
    ("Bảng 3.7", "Tổng hợp các lỗi phát hiện trong quá trình phát triển và biện pháp khắc phục", 3),
    ("Bảng 3.8", "Bảng đối chiếu kết quả thực tế đạt được so với mục tiêu đề ra ban đầu", 3)
]
