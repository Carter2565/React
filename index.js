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

function loaded() {




  function startStopwatch() {
    if (!isRunning) {
      startTime = Date.now();
      interval = setInterval(updateStopwatch, 10);
      isRunning = true;
    }
  }

  function stopStopwatch() {
    clearInterval(interval);
    isRunning = false;
  }

  function resetStopwatch() {
    stopStopwatch();
    elapsedTime = 0;
    updateStopwatchDisplay();
  }

  function updateStopwatch() {
    elapsedTime += (Date.now() - startTime) / 1000;
    // updateStopwatchDisplay();
    startTime = Date.now();
  }

  function updateStopwatchDisplay() {
    let display = document.getElementById("time");
    let seconds = Math.floor(elapsedTime % 60);
    let minutes = Math.floor(elapsedTime / 60);
    let hundredths = Math.floor(elapsedTime * 100) % 100;
    display.innerHTML = `${seconds}:${hundredths}`;
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
  
  function down() {
    dotnum = 0;
    wait = true;
    for (let x = 0; x < 3; x++) {
      red();
    }
    for (let x = 0; x < 2; x++) {
      redSlow();
    }
    for (let x = 0; x < 5; x++) {
      dot = document.getElementsByClassName("dot")[x];
      dot.classList.remove("red"); 
    }
    stopwatchstart()
    wait = false;
  }
  



  let wait = true;
  dotnum = 0;
  const b = document.getElementById("button");
  let timer;
  b.onpointerdown = function() {
    timer = setTimeout(down, 500)
  }
  b.onpointerup = function() {
    if (wait) {
      let display = document.getElementById("time");
      display.innerHTML = '--- FAIL';
    }
    else {
      updateStopwatchDisplay()
    }
    stopStopwatch()
    clearTimeout(timer);
  }

}