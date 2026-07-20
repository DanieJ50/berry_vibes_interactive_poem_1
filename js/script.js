const recipes = [
  {
    name: "Cinnamon Roll",
    vibe: "fluffy, cozy, swirled, bakery-style",
    poem: "cinnamon spirals like a tiny soft universe",
    stats: ["Comfort: 10", "Drama: 8", "Cozy Power: 10"]
  },
  {
    name: "Pumpkin Donut",
    vibe: "soft, sweet, pumpkin-bright, microwave magic",
    poem: "pumpkin turns the microwave into a little bakery moon",
    stats: ["Comfort: 9", "Drama: 7", "Cozy Power: 9"]
  },
  {
    name: "Buttermilk Hotcakes",
    vibe: "golden, fluffy, diner-style, sweet breakfast energy",
    poem: "hotcakes rise like tiny suns on a sleepy plate",
    stats: ["Comfort: 10", "Drama: 6", "Cozy Power: 9"]
  },
  {
    name: "Chili Mocha",
    vibe: "warm, chocolatey, spicy, main-character coffee",
    poem: "mocha sparks like chocolate thunder in a pink cup",
    stats: ["Comfort: 8", "Drama: 10", "Cozy Power: 8"]
  },
  {
    name: "Yogurt Ice Cream Bowl",
    vibe: "cold, creamy, sweet, snack-dessert hybrid",
    poem: "a spoon carves clouds from a frozen berry dream",
    stats: ["Comfort: 8", "Drama: 7", "Cozy Power: 8"]
  },
  {
    name: "French Toast",
    vibe: "custardy, cinnamonny, golden, brunch royalty",
    poem: "toast wears cinnamon like glitter under morning light",
    stats: ["Comfort: 10", "Drama: 9", "Cozy Power: 10"]
  }
];

const leftSelect = document.querySelector("#leftRecipe");
const rightSelect = document.querySelector("#rightRecipe");

const leftName = document.querySelector("#leftName");
const rightName = document.querySelector("#rightName");
const leftScore = document.querySelector("#leftScore");
const rightScore = document.querySelector("#rightScore");

const leftCard = document.querySelector("#leftCard");
const rightCard = document.querySelector("#rightCard");

const poemPanel = document.querySelector(".poem-panel");
const poemLineOne = document.querySelector("#poemLineOne");
const poemLineTwo = document.querySelector("#poemLineTwo");
const poemLineThree = document.querySelector("#poemLineThree");
const poemLineFour = document.querySelector("#poemLineFour");
const winnerBanner = document.querySelector("#winnerBanner");

const battleButton = document.querySelector("#battleButton");
const shuffleButton = document.querySelector("#shuffleButton");
const resetButton = document.querySelector("#resetButton");

function fillSelects() {
  recipes.forEach((recipe, index) => {
    const leftOption = document.createElement("option");
    leftOption.value = index;
    leftOption.textContent = recipe.name;
    leftSelect.appendChild(leftOption);

    const rightOption = document.createElement("option");
    rightOption.value = index;
    rightOption.textContent = recipe.name;
    rightSelect.appendChild(rightOption);
  });

  rightSelect.value = 1;
}

function randomScore() {
  return Math.floor(Math.random() * 6) + 5;
}

function updateCard(card, recipe) {
  card.querySelector("h3").textContent = recipe.name;
  card.querySelector(".tagline").textContent = recipe.vibe;

  const list = card.querySelector("ul");
  list.innerHTML = "";

  recipe.stats.forEach((stat) => {
    const item = document.createElement("li");
    item.textContent = stat;
    list.appendChild(item);
  });
}

function battle() {
  const leftRecipe = recipes[leftSelect.value];
  const rightRecipe = recipes[rightSelect.value];

  const leftPoints = randomScore();
  const rightPoints = randomScore();

  leftName.textContent = leftRecipe.name;
  rightName.textContent = rightRecipe.name;

  leftScore.textContent = leftPoints + " points";
  rightScore.textContent = rightPoints + " points";

  updateCard(leftCard, leftRecipe);
  updateCard(rightCard, rightRecipe);

  leftCard.classList.remove("bounce");
  rightCard.classList.remove("bounce");
  poemPanel.classList.remove("explode");

  setTimeout(() => {
    leftCard.classList.add("bounce");
    rightCard.classList.add("bounce");
    poemPanel.classList.add("explode");
  }, 50);

  if (leftPoints > rightPoints) {
    winnerBanner.textContent = leftRecipe.name + " wins the Berry Crown 👑";
  } else if (rightPoints > leftPoints) {
    winnerBanner.textContent = rightRecipe.name + " wins the Berry Crown 👑";
  } else {
    winnerBanner.textContent = "It is a cozy tie. BerryBelle approves 🍓";
  }

  poemLineOne.textContent = "BerryBelle taps the screen.";
  poemLineTwo.textContent = leftRecipe.poem + ".";
  poemLineThree.textContent = rightRecipe.poem + ".";
  poemLineFour.textContent = "The craving does not wait. It becomes a clickable poem.";
}

function shuffleFighters() {
  const leftIndex = Math.floor(Math.random() * recipes.length);
  let rightIndex = Math.floor(Math.random() * recipes.length);

  while (rightIndex === leftIndex) {
    rightIndex = Math.floor(Math.random() * recipes.length);
  }

  leftSelect.value = leftIndex;
  rightSelect.value = rightIndex;
  battle();
}

function resetPoem() {
  leftSelect.value = 0;
  rightSelect.value = 1;

  leftName.textContent = "Recipe One";
  rightName.textContent = "Recipe Two";
  leftScore.textContent = "0 points";
  rightScore.textContent = "0 points";

  leftCard.classList.remove("bounce");
  rightCard.classList.remove("bounce");
  poemPanel.classList.remove("explode");

  leftCard.querySelector("h3").textContent = "Choose a recipe";
  rightCard.querySelector("h3").textContent = "Choose a recipe";
  leftCard.querySelector(".tagline").textContent = "Waiting for BerryBelle...";
  rightCard.querySelector(".tagline").textContent = "Waiting for BerryBelle...";
  leftCard.querySelector("ul").innerHTML = "";
  rightCard.querySelector("ul").innerHTML = "";

  poemLineOne.textContent = "A soft kitchen screen glows pink.";
  poemLineTwo.textContent = "Two recipes step into the light.";
  poemLineThree.textContent = "One craving becomes a story.";
  poemLineFour.textContent = "One click becomes a bite.";

  winnerBanner.textContent = "Tap Start Battle to begin.";
}

battleButton.addEventListener("click", battle);
shuffleButton.addEventListener("click", shuffleFighters);
resetButton.addEventListener("click", resetPoem);

fillSelects();
resetPoem();
