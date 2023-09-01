// Load Categories From API
const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const categories = data.data;
  // Set Categories in the Tab
  const tabContainer = document.getElementById("tab-container");
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    
    <a id="" onclick="handleCategoryData('${category.category_id}')" class="tab  hover:bg-violet-600 hover:text-white focus:bg-bg-violet-500  active:bg-violet-600 text-xl font-semibold">${category.category}</a>

    
    `;
    tabContainer.appendChild(div);
  });
};
// an Empty Array Declarations
const newData = [];
// Views Convert to the number
function parseViewStringToNumber(views) {
  const numericPart = parseFloat(views);
  if (views.includes("k")) {
    return numericPart * 1000;
  }
  return numericPart;
}

// Add Event Listiner On Sort By Views Button
document.getElementById("sort-btn").addEventListener("click", () => {
  // Get the sort result from main data
  newData.sort(
    (a, b) =>
      parseViewStringToNumber(a.others.views) -
      parseViewStringToNumber(b.others.views)
  );
  // Pass Sorted data to displayAllData
  displayAllData(newData);
});

// Load Data from category
const handleCategoryData = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const category = data.data;
  // Clean Previous Data from Ui after clicking on Sort By Views Button
  newData.length = 0;
  // Push New Data and Copy api data and then push new data
  newData.push(...category);
  //All data provide by perameter to displayAllData
  displayAllData(newData);
};

// Display All card data of Category
const displayAllData = (category) => {
  const errorMessage = document.getElementById("error");
  // Check Error Message
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
    card.classList = "card card-bg  shadow-xl";
    card.innerHTML = `
   
   
             <figure class="h-40 "><img class="w-full" src="${
               media.thumbnail
             }" alt="Shoes" /></figure>
  <div class="card-body">
    <div class="flex items-center ">
        <div class="avatar">
            <div class="w-10 rounded-full">
                <img src="${media.authors[0].profile_picture}" />
            </div>
        </div>
        <div class="ml-4">
                 <div>
                 <h3 class="text-lg font-semibold">${media.title}</h3>
        <div class="flex items-center">
            <p class="text-[gray] text-lg ">${media.authors[0].profile_name}
            
            <div class="ml-3 w-6">
                ${
                  media.authors[0].verified
                    ? '<img id="verify" src="../images/verifyed-icon.png" alt="Verified" />'
                    : ""
                }
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
