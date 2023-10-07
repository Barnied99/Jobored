import { useRouter } from 'next/router';

import { AuthForm } from '@/components/auth/api';
import { RootState } from '@/store/store/store';
import { useAppSelector } from '@/utills/hooks';


const SignUp = () => {
    const { email: user } = useAppSelector((state: RootState) => state.user);
    const router = useRouter()

    if (user) {
        router.push('/vacancies')
        // return null
    }

    return <AuthForm header='Регистрация' type='signup' />;
};

export default SignUp;





