# -*- coding: utf-8 -*-
"""
Chương 1: Tổng Quan Đề Tài Và Cơ Sở Thực Hiện.
Bao gồm:
1.1. Bài toán và lý do lựa chọn đề tài
1.2. Mục tiêu của đề tài
1.3. Đối tượng sử dụng, phạm vi và giới hạn của đề tài
1.4. Dữ liệu đầu vào, đầu ra và các yêu cầu/ràng buộc chính
1.5. Cơ sở lý thuyết, công nghệ và công cụ sử dụng
"""

CHAPTER_1_TITLE = "CHƯƠNG 1. TỔNG QUAN ĐỀ TÀI VÀ CƠ SỞ THỰC HIỆN"

# 1.1 Bài toán và lý do lựa chọn đề tài
SEC_1_1_TITLE = "1.1. Bài toán và lý do lựa chọn đề tài"
SEC_1_1_CONTENT = [
    (
        "Trong những năm gần đây, phong trào thể dục thể thao quần chúng tại Việt Nam đã có những bước chuyển mình "
        "mạnh mẽ cả về lượng và chất. Việc tham gia các hoạt động thể thao định kỳ không chỉ dừng lại ở mục đích nâng cao "
        "thể lực, phòng ngừa các bệnh lý mạn tính của lối sống hiện đại, mà còn là phương tiện giải tỏa áp lực công việc, "
        "mở rộng các mối quan hệ xã hội và xây dựng văn hóa đội nhóm lành mạnh. Khảo sát thực tế tại các cụm dân cư, khu đô thị "
        "mới và các trường đại học tại Hà Nội và Thành phố Hồ Chí Minh cho thấy, số lượng người chơi thường xuyên tập luyện "
        "các bộ môn như bóng đá sân cỏ nhân tạo (sân 5 và sân 7 người), cầu lông, tennis, bóng rổ, bóng chuyền và pickleball "
        "chiếm tỷ lệ hơn 45% dân số trong độ tuổi lao động từ 18 đến 45 tuổi."
    ),
    (
        "Tuy nhiên, sự phát triển nhanh chóng của nhu cầu thể thao cộng đồng lại bộc lộ một khoảng cách rất lớn so với "
        "năng lực quản lý và trình độ ứng dụng công nghệ của các chủ cơ sở kinh doanh sân bãi. Phần lớn các cụm sân hiện nay "
        "vẫn đang vận hành theo mô hình quản lý thủ công truyền thống, tồn tại rất nhiều lỗ hổng và rủi ro nghiêm trọng:"
    ),
    (
        "Thứ nhất, bài toán bất cập trong quy trình đặt sân và tương tác với khách hàng. Hiện nay, khi người chơi có nhu cầu "
        "tìm kiếm và đặt sân, họ buộc phải tra cứu thông tin phân tán qua các hội nhóm mạng xã hội, sau đó gọi điện thoại hoặc nhắn tin "
        "cho người quản lý sân. Người quản lý sẽ phải lật mở sổ sách hoặc kiểm tra file Excel để trả lời xem khung giờ đó còn trống hay không. "
        "Quy trình này gây mất rất nhiều thời gian cho cả hai phía. Khách hàng không thể có được cái nhìn tổng quan về sơ đồ các sân "
        "và các khung giờ trống trong ngày, dẫn đến tình trạng bị động và khó khăn trong việc lên lịch thi đấu cho đội nhóm."
    ),
    (
        "Thứ hai, nguy cơ xung đột lịch đặt sân (Booking Collision). Đây là vấn đề nhức nhối nhất trong quản lý sân bãi thủ công. "
        "Do việc ghi chép qua sổ sách hoặc tin nhắn không có cơ chế khóa tức thời và kiểm tra ràng buộc tự động, trường hợp hai nhân viên "
        "cùng xác nhận một khung giờ cho hai khách hàng khác nhau, hoặc người quản lý quên cập nhật lịch đã đặt vào sổ, xảy ra rất phổ biến. "
        "Khi hai đội bóng hoặc người chơi cùng đến sân tại một thời điểm và phát hiện khung giờ của mình bị trùng lặp, sự cố này gây ra "
        "những tranh cãi gay gắt, làm tổn hại nặng nề đến hình ảnh thương hiệu của trung tâm thể thao và dẫn đến nguy cơ mất khách hàng vĩnh viễn."
    ),
    (
        "Thứ ba, sự lãng phí tài nguyên và thất thoát doanh thu ngoài ý muốn. Do thiếu một hệ thống hiển thị lịch trực quan theo thời gian thực, "
        "nhiều khung giờ vàng (từ 17:30 đến 21:00) tại các sân có thể bị bỏ trống do khách hủy lịch đột ngột mà ban quản lý không kịp thời "
        "thông báo để khách hàng khác đăng ký thuê lại. Ngược lại, vào các khung giờ thấp điểm (buổi sáng hoặc đầu giờ chiều), ban quản lý "
        "không có công cụ linh hoạt để áp dụng chính sách giảm giá nhằm kích cầu và tối ưu hóa hiệu suất khai thác tài sản cố định."
    ),
    (
        "Thứ tư, bài toán phân tán và thiếu minh bạch trong quản lý nhân sự tại các cụm sân. Các cơ sở thể thao thường có diện tích lớn, "
        "hoạt động liên tục từ 16 đến 18 tiếng mỗi ngày và phân chia thành nhiều ca làm việc (ca sáng, ca chiều, ca tối). Việc phân công ca trực, "
        "chấm công nhân viên tại chỗ, kiểm tra sự có mặt thực tế tại sân thường dựa vào sự tin tưởng lẫn nhau hoặc ký sổ giấy tờ. "
        "Điều này dẫn đến tình trạng nhân viên đi muộn về sớm, chấm công hộ hoặc nhờ người khác trực thay mà không báo cáo. Đến cuối tháng, "
        "người quản lý phải mất hàng ngày trời để thu thập sổ sách, đối chiếu giờ làm việc thủ công để tính bảng lương, tiềm ẩn nguy cơ sai sót "
        "rất lớn và dễ gây ra sự nghi kỵ, bức xúc nội bộ."
    ),
    (
        "Thứ năm, sự thiếu hụt các báo cáo phân tích kinh doanh đa chiều. Các chủ đầu tư cụm sân thể thao hiện nay phần lớn chỉ nắm được "
        "con số tổng doanh thu ước lượng mà không thể phân tích sâu về các chỉ số hiệu quả kinh doanh cốt lõi (KPI): Môn thể thao nào đang mang lại "
        "tỷ suất lợi nhuận cao nhất? Tỷ lệ lấp đầy sân (Occupancy Rate) trung bình trong tuần là bao nhiêu? Doanh thu biến động như thế nào qua "
        "các tháng? Chi phí nhân sự chiếm tỷ trọng bao nhiêu phần trăm trong tổng doanh thu? Sự thiếu vắng dữ liệu phân tích trực quan khiến việc "
        "ra quyết định đầu tư, mở rộng cơ sở hoặc nâng cấp dịch vụ mang tính cảm tính và rủi ro cao."
    )
]

TABLE_1_1_CAPTION = "Bảng 1.1: Bảng khảo sát và so sánh các phương thức quản lý sân thể thao tại Việt Nam"
TABLE_1_1_HEADERS = ["Tiêu chí so sánh", "Phương thức truyền thống (Sổ sách/Excel)", "Phần mềm đóng gói ngoại nhập", "Hệ thống SportBooking (Đề xuất)"]
TABLE_1_1_ROWS = [
    ("Tra cứu & Đặt sân", "Thủ công qua gọi điện thoại, Zalo; mất từ 15-30 phút trao đổi.", "Khách hàng phải cài đặt app phức tạp; chi phí bản quyền cao.", "Truy cập trực tiếp qua Web responsive; chọn slot và đặt sân tức thì trong 30 giây."),
    ("Chống trùng lịch (Collision)", "Phụ thuộc 100% trí nhớ con người; tỷ lệ trùng lịch từ 5-10%.", "Có hỗ trợ nhưng cấu hình phức tạp, khó tùy biến theo đặc thù sân VN.", "Thuật toán kiểm tra giao thoa khoảng thời gian tại Backend; chống trùng lịch tuyệt đối 100%."),
    ("Vé & Xác thực check-in", "Ghi nhớ tên hoặc xem tin nhắn Zalo; dễ nhầm lẫn thông tin.", "Sử dụng mã vạch hoặc thẻ cứng; phát sinh chi phí in ấn thiết bị.", "Tự động sinh mã đơn duy nhất kèm vé điện tử mã QR Code tiện lợi trên điện thoại."),
    ("Quản lý ca trực & Chấm công", "Nhân viên ký sổ tay giấy tờ; dễ gian lận giờ làm việc.", "Yêu cầu máy chấm công vân tay vật lý đắt tiền, khó lắp ngoài trời.", "Chấm công trực tiếp trên Web kết hợp quét mã QR động tại sân; lưu vết Audit Log bất biến."),
    ("Tính lương nhân sự", "Quản lý cộng sổ thủ công cuối tháng; dễ nhầm lẫn ngày công.", "Tách rời phân hệ đặt sân; phải xuất dữ liệu import thủ công.", "Tự động tính lương tháng từ số ngày công thực tế theo công thức chuẩn 26 công."),
    ("Báo cáo & Phân tích KPI", "Báo cáo sơ sài trên Excel; khó cập nhật theo thời gian thực.", "Báo cáo phức tạp, không thân thiện với chủ sân thể thao tại VN.", "Dashboard trực quan với 4 biểu đồ Recharts cập nhật dữ liệu tự động thời gian thực.")
]

# 1.2 Mục tiêu của đề tài
SEC_1_2_TITLE = "1.2. Mục tiêu của đề tài"
SEC_1_2_CONTENT = [
    (
        "Mục tiêu tổng quát của đề tài là xây dựng thành công một nền tảng phần mềm ứng dụng Web hoàn chỉnh, hiện đại, "
        "hoạt động ổn định trên môi trường thực tế, tích hợp trọn vẹn hai trụ cột nghiệp vụ: (1) Cổng dịch vụ đặt sân trực tuyến "
        "thông minh dành cho khách hàng với cơ chế chống trùng lịch triệt để; và (2) Hệ thống quản trị điều hành nội bộ đa phân hệ "
        "(mini-ERP) phục vụ toàn diện công tác quản lý sân bãi, phân ca trực, chấm công bằng mã QR động có lưu vết kiểm toán, "
        "phê duyệt nghỉ phép, tự động tính bảng lương và cung cấp bảng điều khiển báo cáo phân tích KPI thời gian thực."
    ),
    (
        "Để hiện thực hóa mục tiêu tổng quát, đề tài xác định các mục tiêu cụ thể và đo lường được đối với từng đối tượng tác nhân:"
    ),
    (
        "Đối với Khách hàng (Customer):\n"
        "• Xây dựng giao diện tìm kiếm thông minh, cho phép lọc sân theo bộ môn (Bóng đá, Cầu lông, Tennis, Pickleball, Bóng rổ, Bóng chuyền), "
        "vị trí địa lý, mức giá và các tiện ích đi kèm (Wifi, phòng tắm, đèn chiếu sáng LED, điều hòa, chỗ đỗ xe ô tô).\n"
        "• Hiển thị sơ đồ các khung giờ (slots) trực quan theo từng ngày lựa chọn, phân biệt rõ ràng trạng thái còn trống, đã có người đặt và đang chọn.\n"
        "• Cung cấp quy trình đặt sân trực tuyến nhanh chóng, tự động tính toán tổng số giờ và tổng tiền chính xác theo biểu phí của từng sân.\n"
        "• Phát hành vé điện tử có mã đặt sân duy nhất (format: BK-YYYYMMDD-XXXX) kèm mã phản hồi nhanh QR Code để đối soát khi đến sân.\n"
        "• Hỗ trợ tính năng hủy đơn đặt sân hợp lệ kèm cơ chế hoàn tiền mô phỏng tự động theo chính sách của trung tâm.\n"
        "• Cho phép gửi nhận xét và đánh giá chất lượng sân theo thang điểm 1 đến 5 sao đối với các lượt đặt sân đã hoàn thành."
    ),
    (
        "Đối với Nhân viên vận hành (Staff):\n"
        "• Cung cấp giao diện xem lịch phân ca làm việc cá nhân theo từng tuần và từng tháng, hiển thị rõ ca trực và sân phụ trách.\n"
        "• Tích hợp tính năng chấm công Vào (Check-in) và chấm công Ra (Check-out) trực quan kèm đồng hồ điện tử cập nhật thời gian thực.\n"
        "• Hỗ trợ cơ chế quét mã QR Token tại sân để xác thực sự có mặt thực tế, tự động phát hiện và gắn cờ đi muộn ('late') dựa trên thời gian ân hạn trễ.\n"
        "• Tự động tính toán tổng số giờ làm việc thực tế trong ca sau khi đã khấu trừ thời gian nghỉ giữa ca theo quy định.\n"
        "• Cung cấp chức năng tạo và gửi đơn xin nghỉ phép trực tuyến (nghỉ phép năm, ốm đau, việc riêng, nghỉ không lương) và theo dõi trạng thái phê duyệt."
    ),
    (
        "Đối với Quản lý chi nhánh cụm sân (Manager):\n"
        "• Quản lý danh mục sân thể thao, cập nhật thông tin mô tả, thư viện hình ảnh, bảng giá thuê theo giờ và trạng thái hoạt động/bảo trì.\n"
        "• Lập kế hoạch và xếp lịch phân ca trực cho đội ngũ nhân viên theo ngày; kiểm soát ràng buộc không phân trùng ca cùng ngày cho một nhân sự.\n"
        "• Giám sát bảng chấm công hàng ngày của toàn bộ nhân viên; tạo mã QR Token động cho từng sân với thời hạn hiệu lực cụ thể.\n"
        "• Tiếp nhận, xem xét và thực hiện phê duyệt (Approve) hoặc từ chối (Reject) các đơn xin nghỉ phép của nhân viên kèm lý do phản hồi minh bạch.\n"
        "• Theo dõi toàn bộ danh sách các đơn đặt sân trong ngày để phối hợp điều phối sân bãi kịp thời."
    ),
    (
        "Đối với Ban Quản trị cấp cao (Admin):\n"
        "• Toàn quyền quản trị tài khoản người dùng, thiết lập phân quyền theo vai trò (RBAC) và quản lý hồ sơ nhân sự toàn hệ thống.\n"
        "• Cung cấp công cụ can thiệp hiệu chỉnh dữ liệu chấm công của nhân viên khi có sự cố quên bấm giờ; BẮT BUỘC nhập lý do hiệu chỉnh "
        "và tự động ghi nhận vào bảng lưu vết kiểm toán (Audit Log) bất biến để đảm bảo tính minh bạch tuyệt đối.\n"
        "• Tự động hóa quy trình tính toán bảng lương hàng tháng dựa trên số ngày công thực tế trích xuất từ bảng chấm công, phụ cấp, tăng ca và khấu trừ.\n"
        "• Quản trị vòng đời bảng lương: từ trạng thái Bản nháp ('draft'), Đã phê duyệt ('approved') đến Đã chi trả ('paid').\n"
        "• Cung cấp Dashboard điều hành kinh doanh trực quan với 4 biểu đồ Recharts cập nhật thời gian thực: Doanh thu 6 tháng gần nhất, "
        "Lượng booking theo tháng, Phân bố đặt sân theo môn thể thao và Cơ cấu nhân sự theo phòng ban."
    ),
    (
        "Tiêu chí đo lường mức độ hoàn thành sản phẩm:\n"
        "• Toàn bộ các API Backend biên dịch không lỗi TypeScript, vượt qua 100% các kịch bản kiểm thử tích hợp tự động (Jest & Supertest).\n"
        "• Giao diện Frontend hoàn thiện 100% các màn hình theo thiết kế, build production thành công, không phát sinh lỗi console runtime.\n"
        "• Cơ sở dữ liệu MongoDB được thiết kế chuẩn hóa 12 Collections, có đầy đủ dữ liệu mẫu (Seed Data) tiếng Việt thực tế.\n"
        "• Thời gian phản hồi của các API kiểm tra chống trùng lịch và đặt sân đạt mức dưới 100ms trên môi trường máy chủ tiêu chuẩn."
    )
]

# 1.3 Đối tượng sử dụng, phạm vi và giới hạn của đề tài
SEC_1_3_TITLE = "1.3. Đối tượng sử dụng, phạm vi và giới hạn của đề tài"
SEC_1_3_CONTENT = [
    (
        "Hệ thống SportBooking được thiết kế để phục vụ 4 nhóm đối tượng người dùng chính trong xã hội và tổ chức doanh nghiệp:"
    ),
    (
        "1. Khách hàng cá nhân và đội nhóm thể thao (Customer): Là những người có nhu cầu tìm kiếm thông tin sân bãi, so sánh mức giá, "
        "kiểm tra lịch trống và đặt sân để tổ chức các buổi tập luyện, giao lưu thi đấu thể thao sau giờ làm việc và học tập.\n"
        "2. Nhân viên vận hành tại cụm sân (Staff): Là lực lượng lao động trực tiếp tại các sân bóng, nhà thi đấu thể thao, chịu trách nhiệm "
        "trực ca, đón tiếp khách hàng, kiểm tra vé điện tử QR Code, hỗ trợ bóng và nước uống, đồng thời thực hiện nghĩa vụ chấm công vào/ra theo ca.\n"
        "3. Quản lý cơ sở và chi nhánh (Manager): Là người chịu trách nhiệm điều hành hoạt động kinh doanh hàng ngày tại cụm sân, phân công lịch trực "
        "cho nhân viên, giải quyết các sự cố phát sinh, quản lý tình trạng sân bãi và xét duyệt các đơn xin nghỉ phép của cấp dưới.\n"
        "4. Quản trị viên hệ thống và chủ doanh nghiệp (Admin): Là ban lãnh đạo trung tâm thể thao, người nắm quyền kiểm soát cao nhất đối với "
        "tài khoản, nhân sự, bảng lương và định hướng phát triển kinh doanh thông qua các số liệu báo cáo tài chính."
    )
]

TABLE_1_2_CAPTION = "Bảng 1.2: Ma trận phân quyền chức năng theo 4 nhóm đối tượng người dùng (RBAC Matrix)"
TABLE_1_2_HEADERS = ["Phân hệ / Chức năng nghiệp vụ", "Khách hàng (Customer)", "Nhân viên (Staff)", "Quản lý (Manager)", "Quản trị viên (Admin)"]
TABLE_1_2_ROWS = [
    ("Đăng ký tài khoản & Đăng nhập", "Toàn quyền", "Toàn quyền", "Toàn quyền", "Toàn quyền"),
    ("Quản lý hồ sơ cá nhân & Đổi mật khẩu", "Toàn quyền", "Toàn quyền", "Toàn quyền", "Toàn quyền"),
    ("Tìm kiếm, xem thông tin sân & slot trống", "Toàn quyền", "Toàn quyền", "Toàn quyền", "Toàn quyền"),
    ("Đặt sân trực tuyến & Nhận vé QR", "Toàn quyền", "Không có quyền", "Không có quyền", "Không có quyền"),
    ("Hủy đặt sân & Nhận hoàn tiền mô phỏng", "Chỉ đơn của mình", "Không có quyền", "Không có quyền", "Toàn quyền quản trị"),
    ("Đánh giá sân (Review 1-5 sao)", "Chỉ đơn hoàn thành", "Không có quyền", "Xem danh sách", "Toàn quyền quản trị"),
    ("Xem ca trực & Lịch phân công", "Không có quyền", "Chỉ lịch của mình", "Toàn quyền cụm sân", "Toàn quyền hệ thống"),
    ("Chấm công Vào/Ra (Check-in/Check-out)", "Không có quyền", "Toàn quyền cá nhân", "Toàn quyền cá nhân", "Toàn quyền cá nhân"),
    ("Quét mã QR Code xác thực tại sân", "Không có quyền", "Toàn quyền cá nhân", "Toàn quyền cá nhân", "Toàn quyền cá nhân"),
    ("Tạo mã QR Token động cho sân", "Không có quyền", "Không có quyền", "Toàn quyền", "Toàn quyền"),
    ("Nộp đơn xin nghỉ phép", "Không có quyền", "Toàn quyền cá nhân", "Toàn quyền cá nhân", "Toàn quyền cá nhân"),
    ("Phê duyệt / Từ chối đơn nghỉ phép", "Không có quyền", "Không có quyền", "Toàn quyền xét duyệt", "Toàn quyền xét duyệt"),
    ("Hiệu chỉnh chấm công & Ghi Audit Log", "Không có quyền", "Không có quyền", "Hiệu chỉnh có lý do", "Toàn quyền hiệu chỉnh"),
    ("Quản lý danh mục Sân & Bảng giá", "Không có quyền", "Không có quyền", "Toàn quyền chỉnh sửa", "Toàn quyền tạo/sửa/xóa"),
    ("Quản lý Tài khoản & Hồ sơ nhân sự", "Không có quyền", "Không có quyền", "Xem hồ sơ nhân viên", "Toàn quyền cấp mới/khóa"),
    ("Tính bảng lương tự động & Duyệt chi", "Không có quyền", "Không có quyền", "Xem bảng lương", "Toàn quyền tính/duyệt/chi"),
    ("Xem Dashboard báo cáo KPI Recharts", "Không có quyền", "Không có quyền", "Xem thống kê cơ sở", "Toàn quyền xem báo cáo")
]

SEC_1_3_SCOPE_TEXT = [
    (
        "Phạm vi nghiên cứu và triển khai của đề tài được giới hạn rõ ràng trong các phạm trù sau:\n"
        "• Về mặt nghiệp vụ: Tập trung giải quyết trọn vẹn 5 phân hệ chức năng cốt lõi: (1) Xác thực và phân quyền tài khoản RBAC; "
        "(2) Quản lý sân và đặt sân trực tuyến chống trùng lịch; (3) Quản lý ca trực, phân ca và chấm công bằng mã QR động kèm Audit Log; "
        "(4) Quản lý vòng đời đơn xin nghỉ phép; (5) Tính bảng lương tự động theo ngày công chuẩn và báo cáo thống kê Dashboard KPI.\n"
        "• Về mặt công nghệ: Xây dựng hệ thống hoàn chỉnh trên nền tảng Web Application đa nền tảng, sử dụng kiến trúc phân tầng (Layered Architecture), "
        "kết hợp Frontend SPA (Single Page Application) và Backend RESTful API stateless.\n"
        "• Về mặt đối tượng môn thể thao: Hỗ trợ linh hoạt 6 bộ môn thể thao phổ biến nhất tại Việt Nam hiện nay, bao gồm Bóng đá (sân 5 và sân 7), "
        "Cầu lông, Tennis, Pickleball, Bóng rổ và Bóng chuyền.\n"
        "• Về mặt dữ liệu: Triển khai trên cơ sở dữ liệu MongoDB với 12 collections chuẩn hóa, cung cấp bộ dữ liệu mẫu (Seed Data) phong phú, "
        "gần gũi với thực tế các sân bãi tại Thành phố Hồ Chí Minh và Hà Nội."
    ),
    (
        "Các giới hạn của đề tài (Out-of-Scope) trong giai đoạn hiện tại:\n"
        "• Tích hợp cổng thanh toán trực tuyến thực tế: Trong khuôn khổ đồ án, hệ thống triển khai cơ chế thanh toán mô phỏng (Sandbox Simulation), "
        "tự động xác nhận thanh toán thành công và sinh vé điện tử mà chưa kết nối trực tiếp với cổng thanh toán ngân hàng thương mại thật "
        "(như VNPay, MoMo, ZaloPay) nhằm tránh các thủ tục pháp lý và chi phí duy trì tài khoản doanh nghiệp.\n"
        "• Tích hợp thiết bị phần cứng chuyên dụng: Hệ thống chưa kết nối trực tiếp với các thiết bị phần cứng như cổng xoay tự động (Turnstile), "
        "máy chấm công vân tay vật lý hay hệ thống đóng/ngắt đèn chiếu sáng thông minh qua rơ-le IoT; thay vào đó, toàn bộ việc xác thực được giải quyết "
        "hiệu quả và tiết kiệm chi phí thông qua cơ chế mã QR Token động trên thiết bị di động của nhân viên.\n"
        "• Ứng dụng di động độc lập (Native Mobile App): Hiện tại hệ thống tập trung hoàn thiện phiên bản Web Application chuẩn Responsive, "
        "hoạt động mượt mà trên trình duyệt của máy tính để bàn, máy tính bảng và điện thoại thông minh (iOS/Android), chưa phát hành file cài đặt APK hay iOS độc lập."
    )
]

# 1.4 Dữ liệu đầu vào, đầu ra và các yêu cầu/ràng buộc chính
SEC_1_4_TITLE = "1.4. Dữ liệu đầu vào, đầu ra và các yêu cầu/ràng buộc chính"
SEC_1_4_CONTENT = [
    (
        "Để đảm bảo hệ thống vận hành ổn định, chính xác và có khả năng kiểm soát dữ liệu chặt chẽ, việc xác định rõ ràng luồng dữ liệu "
        "đầu vào (Inputs), kết quả đầu ra (Outputs) cùng các quy tắc ràng buộc nghiệp vụ (Business Rules) là nhiệm vụ có tính quyết định."
    )
]

TABLE_1_3_CAPTION = "Bảng 1.3: Bảng quy định dữ liệu đầu vào và đầu ra của các phân hệ nghiệp vụ chính"
TABLE_1_3_HEADERS = ["Phân hệ nghiệp vụ", "Dữ liệu đầu vào (Inputs)", "Quy trình xử lý nghiệp vụ", "Dữ liệu đầu ra (Outputs)"]
TABLE_1_3_ROWS = [
    ("Xác thực & Phân quyền", "Email, mật khẩu, họ tên, số điện thoại, mật khẩu cũ/mới.", "Kiểm tra định dạng Zod -> Hash mật khẩu bcrypt -> Kiểm tra trạng thái isActive -> Sinh JWT Bearer token 7 ngày.", "JWT Token, đối tượng User, điều hướng giao diện theo Role."),
    ("Tìm kiếm & Xem lịch sân", "Bộ lọc: môn thể thao, vị trí quận huyện, khoảng giá, tiện ích, ngày xem lịch.", "Truy vấn collection courts -> Truy vấn collection bookings lọc theo courtId và date -> Tổng hợp các slot bận/trống.", "Danh sách sân phù hợp, sơ đồ ma trận slot giờ bận (màu đỏ) và trống (màu xanh)."),
    ("Đặt sân chống trùng lịch", "courtId, date (YYYY-MM-DD), startTime (HH:mm), endTime (HH:mm), paymentMethod, notes.", "Kiểm tra giờ mở cửa sân -> Quét Compound Index bookings -> Thuật toán kiểm tra giao thoa thời gian -> Tính tiền -> Sinh mã đơn BK-YYYYMMDD-XXXX.", "Bản ghi Booking confirmed, mã đơn duy nhất, vé điện tử QR Code (HTTP 201) hoặc báo lỗi HTTP 409 Conflict."),
    ("Quản lý ca trực & Phân ca", "Tên ca, giờ bắt đầu, giờ kết thúc, giờ nghỉ, ân hạn trễ (gracePeriod); employeeId, courtId, date.", "Kiểm tra tính hợp lệ thời gian -> Kiểm tra unique không phân trùng ca cùng ngày cho 1 nhân viên -> Lưu WorkSchedule.", "Danh mục Ca làm việc (Shifts), bảng phân ca làm việc (WorkSchedules) hoàn chỉnh."),
    ("Chấm công QR & Audit Log", "workScheduleId, qrToken sân, giờ checkIn/checkOut thực tế; lý do hiệu chỉnh (nếu Admin sửa).", "Xác thực hạn dùng qrToken -> So sánh giờ vào với gracePeriod gắn status 'present'/'late' -> Tính giờ làm trừ giờ nghỉ -> Bắt buộc ghi AuditLog.", "Bản ghi Attendance, tổng workHours, bản ghi AttendanceLog lưu vết kiểm toán bất biến."),
    ("Quản lý Đơn xin nghỉ phép", "Loại nghỉ phép (annual/sick/personal/unpaid), startDate, endDate, lý do nghỉ việc.", "Kiểm tra startDate <= endDate -> Thuật toán kiểm tra giao thoa ngày nghỉ đã có -> Lưu trạng thái pending -> Quản lý Approve/Reject.", "Bản ghi LeaveRequest (pending/approved/rejected), thông báo kết quả, cập nhật vào thống kê chuyên cần."),
    ("Tính lương & Báo cáo KPI", "Tháng, năm, nhân viên, phụ cấp, tăng ca, khấu trừ, ghi chú duyệt chi.", "Truy vấn toàn bộ attendances trong tháng -> Đếm tổng ngày công và giờ làm -> Áp dụng công thức chuẩn 26 công -> Quét doanh thu 6 tháng.", "Bảng lương Payroll chi tiết, bảng điều khiển Dashboard Recharts với 4 biểu đồ thống kê trực quan.")
]

SEC_1_4_RULES_TEXT = [
    (
        "Các ràng buộc nghiệp vụ (Business Rules & Constraints) cốt lõi của hệ thống:\n"
        "1. Ràng buộc về thời gian đặt sân: Khách hàng tuyệt đối không được phép chọn ngày đặt sân trong quá khứ so với thời điểm hiện tại. "
        "Khoảng thời gian chơi (từ startTime đến endTime) phải có độ dài tối thiểu 60 phút và phải nằm trọn trong khung giờ mở cửa của sân "
        "(từ openingTime đến closingTime).\n"
        "2. Ràng buộc chống trùng lịch tuyệt đối: Tại một sân thể thao cụ thể vào một ngày nhất định, không bao giờ được phép tồn tại hai đơn đặt sân "
        "có trạng thái hợp lệ ('pending', 'confirmed', 'completed') bị trùng lặp hoặc giao thoa về mặt thời gian. Điều kiện giao thoa được định nghĩa "
        "bằng biểu thức logic: max(startTime_mới, startTime_cũ) < min(endTime_mới, endTime_cũ). Bất kỳ yêu cầu đặt sân nào vi phạm điều kiện này "
        "đều bị hệ thống từ chối ngay lập tức với mã lỗi HTTP 409 Conflict.\n"
        "3. Ràng buộc đánh giá chất lượng (Review): Khách hàng chỉ được phép gửi đánh giá và chấm điểm sao (từ 1 đến 5 sao) đối với các đơn đặt sân "
        "đã chuyển sang trạng thái hoàn thành ('completed'). Mỗi đơn đặt sân hoàn thành chỉ được phép tạo duy nhất 01 đánh giá.\n"
        "4. Ràng buộc phân ca trực: Một nhân viên chỉ được phân công tối đa 01 ca làm việc tại một thời điểm; không được phép phân trùng hai ca trực "
        "có khung giờ giao thoa nhau trong cùng một ngày cho cùng một nhân sự.\n"
        "5. Ràng buộc chấm công vào/ra: Nhân viên không được phép bấm Check-in hai lần trong cùng một ca trực; không được phép bấm Check-out khi chưa có "
        "bản ghi Check-in trước đó; và không được phép bấm Check-out hai lần. Nếu giờ Check-in vượt quá giờ bắt đầu ca cộng với thời gian ân hạn trễ "
        "(startTime + gracePeriod), hệ thống sẽ tự động gán trạng thái 'late' (Đi muộn).\n"
        "6. Ràng buộc kiểm toán Audit Log bắt buộc: Mọi thao tác sửa đổi giờ Check-in, giờ Check-out hoặc thay đổi trạng thái bản ghi chấm công của "
        "nhân viên do Admin hoặc Manager thực hiện đều BẮT BUỘC phải điền trường lý do can thiệp (reason). Hệ thống sẽ tự động ghi vết toàn bộ giá trị cũ "
        "(oldValue), giá trị mới (newValue), người thực hiện (performedBy) và thời gian vào collection attendance_logs. Dữ liệu bảng này là bất biến, "
        "không cung cấp bất kỳ API nào để cập nhật hay xóa bỏ.\n"
        "7. Ràng buộc tính lương chuẩn: Bảng lương tháng được tính toán dựa trên ngày công chuẩn 26 ngày/tháng theo quy định của Bộ luật Lao động Việt Nam: "
        "workPay = round((baseSalary / 26) * totalWorkDays). Tổng lương thực nhận = max(0, workPay + allowance + overtimePay - deduction). "
        "Bảng lương phải trải qua các trạng thái tuần tự: Bản nháp ('draft') -> Đã duyệt ('approved') -> Đã chi trả ('paid')."
    ),
    (
        "Các ràng buộc kỹ thuật và an toàn thông tin (Technical & Security Constraints):\n"
        "• Ràng buộc mã hóa: Mật khẩu của tất cả người dùng trong hệ thống bắt buộc phải được băm một chiều bằng thuật toán bcrypt với hệ số muối "
        "saltRounds = 10 trước khi lưu trữ vào cơ sở dữ liệu. Mật khẩu gốc không bao giờ được phép xuất hiện trong log hoặc phản hồi API.\n"
        "• Ràng buộc xác thực phiên: Toàn bộ các API được bảo vệ (Private Endpoints) bắt buộc phải kiểm tra chữ ký số của JWT Bearer Token trong "
        "HTTP Request Header 'Authorization'. Token có thời hạn tối đa 7 ngày và được ký bởi khóa bí mật an toàn.\n"
        "• Ràng buộc phân quyền RBAC: Mọi Endpoint đều phải đi qua middleware authorizeRole để đối chiếu vai trò người dùng trong Token với danh sách "
        "các Role được phép truy cập. Mọi hành vi truy cập trái quyền đều bị chặn bằng mã lỗi HTTP 403 Forbidden.\n"
        "• Ràng buộc chống tấn công DoS và Brute-force: Áp dụng Express Rate Limit giới hạn tối đa 100 requests trong vòng 15 phút từ cùng một địa chỉ IP."
    )
]

# 1.5 Cơ sở lý thuyết, công nghệ và công cụ sử dụng
SEC_1_5_TITLE = "1.5. Cơ sở lý thuyết, công nghệ và công cụ sử dụng"
SEC_1_5_CONTENT = [
    (
        "Đề tài được xây dựng dựa trên nền tảng lý thuyết vững chắc về kiến trúc phần mềm, khoa học dữ liệu và các công nghệ "
        "phát triển web hiện đại chuẩn công nghiệp. Việc lựa chọn công nghệ được cân nhắc kỹ lưỡng dựa trên tính phù hợp với bài toán, "
        "hiệu năng xử lý, khả năng mở rộng và mức độ hỗ trợ mạnh mẽ của cộng đồng mã nguồn mở quốc tế."
    ),
    (
        "1. Cơ sở lý thuyết về Kiến trúc phần mềm phân tầng (Layered Architecture):\n"
        "Kiến trúc phân tầng là mô hình kiến trúc tiêu chuẩn trong kỹ nghệ phần mềm doanh nghiệp, phân chia hệ thống thành các tầng logic "
        "riêng biệt với các trách nhiệm độc lập: Tầng Trình diễn (Presentation Layer), Tầng Điều khiển và Định tuyến (Controller Layer), "
        "Tầng Nghiệp vụ cốt lõi (Service Layer), Tầng Truy xuất dữ liệu (Data Access Layer) và Tầng Cơ sở dữ liệu (Database Layer). "
        "Nguyên tắc cốt lõi của kiến trúc này là các tầng chỉ giao tiếp với tầng liền kề phía dưới thông qua các giao diện chuẩn hóa (Interfaces), "
        "giúp mã nguồn có tính kết nối lỏng (Loose Coupling), tính gắn kết cao (High Cohesion) và cực kỳ thuận lợi cho việc viết kịch bản "
        "kiểm thử đơn vị (Unit Tests) cũng như kiểm thử tích hợp (Integration Tests)."
    ),
    (
        "2. Cơ sở lý thuyết về Giao diện lập trình ứng dụng RESTful API:\n"
        "REST (Representational State Transfer) là kiểu kiến trúc phần mềm do Roy Fielding đề xuất trong luận án tiến sĩ năm 2000. "
        "REST định nghĩa một tập hợp các ràng buộc cho việc xây dựng các hệ thống dịch vụ web phân tán, bao gồm: Client-Server tách biệt, "
        "giao tiếp phi trạng thái (Stateless), có khả năng lưu đệm (Cacheable), giao diện đồng nhất (Uniform Interface) và hệ thống phân lớp "
        "(Layered System). Trong đồ án SportBooking, RESTful API sử dụng các phương thức chuẩn của giao thức HTTP (GET, POST, PUT, PATCH, DELETE) "
        "để thực hiện các thao tác trên tài nguyên (Resources) như Courts, Bookings, Attendances, Payrolls, với định dạng dữ liệu truyền tải chuẩn JSON."
    ),
    (
        "3. Cơ sở lý thuyết về Xác thực không trạng thái (Stateless Authentication) với JSON Web Token (JWT):\n"
        "JWT (RFC 7519) là chuẩn mở định nghĩa phương thức an toàn và độc lập để truyền tải thông tin giữa các bên dưới dạng đối tượng JSON. "
        "Cấu trúc của một chuỗi JWT gồm 3 phần phân cách bởi dấu chấm: Header (thuật toán mã hóa), Payload (dữ liệu định danh người dùng: userId, "
        "role, email, exp) và Signature (chữ ký số được tạo từ Header, Payload và khóa bí mật SECRET_KEY). Cơ chế xác thực này không yêu cầu máy chủ "
        "phải lưu trữ phiên làm việc trong bộ nhớ (Session Storage), giúp hệ thống dễ dàng mở rộng theo chiều ngang (Horizontal Scaling) "
        "và hoạt động hoàn hảo với kiến trúc SPA."
    )
]

TABLE_1_4_CAPTION = "Bảng 1.4: Bảng tổng hợp công nghệ sử dụng và vai trò kỹ thuật trong hệ thống"
TABLE_1_4_HEADERS = ["Tầng kiến trúc", "Công nghệ / Thư viện", "Phiên bản", "Vai trò và lý do lựa chọn trong đồ án"]
TABLE_1_4_ROWS = [
    ("Frontend Core", "React", "18.3.1", "Thư viện UI dựa trên Component; cơ chế Virtual DOM tối ưu render; kiến trúc hook hiện đại."),
    ("Frontend Language", "TypeScript", "5.7.3", "Ngôn ngữ định kiểu tĩnh; ngăn ngừa 80% lỗi runtime; tăng cường khả năng tự sinh tài liệu mã nguồn."),
    ("Build Tool", "Vite", "6.0.7", "Công cụ đóng gói module thế hệ mới; tốc độ khởi động và Hot Module Replacement (HMR) tính bằng mili-giây."),
    ("CSS Framework", "Tailwind CSS", "3.4.17", "Framework CSS Utility-First; xây dựng giao diện thể thao responsive siêu nhanh, tối ưu dung lượng CSS."),
    ("Client Routing", "React Router", "7.1.3", "Điều hướng trang đơn SPA; hỗ trợ bảo vệ route phân tầng (ProtectedRoute) theo ma trận RBAC."),
    ("HTTP Client", "Axios", "1.7.9", "Thư viện gọi API bất đồng bộ; Interceptor tự động gắn Bearer Token và bắt lỗi tập trung."),
    ("Chart Visualization", "Recharts", "2.15.0", "Thư viện biểu đồ trực quan hóa dữ liệu Dashboard (Area, Line, Bar, Pie charts) tương tác cao."),
    ("Icon Package", "Lucide React", "0.473.0", "Bộ icon vector thể thao và quản trị hiện đại, dung lượng nhẹ, đồng bộ giao diện."),
    ("Backend Runtime", "Node.js", "v20+ LTS", "Môi trường thực thi JavaScript bất đồng bộ hướng sự kiện (Non-blocking I/O); hiệu năng xử lý cao."),
    ("Web Framework", "Express.js", "4.21.2", "Framework web tối giản, linh hoạt hàng đầu; hệ sinh thái middleware phong phú, độ ổn định tuyệt đối."),
    ("Backend Language", "TypeScript", "5.7.3", "Đồng bộ hóa kiểu dữ liệu từ Backend sang Frontend; an toàn kiểu toàn diện từ DTO đến Entity."),
    ("Database Engine", "MongoDB", "7.0+", "Hệ quản trị CSDL NoSQL hướng tài liệu (BSON); lưu trữ linh hoạt, hỗ trợ Compound Indexing mạnh mẽ."),
    ("Object Data Modeling", "Mongoose", "8.9.5", "Thư viện ODM cho MongoDB; quản lý Schema, Validation, Indexes và quan hệ thực thể chặt chẽ."),
    ("Data Validation", "Zod", "3.24.1", "Thư viện khai báo và kiểm tra tính hợp lệ dữ liệu đầu vào tại tầng Route trước khi vào Controller."),
    ("Password Hashing", "bcryptjs", "2.4.3", "Thuật toán băm mật khẩu một chiều an toàn với muối ngẫu nhiên (salt 10 rounds)."),
    ("Token Signing", "jsonwebtoken", "9.0.2", "Thư viện ký và giải mã JWT Token phục vụ xác thực không trạng thái stateless."),
    ("Web Security", "Helmet & CORS", "8.0.0 & 2.8.5", "Thiết lập các HTTP security headers và kiểm soát chia sẻ tài nguyên nguồn gốc chéo."),
    ("Rate Limiting", "express-rate-limit", "7.5.0", "Giới hạn tần suất request từ mỗi IP; phòng chống brute-force mật khẩu và DoS."),
    ("QR Code Generator", "qrcode", "1.5.4", "Sinh mã QR Token dạng DataURL phục vụ quy trình xác thực vị trí có mặt tại sân của nhân viên."),
    ("Testing Framework", "Jest & Supertest", "29.7.0 & 7.0.0", "Bộ khung kiểm thử tích hợp tự động cho API; kiểm tra xác thực, chống trùng lịch và Audit Log.")
]
