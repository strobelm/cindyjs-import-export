import { parseCindyDefitions } from './parseCindyDefintions'
import { findMissingImports } from './findMissingImports'

export async function generateImportExport(dir) {
  const definitions = parseCindyDefitions(dir)
  const missingImports = await findMissingImports(dir)

  const exportMap = new Map()
  const importMap = new Map()
  let notFound = []

  for (let [file, missing] of missingImports) {
    for (let importName of missing) {
      if (definitions.has(importName)) {
        const declarationOfImportFile = definitions.get(importName)

        // import
        const importDef = { import: importName, file: declarationOfImportFile }
        importMap.set(
          file,
          importMap.has(file)
            ? new Set([...importMap.get(file), importDef])
            : new Set([importDef])
        )

        // export
        exportMap.set(
          declarationOfImportFile,
          exportMap.has(declarationOfImportFile)
            ? new Set([...exportMap.get(declarationOfImportFile), importName])
            : new Set([importName])
        )
      } else {
        notFound = [...notFound, importName]
      }
    }
  }

  return { importMap, exportMap, notFound }
}
