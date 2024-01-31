/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import { env } from '../../config';
import { useSignup } from '../../hooks/useSignup';
import Anchor from '../atoms/Anchor';
import Card from '../atoms/Card';
import Spinner from '../atoms/Spinner';
import { useEffect, useId, useRef } from 'react';

type SignUpValues = {
  fullname: string;
  email: string;
  password: string;
  'rp-password': string;
};
const SignUp = () => {
  const id = useId();
  const spanRef = useRef<HTMLSpanElement>(null);
  const form = useForm<SignUpValues>({
    mode: 'onBlur',
  });
  const { register, handleSubmit, formState, watch } = form;
  const { mutate, isPending } = useSignup();
  const { errors, isValid, isDirty, isSubmitting } = formState;
  const onSubmit = (data: SignUpValues) => {
    mutate({
      userName: data.fullname,
      email: data.email,
      fullName: data.fullname,
      password: data.password,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    });
  };
  useEffect(() => {
    document.title = 'Create your account';
  }, []);
  return (
    <>
      <Card className="flex flex-col items-center gap-6 py-12 px-20 w-[28rem]">
        <div>
          <h2 className="text-2xl  font-semibold">Create Account </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-10" noValidate>
          <fieldset>
            <div className="flex-col flex gap-6">
              <div className="flex flex-col gap-2 max-h-24 relative mb-12">
                <label className="text-color-base-100 font-medium" htmlFor={id + 'full-name'}>
                  Full Name
                </label>
                <input
                  className={clsx(
                    'w-full space-y-1 font-medium py-2 px-2 bg-surface-mix-200 absolute -bottom-11 rounded-lg border-2 focus:outline-none focus:border-[2px] focus:border-color-base-100',
                    errors.fullname?.message ? 'border-red-400 focus:outline-none' : 'border-color-base-100',
                  )}
                  type="text"
                  id={id + 'full-name'}
                  // error={!!errors.fullname?.message}
                  autoComplete="name"
                  {...register('fullname', {
                    required: 'This field is required',
                  })}
                />
                <p className={clsx('text-xs text-red-500 absolute -bottom-16')}>{errors.fullname?.message}</p>
              </div>
              <div className="flex flex-col gap-2 relative mb-12">
                <label className="text-color-base-100 font-medium" htmlFor={id + 'email'}>
                  Email address
                </label>
                <div className="relative">
                  <input
                    className={clsx(
                      'w-full space-y-1 font-medium py-2 px-2 bg-surface-mix-200 absolute -bottom-11 rounded-lg border-2 focus:outline-none focus:border-[2px] focus:border-color-base-100',
                      errors.email?.message ? 'border-red-400 focus:outline-none' : 'border-color-base-100',
                    )}
                    type="email"
                    id={id + 'email'}
                    autoComplete="username"
                    {...register('email', {
                      required: 'This field is required',
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: 'Invalid email',
                      },
                      validate: {
                        validateState: (data) => {
                          const regrex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
                          return regrex.test(data) || 'Invalid email';
                        },
                        validateExist: async (data) => {
                          if (spanRef.current) {
                            spanRef.current.classList.add('!block');
                            const res =
                              ((await (await fetch(env.BACK_END_URL + `/user/check-exist?user=${data}`)).json()) as {
                                message: string;
                              }) || null;
                            spanRef.current.classList.remove('!block');
                            if (!res) {
                              return true;
                            } else {
                              return res.message;
                            }
                          }
                        },
                      },
                    })}
                  />
                  <span
                    className="loading loading-spinner loading-xs absolute hidden z-10 right-2 -bottom-7"
                    ref={spanRef}
                  ></span>
                </div>
                <p className="text-xs text-red-500 absolute -bottom-16">{errors.email?.message}</p>
              </div>
              <div className="flex flex-col gap-2 relative mb-12">
                <label className="font-medium text-color-base-100" htmlFor={id + 'password'}>
                  Password
                </label>
                <input
                  className="w-full space-y-1 font-medium py-2 px-2 bg-surface-mix-200 rounded-lg border-2 border-color-base-100 focus:outline-none focus:border-[2px] focus:border-color-base-100 absolute -bottom-11"
                  required
                  type="password"
                  id={id + 'password'}
                  autoComplete="new-password"
                  {...register('password')}
                />
              </div>
              <div className="flex flex-col gap-2 relative mb-12">
                <label className="text-color-base-100 font-medium" htmlFor={id + 'rp-password'}>
                  Confirm Password
                </label>
                <input
                  className={clsx(
                    'w-full space-y-1 font-medium py-2 px-2 bg-surface-mix-200 rounded-lg border-2  border-color-base-100 focus:outline-none focus:border-[2px] focus:border-color-base-100 absolute -bottom-11',
                    errors['rp-password']?.message ? 'border-red-400 focus:outline-none' : 'border-color-base-100',
                  )}
                  required
                  type="password"
                  id={id + 'rp-password'}
                  autoComplete="new-password"
                  {...register('rp-password', {
                    validate: {
                      validateMatch: (data) => {
                        const password = watch('password');
                        return password === data || 'Password and confirm password do not match';
                      },
                    },
                  })}
                />
                <p className="text-xs text-red-500 absolute -bottom-16">{errors['rp-password']?.message}</p>
              </div>
              <div className="flex flex-col gap-4 mt-2">
                <button
                  type={'submit'}
                  className={clsx(
                    'py-2 px-6 text-lg rounded-xl  font-bold   text-text-dark w-full ',
                    !isDirty || !isValid || isSubmitting || isPending
                      ? 'bg-surface-mix-300 cursor-not-allowed'
                      : 'hover:scale-105 active:scale-100 transition duration-200 ease-in-out bg-primary-200 cursor-pointer',
                  )}
                  disabled={!isDirty || !isValid || isSubmitting || isPending}
                >
                  {!isPending ? (
                    <p className="text-color-base-100"> Create account</p>
                  ) : (
                    <div className="w-full">
                      <Spinner size="loading-xs" />
                    </div>
                  )}
                </button>
                <h5 className="text-base font-normal">
                  Already have an account ?{' '}
                  <Anchor href="/signin" className="text-color-base-100-light text-base font-semibold">
                    Sign in
                  </Anchor>{' '}
                </h5>
              </div>
            </div>
          </fieldset>
        </form>
      </Card>
    </>
  );
};
export default SignUp;
