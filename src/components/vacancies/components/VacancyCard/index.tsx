import { Paper, Stack } from '@mantine/core';
import React, { useCallback, useState } from 'react';

import { getCompensationString } from '@/components/vacancies/helpers';
import {
	addFavoriteVacancy,
	deleteFavoriteVacancy,
	isFavoriteVacancy,
} from '@/components/vacancies/services';
import { Vacancy } from '@/components/vacancies/types';

import { CardHeader, Location, WorkInfo } from './components';

interface VacancyCardProps {
	data: Vacancy;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ data }) => {
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
		<Paper
			component="article"
			p={23}
			pb={21}
			pt={20}
			withBorder
			data-elem={`vacancy-${data.id}`}
		>
			<Stack spacing={13}>
				<CardHeader
					id={data.id}
					title={profession}
					isFavorite={isFavorite}
					onToggleFavorite={toggleIsFavorite}
				/>
				<WorkInfo employmentType={workType} compensation={compensation} />
				<Location>{location}</Location>
			</Stack>
		</Paper>
	);
};

export default React.memo(VacancyCard);
export * from './skeleton';
