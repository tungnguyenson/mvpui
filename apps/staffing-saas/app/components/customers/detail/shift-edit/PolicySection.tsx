"use client";

import {
  Checkbox,
  HintText,
  Input,
  RadioButton,
  RadioGroup,
} from "@mvp-ui/ui";
import type { CustomerShiftOvertimeCalcMode } from "../../customer-detail-data";
import { SectionCard } from "../SectionCard";
import type { SectionProps } from "./types";

export function PolicySection({ form, update }: SectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Phạt nghỉ ca">
        <div className="flex flex-col gap-1">
          <Checkbox
            size="sm"
            label="Yêu cầu làm đủ ngày"
            isSelected={form.requireFullAttendance}
            onChange={(isSelected) =>
              update("requireFullAttendance", isSelected)
            }
          />
          <HintText>
            * Lưu ý: Sẽ có ít CTV ứng tuyển hơn vì nếu nghỉ sẽ bị phạt
          </HintText>
        </div>
      </SectionCard>

      <SectionCard title="Chấm công">
        <div className="flex flex-col gap-5">
          <Input
            label="Làm tròn giờ công mỗi"
            type="number"
            min={1}
            isRequired
            value={String(form.roundingMinutes)}
            onChange={(event) =>
              update("roundingMinutes", Number(event.target.value) || 1)
            }
            suffix="phút"
            hint="Cách làm tròn: Round-up. Ví dụ 0,5 = 1 và 0,4 = 0"
            containerClassName="w-44"
          />
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-fg-secondary">
              Ghi nhận giờ công
            </span>
            <RadioGroup
              size="sm"
              value={form.attendanceMode}
              onChange={(val) =>
                update(
                  "attendanceMode",
                  val as "precise" | "simple"
                )
              }
            >
              <RadioButton
                value="precise"
                label="Chính xác, ghi nhận theo giờ vào/ra thực tế"
              />
              <RadioButton
                value="simple"
                label="Đơn giản, chỉ cần CTV có chấm công 1 lần thì sẽ được tính đủ giờ công"
              />
            </RadioGroup>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Tăng ca">
        <Checkbox
          size="sm"
          label="Có tăng ca"
          isSelected={form.allowsOvertime}
          onChange={(isSelected) => {
            update("allowsOvertime", isSelected);
            if (!isSelected) {
              update("overtimeCalcMode", null);
              update("overtimeMinMinutesAfterShift", null);
              update("overtimeDailyHourLimit", null);
            } else if (form.overtimeCalcMode === null) {
              update("overtimeCalcMode", "afterScheduledEnd");
              update("overtimeMinMinutesAfterShift", 0);
            }
          }}
        />
        {form.allowsOvertime && (
          <div className="mt-4 flex flex-col gap-4 rounded-lg border border-border-secondary bg-bg-secondary p-4">
            <span className="text-sm font-medium text-fg-secondary">
              Cách tính tăng ca <span className="text-fg-error">*</span>
            </span>
            <RadioGroup
              size="sm"
              value={form.overtimeCalcMode ?? "afterScheduledEnd"}
              onChange={(val) => {
                const mode = val as CustomerShiftOvertimeCalcMode;
                update("overtimeCalcMode", mode);
                if (mode === "afterScheduledEnd") {
                  update("overtimeMinMinutesAfterShift", 0);
                  update("overtimeDailyHourLimit", null);
                } else {
                  update("overtimeDailyHourLimit", 8);
                  update("overtimeMinMinutesAfterShift", null);
                }
              }}
            >
              <RadioButton
                value="afterScheduledEnd"
                label="Mặc định, quá giờ chính thức là tăng ca"
                hint="Ví dụ: Giờ làm chính thức từ 8:00 - 14:00 (6 tiếng). Công tăng ca bắt đầu tính sau mốc 14:00 hoặc cộng thêm cấu hình số phút tối thiểu dưới đây"
              />
              <RadioButton
                value="dailyHourThreshold"
                label="Quá số Giờ công chính thức quy định/ngày là tăng ca"
                hint="Ví dụ: Giờ công chính thức quy định mỗi ngày là 8h, thì không quan trọng giờ vào/ra bao nhiêu, ca bắt đầu/kết thúc giờ nào. Miễn là số giờ công thực thế được ghi nhận > 8h thì được tính tăng ca"
              />
            </RadioGroup>

            {form.overtimeCalcMode === "afterScheduledEnd" ? (
              <Input
                label="Số phút tối thiểu sau giờ chính thức để tính tăng ca"
                type="number"
                min={0}
                value={String(form.overtimeMinMinutesAfterShift ?? 0)}
                onChange={(event) =>
                  update(
                    "overtimeMinMinutesAfterShift",
                    Number(event.target.value) || 0
                  )
                }
                suffix="phút"
                containerClassName="w-44"
              />
            ) : (
              <Input
                label="Số giờ công chính thức / ngày"
                type="number"
                min={1}
                isRequired
                value={String(form.overtimeDailyHourLimit ?? 8)}
                onChange={(event) =>
                  update(
                    "overtimeDailyHourLimit",
                    Number(event.target.value) || 1
                  )
                }
                suffix="giờ"
                containerClassName="w-40"
              />
            )}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
