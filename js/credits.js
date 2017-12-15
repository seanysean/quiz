const container = document.querySelector('.container');

//For the popup.
function popup(a) {
  const overlay = document.querySelector('.overlay');
  const title = document.querySelector('#title');
  const message = document.querySelector('#popupmsg');
  overlay.style.display = 'block';
  if (a === 'code') {
    title.innerHTML = 'Contributing code';
    message.innerHTML = `This is for contributing to the quiz code.
    If you would like to, you can submit a pull request <a href="https://github.com/seanysean/quiz" target="_blank">on github</a>.`;
  }
  else if (a === 'quiz') {
    title.innerHTML = 'Quiz questions'
    message.innerHTML = `This is for contributing chess quiz questions.
    If you have some chess related quiz questions, and wish to share them, you can <a href="contact.html" target="_blank">contact me using lichess.org</a>.`;
  }
  overlay.addEventListener('click',e=>e.target !== document.querySelector('.popup')?overlay.style.display='none':console.log(e.target));
}

const contributors = {
  seanysean: {
    name: 'Sean B',
    username: 'seanysean',
    profile: 'https://lichess.org/@/seanysean',
    contributions: ['code','quiz']
  },
  themouth888: {
    name: 'themouth888',
    username: 'themouth888',
    profile: 'https://lichess.org/@/themouth888',
    contributions: ['quiz']
  }
};

for (let key in contributors) {
  let box = document.createElement('DIV');
  box.classList.add('contributor');
  box.innerHTML = `
  <h1>${contributors[key].name}</h1>
  <span>Lichess.org </span>
  <a href="${contributors[key].profile}" target="_blank">${contributors[key].username}</a>
  <hr />
  <p>Contributions</p>
  `;
  contributors[key].contributions.map(e=>{
    let thing = document.createElement('SPAN');
    thing.classList.add(e);
    thing.classList.add('contribution');
    thing.innerHTML = e;
    box.append(thing);
    thing.addEventListener('click',()=>popup(e));
  });
  container.append(box);
}
