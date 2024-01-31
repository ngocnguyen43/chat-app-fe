/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, useId } from 'react';
import { useForm } from 'react-hook-form';

type DeleteFormType = {
  checked: boolean;
};
export default function DeleteSetting() {
  const [checked, setChecked] = useState<boolean>(false);
  const id = useId();
  const { register, formState, handleSubmit, reset } = useForm<DeleteFormType>();
  const { errors, isSubmitting, isDirty, isValid } = formState;
  const handleLog = () => {
    console.log({ errors, isSubmitting, isDirty, isValid });
    setChecked((prev) => !prev);
    reset();
  };
  return (
    <div className="p-8 flex flex-col text-color-base-100">
      <h1 className="text-2xl font-semibold mb-4">Delete your account</h1>
      <p className="text-sm flex-2 mb-8 font-medium">All your data will be erased and can not recoverable </p>
      <form onSubmit={handleSubmit(handleLog)}>
        <div className="flex gap-2 mb-2">
          <input
            id={id + 'check'}
            type="checkbox"
            checked={checked}
            {...register('checked', {
              required: true,
              onChange: () => {
                setChecked((prev) => !prev);
              },
            })}
          />
          <label htmlFor={id + 'check'} className="font-medium">
            I understand the consequences
          </label>
        </div>
        <button
          className="bg-red-400 drop-shadow-lg p-2 items-center flex font-semibold rounded-xl  disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={!isDirty || !isValid || isSubmitting}
        >
          Delete Account
        </button>
      </form>
    </div>
  );
}
