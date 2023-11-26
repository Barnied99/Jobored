import { Text, Paper, List } from "@mantine/core"
import Image from "next/image"

import { Ballon } from '@/assets/img';


const Info = () => {
    return (
        <Paper
            p={25}
            pb={15}
            pt={10}
            withBorder
            radius="md">
            <Image src={Ballon} alt='ballon' priority />
            <Text variant="gradient"
                gradient={{ from: 'indigo', to: 'pink', deg: 80 }}
            > Работа в Москве</Text>
            <List withPadding>
                <List.Item>Свежие вакансии на Jobored в Москве от прямых работодателей, агентств, центров занятости.
                </List.Item>
                <List.Item>В нашей базе содержатся предложения для всех специальностей: с опытом и без опыта работы, подработка с ежедневной оплатой, поиск удаленной работы, работа вахтовым методом.
                </List.Item>
                <List.Item>Все самые популярные вакансии на сегодня, в городе Москва: Грузчик, Водитель, Курьер, Разнорабочий, Продавец-кассир, Продавец-консультант, Повар, Кладовщик, Охранник, Бухгалтер, Продавец, Подсобный рабочий и другие профессии.
                </List.Item>
                <List.Item>Актуальные объявления о работе в вашем городе! Удобный поиск свежих вакансий на сегодня!
                </List.Item>
            </List>
            <Text variant="gradient"
            >Работодателям</Text>
            <List withPadding>
                <List.Item>У нас вы найдете соискателей с нужными навыками и опытом работы, пригласите их на собеседование и выберете подходящего сотрудника.
                </List.Item>
                <List.Item>Более 800 000 объявлений о вакансиях и резюме. Сайт Jobored помогает находить работу?
                </List.Item>
            </List>
            <Text variant="gradient"
            >Соискателям</Text>
            <List withPadding>
                <List.Item>Создавайте резюме бесплатно и откликайтесь на свежие вакансии!
                </List.Item>
                <List.Item>Общайтесь с работодателем через чат, не обязательно звонить!
                </List.Item>
                <List.Item>Просматривайте статус рассмотрения вашего резюме и получайте приглашения на собеседование из личного кабинета!
                </List.Item>
            </List>
        </Paper>
    )
}

export default Info