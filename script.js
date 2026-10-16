// Select elements
const langToggle = document.getElementById("langToggle");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");

const heroTitle = document.getElementById("heroTitle");
const heroDesc = document.getElementById("heroDesc");
const tipsTitle = document.getElementById("tipsTitle");
const tipsSub = document.getElementById("tipsSub");

const categoryCards = document.querySelectorAll(".card");
const tipCards = document.querySelectorAll(".tip");

// Language data
let isPidgin = false;

const englishContent = {
  heroTitle: "Your Health In Language You Understand",
  heroDesc: "Clear, simple health information explained in English & Pidgin. Trusted, easy to understand, for everyone in Nigeria.",
  tipsTitle: "Featured Health Tips",
  tipsSub: "Trusted tips to stay healthy and safe",
  button: "EN | Pidgin",
  placeholder: "Search for symptoms, rights, first aid..."
};

const pidginContent = {
  heroTitle: "Your Health For Language Wey You Understand",
  heroDesc: "Clear health information wey dem explain for English & Pidgin. Na true talk, easy to understand, for everybody for Nigeria.",
  tipsTitle: "Health Tips Wey Important",
  tipsSub: "Correct tips to make you dey healthy and safe",
  button: "Pidgin | EN",
  placeholder: "Find sickness, your rights, first aid..."
};

// 1. Handle Language Toggle
langToggle.addEventListener("click", function() {
  isPidgin = !isPidgin;

  if (isPidgin) {
    heroTitle.textContent = pidginContent.heroTitle;
    heroDesc.textContent = pidginContent.heroDesc;
    tipsTitle.textContent = pidginContent.tipsTitle;
    tipsSub.textContent = pidginContent.tipsSub;
    langToggle.textContent = pidginContent.button;
    searchInput.placeholder = pidginContent.placeholder;
    message.textContent = "You don switch to Pidgin!";
  } else {
    heroTitle.textContent = englishContent.heroTitle;
    heroDesc.textContent = englishContent.heroDesc;
    tipsTitle.textContent = englishContent.tipsTitle;
    tipsSub.textContent = englishContent.tipsSub;
    langToggle.textContent = englishContent.button;
    searchInput.placeholder = englishContent.placeholder;
    message.textContent = "Switched back to English!";
  }
  message.style.color = "#fff";
});

// 2. Handle Search - prevent reload
function filterContent() {
  const searchValue = searchInput.value.trim().toLowerCase();

  if (searchValue === "") {
    categoryCards.forEach(card => card.style.display = "block");
    tipCards.forEach(tip => tip.style.display = "block");
    message.textContent = "";
    return;
  }

  let found = 0;

  // Filter category cards
  categoryCards.forEach(card => {
    const dataName = card.getAttribute("data-name");
    if (dataName.includes(searchValue)) {
      card.style.display = "block";
      found++;
    } else {
      card.style.display = "none";
    }
  });

  // Filter tip cards
  tipCards.forEach(tip => {
    const dataName = tip.getAttribute("data-name");
    if (dataName.includes(searchValue)) {
      tip.style.display = "block";
      found++;
    } else {
      tip.style.display = "none";
    }
  });

  // Validation message
  if (found === 0) {
    message.textContent = `No result for "${searchValue}" - try malaria, water, rights`;
    message.style.color = "#f87171";
  } else {
    message.textContent = `${found} result(s) found for "${searchValue}"`;
    message.style.color = "#fff";
  }
}

searchBtn.addEventListener("click", function(event) {
  event.preventDefault();
  filterContent();
});

// Allow Enter key
searchInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    filterContent();
  } else if (searchInput.value === "") {
    filterContent();
  }
});

// 3. Handle Learn More clicks using DOM
const allLinks = document.querySelectorAll(".card a");

allLinks.forEach(link => {
  link.addEventListener("click", function(event) {
    event.preventDefault();
    const cardTitle = this.parentElement.querySelector("h3").textContent;
    message.textContent = `You clicked: ${cardTitle} - details page coming soon!`;
    message.style.color = "#fff";
  });
});