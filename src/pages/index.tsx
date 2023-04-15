import type { NextPage } from 'next'
import localFont from 'next/font/local'
import classNames from 'classnames'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import styles from '@/styles/Home.module.css'
import QRCode from 'react-qr-code'
import { Contract, providers } from 'ethers'
import NFTAbi from '@/stuff/nft.json'
import { v4 as uuid } from 'uuid'
import { Nft__factory } from '../../types/ethers-contracts'

const gtMaru = localFont({ src: '../assets/GT-Maru-Mega-Midi.otf' })

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

const NFT_ADDRESS = '0x5A26dEe404E5b178374865F4D6091C072e77b458'
const PROVIDER = new providers.InfuraProvider(1, '8de2a7bb74884bf4b186765e3a85c0f7')
const WEBHOOK_ENDPOINT = 'http://167.172.101.13'
const NFTContract = Nft__factory.connect(NFT_ADDRESS, PROVIDER);

function MintModal({ onClose }: { onClose: () => void }) {
  const id = useRef(uuid())
  const [qrCodeValue, setQrCodeValue] = useState<string>()
  const [txHash, setTxHash] = useState<string>()
  const [status, setStatus] = useState<'pending' | 'success'>()

  const webhook = `${WEBHOOK_ENDPOINT}/${id.current}`

  useEffect(() => {
    async function setData() {
      const tx = await NFTContract.populateTransaction.mint()
      const txObject = { to: tx.to, data: tx.data, value: tx.value }
      const uwuLinkDetails = {
        method: "eth_sendTransaction",
        value: txObject,
        chainId: 1,
        dapp: {
          name: "Uwu NFT Mint",
          url: 'https://uwulink-demo.vercel.app/',
          icon: '',
        },
        webhook,
      }

      setQrCodeValue(`uwulink${JSON.stringify(uwuLinkDetails)}`)
    }

    setData()
  }, [])

  useEffect(() => {
    const updater = setInterval(async () => {
      try {
        const res = (await (await fetch(webhook)).json())
        if (res.data.data) {
          setTxHash(res.data.data)
          clearInterval(updater)
        }
      } catch (_) { }
    }, 1000)

    return () => clearInterval(updater)
  }, [])

  useEffect(() => {
    const updater = setInterval(async () => {
      if (!txHash) return

      try {
        const receipt = await PROVIDER.getTransactionReceipt(txHash)
        if (!receipt || receipt?.status === 0) {
          setStatus('pending')
        } else if (receipt?.status === 1) {
          setStatus('success')
          clearInterval(updater)
        }
      } catch (_) { }
    }, 500)

    return () => clearInterval(updater)
  }, [txHash])

  if (!qrCodeValue) return null

  return (
    <div className={styles.mintModal}>
      <button className={styles.exitButton} onClick={onClose}>+</button>
      <div className={styles.mintModalTitle}>Scan code to mint NFT </div>
      {status === 'pending' && <div style={{ height: 256, width: 256 }}>Pending</div>}
      {status === 'success' && <div style={{ height: 256, width: 256 }}>Success</div>}
      {!status && <QRCode size={256} value={qrCodeValue} fgColor="#AA83FC" />}
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-0">
          <p className='-mb-2'>🥺</p>
          <p>👉👈</p>
        </div>
        <div className='flex flex-row items-center justify-center'>
          <p className="text-sm text-gray-500">
            Powered by
            <span className={classNames(gtMaru.className, "text-lg")} style={{ color: "#F356EF" }}>
              {" "}UwU Link
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Home
