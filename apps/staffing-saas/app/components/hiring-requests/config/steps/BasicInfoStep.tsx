"use client";

import { Checkbox, HintText, Select, SelectItem, Card, CardContent } from "@mvp-ui/ui";
import { RotateCcw } from "lucide-react";
import { SectionCard } from "../SectionCard";
import { useWizard } from "../wizardContext";
import type { BasicInfoState } from "../types";
import { HeadcountSection } from "../HeadcountSection";

type OverridableKey = "description" | "requirements" | "benefits" | "instructions";

const OVERRIDABLE_FIELDS: Array<{
  key: OverridableKey;
  label: string;
  sourceKey:
  | "positionDescription"
  | "positionRequirements"
  | "positionBenefits"
  | "positionInstructions";
}> = [
    { key: "description", label: "Mô tả công việc", sourceKey: "positionDescription" },
    { key: "requirements", label: "Yêu cầu", sourceKey: "positionRequirements" },
    { key: "benefits", label: "Quyền lợi", sourceKey: "positionBenefits" },
    {
      key: "instructions",
      label: "Hướng dẫn, tài liệu",
      sourceKey: "positionInstructions",
    },
  ];

export function BasicInfoStep() {
  const { mode, preStep, form, setBasic } = useWizard();
  const basic = form.basic;
  const isReadOnly = mode === "view";

  const selectedLocation = preStep.workLocations.find(
    (loc) => loc.id === basic.workLocationId
  );
  const displayLocation = selectedLocation ?? preStep.workLocations[0];

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-lg font-semibold text-fg-secondary">
              {`Vị trí: ${preStep.positionName}`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">

            <div className="flex flex-col gap-1.5">
              {isReadOnly ? (
                <>
                  <span className="text-sm font-medium text-fg-secondary">
                    Địa điểm làm việc
                  </span>
                  <span className="text-sm font-semibold text-fg">
                    {displayLocation?.shortName ?? "—"}
                  </span>
                  {displayLocation ? (
                    <HintText>Đ/c: {displayLocation.address}</HintText>
                  ) : null}
                </>
              ) : (
                <>
                  <Select
                    label="Địa điểm làm việc"
                    isRequired
                    placeholder="Chọn địa điểm"
                    selectedKey={basic.workLocationId || null}
                    onSelectionChange={(key) =>
                      setBasic({ workLocationId: (key as string) ?? "" })
                    }
                    items={preStep.workLocations.map((loc) => ({
                      id: loc.id,
                      label: loc.shortName,
                    }))}
                  >
                    {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
                  </Select>
                  {selectedLocation ? (
                    <HintText>Đ/c: {selectedLocation.address}</HintText>
                  ) : null}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col gap-6">
            {OVERRIDABLE_FIELDS.map((field) => (
              <OverridableTextField
                key={field.key}
                label={field.label}
                field={basic[field.key]}
                sourceValue={preStep[field.sourceKey]}
                onChange={(patch) =>
                  setBasic({ [field.key]: { ...basic[field.key], ...patch } } as Partial<BasicInfoState>)
                }
              />
            ))}

            {basic.instructions.isOverriding && preStep.positionDocuments.length > 0 ? (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-fg-secondary">Tài liệu</span>
                <div className="flex flex-wrap gap-2">
                  {preStep.positionDocuments.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.url}
                      className="inline-flex items-center gap-2 rounded-full border border-border-secondary bg-bg-secondary px-3 py-1 text-xs text-fg-secondary"
                    >
                      {doc.name}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

      </div>
      <SectionCard
        className="col-span-1"
        title="Số lượng tuyển"
        description="Lưu ý: định tuyển 10 nên chọn 12 hoặc 15 vì có CTV bận phút chót."
      >
        <HeadcountSection />
      </SectionCard>
    </div>
  );
}

function ReadOnlyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-fg-secondary">{label}</span>
      <span className="text-sm font-semibold text-fg">{value}</span>
    </div>
  );
}

interface OverridableTextFieldProps {
  label: string;
  field: { isOverriding: boolean; value: string };
  sourceValue: string;
  onChange: (patch: Partial<{ isOverriding: boolean; value: string }>) => void;
}

function OverridableTextField({
  label,
  field,
  sourceValue,
  onChange,
}: OverridableTextFieldProps) {
  const displayValue = field.isOverriding ? field.value : sourceValue;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-medium text-fg-secondary">{label}</span>
        <Checkbox
          size="sm"
          label="Chỉnh sửa"
          isSelected={field.isOverriding}
          onChange={(isSelected) =>
            onChange({
              isOverriding: isSelected,
              value: isSelected ? sourceValue : sourceValue,
            })
          }
        />
      </div>
      <textarea
        value={displayValue}
        disabled={!field.isOverriding}
        rows={4}
        onChange={(e) => onChange({ value: e.target.value })}
        className="min-h-24 resize-y rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg shadow-xs outline-none focus:border-border-brand focus:ring-2 focus:ring-border-brand/30 disabled:bg-bg-secondary disabled:text-fg-secondary"
      />
      {field.isOverriding ? (
        <button
          type="button"
          onClick={() => onChange({ isOverriding: false, value: sourceValue })}
          className="self-start text-xs text-fg-brand"
        >
          <RotateCcw className="mr-1 inline size-3" />
          Khôi phục mặc định
        </button>
      ) : null}
    </div>
  );
}

