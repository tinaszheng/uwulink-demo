import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

const EXAMPLE_STR = 'uwulink{"method":"eth_sendTransaction","value":{"to":"0x3bEE7CD3Bbd61B1b6681E35c3bDe5A588d81c30a","from":"0x3bEE7CD3Bbd61B1b6681E35c3bDe5A588d81c30a","data":"0x","value":0},"chainId":1,"dapp":{"name":"Uwulink example","url":"www.uwulink.com","icon":""}}'
export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Head>
        <title>Uwulink</title>
        <meta name="description" content="SAY BYE TO WALLETCONNECT ?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        {!modalOpen && <div>
          <h1>🥺</h1>
          <div>👉 <button onClick={() => setModalOpen(true)} className={styles.tryItOutButton}>Try it out</button> 👈</div>
          <div>UwU Link</div>
          <div>Say goodbye to <div>Connect wallet</div></div>
        </div>
        }
        {modalOpen && <MintModal onClose={() => setModalOpen(false)} />}
      </div>
    </>
  )
}

function MintModal({ onClose }: { onClose: () => void }) {
  
  useEffect(() => {
    
  }, [])

  return (
    <div className={styles.mintModal}>
      <button className={styles.exitButton} onClick={onClose}>+</button>
      <div>Scan code to mint NFT </div>
      <QRCode size={256} value={EXAMPLE_STR} fgColor="#AA83FC" />
    </div>
  )
}
