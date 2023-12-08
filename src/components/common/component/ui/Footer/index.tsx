import Image from 'next/image';
import Link from 'next/link';
import { Container, Group, ActionIcon, rem } from '@mantine/core';
import { IconCloudFilled, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';

import { LogoFull } from '@/assets/img';

import { useStyles } from './styles';


export function Footer() {
    const { classes } = useStyles();

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Image src={LogoFull}
                    alt="Jobored Logo"
                    priority
                />
                <Group spacing={0} className={classes.groups} position="right" noWrap>
                    <ActionIcon component={Link} href='https://bsky.app'
                        size="lg" color="gray" variant="subtle">
                        <IconCloudFilled style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon component={Link} href='https://www.youtube.com/' size="lg" color="gray" variant="subtle">
                        <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon component={Link} href='https://www.instagram.com/'
                        size="lg" color="gray" variant="subtle">
                        <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    );
}
export default Footer;
