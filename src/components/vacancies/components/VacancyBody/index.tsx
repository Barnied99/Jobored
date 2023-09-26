import { Paper, TypographyStylesProvider } from '@mantine/core';
import React from 'react';

interface VacancyBodyProps {
	description: string;
}

const VacancyBody: React.FC<VacancyBodyProps> = ({ description }) => {
	return (
		<Paper p={23} pb={18} pt={17} withBorder>
			<TypographyStylesProvider>
				<div dangerouslySetInnerHTML={{ __html: description }} />
			</TypographyStylesProvider>
		</Paper>
	);
};

export default VacancyBody;
export { VacancyBodySkeleton } from './skeleton';
