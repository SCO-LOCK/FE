const apiBaseUrl = process.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, "");

export const config = {
  framework: "vite",
  rewrites: [
    ...(apiBaseUrl
      ? [{ source: "/api/:path*", destination: `${apiBaseUrl}/:path*` }]
      : []),
    {
      source: "/((?!api(?:/|$)|assets(?:/|$)|.*\\.[^/]+$).*)",
      destination: "/index.html",
    },
  ],
};
