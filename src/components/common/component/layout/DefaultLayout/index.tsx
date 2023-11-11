import {
	AppShell,
	Burger,
	Button,
	Drawer,
	Group,
	Header,
	ScrollArea,
	Styles,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from "next/image";

import { DefaultContainer, NavLink, Footer } from '@/components/common/component';
import { useAppSelector, useAppDispatch } from '@/utills/hooks';
import { LogoFull } from '@/assets/img';
import { userActions } from '@/store/slice/user-slice'
import { RootState } from '@/store/store/store';


import { useStyles } from './styles';

const links = [
	{ href: '/vacancies', title: 'Поиск Вакансий' },
	{ href: '/favorites', title: 'Избранное' },
];

interface DefaultLayoutProps {
	children: React.ReactNode;
}

export function HeaderMenu() {
	const location = useRouter();
	const { pathname } = location
	const [userClient, setUserClient] = useState(false)

	const dispatch = useAppDispatch();
	const { email: user } = useAppSelector((state: RootState) => {
		return state.user;
	});
	const logoutHandler = () => {
		dispatch(userActions.logout());
		location.reload()
		location.push('/logout')

	};

	useEffect(() => {
		if (user) {
			setUserClient(!userClient)
		}
	}, [user])

	const headerHeight = 84;

	const { classes, cx } = useStyles({ headerHeight });

	const [drawerOpen, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);

	const disableScroll = useCallback(() => {
		document.body.style.position = 'fixed';
		document.body.style.width = '100%';
	}, []);

	const enableScroll = useCallback(() => {
		document.body.style.position = 'static';
		document.body.style.width = 'auto';
	}, []);

	useEffect(() => {
		if (drawerOpen) {
			disableScroll();
			return;
		}

		enableScroll();
	}, [drawerOpen]);

	useEffect(() => {
		closeDrawer();
	}, [pathname]);

	return (
		<>
			<Header height={headerHeight} className={classes.header} px="md">
				<DefaultContainer className={classes.header}>
					<Group position="apart" className={classes.header__layout}>
						<Group className={classes.fullHeight}>
							<Link href="/">
								<Image
									src={LogoFull}
									alt="Jobored Logo"
									className={classes.header__logo}
									priority
								/>
							</Link>
						</Group>

						<Group
							spacing={0}
							className={cx(classes.hiddenMobile, classes.fullHeight)}
						>
							{links.map((link) => (
								<NavLink
									key={link.href}
									to={link.href}
									className={classes.header__link}
								>
									{link.title}
								</NavLink>
							))}
							<>
								<Link href="/signin" >
									<Button
										size={'sm'}
										variant="subtle"
										c="#ACADB9"
									>
										Вход
									</Button>
								</Link>
								{userClient && (
									<Button
										size={'sm'}
										variant="subtle"
										c="#ACADB9"
										onClick={logoutHandler}
									> Выход
									</Button>
								)}
								<Link href="/signup">
									<Button
										size={'sm'}
										variant="subtle"
										c="#ACADB9"
									>
										Регистрация
									</Button>
								</Link>

							</>

						</Group>

						<Burger
							opened={false}
							onClick={toggleDrawer}
							className={cx(classes.hiddenDesktop, classes.header__burger)}
						/>
					</Group>
				</DefaultContainer>
			</Header>

			<Drawer
				opened={drawerOpen}
				onClose={closeDrawer}
				closeOnEscape
				padding="md"
				size="100%"
				scrollAreaComponent={ScrollArea.Autosize}
				overlayProps={{ opacity: 0, blur: 4 }}
				className={cx(classes.hiddenDesktop, classes.drawer)}
				lockScroll={false}
				closeButtonProps={{
					size: 'xl',
				}}
			>
				{links.map((link) => (
					<NavLink
						key={link.href}
						to={link.href}
						className={classes.header__link}
					>
						{link.title}
					</NavLink>
				))}
				<>
					<Link href="/signin" >
						<Button
							size={'sm'}
							variant="subtle"
							c="#ACADB9"
						>
							Вход
						</Button>
					</Link>
					{userClient && (
						<Link href='/logout'>
							<Button
								size={'sm'}
								variant="subtle"
								c="#ACADB9"
								onClick={logoutHandler}
							> Выход</Button>
						</Link>
					)}
					<Link href="/signup">
						<Button
							size={'sm'}
							variant="subtle"
							c="#ACADB9"
						>
							Регистрация
						</Button>
					</Link>

				</>
			</Drawer>
		</>
	);
}

const defaultStyles: Styles<
	'body' | 'main' | 'root',
	Record<string, unknown>
> = (theme) => ({
	main: {
		backgroundColor: theme.colors.gray[0],
		paddingTop: '7.6rem',
	},
});

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
	return (
		<>
			<AppShell fixed header={<HeaderMenu />} styles={defaultStyles}>
				{children}
			</AppShell>
			<Footer />
		</>

	);
};

export default DefaultLayout;
