import { currentConversationReducer, setConversationId, setConversationName } from './current-conversation-slice';

describe('conversation slice test', () => {
  it('should return  object with empty properties as initial state', () => {
    expect(currentConversationReducer(undefined, { type: 'noops' })).toEqual({ name: '', id: '' });
  });
  it('support change current conversation name', () => {
    expect(currentConversationReducer({ name: '', id: '' }, setConversationName('noops'))).toEqual({
      name: 'noops',
      id: '',
    });
  });
  it('support change current conversation id', () => {
    expect(currentConversationReducer({ name: '', id: '' }, setConversationId('12345'))).toEqual({
      name: '',
      id: '12345',
    });
  });
});
