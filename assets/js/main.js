// ========================================
// MAIN JAVASCRIPT
// ========================================

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when a link is clicked
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// Smooth scroll helper
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

// Contact Form Submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const name = contactForm.querySelector(
      'input[placeholder="Your Name"]',
    ).value;
    const email = contactForm.querySelector(
      'input[placeholder="Your Email"]',
    ).value;
    const message = contactForm.querySelector("textarea").value;

    // Log the form data (in production, send to server)
    console.log("Contact Form Submitted:", { name, email, message });

    // Show success message
    alert("Thank you for your message! We will get back to you soon.");

    // Reset form
    contactForm.reset();
  });
}

// Purchase Plan - WHMCS Integration
function purchasePlan(planId) {
  // This function will redirect to WHMCS client area
  // Replace 'yourdomain.com' with your actual domain
  const whmcsUrl = `./client-area.html?plan=${planId}`;
  window.location.href = whmcsUrl;
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all feature cards and service items
document
  .querySelectorAll(".feature-card, .service-item, .pricing-card")
  .forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });

// Game Section color change on click
document.querySelectorAll(".game-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelectorAll(".game-item")
      .forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
  });
});

// Active nav link
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Currency Toggle (optional - for multi-currency support)
function switchCurrency(currency) {
  localStorage.setItem("selectedCurrency", currency);
  location.reload();
}

// Initialize tooltips (optional - requires tooltip library)
function initTooltips() {
  const tooltips = document.querySelectorAll("[data-tooltip]");
  tooltips.forEach((el) => {
    el.addEventListener("mouseover", (e) => {
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = el.getAttribute("data-tooltip");
      document.body.appendChild(tooltip);

      const rect = el.getBoundingClientRect();
      tooltip.style.position = "fixed";
      tooltip.style.top = rect.top - 10 + "px";
      tooltip.style.left = rect.left + "px";
      tooltip.style.background = "#333";
      tooltip.style.color = "#fff";
      tooltip.style.padding = "5px 10px";
      tooltip.style.borderRadius = "3px";
      tooltip.style.zIndex = "10000";
    });

    el.addEventListener("mouseout", () => {
      const tooltip = document.querySelector(".tooltip");
      if (tooltip) tooltip.remove();
    });
  });
}

// Dark mode toggle (optional)
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode"),
  );
}

// Game data for dynamic details card
const gameData = {
  terraria: {
    title: "Terraria",
    description:
      "Build, fight, dig, and explore in the world of Terraria. Our servers provide the perfect environment for your journey with zero lag and high reliability.",
    price: "$2/GB",
    image: "url('assets/images/games/Terraria.png')",
    accent: "#ff6600",
    link: "products/terraria.html",
  },
  minecraft: {
    title: "Minecraft",
    description:
      "Experience the ultimate sandbox adventure with our high-performance Minecraft servers. Support for all versions, mods, and plugins with one-click installation.",
    price: "$1/GB",
    image: "url('assets/images/games/minecraft.jpg')",
    accent: "#00ff1e",
    link: "products/minecraft.html",
  },
  palworld: {
    title: "Palworld",
    description:
      "Catch, build, and survive in the mysterious world of Palworld. Our powerful hardware ensures a smooth multiplayer experience for you and your friends.",
    price: "$2/GB",
    image: "url('assets/images/games/palworld.jpg')",
    accent: "#18c8ff",
    link: "products/palworld.html",
  },
  velheim: {
    title: "Valheim",
    description:
      "A battle-slain warrior, the Valkyries have borne your soul to Valheim, the tenth Norse world. Conquer the wilderness and build your legacy on our stable servers.",
    price: "$2/GB",
    image: "url('assets/images/games/valheim.jpg')",
    accent: "#fcb516",
    link: "products/valheim.html",
  },
  gta: {
    title: "GTA V (FiveM)",
    description:
      "Join the most vibrant roleplay communities or create your own with our FiveM ready servers. Optimized for performance and stability.",
    price: "$2/GB",
    image: "url('assets/images/games/gta.jpg')",
    accent: "#8e44ad",
    link: "products/gta.html",
  },
  ark: {
    title: "ARK Survival",
    description:
      "Stranded on the shores of a mysterious island, you must learn to survive. Tame dinosaurs and conquer the Ark on our high-RAM performance servers.",
    price: "$2/GB",
    image: "url('assets/images/games/ark.jpg')",
    accent: "#00ff1e",
    link: "products/ark.html",
  },
  rust: {
    title: "Rust",
    description:
      "The only goal in Rust is to survive. Overcome struggles such as hunger, thirst and cold. Our DDoS protected servers keep you in the fight 24/7.",
    price: "$2/GB",
    image: "url('assets/images/games/rust.webp')",
    accent: "#e62f22",
    link: "products/rust.html",
  },
};

function showGame(gameId, element) {
  const data = gameData[gameId];
  if (!data) return;

  // Update active state in sidebar
  document
    .querySelectorAll(".game-item")
    .forEach((item) => item.classList.remove("active"));
  element.classList.add("active");

  // Update details card with animation
  const details = document.getElementById("game-details");
  details.style.setProperty("--game-accent", data.accent);
  details.style.opacity = "0";
  details.style.transform = "translateY(10px)";

  setTimeout(() => {
    document.getElementById("game-title").innerText = data.title;
    document.getElementById("game-description").innerText = data.description;
    document.getElementById("game-price").innerText = data.price;
    document.getElementById("game-card-bg").style.backgroundImage = data.image;
    document.querySelector(".btn-order").href = data.link;

    details.style.opacity = "1";
    details.style.transform = "translateY(0)";
  }, 200);
}

// Load saved dark mode preference
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  const activeItem = document.querySelector(".game-item.active");
  if (activeItem) {
    activeItem.style.setProperty(
      "--game-item-active-color",
      activeItem.dataset.color,
    );
  }
});
