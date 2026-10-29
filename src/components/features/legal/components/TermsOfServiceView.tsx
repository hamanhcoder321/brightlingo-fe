import * as React from "react";
import { LegalLayout } from "./LegalLayout";

export function TermsOfServiceView() {
  return (
    <LegalLayout title="Điều khoản sử dụng & Quyền sở hữu trí tuệ">
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          1. Chấp thuận điều khoản
        </h2>
        <p>
          Bằng việc truy cập, tham khảo nội dung hoặc tiến hành mua bất kỳ khóa học, tài liệu số nào trên website EngNest, bạn đồng ý tuân thủ và chịu ràng buộc bởi các Điều khoản sử dụng này. Nếu không đồng ý với bất kỳ phần nào, vui lòng dừng sử dụng dịch vụ của chúng tôi.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          2. Quyền sở hữu và phạm vi sử dụng tài liệu học tập
        </h2>
        <p>
          Khi thanh toán thành công một khóa học hoặc tài liệu số, học viên được cấp quyền sử dụng cá nhân không độc quyền và trọn đời:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-slate-900 font-semibold">Quyền được cấp</strong>: Học viên có quyền truy cập, tải về máy tính/điện thoại cá nhân để học tập offline, duplicate template Notion về không gian làm việc cá nhân và sử dụng các mẫu câu, email vào công việc thực tế.
          </li>
          <li>
            <strong className="text-slate-900 font-semibold">Cập nhật trọn đời</strong>: Mọi tài liệu bổ sung, video làm mới liên quan đến khóa học đã mua sẽ được tự động cập nhật miễn phí cho học viên.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          3. Các hành vi nghiêm cấm (Bảo vệ bản quyền)
        </h2>
        <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4 sm:p-5 text-rose-950">
          <p className="font-semibold text-rose-900 mb-2">
            Nghiêm cấm sao chép và thương mại hóa trái phép
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-rose-900/90">
            <li>Nghiêm cấm sao chép, chỉnh sửa, phân phối, bán lại hoặc cho thuê toàn bộ hoặc một phần tài liệu số của EngNest dưới bất kỳ hình thức nào.</li>
            <li>Nghiêm cấm chia sẻ công khai link Google Drive, template Notion hoặc video bài học lên các diễn đàn, hội nhóm mạng xã hội chia sẻ tài liệu lậu.</li>
            <li>Nghiêm cấm sử dụng các công cụ tự động (crawl/scrape) để trích xuất dữ liệu khóa học từ hệ thống.</li>
          </ul>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 italic">
          EngNest bảo lưu toàn bộ quyền thực hiện các biện pháp pháp lý theo Luật Sở hữu trí tuệ Việt Nam đối với bất kỳ cá nhân hoặc tổ chức nào có hành vi vi phạm bản quyền nêu trên.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          4. Trách nhiệm của học viên
        </h2>
        <p>
          Học viên có trách nhiệm cung cấp chính xác địa chỉ Email khi thanh toán và kiểm tra kỹ lưỡng hộp thư (bao gồm hòm thư Chính, Quảng cáo và Spam) để nhận link tài nguyên. Trường hợp phát hiện link bị lộ hoặc không truy cập được, học viên cần liên hệ ngay hotline 1900 8989 để được cấp quyền lại.
        </p>
      </section>
    </LegalLayout>
  );
}
