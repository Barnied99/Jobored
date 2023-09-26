import { Flex, Group, Text, Title } from '@mantine/core';
import React from 'react';
import Image from 'next/image';

import { IconClose } from '@/assets/icons';

import { useStyles } from './styles';

interface FilterHeaderProps {
	onFiltersReset: () => void;
}

const FiltersHeader: React.FC<FilterHeaderProps> = ({ onFiltersReset }) => {
	const { classes } = useStyles();

	return (
		<Group position="apart" pt={2}>
			<Title order={3} className={classes.title}>
				Фильтры
			</Title>

			<Flex
				align="center"
				className={classes.resetText__wrapper}
				onClick={onFiltersReset}
			>
				<Text color="red" className={classes.resetText}>
					Сбросить все
				</Text>
				<Image src={IconClose} alt="" className={classes.closeIcon} />
			</Flex>
		</Group>
	);
};

export default FiltersHeader;
