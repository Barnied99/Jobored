import { Loader } from '@mantine/core';

import { useStyles } from './styles';

const DefaultLoader = () => {
	const { classes } = useStyles();

	return <Loader size="5rem" className={classes.loader} />;
};

export default DefaultLoader;
