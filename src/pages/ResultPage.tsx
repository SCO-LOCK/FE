import { useNavigate } from 'react-router';
import arrowLeftIcon from '../assets/icons/arrow-line-left-icon.svg';
import IconTextButton from '../components/common/IconTextButton';
import Stepper from '../components/common/Stepper/Stepper';
import ReportCard from '../components/report/ReportCard';                    
import ReportCardInteractive from '../components/report/ReportCardInteractive'; 
import { MOCK_FINDINGS } from '../mocks/findings';  
import ReportCardItem from '../components/report/ReportCardItem'; 
import arrowRightIcon from '../assets/icons/arrow-line-right-icon.svg';   
import ActionButton from '../components/common/ActionButton';            
import { PATHS } from '../routes/paths';                                                    

const STEPS = ['프로젝트 정보 입력', '요청 사항 입력', 'AI 분석 결과'];

export default function ResultPage() {
  const navigate = useNavigate();
  const findings = MOCK_FINDINGS; 

  return (
    <main className="page-grid mt-10 flex-1 pb-24">
      <aside className="col-span-full min-[1024px]:col-span-3 min-[1024px]:pt-[88px]">
        <Stepper steps={STEPS} currentStep={3} />
      </aside>

      <div className="col-span-full flex flex-col gap-11 min-[1024px]:col-span-9">
        <IconTextButton
          size="large"
          icon={<img src={arrowLeftIcon} alt="" className="size-full" />}
          label="프로젝트명"
          onClick={() => navigate(-1)}
          className="self-start"
        />

        <div className="flex flex-col gap-13">
          <div className="flex flex-col gap-[var(--gap-small)]">
            <h1 className="type-heading-primary text-fg-neutral-primary">AI 분석 결과</h1>
            <p className="type-body-medium text-fg-neutral-secondary">
              AI가 클라이언트의 요청 사항을 분석해 제작 전 확인해야 할 내용을 정리했어요.
            </p>
          </div>

          <section className="flex flex-col gap-[var(--gap-large)]">
            <h2 className="flex gap-[var(--gap-small)] type-heading-secondary text-fg-neutral-primary">
              제작 전에 확인해야 할 사항
              <span className="text-fg-accent-notice">{findings.length}</span>
            </h2>

            {findings.length === 0 ? (
              <p className="flex h-36 items-center justify-center type-body-medium text-fg-neutral-tertiary">
                추가로 확인할 중요한 내용을 찾지 못했어요.
              </p>
            ) : (
              <div className="flex flex-col gap-[var(--gap-xlarge)]">
                {findings.map((finding, index) => (
                  <ReportCard
                    key={`${finding.title}-${index}`}
                    title={finding.title}
                    footer={
                      <ReportCardInteractive title="질문 예시" content={finding.suggested_question} />
                    }
                  >
                    {finding.existing_baseline && (
                      <ReportCardItem title="기존 제작 기준" content={finding.existing_baseline} />
                    )}
                    <ReportCardItem
                      title="새 요청사항"
                      content={finding.request_excerpt}
                      message={finding.reason}
                    />
                  </ReportCard>
                ))}
              </div>
            )}
          </section>
        </div>
        <div className="mt-auto flex justify-between">
          <ActionButton
            size="large"
            leftIcon={<img src={arrowLeftIcon} alt="" className="size-full" />}
            onClick={() => navigate(PATHS.request)}
          >
            요청 사항 입력
          </ActionButton>
          <ActionButton
            size="large"
            variant="brandInverse"
            rightIcon={<img src={arrowRightIcon} alt="" className="size-full" />}
            onClick={() => navigate(PATHS.home)}
          >
            홈
          </ActionButton>
        </div>
      </div>
    </main>
  );
}