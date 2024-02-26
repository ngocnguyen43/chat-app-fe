import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Select, { InputActionMeta } from 'react-select';
import { v4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useQueryUser } from '../../../hooks/useQueryUser';
import { clearCurrentConversation, setAuthError, setCurrentConversation } from '../../../store';
import { setNewConversation } from '../../../store/new-conversation-slice';
import { clearParticipants } from '../../../store/participants-slice';
import { isValidUrl } from '../../../utils';
import Icon from '../../atoms/Icon';

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
const formatOptionLabel = ({ data, name }: { data: string; id: string; name: string }) => {
  return (
    <div className="flex items-center ">
      <img src={data} className="h-8 w-8 rounded-full" alt="" />
      <div style={{ marginLeft: '10px' }} className="text-color-base-100">
        {name}
      </div>
    </div>
  );
};
// const FormatOptionLabel: FunctionComponent<OptionLabelType> = ({ email, fullName, request }) => {
//     // const { entities } = useAppSelector(state => state.contacts)
//     return (
//         <div className='flex gap-4 '>
//             <div>{email}</div>
//             <div >
//                 {fullName}
//             </div>
//             {request.length > 0 && <div>
//                 {request[0]?.status}
//             </div>}
//         </div>
//     )
// };
export default function SearchBox() {
  const [searchText, setSearchText] = useState<string>('');
  const [inputText, setInpuText] = useState<string | undefined>(undefined);
  const { data, isError } = useQueryUser(searchText);
  const {
    entity: { userId: currentUSerId, profile },
  } = useAppSelector((state) => state.information);
  let userAvatar: string;
  if (profile) {
    const { avatar: temValue } = profile;
    userAvatar = temValue;
  }
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const setSearchTextDebounced = useRef(debounce((searchText: string) => setSearchText(searchText), 500));
  const { entities: conversations } = useAppSelector((state) => state.conversations);
  const handleInputChangePrimary = (inputText: string, event: InputActionMeta) => {
    // prevent outside click from resetting inputText to ""
    if (event.action !== 'input-blur' && event.action !== 'menu-close') {
      setInpuText(inputText);
      setSearchTextDebounced.current(inputText);
    }
  };
  const noOptionsMessage = (obj: { inputValue: string }) => {
    if (obj.inputValue.trim().length === 0) {
      return null;
    }
    return 'User not found';
  };
  useEffect(() => {
    dispatch(setAuthError(isError));
  }, [dispatch, isError]);
  return (
    <div className=" relative w-full">
      {/* <input type="text" autoComplete='off' className='input input-bordered w-full  focus:outline-none bg-[#343142] text-xl pl-10' spellCheck={false} /> */}
      <Select
        noOptionsMessage={noOptionsMessage}
        placeholder={'Search for a user'}
        isClearable={true}
        className="z-99 pb-1 "
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
        formatOptionLabel={formatOptionLabel}
        // getOptionLabel={otp => otp.fullName}
        styles={{
          input: (provided) => ({
            ...provided,
            cursor: 'text',
            margin: '0px',
            padding: '2px',
            color: 'var(--color-base)',
            overflow: 'hidden',
          }),
          placeholder: (props) => ({
            ...props,
            fontWeight: 600,
            fontSize: "0.75em"
          }),
          valueContainer: (props) => ({
            ...props,
            backgroundColor: 'var(--color-surface-mixed-100)',
            width: 100,
            height: '48px',
            fontSize: '1.25rem',
            lineHeight: '1.75rem',
            paddingLeft: '2.5rem',
            padding: '2px',
            borderRadius: '8px',
            ':focus': {
              outline: 'none',
              border: 'none',
            },
          }),
          menu: (props) => ({
            ...props,
            backgroundColor: 'var(--color-surface-mixed-100)',
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
            backgroundColor: '',
            boxShadow: 'none',
          }),
          option: (styles, { isFocused }) => ({
            ...styles,
            cursor: 'pointer',
            color: 'var(--color-base)',
            borderRadius: '8px',
            fontWeight: 600,
            backgroundColor: isFocused ? 'var(--color-surface-mixed-400)' : 'inherit',
            ':hover': {
              backgroundColor: 'var(--color-surface-mixed-400)',
            },
            // ":visited": {
            //     backgroundColor: "rgb(168 85 247 / 1)"
            // }
          }),
        }}
        filterOption={null}
        onInputChange={handleInputChangePrimary}
        inputValue={inputText}
        defaultValue={null}
        onChange={(item) => {
          const exist = item
            ? conversations.find((i) => !i.isGroup && i.participants.some((a) => a.id === item.id))
            : undefined;
          if (exist) {
            dispatch(
              setCurrentConversation({
                id: exist.conversationId,
                participants: exist.participants,
                name: item!.name,
                isGroup: false,
                isOnline: false,
                state: exist.state,
              }),
            );
            navigate('./' + exist.conversationId);
          } else {
            // data: "https://d3lugnp3e3fusw.cloudfront.net/143086968_2856368904622192_1959732218791162458_n.png"
            //
            // id: "485a7d96-26fa-4ab1-82c7-6cc356668694"
            //
            // label: "liiiiii"
            //
            // name: "liiiiii"
            //
            // value: "485a7d96-26fa-4ab1-82c7-6cc356668694"
            const id = v4();
            const {
              data,
              id: userId,
              label,
            } = item as unknown as { data: string; id: string; label: string; value: string };
            // persistor.purge();
            const participants = [
              { avatar: data, id: userId, fullName: label, isActive: true },
              { avatar: userAvatar, id: currentUSerId, fullName: label, isActive: true },
            ];
            dispatch(clearCurrentConversation());
            dispatch(setNewConversation({ id, name: label, participants, isGroup: false, isOnline: false }));
            dispatch(clearParticipants());
            navigate('./new');
          }
        }}
      />
      <Icon className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-1/2  text-xl">
        <BiSearch />
      </Icon>
    </div>
  );
}
