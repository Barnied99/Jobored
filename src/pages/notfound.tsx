// import Head from "next/head"

import { NotFound } from "@/components/not-found/pages"
import { DefaultLayout } from '@/components/common/component';


const Notfound = () => {
    return (
        <DefaultLayout title="Jobored|NotFound">

            <NotFound />
        </DefaultLayout>
    )
}

export default Notfound


