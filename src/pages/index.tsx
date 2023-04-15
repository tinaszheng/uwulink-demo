import Head from 'next/head'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Uwulink</title>
        <meta name="description" content="SAY BYE TO WALLETCONNECT ?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div>
          <h1>🥺</h1>
          <div>👉 <button className={styles.tryItOutButton}>Try it out</button> 👈</div>
          <div>UwU Link</div>
          <div>Say goodbye to <div>Connect wallet</div></div>
        </div>
      </div>
    </>
  )
}
