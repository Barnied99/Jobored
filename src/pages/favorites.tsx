import { Pagination, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { DefaultContainer } from '@/components/common/component';
import { getPaginationControlProps } from '@/components/common/helpers';
import { getPageTitle } from '@/components/common/services';
// import { useAppSelector } from '@/utills/hooks';
import { NothingHere } from '@/components/not-found/components';
import { getVacancies } from '@/components/vacancies/api';
import {
    VacancyCard,
    VacancyCardSkeleton,
} from '@/components/vacancies/components';
import { getFavoriteVacancies } from '@/components/vacancies/services';
import { useStyles } from '@/components/favorites/pages/Favorites/styles';
// import { RootState } from '@/store/store/store';

const PAGE_ITEMS = 4;
const PARAM_PAGE = 'page';

const Favorites = () => {
    const { pathname, query: urlSearchString } = useRouter();
    const navigate = useRouter();
    const params = new URLSearchParams(pathname);
    const vacanciesKeys = useMemo(() => getFavoriteVacancies(), []);
    const totalVacancies = vacanciesKeys.length;
    const totalPages = Math.ceil(vacanciesKeys.length / PAGE_ITEMS);

    // const [userClient, setUserClient] = useState(false)
    // const { email: user } = useAppSelector((state: RootState) => {
    //     return state.user;
    // });

    // useEffect(() => {
    //     if (user) {
    //         setUserClient(!userClient)
    //     }
    //     navigate.push('/signin')
    // }, [user])

    const paramsPage = Number(params.get(PARAM_PAGE));
    const page = paramsPage ? Math.min(paramsPage, totalPages) : 1;
    const pageIdx = page - 1;

    const hasVacancies = vacanciesKeys.length > 0;
    const pageAmount = Math.min(
        totalVacancies - pageIdx * PAGE_ITEMS,
        PAGE_ITEMS
    );
    const pageVacancies = useQuery(['favorites', pageIdx, vacanciesKeys], {
        queryFn: () =>
            getVacancies({ pageIdx, count: PAGE_ITEMS, ids: vacanciesKeys }),
    });

    const { classes } = useStyles();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onChangePage = useCallback(
        (newPage: number) => {
            const newParams = new URLSearchParams(pathname);
            newParams.set(PARAM_PAGE, newPage.toString());
            navigate.push(`${pathname}?${newParams.toString()}`);
        },
        [pathname]
    );

    useEffect(() => {
        const newParams = new URLSearchParams();

        newParams.append(PARAM_PAGE, page.toString());

        navigate.push(`${pathname}?${newParams.toString()}`);
    }, []);

    useEffect(() => {
        scrollToTop();
    }, [urlSearchString]);

    const title = getPageTitle('Избранное');

    return (
        <DefaultContainer small>
            <Head>
                <title>{title}</title>
            </Head>
            {hasVacancies ? (
                <>
                    <Stack align="stretch">
                        {pageVacancies.data?.objects
                            ? pageVacancies.data.objects.map((vacancy) => (
                                <VacancyCard key={vacancy.id} data={vacancy} />
                            ))
                            : Array(pageAmount)
                                .fill(true)
                                .map((_, idx) => <VacancyCardSkeleton key={idx} />)}
                    </Stack>
                    <Pagination
                        value={page}
                        onChange={onChangePage}
                        total={totalPages}
                        className={classes.pagination}
                        getControlProps={getPaginationControlProps}
                    />
                </>
            ) : (
                <NothingHere className={classes.nothingHere} />
            )}
        </DefaultContainer>
    );
};

export default Favorites;
