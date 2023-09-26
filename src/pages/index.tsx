import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Group, Pagination, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { DefaultContainer } from '@/components/common/component';
import { getPaginationControlProps } from '@/components/common/helpers';
import { getPageTitle } from '@/components/common/services';
import { NothingHere } from '@/components/not-found/components';
import { getFields, getVacancies } from '@/components/vacancies/api';
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

const DEFAULT_PAGES = 5;
const PAGE_ITEMS = 4;
const MAX_ENTITIES = 500;

const PARAM_PAGE = 'page';
const PARAM_SEARCH = 'search';
const PARAM_FIELD = 'field';
const PARAM_FROM = 'from';
const PARAM_TO = 'to';

const Vacancies = () => {
    const navigate = useRouter();

    const { pathname } = navigate;
    const params = new URLSearchParams(pathname);

    const { classes } = useStyles();

    const search = params.get(PARAM_SEARCH) || '';

    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            search,
        },
        resolver: yupResolver(searchSchema),
    });

    const page = Number(params.get(PARAM_PAGE)) || 1;
    const catalogue = params.get(PARAM_FIELD) || '';
    const paymentFrom = Number(params.get(PARAM_FROM)) || '';
    const paymentTo = Number(params.get(PARAM_TO)) || '';

    const filtersForm: FiltersForm = {
        catalogues: catalogue,
        payment_from: paymentFrom,
        payment_to: paymentTo,
    };

    const { data: vacancies, isLoading: vacanciesLoading } = useQuery(
        ['vacancies', page, filtersForm, search],
        {
            queryFn: () =>
                getVacancies({
                    pageIdx: page - 1,
                    count: PAGE_ITEMS,
                    fields: filtersForm.catalogues,
                    paymentFrom: filtersForm.payment_from || undefined,
                    paymentTo: filtersForm.payment_to || undefined,
                    keyword: search,
                }),
        }
    );

    const { data: fields } = useQuery(['fields'], {
        queryFn: () => getFields(),
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onChangeSearch = useCallback(
        (values: SearchForm) => {
            const newParams = new URLSearchParams(pathname);
            newParams.delete(PARAM_SEARCH);
            newParams.set(PARAM_PAGE, '1');
            if (values.search) newParams.set(PARAM_SEARCH, values.search);

            // scrollToTop();
            navigate.push(`${pathname}?${newParams.toString()}`);
        },
        [pathname]
    );

    const onChangeFilters = useCallback(
        (values: FiltersForm) => {
            const newParams = new URLSearchParams(pathname);

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
        [pathname]
    );

    const onChangePage = useCallback(
        (newPage: number) => {
            const newParams = new URLSearchParams(pathname);
            newParams.set(PARAM_PAGE, newPage.toString());

            // scrollToTop();
            navigate.push(`${pathname}?${newParams.toString()}`);
        },
        [pathname]
    );

    useEffect(() => {
        const newParams = new URLSearchParams();

        newParams.append(PARAM_PAGE, page.toString());
        if (catalogue) newParams.append(PARAM_FIELD, catalogue);
        if (paymentFrom) newParams.append(PARAM_FROM, paymentFrom.toString());
        if (paymentTo) newParams.append(PARAM_TO, paymentTo.toString());
        if (search) newParams.append(PARAM_SEARCH, search);
        reset({ search });

        navigate.push(`${pathname}?${newParams.toString()}`);
    }, []);

    useEffect(() => {
        scrollToTop();
    }, [pathname]);

    const entities = vacancies?.total
        ? Math.min(vacancies.total, MAX_ENTITIES)
        : DEFAULT_PAGES * PAGE_ITEMS;

    const totalPages = Math.ceil(entities / PAGE_ITEMS);

    const readyToDisplay = !vacanciesLoading && vacancies;

    const noData = !vacanciesLoading && vacancies?.objects.length === 0;

    const title = getPageTitle('Вакансии');

    return (
        <DefaultContainer>
            <Head>
                <title>{title}</title>
            </Head>
            <MobileFilters
                values={filtersForm}
                fields={fields}
                onChange={onChangeFilters}
            />
            <Group className={classes.columnsWrapper} align="flex-start" spacing={28}>
                <Filters
                    className={classes.hiddenTabletsAndBelow}
                    sticky
                    values={filtersForm}
                    fields={fields}
                    onChange={onChangeFilters}
                />
                <Box className={classes.flex1}>
                    <Stack align="stretch" className={classes.flex1}>
                        <VacanciesSearch
                            onChange={handleSubmit(onChangeSearch)}
                            control={control}
                        />

                        {readyToDisplay ? (
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
    );
};

export default Vacancies;
