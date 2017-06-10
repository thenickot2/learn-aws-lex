import {handler} from '../../index';
import {expect} from 'chai';

describe('Intent Name MovieInfo', () => {
  it('should fetch the director for suicide squad', (done) => {
    const event = {
      "messageVersion": "1.0",
      "invocationSource": "FulfillmentCodeHook",
      "userId": "user-1",
      "sessionAttributes": {},
      "bot": {
        "name": "movieInfoApp",
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
