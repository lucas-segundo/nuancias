module.exports = (plop) => {
  const path = '../src/presentation/{{path}}/{{name}}/{{name}}'
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'path',
        message: 'What is the folder path?',
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: `${path}.tsx`,
        templateFile: 'templates/component.tsx.hbs',
      },
      {
        type: 'add',
        path: `${path}.stories.tsx`,
        templateFile: 'templates/stories.tsx.hbs',
      },
      {
        type: 'add',
        path: `${path}.spec.tsx`,
        templateFile: 'templates/test.tsx.hbs',
      },
    ],
  })
}
