import { Breadcrumbs, Group, Text } from '@mantine/core';
import React from 'react';

import { useStyles } from './styles';

interface WorkInfoProps {
	compensation: string;
	employmentType: string;
}

const WorkInfo: React.FC<WorkInfoProps> = ({
	compensation,
	employmentType,
}) => {
	const { classes } = useStyles();

	return (
		<Group>
			<Breadcrumbs
				separator={<div className={classes.separator} />}
				className={classes.breadcrumbs}
			>
				<Text className={classes.compensation}>{compensation}</Text>
				<Text>{employmentType}</Text>
			</Breadcrumbs>
		</Group>
	);
};

export default WorkInfo;
export * from './skeleton';
