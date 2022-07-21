const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next',
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    config.resolve.modules.push(`${process.cwd()}/src`)
    config.resolve.roots = [
      path.resolve(__dirname, '../public'),
      'node_modules',
    ]

    return config
  },
}
