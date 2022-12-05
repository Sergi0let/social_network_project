import { InferActionTypes } from './store-redux';

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
type ActionsType = InferActionTypes<typeof actions>;

const dialogsReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'SEND_MESSAGE': {
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

export const actions = {
  sendMessage: (newMessageBody: string) =>
    ({
      type: 'SEND_MESSAGE',
      newMessageBody,
    } as const),
};
