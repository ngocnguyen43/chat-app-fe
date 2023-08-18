import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import AppStore, { ApplicationState } from '../src/store/store';
import { Provider } from 'react-redux';
import { advanceMessageReducer } from '../src/store/advance-messages-slice';
import { settingReducer } from '../src/store/setting-slice';
import { rightMenuReducer } from '../src/store/right-menu-slice';
import { socketIdReducer } from '../src/store/socket-id-slide';
import { currentConversationReducer } from '../src/store/current-conversation-slice';
import { friendBoxReducer } from '../src/store/friend-box-slice';
import { currentTabReducer } from '../src/store/current-menu-slice';
import { openConversationReducer } from '../src/store/open-covnersation-slice';
import { openCallModalReducer } from '../src/store/open-call-modal';
import { RenderOptions, render } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<ApplicationState>
    store?: typeof AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {
            advanceMessage: { isOpen: false },
            setting: { isSettingOpen: false },
            rightMenu: { isRMenuOpen: false },
            socketId: { id: "" },
            currentConversation: { id: "", name: "" },
            friendBox: { isBoxOpen: false },
            currentTab: { name: "conversation" },
            openconversation: { isOpen: false },
            openCallModal: { isOpenCallModal: false }
        },
        // Automatically create a store instance if no store was passed in
        store = configureStore(
            {
                reducer:
                {
                    advanceMessage: advanceMessageReducer,
                    setting: settingReducer,
                    rightMenu: rightMenuReducer,
                    socketId: socketIdReducer,
                    currentConversation: currentConversationReducer,
                    friendBox: friendBoxReducer,
                    currentTab: currentTabReducer,
                    openconversation: openConversationReducer,
                    openCallModal: openCallModalReducer
                }, preloadedState
            }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {

    const Wrapper: React.FunctionComponent<PropsWithChildren<object>> = ({ children }) => {
        return (
            <BrowserRouter>
                <Provider store={store} >{children}</Provider>
            </BrowserRouter>
        )
    }
    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}