import { useEffect } from 'react';
import { useAppDispatch } from '../../../hooks';
import { useDelete2FA } from '../../../hooks/useDelete2FA';
import { useFetch2FA } from '../../../hooks/useFetch2FA';
import { setMFASetupOpen } from '../../../store/MFA-setup-slice';
import { setAuthError } from '../../../store';

export default function MFASetting() {
  const dispatch = useAppDispatch();
  const { data, isError } = useFetch2FA();
  const { mutate } = useDelete2FA();
  useEffect(() => {
    dispatch(setAuthError(isError))
  }, [dispatch, isError])
  return (
    <div className="flex flex-col gap-2">
      {data && !data['2fa'] ? (
        <>
          <h1 className="text-color-base-100 font-semibold">Two-factor authenticator</h1>
          <p className="text-sm font-normal pb-2 text-color-base-100">
            Protect your account from unauthorized access by requiring one-time authentication codes to login
          </p>
          <div className="flex justify-end">
            <button
              className="text-color-base-100 p-2 items-center flex  rounded-xl px-2 bg-primary-500"
              onClick={() => {
                dispatch(setMFASetupOpen(true));
              }}
            >
              Enable 2FA
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-color-base-100 font-semibold">Two-factor authenticator</h1>
          <p className="text-sm font-normal pb-2 text-color-base-100">
            Your account has been enabled one-time authentication codes to login
          </p>
          <div className="flex justify-end">
            <button
              className="text-color-base-100 p-2 items-center flex  rounded-xl px-2 bg-surface-mix-400"
              onClick={() => {
                mutate();
              }}
            >
              Disable 2FA
            </button>
          </div>
        </>
      )}
    </div>
  );
}
