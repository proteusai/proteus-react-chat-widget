const close = require('../../../../../../../assets/close.svg') as string;
const openLauncher = require('../../../../../../../assets/bot-icon-logo.svg') as string;

import './style.scss';

type Props = {
  title: string;
  subtitle: string;
  toggleChat: () => void;
  showCloseButton: boolean;
  titleAvatar?: string;
}

function Header({ title, subtitle, toggleChat, showCloseButton, titleAvatar }: Props) {
  return (
    <div className="rcw-header">
      {showCloseButton &&
        <button className="rcw-close-button" onClick={toggleChat}>
          <img src={close} className="rcw-close" alt="close" />
        </button>
      }
      <span className="title-text">{title}</span>
      {/* <span className="sub-title-text">{subtitle}</span> */}

      <img src={titleAvatar || openLauncher} className="avatar" alt="profile" />
    </div>
  );
}

export default Header;
