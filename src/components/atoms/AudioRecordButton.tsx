/* eslint-disable @typescript-eslint/no-misused-promises */
import clsx from 'clsx';
import { useState, useRef, FunctionComponent, useCallback } from 'react';
import Icon from './Icon';
import { FaMicrophone, FaStop } from 'react-icons/fa6';
import { queryClient } from '../../service';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { v4 } from 'uuid';
import { getCurrentUnixTimestamp } from '../../utils';
import { MessageQueryType } from '../../@types';
import { useConfirm } from '../../hooks/useConfirm';
import { updateLastMessage } from '../../store';
import { useCreateMediaMessage } from '../../hooks/useCreateMediaMessage';

const mimeType = 'audio/webm';
const AudioRecordButton: FunctionComponent<{ shouldHidden: boolean }> = (props) => {
  const { shouldHidden } = props;
  const [isRecording, setIsRecording] = useState(false);
  const {
    entity: { userId },
  } = useAppSelector((state) => state.information);
  const confirm = useConfirm();
  const { mutate: mutateMedia } = useCreateMediaMessage();
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.currentConversation);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const recorder = useRef<MediaRecorder | null>(null);
  const startRecording = useCallback(async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

      const media = new MediaRecorder(audioStream, { mimeType });
      // const speakerSource = audioContext.createMediaStreamSource(speakerStream);

      // speakerSource.connect(destination);

      setIsRecording(true);

      recorder.current = media;
      const localAudioChunks: Blob[] = [];
      if (recorder.current) {
        recorder.current.addEventListener('dataavailable', (event) => {
          if (event.data.size === 0) return;
          if (typeof event.data === 'undefined') return;
          localAudioChunks.push(event.data);
        });
        setAudioChunks(localAudioChunks);
        recorder.current.start();
      }
    } catch (error) {
      console.log(error);

      setIsRecording(false);
      confirm({ isOpen: true, description: 'Cannot send audio messsage!', buttonLabel: 'Ok' });
    }
  }, [confirm]);
  const stopRecording = useCallback(() => {
    // stops the recording instance
    setIsRecording(false);
    if (recorder.current) {
      recorder.current.stop();
      recorder.current.onstop = () => {
        // creates a blob file from the audiochunks data
        const audioBlob = new Blob(audioChunks, { type: mimeType });

        // creates a playable URL from the blob file.
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioChunks([]);
        const messageId = v4();
        queryClient.setQueryData(['get-messages', id], (oldData: MessageQueryType) => {
          const [first, ...rest] = oldData.pages;

          const messagesData = [
            {
              messageId,
              message: [
                {
                  type: 'audio',
                  content: audioUrl,
                },
              ],
              sender: userId,
              recipients: [],
              isDeleted: false,
              createdAt: Date.now().toString(),
              group: getCurrentUnixTimestamp(),
            },
            ...first.messages,
          ];

          return {
            ...oldData,
            pages: [
              {
                ...first,
                messages: [...messagesData],
              },
              ...rest,
            ],
          };
        });
        dispatch(
          updateLastMessage({
            id,
            lastMessage: 'Send a voice message',
            lastMessageAt: Date.now().toString(),
            isLastMessageSeen: true,
            totalUnreadMessages: 0,
          }),
        );
        mutateMedia({
          id: messageId,
          conversation: id,
          time: Date.now().toString(),
          sender: userId,
          type: 'audio',
          file: [
            {
              file: audioBlob,
              url: audioUrl,
            },
          ],
        });
      };
    }
  }, [audioChunks, dispatch, id, mutateMedia, userId]);
  return (
    <>
      <button
        className={clsx(
          'w-10 h-10 rounded-lg focus:outline-none flex items-center justify-center relative transition-transform bg-surface-mix-300 text-white',
          shouldHidden ? 'hidden ' : 'block',
        )}
        onClick={() => {
          startRecording();
        }}
      >
        <Icon className={clsx('absolute text-2xl transition-all duration-500')}>
          <FaMicrophone />
        </Icon>
        {/* <Icon
                className={clsx(
                    'text-2xl transition-all duration-500 ',
                    shouldFaded ? 'visible opacity-100 ' : 'invisible opacity-0',
                )}
            >
                <RiSendPlane2Fill />
            </Icon> */}
      </button>
      {isRecording ? (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center">
          <button onClick={stopRecording}>
            <div className="bg-surface-mix-200 w-24 h-24 rounded-full flex items-center justify-center">
              <Icon size="52">
                <FaStop />
              </Icon>
            </div>
          </button>
        </div>
      ) : null}
    </>
  );
};
export default AudioRecordButton;
