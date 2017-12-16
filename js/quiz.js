class Question {
  constructor(question,answers) {
    this._question = question;
    this._answers = answers;
  }
  get question() {
    return this._question;
  }
  get answers() {
    return this._answers;
  }
}
// All questions
const a = new Question('A bishop is worth',['3 points','1 point','2 points']);
const b = new Question('A rook is worth',['5 points','2 points','3 points']);
const c = new Question('The most popular first move for white is',['1. e4','1. h5','1. e5', '1. d4', '1. g6']);
const d = new Question('A knight is worth',['3 points','2 points','9 points']);
const e = new Question('Checkmate does not always win the game',['false','true']);
const f = new Question('As late as 1561, Castling was two moves.',['true','false']);
const g = new Question('Was chess invented in the 1900s?',['No','Yes']);
const h = new Question('Who was the World Blitz Champion in 2010?',['Aronian','Carlsen','Nakamura','Karjakin']);
const i = new Question('Who was the world champion from 1972–1975?',['Fischer','Carlsen','Kasparov','Botvinnik','Spassky']);
const j = new Question('Who was the world champion from 1969–1972?',['Spassky','Nakamura','Kasparov','Alekhine','Fischer']);
const k = new Question('Steinitz is considered the first WCC',['true','false']);
const l = new Question('Botvinnik was the first \'official\' GM of the USSR',['true','false']);
const m = new Question('\'Super GM\' is a unoffical title',['true','false']);
const n = new Question('Alekhine\'s defense is a opening that begins with',['1. e4 Nf6','1. d4 Nf6','1. h4 Nh6','1. e3 e6']);
const o = new Question('Who was the 4<sup>th</sup> world champion?',['Alekhine','Euwe','Capablanca','Kasparov','Botvinnik']);
const p = new Question('In the first FIDE Olympiad, there were only 11 participating countries',['false','true']);
const q = new Question('For a time, computers competed in human tournaments.',['true','false']);
const r = new Question('In about 15% of Morphy\'s games, he gave odds.',['true','false']);
const s = new Question('What color is g6?',['light','dark']);

/*Syntax:
const z = new Question('Question',['(Correct option)','...more options...']);
z is then manually added to the 'qa' array.*/

let qa = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s];
let tick;

const quiz = {
  q: document.querySelector('.question'),
  response: document.querySelector('.response'),
  completed: 0,
  a: null,
  score: 0,
  sHtml: document.querySelector('.score'),
  s2Html: document.querySelector('#score'),
  hsHtml: document.querySelector('.highscore'),
  popup: document.querySelector('.overlay'),
  again: document.querySelector('#playagain'),
  time: 10,
  tHtml: document.querySelector('#time'),
  note: document.querySelector('#note'),
  start() {
    tick = setInterval(()=>{
      this.time--;
      this.tHtml.innerHTML = this.time;
      if (this.time === 0) {
        this.end();
      }
    },1000);
    this.next();
  },
  next() {
    console.log(qa);
    if (qa.length > 0) {
      this.response.innerHTML = '';
      console.log(this.response);
      let r = Math.round(Math.random() * (qa.length - 1));
      this.q.innerHTML = qa[r].question;
      this.a = qa[r].answers[0];
      for (iterator = qa[r].answers.length; iterator > 0; iterator--) {
        let r2 = Math.floor(Math.random() * iterator);
        console.log(r2);
        let btn = document.createElement('BUTTON');
        btn.innerHTML = qa[r].answers[r2];
        btn.addEventListener('click',()=>this.submit(btn.innerHTML));
        this.response.appendChild(btn);
        qa[r].answers.splice(qa[r].answers.indexOf(qa[r].answers[r2]), 1);
        console.log(this.response);
      }
      qa.splice(qa.indexOf(qa[r]), 1);
      console.log(qa);
    }
    else {
      this.end();
      alert('Well done! :D You completed all quiz questions.\nWould you like to contribute some? If so,\nyou can PM me at lichess @seanysean,\nor go to contact.html. Thanks :)');
    }
  },
  submit(input) {
    if (input === this.a) {
      this.noteMsg(true);
      this.score++;
      this.time+=3;
      this.tHtml.innerHTML = this.time;
    } else {
      this.noteMsg(false);
      this.time--;
      this.tHtml.innerHTML = this.time;
    }
    this.completed++;
    this.s2Html.innerHTML = `${this.score}/${this.completed}`;
    this.next();
    console.log(this.score);
  },
  end() {
    clearInterval(tick);
    this.popup.style.display = 'block';
    this.sHtml.innerHTML = this.score;
    this.again.addEventListener('click',()=>window.location.reload());
    if (sessionStorage.getItem('high') === null) {
      sessionStorage.setItem('high',this.score);
    } else {
      if (Number(sessionStorage.getItem('high') < this.score)) {
        sessionStorage.setItem('high',this.score);
      }
    }
    this.hsHtml.innerHTML = sessionStorage.getItem('high');
  },
  noteMsg(right) {
    if (right) {
      this.note.innerHTML = 'Your previous answer was correct.';
      this.note.classList.add('green');
      this.note.classList.remove('red');
    } else {
      this.note.innerHTML = 'Your previous answer was incorrect.';
      this.note.classList.add('red');
      this.note.classList.remove('green');
    }
  }
}

const start = document.querySelector('#start');
start.addEventListener('click',()=>quiz.start());
