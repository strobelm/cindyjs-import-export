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

  const contentWithExports = `
${content}

${exportString}`

  return contentWithExports
}

function appendImportsToContent(content, importSet) {
  const imports = [...importSet].map(
    obj => `import { ${obj.import} } from '${obj.file}'`
  )
  const importString = imports.join('\n')

  const contentWithImports = `
${importString}

${content}`

  return contentWithImports
}

function readFile(file) {
  return fs.readFileSync(file, 'utf8')
}
