import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router';
import { ApiError } from '../apis/apiClient';
import { getAnalysis } from '../apis/requestAnalysis';
import ArrowLineIcon from '../assets/icons/ArrowLineIcon';
import ActionButton from '../components/common/ActionButton';
import Snackbar from '../components/common/Snackbar';
import ReportCard from '../components/report/ReportCard';
import ReportCardInteractive from '../components/report/ReportCardInteractive';
import ReportCardItem from '../components/report/ReportCardItem';
import AnalysisPageLayout from '../layout/AnalysisPageLayout';
import { parseRouteId, PATHS } from '../routes/paths';
import type { Analysis } from '../types/analysis';

const QUERY_ERROR_MESSAGE = '분석 결과를 불러오지 못했어요. 연결을 확인한 뒤 다시 시도해주세요.';
const ANALYSIS_FAILED_MESSAGE = 'AI가 요청 사항을 분석하지 못했어요.';

interface AnalysisResultProps {
  analysisId: number;
  initialAnalysis: Analysis | null;
  requestPath: string;
}

interface AnalysisResultLocationState {
  analysis?: Analysis;
}

function AnalysisResult({ analysisId, initialAnalysis, requestPath }: AnalysisResultProps) {
  const navigate = useNavigate();
  const [fetchedAnalysis, setFetchedAnalysis] = useState<Analysis | null>(null);
  const [queryError, setQueryError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [copyFeedback, setCopyFeedback] = useState<{
    variant: 'success' | 'error';
    content: string;
  } | null>(null);

  useEffect(() => {
    if (initialAnalysis) return;

    const controller = new AbortController();
    const { signal } = controller;

    async function loadAnalysis() {
      try {
        const result = await getAnalysis(analysisId, signal);
        if (signal.aborted) return;

        setFetchedAnalysis(result);
      } catch (error) {
        if (signal.aborted) return;

        setQueryError(error instanceof ApiError ? error.message : QUERY_ERROR_MESSAGE);
      }
    }

    void loadAnalysis();

    return () => controller.abort();
  }, [analysisId, initialAnalysis, retryCount]);

  const analysis = initialAnalysis ?? fetchedAnalysis;
  const isWaitingForAnalysis =
    analysis?.status === 'PENDING' ||
    analysis?.status === 'RUNNING' ||
    analysis?.status === 'PROCESSING';
  const completedAnalysis = analysis?.status === 'COMPLETED' ? analysis : null;
  const items = completedAnalysis?.items.toSorted((first, second) => first.itemOrder - second.itemOrder);

  function handleRetry() {
    setQueryError('');
    setFetchedAnalysis(null);
    setRetryCount((count) => count + 1);
  }

  async function handleCopy(content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopyFeedback({ variant: 'success', content });
    } catch {
      setCopyFeedback({ variant: 'error', content });
    }
  }

  return (
    <>
      <AnalysisPageLayout
        currentStep={3}
        title="AI 분석 결과"
        description="AI가 클라이언트의 요청 사항을 분석해 제작 전 확인해야 할 내용을 정리했어요."
        actions={
          <>
            <ActionButton
              size="large"
              leftIcon={<ArrowLineIcon direction="left" />}
              onClick={() => navigate(requestPath)}
            >
              요청 사항 입력
            </ActionButton>
            <ActionButton
              size="large"
              variant="brandInverse"
              rightIcon={<ArrowLineIcon />}
              onClick={() => navigate(PATHS.home)}
            >
              홈
            </ActionButton>
          </>
        }
      >
        {queryError && (
          <div className="flex flex-col items-start gap-(--gap-medium)">
            <p role="alert" className="type-body-medium text-fg-accent-negative">{queryError}</p>
            <ActionButton onClick={handleRetry}>다시 시도</ActionButton>
          </div>
        )}

        {!queryError && !analysis && (
          <p role="status" className="type-body-medium text-fg-neutral-secondary">
            분석 결과를 불러오고 있어요.
          </p>
        )}

        {!queryError && isWaitingForAnalysis && (
          <div className="flex flex-col items-start gap-(--gap-medium)">
            <p role="status" className="type-body-medium text-fg-neutral-secondary">
              아직 분석 중이에요.
            </p>
            <ActionButton onClick={handleRetry}>다시 조회</ActionButton>
          </div>
        )}

        {analysis?.status === 'FAILED' && (
          <p role="alert" className="type-body-medium text-fg-accent-negative">
            {analysis.message || ANALYSIS_FAILED_MESSAGE}
          </p>
        )}

        {completedAnalysis && items && (
          <section className="flex flex-col gap-(--gap-large)">
            <h2 className="flex gap-(--gap-small) type-heading-secondary text-fg-neutral-primary">
              제작 전에 확인해야 할 사항
              <span className="text-fg-accent-notice">
                {completedAnalysis.reviewCount ?? items.length}
              </span>
            </h2>

            {items.length === 0 ? (
              <p className="flex h-36 items-center justify-center text-center type-body-medium text-fg-neutral-tertiary">
                추가로 확인할 중요한 내용을 찾지 못했어요.
              </p>
            ) : (
              <div className="flex flex-col gap-(--gap-xlarge)">
                {items.map((item) => {
                  const suggestedQuestion = item.suggestedQuestion;

                  return (
                    <ReportCard
                      key={item.id}
                      title={item.title || item.requestExcerpt}
                      footer={suggestedQuestion && (
                        <ReportCardInteractive
                          title="질문 예시"
                          content={suggestedQuestion}
                          onClick={() => void handleCopy(suggestedQuestion)}
                        />
                      )}
                    >
                      {item.criteriaEvidence && (
                        <ReportCardItem title="기존 제작 기준" content={item.criteriaEvidence} />
                      )}
                      <ReportCardItem
                        title="새 요청사항"
                        content={item.requestExcerpt}
                        message={item.reason}
                      />
                    </ReportCard>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </AnalysisPageLayout>
      {copyFeedback && (
        <Snackbar
          variant={copyFeedback.variant}
          message={
            copyFeedback.variant === 'success'
              ? '질문이 클립보드에 복사되었어요.'
              : '질문 복사에 실패했어요.'
          }
          onRetry={() => void handleCopy(copyFeedback.content)}
          onClose={() => setCopyFeedback(null)}
          className="fixed top-16 right-(--grid-margin) z-10 lg:top-23 lg:right-10"
        />
      )}
    </>
  );
}

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const { state } = useLocation() as { state: AnalysisResultLocationState | null };
  const projectId = parseRouteId(searchParams.get('projectId'));
  const analysisId = parseRouteId(searchParams.get('analysisId'));
  const requestPath = projectId === null ? PATHS.request : `${PATHS.request}?projectId=${projectId}`;

  if (analysisId === null) {
    return <Navigate to={requestPath} replace />;
  }

  const analysis = state?.analysis;
  const initialAnalysis = analysis?.status === 'COMPLETED' && analysis.id === analysisId ? analysis : null;

  return (
    <AnalysisResult
      key={analysisId}
      analysisId={analysisId}
      initialAnalysis={initialAnalysis}
      requestPath={requestPath}
    />
  );
}
