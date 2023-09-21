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
		<Link href={to}>
			<MantineNavLink className={cx(classes.link, className)}>
				{children}
			</MantineNavLink>
		</Link>
	);
};

export default NavLink;
