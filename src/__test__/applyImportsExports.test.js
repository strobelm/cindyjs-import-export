import { applyImportsExports } from '../applyImportsExports'

describe('apply imports and exports', () => {
  const baseDir = 'src/__test__/cindyjs/src/js'
  test('add exports', () => {
    applyImportsExports(baseDir)
  })
})
