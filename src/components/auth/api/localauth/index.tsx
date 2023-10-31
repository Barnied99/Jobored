import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Button, Input, Text } from '@mantine/core';

import useValidation from '@/utills/use-validation';
import { userActions, LoginFormPayload } from '@/store/slice/user-slice';
import { useAppDispatch } from '@/utills/hooks';


import { styles } from './styles';

export const AuthForm: React.FC<{ header: any; type: any }> = (props) => {
    const dispatch = useAppDispatch();
    const router = useRouter()

    const { classes } = styles()

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

        let isFormValid = isEmailValid && isPasswordValid;

        if (isFormValid) {
            const payload: LoginFormPayload = {
                email: enteredEmail,
            };
            props.type === 'signin'
                ? dispatch(userActions.login(payload))
                : dispatch(userActions.signup(payload));
            router.push('/vacancies');
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
            // } else {
            //     console.log('Ошибка при регистрации');
            // }
            // } catch (error) {
            //     console.log('Ошибка при отправке запроса:', error);
            // }
        }

        //method="POST" 

    }

    return (
        <div className={classes.app}>
            <div className={classes.auth}>
                <Text size="lg" className={classes.authH1}>{props.header}</Text>
                <form onSubmit={submitHandler} noValidate >
                    <div className={classes.formControlLabel}>
                        <Input.Wrapper mt="xl" label='Email'>
                            <Input
                                placeholder="Your email"
                                type='email'
                                id='email'
                                required
                                ref={emailInputRef}
                            />
                            {isEmailInvalid && <span>Email is invalid</span>}
                        </Input.Wrapper>

                    </div>
                    <div className={classes.formControlLabel}>
                        <Input.Wrapper label='Password'>
                            <Input
                                placeholder="Your password"
                                type='password'
                                id='password'
                                required
                                ref={passwordInputRef}
                            />
                            {isPasswordInvalid && <span>Password is invalid</span>}
                        </Input.Wrapper>
                    </div>
                    <div className={classes.formAction}>
                        <Button
                            size={'sm'}
                            variant="filled"
                            type='submit'>
                            {props.header}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AuthForm.propTypes = {
    type: PropTypes.oneOf(['signin', 'signup']),
    header: PropTypes.string,
};

