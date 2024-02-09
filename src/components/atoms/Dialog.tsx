import { FunctionComponent } from 'react';

interface IDialog {
  isOpen: boolean;
  description: string;
  buttonLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}
const Dialog: FunctionComponent<PartialBy<IDialog, 'buttonLabel' | 'description'>> = (props) => {
  const { isOpen, onClose, onConfirm, buttonLabel, description } = props;
  return (
    <dialog className="modal backdrop-blur-sm" open={isOpen}>
      <div className="modal-box bg-surface-mix-200">
        <h3 className="font-bold text-lg">Warning</h3>
        <p className="py-4 font-medium">{description ?? 'Press ESC key or click the button below to close'}</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-4">
            <button
              className="btn bg-surface-mix-300 hover:opacity-85 hover:bg-surface-mix-300 outline-none border-none"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn bg-surface-mix-300 hover:opacity-85 hover:bg-surface-mix-300 outline-none border-none"
              onClick={onConfirm}
            >
              {buttonLabel ?? 'Confirm'}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
export default Dialog;
