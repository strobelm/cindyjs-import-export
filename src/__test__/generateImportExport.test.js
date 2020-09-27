import { generateImportExport } from '../generateImportExport'

describe('generate missing import export', () => {
  const baseDir = 'src/__test__/cindyjs/src/js'

  let exportMap, importMap, notFound
  beforeAll(async () => {
    const importExport = await generateImportExport(baseDir)
    exportMap = importExport.exportMap
    importMap = importExport.importMap
    notFound = importExport.notFound
  })

  test('import map', () => {
    const expectedImportMap = new Map([
      [
        'libcs/fakeFile.js',
        new Set([
          { import: 'CSNumber', file: 'libcs/CSNumber.js' },
          { import: 'Fake', file: 'libcs/General.js' },
          { import: 'General', file: 'libcs/General.js' },
          { import: 'conicMat2Vec', file: 'libcs/List.js' },
        ]),
      ],
      [
        'libcs/CSNumber.js',
        new Set([
          { import: 'General', file: 'libcs/General.js' },
          { import: 'List', file: 'libcs/List.js' },
        ]),
      ],
      [
        'libcs/General.js',
        new Set([
          { import: 'CSNumber', file: 'libcs/CSNumber.js' },
          { import: 'List', file: 'libcs/List.js' },
        ]),
      ],
      [
        'libcs/List.js',
        new Set([
          { import: 'CSNumber', file: 'libcs/CSNumber.js' },
          { import: 'General', file: 'libcs/General.js' },
        ]),
      ],
    ])

    expect(expectedImportMap).toEqual(importMap)
  })

  test('export map', () => {
    const expectedExportMap = new Map([
      ['libcs/General.js', new Set(['General', 'Fake'])],
      ['libcs/List.js', new Set(['List', 'conicMat2Vec'])],
      ['libcs/CSNumber.js', new Set(['CSNumber'])],
    ])

    expect(expectedExportMap).toEqual(exportMap)
  })

  test('not found', () => {
    const expectedNotFound = [
      'instanceInvocationArguments',
      'nada',
      'niceprint',
      'nada',
      'Dict',
      'nada',
      'eval_helper',
      'comp_equals',
      'comp_almostequals',
      'evaluateAndVal',
      'simspeed',
    ]

    expect(expectedNotFound).toEqual(notFound)
  })
})
