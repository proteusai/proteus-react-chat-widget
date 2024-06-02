import format from 'date-fns/format';
import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';

import { MessageTypes } from 'src/store/types';

const csvIcon = require('../../../../../../../../../assets/csv.svg') as string;
const fileIcon = require('../../../../../../../../../assets/file.svg') as string;

import './styles.scss';

type Props = {
  message: MessageTypes;
  showTimeStamp: boolean;
}

function Message({ message, showTimeStamp }: Props) {
  const { message: messageDetails } = message;
  const sanitizedHTML = markdownIt({ break: true })
    .use(markdownItClass, {
      img: ['rcw-message-img']
    })
    .use(markdownItSup)
    .use(markdownItSanitizer)
    .use(markdownItLinkAttributes, { attrs: { target: '_blank', rel: 'noopener' } })
    .render(messageDetails.content.toString());

    const idx = 0;
  return (
    <div className={`rcw-${message.sender}`}>
     {(messageDetails.attachments?.[idx]?.content.substring(0, 11) === 'data:image/') ?
      <img src={messageDetails.attachments?.[idx]?.content} alt="image file" style={{ maxWidth: '200px', maxHeight: '200px' }}/>
      : messageDetails.attachments?.[idx]?.content.substring(0, 13) === 'data:text/csv' ?
      <img src={csvIcon} style={{ width: '100px', height: '100px' }} alt={'csv-file'} />
      : (messageDetails.attachments?.[idx]?.type !== undefined) ? <img src={fileIcon} style={{ width: '100px', height: '100px' }} alt={'attached-file'} />
      : null
    }
     {(messageDetails.content) && <div className="rcw-message-text" dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/,'') }} />}
      {showTimeStamp && <span className="rcw-timestamp">{format(message.timestamp, 'hh:mm')}</span>}
    </div>
  );
}

export default Message;
