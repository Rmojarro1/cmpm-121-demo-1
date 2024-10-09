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

let buttonCounter: number = 0;

function updateCounter(count: number, button: HTMLButtonElement): number {
  count++;
  button.textContent = "🍆 clicked " + count + " times\n";
  return count;
}

button.addEventListener("click", () => {
  buttonCounter = updateCounter(buttonCounter, button);
});

setInterval(() => {
  buttonCounter = updateCounter(buttonCounter, button);
}, 1000);
