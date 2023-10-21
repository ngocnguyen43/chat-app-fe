import { FaPhone } from "react-icons/fa6"
import Icon from "../atoms/Icon"
import clsx from "clsx"

interface IPhoneICon {
    color: "green" | "red"
}
const PhoneIcon: React.FunctionComponent<IPhoneICon> = (props) => {
    const { color } = props
    return (
        <div className={clsx("text-white text-3xl", color === "red" ? "rotate-[135deg]" : "")}>
            <Icon className={""}>
                <FaPhone />
            </Icon>
        </div>
    )
}
export default PhoneIcon