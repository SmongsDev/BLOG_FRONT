import type { AppProps } from "next/app";
import { ThemeProvider } from 'next-themes'

import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react"

const App = ({ Component, pageProps: { session, ...pageProps} }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" enableColorScheme={false}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};
export default App;