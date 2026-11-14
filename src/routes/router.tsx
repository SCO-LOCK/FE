import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import LandingPage from "../pages/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "*", Component: LandingPage },
    ],
  },
]);
