import type { Finding } from '../types/analysis';

export const MOCK_FINDINGS: Finding[] = [
  {
    type: 'baseline_change',
    title: '기존 제작 기준과 달라질 수 있어요',
    existing_baseline: '모델 의상: 검은 정장',
    request_excerpt: '모델을 좀 더 밝고 캐주얼한 느낌으로 바꾸고 전체적으로 더 트렌디하게 해주세요.',
    reason: "'캐주얼한 느낌'이 기존에 정한 모델 의상 변경까지 포함하는지 명확하지 않아요.",
    suggested_question: '말씀하신 캐주얼한 느낌은 모델의 의상 변경도 포함할까요?',
  },
  {
    type: 'ambiguous',
    title: '의미를 조금 더 확인하면 좋아요',
    existing_baseline: null,
    request_excerpt: '전체적으로 더 트렌디하게',
    reason: '색감, 카메라 움직임, 편집 속도 등 여러 방향으로 해석될 수 있습니다.',
    suggested_question:
      '트렌디하게 바꾸고 싶은 부분은 색감 및 분위기, 카메라 움직임, 편집 속도 중 어디에 가장 가까울까요?',
  },
];