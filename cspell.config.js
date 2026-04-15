/** @type {import("cspell").CSpellSettings} */
export default {
  version: '0.2',
  language: 'en',
  ignorePaths: ['./etc/**/*', './pnpm-lock.yaml'],
  useGitignore: true,
  dictionaries: ['dictionary'],

  dictionaryDefinitions: [
    {
      name: 'dictionary',
      path: './dictionary.txt',
      addWords: true,
    },
  ],
}
