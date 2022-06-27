function toHaveOrder(actualOrder, expectedOrder) {
  const incorrectPositions = expectedOrder
    .map((element, index) => actualOrder[index] === element)
    .filter((isCorrectOrder) => !isCorrectOrder);

  const pass = Boolean(!incorrectPositions.length);

  return {
    pass,
    message: () => {
      const expectation = pass ? 'not to be' : 'to be';
      let message = `Expected order ${expectation}:\n`;

      message += expectedOrder
        .map((element) => {
          return `${element.textContent.trim()}`;
        })
        .join('\n');

      message += '\n \nInstead received:\n';

      message += actualOrder
        .map((element) => {
          return `${element.textContent.trim()}`;
        })
        .join('\n');

      return message;
    },
  };
}

expect.extend({
  toHaveOrder,
});
