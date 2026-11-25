import { Lottie } from "lottie-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ApiError } from "../apis/apiClient";
import {
  createClientRequest,
  getAnalysis,
  startAnalysis,
} from "../apis/requestAnalysis";
import ArrowLineIcon from "../assets/icons/ArrowLineIcon";
import loadingAnimation from "../assets/lottie/loading.json";
import ActionButton from "../components/common/ActionButton";
import AnalysisLoadingModal from "../components/common/AnalysisLoadingModal";
import { InputField } from "../components/common/input";
import Snackbar from "../components/common/Snackbar";
import AnalysisPageLayout from "../layout/AnalysisPageLayout";
import { parseRouteId, PATHS } from "../routes/paths";
import type { ClientRequest } from "../types/clientRequest";

const EMPTY_REQUEST_MESSAGE = "클라이언트 요청사항을 입력해주세요.";
const ANALYSIS_ERROR_MESSAGE =
  "분석을 요청하지 못했어요. 잠시 후 다시 시도해주세요.";
const QUERY_ERROR_MESSAGE =
  "분석 결과를 불러오지 못했어요. 연결을 확인한 뒤 다시 시도해주세요.";
const ANALYSIS_FAILED_MESSAGE = "AI가 요청 사항을 분석하지 못했어요.";
const POLLING_INTERVAL_MS = 2500;
const REQUEST_TEXT_STORAGE_KEY = "requestText";
const DEFAULT_PROJECT_ID = 1;

type RegisteredRequest = Pick<ClientRequest, "requestId" | "requestText">;

interface RequestFormProps {
  projectId: number | null;
}

function RequestForm({ projectId }: RequestFormProps) {
  const navigate = useNavigate();
  const storageKey =
    projectId === null
      ? REQUEST_TEXT_STORAGE_KEY
      : `${REQUEST_TEXT_STORAGE_KEY}:${projectId}`;
  const analysisIdStorageKey = `analysisId:${projectId}`;
  const submitControllerRef = useRef<AbortController | null>(null);
  const pollControllerRef = useRef<AbortController | null>(null);
  const registeredRequestRef = useRef<RegisteredRequest | null>(null);
  const [requestText, setRequestText] = useState(
    () => sessionStorage.getItem(storageKey) ?? "",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisError, setAnalysisError] = useState("");
  const [pollingAnalysisId, setPollingAnalysisId] = useState(() =>
    projectId === null
      ? null
      : parseRouteId(sessionStorage.getItem(analysisIdStorageKey)),
  );
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const isPolling = pollingAnalysisId !== null;

  useEffect(() => () => submitControllerRef.current?.abort(), []);

  useEffect(() => {
    if (pollingAnalysisId === null || projectId === null) return;

    const controller = new AbortController();
    const { signal } = controller;
    pollControllerRef.current = controller;
    let timeoutId: number | undefined;

    async function pollAnalysis(analysisId: number) {
      if (signal.aborted) return;

      try {
        const analysis = await getAnalysis(analysisId, signal);
        if (signal.aborted) return;

        if (
          analysis.status === "PENDING" ||
          analysis.status === "RUNNING" ||
          analysis.status === "PROCESSING"
        ) {
          setCurrentStep(analysis.currentStep ?? null);
          timeoutId = window.setTimeout(
            () => pollAnalysis(analysisId),
            POLLING_INTERVAL_MS,
          );
          return;
        }

        sessionStorage.removeItem(analysisIdStorageKey);
        setPollingAnalysisId(null);

        if (analysis.status === "FAILED") {
          setAnalysisError(analysis.message || ANALYSIS_FAILED_MESSAGE);
          return;
        }

        await navigate(
          `${PATHS.result}?projectId=${projectId}&analysisId=${analysisId}`,
          { state: { analysis } },
        );
      } catch (error) {
        if (signal.aborted) return;

        setPollingAnalysisId(null);
        setAnalysisError(
          error instanceof ApiError ? error.message : QUERY_ERROR_MESSAGE,
        );
      }
    }

    void pollAnalysis(pollingAnalysisId);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
      pollControllerRef.current = null;
    };
  }, [analysisIdStorageKey, navigate, pollingAnalysisId, projectId]);

  function handleCloseWait() {
    pollControllerRef.current?.abort();
    setPollingAnalysisId(null);
  }

  const handleAnalyzeClick = async () => {
    if (projectId === null || submitControllerRef.current || isPolling) return;

    if (requestText.trim() === "") {
      setErrorMessage(EMPTY_REQUEST_MESSAGE);
      return;
    }

    const controller = new AbortController();
    submitControllerRef.current = controller;
    setAnalysisError("");
    setIsSubmitting(true);

    try {
      const savedAnalysisId = parseRouteId(
        sessionStorage.getItem(analysisIdStorageKey),
      );
      if (
        savedAnalysisId !== null &&
        sessionStorage.getItem(storageKey) === requestText
      ) {
        setPollingAnalysisId(savedAnalysisId);
        return;
      }

      sessionStorage.removeItem(analysisIdStorageKey);
      sessionStorage.setItem(storageKey, requestText);
      let registeredRequest = registeredRequestRef.current;

      if (registeredRequest?.requestText !== requestText) {
        const { requestId } = await createClientRequest(
          projectId,
          { requestText },
          controller.signal,
        );
        registeredRequest = { requestId, requestText };
        registeredRequestRef.current = registeredRequest;
      }

      const { analysisId } = await startAnalysis(
        projectId,
        registeredRequest.requestId,
        controller.signal,
      );
      sessionStorage.setItem(analysisIdStorageKey, String(analysisId));
      setCurrentStep(null);
      setPollingAnalysisId(analysisId);
    } catch (error) {
      if (controller.signal.aborted) return;

      if (error instanceof ApiError) {
        const requestTextError = error.details?.find(
          ({ field }) => field === "requestText",
        );

        if (requestTextError) {
          setErrorMessage(requestTextError.reason);
          return;
        }

        if (error.code === "REQUEST404") {
          registeredRequestRef.current = null;
        }
        setAnalysisError(error.message);
      } else {
        setAnalysisError(ANALYSIS_ERROR_MESSAGE);
      }
    } finally {
      submitControllerRef.current = null;
      if (!controller.signal.aborted) setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnalysisPageLayout
        currentStep={2}
        title="요청 사항 입력"
        description="클라이언트의 요청 사항을 입력하면 제작 전에 다시 확인해야 할 내용을 찾아줘요."
        actions={
          <>
            <ActionButton
              size="large"
              leftIcon={<ArrowLineIcon direction="left" />}
              onClick={() => {
                // TODO: 프로젝트 정보 입력 페이지 연결
              }}
            >
              프로젝트 정보 입력
            </ActionButton>
            <ActionButton
              size="large"
              variant="brandInverse"
              rightIcon={<ArrowLineIcon />}
              onClick={handleAnalyzeClick}
              disabled={isSubmitting || isPolling || projectId === null}
            >
              {isSubmitting ? "분석 요청 중" : "AI 분석 결과"}
            </ActionButton>
          </>
        }
      >
        <section className="flex flex-col gap-(--gap-large)">
          <h2
            id="request-title"
            className="flex gap-(--gap-small) type-heading-secondary text-fg-neutral-primary"
          >
            클라이언트 요청 사항
            <span aria-hidden="true" className="text-fg-accent-notice">
              *
            </span>
          </h2>

          <InputField
            variant="textarea"
            required
            errorMessage={errorMessage}
            inputProps={{
              "aria-labelledby": "request-title",
              placeholder: "클라이언트에게 받은 요청을 그대로 입력해주세요.",
              value: requestText,
              readOnly: isSubmitting || isPolling,
              onChange: (event) => {
                setRequestText(event.target.value);
                setErrorMessage("");
                setAnalysisError("");
              },
              className: "h-60 md:h-80",
            }}
          />
          {projectId === null && (
            <p
              role="status"
              className="type-body-medium text-fg-accent-negative"
            >
              분석할 프로젝트를 먼저 선택해주세요.
            </p>
          )}
        </section>
      </AnalysisPageLayout>

      {analysisError && (
        <Snackbar
          message={analysisError}
          onRetry={handleAnalyzeClick}
          onClose={() => setAnalysisError("")}
          className="fixed top-16 right-(--grid-page-margin) z-10 lg:top-23 lg:right-10"
        />
      )}
      <AnalysisLoadingModal
        isPending={isPolling}
        currentStep={currentStep}
        cancelLabel="분석 대기 닫기"
        onCancel={handleCloseWait}
        animation={
          isPolling && (
            <Lottie
              src={loadingAnimation}
              autoplay
              loop
              className="size-full"
            />
          )
        }
      />
    </>
  );
}

export default function RequestPage() {
  const [searchParams] = useSearchParams();
  const projectIdParam = searchParams.get("projectId");
  // 프로젝트 선택 화면 연결 전까지 기본 프로젝트를 사용합니다.
  const projectId =
    projectIdParam === null ? DEFAULT_PROJECT_ID : parseRouteId(projectIdParam);

  return <RequestForm key={projectId} projectId={projectId} />;
}
