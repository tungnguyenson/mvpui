# Staffing SaaS Pages Plan

## Mục tiêu

Xây dựng bộ sample pages cho `apps/staffing-saas` theo từng mục điều hướng, dùng
mock/demo data בלבד, routing thật bằng Next.js App Router, và mỗi trang dạng
listing đều có detail page tương ứng.

Ngôn ngữ giao diện: tiếng Việt.

## Nguyên tắc triển khai

- Dùng mock data cục bộ, không gọi API thật.
- Mỗi nav item phải có page riêng.
- Trang dạng listing phải có route detail riêng.
- Dùng layout page thống nhất:
  - app canvas dùng `bg-bg-secondary`
  - page header là một slab riêng dùng `bg-bg` + `shadow-xs`
  - phần content bên dưới có padding riêng
  - panel/card nổi trên canvas bằng `bg-bg`
- `Dashboard` là trang overview duy nhất, không có detail page.
- `Quản lý xác thực` là worker-centric, tập trung vào hồ sơ xác thực và tài liệu.
- `Quản lý vi phạm` là worker-centric; một worker có thể có nhiều vi phạm.
- `Thanh toán CTV` là batch-centric; vào detail batch để xem danh sách workers.
- `Chấm công` là shift-centric; listing là danh sách ca, detail là chi tiết ca và các attendance records.
- `Tuyển dụng` là customer hiring-request centric; không dùng khái niệm campaign.
- `Thưởng` là rule-centric.
- Loại khỏi phase này: `Chính sách giá`.

## Route map

| Nav item | Listing route | Detail route | Loại trang |
|---|---|---|---|
| Dashboard | `/` | — | Overview |
| Khách hàng | `/customers` | `/customers/[id]` | Listing + detail |
| Danh sách CTV | `/workers` | `/workers/[id]` | Listing + detail |
| Quản lý xác thực | `/worker-verifications` | `/worker-verifications/[id]` | Listing + detail |
| Quản lý vi phạm | `/worker-violations` | `/worker-violations/[id]` | Listing + detail |
| Thanh toán CTV | `/worker-payment-batches` | `/worker-payment-batches/[id]` | Listing + detail |
| Lịch làm việc | `/shifts` | `/shifts/[id]` | Listing + detail |
| Chấm công | `/timesheets` | `/timesheets/[id]` | Listing + detail |
| Đối soát | `/reconciliations` | `/reconciliations/[id]` | Listing + detail |
| Tuyển dụng | `/hiring-requests` | `/hiring-requests/[id]` | Listing + detail |
| Thưởng | `/reward-rules` | `/reward-rules/[id]` | Listing + detail |
| User | `/users` | `/users/[id]` | Listing + detail |

## Checklist tổng

- [x] Dashboard
- [x] Khách hàng
- [x] Danh sách CTV
- [x] Quản lý xác thực
- [x] Quản lý vi phạm
- [x] Thanh toán CTV
- [x] Lịch làm việc
- [x] Chấm công
- [x] Đối soát
- [x] Tuyển dụng
- [x] Thưởng
- [x] User

## Page briefs

### 1. Dashboard

**Trạng thái:** `DONE`

**Mục tiêu**

Trang tổng quan vận hành staffing: số lượng ca, workers, xác thực, thanh toán,
đối soát và hiring requests.

**Routes**

- `/`

**Dữ liệu mẫu**

- KPI cards
- Danh sách hiring requests mới
- Ca làm việc sắp diễn ra
- Workers cần xác thực
- Batch thanh toán gần nhất

**Khối UI chính**

- KPI cards
- Bảng ngắn / activity feed
- Biểu đồ hoặc sparkline
- Quick actions

**Acceptance checklist**

- [x] Có route `/`
- [x] Có layout dashboard hoàn chỉnh
- [x] Có liên kết sang các module chính
- [x] Không cần detail page

### 2. Khách hàng

**Trạng thái:** `DONE`

**Mục tiêu**

Quản lý danh sách khách hàng doanh nghiệp đang gửi nhu cầu tuyển dụng và vận hành ca.

**Loại trang**

Listing + detail

**Routes**

- `/customers`
- `/customers/[id]`

**Dữ liệu mẫu**

- Hồ sơ công ty
- Người liên hệ
- Trạng thái hợp tác
- Số lượng hiring requests
- Tổng số ca đang mở
- Snapshot chi phí

**Khối UI chính**

- Listing table với filter/search
- Detail header + company profile
- Danh sách hiring requests của khách hàng
- Danh sách ca đang mở
- Billing snapshot

**Acceptance checklist**

- [x] Có listing page
- [x] Có detail page
- [x] Từ listing vào được detail
- [x] Detail hiển thị thông tin công ty, liên hệ, hiring requests, ca làm việc

### 3. Danh sách CTV

**Trạng thái:** `DONE`

**Mục tiêu**

Quản lý toàn bộ workers trong hệ thống.

**Loại trang**

Listing + detail

**Routes**

- `/workers`
- `/workers/[id]`

**Dữ liệu mẫu**

- Hồ sơ worker
- Khu vực
- Kỹ năng
- Trạng thái hoạt động
- Điểm đánh giá
- Số ca đã làm

**Khối UI chính**

- Listing table
- Worker detail profile
- Stats card
- Lịch sử ca
- Snapshot xác thực, vi phạm, thanh toán

**Acceptance checklist**

- [x] Có listing page
- [x] Có detail page
- [x] Detail thể hiện hồ sơ tổng quan worker
- [x] Có liên kết sang xác thực, vi phạm, thanh toán nếu phù hợp

### 4. Quản lý xác thực

**Trạng thái:** `DONE`

**Mục tiêu**

Theo dõi xác thực worker theo góc nhìn hồ sơ xác thực, tập trung vào tài liệu và trạng thái review.

**Loại trang**

Listing + detail

**Routes**

- `/worker-verifications`
- `/worker-verifications/[id]`

**Dữ liệu mẫu**

- Worker identity summary
- Trạng thái xác thực
- Quốc gia / khu vực
- Số điện thoại
- CCCD/CMND
- Mã số thuế
- Danh sách tài liệu đã nộp
- Risk flags / missing docs

**Khối UI chính**

- Listing table theo worker
- Detail page tập trung vào verification profile
- Danh sách documents
- Timeline review
- Checklist thiếu hồ sơ

**Acceptance checklist**

- [x] Có listing page
- [x] Có detail page
- [x] Listing là worker-centric, không phải request-centric
- [x] Detail hiển thị phone, CCCD/CMND, MST, documents, review status

### 5. Quản lý vi phạm

**Trạng thái:** `DONE`

**Mục tiêu**

Theo dõi lịch sử vi phạm của workers và cách hệ thống xử lý từng worker.

**Loại trang**

Listing + detail

**Routes**

- `/worker-violations`
- `/worker-violations/[id]`

**Dữ liệu mẫu**

- Worker summary
- Số lần vi phạm
- Mức độ nghiêm trọng gần nhất
- Trạng thái khóa / cảnh cáo
- Danh sách các violation cases

**Khối UI chính**

- Listing table theo worker
- Detail page worker-centric
- Violation history table
- Mức xử lý / penalty summary
- Liên kết tới ca liên quan

**Acceptance checklist**

- [x] Có listing page
- [x] Có detail page
- [x] Listing là worker-centric
- [x] Detail cho thấy một worker có nhiều violation cases

### 6. Thanh toán CTV

**Trạng thái:** `DONE`

**Mục tiêu**

Quản lý các batch thanh toán cho workers.

**Loại trang**

Listing + detail

**Routes**

- `/worker-payment-batches`
- `/worker-payment-batches/[id]`

**Dữ liệu mẫu**

- Mã batch
- Kỳ thanh toán
- Số lượng workers
- Tổng tiền
- Trạng thái batch
- Danh sách line items theo worker

**Khối UI chính**

- Listing table theo batch
- Detail page của batch
- Summary cards
- Bảng workers trong batch
- Payment breakdown

**Acceptance checklist**

- [x] Có listing page
- [x] Có detail page
- [x] Listing là batch-centric
- [x] Detail hiển thị danh sách workers trong batch

### 7. Lịch làm việc

**Trạng thái:** `DONE`

**Mục tiêu**

Quản lý các ca làm việc đã mở cho khách hàng.

**Loại trang**

Listing + detail

**Routes**

- `/shifts`
- `/shifts/[id]`

**Dữ liệu mẫu**

- Tên ca
- Khách hàng
- Địa điểm
- Thời gian
- Số lượng cần tuyển
- Số lượng đã nhận ca
- Trạng thái ca

**Khối UI chính**

- Listing dạng table hoặc calendar/list hybrid
- Shift detail header
- Assigned workers
- Yêu cầu công việc
- Ghi chú vận hành

**Acceptance checklist**

- [x] Có listing page
- [x] Có detail page
- [x] Detail hiển thị thông tin ca và workers liên quan
- [x] Có trạng thái fill/open của ca

### 8. Chấm công

**Trạng thái:** `DONE`

**Mục tiêu**

Theo dõi chấm công theo từng ca làm việc.

**Loại trang**

Listing + detail

**Routes**

- `/timesheets`
- `/timesheets/[id]`

**Dữ liệu mẫu**

- Shift summary
- Số lượng workers expected/checked-in
- Attendance records theo worker
- Check-in/check-out time
- Trạng thái xác nhận công

**Khối UI chính**

- Listing là danh sách ca
- Detail của một ca
- Bảng attendance records
- Progress summary
- Exceptions / missing checkout

**Acceptance checklist**

- [x] Có listing page
- [x] Có detail page
- [x] Listing là shift-centric
- [x] Detail hiển thị danh sách attendance records của ca

### 9. Đối soát

**Trạng thái:** `DONE`

**Mục tiêu**

Đối soát dữ liệu giữa ca làm việc, chấm công và thanh toán.

**Loại trang**

Listing + detail

**Routes**

- `/reconciliations`
- `/reconciliations/[id]`

**Dữ liệu mẫu**

- Kỳ đối soát
- Khách hàng
- Tổng số ca
- Chênh lệch
- Trạng thái xử lý
- Danh sách discrepancy items

**Khối UI chính**

- Listing table
- Detail summary
- Discrepancy table
- Approval timeline

**Acceptance checklist**

- [x] Có listing page
- [x] Có detail page
- [x] Detail hiển thị discrepancy items rõ ràng
- [x] Có trạng thái xử lý / phê duyệt

### 10. Tuyển dụng

**Trạng thái:** `DONE`

**Mục tiêu**

Thực hiện hiring requests từ khách hàng và theo dõi mức độ lấp đầy nhu cầu.

**Loại trang**

Listing + detail

**Routes**

- `/hiring-requests`
- `/hiring-requests/[id]`

**Dữ liệu mẫu**

- Hiring request summary
- Khách hàng
- Headcount cần tuyển
- Hồ sơ worker mong muốn
- Số lượng đã fill
- Deadline
- Danh sách candidates / assigned workers

**Khối UI chính**

- Listing table
- Detail summary
- Funnel hoặc progress cards
- Candidate/worker assignment table
- Timeline fulfill request

**Acceptance checklist**

- [x] Có listing page
- [x] Có detail page
- [x] Dùng mô hình customer hiring request, không dùng campaign
- [x] Detail hiển thị headcount, tiêu chí worker, tiến độ fill

### 11. Thưởng

**Trạng thái:** `DONE`

**Mục tiêu**

Quản lý các reward rules áp dụng cho workers.

**Loại trang**

Listing + detail

**Routes**

- `/reward-rules`
- `/reward-rules/[id]`

**Dữ liệu mẫu**

- Tên rule
- Điều kiện áp dụng
- Mức thưởng
- Đối tượng áp dụng
- Hiệu lực
- Ví dụ payout gần đây

**Khối UI chính**

- Listing table
- Detail summary
- Conditions/rule builder summary
- Eligible worker groups
- Recent reward results

**Acceptance checklist**

- [x] Có listing page
- [x] Có detail page
- [x] Rule-centric, không phải payout-centric
- [x] Detail hiển thị điều kiện và ví dụ áp dụng

### 12. User

**Trạng thái:** `DONE`

**Mục tiêu**

Quản lý internal users vận hành hệ thống staffing.

**Loại trang**

Listing + detail

**Routes**

- `/users`
- `/users/[id]`

**Dữ liệu mẫu**

- Hồ sơ user nội bộ
- Vai trò
- Khu vực phụ trách
- Trạng thái hoạt động
- Lịch sử truy cập / hoạt động gần đây

**Khối UI chính**

- Listing table
- Detail profile
- Quyền hạn / access scope
- Hoạt động gần đây

**Acceptance checklist**

- [x] Có listing page
- [x] Có detail page
- [x] Detail thể hiện role, scope, recent activity

## Thứ tự triển khai đề xuất

1. Dashboard
2. Khách hàng
3. Danh sách CTV
4. Quản lý xác thực
5. Quản lý vi phạm
6. Thanh toán CTV
7. Lịch làm việc
8. Chấm công
9. Đối soát
10. Tuyển dụng
11. Thưởng
12. User

## Cách đánh dấu hoàn thành

Khi hoàn tất một nav item:

- Đổi `**Trạng thái:**` từ `TODO` sang `DONE`
- Tick mục tương ứng trong `Checklist tổng`
- Tick toàn bộ `Acceptance checklist` của nav item đó
