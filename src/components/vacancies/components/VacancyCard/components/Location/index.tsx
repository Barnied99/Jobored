import { Group, Text } from '@mantine/core';
import React from 'react';
import Image from 'next/image';

import { IconGeolocation } from '@/assets/icons';

import { useStyles } from './styles';

interface LocationProps {
	children: string;
}

const Location: React.FC<LocationProps> = ({ children }) => {
	const { classes } = useStyles();

	return (
		<Group spacing={12}>
			<Image src={IconGeolocation} alt="" className={classes.locationIcon} />
			<Text className={classes.locationText}>{children}</Text>
		</Group>
	);
};

export default Location;
export * from './skeleton';
