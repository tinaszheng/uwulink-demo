import type { NextPage } from 'next'
import localFont from 'next/font/local'
import classNames from 'classnames'
import Head from 'next/head'

const gtMaru = localFont({ src: '../assets/GT-Maru-Mega-Midi.otf' })

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Uwulink</title>
        <meta name="description" content="SAY BYE TO WALLETCONNECT ?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen flex flex-col items-center justify-center gap-7">
        <span className='text-9xl'>
          🥺
        </span>
        <div className='w-full flex items-center justify-center'>
          <div className='flex flex-row gap-4 items-center justify-center'>
            <span className='text-7xl'>
              👉
            </span>
            <button className='border border-white rounded-2xl bg-white bg-opacity-20 hover:bg-opacity-40 px-8 py-2 transition-all duration-200'>
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
      </div>
    </>
  )
}

export default Home
