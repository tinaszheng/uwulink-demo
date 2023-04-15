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
const WEBHOOK_ENDPOINT = 'https://uwulink.xyz'
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
      <div className={styles.mintModalTitle}>
        {status === 'pending' ? "Minting..." : status === 'success' ? "Minted" : "Scan code to mint NFT"}
      </div>
      <div className='min-h-[256] min-w-[256]'>
        {status === 'pending' && (
          <div className='animate-spin'>
            <Spinner />
          </div>
        )
        }
        {status === 'success' && <Check />}
        {!status && <QRCode size={256} value={qrCodeValue} fgColor="#AA83FC" />}
      </div>
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

function Spinner() {
  return (
    <svg width="256" height="256" viewBox="0 0 297 296" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.1" d="M296.104 148C296.104 229.52 230.019 295.604 148.5 295.604C66.9804 295.604 0.895752 229.52 0.895752 148C0.895752 66.4805 66.9804 0.395844 148.5 0.395844C230.019 0.395844 296.104 66.4805 296.104 148ZM30.4166 148C30.4166 213.216 83.2843 266.083 148.5 266.083C213.716 266.083 266.583 213.216 266.583 148C266.583 82.7844 213.716 29.9167 148.5 29.9167C83.2843 29.9167 30.4166 82.7844 30.4166 148Z" fill="#5D6785" />
      <path d="M281.344 148C289.496 148 296.181 141.375 295.367 133.264C293.929 118.936 290.399 104.868 284.868 91.5143C277.451 73.6062 266.578 57.3344 252.872 43.6281C239.165 29.9218 222.894 19.0493 204.986 11.6315C191.632 6.10047 177.564 2.57092 163.236 1.13325C155.125 0.319405 148.5 7.00431 148.5 15.1563V15.1563C148.5 23.3082 155.134 29.8216 163.222 30.838C173.67 32.1509 183.919 34.8584 193.688 38.9052C208.015 44.8395 221.032 53.5374 231.997 64.5025C242.962 75.4675 251.66 88.4849 257.595 102.811C261.641 112.581 264.349 122.829 265.662 133.278C266.678 141.366 273.192 148 281.344 148V148Z" fill="#F356EF" />
    </svg>
  )
}

function Check() {
  return (
    <svg width="256" height="256" viewBox="0 0 285 285" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6.50903" y="6.99086" width="271.982" height="271.982" rx="135.991" stroke="#40B66B" stroke-width="12" stroke-linecap="round" />
      <path d="M199.87 99.9542L120.986 178.838L85.1299 142.982" stroke="#40B66B" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}