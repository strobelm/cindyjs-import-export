import { findMissingImports } from '../findMissingImports'

test('find missing imports', async () => {
  const baseDir = 'src/__test__/cindyjs/src/js'

  const expectedMap = new Map([
    ['libcs/fakeFile.js', ['CSNumber', 'Fake', 'General']],
    [
      'libcs/CSNumber.js',
      ['instanceInvocationArguments', 'General', 'nada', 'List'],
    ],
    [
      'libcs/List.js',
      [
        'CSNumber',
        'nada',
        'eval_helper',
        'General',
        'comp_equals',
        'comp_almostequals',
        'evaluateAndVal',
      ],
    ],
    ['libcs/General.js', ['CSNumber', 'List', 'niceprint', 'nada', 'Dict']],
  ])
  expect(await findMissingImports(baseDir)).toMatchObject(expectedMap)
})
