/* eslint-disable @typescript-eslint/no-unused-vars */
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';

import { Room, RoomConnectOptions, RoomOptions, VideoPresets } from 'livekit-client';

import { useLocation } from 'react-router-dom';

import { LiveKitRoom } from '@livekit/components-react';

import { useGetVACT } from '../hooks/useGetVideoAccessToken';
import { Storage } from '../service/LocalStorage';
import { CustomVideoConference } from './custom/CustomVideoConference';
import { useState, useEffect, useMemo } from 'react';

export default function Video() {
  const token = Storage.Get('video-token');
  const [_hasToken, sethasToken] = useState<boolean>(false);
  const localtion = useLocation();
  const path = localtion.pathname.split('/');
  // useEffect(() => {
  //     return () => {
  //         Storage.Del("video-token")
  //     }
  // }, [token])
  const { data, isLoading: _isLoading } = useGetVACT();
  useEffect(() => {
    if (!token || path[path.length - 1] !== token) {
      sethasToken(false);
    } else {
      sethasToken(true);
    }
  }, [path, token]);
  // useEffect(() => {
  //     const navigate =  await window.navigator.mediaDevices.getUserMedia()
  // })

  // const keyProvider = new ExternalE2EEKeyProvider();

  const roomOptions = useMemo((): RoomOptions => {
    return {
      videoCaptureDefaults: {
        resolution: VideoPresets.h1440,
      },
      publishDefaults: {
        // dtx: false,
        videoSimulcastLayers: [VideoPresets.h720, VideoPresets.h540],
      },
      adaptiveStream: { pixelDensity: 'screen' },
      dynacast: true,
    };
  }, []);
  const room = useMemo(() => new Room(roomOptions), [roomOptions]);
  const connectOptions = useMemo((): RoomConnectOptions => {
    return {
      autoSubscribe: true,
    };
  }, []);
  return (
    <main className="w-screen h-screen">
      <LiveKitRoom
        token={data?.accessToken}
        room={room}
        connectOptions={connectOptions}
        serverUrl={data?.url}
        video={true}
      >
        <CustomVideoConference />
      </LiveKitRoom>
      {/* {
                hasToken ?
                    <>
                        <div>{JSON.stringify(token)}</div>
                        <div>Video</div>
                    </> : <div>Error</div>
            }
            {
                isLoading ? <div>nah</div> : <div>
                    {JSON.stringify(data)}
                </div>
            } */}
    </main>
  );
}
