"use client";

import { Checkbox, HintText, Input, RadioButton, RadioGroup } from "@mvp-ui/ui";
import { SectionCard } from "../SectionCard";
import { useWizard } from "../wizardContext";
import {
  WEEKDAYS,
  type AttendanceMode,
  type OvertimeCalcMode,
  type WeekdayKey,
} from "../types";

export function ScheduleStep() {
  const { form, setSchedule } = useWizard();
  const s = form.schedule;

  function toggleWeekday(key: WeekdayKey) {
    const next = s.weekdays.includes(key)
      ? s.weekdays.filter((k) => k !== key)
      : [...s.weekdays, key].sort((a, b) => a - b);
    setSchedule({ weekdays: next as WeekdayKey[] });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard title="Lịch">
        <div className="flex flex-wrap gap-4">
          <Input
            label="Ngày bắt đầu"
            type="date"
            isRequired
            value={s.startDate}
            onChange={(e) => setSchedule({ startDate: e.target.value })}
            containerClassName="w-48"
          />
          <Input
            label="Ngày kết thúc"
            type="date"
            isRequired
            value={s.endDate}
            onChange={(e) => setSchedule({ endDate: e.target.value })}
            containerClassName="w-48"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-fg-secondary">
            Lịch trong tuần <span className="text-fg-error">*</span>
          </span>
          <div className="flex flex-wrap gap-3">
            {WEEKDAYS.map((day) => (
              <Checkbox
                key={day.key}
                size="sm"
                label={
                  <span className={day.isSunday ? "text-fg-warning" : undefined}>
                    {day.label}
                  </span>
                }
                isSelected={s.weekdays.includes(day.key)}
                onChange={() => toggleWeekday(day.key)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Input
            label="Giờ bắt đầu"
            type="time"
            isRequired
            value={s.startTime}
            onChange={(e) => setSchedule({ startTime: e.target.value })}
            containerClassName="w-40"
          />
          <Input
            label="Giờ kết thúc"
            type="time"
            isRequired
            value={s.endTime}
            onChange={(e) => setSchedule({ endTime: e.target.value })}
            containerClassName="w-40"
          />
        </div>

        <Input
          label="Nghỉ giải lao"
          type="number"
          min={0}
          value={s.breakMinutes === null ? "" : String(s.breakMinutes)}
          onChange={(e) =>
            setSchedule({
              breakMinutes: e.target.value === "" ? null : Number(e.target.value),
            })
          }
          suffix="phút"
          containerClassName="w-40"
        />
      </SectionCard>

      <SectionCard title="Chính sách">
        <div className="flex flex-col gap-1">
          <Checkbox
            size="sm"
            label="Yêu cầu làm đủ ngày"
            isSelected={s.requireFullAttendance}
            onChange={(isSelected) => setSchedule({ requireFullAttendance: isSelected })}
          />
          <HintText>
            * Lưu ý: Sẽ có ít CTV ứng tuyển hơn vì nếu nghỉ sẽ bị phạt
          </HintText>
        </div>

        <Input
          label="Làm tròn giờ công mỗi"
          type="number"
          min={1}
          isRequired
          value={String(s.roundingMinutes)}
          onChange={(e) =>
            setSchedule({ roundingMinutes: Number(e.target.value) || 1 })
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
            value={s.attendanceMode}
            onChange={(val) => setSchedule({ attendanceMode: val as AttendanceMode })}
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

        <Checkbox
          size="sm"
          label="Có tăng ca"
          isSelected={s.allowsOvertime}
          onChange={(isSelected) => setSchedule({ allowsOvertime: isSelected })}
        />

        {s.allowsOvertime ? (
          <div className="flex flex-col gap-4 rounded-lg border border-border-secondary bg-bg-secondary p-4">
            <span className="text-sm font-medium text-fg-secondary">
              Cách tính tăng ca <span className="text-fg-error">*</span>
            </span>
            <RadioGroup
              size="sm"
              value={s.overtimeCalcMode}
              onChange={(val) =>
                setSchedule({ overtimeCalcMode: val as OvertimeCalcMode })
              }
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

            {s.overtimeCalcMode === "afterScheduledEnd" ? (
              <Input
                label="Số phút tối thiểu sau giờ chính thức để tính tăng ca"
                type="number"
                min={0}
                value={String(s.overtimeMinMinutesAfterShift)}
                onChange={(e) =>
                  setSchedule({
                    overtimeMinMinutesAfterShift: Number(e.target.value) || 0,
                  })
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
                value={String(s.overtimeDailyHourLimit)}
                onChange={(e) =>
                  setSchedule({
                    overtimeDailyHourLimit: Number(e.target.value) || 1,
                  })
                }
                suffix="giờ"
                containerClassName="w-40"
              />
            )}
          </div>
        ) : null}
      </SectionCard>
    </div>
  );
}
