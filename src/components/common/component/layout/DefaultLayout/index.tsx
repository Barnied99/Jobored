import Head from 'next/head';
import {
	AppShell,
	Burger,
	Button,
	Drawer,
	Group,
	Header,
	ScrollArea,
	Styles,
	Menu,
	useMantineColorScheme
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
import { AuthForm } from '@/components/auth/api';

import { IconSun, IconMoon, IconSettings } from '@tabler/icons-react';

import { useStyles } from './styles';
import { inherits } from 'util';

const links = [
	{ href: '/vacancies', title: 'Поиск Вакансий' },
	{ href: '/favorites', title: 'Избранное' },
];

interface DefaultLayoutProps {
	children: React.ReactNode;
	title?: string;
}

export function HeaderMenu({ title }) {
	const location = useRouter();
	const { pathname } = location
	const [userClient, setUserClient] = useState(false)
	const [openedsu, { open: openreg, close: closereg }] = useDisclosure(false);

	const [openedsi, { open: openin, close: closein }] = useDisclosure(false);

	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';

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
			<Head>
				<title>{title ? title : 'Jobored'}</title>
				<meta name="description" content="Ecommerce Website" />

			</Head>
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
									className={`${classes.header__link} ${classes.header__link}`}
								>
									{link.title}
								</NavLink>
							))}
							<>
								<Drawer
									withCloseButton={false}
									overlayProps={{ opacity: 0, blur: 4 }}
									padding="md"
									size="md"
									closeOnEscape
									opened={openedsi}
									lockScroll={false}
									closeButtonProps={{
										size: 'md',
									}}
									scrollAreaComponent={ScrollArea.Autosize}
									onClose={closein} >
									<AuthForm header='Вход' type='signin' onClose={closein} />
								</Drawer>
								<Button
									onClick={openin}
									size={'sm'}
									variant="subtle"
									c="#ACADB9"
								>
									Вход
								</Button>
								{userClient && (
									<Button
										size={'sm'}
										variant="subtle"
										c="#ACADB9"
										onClick={logoutHandler}
									> Выход
									</Button>
								)}
								<Drawer
									withCloseButton={false}
									overlayProps={{ opacity: 0, blur: 4 }}
									lockScroll={false}
									closeButtonProps={{
										size: 'md',
									}}
									scrollAreaComponent={ScrollArea.Autosize}
									padding="md"
									size="md"
									closeOnEscape
									opened={openedsu}
									onClose={closereg}
								>
									<AuthForm header='Регистрация' type='signup' onClose={closereg} />
								</Drawer>
								<Button
									onClick={openreg}
									size={'sm'}
									variant="subtle"
									c="#ACADB9"
								>
									Регистрация
								</Button>
								<Menu
									shadow="md" width={200}>
									<Menu.Target>
										<Button
											variant="subtle"
											c="#ACADB9"

										>Настройки <IconSettings size={14} /></Button>
									</Menu.Target>

									<Menu.Dropdown>
										<Menu.Label>Jobored</Menu.Label>
										<Menu.Item >
											<Group
												variant="subtle"
												onClick={() => toggleColorScheme()}
												title="Toggle color scheme">
												Тема {dark ? <IconSun size="0.9rem" /> : <IconMoon size="0.9rem" />}
											</Group>
										</Menu.Item>
										<Menu.Item >Язык ru/en  </Menu.Item>

									</Menu.Dropdown>
								</Menu>

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
				size="60%"
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
							pl={30}
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
								pl={30}
								size={'sm'}
								variant="subtle"
								c="#ACADB9"
								onClick={logoutHandler}
							> Выход</Button>
						</Link>
					)}
					<Link href="/signup">
						<Button
							pl={30}
							size={'sm'}
							variant="subtle"
							c="#ACADB9"
						>
							Регистрация
						</Button>
					</Link>
					<Menu
						shadow="md" width={200}>
						<Menu.Target>
							<Button
								variant="subtle" c="#ACADB9" size={'sm'}>Настройки <IconSettings size={14} /></Button>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Label>Jobored</Menu.Label>
							<Menu.Item >Тема <IconSun size={12} />/<IconMoon size={12} /> </Menu.Item>
							<Menu.Item >Язык ru/en  </Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</>
			</Drawer>
		</>
	);
}

const defaultStyles: Styles<
	'body' | 'main' | 'root' | 'footer',
	Record<string, unknown>
> = (theme) => ({

	main: {
		// backgroundColor: theme.colors.gray[0],
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark : theme.colors.gray[0],
		paddingTop: '7.6rem',
		width: 'auto'
	},
	footer: {
		width: 'auto',
		flexWrap: 'wrap'
	}

});

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ title, children }) => {
	return (
		<AppShell fixed header={<HeaderMenu title={title} />} styles={defaultStyles} footer={<Footer />}>
			<main>
				{children}
			</main>
		</AppShell>
	);
};

export default DefaultLayout;
