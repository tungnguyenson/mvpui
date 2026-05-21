import { redirect } from "next/navigation";

export default function Route() {
  redirect("/shifts?display=table");
}
