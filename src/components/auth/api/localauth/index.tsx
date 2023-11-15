import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Button, Input, Text, Paper, Group, Divider, Stack } from '@mantine/core';
import emailjs from '@emailjs/browser';
import Link from 'next/link';
// import { useForm } from '@mantine/form'
// import { useToggle, upperFirst } from '@mantine/hooks';

import useValidation from '@/utills/use-validation';
import { userActions, LoginFormPayload } from '@/store/slice/user-slice';
import { useAppDispatch } from '@/utills/hooks';

import { GoogleButton } from './GoogleButton';
// import { TwitterButton } from './TwitterButton';

// import { styles } from './styles';

export const AuthForm: React.FC<{ header: any; type: any }> = (props) => {
    const dispatch = useAppDispatch();
    const router = useRouter()

    // const { classes } = styles()


    const {
        inputRef: emailInputRef,
        isInvalid: isEmailInvalid,
        submitValueHandler: submitEmailHandler,
    } = useValidation('email');

    const {
        inputRef: passwordInputRef,
        isInvalid: isPasswordInvalid,
        submitValueHandler: submitPasswordHandler,
    } = useValidation('password');

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;
        const isEmailValid = submitEmailHandler(enteredEmail);
        const isPasswordValid = submitPasswordHandler(enteredPassword);

        const templateParams = {
            to: 'darkbarnied99@gmail.com',
            sendername: 'fero',
            subject: 'Check this out!',
            message: `${enteredEmail}, успешно зарегистрировался.`,
            replyto: 'check'
        }

        let isFormValid = isEmailValid && isPasswordValid;

        if (isFormValid) {
            const payload: LoginFormPayload = {
                email: enteredEmail,
            };
            props.type === 'signin'
                ? dispatch(userActions.login(payload))
                : dispatch(userActions.signup(payload));
            router.push('/');
            if (props.type === 'signup') {
                emailjs.send('service_7urjxdm', 'template_uknn05b', templateParams, '_-K5Kz_MdB1JWG5r6')
                    .then((response) => {
                        console.log('SUCCESS!', response.status, response.text);
                    }, (err) => {
                        console.error('FAILED...', err);
                    });
            }
            // try {
            //     // Отправка данных формы на сервер
            //     const response = await fetch('http://localhost:3000/signup', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(payload),
            //     });

            //     if (response.ok) {
            //         // Регистрация прошла успешно
            //         // Отправка письма на указанный email-адрес
            //         const mailResponse = await fetch('http://localhost:3000/signup', {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({ email: enteredEmail }),
            //         });

            //         if (mailResponse.ok) {
            //             console.log('Письмо успешно отправлено');
            //         } else {
            //             console.log(mailResponse.statusText);
            //             console.log(mailResponse.status);
            //             console.log('Ошибка при отправке письма');
            //         }

            //         // Перенаправление на главную страницу
            //         router.push('/');
            //     } else {
            //         console.log('Ошибка при регистрации');
            //     }
            // } catch (error) {
            //     console.log('Ошибка при отправке запроса:', error);
            // }
        }

        //method="POST" 

    }

    return (

        <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" fw={500}>
                Welcome to Mantine,  with
            </Text>

            <Group grow mb="md" mt="md">
                <GoogleButton radius="xl">Google</GoogleButton>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg" />

            <form onSubmit={submitHandler}>
                <Stack>
                    {props.type === 'signup' && (
                        <Input.Wrapper mt="xl">
                            <Input
                                placeholder="Your name"
                                type='name'
                                id='name'
                                required
                            />
                        </Input.Wrapper>
                    )}

                    <Input.Wrapper mt="xl" >
                        <Input
                            placeholder="Your email"
                            type='email'
                            id='email'
                            required
                            ref={emailInputRef}
                        />
                        {isEmailInvalid && <span>Email is invalid</span>}
                    </Input.Wrapper>
                    <Input.Wrapper>
                        <Input
                            placeholder="Your password"
                            type='password'
                            id='password'
                            required
                            ref={passwordInputRef}
                        />
                        {isPasswordInvalid && <span>Password is invalid</span>}
                    </Input.Wrapper>
                </Stack>

                <Group mt="xl">
                    {props.header === 'Вход' ?
                        <>
                            <Button
                                fullWidth
                                size={'sm'}
                                variant="filled"
                                type='submit'>
                                {props.header}
                            </Button>
                            <Button
                                fullWidth
                                size={'sm'}
                                variant="filled"
                                component={Link}
                                href="/signup"
                            >
                                {'Регистрация'}
                            </Button>
                        </>

                        :
                        <Button
                            fullWidth
                            size={'sm'}
                            variant="filled"
                            type='submit'>
                            {props.header}
                        </Button>
                    }
                </Group>
            </form>
        </Paper>
    );
};

AuthForm.propTypes = {
    type: PropTypes.oneOf(['signin', 'signup']),
    header: PropTypes.string,
};

