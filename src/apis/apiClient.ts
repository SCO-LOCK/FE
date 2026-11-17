interface ApiErrorDetail {
  field: string;
  reason: string;
}

interface ApiErrorBody {
  code?: string;
  message?: string;
  traceId?: string;
  error?: {
    details?: ApiErrorDetail[];
  } | null;
}

interface ApiResponse<T> extends ApiErrorBody {
  data: T | null;
}

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');
const API_BASE_URL = import.meta.env.DEV && apiBaseUrl ? '/api' : apiBaseUrl;

export class ApiError extends Error {
  readonly status: number;
  readonly code: string | undefined;
  readonly traceId: string | undefined;
  readonly details: ApiErrorDetail[] | undefined;

  constructor(status: number, body: ApiErrorBody | null) {
    super(body?.message || `서버 요청에 실패했어요. (HTTP ${status})`);
    this.name = 'ApiError';
    this.status = status;
    this.code = body?.code;
    this.traceId = body?.traceId;
    this.details = body?.error?.details;
  }
}

export async function fetchData<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  const body: ApiResponse<T> | null = await response.json().catch(() => null);
  options?.signal?.throwIfAborted();

  if (!response.ok) {
    throw new ApiError(response.status, body);
  }

  if (body?.data == null) {
    throw new Error('서버 응답에 데이터가 없어요.');
  }

  return body.data;
}
