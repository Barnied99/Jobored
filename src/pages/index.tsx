import { Group, Text } from '@mantine/core';
import Image from 'next/image';

import { RootState } from '@/store/store/store';
import { useAppSelector } from '@/utills/hooks';
import { Ballon } from '@/assets/img';


const SignIn = () => {
    const { email: user } = useAppSelector((state: RootState) => state.user);



    return (
        <Group >
            <Text c="blue">
                Добро пожаловать {user}
            </Text>
            <Image src={Ballon} alt='ballon' />

        </Group>

    );
};

export default SignIn;
