import { useRouter } from 'next/router';
// import Head from 'next/head';

import { AuthForm } from '@/components/auth/api';
import { useAppSelector } from '@/utills/hooks';
import { RootState } from '@/store/store/store';
import { DefaultLayout } from '@/components/common/component';

const SignUp = () => {
    const { email: user } = useAppSelector((state: RootState) => state.user);
    const router = useRouter()

    if (user) {
        router.push('/')
    }

    return (
        <DefaultLayout title="Регистрация | Jobored">
            <AuthForm header='Регистрация' type='signup' />
        </DefaultLayout>

    );
};

export default SignUp;





