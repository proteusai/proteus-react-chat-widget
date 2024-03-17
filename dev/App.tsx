import React, { Component } from 'react';

import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader } from '../index';
export default class App extends Component {
  componentDidMount() {
    addResponseMessage("I'm Daren, How can I help you today?");
  }

  handleNewUserMessage = (newMessage: any) => {
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();
      if (newMessage === 'fruits') {
        setQuickButtons([ { label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' } ]);
      } else {
        addResponseMessage(newMessage);
      }
    }, 2000);
  }

  handleQuickButtonClicked = (e: any) => {
    addResponseMessage('Selected ' + e);
    setQuickButtons([]);
  }

  render() {
    return (
      <Widget
        title="Company name"
        subtitle="powered by Proteus"
        senderPlaceHolder="Ask a question ..."
        handleNewUserMessage={this.handleNewUserMessage}
        handleQuickButtonClicked={this.handleQuickButtonClicked}
        imagePreview
        primaryColor='blue'
        secondaryColor='linear-gradient(to right, #4285F4, #A92FFF, #FFDD67)'
      />
    );
  }
}
