export interface Finding {
  type: 'missing_info' | 'ambiguous' | 'baseline_change' | 'technical_check';
  title: string;
  existing_baseline: string | null;
  request_excerpt: string;
  reason: string;
  suggested_question: string;
}