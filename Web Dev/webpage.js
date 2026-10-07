/*let newBtn = document.createElement("button");
newBtn.innerHTML = "Click Me";
newBtn.addEventListener("click", () => {
  alert("Hi!");
});
console.log("New button created:", newBtn);

let divs = document.querySelectorAll("div");
divs.forEach((div) => div.appendChild(newBtn));
*/



newBtn = document.createElement("button");
newBtn.innerHTML = "Click Me";
newBtn.style.backgroundColor = "blue";
newBtn.addEventListener("click", () => {
  alert("Hi!");
});

document.body.appendChild(newBtn);

let mybtn = document.querySelector("#myButton");
mybtn.onmouseover = function() {
  mybtn.style.backgroundColor = "green";
  mybtn.ondblclick = function() {
    nbtn= document.createElement("button");
    nbtn.innerHTML = "Toggle Button";
    let bkgrnd = 0;
    nbtn.addEventListener("click", () => {
        if (bkgrnd === 0) {
            nbtn.style.backgroundColor = "red";
            bkgrnd++;
        } else {
            nbtn.style.backgroundColor = "blue";
            bkgrnd--;
        }
    });
    document.body.appendChild(nbtn);
  };
};