import { applyImportsExports } from '../applyImportsExports'
import { parse } from 'acorn'

describe('apply imports and exports', () => {
  const baseDir = 'src/__test__/cindyjs/src/js'

  let alteredFiles
  beforeAll(async () => {
    alteredFiles = await applyImportsExports(baseDir)
  })

  test('exports added', async () => {
    const expectedExports = new Map([
      ['libcs/CSNumber.js', ['CSNumber']],
      ['libcs/General.js', ['General', 'Fake']],
      ['libcs/List.js', ['List']],
    ])

    for (let [file, exportSymbols] of expectedExports) {
      const body = await getBody(alteredFiles.get(file))
      const exports = body.filter(
        node => node.type === 'ExportNamedDeclaration'
      )

      const exportNames = exports
        .map(e => e.specifiers)
        .flat()
        .map(x => x.exported.name)

      expect(exportNames).toEqual(exportSymbols)
    }
  })

  test('imports added', async () => {
    const expectedImports = new Map([
      [
        'libcs/CSNumber.js',
        [
          { names: ['General'], sourceValue: 'libcs/General' },
          { names: ['List'], sourceValue: 'libcs/List' },
        ],
      ],
      [
        'libcs/General.js',
        [
          { names: ['CSNumber'], sourceValue: 'libcs/CSNumber' },
          { names: ['List'], sourceValue: 'libcs/List' },
        ],
      ],
      [
        'libcs/List.js',
        [
          { names: ['CSNumber'], sourceValue: 'libcs/CSNumber' },
          { names: ['General'], sourceValue: 'libcs/General' },
        ],
      ],
    ])

    for (let [file, importSymbols] of expectedImports) {
      const body = await getBody(alteredFiles.get(file))
      const imports = body.filter(node => node.type === 'ImportDeclaration')

      const importNames = imports
        .map(e => {
          return {
            names: e.specifiers.map(s => s.imported.name),
            sourceValue: e.source.value,
          }
        })
        .flat()

      expect(importNames).toEqual(importSymbols)
    }
  })
})

async function getBody(fileString) {
  const { body } = parse(fileString, {
    ecmaVersion: 'latest',
    sourceType: 'module',
  })

  return body
}
