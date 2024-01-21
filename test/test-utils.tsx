// import { PreloadedState, configureStore } from '@reduxjs/toolkit';
// import AppStore, { ApplicationState } from '../src/store/store';
// import { Provider } from 'react-redux';
// import { settingReducer } from '../src/store/setting-slice';
// import { rightMenuReducer } from '../src/store/right-menu-slice';
// import { socketIdReducer } from '../src/store/socket-id-slide';
// import { currentConversationReducer } from '../src/store/current-conversation-slice';
// import { friendBoxReducer } from '../src/store/friend-box-slice';
// import { openConversationReducer } from '../src/store/open-covnersation-slice';
// import { openCallModalReducer } from '../src/store/open-call-modal';
// import { RenderOptions, render } from '@testing-library/react';
// import { PropsWithChildren } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { contactsReducer } from '../src/store/contacts-slice';
// import { selectedMessageReducer } from '../src/store/selectedMessage-slice';
// import { bouncingReducer } from '../src/store/bouncing-slice';
// import { callBoxReducer } from '../src/store/open-call-slice';
// interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
//     preloadedState?: PreloadedState<ApplicationState>
//     store?: typeof AppStore
// }

// export function renderWithProviders(
//     ui: React.ReactElement,
//     {
//         preloadedState = {
//             setting: { isSettingOpen: false },
//             rightMenu: { isRMenuOpen: false },
//             socketId: { id: "" },
//             friendBox: { isBoxOpen: false },
//             openconversation: { isOpen: false },
//             openCallModal: { isOpenCallModal: false },
//             currentConversation: {
//                 avatar: "",
//                 name: "",
//                 id: "",
//                 isGroup: false,
//                 isOnline: false,
//             },
//             contacts: {
//                 entities: [],
//                 loading: false,
//                 error: undefined
//             },
//             selectedMessage: {
//                 message: []
//             },
//             bouncing: {
//                 isOpen: false
//             },
//             callBox: {
//                 shouldCallBoxOpen: false,
//                 room: ""
//             },
//         },
//         // Automatically create a store instance if no store was passed in
//         store = configureStore(
//             {
//                 reducer:
//                 {
//                     setting: settingReducer,
//                     rightMenu: rightMenuReducer,
//                     socketId: socketIdReducer,
//                     currentConversation: currentConversationReducer,
//                     friendBox: friendBoxReducer,
//                     openconversation: openConversationReducer,
//                     openCallModal: openCallModalReducer,
//                     contacts: contactsReducer,
//                     selectedMessage: selectedMessageReducer,
//                     bouncing: bouncingReducer,
//                     callBox: callBoxReducer
//                 }, preloadedState
//             }),
//         ...renderOptions
//     }: ExtendedRenderOptions = {}
// ) {

//     const Wrapper: React.FunctionComponent<PropsWithChildren<object>> = ({ children }) => {
//         return (
//             <BrowserRouter>
//                 <Provider store={store} >{children}</Provider>
//             </BrowserRouter>
//         )
//     }
//     // Return an object with the store and all of RTL's query functions
//     return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
// }