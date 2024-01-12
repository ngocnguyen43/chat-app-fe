import { BiSearch } from 'react-icons/bi';
import debounce from "lodash.debounce";

import Icon from '../../atoms/Icon';
import React from 'react';
import { useQueryUser } from '../../../hooks/useQueryUser';
import Select, { InputActionMeta } from 'react-select';
import { useAppSelector } from '../../../hooks';
import { useNavigate } from 'react-router-dom';

// {
//     "userId": "485a7d96-26fa-4ab1-82c7-6cc356668694",
//     "email": "test14@gmail.com",
//     "fullName": "liiiiii",
//     "request": [
//       {
//         "status": "pending"
//       }
//     ]
// }

type OptionLabelType = {
    userId: string;
    email: string;
    fullName: string;
    request: [
        {
            status: "pending" | "accepted"
        }
    ] | []
}
const FormatOptionLabel: React.FunctionComponent<OptionLabelType> = ({ userId, email, fullName, request }) => {
    // const { entities } = useAppSelector(state => state.contacts)
    return (
        <div className='flex gap-4 '>
            <div>{email}</div>
            <div >
                {fullName}
            </div>
            {request.length > 0 && <div>
                {request[0]?.status}
            </div>}
        </div>
    )
};
export default function SearchBox() {
    const [searchText, setSearchText] = React.useState<string>("");
    const [inputText, setInpuText] = React.useState("");
    const { data } = useQueryUser(searchText)
    const navigate = useNavigate()
    const setSearchTextDebounced = React.useRef(
        debounce((searchText: string) => setSearchText(searchText), 500)
    );
    const { entities } = useAppSelector(state => state.contacts)
    const handleInputChangePrimary = (inputText: string, event: InputActionMeta) => {
        // prevent outside click from resetting inputText to ""
        if (event.action !== "input-blur" && event.action !== "menu-close") {
            setInpuText(inputText);
            setSearchTextDebounced.current(inputText);
        }
    };
    console.log(data);
    const noOptionsMessage = (obj: { inputValue: string }) => {
        if (obj.inputValue.trim().length === 0) {
            return null
        }
        return 'User not found'
    }
    return (
        <div className=' relative w-full'>
            {/* <input type="text" autoComplete='off' className='input input-bordered w-full  focus:outline-none bg-[#343142] text-xl pl-10' spellCheck={false} /> */}
            <Select noOptionsMessage={noOptionsMessage}
                placeholder={"Search for a user"}
                isClearable={true}
                className='z-99 pb-1 '
                options={data}
                formatOptionLabel={FormatOptionLabel}
                // getOptionLabel={otp => otp.fullName}
                styles={{
                    input: (provided) => ({
                        ...provided,
                        cursor: "text",
                        margin: "0px",
                        padding: "2px",
                        color: "white",
                        overflow: "hidden"
                    }),
                    valueContainer: (props) => ({
                        ...props,
                        backgroundColor: "#343142",
                        width: 100,
                        height: "48px",
                        fontSize: "1.25rem",
                        lineHeight: "1.75rem",
                        paddingLeft: "2.5rem",
                        padding: "2px",
                        borderRadius: "8px",
                        ":focus": {
                            outline: "none",
                            border: "none"
                        }
                    }),
                    menu: (props) => ({
                        ...props,
                        backgroundColor: "#343142",
                        borderRadius: "8px",
                        zIndex: 50
                    }),
                    indicatorsContainer: () => ({
                        display: "none"
                    }),
                    dropdownIndicator: () => ({
                        display: "none"
                    }),
                    indicatorSeparator: () => ({
                        display: "none"
                    }),
                    container: () => ({
                        height: "48px",
                        zIndex: "12",
                    }),
                    control: (props) => ({
                        ...props,
                        border: "0px",
                        backgroundColor: "#221f34",
                        boxShadow: 'none'
                    }),
                    option: (styles, { isFocused }) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: 600,
                        backgroundColor: isFocused ? 'rgb(168 85 247 / 1)' : 'inherit',
                        ":hover": {
                            backgroundColor: "rgb(168 85 247 / 1)"
                        },
                        // ":visited": {
                        //     backgroundColor: "rgb(168 85 247 / 1)"
                        // }
                    })

                }}
                filterOption={null}
                onInputChange={handleInputChangePrimary}
                inputValue={inputText}
                onChange={(item) => {
                    const exist = entities.find(i => i.userId === item?.userId)
                    if (exist) {
                        navigate("./" + exist.conversationId)

                    } else {
                        console.log(false);

                    }
                }} />
            <Icon className='absolute left-0 top-1/2 -translate-y-1/2 translate-x-1/2  text-2xl'>
                <BiSearch />
            </Icon>
        </div>
    )
}
