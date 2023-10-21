import { yupResolver } from '@hookform/resolvers/yup';
import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Box, Button, Group, Paper, Stack, Text, List } from '@mantine/core';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';

import { useAppSelector } from '@/utills/hooks';
import { Ballon } from '@/assets/img';
import { useStyles } from '@/components/main/pages/Home/styles';
import { getFields, getTime } from '@/components/vacancies/api';
import { FieldsHeader } from '@/components/main/components/FieldsHeader/skeleton';

import { filterSchema } from '@/components/main/components/Fields/validation';

import { FiltersForm } from '@/components/vacancies/types';
import type { RootState } from '@/store/store/store';
// import type { MainProps } from '@/components/main/pages/Home/types';

// export async function getServerSideProps() {
//     try {
//         const fields = await getFields();
//         const time = await getTime();
//         return {
//             props: {
//                 fields,
//                 time
//             }
//         };

//     } catch (error) {
//         console.error('Error fetching datas:', error);
//         return {
//             props: {
//                 fields: [],
//                 time: {}
//             }
//         };
//     }
// }
const PARAM_PAGE = 'page';
const PARAM_FIELD = 'field';
const PARAM_FROM = 'from';
const PARAM_TO = 'to';

const Main = () => {
    const { email: user } = useAppSelector((state: RootState) => state.user);
    const { classes } = useStyles();
    const navigate = useRouter()
    const { pathname, query } = navigate;

    const paperRef = useRef<HTMLFormElement>(null);
    const values = { catalogues: '' }

    const { data: fields } = useQuery(['fields'], {
        queryFn: () => getFields(),
    });
    const { data: typeWork } = useQuery(['typeWork'], {
        queryFn: () => getTime(),
    });
    const typeWorks = Object.values(typeWork?.type_of_work || {})

    const { handleSubmit, control, reset } = useForm<any>({
        resolver: yupResolver(filterSchema),
        defaultValues: values,
    });

    const onChangeFilters = useCallback(
        (values: FiltersForm) => {
            const newParams = new URLSearchParams(navigate.query as any);

            newParams.delete(PARAM_FIELD);
            newParams.delete(PARAM_FROM);
            newParams.delete(PARAM_TO);

            newParams.set(PARAM_PAGE, '1');

            if (values.catalogues) newParams.set(PARAM_FIELD, values.catalogues);
            if (values.payment_from)
                newParams.set(PARAM_FROM, values.payment_from.toString());
            if (values.payment_to)
                newParams.set(PARAM_TO, values.payment_to.toString());

            // scrollToTop();
            navigate.push(`${pathname}?${newParams.toString()}`);
        },
        [navigate, pathname])

    const onSubmit = useCallback(
        (formValues: FiltersForm) => {
            const from = formValues.payment_from
                ? Number(formValues.payment_from)
                : '';

            const to = formValues.payment_to ? Number(formValues.payment_to) : '';

            onChangeFilters({
                catalogues: formValues.catalogues,
                payment_from: from,
                payment_to: to,
            });
        },
        [onChangeFilters]
    );



    return (

        <Box className={classes.flex1} >
            <Stack spacing={13}>
                <Paper
                    ref={paperRef}
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
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
                                <Controller
                                    name="catalogues"
                                    render={({ field }) => (

                                        <Button key={uuidv4()} variant="subtle" type='submit'
                                        >
                                            {f.title_rus}
                                        </Button>
                                    )}
                                    control={control}
                                />

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
                        {typeWorks?.map((t) => (
                            <Link key={uuidv4()} href='/vacancies'>
                                <Button key={uuidv4()} variant="subtle" type='submit'>
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
                    <Text variant="gradient"
                        gradient={{ from: 'indigo', to: 'pink', deg: 90 }}
                    > Работа в Москве</Text>
                    <List withPadding>
                        <List.Item>Свежие вакансии на Jobored в Москве от прямых работодателей, агентств, центров занятости.
                        </List.Item>
                        <List.Item>В нашей базе содержатся предложения для всех специальностей: с опытом и без опыта работы, подработка с ежедневной оплатой, поиск удаленной работы, работа вахтовым методом.
                        </List.Item>
                        <List.Item>Все самые популярные вакансии на сегодня, в городе Москва: Грузчик, Водитель, Курьер, Разнорабочий, Продавец-кассир, Продавец-консультант, Повар, Кладовщик, Охранник, Бухгалтер, Продавец, Подсобный рабочий и другие профессии.
                        </List.Item>
                        <List.Item>Актуальные объявления о работе в вашем городе! Удобный поиск свежих вакансий на сегодня!
                        </List.Item>
                    </List>
                    <Text variant="gradient"
                    >Работодателям</Text>
                    <List withPadding>
                        <List.Item>У нас вы найдете соискателей с нужными навыками и опытом работы, пригласите их на собеседование и выберете подходящего сотрудника.
                        </List.Item>
                        <List.Item>Более 800 000 объявлений о вакансиях и резюме. Сайт Jobored помогает находить работу и подобрать персонал!
                        </List.Item>
                    </List>
                    <Text variant="gradient"
                    >Соискателям</Text>
                    <List withPadding>
                        <List.Item>Создавайте резюме бесплатно и откликайтесь на свежие вакансии!
                        </List.Item>
                        <List.Item>Общайтесь с работодателем через чат, не обязательно звонить!
                        </List.Item>
                        <List.Item>Просматривайте статус рассмотрения вашего резюме и получайте приглашения на собеседование из личного кабинета!
                        </List.Item>
                    </List>
                </Paper>

            </Stack>

        </Box >

    );
};

export default Main;
