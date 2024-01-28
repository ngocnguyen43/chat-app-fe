/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import debounce from 'lodash.debounce';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import Select, { components, InputActionMeta, MultiValueGenericProps } from 'react-select';

import { useQueryUserWithExclude } from '../hooks/useQueryUserWithExclude';
import { isValidUrl } from '../utils';
import MessageInput from './new/main/MessageInput';

const MultiValueLabel = (props: MultiValueGenericProps<{ data: string; id: string; name: string }>) => {
  return (
    <div>
      <components.MultiValueLabel {...props}>
        <div className="h-full flex gap-4 bg-purple-400">
          <img src={props.data.data} alt="" className="h-8 w-8 rounded-full" />
          <p className="font-semibold">{props.data.name}</p>
        </div>
      </components.MultiValueLabel>
    </div>
  );
};

const formatOptionLabel = ({ data, name }: { data: string; id: string; name: string }) => {
  return (
    <div className="flex items-center justify-center ">
      <img src={data} className="h-8 w-8 rounded-full" alt="" />
      <div style={{ marginLeft: '10px', color: '#ccc' }}>{name}</div>
    </div>
  );
};
export default function NewChat() {
  const [searchText, setSearchText] = React.useState<string>('');
  const [inputText, setInpuText] = React.useState('');
  const [excludes, setExclude] = React.useState<string[] | []>([]);
  const { data, isLoading } = useQueryUserWithExclude(searchText, excludes);
  const setSearchTextDebounced = React.useRef(debounce((searchText: string) => setSearchText(searchText), 300)).current;
  const handleInputChangePrimary = React.useCallback(
    (inputText: string, event: InputActionMeta) => {
      if (event.action !== 'input-blur' && event.action !== 'menu-close') {
        setInpuText(inputText);
        setSearchTextDebounced(inputText);
      }
    },
    [setSearchTextDebounced],
  );
  const noOptionsMessage = (obj: { inputValue: string }) => {
    if (obj.inputValue.trim().length === 0) {
      return null;
    }
    console.log(data);
    return 'User not found';
  };
  return (
    <div className="w-[75%] h-full items-center justify-center flex-col relative">
      <div className="w-full h-[12%] px-20 flex items-center justify-center gap-4 ">
        <div className="font-semibold">To:</div>
        <div className="w-[70%] relative">
          <Select
            placeholder={'Add user'}
            className="z-99 pb-1 "
            isMulti={true}
            components={{ IndicatorSeparator: () => null, MultiValueLabel }}
            isSearchable
            formatOptionLabel={formatOptionLabel}
            options={data?.map((i) => {
              let url = 'https://d3lugnp3e3fusw.cloudfront.net/143086968_2856368904622192_1959732218791162458_n.png';
              if (i.profile && i.profile.avatar) {
                const isUrl = isValidUrl(decodeURIComponent(i.profile.avatar));
                if (isUrl) {
                  url = decodeURIComponent(i.profile.avatar);
                } else {
                  url = `https://d3lugnp3e3fusw.cloudfront.net/${i.profile.avatar}`;
                }
              }
              return {
                label: i.fullName,
                value: i.userId,
                data: url,
                id: i.userId,
                name: i.fullName,
              };
            })}
            isLoading={!!inputText && isLoading}
            styles={{
              input: (provided) => ({
                ...provided,
                cursor: 'text',
                margin: '0px',
                padding: '2px',
                color: 'white',
                overflow: 'hidden',
              }),
              valueContainer: (props) => ({
                ...props,
                backgroundColor: '#343142',
                width: 100,
                height: '48px',
                fontSize: '1.25rem',
                lineHeight: '1.75rem',
                paddingLeft: '1.5rem',
                padding: '2px',
                borderRadius: '8px',
                ':focus': {
                  outline: 'none',
                  border: 'none',
                },
              }),
              menu: (props) => ({
                ...props,
                backgroundColor: '#343142',
                borderRadius: '8px',
                zIndex: 50,
              }),
              indicatorsContainer: () => ({
                display: 'none',
              }),
              dropdownIndicator: () => ({
                display: 'none',
              }),
              indicatorSeparator: () => ({
                display: 'none',
              }),
              container: () => ({
                height: '48px',
                zIndex: '12',
              }),
              control: (props) => ({
                ...props,
                border: '0px',
                backgroundColor: '#221f34',
                boxShadow: 'none',
              }),
              option: (styles) => ({
                ...styles,
                cursor: 'pointer',
                color: 'white',
                borderRadius: '8px',
                height: '60px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                // backgroundColor: isFocused ? 'rgb(168 85 247 / 1)' : 'inherit',
                backgroundColor: 'inherit',
                ':hover': {
                  backgroundColor: 'rgb(168 85 247 / 1)',
                },
              }),
            }}
            isClearable
            filterOption={null}
            onInputChange={handleInputChangePrimary}
            onChange={(e) => {
              console.log(e);
              setExclude(e.map((i) => i.id));
            }}
            inputValue={inputText}
            noOptionsMessage={noOptionsMessage}
          />
        </div>
        <div></div>
      </div>
      <main className="w-full flex items-center justify-center h-[88%] ">New chat</main>
      <MessageInput />
    </div>
  );
}
