let bg = localStorage.getItem('bg');

if (bg === null) {
  localStorage.setItem('bg','light');
  document.body.classList.remove('dark');
} else {
  if (bg === 'light') {
    document.body.classList.remove('dark');
  }
  else if (bg === 'dark') {
    document.body.classList.add('dark');
  }
}

const themeSwitcher = document.querySelector('.theme');
document.body.addEventListener('keydown', e=>e.key==='t'?themeSwitcher.click():console.log(e.key));
themeSwitcher.addEventListener('click',e=>{
  console.log(bg);
  if (bg === 'light') {
    document.body.classList.add('dark');
    localStorage.setItem('bg','dark');
    bg = 'dark';
  } else if (bg === 'dark') {
    document.body.classList.remove('dark');
    localStorage.setItem('bg','light');
    bg = 'light';
  }
});
