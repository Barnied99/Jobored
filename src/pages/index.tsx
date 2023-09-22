import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head'


// import styles from '@/styles/Home.module.css'


export const Home = () => {

  const router = useRouter()


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


export default Home
