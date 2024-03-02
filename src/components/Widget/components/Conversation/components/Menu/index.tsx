import { useSelector, useDispatch } from 'react-redux';

import { GlobalState } from '../../../../../../store/types';
import { setBadgeCount } from '../../../../../../store/actions';

const homeIcon = require('../../../../../../../assets/icon-home.svg') as string;
const chatIconActive = require('../../../../../../../assets/icon-chat.svg') as string;
const helpIcon = require('../../../../../../../assets/icon-help.svg') as string;

import './style.scss';


type Props = {
  toggle: () => void;
  homeTab?: string;
  chatTab: string;
  helpTab?: boolean;
}

/**
 * Chat widget Menu tabs.
 * @param param0 
 * @returns 
 */
function Menu({ toggle, homeTab, chatTab, helpTab }: Props) {
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
    <div className='rcw-menu-container'>
      <button type="submit"  className='rcw-menu-navItem' onClick={toggleChat}>
        <img src={homeIcon} alt='home menu button' className='rcw-menu-icon' />
        <span className='rcw-menu-text'>Home</span>
      </button>
      <button type='button' className='rcw-menu-navItem' onClick={toggleChat}>
        <img src={chatIconActive} alt='chat menu button' className='rcw-menu-icon' />
        <span className='rcw-menu-text'>Chat</span>
      </button>
      <button type='button' className='rcw-menu-navItem' onClick={toggleChat}>
        <img src={helpIcon} alt='help menu button' className='rcw-menu-icon' />
        <span className='rcw-menu-text'>Help</span>
      </button>
    </div>
  );
}

export default Menu;
