export const buildOrder = [
  'libcs/CSNumber.js',
  'libcs/List.js',
  'libcs/Json.js',
  'libcs/Dict.js',
  'libcs/General.js',
  'libcs/Essentials.js',
  'libcs/Namespace.js',
  'libcs/Accessors.js',
  'libcs/Operators.js',
  'libcs/OpDrawing.js',
  'libcs/OpImageDrawing.js',
  'libcs/Parser.js',
  'libcs/Evaluator.js',
  'libcs/OpSound.js',
  'libcs/CSad.js',
  'libcs/Render2D.js',
  'libcs/RenderBackends.js',
  'libcs/Tools.js',
  'libcs/PSLQ.js',
  'libgeo/GeoState.js',
  'libgeo/GeoBasics.js',
  'libgeo/GeoRender.js',
  'libgeo/Tracing.js',
  'libgeo/Prover.js',
  'libgeo/GeoOps.js',
  'libgeo/GeoScripts.js',
  'libgeo/StateIO.js',
  'liblab/LabBasics.js',
  'liblab/LabObjects.js',
]

function sortOneSet(inputSet) {
  return new Set(
    [...inputSet].sort((a, b) => {
      const idxA = buildOrder.indexOf(a.file)
      const idxB = buildOrder.indexOf(b.file)

      if (idxA == undefined || idxB == undefined) {
        throw new Error(
          `Could not find build index for one of the files: ${a.file} or ${b.file}`
        )
      }

      return idxA - idxB
    })
  )
}

export function sortMapByBuildOrder(map) {
  const newMap = new Map()

  map.forEach((k, v) => {
    newMap.set(v, sortOneSet(k))
  })

  return newMap
}
