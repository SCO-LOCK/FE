import { useNavigate } from "react-router";
import ActionButton from "../components/common/ActionButton";
import { PATHS } from "../routes/paths";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-[var(--gap-medium)] p-4">
      <ActionButton
        variant="neutralInverse"
        size="large"
        onClick={() => navigate(PATHS.request)}
      >
        UT용 페이지로 이동하기
      </ActionButton>
    </main>
  );
}

export default LandingPage;
