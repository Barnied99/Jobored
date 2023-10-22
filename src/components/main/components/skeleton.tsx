import { Paper, Stack } from '@mantine/core';

import { FieldsHeader } from './FieldsHeader/skeleton';

import { WorkTypeSkeleton } from '@/components/main/components/typeWork/skeleton'

export const FieldSkeleton = () => {
    return (
        <Paper component="article" p={5} pb={4} pt={4} withBorder>
            <WorkTypeSkeleton />
        </Paper>
    );
};
