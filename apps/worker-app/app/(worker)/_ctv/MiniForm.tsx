import { CTV } from "../../data/ctv-referral";

/**
 * Thumbnail xem trước trang đăng ký của CTV — recolor theo --bp tức thì khi
 * đổi swatch. Cố ý sáng (light) ở mọi theme: nó mô phỏng trang public.
 */
export function MiniForm() {
  return (
    <div className="mini-form">
      <div className="mf-hero">
        {/* biome-ignore lint/performance/noImgElement: thumbnail trang trí cố định */}
        <img className="mf-logo" src="/viec-logo.png" alt="" />
        <div className="mf-ref">
          <span className="mf-av">
            {/* biome-ignore lint/performance/noImgElement: avatar nhỏ trang trí */}
            <img src={CTV.avatar} alt="" />
          </span>
          <span className="mf-lines">
            <span />
            <span />
          </span>
        </div>
        <div className="mf-h" />
        <div className="mf-h2" />
      </div>
      <div className="mf-body">
        <div className="mf-field" />
        <div className="mf-chip-row">
          <span className="mf-chip on" />
          <span className="mf-chip" />
          <span className="mf-chip" />
        </div>
        <div className="mf-btn" />
      </div>
      <div className="mf-tag">Trang đăng ký của bạn</div>
    </div>
  );
}
