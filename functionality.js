let coffeeData;
let container;

let createNewMainContainer = () => {
  document.getElementById("main").remove();
  container = document.createElement("div");
  container.id = "main";
};

let createCards = (data) => {
  createNewMainContainer();

  for (let i = 0; i < data.length; i++) {
    if (data[i].title && data[i].title != "test 1") {
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      const ingredients = data[i].ingredients ? data[i].ingredients.join(", ") : " ";
      card.innerHTML = `
            <h3>${data[i].title}</h3>
            <div class="cardImg" style="background-image: url('${data[i].image}');"></div>
            <p class="cardDescription">${data[i].description}</p>
            <p class="cardIngredients"><b>Ingredients:</b> ${ingredients}</p>
    `;
      container.appendChild(card);
    }
  }
  document.body.appendChild(container);
};

let showErrorMessage = () => {
  createNewMainContainer();
  container.innerHTML = "<h2>Something went wrong! Try again later...</h2>";
  document.body.appendChild(container);
}

let clickHandler = (type) => {
  fetch(`https://api.sampleapis.com/coffee/${type}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      coffeeData = data;
      createCards(coffeeData);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      showErrorMessage();
    });
};

document.addEventListener("DOMContentLoaded", () => {
  const coffeeTypes = document.getElementsByTagName("li");
  for (const coffeeType of coffeeTypes) {
    const type = coffeeType.getAttribute("id");
    coffeeType.addEventListener("click", () => {
      clickHandler(type);
    });
  }
});
