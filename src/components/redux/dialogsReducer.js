const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
  messagesData: [
    { id: 1, message: 'Hello' },
    { id: 2, message: 'How are you' },
    { id: 3, message: 'Thanks, I am fine' },
    { id: 4, message: 'Lorem ipsum dolor sit.' },
  ],
  dialogsData: [
    { id: 1, name: 'Brosik' },
    { id: 2, name: 'Salem' },
    { id: 3, name: 'Rex' },
    { id: 4, name: 'Jedi' },
    { id: 5, name: 'Jedi' },
    { id: 6, name: 'Lexx' },
    { id: 7, name: 'Le' },
    { id: 8, name: 'you' },
  ],
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let body = action.newMessageBody;
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          { id: Math.random() + 2, message: body },
        ],
      };
    }
    default:
      return state;
  }
};

export default dialogsReducer;

export const sendMessage = (newMessageBody) => ({
  type: SEND_MESSAGE,
  newMessageBody,
});
