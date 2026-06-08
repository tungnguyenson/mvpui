import type { Metadata } from "next";
import { ThuongScreen } from "../_ctv/ThuongScreen";
import "../_ctv/ctv.css";

export const metadata: Metadata = {
  title: "Thưởng giới thiệu · MVP Worker",
  description: "Theo dõi thưởng giới thiệu, mốc thưởng trong tháng và danh sách người bạn đã giới thiệu.",
};

export default function ThuongPage() {
  return <ThuongScreen />;
}
