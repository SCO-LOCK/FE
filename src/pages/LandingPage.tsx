import { Link } from "react-router";

function LandingPage() {
  return (
    <main className="flex flex-1 flex-col items-center px-(--grid-margin) py-(--padding-3xlarge)">
      <Link to="/common_components" className="text-fg-accent-positive underline">
        공용 컴포넌트 확인하러 가기
      </Link>
    </main>
  );
}

export default LandingPage;
