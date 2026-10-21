// অপ্রকাশিত — demo story data. পরে চাইলে এই ডেটা Firebase/অন্য API থেকে আনা যাবে।
let stories = [];

const bookGrid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const readerOverlay = document.getElementById("readerOverlay");
let activeCategory = "সব";

const bnDigits = value => String(value).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("storyCount").textContent = bnDigits(String(stories.length).padStart(2, "0"));

function renderStories() {
  const query = searchInput.value.trim().toLocaleLowerCase("bn");
  const filtered = stories.filter(story => {
    const categoryMatch = activeCategory === "সব" || story.category === activeCategory;
    const searchMatch = [story.title, story.author, story.category, story.subtitle]
      .some(value => value.toLocaleLowerCase("bn").includes(query));
    return categoryMatch && searchMatch;
  });
  bookGrid.innerHTML = filtered.map((story, index) => `
    <article class="book-card" tabindex="0" role="button" aria-label="${escapeHTML(story.title)} গল্পটি পড়ুন" data-story="${escapeHTML(story.id)}">
      <div class="book-cover-wrap">
        <div class="book-cover" style="background:${escapeHTML(story.color)};color:${escapeHTML(story.accent)}">
          <span class="cover-tag">অপ্রকাশিত গল্প</span>
          <span class="cover-number">${bnDigits(String(index + 1).padStart(2, "0"))}</span>
          <span class="cover-moon"></span>
          <strong>${escapeHTML(story.title)}</strong>
          <small>${escapeHTML(story.subtitle)}</small>
        </div>
        <div class="book-overlay">গল্পটি পড়ুন ↗</div>
      </div>
      <div class="book-info">
        <div><h3>${escapeHTML(story.title)}</h3><p>${escapeHTML(story.author)}</p></div>
        <span class="book-category">${escapeHTML(story.category)}</span>
      </div>
      <div class="book-meta"><span>◷ ${escapeHTML(story.readTime)} পাঠ</span><span>✦ ${story.popular ? "জনপ্রিয়" : "নতুন সংগ্রহ"}</span></div>
    </article>`).join("");
  emptyState.classList.toggle("hidden", filtered.length > 0);
  bookGrid.querySelectorAll(".book-card").forEach(card => {
    card.addEventListener("click", () => openReader(card.dataset.story));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openReader(card.dataset.story);
      }
    });
  });
}
function openReader(id) {
  const story = stories.find(item => item.id === id);
  if (!story) return;
  document.getElementById("readerTitle").textContent = story.title;
  document.getElementById("readerMeta").textContent = `${escapeHTML(story.author)}  ·  ${escapeHTML(story.category)}  ·  ${escapeHTML(story.readTime)} পাঠ`;
  document.getElementById("readerCategory").textContent = story.category;
  document.getElementById("readerContent").innerHTML = story.content.split(/\n\n+/).map(paragraph => `<p>${escapeHTML(paragraph)}</p>`).join("");
  readerOverlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  document.getElementById("readerClose").focus();
}
function closeReader() {
  readerOverlay.classList.add("hidden");
  document.body.style.overflow = "";
}
searchInput.addEventListener("input", renderStories);
document.getElementById("categoryFilters").addEventListener("click", event => {
  const chip = event.target.closest("[data-category]");
  if (!chip) return;
  activeCategory = chip.dataset.category;
  document.querySelectorAll(".chip").forEach(item => item.classList.toggle("active", item === chip));
  renderStories();
});
document.querySelectorAll("[data-mood]").forEach(button => button.addEventListener("click", () => {
  activeCategory = button.dataset.mood;
  document.querySelectorAll(".chip").forEach(item => item.classList.toggle("active", item.dataset.category === activeCategory));
  searchInput.value = "";
  renderStories();
  document.getElementById("stories").scrollIntoView({behavior:"smooth"});
}));
document.getElementById("featuredRead").addEventListener("click", () => openReader("last-letter"));
document.getElementById("readerClose").addEventListener("click", closeReader);
document.getElementById("readerBack").addEventListener("click", closeReader);
readerOverlay.addEventListener("click", event => { if (event.target === readerOverlay) closeReader(); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && !readerOverlay.classList.contains("hidden")) closeReader(); });

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const light = document.body.classList.contains("light-theme");
  themeToggle.innerHTML = `${light ? "☾" : "☼"} <span>${light ? "ডার্ক" : "লাইট"}</span>`;
  document.querySelector('meta[name="theme-color"]').content = light ? "#f6f3ee" : "#101014";
});
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));
document.getElementById("showAllLink").addEventListener("click", () => {
  activeCategory = "সব";
  searchInput.value = "";
  document.querySelectorAll(".chip").forEach(item => item.classList.toggle("active", item.dataset.category === "সব"));
  renderStories();
});

async function loadStories() {
  try {
    const response = await fetch("./stories.json", { cache: "no-store" });
    if (!response.ok) throw new Error("stories.json could not be loaded");
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("stories.json must contain an array");
    stories = data.filter(item => item && item.id && item.title && item.content);
    document.getElementById("storyCount").textContent = bnDigits(String(stories.length).padStart(2, "0"));
    renderStories();
  } catch (error) {
    console.error(error);
    bookGrid.innerHTML = "";
    emptyState.textContent = "গল্প লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করো।";
    emptyState.classList.remove("hidden");
  }
}

loadStories();
