module.exports = {
  linters: {
    '**/*.+(js|md|ts|html|css|sass|less|graphql|yml|yaml|scss|vue)': [
      'prettier --write',
      'git add',
    ],
    '**/*.+(js|ts)': ['eslint --fix'],
  },
};
