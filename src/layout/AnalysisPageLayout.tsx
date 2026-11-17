import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import ArrowLineIcon from '../assets/icons/ArrowLineIcon';
import IconTextButton from '../components/common/IconTextButton';
import Stepper from '../components/common/Stepper/Stepper';

const STEPS = ['프로젝트 정보 입력', '요청 사항 입력', 'AI 분석 결과'];

interface AnalysisPageLayoutProps {
  currentStep: 2 | 3;
  title: string;
  description: string;
  children: ReactNode;
  actions: ReactNode;
}

export default function AnalysisPageLayout({
  currentStep,
  title,
  description,
  children,
  actions,
}: AnalysisPageLayoutProps) {
  const navigate = useNavigate();

  return (
    <main
      className="page-grid mt-6 flex-1 grid-rows-[auto_auto_1fr] gap-y-(--gap-2xlarge) pb-8
        md:mt-8 md:pb-12 lg:mt-10 lg:grid-rows-[auto_1fr] lg:gap-y-11 lg:pb-24"
    >
      <IconTextButton
        size="large"
        icon={<ArrowLineIcon direction="left" />}
        label="프로젝트명"
        onClick={() => navigate(-1)}
        className="col-span-full row-start-1 justify-self-start lg:col-start-4 lg:col-span-9 lg:-ml-2"
      />

      <aside className="col-span-full row-start-2 self-start lg:col-span-3">
        <Stepper
          steps={STEPS}
          currentStep={currentStep}
          direction="horizontal"
          className="flex-wrap lg:-ml-2 lg:flex-col lg:flex-nowrap lg:items-start"
        />
      </aside>

      <div className="col-span-full row-start-3 flex min-w-0 flex-col lg:col-span-9 lg:row-start-2">
        <div className="flex flex-col gap-8 md:gap-10 lg:gap-13">
          <div className="flex flex-col gap-(--gap-small)">
            <h1 className="type-heading-primary text-fg-neutral-primary">{title}</h1>
            <p className="type-body-medium text-fg-neutral-secondary">{description}</p>
          </div>

          {children}
        </div>

        <div className="mt-auto flex flex-wrap justify-between gap-(--gap-small) pt-8
          max-md:[&>button]:grow md:pt-12 lg:pt-36">
          {actions}
        </div>
      </div>
    </main>
  );
}
