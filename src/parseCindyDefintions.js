import path from 'path'
import fs from 'fs'
import fg from 'fast-glob'
import { parse } from 'acorn'

export function parseCindyDefitions(baseDir) {
  const fileNames = getFileNames(baseDir)

  const definitions = fileNames.map(f =>
    parseOneFileAndGetDefintions(baseDir, f)
  )

  const cindyDefintions = definitions.reduce((acc, val) => {
    if (intersection(acc, val)) {
      throw new Error('Definition already exists in another file!')
    }
    return new Map([...acc, ...val])
  }, new Map())

  return cindyDefintions
}

function parseOneFileAndGetDefintions(baseDir, filePath) {
  const relPath = path.relative(baseDir, filePath)

  const ignoredFiles = ['Head.js', 'Tail.js']
  if (ignoredFiles.includes(relPath)) {
    return new Map()
  }

  const content = fs.readFileSync(filePath)

  const parsed = parse(content, { ecmaVersion: 'latest' })
  const { body } = parsed

  const nameDefinitions = extractVariableDeclarations(body)

  const nameMap = nameDefinitions.reduce((acc, name) => {
    if (acc.has(name)) {
      throw new Error('Definition already exists!')
    }
    return new Map([...acc, [name, relPath]])
  }, new Map())

  return nameMap
}

function extractVariableDeclarations(body) {
  const variableDeclarations = body.filter(
    el => el.type === 'VariableDeclaration'
  )

  const nameDeclarations = variableDeclarations
    .map(variable => variable.declarations)
    .flat()

  const nameDefinitions = nameDeclarations.map(declr => declr.id.name)
  return nameDefinitions
}

function getFileNames(dir) {
  return fg.sync(path.join(dir, '/**/*.js'))
}

function intersection(a, b) {
  return [...a.keys()].some(k => b.has(k))
}
//hello
