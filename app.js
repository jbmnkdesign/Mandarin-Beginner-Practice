// Mandarin Beginner Practice — Week 1
// const qs=[
//   {q:'「我有一隻狗。」有 是什麼意思？',z:'ㄨㄛˇ ㄧㄡˇ ㄧˋ ㄓ ㄍㄡˇ',en:'What does 有 mean?',o:['have','want','go','see'],a:0,h:'想想「有」和「沒有」的相反意思。',w:'有 = have。'},
//   {q:'哪一句是「I do not have a cat」？',z:'',en:'Choose the sentence that means “I do not have a cat.”',o:['我有貓。','我沒有貓。','我喜歡貓。','我看貓。'],a:1,h:'找「沒有」。',w:'沒有 = do not have。'},
//   {q:'書在背包裡面。書在哪裡？',z:'ㄕㄨ ㄗㄞˋ ㄅㄟ ㄅㄠ ㄌㄧˇ ㄇㄧㄢˋ',en:'Where is the book?',o:['背包裡面','背包外面','桌子上面','椅子下面'],a:0,h:'看句子最後的方位詞。',w:'裡面 = inside。'},
//   {q:'「我喜歡吃飯。」喜歡 是什麼意思？',z:'ㄨㄛˇ ㄒㄧˇ ㄏㄨㄢ ㄔ ㄈㄢˋ',en:'What does 喜歡 mean?',o:['like','drink','have','come'],a:0,h:'想想 “I like...”',w:'喜歡 = like。'}
// ];

// const builders=[
//   {p:'I have a dog.',words:['我','有','一隻','狗'],ans:['我','有','一隻','狗']},
//   {p:'The book is inside the backpack.',words:['書','在','背包','裡面'],ans:['書','在','背包','裡面']},
//   {p:'I also like cats.',words:['我','也','喜歡','貓'],ans:['我','也','喜歡','貓']},
//   {p:'I want to drink water.',words:['我','想','喝','水'],ans:['我','想','喝','水']}
// ];

// const challenges=[
//   {q:'狗在哪裡？',o:['桌子上面','桌子下面','椅子上面','背包裡面'],a:1},
//   {q:'貓在哪裡？',o:['外面','桌子下面','背包裡面','椅子上面'],a:3},
//   {q:'誰喜歡狗？',o:['小明','妹妹','貓','狗'],a:0},
//   {q:'妹妹喜歡什麼？',o:['狗','書','貓','水'],a:2}
// ];

// const core=[['有','ㄧㄡˇ','have'],['沒有','ㄇㄟˊ ㄧㄡˇ','do not have'],['在','ㄗㄞˋ','be at / in'],['喜歡','ㄒㄧˇ ㄏㄨㄢ','like'],['想','ㄒㄧㄤˇ','want'],['去','ㄑㄩˋ','go'],['來','ㄌㄞˊ','come'],['看','ㄎㄢˋ','look/watch'],['吃','ㄔ','eat'],['喝','ㄏㄜ','drink'],['大','ㄉㄚˋ','big'],['小','ㄒㄧㄠˇ','small']];

// const $=selector=>document.querySelector(selector);
// const $$=selector=>[...document.querySelectorAll(selector)];
// function shuffle(items){
//   const result=[...items];
//   for(let index=result.length-1;index>0;index--){
//     const swapIndex=Math.floor(Math.random()*(index+1));
//     [result[index],result[swapIndex]]=[result[swapIndex],result[index]];
//   }
//   return result;
// }

// let qi=0,bi=0,built=[],ci=0;

// function renderChoices(container,options,answerIndex,onAnswer){
//   container.innerHTML='';
//   options.forEach((option,index)=>{
//     const button=document.createElement('button');
//     button.className='choice';
//     button.textContent='ABCD'[index]+'. '+option;
//     button.addEventListener('click',()=>{
//       if(button.disabled)return;
//       [...container.children].forEach((choice,choiceIndex)=>{
//         choice.disabled=true;
//         if(choiceIndex===answerIndex)choice.classList.add('good');
//       });
//       if(index!==answerIndex)button.classList.add('bad');
//       onAnswer(index===answerIndex);
//     });
//     container.appendChild(button);
//   });
// }

// function setMode(mode){
//   ['quiz','builder','challenge','review'].forEach(id=>$('#'+id).classList.toggle('hidden',id!==mode));
//   $$('.tab').forEach(button=>button.classList.toggle('active',button.dataset.mode===mode));
//   if(mode==='builder')renderB();
//   if(mode==='challenge')renderC();
// }

// $$('.tab').forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.mode)));

// function renderQ(){
//   const question=qs[qi];
//   $('#qnum').textContent=`第 ${qi+1} 題 / ${qs.length}`;
//   $('#qtext').textContent=question.q;
//   $('#qzh').textContent=question.z;
//   $('#qen').textContent=question.en;
//   $('#feedback').textContent='';
//   $('#hint').classList.add('hidden');
//   $('#nextBtn').disabled=true;
//   renderChoices($('#choices'),question.o,question.a,()=>{
//     $('#feedback').textContent=question.w;
//     $('#nextBtn').disabled=false;
//   });
// }

// $('#nextBtn').addEventListener('click',()=>{qi=(qi+1)%qs.length;renderQ()});
// $('#hintBtn').addEventListener('click',()=>{
//   $('#hint').textContent=qs[qi].h;
//   $('#hint').classList.remove('hidden');
// });

// function renderB(){
//   const sentence=builders[bi];
//   built=[];
//   $('#bPrompt').textContent=sentence.p;
//   $('#bAnswer').innerHTML='';
//   $('#bFeedback').textContent='';
//   const box=$('#bWords');
//   box.innerHTML='';
//   shuffle(sentence.words.map(word=>({word}))).forEach(item=>{
//     const button=document.createElement('button');
//     button.className='word';
//     button.textContent=item.word;
//     button.addEventListener('click',()=>{
//       if(button.classList.contains('used'))return;
//       button.classList.add('used');
//       built.push(item);
//       const answerButton=document.createElement('button');
//       answerButton.className='word';
//       answerButton.textContent=item.word;
//       answerButton.addEventListener('click',()=>{
//         built=built.filter(word=>word!==item);
//         button.classList.remove('used');
//         answerButton.remove();
//       });
//       $('#bAnswer').appendChild(answerButton);
//     });
//     box.appendChild(button);
//   });
// }

// $('#bReset').addEventListener('click',renderB);
// $('#bNext').addEventListener('click',()=>{bi=(bi+1)%builders.length;renderB()});
// $('#bCheck').addEventListener('click',()=>{
//   const sentence=builders[bi];
//   $('#bFeedback').textContent=built.map(item=>item.word).join('|')===sentence.ans.join('|')
//     ?'很好！句子順序正確。'
//     :'還差一點，再想想中文通常先說「誰」，再說「做什麼／在哪裡」。';
// });

// function renderC(){
//   const challenge=challenges[ci];
//   $('#cQ').textContent=(ci+1)+'. '+challenge.q;
//   $('#cFeedback').textContent='';
//   renderChoices($('#cChoices'),challenge.o,challenge.a,isCorrect=>{
//     $('#cFeedback').textContent=isCorrect?'答對了。':'再讀一次短文找關鍵詞。';
//   });
// }

// $('#cNext').addEventListener('click',()=>{ci=(ci+1)%challenges.length;renderC()});

// $('#zt').addEventListener('change',()=>$$('.zh').forEach(element=>element.classList.toggle('hidden',!$('#zt').checked)));
// $('#et').addEventListener('change',()=>$('#qen').classList.toggle('hidden',!$('#et').checked));

// core.forEach(([word,zhuyin,english])=>{
//   const item=document.createElement('div');
//   item.className='card';
//   const wordElement=document.createElement('strong');
//   wordElement.textContent=word;
//   const zhuyinElement=document.createElement('div');
//   zhuyinElement.className='zh';
//   zhuyinElement.textContent=zhuyin;
//   const translationElement=document.createElement('div');
//   translationElement.className='muted';
//   translationElement.textContent=english;
//   item.append(wordElement,zhuyinElement,translationElement);
//   $('#wordGrid').appendChild(item);
// });

// renderQ();
// renderB();
// renderC();


// Mandarin Beginner Practice — Week 2
const qs = [
  {
    q: '哪一句是「I have a cat」？',
    z: '',
    en: 'Choose the sentence that means “I have a cat.”',
    o: ['我有貓。', '我沒有貓。', '我喜歡狗。', '我在貓。'],
    a: 0,
    h: '想想「有」和「沒有」。',
    w: '有 = have。'
  },
  {
    q: '「書在桌子上面。」書在哪裡？',
    z: 'ㄕㄨ ㄗㄞˋ ㄓㄨㄛ ㄗ˙ ㄕㄤˋ ㄇㄧㄢˋ',
    en: 'Where is the book?',
    o: ['桌子上面', '桌子下面', '背包裡面', '椅子外面'],
    a: 0,
    h: '看句子最後的方位詞。',
    w: '上面 = on / above。'
  },
  {
    q: '朋友問：「你喜歡狗嗎？」哪個回答最自然？',
    z: 'ㄋㄧˇ ㄒㄧˇ ㄏㄨㄢ ㄍㄡˇ ㄇㄚ˙？',
    en: 'Your friend asks: “Do you like dogs?”',
    o: ['喜歡，我很喜歡狗。', '我在狗。', '狗在哪裡？', '我沒有狗嗎？'],
    a: 0,
    h: '這是在問你的喜好。',
    w: '直接回答「喜歡／不喜歡」。'
  },
  {
    q: '「我也喜歡貓。」也 最接近哪一個意思？',
    z: 'ㄨㄛˇ ㄧㄝˇ ㄒㄧˇ ㄏㄨㄢ ㄇㄠ',
    en: 'What does 也 mean?',
    o: ['also / too', 'all / both', 'where', 'not'],
    a: 0,
    h: '兩個人有一樣的喜好時會用。',
    w: '也 = also / too。'
  },
  {
    q: '哥哥喜歡披薩，我＿＿喜歡披薩。',
    z: 'ㄍㄜ ㄍㄜ˙ ㄒㄧˇ ㄏㄨㄢ ㄆㄧ ㄙㄚˋ，ㄨㄛˇ ＿＿ ㄒㄧˇ ㄏㄨㄢ ㄆㄧ ㄙㄚˋ。',
    en: 'My older brother likes pizza, and I like pizza too.',
    o: ['也', '在', '沒有', '哪裡'],
    a: 0,
    h: '想想英文 too。',
    w: '我也喜歡披薩。'
  },
  {
    q: '「我和媽媽都喜歡茶。」都 最接近哪一個意思？',
    z: 'ㄨㄛˇ ㄏㄢˋ ㄇㄚ ㄇㄚ˙ ㄉㄡ ㄒㄧˇ ㄏㄨㄢ ㄔㄚˊ',
    en: 'What does 都 mean here?',
    o: ['both / all', 'also', 'under', 'want'],
    a: 0,
    h: '句子裡有兩個人，而且兩個人一樣。',
    w: '都 = all / both。'
  },
  {
    q: '「我想喝水。」想 是什麼意思？',
    z: 'ㄨㄛˇ ㄒㄧㄤˇ ㄏㄜ ㄕㄨㄟˇ',
    en: 'What does 想 mean here?',
    o: ['want to', 'have', 'like', 'come'],
    a: 0,
    h: '想＋動作，常表示 want to…。',
    w: '想喝 = want to drink。'
  },
  {
    q: '「我和朋友一起看電影。」一起 是什麼意思？',
    z: 'ㄨㄛˇ ㄏㄢˋ  ㄆㄥˊ ㄧㄡˇ ㄧˋ ㄑㄧˇ ㄎㄢˋ ㄉㄧㄢˋ ㄧㄥˇ',
    en: 'What does 一起 mean?',
    o: ['together', 'inside', 'today', 'small'],
    a: 0,
    h: '兩個人做同一件事。',
    w: '一起 = together。'
  },
  {
    q: '小明想喝水，也想吃飯。他想做幾件事？',
    z: 'ㄒㄧㄠˇ ㄇㄧㄥˊ ㄒㄧㄤˇ ㄏㄜ ㄕㄨㄟˇ，ㄧㄝˇ ㄒㄧㄤˇ ㄔ ㄈㄢˋ。',
    en: 'How many things does Xiaoming want to do?',
    o: ['兩件', '一件', '三件', '不知道'],
    a: 0,
    h: '找兩個「想」。',
    w: '喝水＋吃飯，共兩件事。'
  },
  {
    q: '媽媽和我都喜歡狗。哪一句意思一樣？',
    z: 'ㄇㄚ ㄇㄚ˙ ㄏㄢˋ ㄨㄛˇ ㄉㄡ ㄒㄧˇ ㄏㄨㄢ ㄍㄡˇ',
    en: 'Which sentence has the same meaning?',
    o: [
      '媽媽喜歡狗，我也喜歡狗。',
      '媽媽喜歡狗，我不喜歡狗。',
      '媽媽沒有狗，我有狗。',
      '我跟媽媽一起看狗。'
    ],
    a: 0,
    h: '「都」表示兩個人都有同樣的情況。',
    w: '兩句都表示媽媽和我都喜歡狗。'
  }
];

const builders = [
  {
    p: 'I also like cats.',
    words: ['我', '也', '喜歡', '貓'],
    ans: ['我', '也', '喜歡', '貓']
  },
  {
    p: 'I want to drink water.',
    words: ['我', '想', '喝', '水'],
    ans: ['我', '想', '喝', '水']
  },
  {
    p: 'I watch a movie with my friend.',
    words: ['我', '和', '朋友', '一起', '看', '電影'],
    ans: ['我', '和', '朋友', '一起', '看', '電影']
  },
  {
    p: 'Mom and I both like tea.',
    words: ['媽媽', '和', '我', '都', '喜歡', '茶'],
    ans: ['媽媽', '和', '我', '都', '喜歡', '茶']
  },
  {
    p: 'The cat is inside the backpack.',
    words: ['貓', '在', '背包', '裡面'],
    ans: ['貓', '在', '背包', '裡面']
  }
];

const challenges = [
  {
    q: '今天是星期幾？',
    o: ['星期六', '星期一', '星期三', '星期日'],
    a: 0
  },
  {
    q: '小美今天去學校嗎？',
    o: ['不去', '去', '不知道', '晚上去'],
    a: 0
  },
  {
    q: '小美想和誰一起去商店？',
    o: ['媽媽', '朋友', '哥哥', '老師'],
    a: 0
  },
  {
    q: '媽媽和小美都喜歡什麼？',
    o: ['茶', '水', '狗', '披薩'],
    a: 0
  },
  {
    q: '她們今天高興嗎？',
    o: ['很高興', '不高興', '不知道', '很累'],
    a: 0
  }
];

// Week 1 core + Week 2 additions
const core = [
  ['有', 'ㄧㄡˇ', 'have'],
  ['沒有', 'ㄇㄟˊ ㄧㄡˇ', 'do not have'],
  ['在', 'ㄗㄞˋ', 'be at / in'],
  ['喜歡', 'ㄒㄧˇ ㄏㄨㄢ', 'like'],
  ['去', 'ㄑㄩˋ', 'go'],
  ['來', 'ㄌㄞˊ', 'come'],
  ['看', 'ㄎㄢˋ', 'look / watch'],
  ['吃', 'ㄔ', 'eat'],
  ['喝', 'ㄏㄜ', 'drink'],
  ['大', 'ㄉㄚˋ', 'big'],
  ['小', 'ㄒㄧㄠˇ', 'small'],
  ['上面', 'ㄕㄤˋ ㄇㄧㄢˋ', 'above / on'],
  ['下面', 'ㄒㄧㄚˋ ㄇㄧㄢˋ', 'below / under'],
  ['裡面', 'ㄌㄧˇ ㄇㄧㄢˋ', 'inside'],
  ['外面', 'ㄨㄞˋ ㄇㄧㄢˋ', 'outside'],
  ['也', 'ㄧㄝˇ', 'also / too'],
  ['都', 'ㄉㄡ', 'all / both'],
  ['想', 'ㄒㄧㄤˇ', 'want to'],
  ['一起', 'ㄧˋ ㄑㄧˇ', 'together'],
  ['跟', 'ㄍㄣ', 'with'],
  ['和', 'ㄏㄢˋ', 'and'],
  ['朋友', 'ㄆㄥˊ ㄧㄡˇ', 'friend'],
  ['媽媽', 'ㄇㄚ ㄇㄚ˙', 'mom'],
  ['哥哥', 'ㄍㄜ ㄍㄜ˙', 'older brother'],
  ['茶', 'ㄔㄚˊ', 'tea'],
  ['披薩', 'ㄆㄧ ㄙㄚˋ', 'pizza'],
  ['電影', 'ㄉㄧㄢˋ ㄧㄥˇ', 'movie'],
  ['學校', 'ㄒㄩㄝˊ ㄒㄧㄠˋ', 'school'],
  ['商店', 'ㄕㄤ ㄉㄧㄢˋ', 'store'],
  ['今天', 'ㄐㄧㄣ ㄊㄧㄢ', 'today'],
  ['星期六', 'ㄒㄧㄥ ㄑㄧˊ ㄌㄧㄡˋ', 'Saturday'],
  ['高興', 'ㄍㄠ ㄒㄧㄥˋ', 'happy']
];

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createBalancedChoices(questions) {
  const answerPositions = [];
  const choicesPerQuestion = 4;
  const baseCount = Math.floor(questions.length / choicesPerQuestion);
  const extraCount = questions.length % choicesPerQuestion;

  for (let position = 0; position < choicesPerQuestion; position++) {
    for (let count = 0; count < baseCount; count++) {
      answerPositions.push(position);
    }
  }

  shuffle([0, 1, 2, 3])
    .slice(0, extraCount)
    .forEach((position) => answerPositions.push(position));

  return shuffle(answerPositions).map((answerPosition, questionIndex) => {
    const question = questions[questionIndex];
    const options = shuffle(
      question.o.filter((_, optionIndex) => optionIndex !== question.a)
    );
    options.splice(answerPosition, 0, question.o[question.a]);

    return { options, answerIndex: answerPosition };
  });
}

let quizChoices = createBalancedChoices(qs);
let challengeChoices = createBalancedChoices(challenges);

let qi = 0;
let answered = false;
let bi = 0;
let built = [];
let ci = 0;
let score = 0;

function setMode(mode) {
  ['quiz', 'builder', 'challenge', 'review'].forEach((id) => {
    const el = $('#' + id);
    if (el) el.classList.toggle('hidden', id !== mode);
  });

  $$('.tab').forEach((b) => {
    b.classList.toggle('active', b.dataset.mode === mode);
  });

  if (mode === 'builder') renderB();
  if (mode === 'challenge') renderC();
}

$$('.tab').forEach((b) => {
  b.addEventListener('click', () => setMode(b.dataset.mode));
});

function renderQ() {
  const x = qs[qi];
  const choices = quizChoices[qi];
  answered = false;

  $('#qnum').textContent = `第 ${qi + 1} 題 / ${qs.length}`;
  $('#qtext').textContent = x.q;
  $('#qzh').textContent = x.z;
  $('#qen').textContent = x.en;
  $('#feedback').textContent = '';
  $('#hint').classList.add('hidden');
  $('#nextBtn').disabled = true;

  const box = $('#choices');
  box.innerHTML = '';

  choices.options.forEach((o, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'choice';
    b.textContent = 'ABCD'[i] + '. ' + o;

    b.addEventListener('click', () => {
      if (answered) return;
      answered = true;

      [...box.children].forEach((el, j) => {
        el.disabled = true;
        if (j === choices.answerIndex) el.classList.add('good');
      });

      if (i !== choices.answerIndex) {
        b.classList.add('bad');
      } else {
        score += 1;
      }

      $('#feedback').textContent = x.w;
      $('#nextBtn').disabled = false;
    });

    box.appendChild(b);
  });

  syncDisplay();
}

$('#nextBtn')?.addEventListener('click', () => {
  qi = (qi + 1) % qs.length;
  if (qi === 0) quizChoices = createBalancedChoices(qs);
  renderQ();
});

$('#hintBtn')?.addEventListener('click', () => {
  $('#hint').textContent = qs[qi].h;
  $('#hint').classList.remove('hidden');
});

function renderB() {
  const x = builders[bi];
  built = [];

  $('#bPrompt').textContent = x.p;
  $('#bAnswer').innerHTML = '';
  $('#bFeedback').textContent = '';

  const box = $('#bWords');
  box.innerHTML = '';

  const shuffled = shuffle(x.words.map((w, i) => ({ w, i })));

  shuffled.forEach((obj) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'word';
    b.textContent = obj.w;

    b.addEventListener('click', () => {
      if (b.classList.contains('used')) return;

      b.classList.add('used');
      built.push(obj);

      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'word';
      chip.textContent = obj.w;

      chip.addEventListener('click', () => {
        built = built.filter((v) => v !== obj);
        b.classList.remove('used');
        chip.remove();
      });

      $('#bAnswer').appendChild(chip);
    });

    box.appendChild(b);
  });
}

$('#bReset')?.addEventListener('click', renderB);

$('#bNext')?.addEventListener('click', () => {
  bi = (bi + 1) % builders.length;
  renderB();
});

$('#bCheck')?.addEventListener('click', () => {
  const x = builders[bi];
  const current = built.map((v) => v.w).join('|');
  const answer = x.ans.join('|');

  $('#bFeedback').textContent =
    current === answer
      ? '很好！句子順序正確。'
      : '還差一點。先找「誰」，再找「做什麼／在哪裡」。';
});

function renderC() {
  const x = challenges[ci];
  const choices = challengeChoices[ci];

  $('#cQ').textContent = `${ci + 1}. ${x.q}`;
  $('#cFeedback').textContent = '';

  const box = $('#cChoices');
  box.innerHTML = '';

  choices.options.forEach((o, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'choice';
    b.textContent = 'ABCD'[i] + '. ' + o;

    b.addEventListener('click', () => {
      [...box.children].forEach((el, j) => {
        el.disabled = true;
        if (j === choices.answerIndex) el.classList.add('good');
      });

      if (i !== choices.answerIndex) b.classList.add('bad');

      $('#cFeedback').textContent =
        i === choices.answerIndex
          ? '答對了。'
          : '再讀一次短文，找題目裡同樣的字。';
    });

    box.appendChild(b);
  });

  syncDisplay();
}

$('#cNext')?.addEventListener('click', () => {
  ci = (ci + 1) % challenges.length;
  if (ci === 0) challengeChoices = createBalancedChoices(challenges);
  renderC();
});

function syncDisplay() {
  const showZhuyin = $('#zt')?.checked ?? true;
  const showEnglish = $('#et')?.checked ?? false;

  $$('.zh').forEach((el) => {
    el.classList.toggle('hidden', !showZhuyin);
  });

  if ($('#qen')) {
    $('#qen').classList.toggle('hidden', !showEnglish);
  }
}

$('#zt')?.addEventListener('change', syncDisplay);
$('#et')?.addEventListener('change', syncDisplay);

function renderCoreWords() {
  const wg = $('#wordGrid');
  if (!wg) return;

  wg.innerHTML = '';

  core.forEach(([word, zhuyin, english]) => {
    const d = document.createElement('div');
    d.className = 'card';
    d.style.margin = '0';

    d.innerHTML = `
      <strong>${word}</strong>
      <div class="zh">${zhuyin}</div>
      <div class="muted">${english}</div>
    `;

    wg.appendChild(d);
  });

  syncDisplay();
}

renderCoreWords();
renderQ();
renderB();
renderC();
syncDisplay();