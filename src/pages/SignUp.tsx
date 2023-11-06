import { useRouter } from 'next/router';
import Head from 'next/head';

import { AuthForm } from '@/components/auth/api';
import { useAppSelector } from '@/utills/hooks';
import { RootState } from '@/store/store/store';

const SignUp = () => {
    const { email: user } = useAppSelector((state: RootState) => state.user);
    const router = useRouter()

    if (user) {
        router.push('/')
    }

    return (
        <>
            <Head>
                <title>Регистрация | Jobored</title>
            </Head>
            <AuthForm header='Регистрация' type='signup' />
        </>

    );
};

export default SignUp;





