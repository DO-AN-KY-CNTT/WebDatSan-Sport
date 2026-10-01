# -*- coding: utf-8 -*-
"""
Chương 2: Phân Tích Và Thiết Kế Giải Pháp.
Bao gồm:
2.1. Phân tích yêu cầu và chức năng cốt lõi (người dùng, chức năng, phi chức năng)
2.2. Use case hoặc luồng xử lý chính (tạo ảnh usecase tổng quát và các chức năng có trong project)
2.3. Thiết kế kiến trúc hệ thống hoặc pipeline xử lý
2.4. Thiết kế cơ sở dữ liệu (ERD, từ điển dữ liệu 12 collections, compound indexing)
2.5. Thiết kế giao diện, API và các thành phần kỹ thuật cần thiết (Sitemap, Wireframe, Endpoints API)
"""

CHAPTER_2_TITLE = "CHƯƠNG 2. PHÂN TÍCH VÀ THIẾT KẾ GIẢI PHÁP"

# 2.1 Phân tích yêu cầu và chức năng cốt lõi
SEC_2_1_TITLE = "2.1. Phân tích yêu cầu và chức năng cốt lõi"
SEC_2_1_CONTENT = [
    (
        "Giai đoạn phân tích yêu cầu phần mềm đóng vai trò nền tảng quyết định đến sự thành bại của toàn bộ dự án. "
        "Dựa trên việc khảo sát kỹ lưỡng nghiệp vụ thực tế tại các cụm sân thể thao và phỏng vấn trực tiếp các đối tượng "
        "thụ hưởng, các yêu cầu của hệ thống SportBooking được phân rã thành hai nhóm chính: Yêu cầu chức năng "
        "(Functional Requirements) và Yêu cầu phi chức năng (Non-Functional Requirements)."
    ),
    (
        "1. Yêu cầu chức năng phân hệ Khách hàng (Customer Requirements):\n"
        "• Đăng ký và quản lý tài khoản: Cho phép khách hàng tự tạo tài khoản cá nhân thông qua email và mật khẩu; "
        "đăng nhập hệ thống nhận JWT Token; xem và cập nhật hồ sơ cá nhân (họ tên, số điện thoại, ảnh đại diện); thực hiện đổi mật khẩu an toàn.\n"
        "• Tìm kiếm và khám phá sân thể thao: Cung cấp thanh công cụ tìm kiếm và lọc đa tiêu chí theo môn thể thao "
        "(Bóng đá, Cầu lông, Tennis, Pickleball, Bóng rổ, Bóng chuyền), vị trí quận huyện, mức giá theo giờ và các tiện ích đi kèm "
        "(Wifi miễn phí, đèn LED, phòng thay đồ, điều hòa, chỗ đỗ xe). Hiển thị danh sách sân kèm hình ảnh trực quan, đánh giá sao trung bình và số lượt đánh giá.\n"
        "• Xem chi tiết và lịch sân thời gian thực: Khách hàng có thể chọn bất kỳ ngày nào trong tương lai để xem ma trận các khung giờ (slot) "
        "từ lúc mở cửa đến đóng cửa của sân. Hệ thống tự động phân loại và đánh dấu màu sắc trực quan: khung giờ trống (màu xanh lá/trắng), "
        "khung giờ đã có người đặt (màu đỏ - khóa không cho chọn) và khung giờ khách hàng đang chọn (màu cam).\n"
        "• Đặt sân trực tuyến: Cho phép khách hàng chọn một hoặc nhiều khung giờ liên tiếp; hệ thống tự động tính toán tổng số giờ và tổng tiền thanh toán. "
        "Sau khi xác nhận đặt sân, hệ thống tự động sinh mã đơn hàng duy nhất dạng BK-YYYYMMDD-XXXX và cấp phát vé điện tử có mã QR Code tiện lợi.\n"
        "• Quản lý lịch sử đặt sân (My Bookings): Cung cấp giao diện xem toàn bộ danh sách vé đã đặt, phân loại theo trạng thái (Sắp tới, Đã hoàn thành, "
        "Đã hủy); xem chi tiết vé điện tử kèm mã QR để xuất trình tại bàn điều phối của sân.\n"
        "• Hủy đặt sân: Khách hàng được phép hủy đơn đặt sân hợp lệ theo chính sách của trung tâm, hệ thống ghi nhận lý do hủy và tự động thực hiện hoàn tiền mô phỏng.\n"
        "• Đánh giá chất lượng (Reviews): Đối với các đơn đặt sân đã hoàn thành, khách hàng có quyền chấm điểm sao từ 1 đến 5 sao và viết nhận xét "
        "về chất lượng mặt sân, ánh sáng và thái độ phục vụ của nhân viên."
    ),
    (
        "2. Yêu cầu chức năng phân hệ Nhân viên (Staff Requirements):\n"
        "• Xem lịch phân ca trực (Work Schedules): Nhân viên đăng nhập vào cổng thông tin nội bộ để theo dõi lịch trực được phân công theo ngày, "
        "hiển thị rõ tên ca làm việc, khung giờ trực và sân thể thao phụ trách.\n"
        "• Chấm công Vào/Ra trực quan (Attendance): Tích hợp đồng hồ điện tử chạy thời gian thực hiển thị ngày giờ chính xác; cung cấp hai nút bấm "
        "kích thước lớn 'Check-in (Vào ca)' và 'Check-out (Tan ca)'. Hệ thống tự động kiểm tra điều kiện logic: không được bấm Check-in 2 lần, "
        "không được bấm Check-out khi chưa Check-in, và không được bấm Check-out 2 lần.\n"
        "• Quét mã QR Code xác thực vị trí: Để chứng minh sự có mặt thực tế tại sân, nhân viên thực hiện quét mã QR Token được hiển thị tại bàn điều phối "
        "hoặc nhập mã token; hệ thống kiểm tra tính hợp lệ và thời hạn hiệu lực của mã trước khi ghi nhận trạng thái 'qrVerified: true'.\n"
        "• Tự động tính toán giờ làm việc thực tế: Khi nhân viên bấm Check-out, hệ thống tự động tính chênh lệch thời gian giữa giờ ra và giờ vào, "
        "tự động khấu trừ thời gian nghỉ giữa ca theo cấu hình của ca trực và lưu trường workHours chính xác đến 2 chữ số thập phân.\n"
        "• Quản lý đơn xin nghỉ phép (Leave Requests): Cho phép nhân viên tạo đơn xin nghỉ phép trực tuyến, lựa chọn 1 trong 4 loại phép: Nghỉ phép năm "
        "(Annual Leave), Nghỉ ốm đau (Sick Leave), Nghỉ việc riêng (Personal Leave) hoặc Nghỉ không lương (Unpaid Leave); điền ngày bắt đầu, ngày kết thúc "
        "và lý do nghỉ việc. Nhân viên có thể theo dõi tiến độ xét duyệt hoặc chủ động hủy đơn khi đơn vẫn đang ở trạng thái 'pending'."
    ),
    (
        "3. Yêu cầu chức năng phân hệ Quản lý và Vận hành (Manager Requirements):\n"
        "• Quản lý cơ sở vật chất sân bãi: Thêm mới sân thể thao, chỉnh sửa thông tin mô tả, cập nhật giá thuê theo giờ, tải lên thư viện ảnh, "
        "chuyển đổi trạng thái hoạt động ('active') hoặc tạm ngừng để bảo trì ('maintenance').\n"
        "• Phân ca làm việc (Work Schedule Management): Lập kế hoạch phân công nhân sự theo ngày; lựa chọn nhân viên, ca trực và sân thể thao; "
        "hệ thống tự động kiểm tra ràng buộc unique ngăn chặn phân công trùng ca trong ngày cho cùng một nhân sự.\n"
        "• Tạo mã QR Token động cho sân: Quản lý có quyền tạo mã QR Code động cho từng sân với thời gian hết hạn linh hoạt (mặc định 120 phút) "
        "để phục vụ việc điểm danh chống gian lận của nhân viên ca trực.\n"
        "• Giám sát chấm công và phê duyệt nghỉ phép: Theo dõi danh sách nhân viên đang có mặt tại sân trong ngày; tiếp nhận danh sách các đơn xin "
        "nghỉ phép đang chờ duyệt và thực hiện thao tác Duyệt (Approve) hoặc Từ chối (Reject) kèm lý do phản hồi minh bạch."
    ),
    (
        "4. Yêu cầu chức năng phân hệ Quản trị viên cấp cao (Admin Requirements):\n"
        "• Quản trị tài khoản và hồ sơ nhân sự: Khởi tạo tài khoản nhân viên mới, tự động cấp mã nhân viên (dạng NVxxx) và tạo mật khẩu khởi tạo tạm thời; "
        "quản lý danh sách nhân sự theo phòng ban, vị trí công tác và mức lương cơ bản; thực hiện khóa hoặc mở khóa tài khoản người dùng.\n"
        "• Hiệu chỉnh chấm công có Audit Log kiểm toán: Khi nhân viên gặp sự cố kỹ thuật hoặc quên bấm giờ Check-out, Admin có quyền can thiệp "
        "sửa đổi giờ vào/ra hoặc trạng thái chấm công. Để đảm bảo tính minh bạch, hệ thống BẮT BUỘC Admin phải nhập lý do giải trình; mọi thông tin can thiệp "
        "được tự động ghi vết bất biến vào collection attendance_logs.\n"
        "• Tính toán bảng lương tự động (Payroll Engine): Tự động trích xuất số ngày công thực tế từ collection attendances trong tháng của từng nhân viên; "
        "áp dụng công thức chuẩn 26 ngày công để tính lương thời gian, cộng phụ cấp, tiền làm thêm giờ (overtime) và trừ các khoản khấu trừ phạt; "
        "quản lý trạng thái chi trả lương từ Bản nháp ('draft') đến Đã thanh toán ('paid').\n"
        "• Bảng điều khiển phân tích số liệu (Dashboard Analytics): Tự động tổng hợp 6 chỉ số KPI tổng quan thời gian thực (tổng khách hàng, tổng sân, "
        "tổng đơn đặt, nhân viên đang trực, tổng doanh thu, doanh thu tháng này) và hiển thị trực quan qua 4 biểu đồ Recharts chuyên nghiệp."
    ),
    (
        "5. Yêu cầu phi chức năng (Non-Functional Requirements):\n"
        "• Tính sẵn sàng và hiệu năng (Availability & Performance): Hệ thống đảm bảo tính sẵn sàng hoạt động 24/7/365. Thời gian phản hồi của các API "
        "tra cứu và đặt sân đạt mức dưới 100ms trong điều kiện vận hành bình thường; hỗ trợ xử lý đồng thời tối thiểu 500 kết nối đồng thời (concurrency) "
        "nhờ kiến trúc Non-blocking I/O của Node.js.\n"
        "• Tính toàn vẹn và nhất quán dữ liệu (Data Integrity): Sử dụng chiến lược Compound Indexing trên MongoDB để bảo toàn tính duy nhất và ngăn ngừa "
        "triệt để hiện tượng xung đột dữ liệu (Race Condition) khi nhiều khách hàng cùng thao tác đặt sân tại cùng một thời điểm.\n"
        "• Bảo mật thông tin (Security): Tuân thủ các nguyên tắc bảo mật web OWASP Top 10. Mật khẩu được mã hóa một chiều bằng bcrypt salt 10 rounds; "
        "xác thực qua JWT có thời hạn 7 ngày; áp dụng middleware Helmet thiết lập các tiêu đề bảo mật HTTP, CORS kiểm soát nguồn gốc và Express Rate Limit "
        "ngăn chặn tấn công Brute-force mật khẩu.\n"
        "• Tính tương thích và trải nghiệm người dùng (Usability & Responsiveness): Giao diện xây dựng theo chuẩn Responsive Web Design, tự động thích ứng "
        "mượt mà trên mọi kích thước màn hình từ Desktop (màn hình lớn), Laptop, Máy tính bảng (Tablet) đến Điện thoại thông minh (Mobile). "
        "Cung cấp tính năng '1-Click Demo Login' giúp người đánh giá trải nghiệm ngay lập tức quyền hạn của 4 vai trò mà không cần thao tác gõ phím."
    )
]

# 2.2 Use case hoặc luồng xử lý chính
SEC_2_2_TITLE = "2.2. Use case hoặc luồng xử lý chính"
SEC_2_2_CONTENT = [
    (
        "Nhằm mô hình hóa toàn diện các chức năng và tương tác giữa các tác nhân với hệ thống SportBooking, "
        "ngôn ngữ mô hình hóa thống nhất UML (Unified Modeling Language) được áp dụng để xây dựng hệ thống biểu đồ Use Case "
        "tổng quát, các biểu đồ Use Case chi tiết theo phân hệ, biểu đồ Hoạt động (Activity Diagram) và biểu đồ Tuần tự (Sequence Diagram)."
    )
]

# Các bảng đặc tả Use Case chi tiết
TABLE_2_1_CAPTION = "Bảng 2.1: Đặc tả Use Case UC-C03: Đặt sân thể thao trực tuyến chống trùng lịch"
TABLE_2_1_HEADERS = ["Thuộc tính Use Case", "Nội dung đặc tả chi tiết"]
TABLE_2_1_ROWS = [
    ("Mã Use Case", "UC-C03"),
    ("Tên Use Case", "Đặt sân thể thao trực tuyến chống trùng lịch (Anti-Collision Online Booking)"),
    ("Tác nhân (Actor)", "Khách hàng (Customer) đã đăng nhập vào hệ thống"),
    ("Mục đích", "Cho phép khách hàng lựa chọn sân, ngày chơi và khung giờ mong muốn để đặt sân trực tuyến an toàn"),
    ("Tiền điều kiện (Pre-conditions)", "1. Khách hàng đã đăng nhập tài khoản hợp lệ (có Bearer JWT token hợp lệ trong phiên làm việc).\n2. Sân thể thao được chọn đang ở trạng thái hoạt động bình thường ('active')."),
    ("Hậu điều kiện (Post-conditions)", "1. Một bản ghi Booking mới được tạo trong MongoDB với trạng thái 'confirmed' và 'paid'.\n2. Mã đơn đặt sân duy nhất được sinh ra và gửi về Client kèm vé điện tử mã QR Code.\n3. Khung giờ đã đặt được khóa ngay lập tức trên ma trận lịch của sân, không ai có thể đặt lại."),
    ("Luồng sự kiện chính (Main Flow)", "1. Khách hàng truy cập trang chi tiết sân (/courts/:id), chọn ngày muốn chơi trên bộ chọn ngày (Date Picker).\n2. Hệ thống gửi request lấy danh sách các khung giờ đã có người đặt trong ngày và hiển thị sơ đồ slot trực quan.\n3. Khách hàng chọn khung giờ còn trống (ví dụ: 18:00 - 20:00) và phương thức thanh toán mô phỏng.\n4. Khách hàng bấm nút 'Xác nhận đặt sân & Thanh toán'.\n5. Client gửi HTTP POST request đến /api/bookings kèm payload { courtId, date, startTime, endTime }.\n6. Backend tiếp nhận request, kiểm tra JWT xác thực người dùng.\n7. Service truy vấn các booking hiện có của sân trong ngày thông qua Compound Index { court: 1, date: 1, status: 1 }.\n8. Service thực thi thuật toán kiểm tra giao thoa khoảng thời gian: max(startTime_mới, existStart) < min(endTime_mới, existEnd).\n9. Hệ thống xác nhận không có bất kỳ sự trùng lặp nào, tính toán tổng số giờ và tổng tiền (totalPrice = totalHours * pricePerHour).\n10. Hệ thống sinh mã đơn hàng duy nhất BK-YYYYMMDD-XXXX và tạo document Booking trong collection bookings.\n11. Backend trả về HTTP status 201 Created kèm dữ liệu đơn đặt sân hoàn chỉnh.\n12. Client hiển thị Toast thông báo thành công và tự động điều hướng khách hàng tới trang Vé của tôi (/my-bookings)."),
    ("Luồng ngoại lệ (Alternate/Exception Flows)", "4a. Khách hàng chưa đăng nhập: Hệ thống tự động chuyển hướng đến trang /login kèm thông báo yêu cầu đăng nhập.\n8a. Phát hiện trùng lịch: Có khách hàng khác vừa đặt trùng khung giờ đó. Service ném ngoại lệ Conflict; Controller trả về HTTP 409 Conflict kèm thông điệp 'Khung giờ từ [startTime] đến [endTime] đã có người đặt trước!'. Client hiển thị cảnh báo đỏ và yêu cầu khách hàng chọn khung giờ khác.\n8b. Khung giờ nằm ngoài giờ mở cửa: Controller trả về HTTP 400 Bad Request kèm thông điệp 'Khung giờ đặt nằm ngoài thời gian hoạt động của sân bãi'.")
]

TABLE_2_2_CAPTION = "Bảng 2.2: Đặc tả Use Case UC-S02: Chấm công Vào/Ra và quét mã QR Code"
TABLE_2_2_HEADERS = ["Thuộc tính Use Case", "Nội dung đặc tả chi tiết"]
TABLE_2_2_ROWS = [
    ("Mã Use Case", "UC-S02"),
    ("Tên Use Case", "Chấm công Vào/Ra và quét mã QR Code (Staff Realtime Attendance & QR Verification)"),
    ("Tác nhân (Actor)", "Nhân viên vận hành (Staff) được phân công ca trực"),
    ("Mục đích", "Ghi nhận thời gian bắt đầu và kết thúc ca làm việc thực tế của nhân viên tại sân, tự động phát hiện đi muộn và tính tổng giờ làm việc"),
    ("Tiền điều kiện (Pre-conditions)", "1. Nhân viên đã đăng nhập tài khoản có role = 'staff'.\n2. Nhân viên có lịch phân ca (WorkSchedule) hợp lệ trong ngày hiện tại."),
    ("Hậu điều kiện (Post-conditions)", "1. Bản ghi Attendance được tạo (khi Check-in) hoặc cập nhật (khi Check-out) trong CSDL.\n2. Một bản ghi kiểm toán mới được tự động thêm vào collection attendance_logs ghi lại hành động."),
    ("Luồng sự kiện chính (Main Flow - Check-in)", "1. Nhân viên truy cập trang Chấm công (/staff/attendance) trên điện thoại hoặc máy tính tại sân.\n2. Giao diện hiển thị đồng hồ thời gian thực, thông tin ca trực phân công và nút 'Check-in (Vào ca)'.\n3. Nhân viên quét mã QR hiển thị tại bàn điều phối của sân hoặc nhập mã token (ví dụ: QR-SBD-849201).\n4. Nhân viên bấm nút 'Check-in'.\n5. Client gửi HTTP POST /api/attendance/check-in { workScheduleId, qrToken }.\n6. Service xác thực mã QR token trong collection qr_tokens: kiểm tra xem mã có tồn tại, isActive == true và chưa hết hạn hay không.\n7. Service kiểm tra xem nhân viên đã Check-in ca này trước đó chưa. Nếu chưa, tiến hành so sánh thời điểm Check-in hiện tại với (shift.startTime + shift.gracePeriod).\n8. Nếu thời điểm vào <= startTime + gracePeriod, gán status = 'present' (Đúng giờ); ngược lại gán status = 'late' (Đi muộn).\n9. Tạo bản ghi Attendance mới với checkIn = now(), qrVerified = true, status tương ứng.\n10. Tự động tạo bản ghi trong attendance_logs với action = 'check_in', reason = 'Quét mã QR tại sân'.\n11. Trả về HTTP 201 Created; Client cập nhật giao diện hiển thị trạng thái đã vào ca."),
    ("Luồng sự kiện chính (Main Flow - Check-out)", "1. Khi hết ca trực, nhân viên quay lại trang Chấm công và bấm nút 'Check-out (Tan ca)'.\n2. Client gửi HTTP POST /api/attendance/check-out { workScheduleId }.\n3. Service tìm bản ghi Attendance hôm nay của nhân viên; kiểm tra điều kiện đã có checkIn và chưa có checkOut.\n4. Service tính tổng thời gian làm việc: diffMinutes = (now() - checkIn) / 60000.\n5. Service kiểm tra cấu hình ca trực; nếu có giờ nghỉ giữa ca (breakStart và breakEnd), tự động khấu trừ thời gian nghỉ.\n6. Tính toán workHours = round(netMinutes / 60, 2).\n7. Cập nhật bản ghi Attendance với checkOut = now() và workHours tính được.\n8. Tự động ghi vết vào attendance_logs với action = 'check_out'.\n9. Trả về HTTP 200 OK; giao diện hiển thị tổng số giờ làm việc thực tế hoàn thành trong ca."),
    ("Luồng ngoại lệ (Alternate/Exception Flows)", "3a. Mã QR hết hạn hoặc sai: Hệ thống báo lỗi HTTP 400 'Mã QR không hợp lệ hoặc đã hết hạn'.\n7a. Nhân viên bấm Check-in lần thứ 2: Hệ thống từ chối với lỗi HTTP 400 'Bạn đã điểm danh vào ca trực này rồi'.\n3b. Bấm Check-out khi chưa Check-in: Hệ thống từ chối với lỗi HTTP 400 'Bạn chưa điểm danh vào ca nên không thể tan ca'.")
]

TABLE_2_3_CAPTION = "Bảng 2.3: Đặc tả Use Case UC-A01: Hiệu chỉnh công nhân viên và bắt buộc ghi Audit Log"
TABLE_2_3_HEADERS = ["Thuộc tính Use Case", "Nội dung đặc tả chi tiết"]
TABLE_2_3_ROWS = [
    ("Mã Use Case", "UC-A01"),
    ("Tên Use Case", "Hiệu chỉnh chấm công nhân viên và bắt buộc ghi Audit Log (Admin Attendance Override with Audit Log)"),
    ("Tác nhân (Actor)", "Quản trị viên (Admin) hoặc Quản lý chi nhánh (Manager) có thẩm quyền"),
    ("Mục đích", "Cho phép cấp quản lý điều chỉnh giờ vào, giờ ra hoặc trạng thái công của nhân viên khi có sự cố bất khả kháng, đồng thời bảo đảm tính minh bạch tuyệt đối qua việc lưu vết kiểm toán bắt buộc"),
    ("Tiền điều kiện (Pre-conditions)", "Người dùng đăng nhập tài khoản có role là 'admin' hoặc 'manager'."),
    ("Hậu điều kiện (Post-conditions)", "1. Bản ghi Attendance được cập nhật lại giờ công và tính toán lại workHours.\n2. Bản ghi AttendanceLog mới được sinh ra lưu trữ chi tiết người sửa, giá trị cũ, giá trị mới và lý do."),
    ("Luồng sự kiện chính (Main Flow)", "1. Admin truy cập trang Quản lý chấm công (/admin/attendance), tìm kiếm bản ghi công của nhân viên cần chỉnh sửa.\n2. Admin mở modal hiệu chỉnh, điều chỉnh lại giờ check-in, giờ check-out hoặc đổi trạng thái từ 'late' sang 'present'.\n3. Admin BẮT BUỘC phải điền nội dung vào trường 'Lý do hiệu chỉnh' (ví dụ: 'Nhân viên quên bấm giờ ra lúc 14:00 do hỗ trợ cấp cứu khách hàng').\n4. Admin bấm nút 'Lưu thay đổi'.\n5. Client gửi HTTP PUT /api/attendance/:id kèm payload { checkIn, checkOut, status, reason }.\n6. Backend middleware xác thực quyền Admin/Manager; Zod validator kiểm tra trường reason không được để trống.\n7. Service truy vấn Attendance hiện tại, sao chép đối tượng giá trị cũ (oldValue).\n8. Service cập nhật thông tin mới vào Attendance và tự động tính toán lại số giờ làm việc thực tế (workHours).\n9. Service tạo một bản ghi mới trong collection attendance_logs với đầy đủ: attendanceId, action = 'admin_override', oldValue, newValue, performedBy = adminId, reason = reason, createdAt = now().\n10. Backend trả về HTTP 200 OK kèm thông tin chấm công đã hiệu chỉnh.\n11. Client hiển thị Toast thông báo cập nhật thành công và cập nhật lại bảng lịch sử kiểm toán Audit Log."),
    ("Luồng ngoại lệ (Alternate/Exception Flows)", "3a. Admin không nhập lý do: Nút Lưu bị vô hiệu hóa ở Client; nếu gửi qua API thì Zod Validator chặn với lỗi HTTP 422 'Lý do hiệu chỉnh là bắt buộc để đảm bảo tính minh bạch kiểm toán'.\n6a. Người dùng không có quyền Admin/Manager: Hệ thống chặn với HTTP 403 Forbidden.")
]

# 2.3 Thiết kế kiến trúc hệ thống
SEC_2_3_TITLE = "2.3. Thiết kế kiến trúc hệ thống"
SEC_2_3_CONTENT = [
    (
        "Hệ thống SportBooking áp dụng mô hình Kiến trúc Phân tầng (Layered Architecture) chuẩn doanh nghiệp, "
        "kết hợp hài hòa giữa kiến trúc ứng dụng web đơn trang (Single Page Application - SPA) ở phía Frontend "
        "và hệ thống dịch vụ giao diện lập trình ứng dụng RESTful API phi trạng thái (Stateless API) ở phía Backend. "
        "Sự phân tách này mang lại sự độc lập hoàn toàn giữa logic hiển thị giao diện và logic xử lý nghiệp vụ máy chủ."
    ),
    (
        "Phân tích chuyên sâu 4 tầng kiến trúc của hệ thống:\n"
        "1. Tầng Trình diễn (Presentation Layer - Client SPA):\n"
        "Được xây dựng trên nền tảng React 18 kết hợp ngôn ngữ TypeScript và công cụ đóng gói siêu tốc Vite. "
        "Giao diện người dùng áp dụng triết lý thiết kế dựa trên các thành phần tái sử dụng (Component-Driven Development), "
        "tối ưu hóa tốc độ tải trang bằng cơ chế Virtual DOM và kỹ thuật chia nhỏ mã nguồn (Code Splitting). "
        "Toàn bộ kiểu dáng được định nghĩa qua Tailwind CSS theo phương pháp Utility-First, đảm bảo tính responsive tuyệt đối. "
        "Trạng thái xác thực người dùng được quản lý tập trung thông qua React Context (AuthContext), tự động đồng bộ JWT token "
        "với bộ nhớ cục bộ (localStorage) của trình duyệt. Tầng này được chia thành 4 cổng phân hệ giao diện chuyên biệt: "
        "Customer Portal, Staff Portal, Manager Portal và Admin Dashboard.\n"
        "2. Tầng Cổng API & Bảo mật (API Gateway & Middleware Layer):\n"
        "Là chốt chặn an ninh đầu tiên tiếp nhận mọi HTTP/HTTPS request gửi đến từ Client. Tầng này bao gồm một chuỗi các Middleware "
        "được thực thi tuần tự theo mô hình đường ống (Pipeline):\n"
        "• Helmet Middleware: Tự động cấu hình các tiêu đề bảo mật HTTP (Content-Security-Policy, X-Frame-Options, X-XSS-Protection) "
        "nhằm ngăn chặn các cuộc tấn công Clickjacking và Cross-Site Scripting (XSS).\n"
        "• CORS Middleware: Kiểm soát chặt chẽ các nguồn gốc tên miền (Origins) được phép gửi request đến máy chủ API.\n"
        "• Express Rate Limit Middleware: Thiết lập hạn ngạch truy cập tối đa 100 requests trong vòng 15 phút trên mỗi địa chỉ IP, "
        "bảo vệ hệ thống trước các cuộc tấn công từ chối dịch vụ (DoS) và các công cụ dò quét mật khẩu tự động.\n"
        "• Auth JWT Middleware: Trích xuất và giải mã Bearer Token trong tiêu đề 'Authorization', kiểm tra chữ ký số và thời hạn hiệu lực, "
        "sau đó gắn thông tin người dùng (req.user) vào đối tượng request.\n"
        "• RBAC Guard Middleware: Đối chiếu vai trò của người dùng (role) với danh sách các quyền được phép truy cập của từng endpoint; "
        "nếu không thỏa mãn, lập tức ngắt chuỗi xử lý và trả về HTTP 403 Forbidden.\n"
        "• Zod Validation Middleware: Kiểm tra cấu trúc và kiểu dữ liệu của Body, Query, Params dựa trên các lược đồ schema đã định nghĩa trước.\n"
        "3. Tầng Nghiệp vụ cốt lõi (Business Logic & Service Layer):\n"
        "Bao gồm các Controllers và Services độc lập. Controllers chịu trách nhiệm tiếp nhận dữ liệu DTO đã được xác thực, gọi các phương thức "
        "tương ứng trong tầng Service và định dạng kết quả trả về theo chuẩn JSON Response Envelope. Tầng Service là nơi chứa toàn bộ tri thức nghiệp vụ "
        "và các thuật toán cốt lõi của hệ thống:\n"
        "• AuthService: Xử lý logic băm mật khẩu bằng bcryptjs, xác thực đăng nhập, ký số JWT token, cập nhật thông tin cá nhân và quản lý tài khoản.\n"
        "• BookingService: Chứa thuật toán kiểm tra chống trùng lịch (Anti-collision Time Overlap), tính toán đơn giá theo giờ, sinh mã đặt sân "
        "định dạng duy nhất, xử lý hủy đơn và hoàn tiền mô phỏng.\n"
        "• AttendanceService: Xử lý quy trình chấm công vào/ra thời gian thực, đối soát thời gian ân hạn trễ (gracePeriod), tính tổng giờ làm việc "
        "thực tế sau khi trừ giờ nghỉ giữa ca, sinh mã QR Token động có thời hạn và bắt buộc ghi nhận lịch sử kiểm toán vào AttendanceLog.\n"
        "• PayrollService: Tự động tổng hợp số ngày công thực tế từ collection attendances, áp dụng công thức tính lương chuẩn 26 công, "
        "tính phụ cấp, tăng ca, khấu trừ và quản trị vòng đời bảng lương.\n"
        "• ReportService: Thực hiện các truy vấn tổng hợp phức tạp, trích xuất dữ liệu doanh thu 6 tháng, tỷ trọng đặt sân theo môn thể thao "
        "và cơ cấu nhân sự phục vụ hiển thị trên Dashboard Recharts.\n"
        "4. Tầng Dữ liệu và Truy xuất (Persistence Data Layer):\n"
        "Sử dụng thư viện Mongoose ODM để ánh xạ các đối tượng mô hình dữ liệu trong ứng dụng Node.js vào cơ sở dữ liệu MongoDB. "
        "Tầng này quản lý 12 Collections chuẩn hóa, áp dụng chiến lược Compound Indexing đa trường để tối ưu hóa triệt để tốc độ truy vấn."
    )
]

# 2.4 Thiết kế cơ sở dữ liệu
SEC_2_4_TITLE = "2.4. Thiết kế cơ sở dữ liệu"
SEC_2_4_CONTENT = [
    (
        "Cơ sở dữ liệu của SportBooking được xây dựng trên hệ quản trị cơ sở dữ liệu NoSQL hướng tài liệu MongoDB phiên bản 7.0+. "
        "Khác với các hệ CSDL quan hệ truyền thống (RDBMS) thường yêu cầu các phép nối bảng (JOIN) phức tạp gây suy giảm hiệu năng "
        "khi dữ liệu phình to, MongoDB lưu trữ dữ liệu dưới định dạng nhị phân BSON linh hoạt, cho phép lồng ghép tài liệu con (Embedded Documents) "
        "hoặc thiết lập liên kết tham chiếu (References) thông qua kiểu dữ liệu ObjectId."
    ),
    (
        "Hệ thống thiết kế chuẩn hóa 12 Collections chuyên biệt, được chia thành hai khối nghiệp vụ lớn:\n"
        "• Khối Nghiệp vụ Dịch vụ & Đặt sân: Bao gồm users, courts, bookings, reviews, qr_tokens.\n"
        "• Khối Nghiệp vụ Quản trị Nhân sự & Vận hành: Bao gồm employees, shifts, work_schedules, attendances, attendance_logs, leave_requests, payrolls."
    )
]

# Từ điển dữ liệu 12 Collections
TABLE_2_4_CAPTION = "Bảng 2.4: Từ điển dữ liệu chi tiết Collection User (Tài khoản người dùng)"
TABLE_2_4_HEADERS = ["Tên trường (Field)", "Kiểu dữ liệu", "Ràng buộc", "Mô tả ý nghĩa nghiệp vụ"]
TABLE_2_4_ROWS = [
    ("_id", "ObjectId", "Primary Key, Auto", "Mã định danh duy nhất của tài khoản người dùng trong MongoDB"),
    ("email", "String", "Required, Unique, Trim, Lowercase", "Địa chỉ email sử dụng làm tên đăng nhập hệ thống"),
    ("password", "String", "Required, Min: 6", "Mật khẩu người dùng đã được băm một chiều qua bcrypt (salt 10 rounds)"),
    ("fullName", "String", "Required, Trim", "Họ và tên đầy đủ của người dùng"),
    ("phone", "String", "Required, Regex phone VN", "Số điện thoại liên hệ chính thức của người dùng"),
    ("avatar", "String", "Optional, Default avatar URL", "Đường dẫn URL ảnh đại diện của người dùng"),
    ("role", "String", "Required, Enum (4 roles)", "Vai trò người dùng trong hệ thống: 'admin', 'manager', 'staff', 'customer'"),
    ("isActive", "Boolean", "Required, Default: true", "Trạng thái kích hoạt tài khoản (true: hoạt động, false: bị khóa)"),
    ("mustChangePassword", "Boolean", "Required, Default: false", "Cờ đánh dấu bắt buộc đổi mật khẩu khi đăng nhập lần đầu (nhân viên mới)"),
    ("createdAt", "Date", "Auto generated", "Thời điểm tài khoản được khởi tạo trong hệ thống"),
    ("updatedAt", "Date", "Auto generated", "Thời điểm thông tin tài khoản được cập nhật gần nhất")
]

TABLE_2_5_CAPTION = "Bảng 2.5: Từ điển dữ liệu chi tiết Collection Court (Sân thể thao)"
TABLE_2_5_HEADERS = ["Tên trường (Field)", "Kiểu dữ liệu", "Ràng buộc", "Mô tả ý nghĩa nghiệp vụ"]
TABLE_2_5_ROWS = [
    ("_id", "ObjectId", "Primary Key, Auto", "Mã định danh duy nhất của sân thể thao"),
    ("name", "String", "Required, Trim", "Tên gọi định danh sân (ví dụ: Sân bóng đá mini số 1)"),
    ("type", "String", "Required, Enum (6 môn)", "Loại hình môn thể thao: 'football', 'badminton', 'tennis', 'pickleball', 'basketball', 'volleyball'"),
    ("description", "String", "Required", "Đoạn văn bản mô tả chi tiết quy cách, chất lượng mặt cỏ, tiêu chuẩn thi đấu của sân"),
    ("address", "String", "Required", "Địa chỉ cụ thể nơi đặt sân bãi (đường, phường, quận/huyện, thành phố)"),
    ("images", "Array of Strings", "Required, Min: 1", "Mảng danh sách các đường dẫn URL hình ảnh thực tế của sân thể thao"),
    ("pricePerHour", "Number", "Required, Min: 0", "Đơn giá thuê sân tính theo mỗi giờ thi đấu (đơn vị: VNĐ)"),
    ("amenities", "Array of Strings", "Optional", "Mảng danh sách các tiện ích đi kèm: 'Wifi', 'Đèn LED', 'Phòng tắm', 'Điều hòa', 'Chỗ đỗ xe'"),
    ("openingTime", "String", "Required, Format HH:mm", "Thời điểm bắt đầu mở cửa đón khách trong ngày (ví dụ: '06:00')"),
    ("closingTime", "String", "Required, Format HH:mm", "Thời điểm đóng cửa kết thúc hoạt động trong ngày (ví dụ: '23:00')"),
    ("status", "String", "Required, Enum", "Trạng thái vận hành sân: 'active' (hoạt động), 'maintenance' (bảo trì)"),
    ("ratingAvg", "Number", "Default: 5.0, Min: 1, Max: 5", "Điểm đánh giá trung bình của khách hàng sau các lượt thuê"),
    ("totalReviews", "Number", "Default: 0", "Tổng số lượt đánh giá mà sân đã nhận được từ khách hàng")
]

TABLE_2_6_CAPTION = "Bảng 2.6: Từ điển dữ liệu chi tiết Collection Booking (Đơn đặt sân)"
TABLE_2_6_HEADERS = ["Tên trường (Field)", "Kiểu dữ liệu", "Ràng buộc", "Mô tả ý nghĩa nghiệp vụ"]
TABLE_2_6_ROWS = [
    ("_id", "ObjectId", "Primary Key, Auto", "Mã định danh duy nhất của đơn đặt sân"),
    ("bookingCode", "String", "Required, Unique", "Mã vé điện tử duy nhất sinh tự động theo quy chuẩn: BK-YYYYMMDD-XXXX"),
    ("user", "ObjectId", "Required, Ref: User", "Khóa ngoại tham chiếu đến tài khoản khách hàng thực hiện đặt sân"),
    ("court", "ObjectId", "Required, Ref: Court", "Khóa ngoại tham chiếu đến sân thể thao được đặt thuê"),
    ("date", "String", "Required, Format YYYY-MM-DD", "Ngày diễn ra trận đấu / buổi chơi thể thao"),
    ("startTime", "String", "Required, Format HH:mm", "Giờ bắt đầu thi đấu tại sân (ví dụ: '18:00')"),
    ("endTime", "String", "Required, Format HH:mm", "Giờ kết thúc thi đấu tại sân (ví dụ: '20:00')"),
    ("totalHours", "Number", "Required, Min: 0.5", "Tổng số giờ thi đấu = (timeToMinutes(endTime) - timeToMinutes(startTime)) / 60"),
    ("pricePerHour", "Number", "Required", "Đơn giá thuê sân tại thời điểm khách hàng tiến hành xác nhận đặt"),
    ("totalPrice", "Number", "Required", "Tổng số tiền thanh toán = totalHours * pricePerHour (đơn vị: VNĐ)"),
    ("status", "String", "Required, Enum", "Trạng thái đơn: 'pending', 'confirmed', 'completed', 'cancelled'"),
    ("paymentStatus", "String", "Required, Enum", "Trạng thái thanh toán: 'unpaid', 'paid', 'refunded'"),
    ("paymentMethod", "String", "Required, Enum", "Phương thức thanh toán: 'sandbox', 'cash', 'bank_transfer'"),
    ("notes", "String", "Optional", "Ghi chú thêm của khách hàng khi đặt sân (ví dụ: yêu cầu mượn thêm áo pitch)"),
    ("cancelReason", "String", "Optional", "Lý do hủy đơn đặt sân do khách hàng hoặc quản lý cung cấp khi hủy vé")
]

TABLE_2_7_CAPTION = "Bảng 2.7: Từ điển dữ liệu chi tiết Collection Shift (Ca làm việc)"
TABLE_2_7_HEADERS = ["Tên trường (Field)", "Kiểu dữ liệu", "Ràng buộc", "Mô tả ý nghĩa nghiệp vụ"]
TABLE_2_7_ROWS = [
    ("_id", "ObjectId", "Primary Key, Auto", "Mã định danh duy nhất của ca làm việc"),
    ("name", "String", "Required, Trim", "Tên gọi ca làm việc (ví dụ: 'Ca sáng', 'Ca chiều', 'Ca tối')"),
    ("startTime", "String", "Required, Format HH:mm", "Giờ bắt đầu làm việc chính thức của ca (ví dụ: '06:00')"),
    ("endTime", "String", "Required, Format HH:mm", "Giờ kết thúc ca làm việc (ví dụ: '14:00')"),
    ("breakStart", "String", "Optional, Format HH:mm", "Giờ bắt đầu nghỉ giải lao giữa ca (ví dụ: '11:30')"),
    ("breakEnd", "String", "Optional, Format HH:mm", "Giờ kết thúc nghỉ giải lao giữa ca (ví dụ: '12:00')"),
    ("gracePeriod", "Number", "Default: 15", "Khoảng thời gian ân hạn trễ cho phép tính bằng phút (Check-in sau khoảng này bị tính là đi muộn)"),
    ("status", "String", "Default: 'active', Enum", "Trạng thái áp dụng của ca làm việc: 'active' hoặc 'inactive'")
]

TABLE_2_8_CAPTION = "Bảng 2.8: Từ điển dữ liệu chi tiết Collection WorkSchedule (Phân ca trực)"
TABLE_2_8_HEADERS = ["Tên trường (Field)", "Kiểu dữ liệu", "Ràng buộc", "Mô tả ý nghĩa nghiệp vụ"]
TABLE_2_8_ROWS = [
    ("_id", "ObjectId", "Primary Key, Auto", "Mã định danh duy nhất của lịch phân ca"),
    ("employee", "ObjectId", "Required, Ref: Employee", "Khóa ngoại tham chiếu đến hồ sơ nhân viên được phân công"),
    ("shift", "ObjectId", "Required, Ref: Shift", "Khóa ngoại tham chiếu đến ca làm việc được giao"),
    ("court", "ObjectId", "Required, Ref: Court", "Khóa ngoại tham chiếu đến sân thể thao cụ thể mà nhân viên phụ trách trực"),
    ("date", "String", "Required, Format YYYY-MM-DD", "Ngày nhân viên thực hiện ca trực theo phân công"),
    ("status", "String", "Required, Enum", "Trạng thái ca trực: 'assigned' (đã phân), 'completed' (hoàn thành), 'absent' (vắng mặt)"),
    ("note", "String", "Optional", "Ghi chú điều phối ca trực từ quản lý"),
    ("createdBy", "ObjectId", "Ref: User", "Mã tài khoản quản lý đã tạo lịch phân ca này")
]

TABLE_2_9_CAPTION = "Bảng 2.9: Từ điển dữ liệu chi tiết Collection Attendance (Chấm công thực tế)"
TABLE_2_9_HEADERS = ["Tên trường (Field)", "Kiểu dữ liệu", "Ràng buộc", "Mô tả ý nghĩa nghiệp vụ"]
TABLE_2_9_ROWS = [
    ("_id", "ObjectId", "Primary Key, Auto", "Mã định danh duy nhất của lượt chấm công"),
    ("employee", "ObjectId", "Required, Ref: Employee", "Khóa ngoại tham chiếu đến nhân viên thực hiện chấm công"),
    ("workSchedule", "ObjectId", "Required, Ref: WorkSchedule", "Khóa ngoại tham chiếu đến lịch phân ca trực tương ứng trong ngày"),
    ("date", "String", "Required, Format YYYY-MM-DD", "Ngày ghi nhận lượt chấm công"),
    ("checkIn", "Date", "Required", "Thời điểm chính xác nhân viên bấm Check-in vào ca làm"),
    ("checkOut", "Date", "Optional", "Thời điểm chính xác nhân viên bấm Check-out tan ca làm"),
    ("workHours", "Number", "Default: 0", "Tổng số giờ làm việc thực tế được ghi nhận sau khi trừ thời gian nghỉ giữa ca"),
    ("status", "String", "Required, Enum", "Trạng thái giờ vào: 'present' (đúng giờ), 'late' (đi muộn), 'absent' (vắng mặt)"),
    ("qrVerified", "Boolean", "Default: false", "Cờ đánh dấu lượt chấm công đã được xác thực qua quét mã QR động tại sân hay chưa"),
    ("note", "String", "Optional", "Ghi chú giải trình của nhân viên hoặc ghi chú từ người quản lý")
]

TABLE_2_10_CAPTION = "Bảng 2.10: Từ điển dữ liệu chi tiết Collection AttendanceLog (Lịch sử kiểm toán Audit Log)"
TABLE_2_10_HEADERS = ["Tên trường (Field)", "Kiểu dữ liệu", "Ràng buộc", "Mô tả ý nghĩa nghiệp vụ"]
TABLE_2_10_ROWS = [
    ("_id", "ObjectId", "Primary Key, Auto", "Mã định danh duy nhất của bản ghi lưu vết kiểm toán"),
    ("attendance", "ObjectId", "Required, Ref: Attendance", "Khóa ngoại tham chiếu đến bản ghi chấm công bị tác động"),
    ("action", "String", "Required, Enum", "Hành động thực hiện: 'check_in', 'check_out', 'admin_override'"),
    ("oldValue", "Object", "Optional", "Đối tượng JSON chụp lại trạng thái dữ liệu cũ trước khi can thiệp chỉnh sửa"),
    ("newValue", "Object", "Optional", "Đối tượng JSON chụp lại trạng thái dữ liệu mới sau khi can thiệp chỉnh sửa"),
    ("performedBy", "ObjectId", "Required, Ref: User", "Mã tài khoản người đã thực hiện hành động này (Nhân viên hoặc Admin/Manager)"),
    ("reason", "String", "Required", "Nội dung giải trình lý do can thiệp (BẮT BUỘC đối với thao tác admin_override)"),
    ("createdAt", "Date", "Auto generated", "Thời điểm chính xác thao tác kiểm toán được ghi lại (Bất biến, không thể xóa)")
]

TABLE_2_11_CAPTION = "Bảng 2.11: Từ điển dữ liệu chi tiết Collection LeaveRequest (Đơn xin nghỉ phép)"
TABLE_2_11_HEADERS = ["Tên trường (Field)", "Kiểu dữ liệu", "Ràng buộc", "Mô tả ý nghĩa nghiệp vụ"]
TABLE_2_11_ROWS = [
    ("_id", "ObjectId", "Primary Key, Auto", "Mã định danh duy nhất của đơn xin nghỉ phép"),
    ("employee", "ObjectId", "Required, Ref: Employee", "Khóa ngoại tham chiếu đến nhân viên nộp đơn xin nghỉ"),
    ("startDate", "String", "Required, Format YYYY-MM-DD", "Ngày bắt đầu kỳ nghỉ phép"),
    ("endDate", "String", "Required, Format YYYY-MM-DD", "Ngày kết thúc kỳ nghỉ phép (Ràng buộc: endDate >= startDate)"),
    ("type", "String", "Required, Enum", "Loại nghỉ phép: 'annual' (phép năm), 'sick' (ốm đau), 'personal' (việc riêng), 'unpaid' (không lương)"),
    ("reason", "String", "Required", "Nội dung lý do xin nghỉ phép do nhân viên trình bày"),
    ("status", "String", "Required, Enum", "Trạng thái đơn: 'pending' (chờ duyệt), 'approved' (đã duyệt), 'rejected' (từ chối), 'cancelled' (đã hủy)"),
    ("approvedBy", "ObjectId", "Optional, Ref: User", "Mã tài khoản quản lý/admin đã thực hiện phê duyệt hoặc từ chối đơn"),
    ("approvedAt", "Date", "Optional", "Thời điểm cấp quản lý đưa ra quyết định xử lý đơn"),
    ("responseNote", "String", "Optional", "Ý kiến phản hồi bằng văn bản của cấp quản lý gửi lại cho nhân viên")
]

TABLE_2_12_CAPTION = "Bảng 2.12: Từ điển dữ liệu chi tiết Collection Payroll (Bảng tính lương tháng)"
TABLE_2_12_HEADERS = ["Tên trường (Field)", "Kiểu dữ liệu", "Ràng buộc", "Mô tả ý nghĩa nghiệp vụ"]
TABLE_2_12_ROWS = [
    ("_id", "ObjectId", "Primary Key, Auto", "Mã định danh duy nhất của bản ghi bảng lương"),
    ("employee", "ObjectId", "Required, Ref: Employee", "Khóa ngoại tham chiếu đến nhân viên được tính lương"),
    ("month", "Number", "Required, 1 - 12", "Tháng tính toán kỳ lương"),
    ("year", "Number", "Required, Min: 2024", "Năm tính toán kỳ lương"),
    ("baseSalary", "Number", "Required", "Mức lương cơ bản thỏa thuận theo hợp đồng của nhân viên (VNĐ)"),
    ("totalWorkDays", "Number", "Required, Default: 0", "Tổng số ngày công đi làm thực tế có Check-in và Check-out trong tháng"),
    ("totalWorkHours", "Number", "Required, Default: 0", "Tổng số giờ làm việc thực tế đã hoàn thành trong tháng"),
    ("allowance", "Number", "Default: 0", "Khoản tiền phụ cấp công việc (ăn trưa, trách nhiệm, đi lại)"),
    ("overtimePay", "Number", "Default: 0", "Khoản tiền chi trả cho số giờ làm thêm ngoài giờ tiêu chuẩn"),
    ("deduction", "Number", "Default: 0", "Khoản tiền khấu trừ do đi muộn, vi phạm nội quy hoặc tạm ứng trước"),
    ("totalSalary", "Number", "Required", "Tổng lương thực nhận = max(0, round((baseSalary / 26) * totalWorkDays) + allowance + overtimePay - deduction)"),
    ("status", "String", "Required, Enum", "Trạng thái thanh toán bảng lương: 'draft' (nháp), 'approved' (đã duyệt), 'paid' (đã chi trả)"),
    ("notes", "String", "Optional", "Ghi chú kế toán khi lập và duyệt bảng lương")
]

TABLE_2_13_CAPTION = "Bảng 2.13: Từ điển dữ liệu chi tiết Collection QrToken (Mã xác thực có thời hạn)"
TABLE_2_13_HEADERS = ["Tên trường (Field)", "Kiểu dữ liệu", "Ràng buộc", "Mô tả ý nghĩa nghiệp vụ"]
TABLE_2_13_ROWS = [
    ("_id", "ObjectId", "Primary Key, Auto", "Mã định danh duy nhất của bản ghi mã QR Token"),
    ("court", "ObjectId", "Required, Ref: Court", "Khóa ngoại tham chiếu đến sân thể thao áp dụng mã QR này"),
    ("code", "String", "Required, Unique", "Chuỗi mã token ngẫu nhiên sinh bằng UUID v4 gắn trong mã QR Code"),
    ("expiresAt", "Date", "Required", "Thời điểm mã QR hết hạn hiệu lực (mặc định sau 120 phút kể từ lúc sinh)"),
    ("isActive", "Boolean", "Required, Default: true", "Trạng thái hiệu lực của token (true: còn dùng được, false: đã bị hủy)")
]

TABLE_2_14_CAPTION = "Bảng 2.14: Từ điển dữ liệu chi tiết Collection Review (Đánh giá nhận xét sân)"
TABLE_2_14_HEADERS = ["Tên trường (Field)", "Kiểu dữ liệu", "Ràng buộc", "Mô tả ý nghĩa nghiệp vụ"]
TABLE_2_14_ROWS = [
    ("_id", "ObjectId", "Primary Key, Auto", "Mã định danh duy nhất của lượt đánh giá"),
    ("court", "ObjectId", "Required, Ref: Court", "Khóa ngoại tham chiếu đến sân thể thao được đánh giá"),
    ("user", "ObjectId", "Required, Ref: User", "Khóa ngoại tham chiếu đến khách hàng viết bài nhận xét"),
    ("booking", "ObjectId", "Required, Ref: Booking", "Khóa ngoại tham chiếu đến đơn đặt sân đã hoàn thành ('completed')"),
    ("rating", "Number", "Required, Min: 1, Max: 5", "Số điểm sao đánh giá chất lượng (từ 1 đến 5 sao)"),
    ("comment", "String", "Required, Trim", "Nội dung nhận xét chi tiết của khách hàng về chất lượng mặt sân và dịch vụ"),
    ("createdAt", "Date", "Auto generated", "Thời điểm khách hàng gửi bài đánh giá lên hệ thống")
]

TABLE_2_15_CAPTION = "Bảng 2.15: Từ điển dữ liệu chi tiết Collection Employee (Hồ sơ nhân viên)"
TABLE_2_15_HEADERS = ["Tên trường (Field)", "Kiểu dữ liệu", "Ràng buộc", "Mô tả ý nghĩa nghiệp vụ"]
TABLE_2_15_ROWS = [
    ("_id", "ObjectId", "Primary Key, Auto", "Mã định danh duy nhất của hồ sơ nhân sự"),
    ("employeeCode", "String", "Required, Unique", "Mã số nhân viên chính thức trong doanh nghiệp (ví dụ: 'NV001', 'NV002')"),
    ("user", "ObjectId", "Required, Ref: User", "Khóa ngoại liên kết 1-1 với tài khoản đăng nhập tương ứng"),
    ("department", "String", "Required", "Phòng ban công tác: 'Vận hành sân', 'Kỹ thuật bảo trì', 'Lễ tân điều phối'"),
    ("position", "String", "Required", "Vị trí chức danh công việc: 'Nhân viên trực sân', 'Tổ trưởng ca', 'Quản lý cơ sở'"),
    ("baseSalary", "Number", "Required, Min: 0", "Mức lương cơ bản thỏa thuận trên hợp đồng lao động làm căn cứ tính công (VNĐ)"),
    ("startDate", "String", "Required", "Ngày chính thức tiếp nhận công việc tại trung tâm thể thao"),
    ("status", "String", "Required, Enum", "Trạng thái nhân sự: 'active' (đang làm việc), 'resigned' (đã nghỉ việc)")
]

TABLE_2_16_CAPTION = "Bảng 2.16: Chiến lược đánh chỉ mục Compound Indexes và phân tích độ phức tạp thuật toán"
TABLE_2_16_HEADERS = ["Tên Collection", "Cấu trúc Chỉ mục (Index Structure)", "Loại chỉ mục", "Mục đích tối ưu hóa và Phân tích độ phức tạp"]
TABLE_2_16_ROWS = [
    ("users", "{ email: 1 }", "Single Field, Unique", "Tối ưu hóa tức thì quá trình đăng nhập qua email; độ phức tạp tìm kiếm O(1) qua B-Tree Index thay vì Table Scan O(N)."),
    ("courts", "{ type: 1, status: 1 }", "Compound Index", "Tối ưu hóa bộ lọc sân theo môn thể thao và trạng thái hoạt động trên trang chủ; loại bỏ việc quét các sân đang bảo trì."),
    ("bookings", "{ court: 1, date: 1, status: 1 }", "Compound Index Kép", "Chỉ mục sống còn phục vụ thuật toán chống trùng lịch. Khi kiểm tra slot, MongoDB thu hẹp không gian tìm kiếm chỉ trong phạm vi một sân và một ngày cụ thể, giảm chi phí quét từ O(N) xuống O(log K) với K là số booking trong ngày (K <= 20)."),
    ("bookings", "{ user: 1, date: -1 }", "Compound Index", "Tối ưu hóa trang 'Vé của tôi' (My Bookings), giúp tải danh sách lịch sử đặt sân của từng khách hàng theo thứ tự mới nhất ngay lập tức."),
    ("attendances", "{ employee: 1, date: 1 }", "Compound Index Kép", "Đảm bảo tính duy nhất và tăng tốc truy vấn chấm công của từng nhân viên trong ngày; hỗ trợ tính bảng lương tháng O(1)."),
    ("work_schedules", "{ employee: 1, date: 1 }", "Compound Index Kép", "Ngăn chặn tuyệt đối việc quản lý phân công trùng ca trong ngày cho cùng một nhân sự ở tầng cơ sở dữ liệu."),
    ("attendance_logs", "{ attendance: 1, createdAt: -1 }", "Compound Index", "Truy xuất lịch sử kiểm toán của một lượt chấm công theo dòng thời gian giảm dần với độ trễ cực thấp.")
]

# 2.5 Thiết kế giao diện, API và các thành phần kỹ thuật
SEC_2_5_TITLE = "2.5. Thiết kế giao diện, API và các thành phần kỹ thuật"
SEC_2_5_CONTENT = [
    (
        "Hệ thống SportBooking được thiết kế với chuẩn kiến trúc RESTful API hoàn chỉnh và hệ thống giao diện UI/UX "
        "thống nhất theo tiêu chuẩn Design System hiện đại."
    )
]

TABLE_2_17_CAPTION = "Bảng 2.17: Đặc tả danh mục các RESTful API Endpoints cốt lõi của hệ thống SportBooking"
TABLE_2_17_HEADERS = ["Phân hệ", "HTTP Method", "Đường dẫn Endpoint", "Quyền truy cập", "Mô tả chức năng nghiệp vụ"]
TABLE_2_17_ROWS = [
    ("Auth", "POST", "/api/auth/register", "Public", "Đăng ký tài khoản khách hàng mới (Customer)."),
    ("Auth", "POST", "/api/auth/login", "Public", "Đăng nhập hệ thống, kiểm tra bcrypt, cấp phát JWT Token 7 ngày."),
    ("Auth", "GET", "/api/auth/me", "Authenticated", "Lấy thông tin tài khoản đang đăng nhập từ JWT Token."),
    ("Auth", "PUT", "/api/auth/profile", "Authenticated", "Cập nhật họ tên, số điện thoại, ảnh đại diện cá nhân."),
    ("Auth", "PUT", "/api/auth/change-password", "Authenticated", "Đổi mật khẩu tài khoản người dùng."),
    ("Courts", "GET", "/api/courts", "Public", "Lấy danh sách sân thể thao kèm bộ lọc (môn, giá, tiện ích) và phân trang."),
    ("Courts", "GET", "/api/courts/:id", "Public", "Xem chi tiết một sân thể thao, thư viện ảnh và thông tin tiện ích."),
    ("Courts", "POST", "/api/courts", "Admin, Manager", "Thêm mới một sân thể thao vào hệ thống."),
    ("Courts", "PUT", "/api/courts/:id", "Admin, Manager", "Chỉnh sửa thông tin chi tiết và đơn giá thuê sân."),
    ("Courts", "PATCH", "/api/courts/:id/status", "Admin, Manager", "Chuyển đổi trạng thái hoạt động hoặc bảo trì của sân."),
    ("Courts", "DELETE", "/api/courts/:id", "Admin", "Xóa một sân thể thao khỏi hệ thống."),
    ("Bookings", "GET", "/api/bookings/court/:id/slots", "Public", "Lấy ma trận các khung giờ đã có người đặt của một sân trong ngày."),
    ("Bookings", "POST", "/api/bookings", "Customer", "Tạo đơn đặt sân trực tuyến; chạy thuật toán chống trùng lịch; trả 409 nếu trùng."),
    ("Bookings", "GET", "/api/bookings/my", "Authenticated", "Lấy danh sách các đơn đặt sân của chính khách hàng đang đăng nhập."),
    ("Bookings", "GET", "/api/bookings", "Admin, Manager, Staff", "Xem toàn bộ danh sách đơn đặt sân trên toàn hệ thống."),
    ("Bookings", "PUT", "/api/bookings/:id/cancel", "Authenticated", "Khách hàng hủy đơn đặt sân hợp lệ kèm lý do hủy."),
    ("Bookings", "PATCH", "/api/bookings/:id/status", "Admin, Manager", "Cập nhật trạng thái đơn đặt sân (confirmed, completed, cancelled)."),
    ("Shifts", "GET", "/api/shifts", "Authenticated", "Lấy danh mục các ca làm việc đang áp dụng."),
    ("Shifts", "POST", "/api/shifts", "Admin, Manager", "Thêm mới một ca làm việc và thiết lập khoảng ân hạn trễ gracePeriod."),
    ("Schedules", "GET", "/api/work-schedules/my", "Authenticated", "Nhân viên xem lịch phân ca trực cá nhân của mình."),
    ("Schedules", "POST", "/api/work-schedules", "Admin, Manager", "Phân công ca trực cho nhân viên theo ngày và sân phụ trách."),
    ("Attendance", "POST", "/api/attendance/check-in", "Staff, Manager", "Điểm danh vào ca; kiểm tra mã QR token; gắn status 'present' hoặc 'late'."),
    ("Attendance", "POST", "/api/attendance/check-out", "Staff, Manager", "Điểm danh tan ca; tự động tính workHours thực tế trừ giờ nghỉ."),
    ("Attendance", "PUT", "/api/attendance/:id", "Admin, Manager", "Hiệu chỉnh chấm công; BẮT BUỘC nhập lý do và tự động ghi vào AttendanceLog."),
    ("Attendance", "POST", "/api/attendance/generate-qr", "Admin, Manager", "Tạo mã QR Token động cho từng sân (có thời hạn 120 phút)."),
    ("Leaves", "POST", "/api/leave-requests", "Authenticated", "Nhân viên gửi đơn xin nghỉ phép trực tuyến."),
    ("Leaves", "GET", "/api/leave-requests/my", "Authenticated", "Nhân viên theo dõi tiến độ xét duyệt các đơn nghỉ của mình."),
    ("Leaves", "PUT", "/api/leave-requests/:id/approve", "Admin, Manager", "Phê duyệt đơn xin nghỉ phép kèm ý kiến phản hồi."),
    ("Leaves", "PUT", "/api/leave-requests/:id/reject", "Admin, Manager", "Từ chối đơn xin nghỉ phép kèm lý do giải trình."),
    ("Payrolls", "POST", "/api/payrolls", "Admin", "Tự động tính lương tháng theo ngày công thực tế từ collection attendances."),
    ("Payrolls", "PUT", "/api/payrolls/:id", "Admin", "Cập nhật phụ cấp, tăng ca, khấu trừ và duyệt chi trả lương."),
    ("Reports", "GET", "/api/admin/reports/dashboard", "Admin, Manager", "Tổng hợp 6 chỉ số KPI và dữ liệu 4 biểu đồ Recharts thời gian thực.")
]

TABLE_2_18_CAPTION = "Bảng 2.18: Bảng quy chuẩn thiết kế giao diện (Design System & Design Tokens)"
TABLE_2_18_HEADERS = ["Thành phần thiết kế", "Mã màu / Quy chuẩn kỹ thuật", "Ứng dụng trong giao diện SportBooking"]
TABLE_2_18_ROWS = [
    ("Primary Color (Màu chính)", "#1E3A8A (Deep Navy Blue)", "Sử dụng cho thanh điều hướng Header, tiêu đề chính, nút bấm quan trọng."),
    ("Secondary Color (Màu phụ)", "#0284C7 (Sky Blue)", "Sử dụng cho các liên kết điều hướng, thẻ nổi bật, đường viền active."),
    ("Accent Color (Màu nhấn)", "#059669 (Emerald Green)", "Sử dụng cho nút Check-in, trạng thái Slot giờ Trống, đơn đã xác nhận."),
    ("Warning Color (Cảnh báo)", "#D97706 (Amber Orange)", "Sử dụng cho slot giờ Đang chọn, trạng thái đi muộn, đơn chờ duyệt."),
    ("Danger Color (Lỗi/Xung đột)", "#DC2626 (Rose Red)", "Sử dụng cho slot giờ Đã có người đặt, nút Hủy đơn, thông báo lỗi trùng lịch."),
    ("Neutral Background", "#F8FAFC / #0F172A", "Nền giao diện sáng thanh lịch và nền chế độ tối thể thao năng động."),
    ("Typography (Phông chữ)", "Segoe UI / Inter / Roboto", "Hệ thống phông chữ không chân hiện đại, tối ưu khả năng đọc trên màn hình điện tử."),
    ("Breakpoint Mobile", "< 640px (sm)", "Bố cục cột đơn, menu ngăn kéo (Drawer), tối ưu thao tác chạm ngón tay."),
    ("Breakpoint Tablet", "640px - 1024px (md/lg)", "Bố cục 2 cột linh hoạt, hiển thị lưới sân 2 thẻ mỗi hàng."),
    ("Breakpoint Desktop", "> 1024px (xl/2xl)", "Bố cục đầy đủ với thanh bên Sidebar cố định, bảng điều khiển Dashboard Recharts đa chiều.")
]
