import type { NextPage } from 'next'
import localFont from 'next/font/local'
import classNames from 'classnames'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'
import QRCode from 'react-qr-code'

const gtMaru = localFont({ src: '../assets/GT-Maru-Mega-Midi.otf' })
const EXAMPLE_STR = 'uwulink{"method":"eth_sendTransaction","value":{"to":"0x3bEE7CD3Bbd61B1b6681E35c3bDe5A588d81c30a","from":"0x3bEE7CD3Bbd61B1b6681E35c3bDe5A588d81c30a","data":"0x","value":0},"chainId":1,"dapp":{"name":"Uwulink Example","url":"www.uwulink.com","icon":""}}'

const Home: NextPage = () => {

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
    <Head>
        <title>Uwulink</title>
        <meta name="description" content="SAY BYE TO WALLETCONNECT ?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className="h-screen flex flex-col items-center justify-center gap-7">
        {!modalOpen && <MainContent openModal={() => setModalOpen(true)} />}
        {modalOpen && <MintModal onClose={() => setModalOpen(false)} />}
      </div>
    </>
  )
}

function MainContent({ openModal }: { openModal: () => void }) {
  return (
    <>
      <span className='text-9xl'>
        🥺
      </span>
      <div className='w-full flex items-center justify-center'>
        <div className='flex flex-row gap-4 items-center justify-center'>
          <span className='text-7xl'>
            👉
          </span>
          <button onClick={openModal} className='border border-white rounded-2xl bg-white bg-opacity-20 hover:bg-opacity-40 px-8 py-2 transition-all duration-200'>
            <p className='text-white text-xl'>Try it out</p>
          </button>
          <span className='text-7xl'>
            👈
          </span>
        </div>
       
      </div>
      <h1 className={classNames(gtMaru.className, "text-8xl py-3 text-white")}>
        UwU Link
      </h1>
      <div className='flex flex-row gap-4 items-center justify-center opacity-50'>
        <span className='text-lg text-white'>
          Say goodbye to
        </span>
        <button className='border border-white rounded-2xl bg-white bg-opacity-0 hover:bg-opacity-10 cursor-not-allowed px-7 py-2 transition-all duration-200 relative flex flex-row'>
          <p className='text-white text-lg'>Connect wallet</p>
        </button>
      </div>
    </>
  )
}

function MintModal({ onClose }: { onClose: () => void }) {
  
  useEffect(() => {
    // start interval for querying for status
  }, [])

  return (
    <div className={styles.mintModal}>
      <button className={styles.exitButton} onClick={onClose}>+</button>
      <div>Scan code to mint NFT </div>
      <QRCode size={256} value={EXAMPLE_STR} fgColor="#AA83FC" />
    </div>
  )
}
export default Home
