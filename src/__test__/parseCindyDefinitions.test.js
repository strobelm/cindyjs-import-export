import { parseCindyDefitions } from "../parseCindyDefintions"

describe("Generate Defintions map", () => {
  test("double defintion in single file", () => {
    const baseDir = "src/__test__/data/doubleDefintion/singleFile"
    expect(() => parseCindyDefitions(baseDir)).toThrow(
      "Definition already exists!"
    )
  })

  test("double defintion in multiple files", () => {
    const baseDir = "src/__test__/data/doubleDefintion/multipleFiles"
    expect(() => parseCindyDefitions(baseDir)).toThrow(
      "Definition already exists in another file!"
    )
  })

  test("get definition map", () => {
    const baseDir = "src/__test__/cindyjs/src/js"
    const defintionsMaps = parseCindyDefitions(baseDir)

    const expectedDefinitons = new Map(
      Object.entries({
        CSNumber: "libcs/CSNumber.js",
        angleUnit: "libcs/CSNumber.js",
        angleUnitName: "libcs/CSNumber.js",
        TWOPI: "libcs/CSNumber.js",
        PERTWOPI: "libcs/CSNumber.js",
        angleUnits: "libcs/CSNumber.js",
        List: "libcs/List.js",
      })
    )

    expect(defintionsMaps).toEqual(expectedDefinitons)
  })
})
