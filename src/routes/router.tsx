import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import LandingPage from "../pages/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      {
        path: "design_system",
        lazy: async () => ({
          Component: (await import("../pages/design-system/DesignSystem"))
            .default,
        }),
      },

      { path: "*", Component: LandingPage },
    ],
  },
]);
