import { useState } from "react";
import Divider from "../components/common/Divider";
import ErrorMessage from "../components/common/ErrorMessage";
import TemporaryHeader from "../components/common/TemporaryHeader";
import { InputField } from "../components/common/input";

const CARD_CLASS_NAME =
  "flex min-w-0 flex-col gap-(--gap-medium) rounded-(--radius-medium) bg-bg-neutral-default p-(--padding-large)";
const HALF_CARD_CLASS_NAME = `${CARD_CLASS_NAME} col-span-full min-[768px]:col-span-3 min-[1024px]:col-span-6`;

export default function CommonComponentsPage() {
  const [hasError, setHasError] = useState(false);
  const [headerAction, setHeaderAction] = useState("");

  function handleProjectsClick() {
    setHeaderAction("내 프로젝트 버튼을 눌렀습니다.");
  }

  function handleLogout() {
    setHeaderAction("로그아웃 버튼을 눌렀습니다.");
  }

  return (
    <main className="page-grid flex-1 gap-y-(--gap-2xlarge) bg-bg-neutral-weak py-(--padding-3xlarge)">
      <h1 className="type-heading-primary col-span-full">공용 컴포넌트</h1>

      <section
        aria-labelledby="preview-header"
        className="col-span-full flex min-w-0 flex-col gap-(--gap-medium)"
      >
        <h2 id="preview-header" className="type-heading-tertiary">
          TemporaryHeader
        </h2>
        <div className="-mx-(--grid-margin) border-y border-border-neutral-subtle">
          <TemporaryHeader
            onProjectsClick={handleProjectsClick}
            onLogout={handleLogout}
          />
        </div>
        <p role="status" className="type-body-small text-fg-neutral-secondary">
          {headerAction || "헤더의 버튼을 눌러 동작을 확인할 수 있습니다."}
        </p>
      </section>

      <label className="type-body-medium col-span-full flex w-fit items-center gap-(--gap-small)">
        <input
          type="checkbox"
          checked={hasError}
          onChange={(event) => setHasError(event.currentTarget.checked)}
        />
        입력 컴포넌트 오류 상태 보기
      </label>

      <section aria-labelledby="preview-input" className={HALF_CARD_CLASS_NAME}>
        <h2 id="preview-input" className="type-heading-tertiary">
          InputField · 한 줄 입력
        </h2>
        <InputField
          hasError={hasError}
          inputProps={{ placeholder: "한 줄을 입력하세요" }}
        />
      </section>

      <section
        aria-labelledby="preview-input-area"
        className={HALF_CARD_CLASS_NAME}
      >
        <h2 id="preview-input-area" className="type-heading-tertiary">
          InputField · 여러 줄 입력
        </h2>
        <InputField
          variant="textarea"
          hasError={hasError}
          inputProps={{ placeholder: "여러 줄을 입력하세요" }}
        />
      </section>

      <section
        aria-labelledby="preview-input-field"
        className={HALF_CARD_CLASS_NAME}
      >
        <h2 id="preview-input-field" className="type-heading-tertiary">
          InputField · 라벨과 오류 메시지
        </h2>
        <InputField
          label="프로젝트 이름"
          required
          errorMessage={hasError ? "프로젝트 이름을 확인해 주세요." : undefined}
          inputProps={{ placeholder: "프로젝트 이름을 입력하세요" }}
        />
        <InputField
          variant="textarea"
          label="프로젝트 설명"
          errorMessage={hasError ? "프로젝트 설명을 확인해 주세요." : undefined}
          inputProps={{ placeholder: "프로젝트 설명을 입력하세요" }}
        />
      </section>

      <section
        aria-labelledby="preview-error-message"
        className={HALF_CARD_CLASS_NAME}
      >
        <h2 id="preview-error-message" className="type-heading-tertiary">
          ErrorMessage
        </h2>
        <ErrorMessage message="프로젝트 이름을 입력해 주세요." />
      </section>

      <section
        aria-labelledby="preview-divider"
        className={`${CARD_CLASS_NAME} col-span-full`}
      >
        <h2 id="preview-divider" className="type-heading-tertiary">
          Divider
        </h2>
        <Divider />
      </section>
    </main>
  );
}
