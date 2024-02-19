/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ElementRef, useRef, MouseEvent, useCallback, useId, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setGroupSetting } from '../../store/group-slice';
import { isValidUrl } from '../../utils';
import Icon from '../atoms/Icon';
import { IoMdRemoveCircle } from 'react-icons/io';
import Select, { InputActionMeta, MultiValueGenericProps, components } from 'react-select';
import debounce from 'lodash.debounce';
import { useQueryUserWithExclude } from '../../hooks/useQueryUserWithExclude';
import { addParticipant, ParticipantsType } from '../../store/participants-slice';
import { IoAddCircle } from "react-icons/io5";
import { inactiveParticipants } from '../../store';
import { useConfirm } from '../../hooks/useConfirm';
import { socket } from '../../service/socket';

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
const noOptionsMessage = (obj: { inputValue: string }) => {
  if (obj.inputValue.trim().length === 0) {
    return null;
  }
  return 'User not found';
};
export default function GroupSetting() {
  const divRef = useRef<ElementRef<'div'>>(null);
  const selectRef = useRef(null)
  const dispacth = useAppDispatch();
  const { type } = useAppSelector((state) => state.groupSetting);
  const { participants, id: currentConversationId } = useAppSelector((state) => state.currentConversation);
  const { entity: { userId } } = useAppSelector((state) => state.information);
  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      if (divRef.current && !divRef.current.contains(event.target as HTMLElement)) {
        dispacth(setGroupSetting('none'));
      }
    },
    [dispacth],
  );
  const id = useId();
  const [searchText, setSearchText] = useState<string>('');
  const [inputText, setInpuText] = useState('');
  const [excludes, setExclude] = useState<string[] | []>(participants.filter(p => p.isActive).map(i => i.id));
  const { data, isLoading } = useQueryUserWithExclude(searchText, excludes);
  const setSearchTextDebounced = useRef(debounce((searchText: string) => setSearchText(searchText), 300)).current;
  const confirm = useConfirm()
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
  const handleInactiveMember = async (p: { id: string; avatar: string; fullName: string; isActive: boolean; }) => {
    const { id: participantId, fullName } = p
    const choice = await confirm({ isOpen: true, description: `Do you want to remove ${fullName} from this conversation?`, buttonLabel: "Remove" })
    if (choice) {
      dispacth(inactiveParticipants({ conversationId: currentConversationId, userId: participantId }))
      socket.emit("inactive user", { conversationId: currentConversationId, userId: participantId })
    }
  }
  const handleAddParticipant = () => {
    console.log(selectRef.current);

  }
  return (
    <>
      {type !== 'none' && (
        <div
          className="fixed top-0 left-0 w-full h-full backdrop-blur-sm z-20 flex items-center justify-center"
          onClick={handleOnClick}
        >
          <div
            className="w-[30%] h-[80%] bg-surface-mix-300  border-none rounded-2xl flex p-2 z-40 relative flex-col gap-2"
            ref={divRef}
          >
            <div className="flex mb-6 bg-surface-mix-600 rounded-lg relative pr-4">
              <Select
                placeholder={'Add user'}
                className="z-99 pb-1   w-full"
                isMulti={true}
                ref={selectRef}
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
                  placeholder: (props) => ({
                    ...props,
                    fontWeight: 600,
                    color: "var(--color-base)"
                  }),
                  valueContainer: (props) => ({
                    ...props,
                    backgroundColor: 'var(--color-surface-mixed-600)',
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
                  noOptionsMessage: (props) => ({
                    ...props,
                    color: "var(--color-base)"
                  }),
                  menu: (props) => ({
                    ...props,
                    backgroundColor: 'var(--color-surface-mixed-600)',
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
              <div className='flex items-center justify-center cursor-pointer' onClick={() => handleAddParticipant()}>
                <Icon size='30' className='text-surface-mix-200'>
                  <IoAddCircle />
                </Icon>
              </div>
            </div>
            {participants.filter(p => p.isActive).filter(p => p.id !== userId).map((p) => {
              return (
                <div key={id + p.id} className="flex items-center gap-4 w-full pr-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img
                        src={
                          isValidUrl(decodeURIComponent(p.avatar))
                            ? decodeURIComponent(p.avatar)
                            : 'https://d3lugnp3e3fusw.cloudfront.net/' + decodeURIComponent(p.avatar)
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div>
                    <span className="flex items-center justify-center font-medium text-xl ">{p.fullName}</span>
                  </div>
                  <div className="flex items-end flex-1 justify-end cursor-pointer" onClick={async () => await handleInactiveMember(p)}>
                    <Icon size="25">
                      <IoMdRemoveCircle />
                    </Icon>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
