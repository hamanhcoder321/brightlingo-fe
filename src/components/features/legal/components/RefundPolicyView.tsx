import * as React from "react";
import { LegalLayout } from "./LegalLayout";

export function RefundPolicyView() {
  return (
    <LegalLayout title="Chính sách đổi trả & Hoàn tiền (Refund Policy)">
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          1. Cam kết chất lượng từ EngNest
        </h2>
        <p>
          EngNest cung cấp các khóa học và bộ tài liệu số trực tuyến thực chiến, được kiểm duyệt kỹ lưỡng về nội dung và chất lượng âm thanh, hình ảnh. Chúng tôi luôn mong muốn đem lại trải nghiệm học tập trọn vẹn và thiết thực nhất cho học viên.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          2. Các trường hợp được hỗ trợ hoàn tiền 100%
        </h2>
        <p>Học viên được hỗ trợ hoàn tiền đầy đủ 100% trong các trường hợp sau:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-slate-900 font-semibold">Chuyển nhầm hoặc thanh toán trùng lặp:</strong> Học viên chuyển khoản nhiều lần cho cùng một đơn hàng hoặc chuyển thừa số tiền quy định.
          </li>
          <li>
            <strong className="text-slate-900 font-semibold">Lỗi kỹ thuật từ hệ thống:</strong> Đơn hàng đã trừ tiền thành công nhưng hệ thống không thể bàn giao link học tập và tài liệu sau 24 giờ làm việc dù học viên đã liên hệ hỗ trợ.
          </li>
          <li>
            <strong className="text-slate-900 font-semibold">Nội dung không đúng mô tả:</strong> Tài liệu bàn giao bị thiếu sót nghiêm trọng hoặc khác biệt hoàn toàn so với mô tả giáo trình trên website.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          3. Thời gian tiếp nhận và xử lý yêu cầu hoàn tiền
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-slate-900 font-semibold">Thời hạn yêu cầu:</strong> Trong vòng <strong className="text-primary font-semibold">07 ngày</strong> kể từ thời điểm thanh toán đơn hàng thành công.
          </li>
          <li>
            <strong className="text-slate-900 font-semibold">Thời gian xử lý:</strong> Sau khi xác nhận thông tin chuyển khoản và lý do hoàn tiền hợp lệ, bộ phận kế toán EngNest sẽ hoàn tiền về tài khoản ngân hàng của học viên trong vòng <strong>1 – 3 ngày làm việc</strong>.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          4. Quy trình yêu cầu hoàn tiền
        </h2>
        <p>Để yêu cầu hoàn tiền, học viên vui lòng thực hiện các bước sau:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Gửi email tới hộp thư hỗ trợ: <strong className="text-primary font-semibold">hotro@engnest.vn</strong> hoặc liên hệ Hotline/Zalo hỗ trợ.
          </li>
          <li>
            Cung cấp thông tin: Mã đơn hàng (Order Code), Số điện thoại, Email đăng ký, Ảnh chụp biên lai chuyển tiền ngân hàng và Số tài khoản nhận hoàn tiền.
          </li>
          <li>
            Đội ngũ hỗ trợ của EngNest sẽ phản hồi và tiến hành đối soát, hoàn tiền nhanh chóng cho học viên.
          </li>
        </ol>
      </section>
    </LegalLayout>
  );
}
