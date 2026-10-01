<<<<<<< HEAD
# SportBooking - Hệ Thống Quản Lý & Đặt Sân Thể Thao Toàn Diện

> **Dự án MERN Stack chuyên nghiệp (Node.js, Express, React, TypeScript, Vite, Tailwind CSS, MongoDB & Mongoose)** phục vụ quản lý và vận hành trung tâm thể thao đa năng dành cho Khách hàng, Nhân viên (Staff), Quản lý (Manager) và Quản trị viên (Admin).

---

## 1. Giới thiệu

**SportBooking** giải quyết trọn vẹn bài toán vận hành của các trung tâm và chuỗi sân thể thao hiện đại:
- **Dành cho Khách hàng**: Trải nghiệm tìm kiếm, tra cứu sân theo môn thể thao, vị trí quận huyện, mức giá; kiểm tra lịch trống theo thời gian thực và đặt sân tự động chống trùng lịch 100%, xuất vé QR điện tử và đánh giá chất lượng sân.
- **Dành cho Nhân viên**: Xem lịch làm việc theo ca, theo dõi sân trực, thực hiện chấm công vào/ra trực quan kèm đồng hồ thời gian thực, quét mã QR sân để xác thực có mặt và gửi đơn xin nghỉ phép.
- **Dành cho Quản lý & Admin**: Phân ca làm việc chống trùng lịch nhân sự, kiểm soát bảng chấm công (có Audit Log lưu vết khi can thiệp chỉnh sửa), phê duyệt nghỉ phép, tính bảng lương theo ngày công và giờ làm thực tế, theo dõi biểu đồ tăng trưởng doanh thu và phân bố môn thể thao thông qua Recharts.

---

## 2. Tính năng Hệ thống

### Phân hệ Khách hàng (Customer)
- **Đăng ký / Đăng nhập**: Xác thực qua JWT, mật khẩu mã hóa bcrypt 10 vòng.
- **Tìm kiếm sân thông minh**: Lọc theo môn thể thao (Bóng đá, Cầu lông, Tennis, Pickleball, Bóng rổ, Bóng chuyền), khu vực, khoảng giá và các tiện ích (Wifi, phòng tắm, đèn LED, điều hòa).
- **Xem chi tiết & Lịch sân theo ngày**: Giao diện chọn ngày và hiển thị trực quan các khung giờ trống (màu xanh/trắng), đã có người đặt (màu đỏ - disabled) hoặc đang chọn.
- **Đặt sân chống trùng lịch Backend**: Thuật toán chặn trùng lịch triệt để ở tầng Service, ngăn chặn tình trạng 2 người đặt trùng cùng sân và khung giờ.
- **Quản lý Booking cá nhân**: Xem danh sách vé đã đặt, lọc theo trạng thái (Sắp tới, Hoàn thành, Đã hủy), hiển thị mã vé QR điện tử.
- **Hủy đặt sân**: Tự động hoàn tiền mô phỏng khi hủy đơn hợp lệ kèm lý do.
- **Đánh giá & Xếp hạng (Review)**: Chỉ cho phép gửi nhận xét và chấm sao 1-5 đối với các booking đã hoàn thành (`completed`).

### Phân hệ Nhân sự & Chấm công (Staff / Manager)
- **Hồ sơ nhân viên**: Quản lý mã nhân viên (NVxxx), thông tin cá nhân, phòng ban, vị trí, lương cơ bản và liên kết tài khoản đăng nhập.
- **Quản lý Ca làm việc (Shifts)**: Cấu hình giờ bắt đầu, giờ kết thúc, giờ nghỉ giữa ca và thời gian ân hạn trễ (`gracePeriod` tính bằng phút).
- **Phân lịch ca trực (Work Schedules)**: Phân công nhân viên theo ngày và sân phụ trách; kiểm soát unique không phân trùng ca cùng ngày cho một nhân viên.
- **Chấm công Vào/Ra (Attendance)**:
  - Nút bấm to đẹp, trực quan, hỗ trợ đồng hồ điện tử chạy thời gian thực.
  - Tự động phát hiện đi muộn nếu check-in sau `startTime + gracePeriod`.
  - Kiểm tra điều kiện: không được check-in 2 lần, không được check-out khi chưa check-in, không được check-out 2 lần.
  - Tự động tính tổng giờ làm thực tế (`workHours`) trừ đi thời gian nghỉ giữa ca.
- **Chấm công bằng QR Code**: Quản lý có thể tạo mã QR động cho từng sân; nhân viên quét hoặc nhập token để xác nhận có mặt trực tiếp tại sân.
- **Audit Log Kiểm toán Chấm công**: Mọi thao tác chỉnh sửa giờ check-in, check-out hoặc trạng thái của Admin/Manager đều bắt buộc nhập lý do và được lưu vào bảng `attendance_logs`.
- **Đơn xin nghỉ phép (Leave Requests)**: Tạo đơn (nghỉ phép năm, ốm đau, việc riêng, không lương), quản lý xét duyệt hoặc từ chối kèm phản hồi.

### Phân hệ Quản trị & Báo cáo (Admin / Manager)
- **Bảng điều khiển Admin (Dashboard)**: Thống kê số liệu KPI tổng quan và 4 biểu đồ Recharts:
  - Doanh thu 6 tháng gần nhất (Area Chart).
  - Lượng booking theo tháng (Line Chart).
  - Phân bố đặt sân theo môn thể thao (Bar Chart).
  - Phân bố nhân sự theo bộ phận (Pie Chart).
- **Quản lý Bảng lương (Payrolls)**: Tự động tính toán lương tháng dựa trên số ngày công thực tế từ bảng chấm công, phụ cấp, tăng ca và các khoản khấu trừ.

---

## 3. Kiến trúc Hệ thống

Hệ thống áp dụng mô hình phân lớp chuẩn công nghiệp (Layered Architecture):

```text
Frontend (React + Vite + Tailwind + TypeScript)
       │
       │  REST API (JSON / Bearer Token)
       ▼
Routes (Định tuyến API)
  └── Middleware (CORS, Helmet, RateLimit, Auth JWT, Phân quyền RBAC, Zod Validate)
        └── Controller (Tiếp nhận request, gọi Service, trả response chuẩn)
              └── Service (Nghiệp vụ cốt lõi, chống trùng lịch, tính công, audit)
                    └── Model (Mongoose ODM, Schema, Index, Hook)
                          └── MongoDB (12 Collections)
```

---

## 4. Công nghệ Sử dụng

### Frontend
- **React 18** & **TypeScript**
- **Vite 6**: Công cụ đóng gói siêu tốc
- **Tailwind CSS 3**: Giao diện thể thao năng động, chuẩn responsive (Desktop, Tablet, Mobile)
- **React Router 7**: Điều hướng trang & bảo vệ route theo vai trò (RBAC)
- **Axios**: HTTP client với Interceptor tự động gắn JWT Bearer token
- **Lucide React**: Bộ icon thể thao & giao diện hiện đại
- **Recharts**: Biểu đồ thống kê trực quan cho Admin
- **Zod**: Xác thực dữ liệu form

### Backend
- **Node.js (v20+)** & **Express.js**
- **TypeScript**: Đảm bảo an toàn kiểu dữ liệu toàn hệ thống
- **MongoDB** & **Mongoose ODM**: Cơ sở dữ liệu NoSQL hiệu năng cao
- **JWT (JSON Web Token)**: Xác thực phiên đăng nhập không trạng thái (stateless)
- **bcryptjs**: Mã hóa mật khẩu an toàn
- **Helmet** & **CORS**: Bảo mật HTTP headers
- **QRCode**: Sinh mã QR xác thực chấm công động
- **Jest** & **Supertest**: Kiểm thử tích hợp tự động

---

## 5. Cấu trúc Thư mục

```text
sport-booking/
├── frontend/                     # Phân hệ giao diện React
│   ├── public/
│   ├── src/
│   │   ├── components/           # Components dùng chung & Layout
│   │   │   ├── common/           # Toast, Modal...
│   │   │   └── layout/           # ProtectedRoute...
│   │   ├── contexts/             # AuthContext...
│   │   ├── layouts/              # CustomerLayout, AdminLayout
│   │   ├── pages/
│   │   │   ├── auth/             # LoginPage, RegisterPage
│   │   │   ├── customer/         # HomePage, SearchCourtsPage, CourtDetailPage, MyBookingsPage, ProfilePage
│   │   │   ├── employee/         # StaffDashboardPage, StaffAttendancePage, StaffSchedulePage, StaffLeavePage
│   │   │   └── admin/            # AdminDashboardPage, ManagerDashboardPage, AdminCourtsPage, AdminBookingsPage,
│   │   │                         # AdminEmployeesPage, AdminShiftsPage, AdminSchedulesPage, AdminAttendancePage,
│   │   │                         # AdminLeavesPage, AdminPayrollsPage, AdminReviewsPage
│   │   ├── services/             # Axios API client
│   │   ├── types/                # TypeScript Interfaces & Enums
│   │   ├── App.tsx               # Cấu hình routes
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/                      # Phân hệ máy chủ API Node.js
│   ├── src/
│   │   ├── config/               # db.ts, env.ts
│   │   ├── controllers/          # auth, court, booking, review, employee, shift, schedule, attendance, leave, payroll, report
│   │   ├── middleware/           # auth.ts (JWT & RBAC), validate.ts, errorHandler.ts
│   │   ├── models/               # 12 Mongoose Models (User, Court, Booking, Review, Employee, Shift, WorkSchedule, Attendance, AttendanceLog, LeaveRequest, Payroll, QrToken)
│   │   ├── routes/               # Express Routers
│   │   ├── services/             # Business Logic & Algorithms
│   │   ├── types/                # System enums & types
│   │   ├── utils/                # jwt.ts, response.ts
│   │   ├── validators/           # Zod Validation Schemas
│   │   └── server.ts             # Express App entry point
│   ├── scripts/
│   │   └── seed.ts               # Script nạp dữ liệu mẫu phong phú tiếng Việt
│   ├── tests/                    # Automated integration tests (Jest + Supertest)
│   │   ├── auth.test.ts
│   │   ├── booking.test.ts
│   │   └── attendance.test.ts
│   ├── jest.config.js
│   ├── package.json
│   └── tsconfig.json
│
├── package.json                  # Root Monorepo configuration
├── .gitignore
└── README.md
```

---

## 6. Những Thứ Cần Cài Đặt Trên Máy Mới (Prerequisites)

Nếu bạn mang mã nguồn dự án sang một máy tính khác **đã có sẵn MongoDB**, dưới đây là danh sách những thứ cần có và cách kiểm tra:

### 📋 Bảng Checklist Kiểm Tra Môi Trường

| Phần mềm | Yêu cầu phiên bản | Mục đích | Cách kiểm tra / Link cài đặt |
| :--- | :--- | :--- | :--- |
| **Node.js** *(Bắt buộc)* | **v18.0.0+** *(Khuyên dùng v20+ LTS hoặc v22+)* | Môi trường thực thi JavaScript cho Backend & build Frontend | Chạy `node -v`<br/>Tải tại: [https://nodejs.org/](https://nodejs.org/) *(Chọn bản LTS)* |
| **npm** *(Đi kèm Node.js)* | **v9.0.0+** *(Khuyên dùng v10+)* | Trình quản lý gói cài đặt thư viện | Chạy `npm -v` |
| **Git** *(Khuyên dùng)* | Bản mới nhất | Để clone hoặc quản lý mã nguồn | Chạy `git --version`<br/>Tải tại: [https://git-scm.com/](https://git-scm.com/) |
| **MongoDB Service** *(Máy bạn đã có)* | **v6.0+** hoặc **v7.0+** | Cơ sở dữ liệu NoSQL lưu trữ dữ liệu SportBooking | Cổng mặc định: `27017`<br/>*Xem cách kiểm tra bên dưới* |
| **MongoDB Compass** *(Tùy chọn)* | Bản mới nhất | Giao diện đồ họa xem trực quan 12 collections và dữ liệu | Tải tại: [MongoDB Compass](https://www.mongodb.com/products/tools/compass) |
| **Trình duyệt Web** | Chrome, Edge, Firefox, Brave | Truy cập ứng dụng & giao diện quản trị | Hỗ trợ ES6+ & Tailwind |

---

### 🔍 Cách kiểm tra MongoDB trên máy mới đã sẵn sàng chưa

Dù máy mới đã cài MongoDB, bạn cần đảm bảo **dịch vụ MongoDB đang thực sự chạy (Running)**:

1. **Trên Windows**:
   - Nhấn phím `Windows + R`, gõ `services.msc` và nhấn `Enter`.
   - Tìm dịch vụ có tên **`MongoDB Server (MongoDB)`**.
   - Kiểm tra cột **Status** có hiển thị **`Running`** hay không. Nếu chưa, click chuột phải chọn **`Start`**.
   - *Hoặc mở Command Prompt / PowerShell (Run as Administrator) và chạy:*
     ```bash
     net start MongoDB
     ```
2. **Trên macOS / Linux**:
   ```bash
   # Linux (systemd)
   sudo systemctl status mongod
   sudo systemctl start mongod

   # macOS (Homebrew)
   brew services list
   brew services start mongodb-community
   ```
3. **Kiểm tra kết nối bằng dòng lệnh**:
   Mở terminal gõ:
   ```bash
   mongosh
   # Hoặc với bản cũ hơn:
   mongo
   ```
   Nếu hiển thị dấu nhắc lệnh `test>` hoặc `>` là MongoDB đã hoạt động tốt tại `mongodb://localhost:27017`.

---

## 7. Hướng Dẫn Cài Đặt & Chạy Từng Bước Trên Máy Mới

### Bước 1: Sao chép / Clone mã nguồn về máy mới

Nếu dùng Git:
```bash
git clone <URL_REPOSITORY>
cd sport-booking
```
*(Nếu copy thư mục qua USB/Google Drive, hãy mở terminal tại thư mục gốc `sport-booking`).*

---

### Bước 2: Cài đặt Dependencies (Thư viện phụ thuộc)

Dự án gồm 2 phần độc lập: **Backend** (Node.js/Express) và **Frontend** (React/Vite). Bạn cần cài đặt thư viện cho cả hai:

#### Cách 1: Cài đặt tuần tự từng thư mục (Khuyên dùng)
```bash
# 1. Cài đặt thư viện cho Backend
cd backend
npm install

# 2. Cài đặt thư viện cho Frontend
cd ../frontend
npm install

# 3. Quay lại thư mục gốc
cd ..
```

#### Cách 2: Cài đặt từ thư mục gốc
```bash
# Đứng tại thư mục gốc sport-booking:
cd backend && npm install && cd ../frontend && npm install && cd ..
```

---

### Bước 3: Thiết lập file cấu hình môi trường (`.env`)

>  **LƯU Ý QUAN TRỌNG**: File `.env` thường nằm trong danh sách `.gitignore` nên khi copy hoặc clone sang máy mới có thể sẽ chưa có. Hãy kiểm tra và tạo file `.env` theo mẫu:

#### 1. Cấu hình Backend (`backend/.env`):
Kiểm tra xem file `backend/.env` đã có chưa. Nếu chưa có, copy từ `backend/.env.example` hoặc tạo mới file `backend/.env` với nội dung sau:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sport_booking
JWT_SECRET=super_secret_sportbooking_jwt_key_2026
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
*(Nếu MongoDB của bạn dùng port khác hoặc có username/password, hãy điều chỉnh `MONGODB_URI` tương ứng, ví dụ: `mongodb://admin:123456@localhost:27017/sport_booking?authSource=admin`)*.

#### 2. Cấu hình Frontend (`frontend/.env`):
Kiểm tra xem file `frontend/.env` đã có chưa. Nếu chưa có, tạo mới file `frontend/.env` với nội dung:
```env
VITE_API_URL=http://localhost:5000/api
```

---

### Bước 4: Khởi tạo Cơ sở Dữ liệu mẫu (Seed Database)

Vì đây là máy mới, cơ sở dữ liệu MongoDB hiện đang hoàn toàn trống. Bạn cần chạy lệnh seed để tự động tạo database `sport_booking` và nạp sẵn toàn bộ tài khoản, sân bóng, ca làm, bảng giá...

Tại terminal:
```bash
cd backend
npm run seed
```
*(Hoặc từ thư mục gốc: `npm run seed`)*

Console sẽ báo nạp thành công:
```text
Database connected: localhost
Cleaning existing database collections...
Database cleaned successfully.
Created 18 users (1 Admin, 2 Managers, 5 Staff, 10 Customers)
Created 20 courts across 6 sports
Created 5 standard shifts & 20 work schedules
Created sample attendances with QR verification & audit logs
Created leave requests, bookings, reviews & payroll records
=========================================
DATABASE SEEDING COMPLETED SUCCESSFULLY!
=========================================
```

---

### Bước 5: Khởi chạy Ứng dụng

Mở **2 cửa sổ Terminal** riêng biệt:

#### 🟢 Terminal 1: Chạy Backend Server (Port 5000)
```bash
cd backend
npm run dev
```
*Server chạy tại: `http://localhost:5000` (Kiểm tra sức khỏe: `http://localhost:5000/api/health`)*

#### 🔵 Terminal 2: Chạy Frontend Client (Port 5173)
```bash
cd frontend
npm run dev
```
*Frontend chạy tại: `http://localhost:5173`*

> 💡 **Mẹo chạy nhanh từ thư mục gốc**:
> - Terminal 1: `npm run dev:backend`
> - Terminal 2: `npm run dev:frontend`

---

## 8. Tài Khoản Demo Đăng Nhập

Tất cả các tài khoản demo đều dùng chung mật khẩu: **`password123`**

| Vai trò | Email đăng nhập | Mật khẩu | Quyền hạn chính |
|:---|:---|:---:|:---|
| 👑 **Admin** | `admin@sportbooking.com` | `password123` | Quản trị toàn hệ thống, nhân sự, sân, booking, bảng lương, báo cáo Recharts |
| 👨‍💼 **Manager** | `manager@sportbooking.com` | `password123` | Quản lý ca trực, duyệt đơn nghỉ phép, phân ca, giám sát chấm công |
| 🧑‍💼 **Staff** | `staff@sportbooking.com` | `password123` | Xem lịch làm việc, chấm công vào/ra trực quan, quét QR sân, xin nghỉ |
| 👤 **Customer** | `customer@sportbooking.com` | `password123` | Tìm sân, xem lịch trống, đặt sân online, xem vé QR, gửi đánh giá |

*(Trang Đăng nhập `/login` đã tích hợp sẵn **4 nút bấm đăng nhập nhanh 1-Click**, bấm vào là tự động điền tài khoản tương ứng).*

---

## 9. Xử Lý Sự Cố Thường Gặp Trên Máy Mới (Troubleshooting)

### ❌ Lỗi 1: `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`
- **Nguyên nhân**: Dịch vụ MongoDB trên máy mới chưa được bật.
- **Cách sửa**: 
  - Mở `services.msc` $\rightarrow$ Chuột phải vào `MongoDB Server` $\rightarrow$ Chọn **Start**.
  - Hoặc mở cmd/PowerShell quyền Admin gõ: `net start MongoDB`.

### ❌ Lỗi 2: `File ... cannot be loaded because running scripts is disabled on this system` (Lỗi PowerShell Windows)
- **Nguyên nhân**: Windows chặn thực thi script trong PowerShell theo chính sách mặc định.
- **Cách sửa**: Mở PowerShell với quyền Administrator và chạy lệnh:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
  ```
  Nhập `Y` rồi nhấn `Enter`.

### ❌ Lỗi 3: `Error: listen EADDRINUSE: address already in use :::5000` hoặc `:::5173`
- **Nguyên nhân**: Cổng 5000 hoặc 5173 đang bị một ứng dụng khác chiếm giữ.
- **Cách sửa**:
  - Tắt ứng dụng đang dùng cổng đó, hoặc tìm và kill process:
    ```powershell
    # Windows: tìm PID đang dùng port 5000
    netstat -ano | findstr :5000
    taskkill /PID <PID_tim_thay> /F
    ```
  - Hoặc đổi sang cổng khác trong file `backend/.env` (ví dụ `PORT=5001`).

### ❌ Lỗi 4: Đăng nhập báo lỗi tài khoản không tồn tại hoặc trang web không có sân nào
- **Nguyên nhân**: Chưa chạy lệnh nạp dữ liệu mẫu ban đầu vào MongoDB.
- **Cách sửa**: Chạy lệnh `npm run seed` trong thư mục `backend`.

---

## 10. Danh mục Biểu đồ Hệ thống (UML Diagrams)

Dự án cung cấp trọn bộ **20 biểu đồ UML kỹ thuật** (Use Case, Activity, Sequence, Class) cho 5 phân hệ cốt lõi:
- **Xem trực quan & Tải ảnh PNG/SVG**: Mở file [`docs/diagrams.html`](file:///d:/Projects/sport-booking/docs/diagrams.html) trên trình duyệt hoặc truy cập `http://localhost:5173/diagrams.html`.
- **Xem mã nguồn Mermaid & Thiết kế chi tiết**: Xem tại file [`docs/diagrams.html`](file:///d:/Projects/sport-booking/docs/diagrams.html) hoặc artifact tài liệu kiến trúc.

---

## 11. Kiểm thử Tự động (Automated Testing)

Bộ test tích hợp được xây dựng bằng **Jest** và **Supertest**, kiểm thử trực tiếp các logic nghiệp vụ trọng yếu:

```bash
cd backend
npm test
```

Bao gồm:
1. `tests/auth.test.ts`: Đăng ký, đăng nhập JWT, chặn email trùng, phân quyền truy cập.
2. `tests/booking.test.ts`: Đặt sân, **kiểm thử chống trùng lịch (Conflict Overlap)**, hủy đơn.
3. `tests/attendance.test.ts`: Check-in, check-out, chặn check-in nhiều lần, tính toán `workHours`, ghi nhận Audit Log khi Admin can thiệp.

---

## 12. Danh mục REST API

| Module | Method | Endpoint | Quyền hạn | Mô tả |
|:---|:---:|:---|:---:|:---|
| **Auth** | `POST` | `/api/auth/register` | Public | Đăng ký tài khoản khách hàng |
| | `POST` | `/api/auth/login` | Public | Đăng nhập lấy Bearer token |
| | `GET` | `/api/auth/me` | Authenticated | Lấy thông tin tài khoản hiện tại |
| | `PUT` | `/api/auth/profile` | Authenticated | Cập nhật họ tên, số điện thoại |
| | `PUT` | `/api/auth/change-password` | Authenticated | Đổi mật khẩu tài khoản |
| **Courts** | `GET` | `/api/courts` | Public | Danh sách sân thể thao (Bộ lọc, phân trang) |
| | `GET` | `/api/courts/:id` | Public | Chi tiết sân thể thao & đánh giá |
| | `POST` | `/api/courts` | Admin, Manager | Tạo sân mới |
| | `PUT` | `/api/courts/:id` | Admin, Manager | Chỉnh sửa thông tin sân |
| | `PATCH` | `/api/courts/:id/status` | Admin, Manager | Đổi trạng thái (active, maintenance) |
| | `DELETE`| `/api/courts/:id` | Admin | Xóa sân thể thao |
| **Bookings** | `GET` | `/api/bookings/court/:id/slots` | Public | Lấy khung giờ đã bận theo ngày |
| | `POST` | `/api/bookings` | Customer | Đặt sân mới (Chống trùng lịch Backend) |
| | `GET` | `/api/bookings/my` | Authenticated | Xem danh sách booking cá nhân |
| | `GET` | `/api/bookings` | Admin, Manager, Staff | Xem toàn bộ booking hệ thống |
| | `PUT` | `/api/bookings/:id/cancel` | Authenticated | Hủy đặt sân kèm lý do |
| | `PATCH`| `/api/bookings/:id/status` | Admin, Manager | Cập nhật trạng thái đơn đặt sân |
| **Reviews** | `GET` | `/api/reviews/court/:id` | Public | Xem nhận xét của sân |
| | `POST` | `/api/reviews` | Customer | Đánh giá sân (Chỉ đơn đã hoàn thành) |
| **Employees** | `GET`| `/api/employees` | Admin, Manager | Danh sách hồ sơ nhân viên |
| | `POST` | `/api/employees` | Admin, Manager | Thêm nhân viên mới (+ cấp user) |
| | `GET` | `/api/employees/:id` | Admin, Manager | Chi tiết hồ sơ & thống kê ngày công |
| | `PUT` | `/api/employees/:id` | Admin, Manager | Cập nhật nhân viên |
| | `PATCH`| `/api/employees/:id/status`| Admin, Manager | Khóa / mở khóa nhân viên |
| **Shifts** | `GET` | `/api/shifts` | Authenticated | Danh sách các ca làm việc |
| | `POST` | `/api/shifts` | Admin, Manager | Thêm ca làm mới |
| | `PUT` | `/api/shifts/:id` | Admin, Manager | Chỉnh sửa ca làm & ân hạn trễ |
| **Schedules** | `GET`| `/api/work-schedules/my` | Authenticated | Lịch làm việc cá nhân của nhân viên |
| | `GET` | `/api/work-schedules` | Admin, Manager | Danh sách toàn bộ lịch phân ca |
| | `POST` | `/api/work-schedules` | Admin, Manager | Phân ca trực (chống trùng ca cùng ngày) |
| **Attendance** | `POST` | `/api/attendance/check-in` | Staff, Manager | Chấm công vào (hỗ trợ mã QR) |
| | `POST` | `/api/attendance/check-out` | Staff, Manager | Chấm công ra & tính giờ làm |
| | `GET` | `/api/attendance/my` | Authenticated | Xem lịch sử chấm công cá nhân |
| | `GET` | `/api/attendance` | Admin, Manager | Giám sát toàn bộ chấm công |
| | `PUT` | `/api/attendance/:id` | Admin, Manager | Sửa chấm công (Lưu vết Audit Log) |
| | `POST` | `/api/attendance/generate-qr` | Admin, Manager | Tạo mã QR token động cho sân |
| **Leaves** | `POST` | `/api/leave-requests` | Authenticated | Gửi đơn xin nghỉ phép |
| | `GET` | `/api/leave-requests/my` | Authenticated | Xem trạng thái đơn cá nhân |
| | `GET` | `/api/leave-requests` | Admin, Manager | Danh sách đơn nghỉ toàn hệ thống |
| | `PUT` | `/api/leave-requests/:id/approve` | Admin, Manager | Phê duyệt đơn nghỉ phép |
| | `PUT` | `/api/leave-requests/:id/reject` | Admin, Manager | Từ chối đơn nghỉ phép |
| **Payrolls** | `GET` | `/api/payrolls` | Admin, Manager | Xem bảng lương theo tháng/năm |
| | `POST` | `/api/payrolls` | Admin, Manager | Tính lương tự động theo ngày công |
| | `PUT` | `/api/payrolls/:id` | Admin, Manager | Cập nhật phụ cấp, khấu trừ, duyệt chi |
| **Reports** | `GET` | `/api/admin/reports/dashboard` | Admin, Manager | Báo cáo KPI tổng quan & số liệu Recharts |

---

## 13. Hướng dẫn Đóng gói Production (Build)

```bash
# Build Backend
cd backend
npm run build
# Sản phẩm build đặt tại: backend/dist

# Build Frontend
cd ../frontend
npm run build
# Sản phẩm build đặt tại: frontend/dist
```

---

## 14. Hướng Phát Triển Tiếp Theo

1. Tích hợp cổng thanh toán trực tuyến thực tế (VNPay Sandbox, MoMo, ZaloPay).
2. Tích hợp lưu trữ hình ảnh Cloudinary / AWS S3 SDK thay thế URL ngoài.
3. Gửi thông báo tự động (Websocket / FCM Push Notifications) khi có booking mới hoặc khi đơn nghỉ phép được duyệt.
4. Ứng dụng di động Mobile App (React Native / Flutter) cho nhân viên quét QR trên camera trực tiếp.
=======
# WebDatSan-Sport
>>>>>>> 78ebfe4c61aab4a19e04730d264e240228f6a89c
