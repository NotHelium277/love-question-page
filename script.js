const heartRain = document.querySelector(".heart-rain");
const actions = document.querySelector("#actions");
const noButton = document.querySelector("#no-button");
const hint = document.querySelector("#no-hint");
const celebration = document.querySelector("#celebration");
const confetti = document.querySelector(".confetti");

// Make a gentle, varied stream of hearts across the background.
const heartSymbols = ["♥", "♡", "💗", "♥", "💕"];
for (let index = 0; index < 30; index += 1) {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = heartSymbols[index % heartSymbols.length];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 20}px`;
  heart.style.animationDuration = `${7 + Math.random() * 10}s`;
  heart.style.animationDelay = `${-Math.random() * 16}s`;
  heart.style.setProperty("--drift", `${Math.random() * 220 - 110}px`);
  heart.style.setProperty("--heart-opacity", `${0.25 + Math.random() * 0.45}`);
  heartRain.append(heart);
}

const playfulMessages = ["Nice try! 😄", "So close! 💞", "Oops, missed me!", "The answer is hiding…", "Not so fast! 😉"];
let messageIndex = 0;

function dodgeNoButton() {
  const area = actions.getBoundingClientRect();
  const button = noButton.getBoundingClientRect();
  const maxX = Math.max(0, area.width - button.width);
  const maxY = 95;
  const x = Math.random() * maxX - maxX / 2;
  const y = (Math.random() * maxY - maxY / 2);

  noButton.style.position = "relative";
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
  hint.textContent = playfulMessages[messageIndex % playfulMessages.length];
  messageIndex += 1;
}

// Dodge on pointer approach, touch, or keyboard focus. The click handler is a final safeguard.
noButton.addEventListener("pointerenter", dodgeNoButton);
noButton.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  dodgeNoButton();
});
noButton.addEventListener("focus", dodgeNoButton);
noButton.addEventListener("click", (event) => {
  event.preventDefault();
  dodgeNoButton();
});

function launchConfetti() {
  confetti.replaceChildren();
  const colors = ["#ff4f83", "#ffc857", "#8c7bff", "#54d6b3", "#ff8a5b", "#ffb8cf"];
  for (let index = 0; index < 90; index += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[index % colors.length];
    piece.style.setProperty("--drift", `${Math.random() * 220 - 110}px`);
    piece.style.setProperty("--duration", `${2 + Math.random() * 2.4}s`);
    piece.style.animationDelay = `${Math.random() * .7}s`;
    confetti.append(piece);
  }
}

document.querySelector("#yes-button").addEventListener("click", () => {
  celebration.classList.add("is-visible");
  celebration.setAttribute("aria-hidden", "false");
  launchConfetti();
  document.querySelector("#again-button").focus();
});

document.querySelector("#again-button").addEventListener("click", () => {
  celebration.classList.remove("is-visible");
  celebration.setAttribute("aria-hidden", "true");
  document.querySelector("#yes-button").focus();
});
