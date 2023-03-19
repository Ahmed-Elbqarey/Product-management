//////////////////////////////////////// crete variables ////////////////////////////////////

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let quantity = document.getElementById("quantity");
let submit = document.getElementById("submit");
let mode = "create";
let global;
let products = [];
//////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// count total of products price ////////////////////////////
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#008000b1";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#bf2a2a";
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////// the main button of the project ////////////////////////////////
submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
    quantity: quantity.value,
  };
  if (
    title.value != "" &&
    category.value != "" &&
    price.value != "" &&
    count.value < 101
  ) {
    if (mode === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          products.push(newProduct);
        }
      } else {
        products.push(newProduct);
      }
    } else {
      products[global] = newProduct;
      mode = "create";
      submit.innerHTML = "انشاء";
      count.style.display = "block";
    }
    clearData();
  }

  showData();
  getTotal();
};
////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// to reset  value //////////////////////////////////
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "";
  quantity.value = "";
}
///////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////// to show data in table /////////////////////////////
function showData() {
  let table = "";
  for (let i = 0; i < products.length; i++) {
    table += `
  <tr>
  <td>${i + 1}</td>
  <td>${products[i].title}</td>
  <td>${products[i].price}</td>
  <td>${products[i].taxes}</td>
  <td>${products[i].ads}</td> 
  <td>${products[i].discount}</td>
  <td>${products[i].category}</td>
  <td>${products[i].quantity}</td>
  <td><button onclick="updateData(${i})">تحديث</button></td>
  <td><button onclick="deleteData(${i})">حذف</button></td>
</tr>
`;
  }
  document.getElementById("tbody").innerHTML = table;

  if (products.length > 0) {
    document.getElementById("reset-value").innerHTML = `
    <button onclick=deleteALl()>حذف جميع المنتجات (${products.length})</button>
      `;
  } else {
    document.getElementById("reset-value").innerHTML = "";
  }
}
///////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// to delete one product ////////////////////////////
function deleteData(i) {
  products.splice(i, 1);
  showData();
}
///////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// to delete all products //////////////////////////

function deleteALl() {
  products.splice(0);
  showData();
}
///////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// to update product ///////////////////////////////
function updateData(i) {
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  category.value = products[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "تحديث";
  mode = "update";
  global = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// to set search mode ///////////////////////////////
let searchMode = "name";
let search = document.getElementById("search");
function getSearchMode(id) {
  if (id == "searchByName") {
    searchMode = "name";
    search.placeholder = "بحث باسم المنتج";
  } else {
    searchMode = "category";
    search.placeholder = "بحث بالفئه";
  }
  search.focus();
  search.value = "";
}
////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// to  Search in Products ///////////////////////////
function searchData(value) {
  let table = "";
  for (let i = 0; i < products.length; i++) {
    if (searchMode == "name") {
      if (products[i].title.includes(value)) {
        table += `
      <tr>
      <td>${i}</td>
      <td>${products[i].title}</td>
      <td>${products[i].price}</td>
      <td>${products[i].taxes}</td>
      <td>${products[i].ads}</td> 
      <td>${products[i].discount}</td>
      <td>${products[i].category}</td>
      <td>${products[i].quantity}</td>
      <td><button onclick="updateData(${i})">تحديث</button></td>
      <td><button onclick="deleteData(${i})">حذف</button></td>
    </tr>
    `;
      }
    } else {
      if (products[i].category.includes(value)) {
        table += `
      <tr>
      <td>${i}</td>
      <td>${products[i].title}</td>
      <td>${products[i].price}</td>
      <td>${products[i].taxes}</td>
      <td>${products[i].ads}</td> 
      <td>${products[i].discount}</td>
      <td>${products[i].category}</td>
      <td>${products[i].quantity}</td>
      <td><button onclick="updateData(${i})">تحديث</button></td>
      <td><button onclick="deleteData(${i})">حذف</button></td>
    </tr>
    `;
      }
    }
    document.getElementById("tbody").innerHTML = table;
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
