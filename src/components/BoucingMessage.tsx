import clsx from "clsx"
import { IBoucingMesssageBox } from "../@types"
import { useAppSelector } from "../hooks"
import Icon from "./atoms/Icon"
import { AiOutlineArrowDown } from "react-icons/ai"

const BouncingMessage: React.FunctionComponent<IBoucingMesssageBox> = ({ handleClickBouncing }) => {
    const { isOpen } = useAppSelector(state => state.bouncing)
    return <>
        <div className={clsx('absolute z-20 bottom-24 left-1/2 -translate-x-[50%] animate-bounce w-7 h-7 bg-blue-500 rounded-full drop-shadow-md cursor-pointer flex items-center justify-center hover:bg-blue-400', isOpen ? "visible" : "invisible")}>
            <button onClick={handleClickBouncing}>
                <Icon className='text-xl text-white'>
                    <AiOutlineArrowDown />
                </Icon>
            </button>
        </div>
    </>
}
export default BouncingMessage