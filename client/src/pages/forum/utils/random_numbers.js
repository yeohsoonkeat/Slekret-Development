const random_numbers = (n) => {
  const numbers = Array.from(Array(n), (_, i) => i);
  for (let j = n - 1; j >= 0; j--) {
    let swapIndex = Math.floor(Math.random() * j);
    let tmp = numbers[swapIndex];
    numbers[swapIndex] = numbers[j];
    numbers[j] = tmp;
  }

  return numbers;
};

export default random_numbers;
