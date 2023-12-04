document.addEventListener("DOMContentLoaded", () => {
  const colors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#9400D3",
  ];
  let colorIndex = 0;

  document.addEventListener("mousemove", (e) => {
    let dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = e.pageX - 10 + "px"; // Center the dot around the cursor
    dot.style.top = e.pageY - 10 + "px";
    dot.style.boxShadow = `0 0 10px 5px ${colors[colorIndex]}`; // Colorful blur

    document.body.appendChild(dot);
    colorIndex = (colorIndex + 1) % colors.length;

    setTimeout(() => {
      dot.style.transform = "scale(1.5)"; // Enlarge and fade out
      dot.style.opacity = "0";
    }, 100);

    setTimeout(() => {
      // Remove the dot
      dot.remove();
    }, 900);
  });
});
