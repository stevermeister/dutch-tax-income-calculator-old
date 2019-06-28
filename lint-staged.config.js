module.exports = {
  linters: {
    '**/*.+(js|md|ts|html|css|sass|less|graphql|yml|yaml|scss|vue)': [
      'eslint --fix',
      'prettier --write',
      'git add',
    ],
  },
}
