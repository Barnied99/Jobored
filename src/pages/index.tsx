import { Group, Text } from '@mantine/core';
import Image from 'next/image';

import { RootState } from '@/store/store/store';
import { useAppSelector } from '@/utills/hooks';
import { Ballon } from '@/assets/img';


const Main = () => {
    const { email: user } = useAppSelector((state: RootState) => state.user);

    return (
        <Group position="center" spacing="xs" >
            <Text c="blue">
                Добро пожаловать, {user?.slice(0, 11)}
            </Text>
            <Image src={Ballon} alt='ballon' />
        </Group>
    );
};

export default Main;
