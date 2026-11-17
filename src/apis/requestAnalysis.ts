import type { Analysis, StartAnalysisData } from '../types/analysis';
import type {
  ClientRequest,
  CreateClientRequestBody,
  CreateClientRequestData,
} from '../types/clientRequest';
import { fetchData } from './apiClient';

export async function createClientRequest(
  projectId: number,
  body: CreateClientRequestBody,
  signal?: AbortSignal,
): Promise<ClientRequest> {
  const data = await fetchData<CreateClientRequestData>(`/projects/${projectId}/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  });
  const requestId = 'requestId' in data ? data.requestId : data.id;

  if (!Number.isSafeInteger(requestId) || requestId <= 0) {
    throw new Error('등록된 요청의 ID를 받지 못했어요.');
  }

  return {
    requestId,
    projectId: data.projectId,
    requestText: data.requestText,
    createdAt: data.createdAt,
  };
}

export async function startAnalysis(
  projectId: number,
  requestId: number,
  signal?: AbortSignal,
): Promise<StartAnalysisData> {
  const data = await fetchData<StartAnalysisData>(
    `/projects/${projectId}/requests/${requestId}/analyses`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal },
  );

  if (!Number.isSafeInteger(data.analysisId) || data.analysisId <= 0) {
    throw new Error('접수된 분석의 ID를 받지 못했어요.');
  }

  return data;
}

export async function getAnalysis(analysisId: number, signal?: AbortSignal): Promise<Analysis> {
  const analysis = await fetchData<Analysis>(`/analyses/${analysisId}`, { cache: 'no-store', signal });

  switch (analysis.status) {
    case 'PENDING':
    case 'RUNNING':
    case 'PROCESSING':
    case 'FAILED':
      return analysis;
    case 'COMPLETED':
      if (!Array.isArray(analysis.items)) {
        throw new Error('완료된 분석의 결과를 받지 못했어요.');
      }
      return analysis;
    default:
      throw new Error('서버가 알 수 없는 분석 상태를 반환했어요.');
  }
}
