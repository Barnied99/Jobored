import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Group, Pagination, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
// import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { DefaultContainer } from '@/components/common/component';
import { getPaginationControlProps } from '@/components/common/helpers';
import { getPageTitle } from '@/components/common/services';
import { NothingHere } from '@/components/not-found/components';
import { getVacancies, getFields, getTime } from '@/components/vacancies/api';
import {
    Filters,
    MobileFilters,
    VacanciesSearch,
    VacancyCard,
    VacancyCardSkeleton,
} from '@/components/vacancies/components';
import { FiltersForm, SearchForm } from '@/components/vacancies/types';
import { useStyles } from '@/components/vacancies/pages/Vacancies/styles';
import { searchSchema } from '@/components/vacancies/pages/Vacancies/validation';
import { DefaultLayout } from '@/components/common/component';

const DEFAULT_PAGES = 5;
const PAGE_ITEMS = 4;
const MAX_ENTITIES = 500;

const PARAM_PAGE = 'page';
const PARAM_SEARCH = 'search';
const PARAM_FIELD = 'field';
const PARAM_FROM = 'from';
const PARAM_TO = 'to';
const PARAM_TYPEWORK = 'type_of_work';
const PARAM_EXP = 'expirience';


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

const Vacancies = ({ fields, references }) => {
    const router = useRouter();
    const { pathname, query } = router;
    const { classes } = useStyles();
    const search = query[PARAM_SEARCH] || '';

    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            search: search as string,
        },
        resolver: yupResolver(searchSchema),
    });

    const page = Number(query[PARAM_PAGE]) || 1;
    const catalogue = query[PARAM_FIELD] || '';
    const paymentFrom = Number(query[PARAM_FROM]) || '';
    const paymentTo = Number(query[PARAM_TO]) || '';
    const typework = query[PARAM_TYPEWORK] || '';
    const expirience = query[PARAM_EXP] || '';

    const filtersForm: FiltersForm = {
        catalogues: catalogue as string,
        payment_from: paymentFrom,
        payment_to: paymentTo,
        type_of_work: typework as string,
        expirience: expirience as string
    };

    // const queryClient = useQueryClient()
    // queryClient.prefetchQuery(['vacancies', page, filtersForm, search], () => getVacancies({
    //     pageIdx: page - 1,
    //     count: PAGE_ITEMS,
    //     fields: filtersForm.catalogues,
    //     paymentFrom: filtersForm.payment_from || undefined,
    //     paymentTo: filtersForm.payment_to || undefined,
    //     keyword: search as string,
    //     typeWork: filtersForm.type_of_work as string,
    //     expirience: filtersForm.expirience as string
    // }))

    const { data: vacancies, isLoading: vacanciesLoading, isSuccess } = useQuery(
        ['vacancies', page, filtersForm, search],
        {
            queryFn: () =>
                getVacancies({
                    pageIdx: page - 1,
                    count: PAGE_ITEMS,
                    fields: filtersForm.catalogues,
                    paymentFrom: filtersForm.payment_from || undefined,
                    paymentTo: filtersForm.payment_to || undefined,
                    keyword: search as string,
                    typeWork: filtersForm.type_of_work as string,
                    expirience: filtersForm.expirience as string
                }),
            staleTime: 1000 * 8,
        }
    );

    // const { data: fields } = useQuery(['fields'], {
    //     queryFn: () => getFields(),
    // });

    // const { data: references } = useQuery(['typeWork'], {
    //     queryFn: () => getTime(),
    // });
    const experienceKeys = Object.entries(references?.experience || {})
    const typeWorksKeys = Object.entries(references?.type_of_work || {})

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onChangeSearch =
        (values: SearchForm) => {
            const newParams = new URLSearchParams(router.query as any);
            newParams.delete(PARAM_SEARCH);
            newParams.set(PARAM_PAGE, '1');
            if (values.search) newParams.set(PARAM_SEARCH, values.search);

            // scrollToTop();
            router.push(`${pathname}?${newParams.toString()}`);
        };

    const onChangeFilters =
        (values: FiltersForm) => {
            const newParams = new URLSearchParams(router.query as any);

            newParams.delete(PARAM_FIELD);
            newParams.delete(PARAM_FROM);
            newParams.delete(PARAM_TO);

            newParams.set(PARAM_PAGE, '1');

            if (values.catalogues) newParams.set(PARAM_FIELD, values.catalogues);
            if (values.payment_from)
                newParams.set(PARAM_FROM, values.payment_from.toString());
            if (values.payment_to)
                newParams.set(PARAM_TO, values.payment_to.toString());
            if (values.type_of_work) newParams.set(PARAM_TYPEWORK, values.type_of_work);
            if (values.expirience) newParams.set(PARAM_EXP, values.expirience);

            // scrollToTop();
            router.push(`${pathname}?${newParams.toString()}`);
        };

    const onChangePage =
        (newPage: number) => {
            const newParams = new URLSearchParams(router.query as any);
            newParams.set(PARAM_PAGE, newPage.toString());

            // scrollToTop();
            router.push(`${pathname}?${newParams.toString()}`);
        };

    useEffect(() => {
        const newParams = new URLSearchParams();

        newParams.append(PARAM_PAGE, page.toString());
        if (catalogue) newParams.append(PARAM_FIELD, catalogue as string);
        if (paymentFrom) newParams.append(PARAM_FROM, paymentFrom.toString());
        if (paymentTo) newParams.append(PARAM_TO, paymentTo.toString());
        if (search) newParams.append(PARAM_SEARCH, search as string);
        if (typework) newParams.append(PARAM_TYPEWORK, typework as string);
        if (expirience) newParams.append(PARAM_EXP, expirience as string);
        reset({ search: search as string });

        router.push(`${pathname}?${newParams.toString()}`, undefined, { shallow: true });
    }, []);

    useEffect(() => {
        scrollToTop();
    }, [router.query]);
    const entities = vacancies?.total
        ? Math.min(vacancies.total, MAX_ENTITIES)
        : DEFAULT_PAGES * PAGE_ITEMS;

    const totalPages = Math.ceil(entities / PAGE_ITEMS);

    // const readyToDisplay = !vacanciesLoading && vacancies

    const noData = !vacanciesLoading && vacancies?.objects.length === 0;

    const title = getPageTitle('Вакансии');

    return (
        <DefaultLayout title={title}>

            <DefaultContainer>

                <MobileFilters
                    values={filtersForm}
                    typework={typeWorksKeys}
                    experienceKey={experienceKeys}
                    fields={fields}
                    onChange={onChangeFilters}
                />
                <Group className={classes.columnsWrapper} align="flex-start" spacing={28}>
                    <Filters
                        className={classes.hiddenTabletsAndBelow}
                        sticky
                        values={filtersForm}
                        fields={fields}
                        typework={typeWorksKeys}
                        experienceKey={experienceKeys}
                        onChange={onChangeFilters}
                    />
                    <Box className={classes.flex1}>
                        <Stack align="stretch" className={classes.flex1}>
                            <VacanciesSearch
                                onChange={handleSubmit(onChangeSearch)}
                                control={control}
                            />

                            {isSuccess ? ( //readyToDisplay
                                vacancies.objects.map((vacancy) => (
                                    <VacancyCard key={vacancy.id} data={vacancy} />
                                ))
                            ) : (
                                <>
                                    <VacancyCardSkeleton />
                                    <VacancyCardSkeleton />
                                    <VacancyCardSkeleton />
                                    <VacancyCardSkeleton />
                                </>
                            )}
                            {noData && <NothingHere withButton={false} />}
                        </Stack>
                        <Pagination
                            value={page}
                            className={classes.pagination}
                            onChange={onChangePage}
                            total={totalPages}
                            getControlProps={getPaginationControlProps}
                        />
                    </Box>
                </Group>
            </DefaultContainer>
        </DefaultLayout>

    );
};

export default Vacancies;





