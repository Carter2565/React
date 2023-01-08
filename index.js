function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "404 - Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }
function clearIncluded() {
  let y = document.getElementsByClassName("included");
  y = y.length -1
  for (let x = y; x > 0; x--) {
    document.getElementsByClassName("included")[x].remove();
  }
}

function include(file, path="/assets/php/",element="content" ) {
  let location = path + file;
  document.getElementById(element).setAttribute("include-html", location);
  includeHTML();
}

function dotRed() {
  dot = document.getElementsByClassName("dot")[dotnum];
  dot.classList.add("red"); 
  dotnum++
}

function red() {
  // Generate a random number between 0.5 and 1.5
  var delay = Math.random() * (2.5 - 1) + 1;
  // Wait for the specified amount of time
  setTimeout(function() {
    dotRed()
  }, delay * 1000);
}

function redSlow() {
  // Generate a random number between 0.5 and 1.5
  var delay = Math.random() * (2.5 - 1.5) + 1.5;
  // Wait for the specified amount of time
  setTimeout(function() {
    dotRed()
  }, delay * 1000);
}

function loaded() {
  const b = document.getElementById("button");
  let timer;
  b.onpointerdown = function() {
    dotnum = 0
    for (let x = 0; x < 3; x++) {
      timer = setTimeout(red, 500);
    }
    for (let x = 0; x < 2; x++) {
      timer = setTimeout(redSlow, 500);
    }
    // for (let x = 0; x < 5; x++) {

    // }
  }
  b.onpointerup = function() {
    clearTimeout(timer);
  }

}