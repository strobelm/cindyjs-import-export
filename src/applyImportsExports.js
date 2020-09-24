import fs from 'fs'
import path from 'path'
import { generateImportExport } from './generateImportExport'

export async function applyImportsExports(dir) {
  const { importMap, exportMap } = await generateImportExport(dir)

  const alteredFiles = new Map()

  for (const [relativeFilePath, exportSet] of exportMap) {
    const filePath = path.join(dir, relativeFilePath)
    const content = readFile(filePath)

    const contentWithExports = appendExportsToConent(content, exportSet)
    alteredFiles.set(relativeFilePath, contentWithExports)
  }

  for (const [relativeFilePath, importSet] of importMap) {
    const filePath = path.join(dir, relativeFilePath)
    const content = alteredFiles.has(relativeFilePath)
      ? alteredFiles.get(relativeFilePath)
      : readFile(filePath)

    const contentWithImportsAndExports = appendImportsToContent(
      content,
      importSet
    )
    alteredFiles.set(relativeFilePath, contentWithImportsAndExports)
  }

  return alteredFiles
}

function appendExportsToConent(content, exportSet) {
  const exportString = `export { ${[...exportSet].join(', ')} }`

  const contentWithExports = `${content}

${exportString}`

  return contentWithExports
}

function appendImportsToContent(content, importSet) {
  const grouped = groupBy([...importSet], 'file')
  const keys = Object.keys(grouped)
  const imports = keys.map(
    k =>
      `import { ${grouped[k]
        .map(o => o.import)
        .join(', ')} } from '${removeFileExtension(k)}'`
  )
  const importString = imports.join('\n')

  const contentWithImports = `${importString}

${content}`

  return contentWithImports
}

function readFile(file) {
  return fs.readFileSync(file, 'utf8')
}

function removeFileExtension(fileName) {
  const parsed = path.parse(fileName)
  const { dir, name } = parsed

  return path.join(dir, name)
}

const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  )
