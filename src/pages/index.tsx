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
import { FieldSkeleton } from '@/components/main/components/skeleton';
import { filterSchema } from '@/components/main/components/Fields/validation';
import { FiltersForm } from '@/components/vacancies/types';

import type { RootState } from '@/store/store/store';

const PARAM_PAGE = 'page';
const PARAM_FIELD = 'field';
const PARAM_FROM = 'from';
const PARAM_TO = 'to';

const Main = () => {
    const { email: user } = useAppSelector((state: RootState) => state.user);
    const { classes } = useStyles();
    const navigate = useRouter()
    const { pathname, query } = navigate;

    const page = Number(query[PARAM_PAGE]) || 1;
    const catalogue = query[PARAM_FIELD] || '';

    const paperRef = useRef<HTMLFormElement>(null);
    const values = { catalogues: '' }

    const { data: fields } = useQuery(['fields'], {
        queryFn: () => getFields(),
    });
    const { data: references } = useQuery(['typeWork'], {
        queryFn: () => getTime(),
    });
    const typeWorks = Object.values(references?.type_of_work || {})
    const countries = Object.values(references?.citizenship || {})

    const { handleSubmit, control, reset } = useForm<any>({ //any вместо FiltersForm
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

            // scrollToTop();
            navigate.push({
                pathname: '/vacancies',
                query: newParams.toString(),
            });
        },
        [navigate, pathname])

    const onSubmit = useCallback(
        (formValues: FiltersForm) => {

            onChangeFilters(formValues);
        },
        [onChangeFilters]
    );

    useEffect(() => {
        const newParams = new URLSearchParams();

        newParams.append(PARAM_PAGE, page.toString());
        if (catalogue) newParams.append(PARAM_FIELD, catalogue as string);

        navigate.push(`${pathname}?${newParams.toString()}`, undefined, { shallow: true });
    }, []);

    return (
        <Box className={classes.flex1}
            ref={paperRef}
            component="form"
            onSubmit={handleSubmit(onSubmit)}>
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
                            <div key={uuidv4()} >
                                <Controller
                                    name="catalogues"
                                    render={({ field }) => (
                                        <Button key={uuidv4()}
                                            variant="subtle"
                                            type='button'
                                            onClick={() => {
                                                field.onChange(f.key.toString());
                                                handleSubmit(onSubmit)();
                                            }}
                                        >
                                            {f.title_rus}
                                        </Button>
                                    )}
                                    control={control}
                                />

                            </div>

                        )
                        )) : (
                            <>
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                            </>

                        )}
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
                        {typeWorks ? (typeWorks?.slice(1).map((t) => (
                            <div key={uuidv4()} >
                                <Button key={uuidv4()} variant="subtle" type='submit'>
                                    {String(t)}
                                </Button>
                            </div>
                        ))
                        ) : (
                            <>
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />
                                <FieldSkeleton />

                            </>
                        )}
                    </Group>
                </Paper>
                <Paper
                    p={6}
                    pb={5}
                    pt={6}
                    withBorder
                    radius="md">
                    <Text className={classes.text}>ПО СТРАНАМ</Text>
                    <Group className={classes.columnsWrapper} position="center" spacing="xs" >
                        {countries?.map((c) => (
                            <Link key={uuidv4()} href='/vacancies'>
                                <Button key={uuidv4()} variant="subtle" type='submit'>
                                    {String(c)}
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
                    <Image src={Ballon} alt='ballon' priority />
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
                        <List.Item>Более 800 000 объявлений о вакансиях и резюме. Сайт Jobored помогает находить работу?
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
