const SEND_MESSAGE = 'SEND_MESSAGE';

type MessageType = {
  id: number;
  message: string;
};

type DialogType = {
  id: number;
  name: string;
};

const initialState = {
  messagesData: [
    { id: 1, message: 'Hello' },
    { id: 2, message: 'How are you' },
    { id: 3, message: 'Thanks, I am fine' },
    { id: 4, message: 'Lorem ipsum dolor sit.' },
  ] as Array<MessageType>,
  dialogsData: [
    { id: 1, name: 'Brosik' },
    { id: 2, name: 'Salem' },
    { id: 3, name: 'Rex' },
    { id: 4, name: 'Jedi' },
  ] as Array<DialogType>,
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (
  state = initialState,
  action: any
): InitialStateType => {
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

type SendMessageType = {
  type: typeof SEND_MESSAGE;
  newMessageBody: string;
};

export const sendMessage = (newMessageBody: string): SendMessageType => ({
  type: SEND_MESSAGE,
  newMessageBody,
});
