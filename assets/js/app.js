import {switchTheme} from "./theme.js"

const form = document.querySelector('#searchForm')
const modal = document.querySelector('#modal');

const likes = document.querySelector('#likes')
const views = document.querySelector('#views')
const downloads = document.querySelector('#downloads')
const username = document.querySelector('#username')

const gallery = document.querySelector('#gallery');
const input = document.querySelector('#searchField')

let suggestions = document.querySelectorAll('.word')

let customStyles = document.querySelector('#customstyles')




//animation til søgning
var searchAnimation = anime.timeline({
    autoplay: false,
    duration: 1000,
    begin: function(){
        //nødvendig af kosmetiske årsager
        return gallery.style.pointerEvents = 'none'
    }
}).add({
    targets: '#heroImage',
    height: '3em',
    complete: function() {
        //fjerner billedet fra animationen, så den ikke skifter størrelse ved hver søgning
        return searchAnimation.remove('#heroImage')
    }
}).add({
    translateY: 0,
    targets: '#searchForm, #suggestions, #gallery, .word',
    delay: anime.stagger(50),
    complete: function() {
        return gallery.style.pointerEvents = 'auto'
    }
})


// annuller formens standard refresh
form.addEventListener('submit', (e) => {
    e.preventDefault()
    fetchImages()
})

// Add eventlistener til elementer, som åbner modal / lightbox
function slideModal() {
    let slides = document.querySelectorAll('.slide');
    for (let i of slides) {
      i.addEventListener('click', () => {
        let url = i.getAttribute('data-image');
        let backdropColor = i.getAttribute('data-color');
        likes.innerText = 'likes: ' + i.getAttribute('data-likes')
        downloads.innerText = 'downloads: ' + i.getAttribute('data-downloads')
        views.innerText = 'views: ' + i.getAttribute('data-views')
        username.innerText = 'By: ' + i.getAttribute('data-username')
        username.href = i.getAttribute('data-link')
        customStyles.innerText = `dialog::backdrop{background: ${backdropColor}70; backdrop-filter: blur(10px);`; //indsætter custom styling i footeren for ::backdrop pseudo element
        modal.style.backgroundImage = `url(${url})`;
        modal.classList.toggle('show');
        modal.showModal();
      });
      setTimeout(() => {
        //animer billeder ind 
        anime({
            targets: '.slide',
            translateY: ['5em', 0],
            opacity: 1,
            duration: 650,
            delay: anime.stagger(100),
            easing: 'easeOutExpo'
        })
    }, 500)
    }
  }

// luk modal ved click efter 500ms
modal.addEventListener('click', () => {
    modal.classList.toggle('show');
    modal.close();
  });

// indsæt tekst i input ved tryk på suggestion
for (let s of suggestions) {
    s.onclick = function() {
        input.value = s.innerText
    }
}

// fetch billeder fra Unsplash API
function fetchImages() {
    gallery.innerHTML = ''
    let searchTerm = input.value
    let fetchURL =
`https://api.unsplash.com/photos/random?query=${searchTerm}&orientation=landscape&count=9&client_id=TTM26pOT0bZAok1xYZzS_GwHpKXRUc7Ni-GN2r7JGLc`
if (!searchTerm || searchTerm === 'What would you like to search for?') {
    input.value = 'What would you like to search for?'
    return
}
  fetch(fetchURL)
    .then(res => {
      return res.json();
    })
    .then(data => {
      for (let image of data) {
        let li = document.createElement('li');
        li.className = 'slide';
        li.style.backgroundImage = `url(${image.urls.regular})`;
        li.setAttribute('data-image', image.urls.regular);
        li.setAttribute('data-likes', image.likes);
        li.setAttribute('data-views', image.views);
        li.setAttribute('data-downloads', image.downloads);
        li.setAttribute('data-color', image.color);
        li.setAttribute('data-username', image.user.username);
        li.setAttribute('data-link', image.user.links.html);
        gallery.appendChild(li);
      }
      slideModal();
    })
    .catch((error) => {
        gallery.innerHTML = `<h1>Whoops. There was an issue. Maybe we ran out of requests. Check back in an hour.</h1>`
        console.log(error)
      });
    searchAnimation.play()
};