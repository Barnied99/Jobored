import {
	ActionIcon,
	Breadcrumbs,
	Group,
	Paper,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import React, { useCallback, useState } from 'react';
import Image from 'next/image';

import { IconGeolocation, IconStar, IconStarFilled } from '@/assets/icons';
import { getCompensationString } from '@/components/vacancies/helpers';
import {
	addFavoriteVacancy,
	deleteFavoriteVacancy,
	isFavoriteVacancy,
} from '@/components/vacancies/services';
import { Vacancy } from '@/components/vacancies/types';

import { useStyles } from './styles';

interface VacancyHeaderProps {
	data: Vacancy;
}

const VacancyHeader: React.FC<VacancyHeaderProps> = ({ data }) => {
	const { classes } = useStyles();

	const {
		type_of_work: { title: workType },
		profession,
		town: { title: location },
		payment_from: paymentFrom,
		payment_to: paymentTo,
		currency,
	} = data;

	const compensation = getCompensationString(currency, paymentFrom, paymentTo);

	const [isFavorite, setIsFavorite] = useState(isFavoriteVacancy(data.id));

	const toggleIsFavorite = useCallback(() => {
		if (isFavorite) {
			deleteFavoriteVacancy(data.id);
			setIsFavorite(false);
			return;
		}

		addFavoriteVacancy(data.id);
		setIsFavorite(true);
	}, [isFavorite, data]);

	return (
		<Paper component="article" p={23} pb={18} pt={17} withBorder>
			<Stack spacing={17}>
				<Group position="apart" noWrap>
					<Title order={2} className={classes.cardTitle}>
						{profession}
					</Title>
					<ActionIcon
						mt={3}
						onClick={toggleIsFavorite}
						data-elem={`vacancy-${data.id}-shortlist-button`}
					>
						<Image
							src={isFavorite ? IconStarFilled : IconStar}
							height={22}
							alt="Star icon"
						/>
					</ActionIcon>
				</Group>
				<Group>
					<Breadcrumbs
						separator={<div className={classes.separator} />}
						className={classes.breadcrumbs}
					>
						<Text className={classes.compensation}>{compensation}</Text>
						<Text className={classes.workType}>{workType}</Text>
					</Breadcrumbs>
				</Group>
				<Group spacing={12}>
					<Image src={IconGeolocation} alt="" />
					<Text className={classes.location}>{location}</Text>
				</Group>
			</Stack>
		</Paper>
	);
};

export default VacancyHeader;
export { VacancyHeaderSkeleton } from './skeleton';
