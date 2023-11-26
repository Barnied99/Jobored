import Image from 'next/image';
import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import { LogoFull } from '@/assets/img';

import classes from './FooterLinks.module.css';


const data = [
    {
        title: 'Партнерам',
        links: [
            { label: 'Реклама на сайте', link: 'https://www.superjob.ru/targetirovannaya_reklama/?utm_source=superjob&utm_campaign=desktop_footer' },
            { label: 'Интеграционные сервисы', link: 'https://www.superjob.ru/integration/' },
            { label: 'Продвижение вакансий', link: 'https://www.superjob.ru/reklama_vakansii/?utm_source=superjob&utm_campaign=desktop_footer' },
        ],
    },
    {
        title: 'SuperJob',
        links: [
            { label: 'О компании', link: 'https://www.superjob.ru/clients/superjob-14449.html' },
            { label: 'SuperJob.tech', link: 'https://superjob.tech/' },
            { label: 'Новости сервиса', link: 'https://www.superjob.ru/news/' },
            { label: 'Работа в SuperJob', link: 'https://www.superjob.ru/clients/superjob-14449.html' },
        ],
    },
    {
        title: 'Документы',
        links: [
            { label: 'База данных SuperJob', link: 'https://www.superjob.ru/info/hr_service.html' },
            { label: 'Рекламный кабинет', link: 'https://www.superjob.ru/info/rtb_service.html' },
            { label: 'Агрегатор образовательных курсов', link: 'https://www.superjob.ru/info/course-license-agreement/' },
            { label: 'Иные документы', link: 'https://www.superjob.ru/hr/billing/documents.html' },
        ],
    },

];

export function Footer() {

    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text<'a'>
                key={index}
                className={classes.link}
                component="a"
                href={link.link}
            // onClick={(event) => event.preventDefault()}
            >
                {link.label}
            </Text>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <Image
                        src={LogoFull}
                        alt="Jobored Logo"
                        className={classes.header__logo}
                        priority
                    />
                    <Text size="xs" c="dimmed" className={classes.description}>
                        Build fully functional accessible web applications faster than ever
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text c="dimmed" size="sm">
                    © 2023 Savitskiy.mantine.dev All rights reserved.
                </Text>

                <Group className={classes.social} align="flex-end" noWrap>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}

export default Footer;
