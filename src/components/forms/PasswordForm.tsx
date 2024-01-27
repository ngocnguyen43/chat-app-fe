/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthStageContext, AuthStageState, UserContext } from '../../store/context';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import Label from '../atoms/Label';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { usePassword } from '../../hooks/usePassword';
import Spinner from '../atoms/Spinner';
type PasswordValue = {
  password: string;
};
export default function Password() {
  const id = React.useId();
  const { register, handleSubmit, formState, getValues, setError } = useForm<PasswordValue>();
  const { user } = React.useContext(UserContext);
  const { errors, isSubmitting, isDirty, isValid } = formState;
  const { mutate, isPending } = usePassword();
  const navigate = useNavigate();
  const { setStage } = React.useContext<AuthStageState>(AuthStageContext);

  const onClickOptions = () => {
    setStage(2);
    navigate('/login-options');
  };
  const onClickSubmit = () => {
    mutate(getValues('password'), {
      onError: () => {
        setError('password', {
          type: 'server',
          message: 'Please check your password and try again!',
        });
      },
    });
  };
  const onUserClick = () => {
    navigate('/signin');
  };
  return (
    <Card className="flex flex-col items-center gap-8 py-12 px-12 max-w-md">
      <div className="flex items-center text-center flex-wrap justify-center">
        <h2 className="text-2xl font-semibold flex items-center justify-center">Welcome</h2>
        {user && (
          <Button
            onClick={onUserClick}
            intent={'text'}
            size={'small'}
            className="w-full py-2 items-center justify-center px-4 !text-sm bg-primary-button-light text-text-light flex"
          >
            {user}
          </Button>
        )}
      </div>
      <form action="" className="w-full flex flex-col gap-8" onSubmit={handleSubmit(onClickSubmit)}>
        <div className="flex-col flex gap-8">
          <div className="flex flex-col gap-2 relative">
            <Label className="text-start text-sm font-semibold" htmlFor={id + 'password'}>
              Password
            </Label>
            <input
              required
              className="w-full text-lg space-y-1 font-medium py-2 px-2 bg-transparent rounded-lg border-[1px] "
              type="password"
              placeholder=""
              id={id + 'password'}
              autoComplete="current-password"
              {...register('password', {
                required: true,
              })}
            />
            <p className="text-xs text-red-500 absolute -bottom-5">{errors.password?.message}</p>
          </div>
          <div className="flex flex-row-reverse justify-between gap-4">
            <button
              type={'submit'}
              className={clsx(
                'py-2 px-6 text-lg rounded-xl  font-bold   text-text-dark w-[130px] ',
                !isDirty || !isValid || isSubmitting || isPending
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'hover:scale-105 active:scale-100 transition duration-200 ease-in-out bg-primary-button-light cursor-pointer',
              )}
              disabled={!isDirty || !isValid || isSubmitting || isPending}
            >
              {!isPending ? (
                <p className=""> Continue</p>
              ) : (
                <div className="w-full">
                  <Spinner size="loading-xs" />
                </div>
              )}
            </button>
            <button
              onClick={onClickOptions}
              className="py-2 px-2 text-base rounded-xl  font-bold w-[150px] bg-transparent hover:scale-105 active:scale-100 transition duration-200 ease-in-out text-text-light"
            >
              Try other way
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
}
