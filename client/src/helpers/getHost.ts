export default () => {
  switch (import.meta.env.PROD) {
    case true:
      return 'https://coinsponge-com-5awxk26zha-uw.a.run.app';
    default:
      return 'http://localhost:7777';
  }
};
