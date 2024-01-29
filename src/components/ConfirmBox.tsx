import React from 'react';

type ConfirmBoxType = {
  message: string;
  handler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setShouldShow: (element: boolean) => void;
  cancel: (e: React.MouseEvent<HTMLBRElement, MouseEvent>) => void;
};

const ConfirmBox: React.FunctionComponent<ConfirmBoxType> = (props) => {
  const { message, handler, setShouldShow } = props;
  return (
    <>
      {message ? (
        <div className="backdrop-blur-0 w-full h-full flex items-center justify-center fixed top-0 left-0">
          <div className="bg-white w-[40%] h-[40%]">
            {message}
            <button onClick={handler}>OK</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShouldShow(false);
              }}
            >
              close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ConfirmBox;
