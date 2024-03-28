import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { GlobalState } from 'src/store/types';
import { AnyFunction } from 'src/utils/types';
import { openFullscreenPreview } from '../../store/actions';

import Conversation from './components/Conversation';
import Launcher from './components/Launcher';
import Menu from './components/Conversation/components/Menu';
import FullScreenPreview from './components/FullScreenPreview';

import './style.scss';

type Props = {
  title: string;
  titleAvatar?: string;
  subtitle: string;
  onSendMessage: AnyFunction;
  onToggleConversation: AnyFunction;
  senderPlaceHolder: string;
  onQuickButtonClicked: AnyFunction;
  profileAvatar?: string;
  profileClientAvatar?: string;
  showCloseButton: boolean;
  autofocus: boolean;
  customLauncher?: AnyFunction;
  onTextInputChange?: (event: any) => void;
  chatId: string;
  sendButtonAlt: string;
  showTimeStamp: boolean;
  imagePreview?: boolean;
  zoomStep?: number;
  showBadge?: boolean;
  resizable?: boolean;
  emojis?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  theme?: string;
  launcherText?: string;
}

function WidgetLayout({
  title,
  titleAvatar,
  subtitle,
  onSendMessage,
  onToggleConversation,
  senderPlaceHolder,
  onQuickButtonClicked,
  profileAvatar,
  profileClientAvatar,
  showCloseButton,
  autofocus,
  customLauncher,
  onTextInputChange,
  chatId,
  sendButtonAlt,
  showTimeStamp,
  imagePreview,
  zoomStep,
  showBadge,
  resizable,
  emojis,
  primaryColor,
  secondaryColor,
  primaryTextColor,
  secondaryTextColor,
  theme,
  launcherText
}: Props) {
  const dispatch = useDispatch();
  const { dissableInput, showChat, visible } = useSelector((state: GlobalState) => ({
    showChat: state.behavior.showChat,
    dissableInput: state.behavior.disabledInput,
    visible: state.preview.visible,
  }));

  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor || '#1A202C'); // header and launcher color
    document.documentElement.style.setProperty('--secondary-color', secondaryColor || '#1A202C'); // background color for user sent messages bubble
    document.documentElement.style.setProperty('--primary-text-color', primaryTextColor || '#F2F2F7'); // text color for header title
    document.documentElement.style.setProperty('--secondary-text-color', secondaryTextColor || '#F2F2F7'); // text color for user sent message bubble
    if (theme === 'black' || theme === 'default') {
      document.documentElement.style.setProperty('--theme', '#1A202C'); // theme color black/white
      document.documentElement.style.setProperty('--theme-text-color', '#fff'); // theme text color white
    } else {
      document.documentElement.style.setProperty('--theme', theme || '#fff'); // theme color black/white
      document.documentElement.style.setProperty('--theme-text-color', '#000'); // theme text color black
    }

    if(showChat) {
      messageRef.current = document.getElementById('messages') as HTMLDivElement;
    }
    return () => {
      messageRef.current = null;
    }
  }, [showChat])
  
  const eventHandle = evt => {
    if(evt.target && evt.target.className === 'rcw-message-img') {
      const { src, alt, naturalWidth, naturalHeight } = (evt.target as HTMLImageElement);
      const obj = {
        src: src,
        alt: alt,
        width: naturalWidth,
        height: naturalHeight,
      };
      dispatch(openFullscreenPreview(obj))
    }
  }

  /**
   * Previewer needs to prevent body scroll behavior when fullScreen is true
   */
  useEffect(() => {
    const target = messageRef?.current;
    if(imagePreview && showChat) {
      target?.addEventListener('click', eventHandle, false);
    }

    return () => {
      target?.removeEventListener('click', eventHandle);
    }
  }, [imagePreview, showChat]);

  useEffect(() => {
    document.body.setAttribute('style', `overflow: ${visible ? 'hidden' : 'auto'}`)
  }, [visible])

  return (
    <div
      className={cn('rcw-widget-container', {
        'rcw-previewer': imagePreview,
        'rcw-close-widget-container ': !showChat
        })
      }
    >
      {showChat &&
        <Conversation
          title={title}
          subtitle={subtitle}
          sendMessage={onSendMessage}
          senderPlaceHolder={senderPlaceHolder}
          profileAvatar={profileAvatar}
          profileClientAvatar={profileClientAvatar}
          toggleChat={onToggleConversation}
          showCloseButton={showCloseButton}
          disabledInput={dissableInput}
          autofocus={autofocus}
          titleAvatar={titleAvatar}
          className={showChat ? 'active' : 'hidden'}
          onQuickButtonClicked={onQuickButtonClicked}
          onTextInputChange={onTextInputChange}
          sendButtonAlt={sendButtonAlt}
          showTimeStamp={showTimeStamp}
          resizable={resizable}
          emojis={emojis}
        />
      }
      {customLauncher ?
        customLauncher(onToggleConversation) :
        <Launcher
          toggle={onToggleConversation}
          chatId={chatId}
          openImg={titleAvatar}
          showBadge={showBadge}
          launcherText={launcherText}
        />
      }
      {
        imagePreview && <FullScreenPreview zoomStep={zoomStep} />
      }
    </div>
  );
}

export default WidgetLayout;
