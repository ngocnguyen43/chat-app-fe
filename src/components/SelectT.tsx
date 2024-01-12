import React from 'react'
import Select, { MultiValueGenericProps, components } from 'react-select';

export type OptionLabelType = {
    userId: string;
    email: string;
    fullName: string;
    request: [
        {
            status: "pending" | "accepted"
        }
    ] | []
}
type SelectTProps = {
    handleInputChangePrimary: () => void
}
const MultiValueContainer = (props: MultiValueGenericProps<OptionLabelType>) => {
    return (
        <div content={'Customise your multi-value container!'}>
            <components.MultiValueContainer {...props} >
                {props.data.email}
            </components.MultiValueContainer>
        </div>
    );
};
const SelectT: React.FunctionComponent<SelectTProps> = (props) => {
    const noOptionsMessage = () => {
        return 'User not found'
    }
    return (
        <Select
            noOptionsMessage={noOptionsMessage}
            placeholder={"Add user"}
            isClearable={true}
            closeMenuOnSelect={true}
            className='z-99 pb-1 '
            // getOptionLabel={otp => otp.fullName}
            isMulti
            // isSearchable={true}
            components={{ MultiValueContainer }}
            options={data}
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
    )
}
