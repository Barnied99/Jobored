import { useRouter } from 'next/router';

import { AuthForm } from '@/components/auth/api';
import { RootState } from '@/store/store/store';
import { useAppSelector } from '@/utills/hooks';


const SignIn = () => {
    const { email: user } = useAppSelector((state: RootState) => state.user);
    const router = useRouter()

    if (user) {
        router.push('/vacancies')
        return null
    }

    return (
        <AuthForm header='Вход' type='signin' />
    );
};

export default SignIn;
