import { Box, Group, Paper, Text } from '@mantine/core';
import Image from 'next/image';

import { RootState } from '@/store/store/store';
import { useAppSelector } from '@/utills/hooks';
import { Ballon } from '@/assets/img';
import { DefaultContainer } from '@/components/common/component';
import { useStyles } from '@/components/main/pages/Home/styles';
import { getFields } from '@/components/vacancies/api';

export async function getServerSideProps() {
    try {
        const fields = await getFields();

        return {
            props: {
                fields,
            }
        };

    } catch (error) {
        console.error('Error fetching datas:', error);
        return {
            props: {
                fields: [],
            }
        };
    }
}

const Main = ({ fields }) => {
    const { email: user } = useAppSelector((state: RootState) => state.user);
    const { classes } = useStyles();

    return (
        <DefaultContainer >

            <Group className={classes.columnsWrapper} position="center" spacing="xs" >
                {fields.map((f) => (
                    <div key={f.id}>
                        <Paper
                            key={f.id}
                            radius="md"
                            pb={11}
                            p={63}
                            pt={11}
                            withBorder

                        >
                            <Text c="blue">
                                {f.title_rus}
                            </Text>

                        </Paper>
                    </div>
                )
                )}


                <Image src={Ballon} alt='ballon' loading='lazy' />

            </Group>
        </DefaultContainer>

    );
};

export default Main;
