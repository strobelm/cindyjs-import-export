import { generateImportExport } from '../generateImportExport'

test('generate missing import export', async () => {
  const baseDir = 'src/__test__/cindyjs/src/js'
  const expectedImportMap = new Map([
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

  const expectedExportMap = new Map([
    ['libcs/General.js', new Set(['General'])],
    ['libcs/List.js', new Set(['List'])],
    ['libcs/CSNumber.js', new Set(['CSNumber'])],
  ])

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
  ]

  const expectedMaps = {
    importMap: expectedImportMap,
    exportMap: expectedExportMap,
    notFound: expectedNotFound,
  }

  expect(await generateImportExport(baseDir)).toEqual(expectedMaps)
})
