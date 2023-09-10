import "tailwindcss/tailwind.css";

import React from "react";
import { Windmill } from "@roketid/windmill-react-ui";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContextProvider } from "context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  const googleClientId =
    "911588995731-h3sssq8apenpmcnrfiekf5ssugahovvh.apps.googleusercontent.com";

  // "395785444978-7b9v7l0ap2h3308528vu1ddnt3rqftjc.apps.googleusercontent.com";
  // suppress useLayoutEffect warnings when running outside a browser
  if (!process.browser) React.useLayoutEffect = React.useEffect;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthContextProvider>
        <Windmill usePreferences={true}>
          <Component {...pageProps} />
        </Windmill>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  );
}
export default MyApp;
