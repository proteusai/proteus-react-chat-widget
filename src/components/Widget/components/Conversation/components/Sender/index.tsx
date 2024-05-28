import { useRef, useEffect, useState, forwardRef, useImperativeHandle, ReactNode, Ref } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { GlobalState } from 'src/store/types';

import { getCaretIndex, isFirefox, updateCaret, insertNodeAtCaret, getSelection } from '../../../../../../utils/contentEditable'
const send = require('../../../../../../../assets/send-icon.svg') as string;
const paperclip = require('../../../../../../../assets/paperclip.svg') as string;
const smiley = require('../../../../../../../assets/smiley.svg') as string;
const brRegex = /<br>/g;

import './style.scss';
import { MESSAGES_TYPES } from '../../../../../../constants';

type Props = {
  placeholder: string;
  disabledInput: boolean;
  autofocus: boolean;
  sendMessage: (event: any) => void;
  buttonAlt: string;
  onPressEmoji: () => void;
  onChangeSize: (event: any) => void;
  onTextInputChange?: (event: any) => void;
  showDisclaimer?: boolean;
  disclaimerText?: string;
  disclaimerLearnMoreUrl?: string;
}

function Sender({
  sendMessage, placeholder, disabledInput, autofocus, onTextInputChange, buttonAlt, onPressEmoji,
  onChangeSize, showDisclaimer, disclaimerText, disclaimerLearnMoreUrl, }: Props, ref) {
  const showChat = useSelector((state: GlobalState) => state.behavior.showChat);
  const inputRef = useRef<HTMLDivElement>(null!);
  const refContainer = useRef<HTMLDivElement>(null);
  const [enter, setEnter]= useState(false)
  const [firefox, setFirefox] = useState(false);
  const [height, setHeight] = useState(0)
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [placeholderText, setPlaceholderText] = useState<string>(placeholder);
  // @ts-ignore
  useEffect(() => { if (showChat && autofocus) inputRef.current?.focus(); }, [showChat]);
  useEffect(() => { setFirefox(isFirefox())}, [])

  useImperativeHandle(ref, () => {
    return {
      onSelectEmoji: handlerOnSelectEmoji,
    };
  });

  const handlerOnChange = (event) => {
    onTextInputChange && onTextInputChange(event)
  }

  const handlerSendMessage = () => {
    const el = inputRef.current;
    let messageToSend = {
      type: '',
      content: '',
      attachments: [] as unknown,
    }
    if(el.innerHTML && selectedFile) {
      messageToSend.type = MESSAGES_TYPES.TEXT
      messageToSend.content = el.innerHTML
      messageToSend.attachments = [{ 
        type: MESSAGES_TYPES.IMAGE,
        content: selectedFile,
      }]
    } else if (el.innerHTML && !selectedFile) {
      messageToSend.type = MESSAGES_TYPES.TEXT
      messageToSend.content = el.innerHTML
    }
    if (messageToSend.content) {
      sendMessage(messageToSend);
      el.innerHTML = '';
  
      setPlaceholderText(placeholder);
      setSelectedFile(null);
    }
  }

  const handlerOnSelectEmoji = (emoji) => {
    const el = inputRef.current;
    const { start, end } = getSelection(el)
    if(el.innerHTML) {
      const firstPart = el.innerHTML.substring(0, start);
      const secondPart = el.innerHTML.substring(end);
      el.innerHTML = (`${firstPart}${emoji.native}${secondPart}`)
    } else {
      el.innerHTML = emoji.native
    }
    updateCaret(el, start, emoji.native.length)
  }

  const handlerOnKeyPress = (event) => {
    const el = inputRef.current;

    if(event.charCode == 13 && !event.shiftKey) {
      event.preventDefault()
      handlerSendMessage();
    }
    if(event.charCode === 13 && event.shiftKey) {
      event.preventDefault()
      insertNodeAtCaret(el);
      setEnter(true)
    }
  }

  // TODO use a context for checkSize and toggle picker
  const checkSize = () => {
    const senderEl = refContainer.current
    if(senderEl && height !== senderEl.clientHeight) {
      const {clientHeight} = senderEl;
      setHeight(clientHeight)
      onChangeSize(clientHeight ? clientHeight -1 : 0)
    }
  }

  const handlerOnKeyUp = (event) => {
    const el = inputRef.current;
    if(!el) return true;
    // Conditions need for firefox
    if(firefox && event.key === 'Backspace') {
      if(el.innerHTML.length === 1 && enter) {
        el.innerHTML = '';
        setEnter(false);
      }
      else if(brRegex.test(el.innerHTML)){
        el.innerHTML = el.innerHTML.replace(brRegex, '');
      }
    }
    checkSize();
  }

  const handlerOnKeyDown= (event) => {
    const el = inputRef.current;
    
    if( event.key === 'Backspace' && el){
      const caretPosition = getCaretIndex(inputRef.current);
      const character = el.innerHTML.charAt(caretPosition - 1);
      if(character === "\n") {
        event.preventDefault();
        event.stopPropagation();
        el.innerHTML = (el.innerHTML.substring(0, caretPosition - 1) + el.innerHTML.substring(caretPosition))
        updateCaret(el, caretPosition, -1)
      }
    }
  }

  const handlerPressEmoji = () => {
    onPressEmoji();
    checkSize();
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedFile(reader.result);
        setPlaceholderText('Add a message instruction for the file');
      };
    }
  };
  
  return (
    <>
      <div ref={refContainer} className={cn("rcw-sender", {'rcw-message-disable': disabledInput,})}>
        {/* <button className='rcw-picker-btn' type="submit" onClick={handlerPressEmoji}>
          <img src={smiley} className="rcw-picker-icon" alt="" />
        </button> */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="fileInput"
          className='testclass'
        />
        <label htmlFor="fileInput" className="rcw-file-btn">
            <img src={paperclip} alt="" />
        </label>
        <div className={cn('rcw-new-message', {
            'rcw-message-disable': disabledInput,
          })
        }>
          <div
            spellCheck
            className="rcw-input"
            role="textbox"
            contentEditable={!disabledInput}
            ref={inputRef}
            placeholder={placeholderText}
            onInput={handlerOnChange}
            onKeyPress={handlerOnKeyPress}
            onKeyUp={handlerOnKeyUp}
            onKeyDown={handlerOnKeyDown}
          />
        </div>
        <button type="submit" className="rcw-send" onClick={handlerSendMessage}>
          <img src={send} className="rcw-send-icon" alt={buttonAlt} />
        </button>
      </div>
      {showDisclaimer && 
      <p className='rcw-disclaimer-text'>{disclaimerText}
        &nbsp;<a href={disclaimerLearnMoreUrl} target='_blank'>Learn more</a>
      </p>}
    </>
  );
}

export default forwardRef(Sender);
