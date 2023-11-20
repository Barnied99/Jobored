import { useRouter } from 'next/router';
import Head from 'next/head';

// import { AuthForm } from '@/components/auth/api';
import { RootState } from '@/store/store/store';
import { useAppSelector } from '@/utills/hooks';
// import { DefaultLayout } from '@/components/common/component';


const LogOut = () => {
    const { email: user } = useAppSelector((state: RootState) => state.user);
    const router = useRouter()

    if (!user) {
        router.push('/')
    }

    return (
        <Head>
            <title>Выход</title>
        </Head>
    );
};

export default LogOut;
