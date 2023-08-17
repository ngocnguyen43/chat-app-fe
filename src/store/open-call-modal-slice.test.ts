import { openCallModalReducer, setOpenCallModal } from './open-call-modal';

describe('open call modal slice test', () => {
  it('should return  object with property value is false  with  as initial state', () => {
    expect(openCallModalReducer(undefined, { type: 'noops' })).toEqual({ isOpenCallModal: false });
  });
  it('should set open call modal', () => {
    expect(openCallModalReducer({}, setOpenCallModal(true))).toEqual({ isOpenCallModal: true });
  });
});
