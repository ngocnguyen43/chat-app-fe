import { MdCancel } from 'react-icons/md';

import { getMimeType } from '../utils';
import Icon from './atoms/Icon';
import { FunctionComponent, useState, useRef, useCallback, useEffect } from 'react';

interface IPreviewFile {
  url: string;
  onClick: (url: string) => void;
  type?: string;
  file: File;
}
export const PreviewFile: FunctionComponent<IPreviewFile> = (props) => {
  const { url, onClick, file } = props;
  const [tmpUrl, setTmpUrl] = useState<string>('');
  const type = useRef<string>('');
  const GetMime = useCallback(async () => {
    return await getMimeType(file, (mime) => console.log(mime));
  }, [file]);
  useEffect(() => {
    if (file) {
      return () => {
        URL.revokeObjectURL(tmpUrl);
      };
    }
  }, [file, tmpUrl]);
  useEffect(() => {
    GetMime().then(
      (data) => {
        type.current = data;
        console.log('nah');
        setTmpUrl(URL.createObjectURL(file));
      },
      () => { },
    );
  }, [GetMime, file]);
  console.log(tmpUrl);

  return (
    <div className="relative w-[50px] ">
      {type.current && type?.current.startsWith('image/') && <img src={tmpUrl} alt="" srcSet="" className="w-full" />}
      {type?.current.startsWith('video/') && (
        <video src={url.startsWith('blob') ? url : ''} className="w-full">
          <track default kind="captions" srcLang="en" />
        </video>
      )}
      {type.current && (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-slate-100/50 z-10"></div>
          <button onClick={() => onClick(url)} className="absolute z-20 -top-2 -right-2 rounded-full">
            <Icon className="text-gray-200">
              <MdCancel />
            </Icon>
          </button>
        </>
      )}
    </div>
  );
};
