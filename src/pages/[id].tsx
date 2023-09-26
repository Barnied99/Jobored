import { Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Head from 'next/head';

import { DefaultContainer } from '@/components/common/component';
import { getPageTitle } from '@/components/common/services';
import { getVacancy } from '@/components/vacancies/api';
import {
    VacancyBody,
    VacancyBodySkeleton,
    VacancyHeader,
    VacancyHeaderSkeleton,
} from '@/components/vacancies/components';

const Vacancy = () => {
    const { id } = useParams();

    const { data: vacancy, isLoading } = useQuery(['vacancy', id], {
        queryFn: () => getVacancy(id as string),
    });

    const title = getPageTitle(vacancy?.profession);

    const dataIsReady = !isLoading && vacancy;

    return (
        <DefaultContainer small>
            <Head>
                <title>{title}</title>
            </Head>
            {dataIsReady ? (
                <Stack spacing={20}>
                    <VacancyHeader data={vacancy} />
                    <VacancyBody description={vacancy.vacancyRichText} />
                </Stack>
            ) : (
                <Stack spacing={20}>
                    <VacancyHeaderSkeleton />
                    <VacancyBodySkeleton />
                </Stack>
            )}
        </DefaultContainer>
    );
};

export default Vacancy;
