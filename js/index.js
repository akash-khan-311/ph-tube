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
    
    <a  onclick="handleCategoryData('${category.category_id}')" class="tab text-xl font-semibold">${category.category}</a>

    
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
  const errorMessage = document.getElementById("error");
  if (category.length === 0) {
    errorMessage.classList.remove("hidden");
  } else {
    errorMessage.classList.add("hidden");
  }
  const mediaCardContainer = document.getElementById("card-container");
  mediaCardContainer.textContent = "";
  category.forEach((media) => {
    console.log(media);
    const card = document.createElement("div");
    card.classList = "card bg-base-100  shadow-xl";
    card.innerHTML = `
   
   
             <figure><img src="${media.thumbnail}" alt="Shoes" /></figure>
  <div class="card-body">
    <div class="flex items-center ">
        <div class="avatar">
            <div class="w-14 rounded-full">
                <img src="${media.authors[0].profile_picture}" />
            </div>
        </div>
        <div class="ml-4">
                 <div>
                 <h3 class="text-xl font-semibold">${media.title}</h3>
        <div class="flex items-center">
            <p class="text-[gray] text-lg ">${media.authors[0].profile_name}
            
             <div class="badge ml-3 w-8 h-8  badge-primary">
                <i class="fa-solid fa-check"></i>
            </div>
            </p>
           
        </div>
        <div>
            <p class="text-[gray]">${media.others.views} views</p>
        </div>
    </div>
        </div>
    </div>
   
   
  </div>
   
   
   `;

    mediaCardContainer.appendChild(card);
  });
};

handleCategoryData("1000");

loadCategories();
