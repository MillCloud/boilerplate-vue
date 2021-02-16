module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    '@a/(.*)$': '<rootDir>/src/assets/$1',
    '@c/(.*)$': '<rootDir>/src/components/$1',
    '@u/(.*)$': '<rootDir>/src/utils/$1',
    '@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!lodash-es)'],
};
