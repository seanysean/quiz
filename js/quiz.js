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
//All questions
const a = new Question('A bishop is worth',['3 points','1 point','2 points']);
const b = new Question('A rook is worth',['5 points','2 points','3 points']);
const c = new Question('The most popular first move for white is',['1. e4','1. h5','1. e5', '1. d4', '1. g6']);
const d = new Question('A knight is worth',['3 points','2 points','9 points']);
const e = new Question('Checkmate does not always immediately win the game',['false','true']);
const f = new Question('As late as 1561, Castling was two moves.',['true','false']);

/*Syntax:
const z = new Question('Question',['(Correct option)','...more options...']);
z is then added to the 'qa' array.*/

let qa = [a,b,c,d,e,f];
let tick;

const quiz = {
  q: document.querySelector('.question'),
  response: document.querySelector('.response'),
  completed: 0,
  cHtml: document.querySelector('#qzdone'),
  a: null,
  score: 0,
  sHtml: document.querySelector('.score'),
  hsHtml: document.querySelector('.highscore'),
  popup: document.querySelector('.overlay'),
  again: document.querySelector('#playagain'),
  time: 30,
  tHtml: document.querySelector('#time'),
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
      for (i = qa[r].answers.length; i > 0; i--) {
        let r2 = Math.floor(Math.random() * i);
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
      alert('Well done! :D You completed all quiz questions. \n Would you like to contribute some? If so, \n you can PM me at lichess @seanysean, \n or go to contact.html. Thanks :)')
    }
  },
  submit(input) {
    input === this.a?this.score++:this.score--;
    this.completed++;
    this.cHtml.innerHTML = `${this.completed}`;
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
  }
}

const start = document.querySelector('#start');
start.addEventListener('click',()=>quiz.start());
