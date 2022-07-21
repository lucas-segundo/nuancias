// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const buildCheckCommands = (filenames) => [
  `yarn lint --fix --file ${filenames.map((f) =>
    path.relative(process.cwd(), f)
  )}`,
  `yarn prettier --write  ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`,
]

module.exports = {
  '*.{ts,tsx}': [
    'yarn test --findRelatedTests ./src --bail --passWithNoTests',
    buildCheckCommands,
  ],
}
