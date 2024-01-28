import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { increase } from '../../../store/fake-slice';
import ConfirmBox from '../../ConfirmBox';
import Profile from './Profile';

export default function GeneralSetting() {
  const { counter } = useAppSelector((state) => state.fake);
  const dispactch = useAppDispatch();
  const [shouldShow, setShouldShow] = React.useState<boolean>(false);
  return (
    <div className="w-full">
      <Profile />
      {counter}
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          setShouldShow(true);
        }}
      >
        Open
      </button>
      {shouldShow && (
        <ConfirmBox
          handler={() => {
            dispactch(increase(2));
          }}
          setShouldShow={setShouldShow}
          message="lol"
          cancel={() => {}}
        />
      )}
    </div>
  );
}
