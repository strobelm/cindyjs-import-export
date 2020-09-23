import fs from 'fs'
import os from 'os'
import path from 'path'

import { writeFilesToFilesystem } from '../writeFilesToFilesystem'

test('write files to filesystem', async () => {
  const inputDir = 'src/__test__/cindyjs/src/js/'
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cindy-'))

  console.log(outputDir)
  await writeFilesToFilesystem(inputDir, outputDir)
})
