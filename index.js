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

  let interval;
  let elapsedTime = 0;
  let startTime;
  let isRunning = false;
  let dots = document.querySelectorAll('.dot');
  let wait = 'false';
  let delay = 0;
  
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
    // updateStopwatchDisplay();
  }
  
  function updateStopwatch() {
    elapsedTime += (Date.now() - startTime) / 1000;
    // updateStopwatchDisplay();
    startTime = Date.now();
  }
  
  function updateStopwatchDisplay() {
    parts = String(delay).split('.')
    let display = document.getElementById("time");
    let seconds = Math.floor(elapsedTime % 60);
    let minutes = Math.floor(elapsedTime / 60);
    let hundredths = Math.floor(elapsedTime * 1000) % 1000;
    let ms = parts[1]
    display.innerHTML = `${elapsedTime} -- ${hundredths} Your Time: ${seconds-parts[0]}.${hundredths-ms.substring(0,3)}`;
  }
  
  function changeDotColor() {
    let delay = Math.random() * (2.5 - 1.25) + 1.25;
    for (let i = 0; i < 5; i++) {
      setTimeout(function() {
        dots[i].classList.add('red');
      }, delay * 1000);
      delay += Math.random() * (2.5 - 1.25) + 1.25;
    }
  }
  
  function resetDotColor(dot) {
    dot.classList.remove('red');
  }
  
  document.getElementById('button').onpointerdown = function() {
    wait = 'hi'
    delay = Math.random() * (2.5 - 1.25) + 1.25;
    console.log(wait)
    setTimeout(function() {
      console.log(wait)
      if(wait){
        dots[0].classList.add('red');
      }
    }, delay * 1000);
    delay += Math.random() * (2.5 - 1.25) + 1.25;
    setTimeout(function() {
      console.log(wait)
      if(wait){
        dots[1].classList.add('red');
      }
    }, delay * 1000);
    delay += Math.random() * (2.5 - 1.25) + 1.25;
    setTimeout(function() {
      console.log(wait)
      if(wait){
        dots[2].classList.add('red');
      }
    }, delay * 1000);
    delay += Math.random() * (2.5 - 1.25) + 1.25;
    setTimeout(function() {
      console.log(wait)
      if(wait){
        dots[3].classList.add('red');
      }
    }, delay * 1000);
    delay += Math.random() * (2.5 - 1.25) + 1.25;
    setTimeout(function() {
      console.log(wait)
      if(wait){
        dots[4].classList.add('red');
      }
    }, delay * 1000);
    startStopwatch();
    wait = false
  };
  
  document.getElementById('button').onpointerup = function() {
    // Reset the color of all dots
    for (let i = 0; i < 5; i++) {
      resetDotColor(dots[i]);
    }
    stopStopwatch();
    if (wait) { 
      let display = document.getElementById("time");
      display.innerHTML = '--- FAIL';
    }
    else {
      updateStopwatchDisplay();
    }
    resetStopwatch()
  };
  
}