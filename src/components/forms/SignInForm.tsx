import clsx from 'clsx';
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useLoginOptions } from '../../hooks';
import { Storage } from '../../service';
import { AuthStageContext, AuthStageState, UserContext } from '../../store/context';
import Anchor from '../atoms/Anchor';
import Card from '../atoms/Card';
import Label from '../atoms/Label';
import OAuthButton from '../atoms/OAuthButton';
import Spinner from '../atoms/Spinner';
import { setEmail } from '../../store/account-slice';

type SignInValue = {
  email: string;
};
export default function SignIn() {
  const { register, handleSubmit, getValues, formState, setError } = useForm<SignInValue>();
  const { isDirty, isSubmitting, isValid, errors } = formState;
  const { setStage } = React.useContext<AuthStageState>(AuthStageContext);
  const { mutate, isPending } = useLoginOptions();
  const { setUser } = React.useContext(UserContext);
  const dispatch = useAppDispatch();
  const onSubmit = () => {
    setStage(1);
    setUser(getValues('email'));
    dispatch(setEmail(getValues('email')));
    Storage.Set('_e', getValues('email'));
    mutate(getValues('email'), {
      onError: () => {
        setError('email', {
          type: 'server',
          message: 'Please try again later!',
        });
      },
    });
  };
  React.useEffect(() => {
    document.title = 'Sign in';
  }, []);
  console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);
  console.log(document.getElementsByTagName('body'));

  return (
    <Card className="flex flex-col gap-8 py-12 px-20 w-[26rem]">
      <div>
        <h2 className="text-3xl text-color-base-100 font-bold">Sign In</h2>
        <h4 className="text-xl font-medium text-color-light">to continue to chat</h4>
      </div>
      <div className="w-full flex justify-between">
        <OAuthButton mode="google" />
        {/* <Button onClick={() => onClick()}>Test</Button> */}
        <OAuthButton mode="github" />
        <OAuthButton mode="facebook" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-8">
        <div>
          <h2 className="w-full text-center border-b-2 border-solid border-color-base-100 leading-[0.1em] mt-4 mx-0 mb-2">
            <span className="px-4 bg-surface-mix-200 font-medium">or</span>
          </h2>
        </div>
        <div className="flex-col flex gap-6">
          <div className="flex flex-col gap-2 relative mb-14">
            <Label className="text-sm font-medium text-color-base-100" htmlFor="email">
              Email address
            </Label>
            <input
              spellCheck={false}
              className=" w-full rounded-lg px-2 py-2 absolute bg-surface-mix-200 text-color-base border-color-base-100 border-2 -bottom-12 font-medium focus:outline-none focus:border-2 focus:border-x-color-base visited:border-none"
              required
              type="email"
              id="email"
              autoComplete="username webauthn"
              {...register('email', {
                required: true,
              })}
            />
            <p className="text-xs text-red-500 absolute font-medium -bottom-16">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              type={'submit'}
              className={clsx(
                'py-2 px-6 text-lg rounded-xl  font-bold   text-color-base-100 w-full flex items-center justify-center',
                !isDirty || !isValid || isSubmitting || isPending
                  ? 'bg-surface-mix-300 cursor-not-allowed'
                  : 'hover:scale-105 active:scale-100 transition duration-200 ease-in-out bg-primary-500 cursor-pointer',
              )}
              disabled={!isDirty || !isValid || isSubmitting || isPending}
            >
              {isPending ? <Spinner size="loading-md" /> : <p className="text-color-base-100">Continue</p>}
            </button>
            <h5 className="text-sm font-normal text-color-light-100">
              Don&apos;t have account ?{' '}
              <Anchor href="/signup" className="text-color-base-100 font-semibold">
                Register now
              </Anchor>{' '}
            </h5>
          </div>
        </div>
      </form>
    </Card>
  );
}
