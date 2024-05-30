import React, { Component } from 'react';

import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader } from '../index';
export default class App extends Component {
  componentDidMount() {
    addResponseMessage({
      type: 'text',
      content: "I'm Daren, How can I help you today?"
    });
  }

  handleNewUserMessage = (newMessage: any) => {
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();
      if (newMessage.content === 'fruits') {
        setQuickButtons([ { label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' } ]);
      } else {
        addResponseMessage(newMessage);
      }
    }, 2000);
  }

  handleQuickButtonClicked = (e: any) => {
    addResponseMessage({ type: 'text', content: 'Selected ' + e });
    setQuickButtons([]);
  }

  render() {
    return (
      <Widget
        title="Company Name overflow message display on the go like that asham ashim dua solah istakarah"
        subtitle="powered by Proteus"
        senderPlaceHolder="Ask a question ..."
        handleNewUserMessage={this.handleNewUserMessage}
        handleQuickButtonClicked={this.handleQuickButtonClicked}
        imagePreview
        primaryColor='red'
        secondaryColor='blue'
        primaryTextColor='green'
        secondaryTextColor='white'
        theme='pink'
        launcherText='open'
        fullScreen={false}
        emojis={true}
        weburl='*'
        displayPosition='left'
      />
    );
  }
}
