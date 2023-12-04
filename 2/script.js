document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("plasmaCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.angleX = Math.random() * 2 * Math.PI; // Randomize initial angles for turbulence
      this.angleY = Math.random() * 2 * Math.PI;
      this.initialX = x;
      this.initialY = y;
      this.elasticity = 0.03 + Math.random() * 0.07;
    }

    update() {
      this.x += this.speedX + Math.sin(this.angleX);
      this.y += this.speedY + Math.sin(this.angleY);
      //this.angleX += 0.002; // Create wave-like motion on X axis
      //this.angleY += 0.002; // Create wave-like motion on Y axis
      this.speedX *= -0.8;
      this.speedY *= -0.8;
      if (this.size > 0.2) this.size -= 0.05;
      // Elastic movement towards the initial position
      //const dx = (this.initialX - this.x) * this.elasticity;
      //const dy = (this.initialY - this.y) * this.elasticity;
      //this.speedX += dx;
      //this.speedY += dy;

      // Apply acceleration
      this.speedX *= 1.2;
      this.speedY *= 1.2;
    }

    draw() {
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.size
      );
      gradient.addColorStop(0, `hsla(${Math.random() * 360}, 100%, 50%, 1)`);
      gradient.addColorStop(1, `hsla(${Math.random() * 360}, 100%, 50%, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      //ctx.fillStyle = `hsla(${Math.random() * 360}, 100%, 50%, 0.8)`;
      //ctx.beginPath();
      //ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      //ctx.fill();
    }
  }

  const handleParticles = () => {
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Apply gravity for a more natural fall-off effect
      particles[i].speedY += 0;

      if (
        particles[i].size <= 0.2 ||
        particles[i].x < 0 ||
        particles[i].x > canvas.width ||
        particles[i].y > canvas.height
      ) {
        particles.splice(i, 1);
        i--;
      }
    }
    //for (let i = 0; i < particles.length; i++) {
    //  particles[i].update();
    //  particles[i].draw();
    //
    //  if (particles[i].size <= 0.2) {
    //    particles.splice(i, 1);
    //    i--;
    //  }
    //}
  };

  let lastX, lastY, lastTime;
  document.addEventListener("mousemove", (e) => {
    const currentTime = Date.now();
    if (lastTime) {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const timeDiff = currentTime - lastTime;
      const speed = distance / timeDiff;

      for (let i = 0; i < 5; i++) {
        const particle = new Particle(e.clientX, e.clientY);
        particle.speedX += (dx / timeDiff) * 20; // Apply cursor velocity to particle
        particle.speedY += (dy / timeDiff) * 20;
        particles.push(particle);
      }
    }
    lastX = e.clientX;
    lastY = e.clientY;
    lastTime = currentTime;
    //const currentTime = Date.now();
    //if (lastTime) {
    //  const dx = e.clientX - lastX;
    //  const dy = e.clientY - lastY;
    //  const distance = Math.sqrt(dx * dx + dy * dy);
    //  const timeDiff = currentTime - lastTime;
    //  const speed = distance / timeDiff;
    //
    //  // Adjust particle creation rate based on speed
    //  const rate = Math.min(Math.max(5, speed / 2), 20);
    //
    //  for (let i = 0; i < rate; i++) {
    //    particles.push(new Particle(e.clientX, e.clientY));
    //  }
    //}
    //lastX = e.clientX;
    //lastY = e.clientY;
    //lastTime = currentTime;
  });

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();

    // Optimization: remove particles that are out of view
    particles = particles.filter((particle) => {
      return (
        particle.x > 0 &&
        particle.x < canvas.width &&
        particle.y > 0 &&
        particle.y < canvas.height
      );
    });

    requestAnimationFrame(animate);
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //handleParticles();
    //requestAnimationFrame(animate);
  };

  animate();
});
