import { ElementRef, useCallback, useRef, MouseEvent, useId } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setAdvanceMessage } from '../../store/advance-messages';
import useFetchImageMessages from '../../hooks/useFetchImageMessages';
import clsx from 'clsx';

export default function AdvanceMessages() {
  const divRef = useRef<ElementRef<'div'>>(null);
  const dispacth = useAppDispatch();
  const { type } = useAppSelector((state) => state.advanceMessage);
  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      if (divRef.current && !divRef.current.contains(event.target as HTMLElement)) {
        dispacth(setAdvanceMessage('none'));
      }
    },
    [dispacth],
  );
  const { data } = useFetchImageMessages();
  const id = useId();
  return (
    <>
      {type !== 'none' && (
        <div
          className="fixed w-full h-full backdrop-blur-sm top-0 left-0 flex items-center  justify-center z-30"
          onClick={handleOnClick}
        >
          <div
            ref={divRef}
            className="w-[30%] h-[80%] bg-surface-mix-300  border-none rounded-2xl flex p-2 z-40 relative flex-col"
          >
            <div className="w-full h-[75px] flex justify-around py-4">
              <div className="text-xl font-semibold cursor-pointer ">Image</div>
              <div className="text-xl font-semibold cursor-pointer">Video</div>
              <div className="text-xl font-semibold cursor-pointer">File</div>
            </div>
            <div className="overflow-y-scroll flex shrink-[1] flex-wrap gap-2">
              {data &&
                data.photos.length &&
                data.photos.map((p) => {
                  return (
                    <div
                      key={p.id + id}
                      className={clsx('flex-1 rounded-[8px] overflow-hidden relative basis-[calc(50%-0.5rem)]')}
                    >
                      <img src={p.url} alt="" className={clsx('w-full object-cover align-middle h-48')} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
