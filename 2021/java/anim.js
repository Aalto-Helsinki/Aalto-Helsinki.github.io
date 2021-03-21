const logo = document.querySelectorAll("#logo21 path");

console.log(logo);

for(let i = 0; i<logo.length; i++) {
    console.log("Letter"${i}'is'${logo[i].getTotalLength()});
}