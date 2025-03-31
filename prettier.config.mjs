import marviuzConfig from '@marviuz/prettier-config';

/** @type {import('prettier').Options} */
export default {
  ...marviuzConfig,
  plugins: [...marviuzConfig.plugins],
};
