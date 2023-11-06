import { Stack, Group } from '@mantine/core';

import { WorkTypeSkeleton } from '@/components/main/components/typeWork/skeleton'


export const FieldSkeleton = () => {

    return (
        <Stack spacing={17}>
            <Group>
                <WorkTypeSkeleton />
            </Group>
        </Stack>
    );
};
