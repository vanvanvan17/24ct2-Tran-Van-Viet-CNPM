# VNLibrary Ultimate 2.0 – MySQL, Không Prisma

Hệ thống quản lý thư viện tiếng Việt xây dựng bằng Next.js 14 + React 18 + mysql2 + MySQL 8.

## Chức năng
- Đăng nhập / đăng ký / đăng xuất / quên mật khẩu
- Phân quyền Quản trị viên và Thủ thư
- Dashboard tổng quan
- Quản lý 1.213 đầu sách mẫu
- Quản lý 287 độc giả mẫu; tên độc giả không chứa số
- Thể loại; bấm Xem sách để lọc đúng sách theo thể loại
- Kho sách và điều chỉnh tồn kho
- Mượn / trả; tự động giảm/tăng tồn kho
- Tự nhận diện quá hạn; tạo tiền phạt khi trả quá hạn
- Đặt sách
- Mua / nhập sách; tự động tăng tồn kho
- Thanh toán phiếu mua: tiền mặt, chuyển khoản, thẻ
- Tiền phạt và thanh toán
- Báo cáo + xuất CSV
- Thông báo
- Quản lý tài khoản
- Nhật ký thao tác
- Cấu hình thư viện
- Hồ sơ cá nhân và đổi mật khẩu
- Giao diện responsive + dark mode

## Yêu cầu Windows
- Node.js 20+ (khuyến nghị Node 20 LTS hoặc 22)
- MySQL Server 8.0
- VS Code

## 1. Cấu hình MySQL
Mở `.env` và sửa đúng mật khẩu MySQL của bạn:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=VNLibrary123
DB_NAME=vnlibrary
```

Nếu mật khẩu root của bạn khác `VNLibrary123`, thay dòng `DB_PASSWORD` bằng mật khẩu thật.

## 2. Cài thư viện
Mở Terminal tại thư mục có `package.json`:

```powershell
npm install
```

## 3. Tạo database và bảng
Lần đầu chạy:

```powershell
npm run db:setup
```

Lệnh này tạo database `vnlibrary` và các bảng. Script có chủ đích xóa các bảng VNLibrary cũ trước khi tạo lại.

## 4. Tạo dữ liệu mẫu

```powershell
npm run db:seed
```

Dữ liệu mẫu gồm 1.213 sách, 287 độc giả, 119 lượt mượn đang hoạt động, 21 lượt quá hạn và dữ liệu mua sách/thanh toán/đặt sách/phạt.

## 5. Chạy website

```powershell
npm run dev
```

Mở:

http://localhost:3000

## Tài khoản mẫu
- Quản trị: `admin` / `admin123`
- Thủ thư: `thuthu` / `thuthu123`

## Các lần chạy sau
Không cần chạy lại `db:setup` hoặc `db:seed`. Chỉ cần:

```powershell
npm run dev
```

## Nếu gặp lỗi Access denied
Nếu thấy:

`ER_ACCESS_DENIED_ERROR: Access denied for user 'root'@'localhost' (using password: NO)`

thì ứng dụng đang không nhận mật khẩu từ `.env`. Kiểm tra:
1. File `.env` nằm cùng cấp `package.json`.
2. `DB_PASSWORD` có giá trị thật.
3. Đóng terminal cũ và mở terminal mới sau khi sửa `.env`.
4. Dịch vụ MySQL80 đang Running.

## SQL thủ công
Có thể mở MySQL Workbench và chạy toàn bộ:

`database/schema.sql`

Sau đó quay lại PowerShell và chạy:

```powershell
npm run db:seed
```

## Lưu ý
Đây là bản đồ án/local deployment hoàn chỉnh về chức năng, không phải hệ thống tài chính/ thư viện production có email thật, SSO, backup tự động và triển khai cloud. Chức năng quên mật khẩu dùng token nội bộ để phù hợp môi trường đồ án local.
