const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const categories = data.data;

  const tabContainer = document.getElementById("tab-container");
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    
    <a onclick="handleCategoryData('${category.category_id}')" class="tab">${category.category}</a>

    
    `;
    tabContainer.appendChild(div);
  });
};

const handleCategoryData = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const category = data.data;
  console.log(category);
};

loadCategories();
