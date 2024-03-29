import { Provider } from 'react-redux';

import Widget from './components/Widget';

import store from  './store';

import { AnyFunction } from './utils/types';

type Props = {
  handleNewUserMessage: AnyFunction;
  handleQuickButtonClicked?: AnyFunction;
  title?: string;
  titleAvatar?: string;
  subtitle?: string;
  senderPlaceHolder?: string;
  showCloseButton?: boolean;
  autofocus?: boolean;
  profileAvatar?: string;
  profileClientAvatar?: string;
  launcher?: AnyFunction;
  handleTextInputChange?: (event: any) => void;
  chatId?: string;
  handleToggle?: AnyFunction;
  sendButtonAlt?: string;
  showTimeStamp?: boolean;
  imagePreview?: boolean;
  zoomStep?: number;
  emojis?: boolean;
  handleSubmit?: AnyFunction;
  showBadge?: boolean;
  resizable?: boolean;
  primaryColor: string;
  secondaryColor?: string;
  primaryTextColor: string;
  secondaryTextColor?: string;
  theme?: string;
  launcherText?: string;
  fullScreen?: boolean;
} & typeof defaultProps;

function ConnectedWidget({
  title,
  titleAvatar,
  subtitle,
  senderPlaceHolder,
  showCloseButton,
  autofocus,
  profileAvatar,
  profileClientAvatar,
  launcher,
  handleNewUserMessage,
  handleQuickButtonClicked,
  handleTextInputChange,
  chatId,
  handleToggle,
  sendButtonAlt,
  showTimeStamp,
  imagePreview,
  zoomStep,
  handleSubmit,
  showBadge,
  resizable,
  emojis,
  primaryColor,
  secondaryColor,
  primaryTextColor,
  secondaryTextColor,
  theme,
  launcherText,
  fullScreen,
}: Props) {
  
  
  return (
    <Provider store={store}>
      <Widget
        title={title}
        titleAvatar={titleAvatar}
        subtitle={subtitle}
        handleNewUserMessage={handleNewUserMessage}
        handleQuickButtonClicked={handleQuickButtonClicked}
        senderPlaceHolder={senderPlaceHolder}
        profileAvatar={profileAvatar}
        profileClientAvatar={profileClientAvatar}
        showCloseButton={showCloseButton}
        autofocus={autofocus}
        customLauncher={launcher}
        handleTextInputChange={handleTextInputChange}
        chatId={chatId}
        handleToggle={handleToggle}
        sendButtonAlt={sendButtonAlt}
        showTimeStamp={showTimeStamp}
        imagePreview={imagePreview}
        zoomStep={zoomStep} 
        handleSubmit={handleSubmit}
        showBadge={showBadge}
        resizable={resizable}
        emojis={emojis}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        primaryTextColor={primaryTextColor}
        secondaryTextColor={secondaryTextColor}
        theme={theme}
        launcherText={launcherText}
        fullScreen={fullScreen}
      />
    </Provider>
  );
}

const defaultProps = {
  title: 'Welcome',
  subtitle: '',
  senderPlaceHolder: 'Type a message...',
  showCloseButton: false,
  autofocus: true,
  chatId: 'rcw-chat-container',
  sendButtonAlt: 'Send',
  showTimeStamp: true,
  imagePreview: false,
  zoomStep: 80,
  showBadge: true,
  theme: 'default',
  fullScreen: false,
};
ConnectedWidget.defaultProps = defaultProps;

export default ConnectedWidget;
