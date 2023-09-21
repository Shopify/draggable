import AbstractEvent from 'shared/AbstractEvent';

import {expectation} from './utils';

function toHaveBeenCalledWithEvent(
  this: any,
  jestFunction: ReturnType<typeof jest.fn>,
  expectedEventConstructor: typeof AbstractEvent<unknown>,
) {
  const mockFunction = jestFunction.mock;
  const mockCalls = mockFunction.calls;
  let pass: boolean;
  let message;

  pass = this.isNot && mockCalls.length === 0;
  if (pass) {
    message = () =>
      `Expected ${expectedEventConstructor.type} event ${expectation(
        !pass,
      )} triggered`;
    return {pass: !pass, message};
  }

  pass = !mockCalls.length;
  if (pass) {
    message = () =>
      `Expected ${expectedEventConstructor.type} event ${expectation(
        pass,
      )} triggered`;
    return {pass, message};
  }

  const event = mockCalls[0][0];

  pass = !event;
  if (pass) {
    message = () =>
      `Expected ${expectedEventConstructor.type} event ${expectation(
        pass,
      )} triggered with an event instance`;
    return {pass, message};
  }

  pass = event.constructor === expectedEventConstructor;

  return {
    pass,
    message: () =>
      `Expected ${event.type} event ${expectation(pass)} triggered with ${
        expectedEventConstructor.name
      } instance`,
  };
}

function toHaveBeenCalledWithEventProperties(
  jestFunction: ReturnType<typeof jest.fn>,
  expectedProperties: {[key: string]: any},
) {
  const mockFunction = jestFunction.mock;
  const mockCalls = mockFunction.calls;
  const event = mockCalls[0][0];
  const expectedPropertyEntries = Object.entries(expectedProperties);

  const badMatches = expectedPropertyEntries
    .map(([key, value]) => ({key, value}))
    .filter(({key, value}) => event[key] !== value);

  const receivedPropertyEntries = Object.entries(event);

  const pass = Boolean(!badMatches.length);

  return {
    pass,
    message: () => {
      const listOfExpectedProperties = expectedPropertyEntries.map(
        ([key, value]) => `${key}=${JSON.stringify(value)}`,
      );
      const listOfReceivedProperties = receivedPropertyEntries.map(
        ([key, value]) => `${key}=${JSON.stringify(value)}`,
      );

      return `Expected ${event.type} event ${expectation(
        pass,
      )} the following properties:\n${listOfExpectedProperties.join(
        '\n',
      )}\n\nInstead received:\n${listOfReceivedProperties.join('\n')}\n`;
    },
  };
}

expect.extend({
  toHaveBeenCalledWithEvent,
  toHaveBeenCalledWithEventProperties,
});
