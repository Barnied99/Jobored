import { Paper } from '@mantine/core';

import { WorkTypeSkeleton } from '@/components/main/components/typeWork/skeleton'

const getRandomPadding = () => {
    return Math.floor(Math.random() * 13) + 5;
}
export const FieldSkeleton = () => {
    const randomPadding = getRandomPadding();
    return (
        <Paper component="article" p={randomPadding} pb={4} pt={4} withBorder>
            <WorkTypeSkeleton />
        </Paper>
    );
};
