import React from 'react';
import { Box, Button, Group, Paper, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAppSelector } from '@/utills/hooks';
import { Ballon } from '@/assets/img';
import { useStyles } from '@/components/main/pages/Home/styles';
import { getFields, getTime } from '@/components/vacancies/api';
import { FieldsHeader } from '@/components/main/components/FieldsHeader/skeleton';

import type { RootState } from '@/store/store/store';
import type { MainProps } from '@/components/main/pages/Home/types';


export async function getServerSideProps() {
    try {
        const fields = await getFields();
        const time = await getTime();
        return {
            props: {
                fields,
                time
            }
        };

    } catch (error) {
        console.error('Error fetching datas:', error);
        return {
            props: {
                fields: [],
                time: {}
            }
        };
    }
}


const Main: React.FC<MainProps> = ({ fields, time }) => {
    const { email: user } = useAppSelector((state: RootState) => state.user);
    const { classes } = useStyles();
    const typeWork = Object.values(time.type_of_work).slice(1)
    const navigate = useRouter()


    return (

        <Box className={classes.flex1} >
            <Stack spacing={13}>
                <Paper
                    p={13}
                    pb={11}
                    pt={10}
                    withBorder
                    radius="md"
                >
                    <Text className={classes.text}>ПО ОТРАСЛЯМ</Text>
                    <Group className={classes.columnsWrapper} position="center" spacing="xs" >
                        {fields ? (fields?.map((f) => (
                            <Link key={uuidv4()} href='/vacancies'>
                                <Button key={uuidv4()} variant="subtle" >
                                    {f.title_rus}
                                </Button>
                            </Link>

                        )
                        )) : <FieldsHeader />}
                    </Group>
                </Paper>
                <Paper
                    p={13}
                    pb={11}
                    pt={10}
                    withBorder
                    radius="md">
                    <Text className={classes.text}>ПО ГРАФИКУ</Text>
                    <Group className={classes.columnsWrapper} position="center" spacing="xs" >
                        {typeWork?.map((t) => (
                            <Link key={uuidv4()} href='/vacancies'>
                                <Button key={uuidv4()} variant="subtle" >
                                    {String(t)}
                                </Button>
                            </Link>

                        ))}
                    </Group>
                </Paper>
                <Paper
                    p={13}
                    pb={11}
                    pt={10}
                    withBorder
                    radius="md">
                    <Image src={Ballon} alt='ballon' loading='lazy' />
                    <Text> РАБОТА ЭТО ПРОСТО</Text>
                </Paper>

            </Stack>

        </Box >

    );
};

export default Main;
