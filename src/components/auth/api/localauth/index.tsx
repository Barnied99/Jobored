'use-client'
import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import {
    Button, Text, Paper, Group,
    Container, Title, Checkbox, PasswordInput, TextInput, Anchor
} from '@mantine/core';
import emailjs from '@emailjs/browser';
import Link from 'next/link';
// import { signIn, useSession } from 'next-auth/react'
import { notifications } from '@mantine/notifications';

type Inputs = {
    email: string
    password: string
}

import useValidation from '@/utills/use-validation';
import { userActions, LoginFormPayload } from '@/store/slice/user-slice';
import { useAppDispatch } from '@/utills/hooks';


// import { styles } from './styles';

export const AuthForm: React.FC<{ header: any; type: any; onClose?: any }> = (props) => {
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

        if (window.innerWidth >= 724) {
            props.onClose();
        }


        const templateParams = {
            to: 'darkbarnied99@gmail.com',
            sendername: `${enteredEmail}`,
            subject: 'Auth to Jobored!',
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
                notifications.show({
                    title: 'SUCCESS✅',
                    message: 'Hey there, your email has been successfully registered',
                })
            }

        }


    }

    return (

        <Container size={420} my={40}>
            <Title ta="center" >
                Welcome back!
            </Title>
            {props.type === 'signin' && (
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Do not have an account yet?{' '}
                    <Anchor size="sm" component="button">
                        <Link href='/signup'>
                            Create account
                        </Link>
                    </Anchor>
                </Text>
            )}
            <form onSubmit={submitHandler}>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md" >
                    {props.type === 'signup' && (
                        <Group grow >
                            <TextInput label="First name" placeholder="Your first name " required />
                            <TextInput label="Last name" placeholder="Your last name " required />
                        </Group>
                    )}
                    <TextInput
                        autoComplete="username"
                        label="Email"
                        id='email'
                        type='email'
                        placeholder="you@email.com"
                        required
                        ref={emailInputRef}
                    />
                    {isEmailInvalid && <span>Email is invalid</span>}
                    <PasswordInput
                        label="Password"
                        autoComplete="current-password"
                        placeholder="Your password"
                        required
                        type='password'
                        mt="md"
                        id='password'
                        ref={passwordInputRef}
                    />
                    {isPasswordInvalid && <span>Password is invalid</span>}
                    {props.type === 'signup' && (
                        <PasswordInput
                            label="Confirm Password"
                            placeholder="Confirm password"
                            required
                            mt="md" />
                    )}
                    <Group align="space-between" mt="lg">
                        <Checkbox label="Remember me" />
                        <Anchor component="button" size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button fullWidth
                        type='submit'
                        mt="xl"
                    >
                        Вход
                    </Button>
                </Paper>
            </form>

        </Container>

    );
};

AuthForm.propTypes = {
    type: PropTypes.oneOf(['signin', 'signup']),
    header: PropTypes.string,
};




