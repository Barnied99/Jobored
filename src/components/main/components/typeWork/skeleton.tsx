import { Breadcrumbs, Group, Skeleton } from '@mantine/core';

import { useStyles } from './styles';

export const WorkTypeSkeleton = () => {
    const { classes } = useStyles();

    return (
        <Group>
            <Breadcrumbs
                className={classes.skeletonBreadcrumbs}
            >
                <Skeleton height={21} width={150} />
            </Breadcrumbs>
        </Group>
    );
};
