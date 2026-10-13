/* eslint-disable @next/next/no-img-element */
import Icon from "@/components/common/MaterialIcon";

// Cột trái: thông tin khóa học (dữ liệu mẫu theo thiết kế).
export default function CourseInfo() {
  return (
    <section className="lg:col-span-7 flex flex-col gap-6">
      {/* ===== Header & Badges ===== */}
      <div className="bg-surface-container-lowest rounded-xl p-6 border border-slate-200/80 shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* [BIẾN] course.tagline */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm bg-blue-50 text-primary-container border border-blue-100">
            <Icon name="verified" fill className="text-sm" />
            English for Real Life - Giao tiếp tự tin trong mọi tình huống
          </span>
          {/* [BIẾN] course.badge (vd "Trọn đời") */}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-emerald-50 text-emerald-700 border border-emerald-100">
            Trọn đời
          </span>
        </div>

        {/* [BIẾN] course.title */}
        <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight">
          English for Real Life - Khóa học video thực tế &amp; Ebook số trọn đời
        </h1>

        {/* Social proof */}
        <div className="flex flex-wrap items-center gap-4 text-body-md font-body-md text-brand-secondary">
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <Icon name="star" fill className="text-base text-amber-500" />
            {/* [BIẾN] course.rating */}
            <span className="text-on-surface font-bold text-label-md font-label-md">4.9</span>
            {/* [BIẾN] course.reviewCount */}
            <span className="text-brand-secondary font-normal text-body-sm font-body-sm">(1.2k đánh giá)</span>
          </div>
          <span className="text-outline-variant">•</span>
          <div className="flex items-center gap-1.5 text-brand-secondary">
            <Icon name="group" className="text-base text-primary-container" />
            {/* [BIẾN] course.studentCount */}
            <span>Đã có <strong className="text-on-surface font-semibold">8.500+</strong> học viên đã học</span>
          </div>
          <span className="text-outline-variant">•</span>
          <div className="flex items-center gap-1.5 text-brand-secondary">
            <Icon name="update" className="text-base" />
            {/* [BIẾN] course.updatedYear */}
            <span>Cập nhật mới nhất 2024</span>
          </div>
        </div>

        {/* Giá */}
        <div className="flex flex-wrap items-center justify-between p-4 rounded-xl bg-surface-container-low border border-slate-200/60 gap-3">
          <div className="flex items-baseline gap-3">
            {/* [BIẾN] course.price (định dạng formatVnd) */}
            <span className="text-price-lg font-price-lg text-error">399.000đ</span>
            {/* [BIẾN] course.originalPrice */}
            <span className="text-body-md font-body-md text-outline line-through">699.000đ</span>
            {/* [BIẾN] course.discountPercent */}
            <span className="px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-red-100 text-error font-bold">Giảm 43%</span>
          </div>
          <div className="text-label-sm font-label-sm text-brand-secondary flex items-center gap-1">
            <Icon name="lock_clock" className="text-sm text-emerald-600" />
            Mua một lần, sở hữu vĩnh viễn
          </div>
        </div>

        {/* Ảnh khóa học */}
        <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-surface-container border border-slate-200 shadow-inner group">
          {/* [BIẾN] course.thumbnailUrl (ảnh từ Cloudflare R2) */}
          <img
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            alt="Ảnh khóa học English for Real Life"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXavLjp8LTS4YiMgTQKZcmsft5tJaGiq6VISS_VmzV4fivPBAHvrgeJYyIOGwZ7LC4xmTxwVoRWQGkzyyOKjOqOD97mTQVIk7JgPjYweNxAdL7TOszwVtNdFm20heHl5CyiDYKzsU9xmaj80aR3jha38OZQb9dnlv_RUrw4lf3SxBZhNGJDOhdQNsNXGHOZ3Pkgh8EwNTXAwUcAK-ety-6zjOAg5ko30VWsADBFslUGqqrcOCaIeVZFA"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-5">
            <div className="flex items-center gap-3">
              {/* [BIẾN] course.demoUrl (link học thử) */}
              <button className="w-12 h-12 rounded-full bg-white/95 text-primary-container flex items-center justify-center shadow-lg hover:scale-105 transition-transform" title="Xem video giới thiệu" type="button">
                <Icon name="play_arrow" fill className="text-2xl" />
              </button>
              <div className="text-white">
                <p className="text-label-lg font-label-lg text-white">Xem video demo bài giảng (2 phút)</p>
                <p className="text-body-sm font-body-sm text-white/80">Phương pháp phản xạ tình huống độc quyền</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Bạn sẽ đạt được gì? ===== */}
      {/* [BIẾN] course.benefits[] (mỗi mục: title + description) */}
      <div className="bg-surface-container-lowest rounded-xl p-6 border border-slate-200/80 shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Icon name="task_alt" fill className="text-lg" />
          </span>
          <h2 className="text-headline-md font-headline-md text-on-surface">3 Lợi ích cốt lõi bạn nhận được</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 pt-1">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low border border-slate-200/60">
            <Icon name="check_circle" fill className="text-emerald-600 text-xl flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-label-lg font-label-lg text-on-surface">Tự tin phản xạ tự nhiên trong 30 ngày</h3>
              <p className="text-body-sm font-body-sm text-brand-secondary mt-0.5">Xóa bỏ hoàn toàn rào cản sợ sai, hình thành tư duy nói không cần dịch từ trong đầu.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low border border-slate-200/60">
            <Icon name="check_circle" fill className="text-emerald-600 text-xl flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-label-lg font-label-lg text-on-surface">1.000+ mẫu câu và tình huống đàm thoại thực tế</h3>
              <p className="text-body-sm font-body-sm text-brand-secondary mt-0.5">Tuyển tập câu giao tiếp thông dụng chuẩn văn phong bản xứ phục vụ đi làm và du lịch.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low border border-slate-200/60">
            <Icon name="check_circle" fill className="text-emerald-600 text-xl flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-label-lg font-label-lg text-on-surface">Sở hữu trọn đời kèm trọn bộ Ebook &amp; Audio độc quyền</h3>
              <p className="text-body-sm font-body-sm text-brand-secondary mt-0.5">Tải về máy học mọi lúc mọi nơi trên điện thoại, máy tính không giới hạn thời gian.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Nội dung và tài liệu chi tiết ===== */}
      {/* [BIẾN] course.contentSections[] (tên phần + danh sách bài/tài liệu), tổng bài/thời lượng */}
      <div className="bg-surface-container-lowest rounded-xl p-6 border border-slate-200/80 shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-headline-md font-headline-md text-on-surface">Nội dung và tài liệu chi tiết</h2>
            <p className="text-body-sm font-body-sm text-brand-secondary mt-0.5">8 phần học • 42 bài giảng video HD • Ebook PDF &amp; Audio files tải về máy</p>
          </div>
          <span className="px-3 py-1 rounded-full text-label-sm font-label-sm bg-surface-container text-brand-secondary">
            Tổng thời lượng: 18 giờ
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {/* Phần 1 (đang mở) */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 bg-surface-container-low text-left font-semibold text-on-surface hover:bg-surface-container transition-colors" type="button">
              <span className="flex items-center gap-2 text-label-lg font-label-lg">
                <Icon name="folder_open" className="text-primary-container" />
                Phần 1: Khởi động - Phản xạ giao tiếp chào hỏi &amp; Kết nối ban đầu (5 bài)
              </span>
              <Icon name="expand_less" className="text-brand-secondary" />
            </button>
            <div className="p-4 bg-white flex flex-col gap-2.5 text-body-sm font-body-sm">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="flex items-center gap-2 text-on-surface">
                  <Icon name="play_circle" className="text-primary-container text-base" />
                  Bài 01: Vượt qua tâm lý ngại nói tiếng Anh
                </span>
                <span className="text-brand-secondary">14:20 • Có video &amp; Script</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="flex items-center gap-2 text-on-surface">
                  <Icon name="play_circle" className="text-primary-container text-base" />
                  Bài 02: 20 cách mở đầu cuộc trò chuyện tự nhiên
                </span>
                <span className="text-brand-secondary">18:05 • Bài tập nghe</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="flex items-center gap-2 text-on-surface">
                  <Icon name="menu_book" className="text-emerald-600 text-base" />
                  Tài liệu bổ trợ: Ebook Handout Phần 1 (PDF in màu)
                </span>
                <span className="text-emerald-600 font-semibold">Tải ngay (PDF)</span>
              </div>
            </div>
          </div>
          {/* Phần 2 */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 bg-white text-left font-semibold text-on-surface hover:bg-surface-container-low transition-colors" type="button">
              <span className="flex items-center gap-2 text-label-lg font-label-lg">
                <Icon name="folder" className="text-brand-secondary" />
                Phần 2: Tiếng Anh trong công việc &amp; Giao tiếp đồng nghiệp (6 bài)
              </span>
              <Icon name="expand_more" className="text-brand-secondary" />
            </button>
          </div>
          {/* Phần 3 */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 bg-white text-left font-semibold text-on-surface hover:bg-surface-container-low transition-colors" type="button">
              <span className="flex items-center gap-2 text-label-lg font-label-lg">
                <Icon name="folder" className="text-brand-secondary" />
                Phần 3: Đàm phán, bày tỏ quan điểm và phản biện lịch sự (5 bài)
              </span>
              <Icon name="expand_more" className="text-brand-secondary" />
            </button>
          </div>
          {/* Phần 4 */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 bg-white text-left font-semibold text-on-surface hover:bg-surface-container-low transition-colors" type="button">
              <span className="flex items-center gap-2 text-label-lg font-label-lg">
                <Icon name="folder" className="text-brand-secondary" />
                Phần 4: Xử lý tình huống du lịch, đặt phòng và thanh toán quốc tế (6 bài)
              </span>
              <Icon name="expand_more" className="text-brand-secondary" />
            </button>
          </div>
        </div>
      </div>

      {/* ===== FAQ ===== */}
      {/* [BIẾN] course.faqs[] (question + answer) lấy từ CMS Q&A */}
      <div className="bg-surface-container-lowest rounded-xl p-6 border border-slate-200/80 shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
            <Icon name="help" fill className="text-lg" />
          </span>
          <h2 className="text-headline-md font-headline-md text-on-surface">Câu hỏi thường gặp (FAQ)</h2>
        </div>
        <div className="flex flex-col gap-3">
          <details className="group rounded-xl border border-slate-200 p-4 open:bg-surface-container-low transition-colors">
            <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-on-surface text-label-lg font-label-lg">
              <span>Hình thức học thế nào? Có cần chờ mở lớp không?</span>
              <Icon name="expand_more" className="transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-body-md font-body-md text-brand-secondary">
              Toàn bộ nội dung là bài giảng video chất lượng cao được thiết kế bài bản kèm file tài liệu. Bạn có thể học ngay trên máy tính, điện thoại bất cứ lúc nào mà không cần chờ đợi lịch mở lớp.
            </p>
          </details>
          <details className="group rounded-xl border border-slate-200 p-4 open:bg-surface-container-low transition-colors">
            <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-on-surface text-label-lg font-label-lg">
              <span>Sau bao lâu thì nhận được khóa học và tài liệu?</span>
              <Icon name="expand_more" className="transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-body-md font-body-md text-brand-secondary">
              Hệ thống ngân hàng BankNoti kiểm tra tự động 24/7. Ngay sau khi bạn chuyển khoản đúng mã, email kích hoạt và link tải toàn bộ Ebook/Audio sẽ được gửi tự động trong vòng 1-3 phút.
            </p>
          </details>
          <details className="group rounded-xl border border-slate-200 p-4 open:bg-surface-container-low transition-colors">
            <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-on-surface text-label-lg font-label-lg">
              <span>Tôi được xem lại bài học bao nhiêu lần?</span>
              <Icon name="expand_more" className="transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-body-md font-body-md text-brand-secondary">
              Bạn sở hữu khóa học trọn đời không giới hạn thời gian truy cập hay số lần xem lại bài giảng. Tất cả tài liệu PDF đính kèm đều có thể tải về lưu trên thiết bị cá nhân.
            </p>
          </details>
          <details className="group rounded-xl border border-slate-200 p-4 open:bg-surface-container-low transition-colors">
            <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-on-surface text-label-lg font-label-lg">
              <span>Tôi có được hỗ trợ chuyên môn nếu không hiểu bài?</span>
              <Icon name="expand_more" className="transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-body-md font-body-md text-brand-secondary">
              Đội ngũ trợ giảng của BrightLingo sẵn sàng giải đáp thắc mắc qua email hỗ trợ support@brightlingo.vn và kênh trao đổi cộng đồng học viên độc quyền 24/7.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
