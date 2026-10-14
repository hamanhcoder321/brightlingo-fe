import * as React from "react";
import { LegalLayout } from "./LegalLayout";

export function PaymentPolicyView() {
  return (
    <LegalLayout title="Chính sách thanh toán & Đối soát tự động">
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          1. Mô hình thanh toán một lần - Sở hữu trọn đời
        </h2>
        <p>
          BrightLingo áp dụng mô hình thanh toán một lần duy nhất cho toàn bộ các khóa học và bộ tài liệu số. Chúng tôi{" "}
          <strong className="text-slate-900 font-semibold">hoàn toàn không thu phí duy trì hàng tháng</strong>, không tự động gia hạn tài khoản và không phát sinh bất kỳ chi phí ẩn nào sau khi học viên thanh toán thành công.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          2. Phương thức thanh toán chuyển khoản VietQR tự động
        </h2>
        <p>
          Để đảm bảo tính minh bạch và an toàn tuyệt đối cho người học, hệ thống hỗ trợ thanh toán chuyển khoản ngân hàng thông qua cổng kết nối VietQR chuẩn NAPAS:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Mỗi đơn hàng được hệ thống sinh ra một mã QR động kèm chính xác số tiền cần thanh toán và mã định danh đơn hàng (Order Code).
          </li>
          <li>
            Học viên sử dụng ứng dụng Mobile Banking của bất kỳ ngân hàng nào tại Việt Nam (Vietcombank, MBBank, Techcombank, VPBank,...) hoặc ví điện tử để quét mã thanh toán.
          </li>
          <li>
            Giao dịch được đối soát hoàn toàn tự động qua webhook ngân hàng 24/7.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          3. Thời gian ghi nhận và kích hoạt đơn hàng
        </h2>
        <p>
          Sau khi chuyển khoản thành công từ tài khoản ngân hàng của bạn:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Hệ thống đối soát tự động ghi nhận thanh toán trong vòng <strong className="text-primary font-semibold">1 – 5 phút</strong>.
          </li>
          <li>
            Màn hình thanh toán sẽ tự động chuyển sang trạng thái <strong>Thanh toán thành công</strong>, đồng thời gửi email chứa link truy cập toàn bộ tài liệu số và hướng dẫn học tập đến hộp thư học viên đã đăng ký.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          4. Quy định xử lý sự cố & Hoàn tiền (Refund Policy)
        </h2>
        <p>
          BrightLingo cam kết bảo vệ 100% quyền lợi tài chính của học viên trong các trường hợp sau:
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 space-y-2">
          <p className="font-semibold text-slate-900">
            Trường hợp chuyển khoản nhầm số tiền hoặc sai nội dung:
          </p>
          <p className="text-xs sm:text-sm text-slate-600">
            Nếu học viên chuyển thừa/thiếu tiền hoặc điền sai cú pháp mã đơn, hệ thống sẽ lưu vết vào hàng chờ kiểm tra thủ công. Chuyên viên đối soát sẽ liên hệ xác minh và hỗ trợ kích hoạt đơn hoặc hoàn trả lại tiền trong vòng 24 giờ làm việc.
          </p>
        </div>
        <p>
          Do đặc thù sản phẩm số được chuyển giao quyền truy cập vĩnh viễn ngay sau thanh toán, chúng tôi không áp dụng chính sách trả hàng sau khi tài liệu đã được gửi thành công vào email của học viên, ngoại trừ trường hợp lỗi kỹ thuật từ hệ thống BrightLingo khiến học viên không thể truy cập tài liệu quá 48 giờ.
        </p>
      </section>
    </LegalLayout>
  );
}
