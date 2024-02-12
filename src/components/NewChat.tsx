/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import clsx from 'clsx';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef, useState } from 'react';
import Select, { components, InputActionMeta, MultiValueGenericProps } from 'react-select';

import { useAppDispatch, useAppSelector } from '../hooks';
import { useQueryUserWithExclude } from '../hooks/useQueryUserWithExclude';
import { clearNewConversation } from '../store/new-conversation-slice';
import { addParticipant, ParticipantsType } from '../store/participants-slice';
import { isValidUrl } from '../utils';
import ConversationName from './new/main/ConversationName';
import MessageInput from './new/main/MessageInput';
import { setAuthError } from '../store';

const MultiValueLabel = (props: MultiValueGenericProps<{ data: string; id: string; name: string }>) => {
  return (
    <div>
      <components.MultiValueLabel {...props}>
        <div className="h-full flex gap-2 bg-surface-mix-400 items-center justify-center">
          <img src={props.data.data} alt="" className="h-8 w-8 rounded-full " />
          <p className="font-semibold text-color-base-100">{props.data.name}</p>
        </div>
      </components.MultiValueLabel>
    </div>
  );
};

const formatOptionLabel = ({ data, name }: { data: string; id: string; name: string }) => {
  return (
    <div className="flex items-center justify-center p-2">
      <img src={data} className="h-8 w-8 rounded-full" alt="" />
      <div style={{ marginLeft: '10px' }} className="text-color-base-100">
        {name}
      </div>
    </div>
  );
};
export default function NewChat() {
  const [searchText, setSearchText] = useState<string>('');
  const [inputText, setInpuText] = useState('');
  const [excludes, setExclude] = useState<string[] | []>([]);
  const { data, isLoading, isError } = useQueryUserWithExclude(searchText, excludes);
  const setSearchTextDebounced = useRef(debounce((searchText: string) => setSearchText(searchText), 300)).current;
  const { id, name, isGroup, participants } = useAppSelector((state) => state.newConversation);
  const dispatch = useAppDispatch();
  const handleInputChangePrimary = useCallback(
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
    return 'User not found';
  };
  useEffect(() => {
    return () => {
      dispatch(clearNewConversation());
    };
  }, [dispatch]);
  useEffect(() => {
    dispatch(setAuthError(isError));
  }, [dispatch, isError]);
  return (
    <main className=" pb-8 flex flex-col  h-full w-[75%] bg-surface-mix-100 relative ">
      <div className={clsx('flex justify-between items-center ', !(name && participants.length > 0 && id) ? '' : '')}>
        {!(name && participants.length > 0 && id) ? (
          <div className="flex items-center justify-center px-20 w-full py-6 gap-4">
            <div className="font-semibold ">To:</div>
            <div className="w-[70%] relative">
              <Select
                placeholder={'Add user'}
                className="z-99 pb-1 "
                isMulti={true}
                components={{ IndicatorSeparator: () => null, MultiValueLabel }}
                isSearchable
                formatOptionLabel={formatOptionLabel}
                options={data?.map((i) => {
                  let url =
                    'https://d3lugnp3e3fusw.cloudfront.net/143086968_2856368904622192_1959732218791162458_n.png';
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
                    state: i.state,
                  };
                })}
                isLoading={!!inputText && isLoading}
                styles={{
                  input: (provided) => ({
                    ...provided,
                    cursor: 'text',
                    margin: '0px',
                    padding: '1px',
                    color: 'var(--color-base)',
                    overflow: 'hidden',
                  }),
                  valueContainer: (props) => ({
                    ...props,
                    backgroundColor: 'var(--color-surface-mixed-200)',
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
                  multiValueRemove: (props) => ({
                    ...props,
                    height: '20px',
                    width: '20px',
                    borderRadius: '999px',
                  }),
                  menu: (props) => ({
                    ...props,
                    backgroundColor: 'var(--color-surface-mixed-200)',
                    borderRadius: '8px',
                    zIndex: 50,
                  }),
                  multiValue: (props) => ({
                    ...props,
                    backgroundColor: 'var(--color-surface-mixed-400)',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: '2px',
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
                    backgroundColor: '',
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
                      backgroundColor: 'var(--color-surface-mixed-400)',
                    },
                  }),
                }}
                isClearable
                filterOption={null}
                onInputChange={handleInputChangePrimary}
                onChange={(e) => {
                  setExclude(e.map((i) => i.id));
                  // console.log(e);

                  dispatch(addParticipant(e as ParticipantsType[]));
                }}
                inputValue={inputText}
                noOptionsMessage={noOptionsMessage}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-start items-center px-20 bg-surface-mix-200 py-4 w-full gap-4">
            <ConversationName isGroup={isGroup} name={name} />
            {/* <ConversationUtils /> */}
          </div>
        )}
        {/* <div className="flex justify-between items-center px-20 bg-surface-mix-200 py-4 w-full gap-4">
          <ConversationName isGroup={isGroup} avatar={avatar!} name={name!} />
          <ConversationUtils />
        </div> */}
        <div></div>
      </div>
      <div className="w-full flex items-center justify-center h-[88%] ">
        <h1 className="text-color-base-100 font-semibold">New Chat</h1>
      </div>
      <MessageInput />
    </main>
  );
}
