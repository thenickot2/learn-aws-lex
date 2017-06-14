import _ from 'lodash';
import Promise from 'bluebird';

// Greetings from ChatterBot training data 
// https://raw.githubusercontent.com/gunthercox/chatterbot-corpus/master/chatterbot_corpus/data/english/greetings.corpus.json
const greetings = [
  [
    "Hello",
    "Hi"
  ],
  [
    "Hi",
    "Hello"
  ],
  [
    "Greetings!",
    "Hello"
  ],
  [
    "Hello",
    "Greetings!"
  ],
  [
    "Hi, How is it going?",
    "Good"
  ],
  [
    "Hi, How is it going?",
    "Fine"
  ],
  [
    "Hi, How is it going?",
    "Okay"
  ],
  [
    "Hi, How is it going?",
    "Great"
  ],
  [
    "Hi, How is it going?",
    "Could be better."
  ],
  [
    "Hi, How is it going?",
    "Not so great."
  ],
  [
    "How are you doing?",
    "Good."
  ],
  [
    "How are you doing?",
    "Very well, thanks."
  ],
  [
    "How are you doing?",
    "Fine, and you?"
  ],
  [
    "Nice to meet you.",
    "Thank you."
  ],
  [
    "How do you do?",
    "I'm doing well."
  ],
  [
    "How do you do?",
    "I'm doing well. How are you?"
  ],
  [
    "Hi, nice to meet you.",
    "Thank you. You too."
  ],
  [
    "It is a pleasure to meet you.",
    "Thank you. You too."
  ],
  [
    "Top of the morning to you!",
    "Thank you kindly."
  ],
  [
    "Top of the morning to you!",
    "And the rest of the day to you."
  ],
  [
    "What's up?",
    "Not much."
  ],
  [
    "What's up?",
    "Not too much."
  ],
  [
    "What's up?",
    "Not much, how about you?"
  ],
  [
    "What's up?",
    "Nothing much."
  ],
  [
    "What's up?",
    "The sky's up but I'm fine thanks. What about you?"
  ]
];

class GreetingService {
  constructor() {
    return this;
  }
  
  close(sessionAttributes, fulfillmentState, message) {
    // Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks, your pizza will arrive in 20 minutes")
    return {
      sessionAttributes,
      dialogAction: {
        type: 'Close',
        fulfillmentState,
        message,
      },
    };
  }
     
  dispatch(intentRequest) {
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    
    const greeting = greetings[Math.floor(Math.random() * greetings.length)][0];
    
    // Assume most actions will be async
    return Promise.resolve(this.close(sessionAttributes, 'Fulfilled',
      {'contentType': 'PlainText', 'content': greeting}));
  }
};

module.exports = GreetingService;
