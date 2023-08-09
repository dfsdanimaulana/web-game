import Layer from '../classes/layer.js'

const generateBackgroundLayer = (
  imageLayer,
  backgroundSpeed,
  groundMargin = 0
) => {
  const backgroundLayer = []
  const speedModifier = 0.2

  for (let i = 0; i < imageLayer.length; i++) {
    backgroundLayer.push(
      new Layer(
        imageLayer[i],
        backgroundSpeed,
        speedModifier + speedModifier * i,
        groundMargin
      )
    )
  }

  return backgroundLayer
}

const createParallaxBackground = (backgroundSpeed) => {
  const imageLayer1 = [
    bgLayer1_1,
    bgLayer2_1,
    bgLayer3_1,
    bgLayer4_1,
    bgLayer5_1,
    bgLayer6_1
  ]
  const backgroundLayer1 = generateBackgroundLayer(
    imageLayer1,
    backgroundSpeed,
    50
  )

  console.log(backgroundLayer1)

  const imageLayer2 = [
    bgLayer1_2,
    bgLayer2_2,
    bgLayer3_2,
    bgLayer4_2,
    bgLayer5_2,
    bgLayer6_2
  ]
  const backgroundLayer2 = generateBackgroundLayer(
    imageLayer2,
    backgroundSpeed,
    50
  )

  const imageLayer3 = [
    bgLayer1_3,
    bgLayer2_3,
    bgLayer3_3,
    bgLayer4_3,
    bgLayer5_3,
    bgLayer6_3
  ]
  const backgroundLayer3 = generateBackgroundLayer(
    imageLayer3,
    backgroundSpeed,
    50
  )

  const imageLayer4 = [
    bgLayer1_4,
    bgLayer2_4,
    bgLayer3_4,
    bgLayer4_4,
    bgLayer5_4,
    bgLayer6_4,
    bgLayer7_4
  ]
  const backgroundLayer4 = generateBackgroundLayer(
    imageLayer4,
    backgroundSpeed,
    150
  )

  const imageLayer5 = [
    bgLayer1_5,
    bgLayer2_5,
    bgLayer3_5,
    bgLayer4_5,
    bgLayer5_5
  ]
  const backgroundLayer5 = generateBackgroundLayer(
    imageLayer5,
    backgroundSpeed,
    117
  )

  return [
    backgroundLayer1,
    backgroundLayer2,
    backgroundLayer3,
    backgroundLayer4,
    backgroundLayer5
  ]
}

export default createParallaxBackground