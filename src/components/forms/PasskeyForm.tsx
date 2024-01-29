import clsx from 'clsx';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import passkeyLogo from '../../assets/passkey.svg';
import { useWebAuthnLoginOptions } from '../../hooks';
import { AuthStageContext, UserContext } from '../../store/context';
import Card from '../atoms/Card';

export default function PasskeyForm() {
  const navigate = useNavigate();
  const { setStage } = useContext(AuthStageContext);
  const { user } = useContext(UserContext);
  const { mutate } = useWebAuthnLoginOptions();
  const onOptions = () => {
    setStage(2);
    navigate('/login-options');
  };
  const handlePasskey = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    mutate(user as string);
  };
  return (
    <Card className="flex flex-col items-center gap-8 py-12 px-12 max-w-md">
      <div className="flex items-center text-center flex-wrap">
        <h2 className="text-2xl font-semibold flex items-center justify-center">
          Use your passkey to confirm it&#x27;s really you
        </h2>
      </div>
      <form action="" className="w-full flex flex-col gap-8">
        <div className="flex-col flex gap-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <img src={passkeyLogo} alt="" className="w-40 text-text-light" />
            <h5 className="text-sm font-semibold">Your device will ask for your fingerprint, face, or screen lock</h5>
          </div>
          <div className="flex flex-row-reverse justify-between gap-4">
            <button
              type={'submit'}
              onClick={handlePasskey}
              className={clsx(
                'py-1 px-4 text-sm rounded-xl  font-bold  text-text-dark w-full hover:scale-105 active:scale-100 transition duration-200 ease-in-out bg-primary-button-light cursor-pointer',
              )}
            >
              Continue
            </button>
            <button
              onClick={onOptions}
              className={clsx(
                'py-1 px-4 text-sm rounded-xl  font-bold   text-text-dark w-full bg-gray-300 cursor-pointer hover:scale-105 active:scale-100 transition duration-200 ease-in-out ',
              )}
            >
              Try other way
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
}
