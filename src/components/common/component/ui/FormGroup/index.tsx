import { Box, Stack, Text } from '@mantine/core';
import React from 'react';

import { useStyles } from './styles';

interface FormGroupProps {
	title: string;
	className?: string;
	children: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({
	title,
	className,
	children,
}) => {
	const { classes } = useStyles();

	return (
		<Box className={className}>
			<Text className={classes.groupTitle}>{title}</Text>

			<Stack mt={5} spacing={8}>
				{children}
			</Stack>
		</Box>
	);
};

export default FormGroup;
