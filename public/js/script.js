console.log("Helloww");

var filterKnop = document.querySelector("#filter");
var filterForm = document.querySelector("#filteren");
var filterSluit = document.querySelector("#filterensluiten");

filterKnop.addEventListener("click", openFilter);
filterSluit.addEventListener("click", sluitFilter);

function openFilter(){
    filterForm.style.display = "block";
};

function sluitFilter(){
    filterForm.style.display = "none";
};
