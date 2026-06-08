import type { Metadata } from "next";
import { ShareScreen } from "../_ctv/ShareScreen";
import "../_ctv/ctv.css";

export const metadata: Metadata = {
  title: "Giới thiệu bạn bè · MVP Worker",
  description: "Chia sẻ link hoặc mã QR trang giới thiệu của bạn để mời người đi làm.",
};

export default function ChiaSePage() {
  return <ShareScreen />;
}
