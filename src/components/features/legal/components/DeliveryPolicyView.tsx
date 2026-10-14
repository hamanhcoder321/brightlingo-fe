import * as React from "react";
import { LegalLayout } from "./LegalLayout";

export function DeliveryPolicyView() {
  return (
    <LegalLayout title="Chính sách giao nhận & Kích hoạt tài liệu số">
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          1. Hình thức giao nhận sản phẩm số
        </h2>
        <p>
          Toàn bộ các khóa học tại BrightLingo được cung cấp dưới dạng{" "}
          <strong className="text-slate-900 font-semibold">Tài nguyên số (Digital Products)</strong>. Chúng tôi không giao sách in hay tài liệu giấy truyền thống qua đường bưu điện:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Sản phẩm được chuyển phát trực tiếp tới hộp thư điện tử (Email) mà học viên đã nhập tại bước thanh toán.
          </li>
          <li>
            Email bàn giao bao gồm: Mã đơn hàng, Biên lai điện tử, Link truy cập trực tiếp hệ thống tài nguyên số (Google Drive tốc độ cao / Template Notion / PDF) và hướng dẫn chi tiết phương pháp học.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          2. Thời gian giao nhận & Kích hoạt tự động 24/7
        </h2>
        <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 sm:p-5">
          <p className="font-semibold text-primary mb-1">
            Tốc độ bàn giao tức thì trong vòng 1 – 5 phút
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Ngay khi tài khoản ngân hàng của BrightLingo ghi nhận giao dịch chuyển khoản thành công, hệ thống máy chủ sẽ tự động kích hoạt và gửi email tài liệu cho bạn mà không cần chờ duyệt thủ công. Bạn có thể mua và nhận tài liệu bất kể ngày đêm hay dịp lễ tết.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          3. Định dạng và phương thức truy cập tài liệu
        </h2>
        <p>
          Tài liệu số của BrightLingo được thiết kế tương thích hoàn hảo trên mọi thiết bị (máy tính, laptop, iPad, điện thoại):
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-slate-900 font-semibold">Google Drive VIP</strong>: Tải toàn bộ video bài giảng độ phân giải cao và âm thanh luyện phát âm chuẩn bản xứ về máy tính để học offline không cần mạng.
          </li>
          <li>
            <strong className="text-slate-900 font-semibold">Notion Workspace</strong>: Template tra cứu từ vựng, ngữ pháp và mẫu email công sở có thể duplicate về tài khoản Notion cá nhân chỉ với 1 cú click chuột.
          </li>
          <li>
            <strong className="text-slate-900 font-semibold">Sơ đồ tư duy & Ebook PDF</strong>: Thiết kế trực quan, dễ dàng in ấn hoặc đọc trên các ứng dụng đọc sách điện tử.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          4. Hướng dẫn xử lý khi không nhận được email sau 5 phút
        </h2>
        <p>
          Nếu sau 5 phút kể từ khi chuyển khoản bạn chưa thấy email trong hòm thư, vui lòng thực hiện các bước sau:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
          <li>
            Kiểm tra kỹ các thư mục <strong className="font-semibold text-slate-900">Spam (Thư rác)</strong>, <strong className="font-semibold text-slate-900">Junk</strong> hoặc tab <strong className="font-semibold text-slate-900">Promotions (Quảng cáo)</strong> trong hòm thư của bạn.
          </li>
          <li>
            Nếu phát hiện email bị nhập sai ký tự lúc thanh toán, hãy nhắn ngay mã giao dịch ngân hàng qua Hotline <strong className="font-semibold text-primary">1900 8989</strong> hoặc Zalo hỗ trợ để chuyên viên cập nhật lại email đúng và gửi lại link cho bạn trong 30 giây.
          </li>
        </ol>
      </section>
    </LegalLayout>
  );
}
