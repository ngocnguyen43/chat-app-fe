import * as React from 'react';

import { isEqualTrackRef, isTrackReference, log, isWeb } from '@livekit/components-core';

import type { TrackReferenceOrPlaceholder, WidgetState } from '@livekit/components-core';
import { MessageFormatter, MessageEncoder, MessageDecoder, useTracks, useCreateLayoutContext, usePinnedTracks, LayoutContextProvider, GridLayout, FocusLayoutContainer, FocusLayout, Chat, RoomAudioRenderer, ConnectionStateToast } from '@livekit/components-react';
import { Track, RoomEvent } from 'livekit-client';
import { CustomParticipantTile } from './CustomParticipantTile';
import { CustomControlBar } from './CustomControlBar';
import { CustomCarouselLayout } from './CustomCarouselLayout';

export interface VideoConferenceProps extends React.HTMLAttributes<HTMLDivElement> {
    chatMessageFormatter?: MessageFormatter;
    chatMessageEncoder?: MessageEncoder;
    chatMessageDecoder?: MessageDecoder;
}

export function CustomVideoConference({
    ...props
}: VideoConferenceProps) {
    const [widgetState, setWidgetState] = React.useState<WidgetState>({
        showChat: false,
        unreadMessages: 0,
    });
    const lastAutoFocusedScreenShareTrack = React.useRef<TrackReferenceOrPlaceholder | null>(null);

    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged], onlySubscribed: false },
    );

    const widgetUpdate = (state: WidgetState) => {
        log.debug('updating widget state', state);
        setWidgetState(state);
    };

    const layoutContext = useCreateLayoutContext();

    const screenShareTracks = tracks
        .filter(isTrackReference)
        .filter((track) => track.publication.source === Track.Source.ScreenShare);

    const focusTrack = usePinnedTracks(layoutContext)?.[0];
    const carouselTracks = tracks.filter((track) => !isEqualTrackRef(track, focusTrack));

    console.log(tracks);
    React.useEffect(() => {
        // If screen share tracks are published, and no pin is set explicitly, auto set the screen share.
        if (
            screenShareTracks.some((track) => track.publication.isSubscribed) &&
            lastAutoFocusedScreenShareTrack.current === null
        ) {
            log.debug('Auto set screen share focus:', { newScreenShareTrack: screenShareTracks[0] });
            layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: screenShareTracks[0] });
            lastAutoFocusedScreenShareTrack.current = screenShareTracks[0];
        } else if (
            lastAutoFocusedScreenShareTrack.current &&
            !screenShareTracks.some(
                (track) =>
                    track.publication.trackSid ===
                    lastAutoFocusedScreenShareTrack.current?.publication?.trackSid,
            )
        ) {
            log.debug('Auto clearing screen share focus.');
            layoutContext.pin.dispatch?.({ msg: 'clear_pin' });
            lastAutoFocusedScreenShareTrack.current = null;
        }
    }, [
        screenShareTracks
            .map((ref) => `${ref.publication.trackSid}_${ref.publication.isSubscribed}`)
            .join(),
        focusTrack?.publication?.trackSid,
    ]);
    return (
        <div className="lk-video-conference h-full" {...props}>
            {isWeb() && (
                <LayoutContextProvider
                    value={layoutContext}
                    // onPinChange={handleFocusStateChange}
                    onWidgetChange={widgetUpdate}
                >
                    <div className="lk-video-conference-inner">
                        {!focusTrack ? (
                            <div className="lk-grid-layout-wrapper">
                                <GridLayout tracks={tracks}>
                                    <CustomParticipantTile />
                                </GridLayout>
                            </div>
                        ) :
                            (
                                <div className="lk-focus-layout-wrapper">
                                    <FocusLayoutContainer>
                                        <CustomCarouselLayout tracks={carouselTracks}>
                                            <CustomParticipantTile />
                                        </CustomCarouselLayout>
                                        {focusTrack && <FocusLayout track={focusTrack} />}
                                    </FocusLayoutContainer>
                                </div>
                            )}
                        <CustomControlBar controls={{ chat: false, screenShare: false }} />
                    </div>
                    {/* <Chat
                        style={{ display: widgetState.showChat ? 'flex' : 'none' }}
                        messageFormatter={chatMessageFormatter}
                        messageEncoder={chatMessageEncoder}
                        messageDecoder={chatMessageDecoder}
                    /> */}
                </LayoutContextProvider>
            )}
            <RoomAudioRenderer />
            <ConnectionStateToast />
        </div>
    );
}