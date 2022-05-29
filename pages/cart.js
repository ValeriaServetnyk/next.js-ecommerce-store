import Head from 'next/head';



export default function About() {
  return (
  <div>
      <Head>
        <title>Home page</title>
        <meta name="description" content="About the app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          About the shop
        </h1>
      </main>
    </div>
  )
}