import Head from 'next/head'
// import Image from 'next/image'

import * as serviceWorker from '../serviceWorker';

// import styles from '@/styles/Home.module.css'


export const Home = () => {
  return (
    <>
      <Head>
        <title>
          поиск
        </title>
      </Head>
      <div>
        home
      </div>
    </>

  )
}

serviceWorker.unregister();

export default Home
