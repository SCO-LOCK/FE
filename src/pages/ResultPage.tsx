import Stepper from '../components/common/Stepper/Stepper';

const STEPS = ['프로젝트 정보 입력', '요청 사항 입력', 'AI 분석 결과'];

export default function ResultPage() {
  return (
    <main className="page-grid mt-10 flex-1 pb-24">
      <aside className="col-span-full min-[1024px]:col-span-3 min-[1024px]:pt-[88px]">
        <Stepper steps={STEPS} currentStep={3} />
      </aside>

      <div className="col-span-full min-[1024px]:col-span-9">
      </div>
    </main>
  );
}