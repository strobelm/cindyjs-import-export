import fs from 'fs'
import os from 'os'
import path from 'path'
import fg from 'fast-glob'
import prettier from 'prettier'

import { writeFilesToFilesystem } from '../writeFilesToFilesystem'

test('write files to filesystem', async () => {
  const inputDir = 'src/__test__/cindyjs/src/js/'
  const compareDir = 'src/__test__/cindyjsWithImports/src/js/'

  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cindy-'))

  await writeFilesToFilesystem(inputDir, outputDir)

  const compareFiles = fg.sync(path.join(compareDir, '/**/*.js'))

  compareFiles.map(f => {
    const fileName = path.relative(compareDir, f)

    const prettierOptions = { parser: 'babel' }

    const writtenFile = prettier.format(
      fs.readFileSync(path.join(outputDir, fileName), 'utf8'),
      prettierOptions
    )
    const compareFile = prettier.format(
      fs.readFileSync(path.join(compareDir, fileName), 'utf8'),
      prettierOptions
    )

    expect(writtenFile).toEqual(compareFile)
  })
})
