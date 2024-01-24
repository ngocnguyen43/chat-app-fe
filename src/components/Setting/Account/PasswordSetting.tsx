import React from 'react'
import { useForm } from 'react-hook-form';
import Label from '../../atoms/Label';
import clsx from 'clsx';

type ChangePasswordValueType = {
    oldPassword: string;
    newPassword: string
};
export default function PasswordSetting() {
    const { register, handleSubmit, getValues, formState } = useForm<ChangePasswordValueType>();
    const id = React.useId();
    const { errors, isValid, isDirty, isSubmitting } = formState;
    return (
        <form>
            <fieldset>
                <div className="flex-col flex gap-6">
                    <div className="flex flex-col gap-2 max-h-24 relative mb-12">
                        <Label className="" htmlFor={id + 'old-pw'}>
                            Old pasword
                        </Label>
                        <input
                            className={clsx(
                                'w-full space-y-1 font-medium py-2 px-2 bg-transparent absolute -bottom-11 rounded-lg border-[1px] focus:outline-none focus:border-[2px] focus:border-gray-500',
                                errors.oldPassword ? 'border-red-400 focus:outline-none' : 'border-gray-300',
                            )}
                            type="password"
                            id={id + 'old-pw'}
                            autoComplete="new-password"
                            {...register('oldPassword', {
                                required: 'This field is required',
                            })}
                        />
                        <p className={clsx('text-xs text-red-500 absolute -bottom-16')}>{errors.oldPassword?.message}</p>
                    </div>
                    <div className="flex flex-col gap-2 relative mb-12">
                        <Label className="" htmlFor={id + 'new-pw'}>
                            New Password
                        </Label>
                        <div className="relative">
                            <input
                                className={clsx(
                                    'w-full space-y-1 font-medium py-2 px-2 bg-transparent rounded-lg border-[1px] focus:outline-none focus:border-[2px] focus:border-gray-500 absolute',
                                    errors.newPassword?.message ? 'border-red-400 focus:outline-none' : 'border-gray-300',
                                )}
                                type="password"
                                id={id + 'new-pw'}
                                autoComplete="username"
                                {...register('newPassword', {
                                    required: 'This field is required',
                                })}
                            />
                        </div>
                        <p className="text-xs text-red-500 absolute -bottom-16">{errors.oldPassword?.message}</p>
                    </div>
                    <div className=' flex justify-end' >
                        <button className='text-white p-2 items-center flex  rounded-xl px-2 bg-purple-500'>Save</button>
                    </div>
                </div>
            </fieldset>
        </form>
    )
}
