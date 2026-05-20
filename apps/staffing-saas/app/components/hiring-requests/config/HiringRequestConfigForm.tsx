"use client";

import { Button, Tab, TabList, TabPanel, Tabs } from "@mvp-ui/ui";
import type { Key } from "react";
import {
  HiringRequestWizardProvider,
  useWizard,
  type WizardMode,
} from "./wizardContext";
import { WIZARD_STEPS, type WizardStepId } from "./types";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { ScheduleStep } from "./steps/ScheduleStep";
import { PayStep } from "./steps/PayStep";
import { PostingStep } from "./steps/PostingStep";

interface HiringRequestConfigFormProps {
  mode?: WizardMode;
}

export function HiringRequestConfigForm({
  mode = "view",
}: HiringRequestConfigFormProps = {}) {
  return (
    <HiringRequestWizardProvider mode={mode}>
      <FormBody />
    </HiringRequestWizardProvider>
  );
}

function FormBody() {
  const { mode, currentStep, setCurrentStep } = useWizard();

  const stepIndex = WIZARD_STEPS.findIndex((s) => s.id === currentStep);
  const isLastStep = stepIndex === WIZARD_STEPS.length - 1;
  const nextStep = WIZARD_STEPS[stepIndex + 1]?.id;
  const prevStep = WIZARD_STEPS[stepIndex - 1]?.id;
  const showSaveAction = mode !== "view";

  return (
    <div className="flex flex-col gap-6">
      <Tabs
        orientation="vertical"
        variant="pill"
        size="md"
        selectedKey={currentStep}
        onSelectionChange={(key: Key) => setCurrentStep(key as WizardStepId)}
      >
        <TabList
          aria-label="Cấu hình tin tuyển dụng"
          className="w-64 shrink-0"
        >
          {WIZARD_STEPS.map((step, idx) => (
            <Tab key={step.id} id={step.id}>
              {`${idx + 1}. ${step.label}`}
            </Tab>
          ))}
        </TabList>

        <TabPanel id="basic">
          <BasicInfoStep />
        </TabPanel>
        <TabPanel id="schedule">
          <ScheduleStep />
        </TabPanel>
        <TabPanel id="pay">
          <PayStep />
        </TabPanel>
        <TabPanel id="posting">
          <PostingStep />
        </TabPanel>
      </Tabs>

      <div className="flex items-center justify-end gap-3 border-t border-border-secondary pt-4">
        {prevStep ? (
          <Button
            color="secondary"
            size="md"
            onClick={() => setCurrentStep(prevStep)}
          >
            ← Quay lại
          </Button>
        ) : null}
        {!isLastStep && nextStep ? (
          <Button
            color="primary"
            size="md"
            onClick={() => setCurrentStep(nextStep)}
          >
            Tiếp tục →
          </Button>
        ) : showSaveAction ? (
          <Button color="primary" size="md">
            Lưu
          </Button>
        ) : null}
      </div>
    </div>
  );
}
