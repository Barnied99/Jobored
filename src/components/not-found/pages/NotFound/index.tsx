import Head from 'next/head';

import { DefaultContainer } from '@/components/common/component';
import { getPageTitle } from '@/components/common/services';
import { NothingHere } from '@/components/not-found/components';

import { useStyles } from './styles';

const NotFound = () => {
	const { classes } = useStyles();

	const title = getPageTitle('Здесь ничего нет');

	return (
		<DefaultContainer>
			<Head>
				<title>{title}</title>
			</Head>
			<NothingHere className={classes.nothingHere} />
		</DefaultContainer>
	);
};

export default NotFound;
