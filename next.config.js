/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin allow-popups",
          },
        ],
      },
    ];
  },
  env: {
    GOOGLE_CLIENT_ID : '911588995731-h3sssq8apenpmcnrfiekf5ssugahovvh.apps.googleusercontent.com',
    BACKEND_ADDRESS : 'http://localhost:8000',
  }
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/landingpage",
  //       permanent: false,
  //     },
  //   ];
  // },
};
