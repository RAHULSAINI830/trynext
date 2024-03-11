// import Head from 'next/head';
// import '../styles/globals.css';
// import {SessionProvider} from 'next-auth/react'
// // export default function App({ Component, pageProps }) {
// //   return <Component {...pageProps} />
// // }
// function MyApp({ Component, pageProps }) {
//   return (
//     <>
//       <Head>
//       <meta name="SmartNeev" content="This is the description of my webpage." />
//         <title>SmartNeev</title>
//         <link rel="icon" href="favicon.ico" />
//       </Head>
//       <SessionProvider session={pageProps.session}>
//       <Component {...pageProps} />
//       </SessionProvider>
//     </>
//   );
// }

// export default MyApp;

import Head from "next/head";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { CityProvider } from "../components/selectCity";
import { Analytics } from '@vercel/analytics/react';
// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SmartNeev</title>
        <link rel="icon" href="/customlogo-removebg-preview.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <CityProvider>
          <Component {...pageProps} />
        </CityProvider>
      </SessionProvider>
      <Analytics/>
    </>
  );
}

export default MyApp;

// import Head from 'next/head';
// import '../styles/globals.css';
// import {SessionProvider} from 'next-auth/react'
// // export default function App({ Component, pageProps }) {
// //   return <Component {...pageProps} />
// // }
// function MyApp({ Component, pageProps }) {
//   return (
//     <>
//       <Head>
//       <meta name="SmartNeev" content="This is the description of my webpage." />
//         <title>SmartNeev</title>
//         <link rel="icon" href="favicon.ico" />
//       </Head>
//       <SessionProvider session={pageProps.session}>
//       <Component {...pageProps} />
//       </SessionProvider>
//     </>
//   );
// }
//
// export default MyApp;
