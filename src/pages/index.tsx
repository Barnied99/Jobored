import { yupResolver } from '@hookform/resolvers/yup';
import React, { useRef, useEffect, useCallback } from 'react';
import { Box, Button, Group, Paper, Stack, Text, List } from '@mantine/core';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import { useQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import Head from 'next/head';

// import { useAppSelector } from '@/utills/hooks';
import { Ballon } from '@/assets/img';
import { useStyles } from '@/components/main/pages/Home/styles';
import { getFields, getTime } from '@/components/vacancies/api';
import { FieldSkeleton } from '@/components/main/components/skeleton';
import { filterSchema } from '@/components/main/components/Fields/validation';
import { FiltersForm } from '@/components/vacancies/types';


// import type { RootState } from '@/store/store/store';

const PARAM_PAGE = 'page';
const PARAM_FIELD = 'field';
const PARAM_TYPEWORK = 'type_of_work';
const PARAM_EXP = 'expirience';
const PARAM_FROM = 'from';
const PARAM_TO = 'to';



const table = [
    { name: 'Зарплатомер', info: 'Узнайте,сколько вы стоите!', batonName: 'Рассчитать', image: 'credit', link: 'https://www.superjob.ru/z/' },
    { name: 'Производственный календарь', info: 'Выходные и праздничные дни по ТК РФ и расчет отпускных', batonName: 'Посмотреть', image: 'calendar', link: 'https://www.superjob.ru/proizvodstvennyj_kalendar/2023/' },
    { name: 'Старт карьеры', info: 'Начните карьеру с практики или стажировки у лучших работодателей', batonName: 'Выбрать', image: 'users', link: 'https://students.superjob.ru/' },
]
export async function getServerSideProps() {
    try {
        const fields = await getFields();
        const references = await getTime();
        return {
            props: {
                fields,
                references
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



const Main = ({ fields, references }) => {


    // const { email: user } = useAppSelector((state: RootState) => state.user);// не исп.

    const { classes } = useStyles();

    const navigate = useRouter()
    const { pathname, query } = navigate;

    const page = Number(query[PARAM_PAGE]) || 1;
    const catalogue = query[PARAM_FIELD] || '';
    const typework = query[PARAM_TYPEWORK] || '';
    const experienceType = query[PARAM_EXP] || '';

    const paperRef = useRef<HTMLFormElement>(null);
    const values: FiltersForm = {
        catalogues: '',
        type_of_work: '',
        expirience: ''
    }

    // const { data: fields } = useQuery(['fields'], {
    //     queryFn: () => getFields(),
    // });
    // const { data: references } = useQuery(['typeWork'], {
    //     queryFn: () => getTime(),
    // });

    // const typeWorks = Object.values(references?.type_of_work || {})
    const typeWorksKeys = Object.entries(references?.type_of_work || {})
    // const experience = Object.values(references?.experience || {})
    const experienceKeys = Object.entries(references?.experience || {})

    const countries = Object.values(references?.citizenship || {})


    const { handleSubmit, control } = useForm<any>({ //any
        resolver: yupResolver(filterSchema),
        defaultValues: values,
    });

    const fieldSkeletons = (x: number) => Array.from({ length: x }, (_, index) => (

        <FieldSkeleton key={index} />
    ))    //skeletonx31


    const onChangeFilters = useCallback(
        (values: FiltersForm) => {
            const newParams = new URLSearchParams(navigate.query as any); //any
            newParams.delete(PARAM_FIELD);
            newParams.delete(PARAM_FROM);
            newParams.delete(PARAM_TO);

            newParams.set(PARAM_PAGE, '1');
            if (values.catalogues) newParams.set(PARAM_FIELD, values.catalogues);
            if (values.type_of_work) newParams.set(PARAM_TYPEWORK, values.type_of_work);
            if (values.expirience) newParams.set(PARAM_EXP, values.expirience);

            // scrollToTop();
            navigate.push({
                pathname: '/vacancies',
                query: newParams.toString(),
            });
        },
        [navigate])

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
        if (typework) newParams.append(PARAM_TYPEWORK, typework as string);
        if (experienceType) newParams.append(PARAM_EXP, experienceType as string);

        navigate.push(`${pathname}?${newParams.toString()}`, undefined, { shallow: true });
    }, []);

    return (
        <>
            <Head>
                <title>Jobored</title>
            </Head>
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
                        <Group className={classes.columnsWrapper}>
                            {table?.map((el) => (
                                <Group className={classes.columnsWrapperGroup} spacing="xl" key={el.name}>
                                    <Image src={`/images/${el.image}.svg`} width={20} height={20} alt={el.image}></Image>
                                    <Text >
                                        {el.name}
                                    </Text>
                                    <Text align='center' >
                                        {el.info}
                                    </Text>
                                    <Link key={uuidv4()} href={`${el.link}`}>
                                        <Button
                                            variant="subtle"
                                            type='button'
                                            key={uuidv4()}
                                        >
                                            {el.batonName}
                                        </Button>
                                    </Link>
                                </Group>
                            ))
                            }
                        </Group>


                    </Paper>
                    <Paper
                        p={13}
                        pb={11}
                        pt={10}
                        withBorder
                        radius="md"
                    >
                        <Text className={classes.text}>ПО ОТРАСЛЯМ</Text>
                        <Group className={classes.columnsWrapper} position="center" spacing="xs" >
                            {Array.isArray(fields) ? (fields?.map((f) => (
                                <Group key={uuidv4()} >
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
                                </Group>
                            )
                            )) : (
                                <Group >
                                    {fieldSkeletons(36)}
                                </Group>
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
                            {references ? (typeWorksKeys?.map((t) => (
                                <Group key={uuidv4()} >
                                    <Controller
                                        name="type_of_work"
                                        render={({ field }) => (
                                            <Button key={uuidv4()}
                                                variant="subtle"
                                                type='button'
                                                onClick={() => {
                                                    field.onChange(String(t[0]));
                                                    handleSubmit(onSubmit)();
                                                }}>
                                                {String(t[1])}
                                            </Button>
                                        )}
                                        control={control}
                                    />
                                </Group>
                            ))
                            ) : (
                                <Group >
                                    {fieldSkeletons(8)}
                                </Group>
                            )}
                        </Group>
                    </Paper>

                    <Paper
                        p={13}
                        pb={11}
                        pt={10}
                        withBorder
                        radius="md"
                    >
                        <Text className={classes.text}>ПО ОПЫТУ</Text>
                        <Group className={classes.columnsWrapper} position="center" spacing="xs" >
                            {references ? (experienceKeys?.map((e) => (
                                <Group key={uuidv4()} >
                                    <Controller
                                        name="expirience"
                                        render={({ field }) => (
                                            <Button key={uuidv4()}
                                                variant="subtle"
                                                type='button'
                                                onClick={() => {
                                                    field.onChange(String(e[0]));
                                                    handleSubmit(onSubmit)();
                                                }}>
                                                {String(e[1])}
                                            </Button>
                                        )}
                                        control={control}
                                    />
                                </Group>
                            ))
                            ) : (
                                <Group >
                                    {fieldSkeletons(5)}
                                </Group>
                            )}
                        </Group>
                    </Paper>

                    <Paper
                        p={13}
                        pb={11}
                        pt={10}
                        withBorder
                        radius="md">
                        <Text className={classes.text}>ПО СТРАНАМ</Text>
                        <Group className={classes.columnsWrapper} position="center" spacing="xs" >
                            {references ? (countries?.map((c) => (
                                <Link key={uuidv4()} href='/vacancies'>
                                    <Button key={uuidv4()} variant="subtle" type='submit'>
                                        {String(c)}
                                    </Button>
                                </Link>
                            ))
                            ) : (
                                <Group >
                                    {fieldSkeletons(16)}
                                </Group>
                            )

                            }
                        </Group>
                    </Paper>

                    <Paper
                        p={25}
                        pb={15}
                        pt={10}
                        withBorder
                        radius="md">
                        <Image src={Ballon} alt='ballon' priority />
                        <Text variant="gradient"
                            gradient={{ from: 'indigo', to: 'pink', deg: 80 }}
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
        </>

    );
};

export default Main;
