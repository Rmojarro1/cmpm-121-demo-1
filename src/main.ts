import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Raul's Game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button: HTMLButtonElement = document.createElement("button");
button.textContent = "🍆";
app.appendChild(button);
//document.body.appendChild(button);

const upgradeButtonA: HTMLButtonElement = document.createElement("button");
upgradeButtonA.textContent = "UpgradeA = 10 🍆 ";
upgradeButtonA.disabled = true;
app.appendChild(upgradeButtonA);

const upgradeButtonB: HTMLButtonElement = document.createElement("button");
upgradeButtonB.textContent = "UpgradeB = 100 🍆 ";
upgradeButtonB.disabled = true;
app.appendChild(upgradeButtonB);

const upgradeButtonC: HTMLButtonElement = document.createElement("button");
upgradeButtonC.textContent = "UpgradeC = 1000 🍆 ";
upgradeButtonC.disabled = true;
app.appendChild(upgradeButtonC);

let counter: number = 0;
let upgradeA: number = 0;
let upgradeB: number = 0;
let upgradeC: number = 0;

let priceA = 10;
let priceB = 100;
let priceC = 1000;

const playerCount = document.createElement("total"); 
playerCount.textContent = ("You have " + counter+ "🍆s"); 
document.body.appendChild(playerCount); 


const growthRate = document.createElement("gr");
growthRate.textContent =
  "Current growth rate: " + (0.1 * upgradeA + 2 * upgradeB);
app.appendChild(growthRate);

const upgradeAText = document.createElement("upA");
upgradeAText.textContent = "UpgradeA: " + upgradeA;
app.appendChild(upgradeAText);

const upgradeBText = document.createElement("upB");
upgradeBText.textContent = "UpgradeB: " + upgradeB;
app.appendChild(upgradeBText);

const upgradeCText = document.createElement("upC");
upgradeCText.textContent = "UpgradeC: " + upgradeC;
app.appendChild(upgradeCText);

function updateCounter(
  count: number,
  value: number,
  button: HTMLElement,
): number {
  count += value;
  button.textContent = "You have " + count.toFixed(2) + "🍆s ";
  updateButtons();
  return count;
}

function updatePrice(price: number): number {
  return price * 1.15;
}

/*function updateUpgrade(upgrade: number, price: number): void {

}*/

function updateButtons(): void {
  upgradeButtonA.disabled = !hasUpgradeA(counter);
  upgradeButtonB.disabled = !hasUpgradeB(counter);
  upgradeButtonC.disabled = !hasUpgradeC(counter);
  upgradeButtonA.textContent = "UpgradeA = " + priceA.toFixed(2) + " 🍆 ";
  upgradeButtonB.textContent = "UpgradeB = " + priceB.toFixed(2) + " 🍆 ";
  upgradeButtonC.textContent = "UpgradeC = " + priceC.toFixed(2) + " 🍆 ";
}

function hasUpgradeA(count: number): boolean {
  return count >= priceA;
}

function hasUpgradeB(count: number): boolean {
  return count >= priceB;
}

function hasUpgradeC(count: number): boolean {
  return count >= priceC;
}

function updateText(): void {
  growthRate.textContent =
    "Current growth rate: " +
    (0.1 * upgradeA + 2 * upgradeB + 50 * upgradeC).toFixed(2);
  upgradeAText.textContent = "UpgradeA: " + upgradeA;
  upgradeBText.textContent = "UpgradeB: " + upgradeB;
  upgradeCText.textContent = "UpgradeC: " + upgradeC;
}

let startTime: number = performance.now();

function frameUpdate(): void {
  if (upgradeA > 0 || upgradeB > 0 || upgradeC > 0) {
    const currentTime = performance.now();
    const elapsedTime = (currentTime - startTime) / 1000;

    if (upgradeA > 0) {
      const incrementA = upgradeA * 0.1 * elapsedTime;
      counter = updateCounter(counter, incrementA, playerCount);
    }

    if (upgradeB > 0) {
      const incrementB = upgradeB * 2 * elapsedTime;
      counter = updateCounter(counter, incrementB, playerCount);
    }

    if (upgradeC > 0) {
      const incrementC = upgradeC * 50 * elapsedTime;
      counter = updateCounter(counter, incrementC, playerCount);
    }
    console.log(counter);
    startTime = currentTime;
    updateButtons();
    requestAnimationFrame(frameUpdate);
  }
}

button.addEventListener("click", () => {
  counter = updateCounter(counter, 1, playerCount);
  updateButtons();
});

upgradeButtonA.addEventListener("click", () => {
  if (counter >= priceA) {
    counter = updateCounter(counter, -10, playerCount);
    upgradeA++;
    priceA = updatePrice(priceA);
    updateText();
    updateButtons();
    if (upgradeA === 1) {
      startTime = performance.now();
      requestAnimationFrame(frameUpdate);
    }
  }
});

upgradeButtonB.addEventListener("click", () => {
  if (counter >= priceB) {
    counter = updateCounter(counter, -100, playerCount);
    upgradeB++;
    priceB = updatePrice(priceB);
    updateText();
    updateButtons();
    if (upgradeB === 1) {
      startTime = performance.now();
      requestAnimationFrame(frameUpdate);
    }
  }
});

upgradeButtonC.addEventListener("click", () => {
  if (counter >= priceC) {
    counter = updateCounter(counter, -1000, playerCount);
    upgradeC++;
    priceC = updatePrice(priceC);
    updateText();
    updateButtons();
    if (upgradeC === 1) {
      startTime = performance.now();
      requestAnimationFrame(frameUpdate);
    }
  }
});

requestAnimationFrame(frameUpdate);
