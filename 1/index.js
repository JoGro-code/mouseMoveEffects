document.addEventListener("DOMContentLoaded", () => {
  const clumpSize = 100; // Number of clumps
  const clumps = [];

  for (let i = 0; i < clumpSize; i++) {
    createClump();
  }

  function createClump() {
    let clump = document.createElement("div");
    clump.className = "clump";
    document.body.appendChild(clump);
    clumps.push(clump);
  }

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    clumps.forEach((clump) => {
      const offsetX = Math.random() * 100 - 50;
      const offsetY = Math.random() * 100 - 50;

      const clumpX = mouseX + offsetX;
      const clumpY = mouseY + offsetY;

      clump.style.transform = `translate(${clumpX}px, ${clumpY}px) scale(2)`;
      clump.style.opacity = "1";
    });
  });

  document.addEventListener("mouseleave", () => {
    clumps.forEach((clump) => {
      clump.style.opacity = "0";
    });
  });
});
