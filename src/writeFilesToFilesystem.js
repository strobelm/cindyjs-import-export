import fs from 'fs'
import path from 'path'
import { applyImportsExports } from './applyImportsExports'

export async function writeFilesToFilesystem(inputDir, outputDir) {
  const alteredFiles = await applyImportsExports(inputDir)

  for (const [file, data] of alteredFiles) {
    const filePath = path.join(outputDir, file)
    ensureDirectoryExistence(filePath)
    fs.writeFileSync(filePath, data)
  }
}

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }
  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}
