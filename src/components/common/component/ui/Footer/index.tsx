import { Container, Text, Group, Paper } from '@mantine/core';
import React from 'react';
import Link from 'next/link';
import { useStyles } from './styles';



const Footer = (
) => {

    const { classes } = useStyles();

    return (
        <Container
        >
            <footer>
                <Paper
                    p={3}
                    pb={11}
                    pt={20}
                >
                    <Group className={classes.columnsWrapper}>
                        <Group className={classes.columnsWrapperGroup}>
                            <Text fw={700}>Партнерам</Text>
                            <Link href='https://www.superjob.ru/targetirovannaya_reklama/?utm_source=superjob&utm_campaign=desktop_footer'>
                                <Text c="dark">Реклама на сайте</Text>
                            </Link>
                            <Link href='https://www.superjob.ru/integration/'>
                                <Text c="dark">Интеграционные сервисы</Text>
                            </Link>
                            <Link href='https://www.superjob.ru/reklama_vakansii/?utm_source=superjob&utm_campaign=desktop_footer'>
                                <Text c="dark">Продвижение вакансий</Text>
                            </Link>
                        </Group>
                        <Group className={classes.columnsWrapperGroup}>
                            <Text fw={700}>SuperJob</Text>
                            <Link href='https://www.superjob.ru/clients/superjob-14449.html'>
                                <Text c="dark">О компании</Text>
                            </Link>
                            <Link href='https://superjob.tech/'>
                                <Text c="dark">SuperJob.tech</Text>
                            </Link>
                            <Link href='https://www.superjob.ru/news/'>
                                <Text c="dark">Новости сервиса</Text>
                            </Link>
                            <Link href='https://www.superjob.ru/clients/superjob-14449.html'>
                                <Text c="dark">Работа в SuperJob</Text>
                            </Link>
                            <Link href='https://www.superjob.ru/research/'>
                                <Text c="dark">Исследования</Text>
                            </Link>
                            <Link href='https://www.superjob.ru/proforientaciya-superjob/'>
                                <Text c="dark">Профориентация</Text>
                            </Link>
                            <Link href='https://www.superjob.ru/kalkulyatory/'>
                                <Text c="dark">Калькуляторы</Text>
                            </Link>
                        </Group>
                        <Group className={classes.columnsWrapperGroup}>
                            <Text fw={700}>Документы</Text>
                            <Link href='https://www.superjob.ru/info/hr_service.html'>
                                <Text c="dark">База данных SuperJob</Text>
                            </Link>
                            <Link href='https://www.superjob.ru/info/rtb_service.html'>
                                <Text c="dark">Рекламный кабинет</Text>
                            </Link>
                            <Link href='https://www.superjob.ru/info/course-license-agreement/'>
                                <Text c="dark">Агрегатор образовательных курсов </Text>
                            </Link>
                            <Link href='https://www.superjob.ru/hr/billing/documents.html'>
                                <Text c="dark">Иные документы </Text>
                            </Link>
                        </Group>
                        <Group className={classes.columnsWrapperGroup}>
                            <Text fw={700}>Работодателям</Text>
                            <Link href='https://www.superjob.ru/hr/vacancy/create/'>
                                <Text c="dark">Разместить вакансию</Text>
                            </Link>
                            <Link href='https://www.superjob.ru/aboutsuperstart'>
                                <Text c="dark">Найти стажера</Text>
                            </Link>
                            <Link href='https://www.superjob.ru/hr/bill.html'>
                                <Text c="dark">Тарифы</Text>
                            </Link>
                        </Group>
                        <Group className={classes.columnsWrapperGroup}>
                            <Text fw={700}>Соискателям</Text>
                            <Link href='https://www.superjob.ru/resume/create/'>
                                <Text c="dark">Создать резюме</Text>
                            </Link>
                            <Link href='https://www.superjob.ru/vakansii/'>
                                <Text c="dark">Поиск работы</Text>
                            </Link>
                            <Link href='https://students.superjob.ru/'>
                                <Text c="dark">Работа для студентов</Text>
                            </Link>
                        </Group>
                    </Group>
                </Paper>
            </footer>


        </Container>
    );
};

export default Footer;
