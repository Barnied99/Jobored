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

    const submitHandler = (event: React.FormEvent) => {
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
            router.push('/');
        }
    };

    return (
        <div className={classes.app}>
            <div className={classes.auth}>
                <Text size="lg" className={classes.authH1}>{props.header}</Text>
                <form onSubmit={submitHandler} noValidate>
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
                            c="#ACADB9"
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

