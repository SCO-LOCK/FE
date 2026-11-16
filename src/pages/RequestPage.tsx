import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { analyzeRequest } from '../apis/analysis';
import arrowLeftIcon from '../assets/icons/arrow-line-left-icon.svg';
import arrowRightIcon from '../assets/icons/arrow-line-right-icon.svg';
import ActionButton from '../components/common/ActionButton';
import IconTextButton from '../components/common/IconTextButton';
import { InputField } from '../components/common/input';
import Snackbar from '../components/common/Snackbar';
import Stepper from '../components/common/Stepper/Stepper';
import { PATHS } from '../routes/paths';

const STEPS = ['프로젝트 정보 입력', '요청 사항 입력', 'AI 분석 결과'];
const EMPTY_REQUEST_MESSAGE = '클라이언트 요청사항을 입력해주세요.';
const ANALYSIS_ERROR_MESSAGE = '요청을 분석하지 못했어요.';

export default function RequestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [requestText, setRequestText] = useState<string>(location.state?.requestText ?? '');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalysisError, setHasAnalysisError] = useState(false);

  const handleAnalyzeClick = async () => {
    if (requestText.trim() === '') {
      setErrorMessage(EMPTY_REQUEST_MESSAGE);
      return;
    }

    setHasAnalysisError(false);
    setIsAnalyzing(true);
    try {
      const findings = await analyzeRequest(requestText);
      navigate(PATHS.result, { state: { findings, requestText } });
    } catch {
      setHasAnalysisError(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="page-grid mt-10 flex-1 pb-24">
      <aside className="col-span-full min-[1024px]:col-span-3 min-[1024px]:pt-[88px]">
        <Stepper steps={STEPS} currentStep={2} />
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
            <h1 className="type-heading-primary text-fg-neutral-primary">요청 사항 입력</h1>
            <p className="type-body-medium text-fg-neutral-secondary">
              클라이언트의 요청 사항을 입력하면 제작 전에 다시 확인해야 할 내용을 찾아줘요.
            </p>
          </div>

          <section className="flex flex-col gap-[var(--gap-large)]">
            <h2
              id="request-title"
              className="flex gap-[var(--gap-small)] type-heading-secondary text-fg-neutral-primary"
            >
              클라이언트 요청 사항
              <span aria-hidden="true" className="text-fg-accent-notice">*</span>
            </h2>

            <InputField
              variant="textarea"
              required
              errorMessage={errorMessage}
              inputProps={{
                'aria-labelledby': 'request-title',
                placeholder: '클라이언트에게 받은 요청을 그대로 입력해주세요.',
                value: requestText,
                onChange: (event) => {
                  setRequestText(event.target.value);
                  setErrorMessage('');
                },
                className: 'h-80',
              }}
            />
          </section>
        </div>

        <div className="mt-auto flex justify-between">
          <ActionButton
            size="large"
            leftIcon={<img src={arrowLeftIcon} alt="" className="size-full" />}
            onClick={() => navigate(PATHS.projectInfo)}
          >
            프로젝트 정보 입력
          </ActionButton>
          <ActionButton
            size="large"
            variant="brandInverse"
            rightIcon={<img src={arrowRightIcon} alt="" className="size-full" />}
            onClick={handleAnalyzeClick}
            disabled={isAnalyzing}
          >
            AI 분석 결과
          </ActionButton>
        </div>
      </div>

      {hasAnalysisError && (
        <Snackbar
          message={ANALYSIS_ERROR_MESSAGE}
          onRetry={handleAnalyzeClick}
          onClose={() => setHasAnalysisError(false)}
          className="fixed top-[92px] right-10 z-10"
        />
      )}
    </main>
  );
}