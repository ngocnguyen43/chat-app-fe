import * as React from 'react';
import { LocalParticipant, Participant } from 'livekit-client';
import { encryptionStatusObservable } from '@livekit/components-core';
import { useEnsureParticipant, useEnsureRoom } from '@livekit/components-react';
import { useObservableState } from './useObservableState';

export function useIsEncrypted(participant?: Participant) {
    const p = useEnsureParticipant(participant);
    const room = useEnsureRoom();

    const observer = React.useMemo(() => encryptionStatusObservable(room, p), [room, p]);
    const isEncrypted = useObservableState(
        observer,
        p instanceof LocalParticipant ? p.isE2EEEnabled : p.isEncrypted,
    );
    return isEncrypted;
}