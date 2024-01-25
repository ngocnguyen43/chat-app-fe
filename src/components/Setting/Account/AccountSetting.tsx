import React from 'react';
import { useWebAuthnRegistrationOptions } from '../../../hooks';
import PasskeysSetting from './PasskeysSetting';
import PasswordSetting from './PasswordSetting';

export default function AccountSetting() {
  const { mutate } = useWebAuthnRegistrationOptions();
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    mutate();
  };
  return (
    <div className="w-full p-8">
      <div className="w-full">
        <div></div>
        Authentication
        <div className="font-semibold p-10">
          <div>
            <div className="flex justify-between">
              Passkeys
              <button
                onClick={handleOnClick}
                className="text-white p-2 items-center flex  rounded-xl px-2 bg-purple-500"
              >
                Add Passkey
              </button>
            </div>
            <PasskeysSetting />
          </div>
          <div className="flex flex-col gap-6">
            Password
            <PasswordSetting />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
