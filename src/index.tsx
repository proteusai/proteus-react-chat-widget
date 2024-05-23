import { Provider } from 'react-redux';

import Widget from './components/Widget';

import store from  './store';

import { AnyFunction } from './utils/types';
import { POSITION } from './constants';

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
  weburl?: string;
  displayPosition?: POSITION;
  showDisclaimer?: boolean;
  disclaimerText?: string;
  disclaimerLearnMoreUrl?: string;
} & typeof defaultProps;

/**
 * React Chat Widget Component
 * @param handleNewUserMessage: Function;
 * @param handleQuickButtonClicked?: Function;
 * @param title?: string;
 * @param titleAvatar?: string;
 * @param subtitle?: string;
 * @param senderPlaceHolder?: string;
 * @param showCloseButton?: boolean;
 * @param autofocus?: boolean;
 * @param profileAvatar?: string;
 * @param profileClientAvatar?: string;
 * @param launcher?: AnyFunction;
 * @param handleTextInputChange?: (event: any) => void;
 * @param chatId?: string;
 * @param handleToggle?: AnyFunction;
 * @param sendButtonAlt?: string;
 * @param showTimeStamp?: boolean;
 * @param imagePreview?: boolean;
 * @param zoomStep?: number;
 * @param emojis?: boolean;
 * @param handleSubmit?: AnyFunction;
 * @param showBadge?: boolean;
 * @param resizable?: boolean;
 * @param primaryColor: string;
 * @param secondaryColor?: string;
 * @param primaryTextColor: string;
 * @param secondaryTextColor?: string;
 * @param theme?: string;
 * @param launcherText?: string;
 * @param fullScreen?: boolean;
 * @param weburl?: string;
 * @param displayPosition?: POSITION;
 * @param showDisclaimer?: boolean;
 * @param disclaimerText?: string;
 * @param disclaimerLearnMoreUrl?: string;
 * @returns Widget instance
 */
const ConnectedWidget: React.FC<Props> = ({
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
  weburl,
  displayPosition,
  showDisclaimer,
  disclaimerText,
  disclaimerLearnMoreUrl,
}) => {
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
        weburl={weburl}
        displayPosition={displayPosition}
        showDisclaimer={showDisclaimer}
        disclaimerText={disclaimerText}
        disclaimerLearnMoreUrl={disclaimerLearnMoreUrl}
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
  displayPosition: POSITION.right,
  weburl: '*',
  disclaimerText: 'AI-generated answer. Always double-check important facts.',
  showDisclaimer: true,
  disclaimerLearnMoreUrl: 'https://www.useproteus.ai/terms',
};
ConnectedWidget.defaultProps = defaultProps;

export default ConnectedWidget;
