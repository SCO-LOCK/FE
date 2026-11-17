import { MOCK_FINDINGS } from '../mocks/findings';
import type { Finding } from '../types/analysis';

const MOCK_DELAY_MS = 1500;

// TODO(#9): 실제 API 호출로 교체
export async function analyzeRequest(requestText: string): Promise<Finding[]> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  if (requestText.includes('에러')) {
    throw new Error('분석 실패 (테스트용)');
  }

  return MOCK_FINDINGS;
}