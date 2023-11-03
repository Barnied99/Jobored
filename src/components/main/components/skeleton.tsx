import { Stack, Group } from '@mantine/core';

import { WorkTypeSkeleton } from '@/components/main/components/typeWork/skeleton'


// const getRandomPadding = () => {
//     return Math.floor(Math.random() * 13) + 5;
// }

export const FieldSkeleton = () => {

    // const randomPadding = getRandomPadding();

    return (
        <Stack spacing={17}>
            <Group>
                <WorkTypeSkeleton />
            </Group>
        </Stack>
    );
};
