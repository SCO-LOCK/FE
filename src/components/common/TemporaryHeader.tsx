import LogoutIcon from "../../assets/icons/exit.svg?react";
import MyProjectsIcon from "../../assets/icons/my-projects.svg?react";
import scolockLogo from "../../assets/scolock-logo.svg";

interface TemporaryHeaderProps {
  onProjectsClick?: () => void;
  onLogout?: () => void;
}

const ACTION_CLASS_NAME =
  "flex h-10 min-w-10 items-center justify-center rounded-sm border-0 bg-transparent px-2 enabled:cursor-pointer enabled:hover:bg-bg-interactive-transparent-hover enabled:active:bg-bg-interactive-transparent-pressed focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fg-neutral-primary";

export default function TemporaryHeader({
  onProjectsClick,
  onLogout,
}: TemporaryHeaderProps) {
  return (
    <header
      lang="ko"
      className="flex h-10 shrink-0 items-center justify-between bg-bg-neutral-default px-4 text-fg-neutral-primary md:px-8 lg:px-12 min-[1425px]:px-24"
    >
      <a
        href={import.meta.env.BASE_URL}
        aria-label="SCOLOCK 홈"
        className="flex h-full shrink-0 items-center rounded-sm pr-[9px] pl-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fg-neutral-primary"
      >
        <img src={scolockLogo} alt="" width={164} height={24} />
      </a>

      <div className="flex shrink-0 items-center gap-1 min-[1425px]:min-w-[174px] min-[1425px]:justify-between min-[1425px]:gap-0 min-[1425px]:pl-3.5">
        <button
          type="button"
          className={`${ACTION_CLASS_NAME} type-action-medium-strong gap-1 text-fg-neutral-primary`}
          onClick={onProjectsClick}
          disabled={!onProjectsClick}
        >
          <MyProjectsIcon aria-hidden="true" className="text-(--palette-static-black)" />
          <span className="whitespace-nowrap max-[390px]:sr-only">
            내 프로젝트
          </span>
        </button>
        <button
          type="button"
          aria-label="로그아웃"
          className={`${ACTION_CLASS_NAME} size-10`}
          onClick={onLogout}
          disabled={!onLogout}
        >
          <LogoutIcon aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
