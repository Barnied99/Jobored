import { NavLink as MantineNavLink } from '@mantine/core';
import React from 'react';
import Link from 'next/link';

import { useStyles } from './styles';

interface NavLinkProps {
	to: string;
	className?: string;
	children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, className, children }) => {
	const { classes, cx } = useStyles();
	return (
		<MantineNavLink className={cx(classes.link, className)}
			component={Link}
			label={children}
			href={to}
		/>
	);
};

export default NavLink;
