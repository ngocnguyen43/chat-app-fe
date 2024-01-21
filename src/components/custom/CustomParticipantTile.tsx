/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { Track } from 'livekit-client';
import * as React from 'react';

import { isParticipantSourcePinned } from '@livekit/components-core';
import {
    AudioTrack, ConnectionQualityIndicator, FocusToggle, ParticipantContext, ParticipantName,
    TrackMutedIndicator, useEnsureParticipant, useMaybeLayoutContext, useMaybeParticipantContext,
    useMaybeTrackContext, useParticipantTile, VideoTrack
} from '@livekit/components-react';

import { useIsEncrypted } from '../../hooks/useIsEncrypt';

import type { Participant, TrackPublication } from 'livekit-client';
import type { ParticipantClickEvent, TrackReferenceOrPlaceholder } from '@livekit/components-core/dist';
const SvgScreenShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={16} fill="none" {...props}>
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M0 2.75A2.75 2.75 0 0 1 2.75 0h14.5A2.75 2.75 0 0 1 20 2.75v10.5A2.75 2.75 0 0 1 17.25 16H2.75A2.75 2.75 0 0 1 0 13.25V2.75ZM2.75 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25H2.75Z"
            clipRule="evenodd"
        />
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M9.47 4.22a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v4.69a.75.75 0 0 1-1.5 0V6.56l-.97.97a.75.75 0 0 1-1.06-1.06l2.25-2.25Z"
            clipRule="evenodd"
        />
    </svg>
);
const SvgLockLockedIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
        <path
            fill="currentcolor"
            fillRule="evenodd"
            d="M4 6.104V4a4 4 0 1 1 8 0v2.104c1.154.326 2 1.387 2 2.646v4.5A2.75 2.75 0 0 1 11.25 16h-6.5A2.75 2.75 0 0 1 2 13.25v-4.5c0-1.259.846-2.32 2-2.646ZM5.5 4a2.5 2.5 0 0 1 5 0v2h-5V4Z"
            clipRule="evenodd"
        />
    </svg>
);
export function ParticipantContextIfNeeded(
    props: React.PropsWithChildren<{
        participant?: Participant;
    }>,
) {
    const hasContext = !!useMaybeParticipantContext();
    return props.participant && !hasContext ? (
        <ParticipantContext.Provider value={props.participant}>
            {props.children}
        </ParticipantContext.Provider>
    ) : (
        <>{props.children}</>
    );
}

/** @public */
export interface ParticipantTileProps extends React.HTMLAttributes<HTMLDivElement> {
    disableSpeakingIndicator?: boolean;
    participant?: Participant;
    source?: Track.Source;
    publication?: TrackPublication;
    onParticipantClick?: (event: ParticipantClickEvent) => void;
}

/**
 * The ParticipantTile component is the base utility wrapper for displaying a visual representation of a participant.
 * This component can be used as a child of the `TrackLoop` component or by spreading a track reference as properties.
 *
 * @example
 * ```tsx
 * <ParticipantTile source={Track.Source.Camera} />
 *
 * <ParticipantTile {...trackReference} />
 * ```
 * @public
 */
export function CustomParticipantTile({
    participant,
    children,
    source = Track.Source.Camera,
    onParticipantClick,
    publication,
    disableSpeakingIndicator,
    ...htmlProps
}: ParticipantTileProps) {
    const p = useEnsureParticipant(participant);
    const trackRef: TrackReferenceOrPlaceholder = useMaybeTrackContext() ?? {
        participant: p,
        source,
        publication,
    };
    const { participant: { identity } } = trackRef
    console.log("check:::::;", identity);
    const { elementProps } = useParticipantTile<HTMLDivElement>({
        participant: trackRef.participant,
        htmlProps,
        source: trackRef.source,
        publication: trackRef.publication,
        disableSpeakingIndicator,
        onParticipantClick,
    });
    const isEncrypted = useIsEncrypted(p);
    const layoutContext = useMaybeLayoutContext();

    const handleSubscribe = React.useCallback(
        (subscribed: boolean) => {
            if (
                trackRef.source &&
                !subscribed &&
                layoutContext &&
                layoutContext.pin.dispatch &&
                isParticipantSourcePinned(trackRef.participant, trackRef.source, layoutContext.pin.state)
            ) {
                layoutContext.pin.dispatch({ msg: 'clear_pin' });
            }
        },
        [trackRef.participant, layoutContext, trackRef.source],
    );
    return (
        <div style={{ position: 'relative' }} {...elementProps} >
            <ParticipantContextIfNeeded participant={trackRef.participant}>
                {children ?? (
                    <>
                        {trackRef.publication?.kind === 'video' ||
                            trackRef.source === Track.Source.Camera ||
                            trackRef.source === Track.Source.ScreenShare ? (
                            <VideoTrack
                                participant={trackRef.participant}
                                source={trackRef.source}
                                publication={trackRef.publication}
                                onSubscriptionStatusChanged={handleSubscribe}
                                manageSubscription={true}
                            />
                        ) : (
                            <AudioTrack
                                participant={trackRef.participant}
                                source={trackRef.source}
                                publication={trackRef.publication}
                                onSubscriptionStatusChanged={handleSubscribe}
                            />
                        )}
                        <div className="lk-participant-placeholder">
                            <img src={`https://d3lugnp3e3fusw.cloudfront.net/${identity}`} loading='lazy' alt='' width="full" height="full" className='w-full h-full' />
                        </div>
                        <div className="lk-participant-metadata">
                            <div className="lk-participant-metadata-item">
                                {trackRef.source === Track.Source.Camera ? (
                                    <>
                                        {isEncrypted && <SvgLockLockedIcon style={{ marginRight: '0.25rem' }} />}
                                        <TrackMutedIndicator
                                            source={Track.Source.Microphone}
                                            show={'muted'}
                                        ></TrackMutedIndicator>
                                        <ParticipantName />
                                    </>
                                ) : (
                                    <>
                                        <SvgScreenShareIcon style={{ marginRight: '0.25rem' }} />
                                        <ParticipantName>&apos;s screen</ParticipantName>
                                    </>
                                )}
                            </div>
                            <ConnectionQualityIndicator className="lk-participant-metadata-item" />
                        </div>
                    </>
                )}
                <FocusToggle trackSource={trackRef.source} />
            </ParticipantContextIfNeeded>
        </div>
    );
}