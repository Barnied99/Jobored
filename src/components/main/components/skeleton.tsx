import { Paper } from '@mantine/core';

import { WorkTypeSkeleton } from '@/components/main/components/typeWork/skeleton'

export const FieldSkeleton = () => {
    return (
        <Paper component="article" p={5} pb={4} pt={4} withBorder>
            <WorkTypeSkeleton />
        </Paper>
    );
};
