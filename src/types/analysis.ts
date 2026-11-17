export interface StartAnalysisData {
  analysisId: number;
}

export interface AnalysisItem {
  id: number;
  itemOrder: number;
  title?: string | null;
  classification: string;
  criteriaEvidence: string | null;
  requestExcerpt: string;
  reason: string;
  suggestedQuestion: string | null;
}

interface AnalysisProgress {
  id: number;
  currentStep?: string | null;
}

interface PendingAnalysis extends AnalysisProgress {
  status: 'PENDING' | 'RUNNING' | 'PROCESSING';
}

interface CompletedAnalysis extends AnalysisProgress {
  status: 'COMPLETED';
  reviewCount: number;
  items: AnalysisItem[];
}

interface FailedAnalysis extends AnalysisProgress {
  status: 'FAILED';
  errorCode?: string | null;
  message?: string | null;
}

export type Analysis = PendingAnalysis | CompletedAnalysis | FailedAnalysis;
