import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import Badge from './components/Badge';
import { GlobalState } from '../../../../store/types';
import { setBadgeCount } from '../../../../store/actions';

import './style.scss';
import { POSITION } from '../../../../constants';

const openLauncher = require('../../../../../assets/bot-icon-logo.svg') as string;
const close = require('../../../../../assets/bot-close.svg') as string;

type Props = {
  toggle: () => void;
  chatId: string;
  openImg?: string;
  showBadge?: boolean;
  launcherText?: string;
  displayPosition?: string;
}
/**
 * Chat widget launcher, accepts parameters to configure laucher.
 * @param param0 
 * @returns 
 */
function Launcher({ toggle, chatId, openImg, showBadge, launcherText, displayPosition }: Props) {
  const dp = displayPosition === POSITION.left ? true : false;
  const dispatch = useDispatch();
  const { showChat, badgeCount } = useSelector((state: GlobalState) => ({
    showChat: state.behavior.showChat,
    badgeCount: state.messages.badgeCount
  }));

  const toggleChat = () => {
    toggle();
    if (!showChat) dispatch(setBadgeCount(0));
  }

  return (
    <>
      {showChat ?
      <div className={cn('rcw-close-btn', {'rcw-close-btn-left': dp })} onClick={toggleChat} aria-controls={chatId} style={{ "cursor": 'pointer' }} id='closeWidgetBtn'>
        <img src={close} className="rcw-close-launcher" alt='close' /> 
      </div>
        :
        <button type="button" className={cn('rcw-launcher', { 'rcw-hide-sm': showChat })} onClick={toggleChat} aria-controls={chatId} style={{ "cursor": 'pointer' }} id='openWidgetBtn'>
          {!showChat && showBadge && <Badge badge={badgeCount} />}
          <span className='text'>{launcherText || `Chat with us`}</span>
          <img src={openImg || openLauncher} className="rcw-open-launcher" alt='open' />
        </button>
      }
    </>
  );
}

export default Launcher;
