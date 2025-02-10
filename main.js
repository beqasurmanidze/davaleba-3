// 1)
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const logMousePosition = debounce((event) => {
  console.log(`Mouse stopped at: X=${event.clientX}, Y=${event.clientY}`);
}, 500);

document.addEventListener("mousemove", logMousePosition);

// 2)
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    const parsedData = data.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    }));
    console.log(parsedData);
  });

// 3)
const input = document.createElement("input");
input.type = "text";
input.placeholder = "Search for products...";
document.body.appendChild(input);

const searchProducts = debounce((query) => {
  fetch(`https://dummyjson.com/products/search?q=${query}`)
    .then((response) => response.json())
    .then((data) => console.log(data.products));
}, 500);

input.addEventListener("input", (event) => {
  const query = event.target.value;
  if (query) {
    searchProducts(query);
  }
});
