export const emojiToJpg = (emojiArray, scale = 4) => {
  const result = {}

  emojiArray.forEach(([emoji, name]) => {
    // Create a canvas element
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // Set the canvas size
    const canvasSize = 50 // Adjust this size based on the desired output
    canvas.width = canvasSize
    canvas.height = canvasSize

    // Disable image smoothing for true pixelation
    ctx.imageSmoothingEnabled = false

    // Draw the emoji on the canvas
    ctx.font = `${canvasSize}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(emoji, canvasSize / 2, canvasSize / 2)

    // Pixelate the image by scaling down and up
    const pixelScale = scale
    const smallCanvasSize = canvasSize / pixelScale

    // Draw a scaled-down version of the image
    const offscreenCanvas = document.createElement('canvas')
    offscreenCanvas.width = smallCanvasSize
    offscreenCanvas.height = smallCanvasSize
    const offscreenCtx = offscreenCanvas.getContext('2d')
    offscreenCtx.imageSmoothingEnabled = false // Ensure the scaled-down image is pixelated
    offscreenCtx.drawImage(canvas, 0, 0, smallCanvasSize, smallCanvasSize)

    // Scale it back up to the original size on the main canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize)
    ctx.drawImage(
      offscreenCanvas,
      0,
      0,
      smallCanvasSize,
      smallCanvasSize,
      0,
      0,
      canvasSize,
      canvasSize
    )

    // Apply sepia filter
    ctx.drawImage(canvas, 0, 0)

    // Make black pixels transparent
    const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i]
      const green = data[i + 1]
      const blue = data[i + 2]

      // If the pixel is (close to) black, set its alpha to 0 (fully transparent)
      if (red < 30 && green < 30 && blue < 30) {
        data[i + 3] = 0
      }
    }

    // Put the modified image data back to the canvas
    ctx.putImageData(imageData, 0, 0)

    // Store the base64 encoded image in the result object
    const base64Image = canvas.toDataURL('image/png') // Use PNG for transparency support
    result[name] = base64Image
  })

  return result
}
