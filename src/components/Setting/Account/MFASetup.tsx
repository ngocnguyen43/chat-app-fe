import React from 'react';

import { useAppDispatch } from '../../../hooks';
import { useGet2FAQRCode } from '../../../hooks/useGet2FAQRCode';
import { useVerify2FA } from '../../../hooks/useVerify2FA';
import { setMFASetupOpen } from '../../../store/MFA-setup-slice';
import Spinner from '../../atoms/Spinner';

let currentIndex = 0;

export default function MFASetup() {
  const dispatch = useAppDispatch();
  const { data, isFetching } = useGet2FAQRCode();
  const [otp, setOtp] = React.useState<string[]>(new Array(6).fill(''));
  const [activeOTPIndex, setActiveOTPIndex] = React.useState<number>(0);
  const inputRef = React.useRef<React.ElementRef<'input'>>(null);
  const { mutate } = useVerify2FA();
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newOTP: string[] = [...otp];
    const value = event.target.value;
    newOTP[currentIndex] = value.substring(value.length - 1);
    if (!value) {
      setActiveOTPIndex(currentIndex - 1);
    } else {
      setActiveOTPIndex(currentIndex + 1);
    }
    setOtp([...newOTP]);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    currentIndex = index;
    if (event.key === 'Backspace') {
      setActiveOTPIndex(index - 1);
    }
  };
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeOTPIndex]);
  return (
    <div className="fixed w-full h-full top-0 left-0 backdrop-blur-sm z-10 flex items-center justify-center">
      <div className=" w-[500px] bg-white rounded-xl">
        <div className="flex items-center justify-center py-6 border-b-[1px] border-gray-400 text-xl font-bold">
          Enable two-factor authentication
        </div>
        <div className="py-8 px-4 border-b-[1px] border-gray-400 flex flex-col gap-4">
          <h1 className="font-semibold text-xl">1. Download an authenticator app</h1>
          <h4 className="text-base font-medium">
            Download and install <strong className="!text-blue-500">Google Authenticator</strong> or{' '}
            <strong className="!text-blue-500">Microsoft Authenticator</strong>
          </h4>
        </div>
        <div className="border-b-[1px] border-gray-400 py-8 px-4 ">
          <h1 className="font-semibold text-xl">2. Scan the QR code</h1>
          <h4 className="text-base font-medium">
            Open the authentication app and scan the QR code using your phone camera
          </h4>
          <div className="relative">
            {data ? (
              <div dangerouslySetInnerHTML={{ __html: data }}></div>
            ) : (
              <div className="w-[200px] h-[200px]  flex items-center justify-center backdrop-blur-md">
                <Spinner size="loading-md" />
              </div>
            )}
            {isFetching ? (
              <div className="w-[200px] top-0 left-0 h-full absolute flex items-center justify-center backdrop-blur-md">
                <Spinner size="loading-md" />
              </div>
            ) : null}
          </div>
        </div>
        <div className="border-b-[1px] border-gray-400 flex flex-col py-6 px-4 ">
          <h1 className="font-semibold text-xl">3. Complete setup</h1>
          <h4 className="text-base font-medium">Enter the 6-digit code</h4>
          <div className="flex justify-center items-center space-x-2 mt-4">
            {otp.map((_, index) => {
              return (
                <React.Fragment key={index}>
                  <input
                    ref={index === activeOTPIndex ? inputRef : null}
                    type="number"
                    className="w-8 h-8 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
                    onChange={handleOnChange}
                    value={otp[index]}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-end px-4 py-4 gap-4">
          <button
            className="text-color-base-100 py-1 font-medium items-center flex  rounded-xl px-2 bg-gray-400"
            onClick={() => {
              dispatch(setMFASetupOpen(false));
            }}
          >
            Cancel
          </button>
          <button
            disabled={otp.indexOf('') !== -1}
            onClick={() => {
              mutate(otp.join(''));
            }}
            className="text-color-base-100 py-1 font-medium items-center flex hover:scale-105 transition-all rounded-xl px-2 bg-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
          >
            Active
          </button>
        </div>
      </div>
    </div>
  );
}
