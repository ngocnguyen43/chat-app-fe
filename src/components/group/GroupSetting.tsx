import { ElementRef, useRef, MouseEvent, useCallback, useId } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setGroupSetting } from '../../store/group-slice';
import { isValidUrl } from '../../utils';
import Icon from '../atoms/Icon';
import { IoMdRemoveCircle } from 'react-icons/io';

export default function GroupSetting() {
    const divRef = useRef<ElementRef<'div'>>(null);
    const dispacth = useAppDispatch();
    const { type } = useAppSelector(state => state.groupSetting)
    const { participants } = useAppSelector(state => state.currentConversation)
    const handleOnClick = useCallback(
        (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
            if (divRef.current && !divRef.current.contains(event.target as HTMLElement)) {
                dispacth(setGroupSetting('none'));
            }
        },
        [dispacth],
    );
    const id = useId()
    return (
        <>
            {
                type !== "none" &&
                <div className='fixed top-0 left-0 w-full h-full backdrop-blur-sm z-20 flex items-center justify-center' onClick={handleOnClick}>
                    <div className='w-[30%] h-[80%] bg-surface-mix-300  border-none rounded-2xl flex p-2 z-40 relative flex-col gap-2' ref={divRef}>
                        <div className='w-full bg-surface-mix-600 h-16 rounded-xl mb-4'></div>

                        {
                            participants.map(p => {
                                return (
                                    <div key={id + p.id} className='flex items-center gap-4 w-full'>
                                        <div className='avatar'>
                                            <div className='w-16 rounded-full'>
                                                <img src={isValidUrl(decodeURIComponent(p.avatar))
                                                    ? decodeURIComponent(p.avatar)
                                                    : 'https://d3lugnp3e3fusw.cloudfront.net/' + decodeURIComponent(p.avatar)} alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <span className='flex items-center justify-center font-medium text-xl '>{p.fullName}</span>
                                        </div>
                                        <div className='flex items-end flex-1 justify-end'>
                                            <Icon size='25'>
                                                <IoMdRemoveCircle />
                                            </Icon>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}
