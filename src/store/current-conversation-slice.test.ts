import { currentConversationReducer, setConversationId, setConversationName } from './current-conversation-slice';

describe('conversation slice test', () => {
  it('should return  object with empty properties as initial state', () => {
    expect(currentConversationReducer(undefined, { type: 'noops' })).toEqual({ name: '', id: '' });
  });
  it('support change current conversation name', () => {
    expect(
      currentConversationReducer(
        { participants: [], name: '', state: undefined, id: '', isGroup: false, isOnline: false },
        setConversationName('noops'),
      ),
    ).toEqual({
      name: 'noops',
      id: '',
    });
  });
  it('support change current conversation id', () => {
    expect(
      currentConversationReducer(
        { participants: [], state: undefined, name: '', id: '', isGroup: false, isOnline: false },
        setConversationId('12345'),
      ),
    ).toEqual({
      name: '',
      id: '12345',
    });
  });
});
