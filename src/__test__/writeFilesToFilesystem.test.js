import fs from 'fs'
import os from 'os'
import path from 'path'
import fg from 'fast-glob'
import prettier from 'prettier'

import { writeFilesToFilesystem } from '../writeFilesToFilesystem'

test('write files to filesystem', async () => {
  const inputDir = 'src/__test__/cindyjs/src/js/'
  const compDir = 'src/__test__/cindyjsWithImports/src/js/'

  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cindy-'))

  await writeFilesToFilesystem(inputDir, outputDir)

  const compareFiles = fg.sync(path.join(compDir, '/**/*.js'))

  compareFiles.map(f => {
    const fileName = path.relative(compDir, f)

    const writtenFile = readFileAndApplyPrettier(path.join(outputDir, fileName))
    const compareFile = readFileAndApplyPrettier(path.join(compDir, fileName))

    expect(writtenFile).toEqual(compareFile)
  })
})

function readFileAndApplyPrettier(file) {
  const prettierOptions = { parser: 'babel' }
  return prettier.format(fs.readFileSync(file, 'utf8'), prettierOptions)
}
