/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react'
import debounce from "lodash.debounce";
import Select, { InputActionMeta, MultiValueGenericProps, components } from 'react-select';
import AsyncSelect from "react-select/async"
import { useQueryUserWithExclude } from '../hooks/useQueryUserWithExclude';
import useAxios from '../hooks/useAxios';
import { env } from '../config';
export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}

export const colourOptions: readonly ColourOption[] = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
];
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
    return (
        <div className='flex gap-4 '>
            <div>{email}</div>
            <div >
                {fullName}
            </div>
            {request && request.length > 0 && <div>
                {request[0]?.status}
            </div>}
        </div>
    )
};
const MultiValueContainer = (props: MultiValueGenericProps<OptionLabelType>) => {
    return (
        <div >
            <components.MultiValueContainer {...props} >
                {props.data.email}
            </components.MultiValueContainer>
        </div>
    );
};
export default function NewChat() {
    const [searchText, setSearchText] = React.useState<string>("");
    const [inputText, setInpuText] = React.useState("");
    const [excludes, setExclude] = React.useState<string[] | []>([])
    const { data } = useQueryUserWithExclude(searchText, excludes)
    const setSearchTextDebounced = React.useRef(
        debounce((searchText: string) => setSearchText(searchText), 300)
    );
    const { axios } = useAxios()
    const getQueries = async (query: string, exclude: string[] | [] = excludes) => {
        const params = new URLSearchParams({ q: query, e: exclude.toString() })
        const res = await axios.get<OptionLabelType[]>(`${env.BACK_END_URL}/user?${params.toString()}`);
        return res.data
    };
    const handleInputChangePrimary = (inputText: string, event: InputActionMeta) => {
        if (event.action !== "input-blur" && event.action !== "menu-close") {
            setInpuText(inputText);
            setSearchTextDebounced.current(inputText);
        }
    };
    const noOptionsMessage = () => {
        return 'User not found'
    }
    return (
        <div className='w-[75%] h-full items-center justify-center flex-col'>
            <div className='w-full h-[12%] px-20 flex items-center gap-4 '>
                <div>To:</div>
                <div className='w-full relative'>
                    <AsyncSelect
                        noOptionsMessage={noOptionsMessage}
                        placeholder={"Add user"}
                        closeMenuOnSelect={true}
                        className='z-99 pb-1 '
                        isMulti={true}
                        components={{ MultiValueContainer }}
                        isSearchable
                        loadOptions={(e) =>
                            getQueries(e)
                        }
                        formatOptionLabel={FormatOptionLabel}
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
                                paddingLeft: "1.5rem",
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
                                height: "60px",
                                fontWeight: 600,
                                // backgroundColor: isFocused ? 'rgb(168 85 247 / 1)' : 'inherit',
                                backgroundColor: 'inherit',
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
                        onChange={(e) => {
                            console.log(e);
                            setExclude(e.map(i => i.userId))
                        }}
                        inputValue={inputText}
                    />

                </div>
                <div></div>
            </div>
            <div className='w-full flex items-center justify-center h-[88%] '>New chat</div>
        </div>
    )
}
