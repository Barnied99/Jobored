import Head from "next/head"

import { NotFound } from "@/components/not-found/pages"


const Notfound = () => {
    return (
        <>
            <Head>
                <title>Jobored|NotFound</title>
            </Head>
            <NotFound />
        </>
    )
}

export default Notfound


