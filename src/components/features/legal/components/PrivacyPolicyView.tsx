import * as React from "react";
import { LegalLayout } from "./LegalLayout";

export function PrivacyPolicyView() {
  return (
    <LegalLayout title="Chính sách bảo mật thông tin cá nhân">
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          1. Mục đích và phạm vi thu thập thông tin
        </h2>
        <p>
          BrightLingo tôn trọng sự riêng tư và cam kết bảo vệ tối đa dữ liệu cá nhân của mọi học viên. Khi tiến hành mua khóa học hoặc đăng ký nhận tư vấn, chúng tôi chỉ thu thập các thông tin tối thiểu cần thiết:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-slate-900 font-semibold">Họ và tên</strong>: Để cá nhân hóa tài liệu và hiển thị chứng nhận/hóa đơn điện tử.
          </li>
          <li>
            <strong className="text-slate-900 font-semibold">Địa chỉ Email</strong>: Bắt buộc, là kênh chính thức và duy nhất để giao nhận link tài liệu số, Notion template và video bài học.
          </li>
          <li>
            <strong className="text-slate-900 font-semibold">Số điện thoại</strong>: Tùy chọn hoặc cung cấp khi học viên có yêu cầu hỗ trợ chuyên sâu 1-1 qua Zalo từ giáo viên.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          2. Cam kết không lưu trữ thông tin ngân hàng & thẻ tín dụng
        </h2>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5">
          <p className="font-semibold text-emerald-900 mb-1">
            An toàn tuyệt đối với chuẩn thanh toán VietQR
          </p>
          <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
            BrightLingo không bao giờ yêu cầu bạn cung cấp mật khẩu ngân hàng, mã OTP, số thẻ tín dụng hay bất kỳ thông tin tài chính nhạy cảm nào. Mọi thao tác chuyển khoản đều do chính bạn trực tiếp thực hiện trên ứng dụng ngân hàng chính chủ của mình.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          3. Phạm vi sử dụng thông tin
        </h2>
        <p>
          Dữ liệu của học viên chỉ được sử dụng cho các mục đích nội bộ sau:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Gửi email xác nhận đơn hàng và link tài liệu số sau khi thanh toán thành công.</li>
          <li>Gửi thông báo cập nhật bài giảng mới, tài nguyên bổ sung miễn phí thuộc quyền sở hữu trọn đời của học viên.</li>
          <li>Hỗ trợ giải đáp thắc mắc, phản hồi học tập từ đội ngũ giảng viên và kỹ thuật.</li>
        </ul>
        <p className="font-semibold text-slate-900">
          BrightLingo tuyệt đối không bán, cho thuê, trao đổi hay tiết lộ thông tin của học viên cho bất kỳ bên thứ ba nào vì mục đích quảng cáo hoặc thương mại.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          4. Thời gian lưu trữ dữ liệu & Quyền của học viên
        </h2>
        <p>
          Dữ liệu liên hệ được lưu trữ an toàn trong suốt thời gian học viên duy trì quyền sở hữu khóa học. Học viên có toàn quyền gửi yêu cầu qua email <strong className="text-primary font-semibold">support@brightlingo.vn</strong> để kiểm tra, cập nhật hoặc xóa dữ liệu cá nhân khỏi hệ thống.
        </p>
      </section>
    </LegalLayout>
  );
}
