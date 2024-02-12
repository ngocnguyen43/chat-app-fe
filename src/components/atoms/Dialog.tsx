import { FunctionComponent } from 'react';
import { useAppSelector } from '../../hooks';
import { useLogout } from '../../hooks/useLogout';

interface IDialog {
  isOpen: boolean;
  description: string;
  buttonLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}
const Dialog: FunctionComponent<PartialBy<IDialog, 'buttonLabel' | 'description'>> = (props) => {
  const { isOpen, onClose, onConfirm, buttonLabel, description } = props;
  const { isError: isContactsError } = useAppSelector((state) => state.contacts);
  const { isError: isConversationsError } = useAppSelector((state) => state.conversations);
  const { isError: isInfomationError } = useAppSelector((state) => state.information);
  const { isAuthError } = useAppSelector((state) => state.error);
  const { mutate } = useLogout();
  const isError = isContactsError || isConversationsError || isInfomationError || isAuthError;

  return (
    <>
      {
        <dialog className="modal backdrop-blur-sm" open={isOpen || isError}>
          <div className="modal-box bg-surface-mix-200">
            <h3 className="font-bold text-lg">{isError ? 'Error' : 'Warning'}</h3>
            <p className="py-4 font-medium">{isError ? "Session expired. Please log in again! " : description}</p>
            <div className="modal-action">
              <form method="dialog" className="flex gap-4">
                {!isError && (
                  <button
                    className="btn bg-surface-mix-300 hover:opacity-85 hover:bg-surface-mix-300 outline-none border-none"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                )}
                <button
                  className="btn bg-surface-mix-300 hover:opacity-85 hover:bg-surface-mix-300 outline-none border-none"
                  onClick={() => {
                    if (isError) {
                      mutate();
                    } else {
                      onConfirm();
                    }
                  }}
                >
                  {buttonLabel}
                  {isError && 'Log out'}
                </button>
              </form>
            </div>
          </div>
        </dialog>
      }
    </>
  );
};
export default Dialog;
