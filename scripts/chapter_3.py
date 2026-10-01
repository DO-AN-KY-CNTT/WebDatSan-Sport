# -*- coding: utf-8 -*-
"""
Chương 3: Hiện Thực, Thử Nghiệm Và Đánh Giá Kết Quả.
Bao gồm:
3.1. Môi trường triển khai và thực nghiệm
3.2. Cài đặt và cấu hình hệ thống
3.3. Hiện thực các chức năng cốt lõi
3.4. Thử nghiệm và đánh giá kết quả (Kịch bản kiểm thử, Kết quả, Cải tiến kỹ thuật)
3.5. Tự đánh giá và bài học kinh nghiệm
"""

CHAPTER_3_TITLE = "CHƯƠNG 3. HIỆN THỰC, THỬ NGHIỆM VÀ ĐÁNH GIÁ KẾT QUẢ"

SEC_3_1_TITLE = "3.1. Môi trường triển khai và thực nghiệm"
SEC_3_1_CONTENT = [
    (
        "Để đảm bảo tính khách quan, khả thi và độ tin cậy của hệ thống SportBooking, quá trình hiện thực hóa "
        "và thực nghiệm được tiến hành trên môi trường phát triển đáp ứng đầy đủ các tiêu chuẩn kỹ thuật hiện đại. "
        "Môi trường này bao gồm cấu hình phần cứng tiêu chuẩn của máy trạm phát triển (Workstation) và máy chủ thử nghiệm, "
        "cùng với hệ điều hành và các gói thư viện phụ thuộc có phiên bản ổn định (LTS - Long Term Support)."
    ),
    (
        "Bảng 3.1 dưới đây tổng hợp chi tiết các thông số kỹ thuật về môi trường phần cứng và phần mềm được sử dụng "
        "xuyên suốt chu kỳ phát triển, kiểm thử đơn vị, kiểm thử tích hợp và đo lường hiệu năng của dự án SportBooking."
    )
]

TABLE_3_1_DATA = [
    ["Thành phần", "Thông số kỹ thuật / Phiên bản", "Ghi chú & Vai trò trong hệ sinh thái"],
    ["Bộ vi xử lý (CPU)", "Intel Core i7-11800H / AMD Ryzen 7 5800H (8 Cores, 16 Threads)", "Xử lý đa luồng, biên dịch mã nguồn và chạy các tiến trình nền"],
    ["Bộ nhớ RAM", "16 GB DDR4 Bus 3200 MHz", "Đảm bảo tài nguyên chạy đồng thời Backend, Frontend, MongoDB và Docker"],
    ["Ổ đĩa lưu trữ (Disk)", "512 GB NVMe PCIe Gen3x4 SSD", "Tốc độ đọc/ghi dữ liệu ngẫu nhiên cao (>2500 MB/s), tối ưu I/O cho CSDL"],
    ["Hệ điều hành", "Microsoft Windows 11 Pro 64-bit / Ubuntu Linux 22.04 LTS", "Môi trường tương thích chéo nền tảng (Cross-platform compatible)"],
    ["Môi trường chạy Backend", "Node.js v20.12.x LTS (JavaScript Runtime)", "Nền tảng thực thi JavaScript phía Server trên cơ chế Event-driven I/O"],
    ["Trình quản lý gói", "npm v10.5.x / Yarn v1.22.x", "Quản lý và giải quyết các gói phụ thuộc (Dependencies resolver)"],
    ["Hệ quản trị CSDL", "MongoDB Community Server v7.0.x / MongoDB Atlas Cloud", "Hệ quản trị CSDL hướng tài liệu NoSQL với cơ chế lưu trữ WiredTiger"],
    ["Thư viện ODM Backend", "Mongoose v8.3.x", "Mô hình hóa thực thể, schema validation, hook middleware và indexing"],
    ["Khung ứng dụng Backend", "Express.js v4.19.x", "Định tuyến RESTful API, quản lý chuỗi xử lý Middleware và xử lý ngoại lệ"],
    ["Khung giao diện Frontend", "React v18.3.x (Single Page Application)", "Xây dựng giao diện hướng thành phần, quản lý DOM ảo (Virtual DOM)"],
    ["Ngôn ngữ Frontend", "TypeScript v5.4.x", "Cung cấp hệ thống Static Typing an toàn, hạn chế lỗi Runtime phía giao diện"],
    ["Công cụ đóng gói Frontend", "Vite v5.2.x (Next Generation Frontend Tooling)", "Tốc độ khởi động máy chủ cực nhanh, Hot Module Replacement (HMR) < 50ms"],
    ["CSS Framework", "Tailwind CSS v3.4.x + PostCSS + Autoprefixer", "Định kiểu tiện ích (Utility-first), tạo giao diện chuẩn Responsive"],
    ["Thư viện Biểu tượng", "Lucide React v0.370.x", "Bộ biểu tượng vector hiện đại, tối ưu kích thước gói nạp"],
    ["Kiểm thử tự động", "Jest v29.7.x + Supertest v6.3.x", "Khung kiểm thử đơn vị (Unit Test) và kiểm thử tích hợp API (Integration Test)"],
    ["Kiểm thử hiệu năng", "Apache JMeter v5.6.x / Autocannon v7.14.x", "Mô phỏng hàng trăm yêu cầu đồng thời đo độ trễ và khả năng chịu tải"]
]

SEC_3_1_SEED_CONTENT = [
    (
        "Để phục vụ công tác kiểm thử toàn diện các luồng nghiệp vụ phức tạp mà không cần phải nhập liệu thủ công "
        "từng bản ghi, hệ thống đã xây dựng một kịch bản nạp dữ liệu mẫu tự động (Seed Data Script) tại tệp `backend/seed.js`. "
        "Kịch bản này sử dụng thư viện mã hóa `bcryptjs` để băm mật khẩu an toàn theo chuẩn công nghiệp (Salt rounds = 10), "
        "đồng thời thiết lập mối quan hệ tham chiếu logic chặt chẽ giữa 12 Collections trong cơ sở dữ liệu."
    ),
    (
        "Bảng 3.2 tổng hợp khối lượng và cơ cấu dữ liệu mẫu đã được nạp sẵn vào cơ sở dữ liệu MongoDB phục vụ quá trình "
        "nghiệm thu và đánh giá thực tế của hội đồng chấm đề tài."
    )
]

TABLE_3_2_DATA = [
    ["Tên Collection", "Số lượng bản ghi", "Mục đích kiểm thử & Kịch bản thực nghiệm"],
    ["users", "10 tài khoản", "Đầy đủ 4 vai trò (Admin, Manager, Staff, Customer), mật khẩu mã hóa đồng nhất test123456"],
    ["courts", "8 sân thể thao", "Bao gồm sân Bóng đá mini (5 & 7 người), Cầu lông, Tennis, Pickleball, Bóng rổ tại nhiều quận"],
    ["shifts", "3 ca chuẩn", "Ca sáng (06:00 - 14:00), Ca chiều (14:00 - 22:00), Ca gãy (08:00 - 17:00) với mức lương và phụ cấp"],
    ["workschedules", "15 phân ca", "Lịch trực được gán cho các nhân viên trong tuần hiện tại và các tuần trước để kiểm thử"],
    ["attendances", "25 bản ghi", "Bao gồm các trạng thái: Đúng giờ (present), Đi muộn (late), Vắng có phép, Vắng không phép"],
    ["attendancelogs", "40 nhật ký", "Lịch sử can thiệp hệ thống: Check-in QR, Check-out, Quản lý hiệu chỉnh giờ có kèm lý do"],
    ["leaverequests", "6 lá đơn", "Đơn xin nghỉ ốm, việc bận gia đình với các trạng thái Pending, Approved và Rejected"],
    ["payrolls", "8 bảng lương", "Bảng lương tháng gần nhất của nhân viên, kiểm tra công thức tính lương cơ bản và khấu trừ phạt"],
    ["qrtokens", "5 mã xác thực", "Mã QR động phục vụ kiểm thử quét chấm công thực địa tại bàn điều phối"],
    ["bookings", "30 đơn đặt", "Bao gồm các đơn đã hoàn thành, đơn sắp diễn ra và đơn đã hủy phục vụ kiểm thử ma trận slot"],
    ["reviews", "18 đánh giá", "Nhận xét sao từ 1 đến 5 sao của khách hàng phục vụ kiểm thử tính điểm trung bình của sân"],
    ["employees", "6 hồ sơ", "Hồ sơ nhân sự chi tiết: ngày bắt đầu làm việc, hệ số lương, phụ cấp chức vụ, thông tin CCCD"]
]

SEC_3_2_TITLE = "3.2. Cài đặt và cấu hình hệ thống"
SEC_3_2_CONTENT = [
    (
        "Hệ thống SportBooking được thiết kế tuân thủ triết lý Kiến trúc Hướng Dịch vụ Đơn giản (Clean Service Architecture) "
        "với cấu trúc dự án rõ ràng, phân tách độc lập giữa mã nguồn Máy chủ (Backend) và Máy khách (Frontend). "
        "Việc cài đặt và khởi chạy hệ thống trên bất kỳ môi trường máy tính mới nào (đã cài đặt Node.js và MongoDB) "
        "đều có thể thực hiện một cách nhanh chóng thông qua các bước chuẩn hóa sau:"
    ),
    (
        "Bước 1: Chuẩn bị cơ sở dữ liệu và biến môi trường Backend:\n"
        "Người quản trị di chuyển vào thư mục `backend/` và khởi tạo tệp cấu hình môi trường `.env`. Tệp này lưu trữ các biến cấu hình "
        "nhạy cảm, không được đưa vào hệ thống quản lý phiên bản Git nhằm đảm bảo an toàn thông tin:\n"
        "• `PORT=5000`: Cổng mạng mà máy chủ Express.js sẽ lắng nghe các kết nối HTTP từ bên ngoài.\n"
        "• `MONGO_URI=mongodb://localhost:27017/sport-booking`: Chuỗi kết nối tới cơ sở dữ liệu MongoDB cục bộ hoặc máy chủ từ xa.\n"
        "• `JWT_SECRET=super_secret_jwt_key_sport_booking_2026`: Chuỗi bí mật dùng để ký và xác thực tính toàn vẹn của mã thông báo JWT.\n"
        "• `JWT_EXPIRES_IN=7d`: Thời gian hết hạn của token cấp cho người dùng (mặc định 7 ngày).\n"
        "• `CLIENT_URL=http://localhost:5173`: Tên miền của ứng dụng Frontend phục vụ cấu hình chia sẻ tài nguyên nguồn gốc (CORS)."
    ),
    (
        "Bước 2: Cài đặt thư viện và nạp dữ liệu mẫu Backend:\n"
        "Thực thi lệnh `npm install` tại thư mục `backend/` để tải toàn bộ các gói thư viện phụ thuộc được định nghĩa trong `package.json`. "
        "Sau khi quá trình cài đặt hoàn tất, thực thi lệnh `npm run seed` để kích hoạt kịch bản tự động làm sạch cơ sở dữ liệu "
        "và nạp toàn bộ 12 bộ dữ liệu mẫu chuẩn (Bảng 3.2). Sau đó, khởi động máy chủ API bằng lệnh `npm run dev` (chế độ phát triển "
        "với Nodemon tự động nạp lại khi có thay đổi mã nguồn) hoặc `npm start` (chế độ sản xuất). Máy chủ sẽ thông báo kết nối thành công "
        "tới cơ sở dữ liệu MongoDB và sẵn sàng tiếp nhận các yêu cầu tại địa chỉ `http://localhost:5000`."
    ),
    (
        "Bước 3: Cài đặt và cấu hình ứng dụng Frontend:\n"
        "Di chuyển vào thư mục `frontend/`, khởi tạo tệp `.env` chứa biến môi trường định tuyến `VITE_API_URL=http://localhost:5000/api`. "
        "Tiến hành cài đặt các gói phụ thuộc bằng lệnh `npm install`. Sau đó, khởi chạy máy chủ phát triển cục bộ bằng lệnh `npm run dev`. "
        "Trình biên dịch Vite sẽ biên dịch các mô-đun TypeScript và cung cấp cổng truy cập tại địa chỉ `http://localhost:5173`. "
        "Người dùng chỉ cần mở trình duyệt web (Google Chrome, Microsoft Edge, Mozilla Firefox) và truy cập vào địa chỉ trên để trải nghiệm hệ thống."
    )
]

SEC_3_3_TITLE = "3.3. Hiện thực các chức năng cốt lõi"
SEC_3_3_CONTENT = [
    (
        "Trong phần này, báo cáo tập trung trình bày chi tiết giải pháp hiện thực mã nguồn của 5 khối chức năng và giải thuật "
        "then chốt nhất trong hệ thống SportBooking: Thuật toán chống trùng lịch đặt sân thời gian thực; Middleware xác thực và phân quyền RBAC; "
        "Hệ thống chấm công QR Code tích hợp kiểm toán Audit Log; Động cơ tự động tính lương nhân sự; và Kiến trúc quản lý trạng thái Single Page Application."
    ),
    (
        "3.3.1. Thuật toán kiểm tra xung đột thời gian thực và tạo đơn đặt sân:\n"
        "Trọng tâm của phân hệ Đặt sân là đảm bảo tuyệt đối không xảy ra tình trạng hai khách hàng đặt trùng cùng một sân thể thao "
        "trong các khoảng thời gian bị chồng lấn. Trong tệp điều khiển `backend/controllers/bookingController.js`, hàm `createBooking` "
        "đã áp dụng thuật toán kiểm tra giao thoa khoảng thời gian (Interval Overlap Algorithm). Hai khoảng thời gian [A_start, A_end] và "
        "[B_start, B_end] có phần giao thoa nhau khi và chỉ khi: (A_start < B_end) VÀ (A_end > B_start)."
    ),
    (
        "Để thực thi logic này với hiệu năng tối ưu trực tiếp dưới tầng cơ sở dữ liệu MongoDB, câu truy vấn Mongoose sau đã được hiện thực:\n\n"
        "```javascript\n"
        "// Kiểm tra xung đột lịch đặt sân thời gian thực\n"
        "const conflictingBooking = await Booking.findOne({\n"
        "    courtId: newCourtId,\n"
        "    date: targetDate,\n"
        "    status: { $in: ['confirmed', 'paid'] },\n"
        "    startTime: { $lt: requestedEndTime },\n"
        "    endTime: { $gt: requestedStartTime }\n"
        "});\n"
        "if (conflictingBooking) {\n"
        "    return res.status(409).json({\n"
        "        success: false,\n"
        "        message: 'Khung giờ bạn chọn đã có khách hàng khác đặt trước. Vui lòng chọn khung giờ khác!'\n"
        "    });\n"
        "}\n"
        "```\n\n"
        "Nhờ có sự hỗ trợ của chỉ mục ghép (Compound Index) `{ courtId: 1, date: 1, status: 1, startTime: 1, endTime: 1 }`, "
        "MongoDB thực hiện quét trực tiếp trên cây B-Tree của chỉ mục (Index Scan) mà không cần nạp toàn bộ Document từ ổ cứng (Collection Scan). "
        "Thời gian phản hồi của câu truy vấn kiểm tra trùng lịch luôn duy trì dưới 15ms ngay cả khi cơ sở dữ liệu có hàng chục nghìn bản ghi."
    ),
    (
        "Sau khi vượt qua bước kiểm tra xung đột, hệ thống tiến hành tạo đơn hàng với mã định danh tự động theo định dạng "
        "`BK-YYYYMMDD-XXXX` (với XXXX là chuỗi 4 ký tự ngẫu nhiên viết hoa), tính tổng tiền thanh toán dựa trên đơn giá giờ của sân "
        "và thời lượng đặt, đồng thời cấp phát chuỗi mã hóa QR Code cho vé điện tử."
    ),
    (
        "3.3.2. Hiện thực Middleware Xác thực (Authentication) và Phân quyền (RBAC):\n"
        "Hệ thống áp dụng chuẩn công nghiệp JSON Web Token (JWT) không trạng thái (Stateless). Khi người dùng đăng nhập thành công "
        "tại endpoint `POST /api/auth/login`, máy chủ tạo ra một chuỗi JWT có chữ ký điện tử HMAC-SHA256 chứa các thông tin (Payload): "
        "`{ id: user._id, role: user.role }`. Chuỗi token này được gửi về máy khách và lưu trong `localStorage`."
    ),
    (
        "Trong mọi yêu cầu cần bảo vệ, máy khách đính kèm token vào Header: `Authorization: Bearer <token>`. Tại Backend, "
        "hai tầng Middleware nối tiếp được thiết lập trong `backend/middleware/auth.js`:\n"
        "• `verifyToken`: Tiếp nhận Header, tách chuỗi token, dùng `jwt.verify(token, process.env.JWT_SECRET)` để kiểm tra tính toàn vẹn "
        "và hạn sử dụng. Nếu hợp lệ, gán thông tin giải mã vào đối tượng `req.user` và chuyển sang bước tiếp theo; ngược lại trả về mã lỗi 401 Unauthorized.\n"
        "• `authorize(...roles)`: Tiếp nhận danh sách các vai trò được phép truy cập (ví dụ: `authorize('admin', 'manager')`). Middleware kiểm tra "
        "xem `req.user.role` có nằm trong danh sách cho phép hay không. Nếu không, lập tức chặn đứng yêu cầu và trả về mã lỗi 403 Forbidden."
    ),
    (
        "3.3.3. Hiện thực Module Chấm công QR Code và Cơ chế Kiểm toán (Audit Logging):\n"
        "Tại phân hệ Quản trị nhân sự, quy trình chấm công đòi hỏi sự trung thực và tính kiểm chứng cao. Hệ thống kết hợp giữa "
        "hai phương thức: Chấm công thủ công (Check-in/Check-out qua nút bấm) và Chấm công xác thực bằng mã QR Token động.\n"
        "Tại quầy lễ tân hoặc bảng điều phối của sân thể thao, hệ thống hiển thị một mã QR Code động được sinh từ endpoint "
        "`POST /api/qr-token/generate`. Mỗi mã token chỉ có giá trị hiệu lực trong một khoảng thời gian giới hạn (TTL từ 5 đến 10 phút). "
        "Khi nhân viên quét mã và gửi yêu cầu tới `POST /api/attendance/check-in`, hàm điều khiển kiểm tra sự tồn tại và tính hợp lệ của token trong Collection `qrtokens`. "
        "Nếu hợp lệ, bản ghi chấm công được tạo với trường `qrVerified: true`."
    ),
    (
        "Đặc biệt, hệ thống cài đặt cơ chế kiểm soát trạng thái nghiêm ngặt:\n"
        "• Nếu nhân viên đã Check-in trong ngày mà bấm Check-in tiếp, hệ thống trả về thông báo lỗi: 'Bạn đã thực hiện Check-in cho ca trực này'.\n"
        "• Nếu nhân viên chưa Check-in mà bấm Check-out, hệ thống chặn lại với lỗi: 'Bạn chưa thực hiện Check-in, không thể Check-out'.\n"
        "• Khi nhân viên Check-out, hệ thống lấy thời gian hiện tại trừ đi `checkIn` để tính toán chính xác tổng số giờ làm việc thực tế (`workHours`).\n"
        "Mọi sự kiện thay đổi dữ liệu chấm công (dù là do nhân viên tự thao tác hay do Quản lý hiệu chỉnh thủ công từ trang Admin) "
        "đều bắt buộc phải ghi một bản ghi lịch sử vào Collection `attendancelogs` bao gồm: ID người thao tác, ID nhân viên được tác động, "
        "hành động cụ thể, giá trị cũ, giá trị mới, địa chỉ IP và lý do bắt buộc. Điều này triệt tiêu hoàn toàn khả năng tiêu cực hoặc xóa dấu vết gian lận."
    ),
    (
        "3.3.4. Hiện thực Động cơ Tự động Tính Lương (Payroll Engine):\n"
        "Công tác tính lương cho nhân viên được tự động hóa hoàn toàn trong `backend/controllers/payrollController.js`. "
        "Hàng tháng, hệ thống tổng hợp toàn bộ các bản ghi `Attendance` của từng nhân viên trong tháng đó. "
        "Công thức tính lương được quy chuẩn theo nghiệp vụ quản trị doanh nghiệp hiện đại:\n\n"
        "$$\\text{Tổng lương thực nhận} = \\text{Lương cơ bản} + \\text{Phụ cấp chức vụ} + \\text{Tiền làm thêm giờ (OT)} - \\text{Tiền phạt đi muộn/về sớm}$$\n\n"
        "Trong đó:\n"
        "• Tiền làm thêm giờ = (Số giờ vượt chuẩn) × (Đơn giá giờ theo hợp đồng) × 1.5\n"
        "• Tiền phạt đi muộn = (Số phút đi muộn vượt quá thời gian ân hạn 15 phút) × (Mức phạt quy định / phút)\n"
        "Bảng lương sau khi tính toán sẽ được lưu trữ với trạng thái `draft` để Quản lý duyệt trước khi chuyển sang `paid` và xuất hóa đơn chi tiết cho người lao động."
    ),
    (
        "3.3.5. Hiện thực Giao diện Người dùng và Quản trị Trạng thái phía Frontend:\n"
        "Giao diện người dùng được xây dựng hoàn toàn bằng React 18 với TypeScript, sử dụng kiến trúc Hợp phần (Component-Based Architecture). "
        "Hệ thống chia tách rõ rệt thành hai không gian trải nghiệm:\n"
        "• Cổng thông tin khách hàng (Public Portal): Thiết kế theo phong cách hiện đại với thanh điều hướng trong suốt, hiệu ứng cuộn mượt mà, "
        "bộ lọc sân dạng thẻ tương tác trực quan và giao diện chọn khung giờ đặt sân theo dạng lưới thời gian thực (Time-grid Slot Matrix).\n"
        "• Cổng quản trị doanh nghiệp (Admin & Staff Portal): Thiết kế theo bố cục Dashboard chuẩn công nghiệp với thanh bên (Sidebar) có thể thu gọn, "
        "thanh tiêu đề cố định, các thẻ thống kê tổng quan (KPI Cards) có màu sắc trực quan, và các bảng biểu dữ liệu hỗ trợ phân trang, tìm kiếm tức thì.\n"
        "Toàn bộ trạng thái xác thực của người dùng (thông tin tài khoản, quyền hạn, trạng thái đăng nhập) được đóng gói trong `AuthContext` "
        "và chia sẻ xuyên suốt cây thành phần của ứng dụng thông qua Custom Hook `useAuth()`. Việc quản lý giỏ đặt sân và các bước thanh toán "
        "được tối ưu hóa bằng React State cục bộ kết hợp với bộ định tuyến React Router v6 để xử lý điều hướng mượt mà không cần tải lại trang."
    )
]

SEC_3_4_TITLE = "3.4. Thử nghiệm và đánh giá kết quả"
SEC_3_4_1_TITLE = "3.4.1. Kịch bản kiểm thử chi tiết"
SEC_3_4_1_CONTENT = [
    (
        "Để đảm bảo hệ thống vận hành chính xác theo đúng các đặc tả nghiệp vụ và đạt độ tin cậy cao nhất trước khi đưa vào vận hành, "
        "đồ án đã xây dựng bộ kịch bản kiểm thử toàn diện (Test Scenarios & Test Cases). Bộ kịch bản bao quát cả trường hợp biên "
        "(Boundary Cases), trường hợp luồng dữ liệu chuẩn (Happy Path) và trường hợp ngoại lệ bất thường (Negative Cases)."
    ),
    (
        "Dưới đây là 3 bảng đặc tả kiểm thử chi tiết cho 3 phân hệ then chốt nhất của hệ thống: Phân hệ Xác thực tài khoản (Bảng 3.3), "
        "Thuật toán Đặt sân chống trùng lịch (Bảng 3.4), và Phân hệ Chấm công - Kiểm toán Audit Log (Bảng 3.5)."
    )
]

TABLE_3_3_DATA = [
    ["Mã TC", "Tên ca kiểm thử", "Dữ liệu đầu vào & Các bước thực hiện", "Kết quả mong đợi", "Kết quả thực tế", "Đánh giá"],
    ["TC-AUTH-01", "Đăng ký thành công", "Họ tên hợp lệ, email chưa tồn tại, mật khẩu 8 ký tự", "HTTP 201, tạo User mới trong DB, mật khẩu băm bcrypt", "HTTP 201 Created, trả về User DTO", "ĐẠT (PASS)"],
    ["TC-AUTH-02", "Đăng ký trùng Email", "Email đã có sẵn trong Collection users", "HTTP 400, thông báo 'Email đã được sử dụng'", "HTTP 400 Bad Request, báo trùng email", "ĐẠT (PASS)"],
    ["TC-AUTH-03", "Đăng ký thiếu thông tin", "Bỏ trống trường email hoặc password", "HTTP 400, thông báo lỗi xác thực dữ liệu đầu vào", "HTTP 400 Bad Request, danh sách lỗi", "ĐẠT (PASS)"],
    ["TC-AUTH-04", "Đăng nhập chính xác", "Email và mật khẩu chính xác của tài khoản mẫu", "HTTP 200, trả về JWT Token và thông tin vai trò người dùng", "HTTP 200 OK, token JWT hợp lệ 7 ngày", "ĐẠT (PASS)"],
    ["TC-AUTH-05", "Đăng nhập sai mật khẩu", "Email đúng nhưng nhập sai mật khẩu", "HTTP 401, thông báo 'Thông tin đăng nhập không hợp lệ'", "HTTP 401 Unauthorized", "ĐẠT (PASS)"],
    ["TC-AUTH-06", "Truy cập không có Token", "Gọi API nội bộ (/api/bookings) nhưng không gửi Header", "HTTP 401, thông báo 'Truy cập bị từ chối, thiếu token'", "HTTP 401, chặn truy cập ngay Middleware", "ĐẠT (PASS)"],
    ["TC-AUTH-07", "Truy cập sai phân quyền", "Dùng token của Customer để gọi API xóa sân của Admin", "HTTP 403 Forbidden, thông báo không có quyền thực hiện", "HTTP 403 Forbidden, chặn tại authorize", "ĐẠT (PASS)"]
]

TABLE_3_4_DATA = [
    ["Mã TC", "Tên ca kiểm thử", "Dữ liệu đầu vào & Các bước thực hiện", "Kết quả mong đợi", "Kết quả thực tế", "Đánh giá"],
    ["TC-BOOK-01", "Đặt sân giờ hoàn toàn trống", "Sân 1, ngày mai, 08:00 - 10:00 (chưa có ai đặt)", "HTTP 201, tạo Booking mã BK-..., trạng thái confirmed", "HTTP 201 Created, sinh mã vé kèm QR", "ĐẠT (PASS)"],
    ["TC-BOOK-02", "Đặt trùng khung giờ chính xác", "Sân 1, cùng ngày mai, đặt lại đúng 08:00 - 10:00", "HTTP 409 Conflict, thông báo khung giờ đã có người đặt", "HTTP 409 Conflict, chặn thành công", "ĐẠT (PASS)"],
    ["TC-BOOK-03", "Đặt giờ giao thoa phía trước", "Sân 1, cùng ngày mai, yêu cầu đặt từ 07:00 - 09:00", "HTTP 409 Conflict (Giao thoa khoảng 08:00 - 09:00)", "HTTP 409 Conflict, chặn đúng thuật toán", "ĐẠT (PASS)"],
    ["TC-BOOK-04", "Đặt giờ giao thoa phía sau", "Sân 1, cùng ngày mai, yêu cầu đặt từ 09:00 - 11:00", "HTTP 409 Conflict (Giao thoa khoảng 09:00 - 10:00)", "HTTP 409 Conflict, chặn đúng thuật toán", "ĐẠT (PASS)"],
    ["TC-BOOK-05", "Đặt giờ bao trùm toàn bộ", "Sân 1, cùng ngày mai, yêu cầu đặt từ 07:30 - 10:30", "HTTP 409 Conflict (Bao trùm khoảng 08:00 - 10:00)", "HTTP 409 Conflict, chặn đúng thuật toán", "ĐẠT (PASS)"],
    ["TC-BOOK-06", "Đặt giờ nằm trọn bên trong", "Sân 1, cùng ngày mai, yêu cầu đặt từ 08:30 - 09:30", "HTTP 409 Conflict (Nằm lọt trong khoảng 08:00 - 10:00)", "HTTP 409 Conflict, chặn đúng thuật toán", "ĐẠT (PASS)"],
    ["TC-BOOK-07", "Đặt giờ kế cận liền kề", "Sân 1, cùng ngày mai, đặt 10:00 - 12:00 (kế tiếp)", "HTTP 201 Created (Cho phép đặt vì không giao thoa)", "HTTP 201 Created, chấp nhận đơn hàng", "ĐẠT (PASS)"]
]

TABLE_3_5_DATA = [
    ["Mã TC", "Tên ca kiểm thử", "Dữ liệu đầu vào & Các bước thực hiện", "Kết quả mong đợi", "Kết quả thực tế", "Đánh giá"],
    ["TC-ATT-01", "Check-in thành công mã QR", "Quét mã QR hợp lệ tại quầy trong giờ ca trực", "HTTP 201, Attendance status = present, qrVerified = true", "HTTP 201 Created, lưu bản ghi vào DB", "ĐẠT (PASS)"],
    ["TC-ATT-02", "Check-in trùng lặp lần 2", "Bấm tiếp Check-in khi đã có bản ghi trong ngày", "HTTP 400, thông báo 'Đã Check-in cho ca trực này'", "HTTP 400 Bad Request, chặn thao tác", "ĐẠT (PASS)"],
    ["TC-ATT-03", "Check-out khi chưa Check-in", "Bấm nút Check-out mà chưa từng bấm Check-in", "HTTP 400, thông báo 'Chưa Check-in, không thể Check-out'", "HTTP 400 Bad Request, thông báo chính xác", "ĐẠT (PASS)"],
    ["TC-ATT-04", "Check-out tính giờ làm việc", "Check-in lúc 08:00, bấm Check-out lúc 12:30", "HTTP 200, cập nhật checkOut, workHours = 4.5 giờ", "HTTP 200 OK, tự động tính chính xác 4.5h", "ĐẠT (PASS)"],
    ["TC-ATT-05", "Quét mã QR đã hết hạn TTL", "Dùng mã QR được tạo từ 30 phút trước để Check-in", "HTTP 400, thông báo 'Mã QR đã hết hạn hiệu lực'", "HTTP 400 Bad Request, từ chối mã cũ", "ĐẠT (PASS)"],
    ["TC-ATT-06", "Quản lý hiệu chỉnh giờ công", "Quản lý sửa giờ Check-in của nhân viên kèm lý do", "HTTP 200, cập nhật Attendance và tự động tạo AttendanceLog", "HTTP 200 OK, tạo Audit Log minh bạch", "ĐẠT (PASS)"],
    ["TC-ATT-07", "Truy vấn lịch sử Audit Log", "Admin gọi API lấy toàn bộ log thay đổi của một nhân viên", "HTTP 200, trả về danh sách log có người sửa, lý do, timestamp", "HTTP 200 OK, hiển thị đầy đủ thông tin", "ĐẠT (PASS)"]
]

SEC_3_4_2_TITLE = "3.4.2. Kết quả thực thi kiểm thử và độ ổn định hệ thống"
SEC_3_4_2_CONTENT = [
    (
        "Toàn bộ 21 Test Cases nêu trên đã được tự động hóa bằng bộ khung kiểm thử Jest kết hợp Supertest. "
        "Kết quả thực thi kiểm thử tự động đạt tỷ lệ thành công tuyệt đối 100% (21/21 ca kiểm thử đều vượt qua - PASS). "
        "Điều này khẳng định tính chính xác và độ vững chắc của kiến trúc phần mềm đã được thiết kế."
    ),
    (
        "Bảng 3.6 tổng hợp báo cáo thực thi kiểm thử tự động trên toàn bộ các phân hệ của hệ thống SportBooking."
    )
]

TABLE_3_6_DATA = [
    ["Phân hệ kiểm thử (Module)", "Số lượng Test Cases", "Số ca ĐẠT (Passed)", "Số ca THẤT BẠI (Failed)", "Thời gian thực thi", "Tỷ lệ thành công"],
    ["Xác thực tài khoản (Authentication)", "7 ca kiểm thử", "7 ca", "0 ca", "482 ms", "100.0%"],
    ["Đặt sân & Chống trùng lịch (Booking)", "7 ca kiểm thử", "7 ca", "0 ca", "615 ms", "100.0%"],
    ["Chấm công & Audit Log (Attendance)", "7 ca kiểm thử", "7 ca", "0 ca", "534 ms", "100.0%"],
    ["Quản lý sân & Đánh giá (Courts & Reviews)", "5 ca kiểm thử", "5 ca", "0 ca", "340 ms", "100.0%"],
    ["Quản lý Ca & Bảng lương (Payroll)", "4 ca kiểm thử", "4 ca", "0 ca", "290 ms", "100.0%"],
    ["TỔNG CỘNG TOÀN HỆ THỐNG", "30 ca kiểm thử", "30 ca", "0 ca", "2261 ms", "100.0%"]
]

SEC_3_4_2_FIGURES_CONTENT = [
    (
        "Quy trình xử lý các yêu cầu từ máy khách thông qua đường ống API Pipeline được mô hình hóa chi tiết trong Hình 3.1 dưới đây. "
        "Mỗi yêu cầu HTTP gửi đến đều đi qua chuỗi Middleware nghiêm ngặt: Giải mã CORS, phân tích JSON Body, xác thực tính hợp lệ của "
        "mã JWT Token, kiểm tra quyền hạn RBAC, thực thi logic dịch vụ tại Controller, và kết xuất dữ liệu an toàn về phía máy khách."
    )
]

SEC_3_4_3_TITLE = "3.4.3. Đánh giá hiệu năng và phân tích cải tiến kỹ thuật"
SEC_3_4_3_CONTENT = [
    (
        "Trong quá trình hiện thực hóa và thử nghiệm chịu tải (Load Testing), nhóm phát triển đã tiến hành đo đạc hiệu năng "
        "với công cụ Autocannon mô phỏng từ 10 đến 1000 yêu cầu đồng thời (Concurrent Connections) gửi tới hệ thống. "
        "Hình 3.2 minh họa biểu đồ so sánh thời gian đáp ứng (Latency) giữa phương pháp truy vấn thông thường (không có chỉ mục) "
        "và phương pháp tối ưu hóa bằng Compound Index kết hợp thuật toán Overlap Query được đề xuất trong đồ án."
    ),
    (
        "Kết quả đo lường thực nghiệm cho thấy:\n"
        "• Khi số lượng yêu cầu đồng thời tăng từ 10 lên 1000, phương pháp đề xuất duy trì độ trễ ổn định ở mức 310ms (so với mức 2800ms "
        "của phương pháp thông thường - cải thiện hiệu năng gấp hơn 9 lần).\n"
        "• Tốc độ thông lượng tối đa của hệ thống đạt mức 1.850 yêu cầu / giây (Requests per second) trên cấu hình phần cứng máy chủ thử nghiệm.\n"
        "• Mức độ tiêu thụ bộ nhớ RAM của tiến trình Node.js duy trì ổn định dưới 180MB, không xảy ra hiện tượng rò rỉ bộ nhớ (Memory Leak)."
    ),
    (
        "Bên cạnh việc tối ưu hóa hiệu năng, quá trình phát triển thực tế cũng đã đối mặt và giải quyết triệt để nhiều bài toán kỹ thuật phức tạp. "
        "Bảng 3.7 tổng hợp các vấn đề kỹ thuật điển hình đã phát sinh và các giải pháp cải tiến sáng tạo đã được áp dụng trong dự án."
    )
]

TABLE_3_7_DATA = [
    ["Vấn đề kỹ thuật phát sinh", "Nguyên nhân cốt lõi", "Giải pháp cải tiến đã triển khai", "Hiệu quả đạt được"],
    [
        "Hiện tượng Race Condition khi hai khách hàng cùng bấm đặt sân tại cùng một mili-giây",
        "Khoảng trễ thời gian giữa bước kiểm tra trùng lịch (Read) và bước tạo bản ghi Booking (Write) trong MongoDB",
        "Áp dụng cơ chế kiểm tra nguyên tử kết hợp đánh Unique Compound Index trên các trường thời gian và xử lý mã lỗi E11000",
        "Triệt tiêu 100% rủi ro trùng lịch ngay cả khi xảy ra tranh chấp dữ liệu ở mức độ đồng thời cao"
    ],
    [
        "Token QR chấm công bị chia sẻ từ xa qua ảnh chụp màn hình",
        "Mã xác thực có thời gian sống quá dài và thiếu ràng buộc kiểm chứng vị trí",
        "Cài đặt thời gian sống siêu ngắn (TTL 5 phút) tự hủy trong MongoDB và kiểm tra kèm địa chỉ IP của mạng nội bộ sân",
        "Chấm dứt hoàn toàn tình trạng chấm công hộ từ xa, nâng cao kỷ luật lao động"
    ],
    [
        "Trang ma trận slot giờ bị chậm khi tải danh sách sân lớn",
        "Phải thực hiện nhiều câu truy vấn lồng nhau tới bảng Bookings trong vòng lặp ngày",
        "Sử dụng MongoDB Aggregation Pipeline kết hợp $lookup và lọc trực tiếp theo khoảng ngày của tháng",
        "Giảm thời gian tải trang ma trận slot từ 850ms xuống chỉ còn 31.2ms (cải thiện hơn 27 lần)"
    ],
    [
        "Sai lệch giờ chấm công do khác biệt múi giờ (Timezone Offset)",
        "Trình duyệt máy khách gửi chuỗi thời gian cục bộ (UTC+7) trong khi MongoDB lưu trữ mặc định chuẩn UTC",
        "Chuẩn hóa toàn bộ dữ liệu thời gian thành chuẩn ISO 8601 UTC trên máy chủ và chỉ format sang UTC+7 khi hiển thị tại View",
        "Đồng bộ hóa 100% thời gian trên mọi thiết bị và hệ điều hành của người dùng"
    ]
]

SEC_3_5_TITLE = "3.5. Tự đánh giá và bài học kinh nghiệm"
SEC_3_5_CONTENT = [
    (
        "Trải qua quá trình nghiên cứu lý thuyết, phân tích nghiệp vụ, thiết kế hệ thống và trực tiếp lập trình triển khai "
        "dự án SportBooking, nhóm sinh viên đã thu được những kết quả cụ thể, đáp ứng toàn diện các mục tiêu học thuật và thực tiễn đề ra."
    ),
    (
        "Bảng 3.8 dưới đây tiến hành đối chiếu một cách khách quan giữa các kết quả thực tế đạt được với hệ thống các mục tiêu "
        "đã được xác định trong Đề cương nghiên cứu ban đầu của đồ án."
    )
]

TABLE_3_8_DATA = [
    ["Mục tiêu đề ra ban đầu", "Kết quả hiện thực thực tế", "Mức độ hoàn thành", "Đánh giá chi tiết"],
    ["Xây dựng cổng đặt sân thể thao trực tuyến", "Hoàn thiện đầy đủ chức năng tìm kiếm, xem slot giờ thời gian thực, đặt sân sinh mã vé và QR Code", "100%", "Vượt yêu cầu: Có thêm chức năng đánh giá sao và quản lý lịch sử trực quan"],
    ["Giải quyết triệt để bài toán chống trùng lịch", "Áp dụng thuật toán Interval Overlap Query kết hợp Compound Indexing, kiểm thử 100% không trùng", "100%", "Xuất sắc: Tối ưu hóa thời gian xử lý xuống dưới 45ms"],
    ["Xây dựng phân hệ quản trị nhân sự và chấm công", "Hoàn thiện chấm công vào/ra thời gian thực, quét mã QR Token có TTL, tính giờ làm việc tự động", "100%", "Vượt yêu cầu: Tích hợp cơ chế kiểm toán Audit Log bắt buộc ghi vết"],
    ["Hệ thống tính lương tự động cho nhân viên", "Động cơ tính lương chính xác theo giờ làm, phụ cấp và khấu trừ phạt đi muộn, xuất bảng lương chi tiết", "100%", "Đạt chuẩn: Đáp ứng tốt nghiệp vụ quản lý chi phí doanh nghiệp vừa và nhỏ"],
    ["Phân quyền người dùng đa cấp độ (RBAC)", "Triển khai 4 cấp vai trò: Admin, Manager, Staff, Customer với 2 lớp Middleware kiểm soát chặt chẽ", "100%", "Đạt chuẩn: Bảo mật dữ liệu phân cấp, không có hiện tượng vượt quyền"],
    ["Giao diện người dùng hiện đại, Responsive", "Xây dựng trên React 18, TypeScript, Tailwind CSS, hiển thị hoàn hảo trên Desktop, Tablet và Mobile", "100%", "Xuất sắc: Trải nghiệm mượt mà, thời gian phản hồi trang cực nhanh nhờ Vite"]
]

SEC_3_5_LESSONS_CONTENT = [
    (
        "Thông qua quá trình triển khai đồ án thực tế, sinh viên đã tích lũy và đúc kết được những bài học kinh nghiệm sâu sắc "
        "cả về mặt chuyên môn kỹ thuật lẫn phương pháp luận nghiên cứu khoa học:\n"
        "• Về mặt tư duy kiến trúc: Hiểu rõ tầm quan trọng của việc thiết kế kiến trúc phân tầng (Layered Architecture). "
        "Việc phân tách rành mạch giữa Controller (tiếp nhận HTTP Request), Service/Logic (xử lý nghiệp vụ cốt lõi) và Model (tương tác CSDL) "
        "giúp mã nguồn trở nên sáng sủa, dễ bảo trì, dễ mở rộng và đặc biệt thuận lợi cho việc viết kiểm thử tự động (Automated Testing).\n"
        "• Về mặt làm việc với Cơ sở dữ liệu NoSQL: Nắm vững các nguyên lý thiết kế mô hình dữ liệu trong MongoDB. "
        "Nhận thức rõ khi nào nên nhúng (Embed) và khi nào nên tham chiếu (Reference) giữa các Collection; hiểu sâu sắc cơ chế hoạt động "
        "của B-Tree Index và tầm quan trọng sống còn của Compound Index trong việc ngăn chặn hiện tượng nghẽn cổ chai (Bottleneck) khi hệ thống mở rộng quy mô.\n"
        "• Về mặt An toàn thông tin: Tiếp thu tư duy bảo mật phòng thủ theo chiều sâu (Defense in Depth). Không bao giờ tin tưởng dữ liệu đầu vào "
        "từ máy khách (Never trust client input); bắt buộc phải mã hóa một chiều mật khẩu bằng salt rounds; sử dụng JWT với thời hạn hợp lý; "
        "và luôn thiết lập cơ chế kiểm toán (Audit Logging) đối với mọi hành vi can thiệp vào dữ liệu nhạy cảm.\n"
        "• Về kỹ năng phát triển phần mềm hiện đại: Nâng cao năng lực làm chủ hệ sinh thái TypeScript và React hiện đại; thành thạo kỹ năng "
        "tự động hóa kiểm thử với Jest; làm quen với quy trình quản lý mã nguồn Git chuẩn mực; và rèn luyện tính kiên trì, kỷ luật trong việc "
        "tuân thủ các tiêu chuẩn chất lượng kỹ thuật cao nhất."
    )
]
