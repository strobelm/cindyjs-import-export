import { ESLint } from 'eslint'
import path from 'path'

export async function findMissingImports(dir) {
  const options = { ignore: false }
  const eslint = new ESLint(options)

  const eslintResults = await eslint.lintFiles([`${dir}/**/*.js`])

  const pathAndMissingImports = transFormEslintResults(eslintResults)

  const missingImportsMap = extractDataFromResults(pathAndMissingImports, dir)

  return missingImportsMap
}

function transFormEslintResults(eslintResults) {
  return eslintResults
    .map(r => {
      const { filePath, messages } = r
      const filteredMsgs = messages.filter(m => m.ruleId === 'no-undef')
      const missingImports = [
        ...new Set(
          filteredMsgs.map(m => m.message).map(s => s.match(/'([^']+)'/)[1]) // extract content of single quotes
        ),
      ]
      return { filePath, missingImports }
    })
    .filter(o => o.missingImports.length !== 0)
}

function extractDataFromResults(pathAndMissingImports, basePath) {
  return pathAndMissingImports.reduce(
    (acc, val) =>
      new Map([
        ...acc,
        [path.relative(basePath, val.filePath), val.missingImports],
      ]),
    new Map()
  )
}
