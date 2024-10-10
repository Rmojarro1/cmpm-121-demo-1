import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Raul's Game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button: HTMLButtonElement = document.createElement("button");
button.textContent = "🍆";
document.body.appendChild(button);

const upgradeButton: HTMLButtonElement = document.createElement("button");
upgradeButton.textContent = "Auto clicker = 10 🍆 ";
upgradeButton.disabled = true;
document.body.appendChild(upgradeButton);

let buttonCounter: number = 0;
let upgrades: number = 0;

function updateCounter(
  count: number,
  value: number,
  button: HTMLButtonElement,
): number {
  count += value;
  button.textContent = "🍆 clicked " + count.toFixed(2) + " times\n";
  upgradeButton.disabled = !canUpgrade(buttonCounter);
  return count;
}

function canUpgrade(count: number): boolean {
  return count >= 10;
}

let startTime: number = performance.now();

function frameUpdate(): void { 
  if (upgrades > 0) {
    console.log("Before calculation: "+ buttonCounter);
    const currentTime = performance.now(); 
    const elaspedTime = (currentTime - startTime)/1000;
    const increment = upgrades * elaspedTime; 
    buttonCounter = updateCounter(
      buttonCounter,
      increment,
      button,
    );
    console.log(buttonCounter);
    startTime = currentTime;
    upgradeButton.disabled = !canUpgrade(buttonCounter);
    requestAnimationFrame(frameUpdate);
  }
}

button.addEventListener("click", () => {
  buttonCounter = updateCounter(buttonCounter, 1, button);
  upgradeButton.disabled = !canUpgrade(buttonCounter);
});

upgradeButton.addEventListener("click", () => {
  if (buttonCounter >= 10) {
    buttonCounter = updateCounter(buttonCounter, -10, button);
    upgrades++;
    console.log("Upgrades: " + upgrades);
    console.log("New count: " + buttonCounter);
    upgradeButton.disabled = !canUpgrade(buttonCounter);
    if (upgrades === 1) {
      startTime = performance.now();
      requestAnimationFrame(frameUpdate);
    }
  }
});

requestAnimationFrame(frameUpdate);
