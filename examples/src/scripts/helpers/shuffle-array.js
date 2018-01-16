// shuffleArray
// shuffle the order of values in an array
// -----------------------------------------------------------------------------
export function shuffleArray(array) {
  let currentIndex = array.length;
  let randomIndex;
  let tempValue;

  while (currentIndex !== 0) {
    // pick a random element from the array
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    tempValue = array[currentIndex];

    // and swap it with the current element
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }

  return array;
}

// shuffleArrayOnce
// take an array and swap only 2 values
// -----------------------------------------------------------------------------
export function shuffleArrayOnce(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  const shiftedIndex = array.length - 1;
  const tempValue = array[shiftedIndex];

  array[shiftedIndex] = array[randomIndex];
  array[randomIndex] = tempValue;

  return array;
}
