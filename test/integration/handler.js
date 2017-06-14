import {handler} from '../../index';
import {expect} from 'chai';
import _ from 'lodash';

describe('Intent Name Greeting', () => {
  it('should return any greeting', (done) => {
    const event = {
      "messageVersion": "1.0",
      "invocationSource": "FulfillmentCodeHook",
      "userId": "user-1",
      "sessionAttributes": {},
      "bot": {
        "name": "testApp",
        "alias": "$LATEST",
        "version": "$LATEST"
      },
      "outputDialogMode": "Text",
      "currentIntent": {
        "name": "greeting",
        "slots": {},
        "confirmationStatus": "None"
      }
    }
    
    handler(event, null, (err, response) => {
      let baseObj = _.cloneDeep(response);
      let message = baseObj.dialogAction.message;
      delete message.content;
      expect(baseObj).to.deep.eql({
        "sessionAttributes": {},
        "dialogAction": {
          "type": "Close",
          "fulfillmentState": "Fulfilled",
          "message": {
            "contentType": "PlainText"
          }
        }
      })
      expect(response.dialogAction.message.content).to.not.be.null;
      return done(err);
    })
  });
});

describe('Intent Name MovieInfo', () => {
  xit('should fetch the director for suicide squad', (done) => {
    const event = {
      "messageVersion": "1.0",
      "invocationSource": "FulfillmentCodeHook",
      "userId": "user-1",
      "sessionAttributes": {},
      "bot": {
        "name": "testApp",
        "alias": "$LATEST",
        "version": "$LATEST"
      },
      "outputDialogMode": "Text",
      "currentIntent": {
        "name": "movieInfo",
        "slots": {
          "name": "Suicide Squad",
          "summary": "Director"
        },
        "confirmationStatus": "None"
      }
    }
    
    handler(event, null, (err, response) => {
      expect(response).to.deep.eql({
        "sessionAttributes": {},
        "dialogAction": {
          "type": "Close",
          "fulfillmentState": "Fulfilled",
          "message": {
            "contentType": "PlainText",
            "content": "Director of Suicide Squad is/are: David Ayer"
          }
        }
      })
      return done(err);
    })
  });
});
