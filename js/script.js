const API_KEY = "rWM8PzctyCWi6NH1y9dMz73U6K9dqcYKS4xOjdth";

const startInput = document.getElementById("startDate");
const endInput = document.getElementById("endDate");
const button = document.querySelector("button");
const gallery = document.getElementById("gallery");

setupDateInputs(startInput, endInput);

const spaceFacts = [
  "One million Earths could fit inside the Sun.",
  "A day on Venus is longer than a year on Venus.",
  "Neutron stars can spin hundreds of times per second.",
  "The footprints on the Moon may last for millions of years.",
  "Jupiter has more than 90 moons."
];

const factBox = document.createElement("div");
factBox.className = "fact-box";
factBox.textContent =
  "Did You Know? " + spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
document.querySelector(".container").insertBefore(factBox, document.querySelector(".filters"));

button.addEventListener("click", getSpaceImages);

async function getSpaceImages() {
  const startDate = startInput.value;
  const endDate = endInput.value;

  gallery.innerHTML = `<p class="loading">🔄 Loading space photos...</p>`;

  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    gallery.innerHTML = "";

    data.slice(0, 9).forEach((item) => {
      const card = document.createElement("div");
      card.className = "gallery-item";

      if (item.media_type === "image") {
        card.innerHTML = `
          <img src="${item.url}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p>${item.date}</p>
        `;
      } else {
        card.innerHTML = `
          <div class="video-card">▶ NASA Video</div>
          <h3>${item.title}</h3>
          <p>${item.date}</p>
          <a href="${item.url}" target="_blank">Watch Video</a>
        `;
      }

      card.addEventListener("click", () => openModal(item));
      gallery.appendChild(card);
    });
  } catch (error) {
    gallery.innerHTML = `<p class="loading">Something went wrong. Please try again.</p>`;
  }
}

function openModal(item) {
  const modal = document.createElement("div");
  modal.className = "modal";

  let mediaContent = "";

  if (item.media_type === "image") {
    mediaContent = `<img src="${item.url}" alt="${item.title}">`;
  } else {
    mediaContent = `<a href="${item.url}" target="_blank" class="video-link">Watch NASA Video</a>`;
  }

  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-btn">X</button>
      ${mediaContent}
      <h2>${item.title}</h2>
      <p><strong>${item.date}</strong></p>
      <p>${item.explanation}</p>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".close-btn").addEventListener("click", () => {
    modal.remove();
  });
}