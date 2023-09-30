import { Button, Stack, Title } from '@mantine/core';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ImgNotFound } from '@/assets/img';

import { useStyles } from './styles';

interface NothingHereProps {
	title?: string;
	className?: string;
	withButton?: boolean;
}

const NothingHere: React.FC<NothingHereProps> = ({
	title = 'Упс, здесь еще ничего нет!',
	className,
	withButton = true,
}) => {
	const { classes } = useStyles();

	return (
		<Stack spacing={32} align="center" className={className}>
			<Image
				src={ImgNotFound}
				alt="Man with a loupe"
				height="200"
				width="200"
				className={classes.image}
			/>
			<Title className={classes.title}>{title}</Title>
			{withButton && (
				<Button
					variant="light"
					size="md"
					className={classes.button}
					component={Link}
					href="/vacancies"
				>
					Поиск Вакансий
				</Button>
			)}
		</Stack>
	);
};

export default NothingHere;
