import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import lockLogo from '../../assets/lock.svg';
import passkeyLogo from '../../assets/passkey.svg';
import questionLogo from '../../assets/question.svg';
import { useAppSelector } from '../../hooks';
import { AuthStageContext, UserContext } from '../../store/context';
import Card from '../atoms/Card';

export default function Options() {
  const { user } = useContext(UserContext);
  const { setStage } = useContext(AuthStageContext);
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
    <Card className="flex flex-col items-center gap-8 py-12 px-8 w-[400px] text-color-base-100">
      <div className="flex items-center text-center flex-col justify-center w-full">
        <h2 className="text-2xl font-semibold flex items-center justify-center">Welcome</h2>
        {user && (
          <button
            onClick={onUserClick}
            className="py-1 px-6 text-sm rounded-2xl font-medium w-full bg-inherit hover:bg-surface-mix-300 cursor-pointer hover:scale-105 active:scale-100 transition duration-200 ease-in-out"
          >
            <p className="text-color-base-100 font-medium">{user}</p>
          </button>
        )}
      </div>
      <div className="flex-col flex gap-6 relative w-full">
        <h2 className="text-sm font-semibold flex items-center justify-center">Choose how you want to sign in:</h2>
        <div className="w-full flex flex-col items-start gap-4 h-40">
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            {passkey && (
              <button
                onClick={onUserPasskey}
                className="py-2 px-4  text-sm rounded-2xl font-bold text-color-base-100 w-full bg-inherit hover:bg-surface-mix-300  cursor-pointer hover:scale-105 active:scale-100 transition duration-200 ease-in-out flex flex-row gap-7"
              >
                <img src={passkeyLogo} alt="" className="w-5" />
                <h2 className="text-sm flex items-start justify-center">Use your passkey</h2>
              </button>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            {password && (
              <button
                onClick={onUserPassword}
                className="py-2 px-4 text-sm rounded-2xl font-bold text-color-base-100 w-full bg-inherit hover:bg-surface-mix-300 cursor-pointer hover:scale-105 active:scale-100 transition duration-200 ease-in-out flex flex-row gap-8"
              >
                <img src={lockLogo} alt="" className="w-4 basis-[1/8] color-surface-mix-300" />
                <h2 className="text-sm  flex items-center justify-center">Enter your password</h2>
              </button>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <button className="py-2 px-4 text-xs rounded-2xl font-bold text-color-base-100 w-full bg-inherit hover:bg-surface-mix-300 cursor-pointer hover:scale-105 active:scale-100 transition duration-200 ease-in-out flex flex-row gap-8">
              <img src={questionLogo} alt="" className="w-4 basis-[1/8]" />
              <h2 className="text-sm  flex items-center justify-center">Get help</h2>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
