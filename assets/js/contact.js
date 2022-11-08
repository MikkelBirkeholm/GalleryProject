import {switchTheme} from "./theme.js"
let inputs = document.querySelectorAll('.input');
const messageBox = document.querySelector('#message');
const contactForm = document.querySelector('#contactForm')

// hvis form er invalid, stop submit
contactForm.addEventListener('invalid', (() => {
    return function(e) {
        e.preventDefault();
        processChange('Fill out the form correctly, please')
    };
})(),
true
);

// hvis succes
contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if(contactForm.checkValidity()) {
        contactForm.innerHTML = `<h1>Cheers!</h1>`
    }
} )


//check validitet når der skrives i felterne
for(let el of inputs) {
    el.addEventListener('input', () => {
      if (!el.checkValidity()) {
        processChange(el.validationMessage)
        console.log('validity check')
      } else {
        processChange(el.value + el.dataset.message)
        console.log('the else thing')
      }
      // processChange()
      })
  }
  
  //timeout mellem keystrokes
  function debounce(func, timeout = 500) {
      let timer;
      return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => {
              func.apply(this, args);
          }, timeout);
      };
  }
  
  function saveInput(y) {
     messageBox.textContent = y
     }
  
  
  const processChange = debounce((e) => saveInput(e));