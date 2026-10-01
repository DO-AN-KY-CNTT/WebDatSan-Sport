# -*- coding: utf-8 -*-
"""
Chương Mở Đầu cho Báo Cáo Đồ Án SportBooking.
Bao gồm bối cảnh, tính cấp thiết, mục đích, ý nghĩa và phương pháp nghiên cứu.
"""

INTRO_TITLE = "MỞ ĐẦU"

INTRO_PARAGRAPHS = [
    (
        "Trong bối cảnh cuộc Cách mạng Công nghiệp lần thứ tư (Cách mạng Công nghiệp 4.0) đang diễn ra mạnh mẽ "
        "trên quy mô toàn cầu, việc ứng dụng công nghệ thông tin và chuyển đổi số đã trở thành xu thế tất yếu "
        "đối với mọi ngành nghề, lĩnh vực trong đời sống kinh tế – xã hội. Lĩnh vực thể dục thể thao và chăm sóc "
        "sức khỏe cộng đồng cũng không nằm ngoài quỹ đạo phát triển đó. Tại Việt Nam, đặc biệt là ở các đô thị "
        "lớn như Hà Nội, Thành phố Hồ Chí Minh, Đà Nẵng, Hải Phòng, Cần Thơ, mức sống của người dân ngày càng "
        "được nâng cao, kéo theo nhu cầu rèn luyện thể chất, giải trí lành mạnh sau giờ làm việc và học tập gia tăng "
        "vượt bậc. Các môn thể thao có tính đối kháng, rèn luyện phản xạ và gắn kết tinh thần đồng đội như bóng đá mini "
        "(sân cỏ nhân tạo 5 người, 7 người), cầu lông, tennis, bóng rổ, bóng chuyền và đặc biệt là môn thể thao mới nổi "
        "pickleball đang thu hút hàng triệu người tham gia mỗi ngày."
    ),
    (
        "Tuy nhiên, sự bùng nổ mạnh mẽ về nhu cầu của người chơi thể thao lại đang đặt ra một thách thức vô cùng lớn "
        "đối với công tác quản lý và vận hành của các trung tâm, câu lạc bộ và cụm sân bãi. Phần lớn các cơ sở kinh doanh "
        "sân thể thao hiện nay vẫn đang duy trì phương thức quản trị truyền thống, mang tính thủ công và phân tán. "
        "Việc đặt sân chủ yếu diễn ra thông qua các cuộc gọi điện thoại trực tiếp, tin nhắn qua mạng xã hội (Zalo, Facebook) "
        "hoặc trao đổi miệng, sau đó nhân viên quản lý sẽ ghi chép thủ công vào sổ tay hoặc nhập vào các bảng tính Excel "
        "đơn giản. Quy trình này bộc lộ rất nhiều hạn chế nghiêm trọng: thông tin lịch sân không được cập nhật theo thời gian "
        "thực; khách hàng không thể chủ động tra cứu các khung giờ còn trống; và nguy cơ lớn nhất là hiện tượng xung đột lịch "
        "(Booking Collision) – tức là hai hoặc nhiều khách hàng cùng được xác nhận đặt một sân trong cùng một khung giờ. "
        "Khi sự cố này xảy ra, nó không chỉ gây ức chế, phiền toái cho khách hàng mà còn làm suy giảm uy tín thương hiệu "
        "và tổn thất trực tiếp đến doanh thu của cơ sở thể thao."
    ),
    (
        "Bên cạnh nghiệp vụ đặt sân dành cho khách hàng, công tác quản trị nội bộ đối với đội ngũ nhân sự vận hành tại "
        "các sân bãi cũng gặp vô vàn bất cập. Các cụm sân thể thao thường hoạt động liên tục từ 06 giờ sáng đến 23 giờ đêm, "
        "chia thành nhiều ca trực phức tạp. Việc phân công lịch làm việc cho nhân viên, theo dõi chấm công vào/ra (Check-in/Check-out), "
        "kiểm soát tình trạng đi muộn về sớm, phê duyệt đơn xin nghỉ phép và tổng hợp ngày công thực tế để tính bảng lương "
        "hàng tháng tiêu tốn rất nhiều thời gian và công sức của bộ phận quản lý. Việc thiếu vắng một công cụ giám sát minh bạch, "
        "có cơ chế lưu vết kiểm toán (Audit Log) dễ dẫn đến tình trạng gian lận giờ làm việc, sai sót trong tính toán tiền lương "
        "và gây mất đoàn kết trong nội bộ nhân viên."
    ),
    (
        "Xuất phát từ những đòi hỏi bức thiết của thực tiễn nêu trên, đề tài \"Xây dựng Hệ thống Quản lý và Đặt sân Thể thao "
        "Trực tuyến Toàn diện (SportBooking)\" đã được lựa chọn và triển khai thực hiện. Đồ án hướng tới mục tiêu nghiên cứu, "
        "phân tích, thiết kế và hiện thực hóa một nền tảng phần mềm ứng dụng Web hoàn chỉnh, hiện đại, kết hợp chặt chẽ giữa "
        "cổng giao dịch trực tuyến dành cho khách hàng và phân hệ quản trị doanh nghiệp chuyên nghiệp (mini-ERP) dành cho "
        "nhân viên, quản lý và chủ cơ sở thể thao."
    ),
    (
        "Về ý nghĩa khoa học, đề tài là cơ hội quý báu để vận dụng tổng hợp và chuyên sâu các kiến thức nền tảng và nâng cao "
        "của chuyên ngành Công nghệ Thông tin: từ quy trình phân tích và đặc tả yêu cầu phần mềm theo chuẩn công nghiệp; "
        "nguyên lý thiết kế kiến trúc phần mềm phân tầng (Layered Architecture); mô hình hóa dữ liệu NoSQL với MongoDB; "
        "xây dựng hệ thống giao diện lập trình ứng dụng RESTful API bảo mật cao; áp dụng thuật toán kiểm tra giao thoa khoảng thời gian "
        "(Interval Overlap Algorithm) để giải quyết triệt để bài toán chống trùng lịch; cho đến việc triển khai giao diện người dùng "
        "hiện đại, trực quan, đáp ứng đa nền tảng (Responsive Web Design) dựa trên hệ sinh thái React và TypeScript."
    ),
    (
        "Về ý nghĩa thực tiễn, sản phẩm của đề tài mang lại giá trị ứng dụng to lớn và khả năng thương mại hóa cao. Đối với "
        "người chơi thể thao, hệ thống mang đến trải nghiệm đặt sân nhanh chóng, minh bạch chỉ qua vài cú nhấp chuột, cung cấp "
        "vé điện tử mã QR tiện lợi. Đối với đơn vị vận hành, SportBooking là giải pháp số hóa toàn diện giúp tối ưu hóa công suất "
        "khai thác sân bãi, tự động hóa quy trình chấm công - tính lương, loại bỏ hoàn toàn sai sót do con người, đồng thời cung cấp "
        "hệ thống báo cáo thống kê trực quan (Recharts Analytics) hỗ trợ đắc lực cho ban giám đốc trong việc ra quyết định kinh doanh."
    ),
    (
        "Bố cục của quyển Báo cáo Đồ án tốt nghiệp được tổ chức thành 3 chương chính cùng các phần bổ trợ, tuân thủ chặt chẽ "
        "quy cách học thuật chuẩn:\n"
        "• Mở đầu: Trình bày bối cảnh thực tiễn, tính cấp thiết, mục đích nghiên cứu, ý nghĩa khoa học, giá trị thực tiễn và cấu trúc báo cáo.\n"
        "• Chương 1 - Tổng quan đề tài và cơ sở thực hiện: Phân tích bài toán thực tế, xác định mục tiêu, đối tượng sử dụng, phạm vi, "
        "giới hạn, dữ liệu vào/ra, các ràng buộc và khảo sát toàn diện cơ sở lý thuyết, công nghệ, công cụ được áp dụng trong đề tài.\n"
        "• Chương 2 - Phân tích và thiết kế giải pháp: Trình bày kết quả phân tích yêu cầu chức năng/phi chức năng, hệ thống biểu đồ Use Case, "
        "luồng hoạt động và tuần tự, thiết kế kiến trúc phân tầng, thiết kế chi tiết cơ sở dữ liệu MongoDB 12 collections, đặc tả RESTful API "
        "và thiết kế giao diện UI/UX trực quan.\n"
        "• Chương 3 - Xây dựng sản phẩm, kiểm thử và đánh giá: Báo cáo quá trình hiện thực hóa mã nguồn, môi trường triển khai, các chức năng "
        "cốt lõi, kịch bản kiểm thử tự động (Test Cases), các giải pháp cải tiến kỹ thuật đột phá, quá trình tự học phát triển bản thân, "
        "đối chiếu kết quả đạt được so với mục tiêu và thẳng thắn chỉ ra các mặt hạn chế còn tồn tại.\n"
        "• Kết luận: Tổng kết các kết quả đạt được của đồ án và đề xuất hướng phát triển mở rộng trong tương lai.\n"
        "• Tài liệu tham khảo và Phụ lục: Danh mục các nguồn tài liệu học thuật trích dẫn và hướng dẫn triển khai hệ thống."
    )
]
