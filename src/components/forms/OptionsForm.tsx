import React from 'react';
import { useNavigate } from 'react-router-dom';

import lockLogo from '../../assets/lock.svg';
import passkeyLogo from '../../assets/passkey.svg';
import questionLogo from '../../assets/question.svg';
import { AuthStageContext, UserContext } from '../../store/context';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import { useAppSelector } from '../../hooks';

export default function Options() {
  const { user } = React.useContext(UserContext);
  const { setStage } = React.useContext(AuthStageContext);
  const { passkey, password } = useAppSelector((state) => state.authOptions);
  const navigate = useNavigate();
  const onUserClick = () => {
    navigate('/signin');
  };
  const onUserPasskey = () => {
    setStage(3);
    navigate('/passkey');
  };
  const onUserPassword = () => {
    setStage(1);
    navigate('/password');
  };
  return (
    <Card className="flex flex-col items-center gap-8 py-12 px-12 max-w-md">
      <div className="flex items-center text-center flex-col justify-center">
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
      <div className="flex-col flex gap-6 relative">
        <h2 className="text-sm font-semibold flex items-center justify-center">Choose how you want to sign in:</h2>
        <div className="flex flex-col items-center justify-center gap-2">
          {!passkey && (
            <Button
              onClick={onUserPasskey}
              intent={'text'}
              size={'small'}
              className="w-60 py-2 items-center justify-start px-4 !text-sm bg-primary-button-light text-text-light flex flex-row gap-8"
            >
              <img src={passkeyLogo} alt="" className="w-6 basis-[1/7]" />
              <h2 className="text-sm flex items-center justify-center">Use your passkey</h2>
            </Button>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          {password && (
            <Button
              onClick={onUserPassword}
              intent={'text'}
              size={'small'}
              className="w-60 py-2 items-center justify-start px-5 !text-sm bg-primary-button-light text-text-light flex flex-row gap-8"
            >
              <img src={lockLogo} alt="" className="w-4 basis-[1/8]" />
              <h2 className="text-sm  flex items-center justify-center">Enter your password</h2>
            </Button>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Button
            intent={'text'}
            size={'small'}
            className="w-60 py-2 items-center justify-start px-5 !text-sm bg-primary-button-light text-text-light flex flex-row gap-8"
          >
            <img src={questionLogo} alt="" className="w-4 basis-[1/8]" />
            <h2 className="text-sm  flex items-center justify-center">Get help</h2>
          </Button>
        </div>
      </div>
    </Card>
  );
}
