module.exports = {
  root: true,
  extends: ['@react-native-community', 'airbnb-base', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
