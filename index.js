import { writeFilesToFilesystem } from './src/writeFilesToFilesystem'

const argv = process.argv
if (argv.length !== 4) {
  console.log('Please supply both input and output directory')
  console.log(
    'example: node cindy-import-export inputDirectory outputDirectory'
  )
  process.exit(1)
}

const inputDir = argv[2]
const outputDir = argv[3]

console.log([inputDir, outputDir])
writeFilesToFilesystem(inputDir, outputDir)
