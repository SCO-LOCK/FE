import { Link } from "react-router";

function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link to="/design_system" className="text-blue-500">
        디자인 시스템 확인하러 가기
      </Link>
    </main>
  );
}

export default LandingPage;
