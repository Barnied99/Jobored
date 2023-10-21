import { Paper, Stack } from '@mantine/core';

import { FieldsHeader } from './FieldsHeader/skeleton';

export const FieldSkeleton = () => {
    return (
        <Paper component="article" p={23} pb={18} pt={20} withBorder>
            <Stack spacing={17}>
                <FieldsHeader />
            </Stack>
        </Paper>
    );
};
