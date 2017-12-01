let bg = sessionStorage.getItem('bg');
let inputBoxes = [document.getElementsByTagName('TEXTAREA')[0], document.getElementsByTagName('INPUT')[0]];

if (bg === null) {
  sessionStorage.setItem('bg','light');
  bg = 'light';
} else {
  if (bg === 'light') {
    document.body.classList.remove('dark');
  }
  else if (bg === 'dark') {
    document.body.classList.add('dark');
  }
}

const themeSwitcher = document.querySelector('.theme');
document.body.addEventListener('keydown', e=>{
  if (e.key==='t' && e.target !== inputBoxes[0] && e.target !== inputBoxes[1]) {
    themeSwitcher.click();
  }
});
themeSwitcher.addEventListener('click',e=>{
  console.log(bg);
  if (bg === 'light') {
    document.body.classList.add('dark');
    sessionStorage.setItem('bg','dark');
    bg = 'dark';
  } else if (bg === 'dark') {
    document.body.classList.remove('dark');
    sessionStorage.setItem('bg','light');
    bg = 'light';
  }
});
