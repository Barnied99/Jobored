import { Box, Group, Paper, Text } from '@mantine/core';
import Image from 'next/image';

import { RootState } from '@/store/store/store';
import { useAppSelector } from '@/utills/hooks';
import { Ballon } from '@/assets/img';
import { DefaultContainer } from '@/components/common/component';
import { useStyles } from '@/components/main/pages/Home/styles';


const Main = () => {
    const { email: user } = useAppSelector((state: RootState) => state.user);
    const { classes } = useStyles();

    return (
        <DefaultContainer >

            <Group className={classes.columnsWrapper} position="center" spacing="xs" >
                <Paper
                    radius="md"
                    pb={31}
                    p={43}
                    pt={30}
                    withBorder
                >
                    <Text c="blue">
                        Салам
                    </Text>

                </Paper>
                <Paper
                    radius="md"
                    pb={31}
                    p={43}
                    pt={30}
                    withBorder>
                    <Text c="blue">
                        Добро пожаловать
                    </Text>
                </Paper>
                <Paper
                    radius="md"
                    pb={31}
                    p={43}
                    pt={30}
                    withBorder
                >
                    <Text c="blue">
                        не знаю пока еще куда, но я обязательно придумаю для вас
                    </Text>

                </Paper>
                <Image src={Ballon} alt='ballon' loading='lazy' />

            </Group>
        </DefaultContainer>

    );
};

export default Main;
