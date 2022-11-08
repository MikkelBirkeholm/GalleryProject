const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
const moonPath = "M15.1881 29.3293C19.4644 43.9027 35.2643 51.5767 35.6866 53.016C21.1133 57.2923 5.83258 48.9449 1.5563 34.3715C-2.71998 19.7981 5.62748 4.5174 20.2009 0.241121C20.2009 0.241121 10.9118 14.7559 15.1881 29.3293Z";
const sunPath = "M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z"
const darkMode = document.querySelector("#darkmode");
let toggle = false;
const toggleSwitch = document.querySelector('#darkmodeSwitch');

// skift mellem temaer
toggleSwitch.addEventListener('change', switchTheme, false);

export function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); //add this
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); //add this
    }    
}


// check nuværende tema
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}
// animer måne/sol
darkMode.addEventListener("click",()=>{
  const timeline = anime.timeline({
    duration : 750,
    easing : "easeOutExpo"    
  });

  timeline.add({
    targets : ".sun",
    d: [{value: toggle ? sunPath : moonPath}]
  })
  .add({
    targets : "#darkmode",
    rotate : toggle ? 540 : 360,
  },
  '-= 350');
  if(!toggle){
    toggle = true;
  }else{
    toggle = false;
  }
});