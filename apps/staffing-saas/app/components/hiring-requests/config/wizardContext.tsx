"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  SAMPLE_PRE_STEP,
  createInitialFormState,
  type WizardContextSnapshot,
} from "./sample-data";
import type {
  BasicInfoState,
  HiringRequestFormState,
  PayState,
  PostingState,
  ScheduleState,
  WizardStepId,
} from "./types";

export type WizardMode = "view" | "create" | "edit";

interface WizardContextValue {
  mode: WizardMode;
  preStep: WizardContextSnapshot;
  form: HiringRequestFormState;
  setBasic: (patch: Partial<BasicInfoState>) => void;
  setSchedule: (patch: Partial<ScheduleState>) => void;
  setPay: (patch: Partial<PayState>) => void;
  setPosting: (patch: Partial<PostingState>) => void;
  currentStep: WizardStepId;
  setCurrentStep: (step: WizardStepId) => void;
}

const WizardCtx = createContext<WizardContextValue | null>(null);

interface HiringRequestWizardProviderProps {
  mode?: WizardMode;
  children: ReactNode;
}

export function HiringRequestWizardProvider({
  mode = "view",
  children,
}: HiringRequestWizardProviderProps) {
  const preStep = SAMPLE_PRE_STEP;
  const [form, setForm] = useState<HiringRequestFormState>(() =>
    createInitialFormState(preStep)
  );
  const [currentStep, setCurrentStep] = useState<WizardStepId>("basic");

  const setBasic = useCallback((patch: Partial<BasicInfoState>) => {
    setForm((prev) => ({ ...prev, basic: { ...prev.basic, ...patch } }));
  }, []);

  const setSchedule = useCallback((patch: Partial<ScheduleState>) => {
    setForm((prev) => ({ ...prev, schedule: { ...prev.schedule, ...patch } }));
  }, []);

  const setPay = useCallback((patch: Partial<PayState>) => {
    setForm((prev) => ({ ...prev, pay: { ...prev.pay, ...patch } }));
  }, []);

  const setPosting = useCallback((patch: Partial<PostingState>) => {
    setForm((prev) => ({ ...prev, posting: { ...prev.posting, ...patch } }));
  }, []);

  const value = useMemo<WizardContextValue>(
    () => ({
      mode,
      preStep,
      form,
      setBasic,
      setSchedule,
      setPay,
      setPosting,
      currentStep,
      setCurrentStep,
    }),
    [mode, preStep, form, setBasic, setSchedule, setPay, setPosting, currentStep]
  );

  return <WizardCtx.Provider value={value}>{children}</WizardCtx.Provider>;
}

export function useWizard(): WizardContextValue {
  const ctx = useContext(WizardCtx);
  if (!ctx) {
    throw new Error("useWizard must be used inside HiringRequestWizardProvider");
  }
  return ctx;
}
