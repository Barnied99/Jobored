import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';

import useValidation from '../utills/use-validation';
import { userActions } from '../store/slice/user-slice';
import { useAppDispatch } from '../utills/hooks';
import { LoginFormPayload } from '../store/slice/user-slice';
import '../App.css'

const AuthForm: React.FC<{ header: any; type: any }> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      navigate(0);
    }
  };

  return (
    <section className='auth'>
      <h1>{props.header}</h1>
      <form onSubmit={submitHandler} noValidate>
        <div className='form__control'>
          <label htmlFor='email'>Your Email</label>
          <input
            className='transparent'
            type='email'
            id='email'
            required
            ref={emailInputRef}
          />
          {isEmailInvalid && <span>Email is invalid</span>}
        </div>
        <div className='form__control'>
          <label htmlFor='password'>Your Password</label>
          <input
            className='transparent'
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
          {isPasswordInvalid && <span>Password is invalid</span>}
        </div>
        <div className='form__action'>
          <Button
            size={'sm'}
            variant="filled"
            c="#ACADB9"
            type='submit'>
            {props.header}
          </Button>
        </div>
      </form>
    </section>
  );
};

AuthForm.propTypes = {
  type: PropTypes.oneOf(['signin', 'signup']),
  header: PropTypes.string,
};

export default AuthForm;
