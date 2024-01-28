import { LiaKeySolid } from 'react-icons/lia';
import { MdDelete } from 'react-icons/md';

import { useDeletePasskey } from '../../../hooks/useDeletePasskey';
import { useFetchPasskeys } from '../../../hooks/useFetchPasskeys';
import Icon from '../../atoms/Icon';

export default function PasskeysSetting() {
  const { data } = useFetchPasskeys();
  const { mutate } = useDeletePasskey();
  return (
    <div className=" my-8">
      {
        <>
          {data && data.length > 0 ? (
            data.map((i) => (
              <div key={i.id} className="flex gap-4 items-center ">
                <Icon size="28">
                  <LiaKeySolid />
                </Icon>
                <h1 className="max-w-sm overflow-hidden text-ellipsis">{i.id}</h1>
                <h1 className="w-52">{new Date(+i.createdAt).toLocaleString()}</h1>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    mutate(i.id);
                  }}
                >
                  <Icon size="24" className="text-rose-500">
                    <MdDelete />
                  </Icon>
                </button>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center">No Passkeys Found!</div>
          )}
        </>
      }
    </div>
  );
}
