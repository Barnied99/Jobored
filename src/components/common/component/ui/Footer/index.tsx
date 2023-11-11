import { Container, Text, Group, Paper } from '@mantine/core';
import React from 'react';

import { useStyles } from './styles';



const Footer = (
) => {

    const { classes } = useStyles();

    return (
        <Container
        >
            <Paper
                p={3}
                pb={31}
                pt={20}
            >
                <Group className={classes.columnsWrapper}>
                    <Group className={classes.columnsWrapperGroup}>
                        <Text>dvkdkvdkjjdok</Text>
                        <Text>dvkdkvdkjjdok</Text>
                        <Text>dvkdkvdkjjdok</Text>
                    </Group>
                    <Group className={classes.columnsWrapperGroup}>
                        <Text>dvkdkvdkjjdok</Text>
                        <Text>dvkdkvdkjjdok</Text>
                        <Text>dvkdkvdkjjdok</Text>
                    </Group>
                    <Group className={classes.columnsWrapperGroup}>
                        <Text>dvkdkvdkjjdok</Text>
                        <Text>dvkdkvdkjjdok</Text>
                        <Text>dvkdkvdkjjdok</Text>
                    </Group>
                    <Group className={classes.columnsWrapperGroup}>
                        <Text>dvkdkvdkjjdok</Text>
                        <Text>dvkdkvdkjjdok</Text>
                        <Text>dvkdkvdkjjdok</Text>
                    </Group>
                    <Group className={classes.columnsWrapperGroup}>
                        <Text>dvkdkvdkjjdok</Text>
                        <Text>dvkdkvdkjjdok</Text>
                        <Text>dvkdkvdkjjdok</Text>
                    </Group>
                    <Group className={classes.columnsWrapperGroup}>
                        <Text>dvkdkvdkjjdok</Text>
                        <Text>dvkdkvdkjjdok</Text>
                        <Text>dvkdkvdkjjdok</Text>
                    </Group>
                </Group>
            </Paper>

        </Container>
    );
};

export default Footer;
