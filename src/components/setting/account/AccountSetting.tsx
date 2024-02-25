import { useAppSelector, useWebAuthnRegistrationOptions } from '../../../hooks';
import MFASetting from './MFASetting';
import MFASetup from './MFASetup';
import PasskeysSetting from './PasskeysSetting';
import PasswordSetting from './PasswordSetting';

export default function AccountSetting() {
  const { mutate } = useWebAuthnRegistrationOptions();
  const { shouldMFASetupOpen } = useAppSelector((state) => state.mfaSetupBox);
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    mutate();
  };
  return (
    <>
      {shouldMFASetupOpen && <MFASetup />}
      <div className="w-full p-8">
        <div className="w-full">
          <div></div>
          <div className="font-semibold p-10">
            <div>
              <div className="flex justify-between text-color-base-100">
                Passkeys
                <button
                  onClick={handleOnClick}
                  className="text-color-base-100 p-2 items-center flex  rounded-xl px-2 bg-primary-500"
                >
                  Add Passkey
                </button>
              </div>
              <PasskeysSetting />
            </div>
            <div className="flex flex-col gap-6 text-color-base-100">
              Password
              <PasswordSetting />
            </div>
            <div>
              <MFASetting />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
