import ResultPage from "../pages/ResultPage";
import { PATHS } from "./paths";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import LandingPage from "../pages/LandingPage";
import RequestPage from "../pages/RequestPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: PATHS.request, Component: RequestPage },
      { path: PATHS.result, Component: ResultPage },
      { path: "*", Component: LandingPage },
    ],
  },
]);
