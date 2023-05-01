const RandomServiceProvider = (() => {
  const randomNumberGenerator = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const randomBooleanGenerator = () => Math.random() < 0.5;

  return { randomNumberGenerator, randomBooleanGenerator };
})();

export default RandomServiceProvider;
