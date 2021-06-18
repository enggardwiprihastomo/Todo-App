import { AppProps } from "next/app"
import Head from 'next/head'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Todo List App</title>
        <link rel="icon" href="./ic-logo.svg" />
        <meta name="author" content="Enggar Dwi Prihastomo" />
        <meta name="description" content="Todo app to arrange your activities" />
        <meta name="keywords" content="Todo app, Next.JS, React, Typescript" />
      </Head>
      <Component {...pageProps} />
    </>)

}

export default MyApp
