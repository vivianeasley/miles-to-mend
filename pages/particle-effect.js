export const initParticleEffect = (appNode, state) => {
  const canvas = document.getElementById('particleCanvas')
  const ctx = canvas.getContext('2d')
  let animationFrameId

  function createParticle(x, y, image) {
    return {
      x: x,
      y: y,
      image: image,
      size: Math.random() * 20 + 10,
      speedY: Math.random() * -3 - 2,
      speedX: Math.random() * 2 - 1,
      gravity: 0.1,
      opacity: 1,
    }
  }

  function updateParticle(particle) {
    particle.speedY += particle.gravity
    particle.x += particle.speedX
    particle.y += particle.speedY
    particle.opacity -= 0.02
    if (particle.opacity < 0) particle.opacity = 0
  }

  function drawParticle(particle) {
    ctx.globalAlpha = particle.opacity
    ctx.drawImage(
      particle.image,
      particle.x,
      particle.y,
      particle.size,
      particle.size
    )
    ctx.globalAlpha = 1 // Reset alpha for other drawings
  }

  const particlesArray = []

  function initParticles(startX, startY, numberOfParticles, base64Image) {
    const img = new Image()
    img.src = base64Image
    img.onload = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(createParticle(startX, startY, img))
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = particlesArray.length - 1; i >= 0; i--) {
      const particle = particlesArray[i]
      updateParticle(particle)
      drawParticle(particle)
      if (particle.y > canvas.height || particle.opacity === 0) {
        particlesArray.splice(i, 1) // Remove off-screen or fully transparent particles
      }
    }
    animationFrameId = requestAnimationFrame(animate)
  }

  function stopParticles() {
    cancelAnimationFrame(animationFrameId)
  }

  function setCanvasSize(width, height) {
    if (width && height) {
      canvas.width = width
      canvas.height = height
    } else {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
  }

  animate() // Start the animation loop

  return { initParticles, stopParticles, setCanvasSize }
}
