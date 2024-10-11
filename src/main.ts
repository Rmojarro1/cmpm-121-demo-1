import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Raul's Game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string
}

const availableItems: Item[] = [
  { name: "Part-timer", cost: 10, rate: 0.1, description: "Because getting someone to do this full-time is too hard." },
  { name: "Friendly Neighbor", cost: 100, rate: 2, description: "Just one more row, Susan. I promise." },
  { name: "Harvesting Robot", cost: 1000, rate: 50, description: "Robots can't complain about working in the sun." },
  { name: "Eggplant-shaped UFO", cost: 10000, rate: 100, description: "Warning, may occassionally pick up a stray cow."},
  { name: "Eggplant Ray", cost: 100000, rate: 2000, description: "Just zap whatever you see, it'll become an eggplant. Don't worry about the ethics of it."}
];

let counter: number = 0;
// eslint-disable-next-line prefer-const
let upgrades: number[] = Array(availableItems.length).fill(0);
// eslint-disable-next-line prefer-const
let prices: number[] = availableItems.map((item) => item.cost);
let startTime: number = performance.now();

const playerCount = document.createElement("div");
playerCount.textContent = `${counter} 🍆s harvested`;
document.body.appendChild(playerCount);

const growthRate = document.createElement("div");
growthRate.textContent = "Current harvest rate: 0";
app.appendChild(growthRate);

const buttons: HTMLButtonElement[] = availableItems.map((item, index) => {
  const button = document.createElement("button");
  button.textContent = `${item.name} = ${item.cost} 🍆`;
  button.title = item.description; 
  button.disabled = true;
  app.appendChild(button);
  button.addEventListener("click", () => {
    if (counter >= prices[index]) {
      counter = updateCounter(counter, -item.cost, playerCount);
      upgrades[index]++;
      prices[index] = updatePrice(prices[index]);
      updateText();
      updateButtons();
      if (upgrades[index] === 1) {
        startTime = performance.now();
        requestAnimationFrame(frameUpdate);
      }
    }
  });
  return button;
});

function updateCounter(
  counter: number,
  value: number,
  playerCount: HTMLElement,
): number {
  counter += value;
  playerCount.textContent = `You have ${counter.toFixed(2)} 🍆s`;
  return counter;
}

function updatePrice(price: number): number {
  return price * 1.15;
}

function updateButtons(): void {
  buttons.forEach((button, index) => {
    button.disabled = counter < prices[index];
    button.textContent = `${availableItems[index].name} = ${prices[index].toFixed(2)} 🍆`;
  });
}

function updateText(): void {
  const totalRate = upgrades.reduce(
    (sum, upgradeCount, index) =>
      sum + upgradeCount * availableItems[index].rate,
    0,
  );
  growthRate.textContent = `Current harvest rate: ${totalRate.toFixed(2)}`;
}

function frameUpdate(): void {
  if (upgrades.some((upgrade) => upgrade > 0)) {
    const currentTime = performance.now();
    const elapsedTime = (currentTime - startTime) / 1000;

    upgrades.forEach((upgradeCount, index) => {
      if (upgradeCount > 0) {
        const increment =
          upgradeCount * availableItems[index].rate * elapsedTime;
        counter = updateCounter(counter, increment, playerCount);
      }
    });

    startTime = currentTime;
    requestAnimationFrame(frameUpdate);
    updateButtons();
  }
}

const button = document.createElement("button");
button.textContent = "🍆";
app.appendChild(button);

button.addEventListener("click", () => {
  counter = updateCounter(counter, 1, playerCount);
  updateButtons();
});

requestAnimationFrame(frameUpdate);
