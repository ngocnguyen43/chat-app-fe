import clsx from 'clsx';
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaLock } from "react-icons/fa6";
import { usePassword } from '../../hooks/usePassword';
import { AuthStageContext, AuthStageState, UserContext } from '../../store/context';
import Card from '../atoms/Card';
import Spinner from '../atoms/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearAccount, setPassword } from '../../store/account-slice';
import { useContext, useId } from 'react';
import Icon from '../atoms/Icon';

type PasswordValue = {
  password: string;
};
export default function Password() {
  const id = useId();
  const { register, handleSubmit, formState, getValues, setError } = useForm<PasswordValue>();
  const { user } = useContext(UserContext);
  const { errors, isSubmitting, isDirty, isValid } = formState;
  const { mutate, isPending } = usePassword();
  const navigate = useNavigate();
  const { setStage } = useContext<AuthStageState>(AuthStageContext);
  const { '2fa': mf } = useAppSelector((state) => state.authOptions);
  const dispatch = useAppDispatch();
  const onClickOptions = () => {
    setStage(2);
    navigate('/login-options');
  };
  const onClickSubmit = () => {
    if (!mf) {
      mutate(getValues('password'), {
        onError: () => {
          setError('password', {
            type: 'server',
            message: 'Please check your password and try again!',
          });
        },
      });
    } else {
      dispatch(setPassword(getValues('password')));
      navigate('/verify');
    }
  };
  const onUserClick = () => {
    dispatch(clearAccount());
    navigate('/signin');
  };
  return (
    <Card className="flex flex-col items-center gap-8 py-12 px-8 w-[400px] max-w-md text-color-base-100">
      <div className="flex items-center text-center flex-wrap justify-center w-full">
        <h2 className="text-2xl font-semibold flex items-center justify-center">Welcome</h2>
        {user && (
          <button
            onClick={onUserClick}
            className="w-full py-2 items-center justify-center  text-base hover:scale-105 hover:bg-surface-mix-300 rounded-2xl font-medium transition-all flex"
          >
            {user}
          </button>
        )}
      </div>
      <form action="" className="w-full flex flex-col gap-8" onSubmit={handleSubmit(onClickSubmit)}>
        <div className="flex-col flex gap-8">
          <div className="flex flex-row relative border-2 border-color-base-100 items-center rounded-xl">
            <div className='px-2'>
              <Icon>
                <FaLock />
              </Icon>
            </div>
            <input
              required
              className="w-full text-lg space-y-1 font-medium py-2 bg-transparent rounded-lg  focus:outline-none border-none placeholder:font-medium"
              type="password"
              placeholder="Password"
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
                'py-2 px-6 text-lg rounded-xl  font-bold   text-color-base-100 bg-primary-500 w-[130px] ',
                !isDirty || !isValid || isSubmitting || isPending
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'hover:scale-105 active:scale-100 transition duration-200 ease-in-out bg-primary cursor-pointer',
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
              className="py-2 px-2 text-base rounded-xl  font-bold w-[150px] bg-transparent hover:scale-105 active:scale-100 transition duration-200 ease-in-out text-primary-500"
            >
              Try other way
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
}
