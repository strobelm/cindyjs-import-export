import { findMissingImports } from '../findMissingImports'

test('find missing imports', async () => {
  const baseDir = 'src/__test__/cindyjs'

  const expectedMap = new Map([
    [
      'src/js/libcs/CSNumber.js',
      ['instanceInvocationArguments', 'General', 'nada', 'List'],
    ],
    [
      'src/js/libcs/List.js',
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
  ])
  expect(await findMissingImports(baseDir)).toMatchObject(expectedMap)
})
