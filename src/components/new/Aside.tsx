import { IoCloseSharp } from 'react-icons/io5';

import Icon from '../atoms/Icon';
import Buttons from './aside/Buttons';
import ShareImage from './aside/ShareImages';
import ShareUrl from './aside/ShareUrl';
import ShareVideos from './aside/ShareVideos';

export default function Aside() {
  return (
    <aside className="w-[20%] flex flex-col px-8 py-8 gap-6">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="">Chat Details</h2>
        <Icon className="text-2xl">
          <IoCloseSharp />
        </Icon>
      </div>
      <Buttons />
      <div className="flex justify-between">
        <h2>Images</h2>
        <h2 className="underline">See All</h2>
      </div>
      <ShareImage />
      <div className="flex justify-between">
        <h2>Videos</h2>
        <h2 className="underline">See All</h2>
      </div>
      <ShareVideos />
      <div className="flex justify-between">
        <h2>Links</h2>
        <h2 className="underline">See All</h2>
      </div>
      <ShareUrl />
    </aside>
  );
}
