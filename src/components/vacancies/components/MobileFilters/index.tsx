import { Accordion } from '@mantine/core';
import React from 'react';

import { Catalogue, FiltersForm } from '@/components/vacancies/types';

import Filters from '../Filters';

import { useStyles } from './styles';

interface MobileFiltersProps {
	fields?: Catalogue[];
	values?: FiltersForm;
	onChange: (values: FiltersForm) => void;
	typework: any;//any
	experienceKey: any;//any
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
	fields,
	values,
	onChange,
	typework,
	experienceKey
}) => {
	const { classes, cx } = useStyles();

	return (
		<Accordion
			className={cx(classes.hiddenDesktop, classes.accordion)}
			variant="filled"
		>
			<Accordion.Item value="filters">
				<Accordion.Control className={classes.accordion__label}>
					Фильтры
				</Accordion.Control>
				<Accordion.Panel>
					<Filters
						typework={typework}
						experienceKey={experienceKey}
						fields={fields}
						values={values}
						onChange={onChange}
						className={classes.mobileFilters}
					/>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
};

export default MobileFilters;
