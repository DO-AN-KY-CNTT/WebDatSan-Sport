# -*- coding: utf-8 -*-
"""
Chương Kết Luận, Tài Liệu Tham Khảo và Các Phụ Lục
Bao gồm:
- KẾT LUẬN
- TÀI LIỆU THAM KHẢO
- PHỤ LỤC A: Hướng dẫn cài đặt và vận hành hệ thống
- PHỤ LỤC B: Đặc tả biến môi trường hệ thống
- PHỤ LỤC C: Danh sách tài khoản thử nghiệm các vai trò
"""

CONCLUSION_TITLE = "KẾT LUẬN"

CONCLUSION_CONTENT = [
    (
        "Trải qua quá trình nghiên cứu, khảo sát thực tế và triển khai xây dựng hệ thống phần mềm trong suốt thời gian qua, "
        "đề tài \"Xây dựng Hệ thống Quản lý và Đặt sân Thể thao Trực tuyến Toàn diện (SportBooking)\" đã hoàn thành trọn vẹn "
        "toàn bộ các mục tiêu, nội dung công việc và yêu cầu kỹ thuật được xác định trong đề cương ban đầu. "
        "Sản phẩm của đồ án không dừng lại ở một mô hình trình diễn giao diện (Demo UI), mà là một hệ thống ứng dụng Web hoàn chỉnh, "
        "có cơ sở dữ liệu thực tế, có hệ thống API RESTful bảo mật và giải quyết triệt để các bài toán nghiệp vụ phức tạp của đời sống."
    ),
    (
        "1. Tóm tắt các kết quả chính đã đạt được:\n"
        "• Về mặt khảo sát và phân tích yêu cầu: Đồ án đã tổng hợp và phân tích thấu đáo bức tranh toàn cảnh về thực trạng "
        "quản lý sân bãi thể thao tại Việt Nam; chỉ rõ các bất cập nghiêm trọng của phương thức thủ công truyền thống; từ đó xác lập "
        "hệ thống yêu cầu chức năng và phi chức năng chuẩn xác cho 4 nhóm tác nhân (Khách hàng, Nhân viên, Quản lý, Quản trị viên).\n"
        "• Về mặt thiết kế hệ thống: Đã xây dựng đầy đủ 13 sơ đồ mô hình hóa chuyên sâu theo chuẩn UML 2.5 và chuẩn kiến trúc phần mềm quốc tế: "
        "từ Biểu đồ Use Case tổng quan và phân hệ; Biểu đồ Hoạt động; Biểu đồ Tuần tự cho các luồng nghiệp vụ then chốt; Sơ đồ Kiến trúc phân tầng "
        "(Layered Architecture); Sơ đồ Thực thể liên kết CSDL (ERD); cho đến Sơ đồ Điều hướng giao diện (Sitemap) và Bản vẽ Bố cục Wireframe.\n"
        "• Về mặt cơ sở dữ liệu: Đã thiết kế hoàn chỉnh mô hình CSDL NoSQL với 12 Collections chuẩn mực trong MongoDB. "
        "Đặc biệt, hệ thống đã thiết lập chiến lược đánh chỉ mục ghép (Compound Indexing) thông minh trên các trường khóa ngoại, ngày tháng "
        "và trạng thái, giúp giảm độ phức tạp thuật toán tìm kiếm từ O(N) xuống O(log N) và cải thiện tốc độ truy vấn hơn 9 lần.\n"
        "• Về mặt hiện thực thuật toán cốt lõi: Đã giải quyết triệt để bài toán hóc búa nhất trong đặt sân là chống trùng lịch (Booking Collision) "
        "bằng thuật toán kiểm tra giao thoa khoảng thời gian (Interval Overlap Algorithm) kết hợp với các truy vấn nguyên tử (Atomic Queries).\n"
        "• Về mặt quản trị nhân sự nội bộ: Đã hiện thực hóa thành công giải pháp chấm công điện tử thời gian thực tích hợp quét mã QR Token "
        "có thời hạn hiệu lực động (TTL 5 phút), cơ chế kiểm soát logic vào/ra nghiêm ngặt và đặc biệt là hệ thống ghi nhật ký kiểm toán (Audit Logging) "
        "bắt buộc lưu vết 100% mọi hành vi điều chỉnh công, đảm bảo tính minh bạch tuyệt đối trong nội bộ doanh nghiệp.\n"
        "• Về mặt công nghệ giao diện: Ứng dụng Single Page Application (SPA) phát triển trên nền tảng React 18, TypeScript và Tailwind CSS "
        "mang lại tốc độ phản hồi cực nhanh, giao diện thân thiện, hiện đại và tương thích hoàn hảo trên mọi kích thước màn hình thiết bị."
    ),
    (
        "2. Đóng góp về mặt học thuật và giá trị thực tiễn của đề tài:\n"
        "• Về mặt học thuật: Đồ án là minh chứng thực nghiệm sống động cho việc vận dụng tổng hòa các nguyên lý cốt lõi của ngành Khoa học Máy tính "
        "và Kỹ thuật Phần mềm: kiến trúc phân tầng (Clean Layered Architecture), cơ chế bảo mật xác thực không trạng thái (Stateless Authentication "
        "với JWT), kiểm soát truy cập dựa trên vai trò (RBAC), tối ưu hóa cấu trúc dữ liệu B-Tree trên CSDL hướng tài liệu và quy trình kiểm thử tự động.\n"
        "• Về mặt thực tiễn: Hệ thống SportBooking là giải pháp số hóa toàn diện có khả năng ứng dụng và chuyển giao công nghệ ngay lập tức cho các "
        "trung tâm thể thao, cụm sân bóng đá, quần vợt, cầu lông, pickleball trên toàn quốc. Hệ thống giúp đơn vị vận hành tiết kiệm tới 70% thời gian "
        "và chi phí quản lý hành chính, loại bỏ hoàn toàn các tổn thất do đặt trùng sân và gia tăng trải nghiệm hài lòng của khách hàng."
    ),
    (
        "3. Những hạn chế còn tồn tại của hệ thống:\n"
        "Mặc dù đã hoàn thành đầy đủ các mục tiêu cốt lõi, do giới hạn về mặt thời gian và nguồn lực thực hiện của một Đồ án tốt nghiệp, "
        "hệ thống vẫn còn một số điểm có thể tiếp tục hoàn thiện hơn nữa:\n"
        "• Chưa tích hợp cổng thanh toán trực tuyến chính thức qua các ngân hàng nội địa (VietQR Napas 247) hoặc cổng thanh toán trung gian "
        "(VNPay, MoMo, ZaloPay) do yêu cầu pháp lý về tư cách pháp nhân doanh nghiệp để đăng ký môi trường Production.\n"
        "• Hệ thống hiện mới hoạt động trên nền tảng Web Responsive, chưa phát triển phiên bản Ứng dụng di động chuyên biệt (Native Mobile App) "
        "để tận dụng các tính năng phần cứng nâng cao như quét mã QR bằng camera trực tiếp của điện thoại hoặc đẩy thông báo Push Notification."
    ),
    (
        "4. Hướng nghiên cứu và phát triển trong tương lai:\n"
        "Dựa trên nền tảng kiến trúc mở và linh hoạt đã xây dựng, trong giai đoạn phát triển tiếp theo, dự án có thể mở rộng theo các định hướng sau:\n"
        "• Thứ nhất: Tích hợp cổng thanh toán trực tuyến tự động qua mã VietQR động, tự động xác nhận hóa đơn tức thời ngay khi khách hàng chuyển khoản thành công.\n"
        "• Thứ hai: Phát triển ứng dụng di động đa nền tảng (Cross-platform Mobile App) sử dụng React Native hoặc Flutter dành riêng cho Khách hàng và Nhân viên.\n"
        "• Thứ ba: Ứng dụng Trí tuệ Nhân tạo (AI) và Học máy (Machine Learning) để phân tích xu hướng đặt sân của người dùng, từ đó đưa ra gợi ý khung giờ "
        "phù hợp (Recommendation System) và áp dụng chiến lược định giá linh hoạt theo thời gian thực (Dynamic Pricing Engine) dựa trên quy luật cung cầu.\n"
        "• Thứ tư: Nghiên cứu tích hợp hệ thống Internet vạn vật (IoT) để điều khiển hệ thống chiếu sáng thông minh và cổng ra vào tự động mở khóa "
        "bằng mã QR của vé đặt sân mà không cần sự can thiệp thủ công của nhân viên trực."
    )
]

REFERENCES_TITLE = "TÀI LIỆU THAM KHẢO"

REFERENCES_LIST = [
    (
        "[1] Fielding, R. T. (2000). Architectural Styles and the Design of Network-based Software Architectures. "
        "Doctoral dissertation, University of California, Irvine. (Công trình gốc đặt nền móng cho kiến trúc RESTful API)."
    ),
    (
        "[2] Fowler, M. (2002). Patterns of Enterprise Application Architecture. Addison-Wesley Professional. "
        "(Tài liệu kinh điển về các mẫu kiến trúc phân tầng Layered Architecture và Data Mapper trong phát triển phần mềm doanh nghiệp)."
    ),
    (
        "[3] Martin, R. C. (2017). Clean Architecture: A Craftsman's Guide to Software Structure and Design. Prentice Hall. "
        "(Nguyên lý kiến trúc phần mềm sạch và phân tách độc lập giữa các tầng nghiệp vụ)."
    ),
    (
        "[4] Chodorow, K. (2013). MongoDB: The Definitive Guide (2nd ed.). O'Reilly Media. "
        "(Hướng dẫn toàn diện về thiết kế mô hình dữ liệu NoSQL, cơ chế lưu trữ B-Tree và kỹ thuật đánh chỉ mục trong MongoDB)."
    ),
    (
        "[5] Banker, K., Bakkum, P., Verch, S., Garrett, D., & Hawkins, T. (2016). MongoDB in Action (2nd ed.). Manning Publications. "
        "(Nguyên lý xây dựng ứng dụng với cơ sở dữ liệu hướng tài liệu và tối ưu hóa câu truy vấn Aggregation Pipeline)."
    ),
    (
        "[6] Banks, A., & Porcello, E. (2020). Learning React: Modern Patterns for Developing React Apps (2nd ed.). O'Reilly Media. "
        "(Tài liệu chuyên sâu về React 18, Functional Components, Hooks, Context API và kiến trúc Single Page Application)."
    ),
    (
        "[7] Cherny, B. (2019). Programming TypeScript: Making Your JavaScript Applications Scale. O'Reilly Media. "
        "(Hệ thống kiểu tĩnh Static Typing trong TypeScript và kỹ thuật giảm thiểu lỗi Run-time trong ứng dụng Web quy mô lớn)."
    ),
    (
        "[8] Jones, M., Bradley, J., & Sakimura, N. (2015). JSON Web Token (JWT). RFC 7519, Internet Engineering Task Force (IETF). "
        "(Tiêu chuẩn quốc tế đặc tả định dạng mã thông báo xác thực an toàn không trạng thái)."
    ),
    (
        "[9] OWASP Foundation. (2021). OWASP Top 10: The Ten Most Critical Web Application Security Risks. Open Web Application Security Project. "
        "(Bộ tài liệu tiêu chuẩn quốc tế về các lỗ hổng bảo mật Web phổ biến và phương pháp phòng ngừa)."
    ),
    (
        "[10] Freeman, A. (2021). Pro React 18 with TypeScript. Apress. "
        "(Hướng dẫn thực hành xây dựng giao diện người dùng chuyên nghiệp với React và TypeScript)."
    ),
    (
        "[11] Casciaro, M., & Mammino, L. (2020). Node.js Design Patterns (3rd ed.). Packt Publishing. "
        "(Các mẫu thiết kế xử lý bất đồng bộ, Event Loop, Streams và Middleware trong môi trường thực thi Node.js)."
    ),
    (
        "[12] Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). Design Patterns: Elements of Reusable Object-Oriented Software. Addison-Wesley. "
        "(Cuốn sách kinh điển của nhóm Gang of Four (GoF) về các mẫu thiết kế phần mềm hướng đối tượng)."
    ),
    (
        "[13] Mongoose Documentation Team. (2024). Mongoose ODM Reference Guide (Version 8.x). Retrieved from https://mongoosejs.com/docs/ "
        "(Tài liệu kỹ thuật chính thức của thư viện mô hình hóa dữ liệu Mongoose cho MongoDB)."
    ),
    (
        "[14] Vite Core Team. (2024). Vite - Next Generation Frontend Tooling Documentation. Retrieved from https://vitejs.dev/guide/ "
        "(Tài liệu hướng dẫn tối ưu hóa quy trình đóng gói và phát triển mã nguồn Frontend với Vite)."
    ),
    (
        "[15] Tailwind Labs. (2024). Tailwind CSS - Utility-First CSS Framework Documentation. Retrieved from https://tailwindcss.com/docs/ "
        "(Tài liệu chính thức về xây dựng hệ thống thiết kế giao diện Responsive với Tailwind CSS)."
    )
]

APPENDIX_A_TITLE = "PHỤ LỤC A. HƯỚNG DẪN CÀI ĐẶT VÀ KHỞI CHẠY HỆ THỐNG"

APPENDIX_A_CONTENT = [
    (
        "Phụ lục này cung cấp tài liệu hướng dẫn kỹ thuật chi tiết từng bước (Step-by-step Technical Manual) "
        "để cán bộ hướng dẫn, hội đồng nghiệm thu hoặc các lập trình viên khác có thể triển khai và khởi chạy thành công "
        "toàn bộ hệ thống SportBooking trên một môi trường máy tính mới (đã cài đặt Node.js phiên bản >= 18 và dịch vụ MongoDB Server)."
    ),
    (
        "Bước 1: Tải mã nguồn dự án và mở cửa sổ dòng lệnh:\n"
        "Giải nén tệp mã nguồn dự án `sport-booking.zip` hoặc sao chép thư mục dự án vào ổ đĩa (ví dụ: `D:\\Projects\\sport-booking`). "
        "Mở hai cửa sổ dòng lệnh (Terminal / PowerShell / Command Prompt) độc lập: một cửa sổ dành cho máy chủ Backend và một cửa sổ dành cho ứng dụng Frontend."
    ),
    (
        "Bước 2: Cài đặt và cấu hình máy chủ Backend (Cửa sổ 1):\n"
        "1. Di chuyển vào thư mục backend:\n"
        "   `cd backend`\n"
        "2. Kiểm tra tệp cấu hình môi trường `.env` (đã được tạo sẵn mẫu chuẩn). Đảm bảo cổng dịch vụ `PORT=5000` và chuỗi kết nối `MONGO_URI=mongodb://localhost:27017/sport-booking` đang trỏ chính xác vào dịch vụ MongoDB cục bộ của máy.\n"
        "3. Cài đặt các gói thư viện phụ thuộc:\n"
        "   `npm install`\n"
        "4. Thực thi kịch bản nạp toàn bộ 12 bộ dữ liệu mẫu (Seed Data) chuẩn vào MongoDB:\n"
        "   `npm run seed`\n"
        "   (Màn hình dòng lệnh sẽ hiển thị thông báo màu xanh xác nhận đã nạp thành công 10 tài khoản, 8 sân thể thao, 3 ca trực, 15 phân ca, 25 bản ghi chấm công, 30 đơn đặt sân...)\n"
        "5. Khởi chạy máy chủ Backend ở chế độ phát triển:\n"
        "   `npm run dev`\n"
        "   (Máy chủ hiển thị thông báo: 'Server running on port 5000' và 'Connected to MongoDB successfully')."
    ),
    (
        "Bước 3: Cài đặt và khởi chạy ứng dụng Frontend (Cửa sổ 2):\n"
        "1. Di chuyển vào thư mục frontend:\n"
        "   `cd frontend`\n"
        "2. Kiểm tra tệp `.env` đảm bảo biến `VITE_API_URL=http://localhost:5000/api`.\n"
        "3. Cài đặt các gói phụ thuộc giao diện:\n"
        "   `npm install`\n"
        "4. Khởi chạy máy chủ phát triển Frontend:\n"
        "   `npm run dev`\n"
        "   (Hệ thống Vite sẽ khởi động trong vòng chưa đầy 300ms và cung cấp đường dẫn truy cập cục bộ: `http://localhost:5173`)."
    ),
    (
        "Bước 4: Trải nghiệm và đánh giá hệ thống trên trình duyệt:\n"
        "Mở trình duyệt web bất kỳ và truy cập vào địa chỉ `http://localhost:5173`. "
        "Quý thầy cô và hội đồng có thể sử dụng các tài khoản thử nghiệm được cung cấp chi tiết trong Phụ lục C để đăng nhập "
        "với tư cách Quản trị viên (Admin), Quản lý chi nhánh (Manager), Nhân viên điều phối (Staff) hoặc Khách hàng (Customer) "
        "để thực nghiệm toàn diện các tính năng của hệ thống."
    )
]

APPENDIX_B_TITLE = "PHỤ LỤC B. ĐẶC TẢ BIẾN MÔI TRƯỜNG HỆ THỐNG (.ENV)"

APPENDIX_B_CONTENT = [
    (
        "Nhằm tuân thủ nguyên tắc 12 Yếu tố Xây dựng Ứng dụng Hiện đại (The Twelve-Factor App) về việc phân tách cấu hình "
        "khỏi mã nguồn (Config Separation), toàn bộ các tham số động, chuỗi kết nối và khóa bí mật của hệ thống SportBooking "
        "được lưu trữ tại các tệp `.env`. Bảng dưới đây đặc tả đầy đủ ý nghĩa và giá trị mặc định của từng biến môi trường."
    )
]

TABLE_APP_B_DATA = [
    ["Tên biến môi trường", "Phân hệ", "Giá trị mặc định khuyến nghị", "Mô tả ý nghĩa kỹ thuật & Ràng buộc bảo mật"],
    ["PORT", "Backend", "5000", "Cổng mạng TCP/IP mà máy chủ Express.js lắng nghe các kết nối HTTP"],
    ["NODE_ENV", "Backend", "development / production", "Môi trường thực thi (ảnh hưởng đến cơ chế log và stack trace lỗi)"],
    ["MONGO_URI", "Backend", "mongodb://localhost:27017/sport-booking", "Chuỗi kết nối cơ sở dữ liệu MongoDB Driver (hỗ trợ cả Atlas URI)"],
    ["JWT_SECRET", "Backend", "sport_booking_secret_key_2026_@jwt", "Khóa mật mã học bí mật dùng để tạo chữ ký số HMAC-SHA256 cho Token"],
    ["JWT_EXPIRES_IN", "Backend", "7d", "Thời hạn hiệu lực tối đa của JWT cấp cho người dùng (mặc định 7 ngày)"],
    ["CLIENT_URL", "Backend", "http://localhost:5173", "Địa chỉ nguồn gốc của Frontend được phép gửi yêu cầu CORS tới API"],
    ["QR_TOKEN_TTL_MINUTES", "Backend", "5", "Thời gian sống (phút) của mã QR Token chấm công trước khi tự hủy"],
    ["VITE_API_URL", "Frontend", "http://localhost:5000/api", "Tiền tố URL của hệ thống máy chủ Backend mà Frontend gửi API requests"]
]

APPENDIX_C_TITLE = "PHỤ LỤC C. DANH SÁCH TÀI KHOẢN THỬ NGHIỆM HỆ THỐNG"

APPENDIX_C_CONTENT = [
    (
        "Để tạo điều kiện thuận lợi nhất cho quá trình kiểm tra, nghiệm thu và đánh giá chức năng của Hội đồng chấm đề tài, "
        "toàn bộ các tài khoản thử nghiệm dưới đây đã được kịch bản `npm run seed` khởi tạo sẵn trong cơ sở dữ liệu. "
        "Tất cả các tài khoản đều sử dụng chung một mật khẩu chuẩn hóa để thuận tiện ghi nhớ: `test123456`."
    )
]

TABLE_APP_C_DATA = [
    ["Vai trò người dùng (Role)", "Họ và tên hiển thị", "Địa chỉ Email đăng nhập", "Mật khẩu dùng chung", "Phạm vi quyền hạn và Gợi ý kịch bản trải nghiệm"],
    [
        "Quản trị viên (Admin)",
        "Nguyễn Quản Trị (Super Admin)",
        "admin@sportbooking.com",
        "test123456",
        "Toàn quyền tối cao: Quản lý người dùng, phân quyền, quản trị toàn bộ danh mục sân, xem toàn bộ bảng lương, tra cứu Audit Log"
    ],
    [
        "Quản lý sân (Manager)",
        "Trần Quản Lý (Branch Manager)",
        "manager@sportbooking.com",
        "test123456",
        "Quản lý điều hành: Phân ca trực cho nhân viên, duyệt đơn xin nghỉ phép, hiệu chỉnh giờ chấm công có lưu log, chốt bảng lương"
    ],
    [
        "Nhân viên trực sân (Staff 1)",
        "Lê Nhân Viên (Staff Morning)",
        "staff1@sportbooking.com",
        "test123456",
        "Nhân sự vận hành: Xem ca trực được phân công, thực hiện Check-in / Check-out thời gian thực, quét mã QR Token tại sân, gửi đơn nghỉ phép"
    ],
    [
        "Nhân viên trực sân (Staff 2)",
        "Phạm Nhân Viên (Staff Evening)",
        "staff2@sportbooking.com",
        "test123456",
        "Nhân sự vận hành: Ca chiều, dùng để kiểm thử phối hợp đổi ca và đối chiếu dữ liệu chấm công giữa nhiều nhân viên"
    ],
    [
        "Khách hàng (Customer 1)",
        "Hoàng Khách Hàng (VIP User)",
        "customer1@sportbooking.com",
        "test123456",
        "Khách hàng: Tìm kiếm sân, đặt sân trực tuyến, xem vé điện tử mã QR, hủy đơn đặt sân, viết đánh giá sao kèm nhận xét cho sân"
    ],
    [
        "Khách hàng (Customer 2)",
        "Vũ Khách Hàng (Standard User)",
        "customer2@sportbooking.com",
        "test123456",
        "Khách hàng thứ hai: Dùng để kiểm thử đồng thời (Concurrent test) tình huống 2 khách cùng cố gắng đặt chung một khung giờ"
    ]
]
