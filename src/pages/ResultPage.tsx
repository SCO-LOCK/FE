import { useNavigate } from 'react-router';
import arrowLeftIcon from '../assets/icons/arrow-line-left-icon.svg';
import IconTextButton from '../components/common/IconTextButton';
import Stepper from '../components/common/Stepper/Stepper';

const STEPS = ['프로젝트 정보 입력', '요청 사항 입력', 'AI 분석 결과'];

export default function ResultPage() {
  const navigate = useNavigate();

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

        <div className="flex flex-col gap-[var(--gap-small)]">
          <h1 className="type-heading-primary text-fg-neutral-primary">AI 분석 결과</h1>
          <p className="type-body-medium text-fg-neutral-secondary">
            AI가 클라이언트의 요청 사항을 분석해 제작 전 확인해야 할 내용을 정리했어요.
          </p>
        </div>
      </div>
    </main>
  );
}