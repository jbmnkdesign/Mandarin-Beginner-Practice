const qs=[
  {q:'「我有一隻狗。」有 是什麼意思？',z:'ㄨㄛˇ ㄧㄡˇ ㄧˋ ㄓ ㄍㄡˇ',en:'What does 有 mean?',o:['have','want','go','see'],a:0,h:'想想「有」和「沒有」的相反意思。',w:'有 = have。'},
  {q:'哪一句是「I do not have a cat」？',z:'',en:'Choose the sentence that means “I do not have a cat.”',o:['我有貓。','我沒有貓。','我喜歡貓。','我看貓。'],a:1,h:'找「沒有」。',w:'沒有 = do not have。'},
  {q:'書在背包裡面。書在哪裡？',z:'ㄕㄨ ㄗㄞˋ ㄅㄟ ㄅㄠ ㄌㄧˇ ㄇㄧㄢˋ',en:'Where is the book?',o:['背包裡面','背包外面','桌子上面','椅子下面'],a:0,h:'看句子最後的方位詞。',w:'裡面 = inside。'},
  {q:'「我喜歡吃飯。」喜歡 是什麼意思？',z:'ㄨㄛˇ ㄒㄧˇ ㄏㄨㄢ ㄔ ㄈㄢˋ',en:'What does 喜歡 mean?',o:['like','drink','have','come'],a:0,h:'想想 “I like...”',w:'喜歡 = like。'}
];

const builders=[
  {p:'I have a dog.',words:['我','有','一隻','狗'],ans:['我','有','一隻','狗']},
  {p:'The book is inside the backpack.',words:['書','在','背包','裡面'],ans:['書','在','背包','裡面']},
  {p:'I also like cats.',words:['我','也','喜歡','貓'],ans:['我','也','喜歡','貓']},
  {p:'I want to drink water.',words:['我','想','喝','水'],ans:['我','想','喝','水']}
];

const challenges=[
  {q:'狗在哪裡？',o:['桌子下面','桌子上面','椅子上面','背包裡面'],a:0},
  {q:'貓在哪裡？',o:['椅子上面','桌子下面','背包裡面','外面'],a:0},
  {q:'誰喜歡狗？',o:['小明','妹妹','貓','狗'],a:0},
  {q:'妹妹喜歡什麼？',o:['貓','狗','書','水'],a:0}
];

const core=[['有','ㄧㄡˇ','have'],['沒有','ㄇㄟˊ ㄧㄡˇ','do not have'],['在','ㄗㄞˋ','be at / in'],['喜歡','ㄒㄧˇ ㄏㄨㄢ','like'],['想','ㄒㄧㄤˇ','want'],['去','ㄑㄩˋ','go'],['來','ㄌㄞˊ','come'],['看','ㄎㄢˋ','look/watch'],['吃','ㄔ','eat'],['喝','ㄏㄜ','drink'],['大','ㄉㄚˋ','big'],['小','ㄒㄧㄠˇ','small']];

const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
function shuffle(items){
  const result=[...items];
  for(let index=result.length-1;index>0;index--){
    const swapIndex=Math.floor(Math.random()*(index+1));
    [result[index],result[swapIndex]]=[result[swapIndex],result[index]];
  }
  return result;
}

let qi=0,bi=0,built=[],ci=0;

function renderChoices(container,options,answerIndex,onAnswer){
  container.innerHTML='';
  options.forEach((option,index)=>{
    const button=document.createElement('button');
    button.className='choice';
    button.textContent='ABCD'[index]+'. '+option;
    button.addEventListener('click',()=>{
      if(button.disabled)return;
      [...container.children].forEach((choice,choiceIndex)=>{
        choice.disabled=true;
        if(choiceIndex===answerIndex)choice.classList.add('good');
      });
      if(index!==answerIndex)button.classList.add('bad');
      onAnswer(index===answerIndex);
    });
    container.appendChild(button);
  });
}

function setMode(mode){
  ['quiz','builder','challenge','review'].forEach(id=>$('#'+id).classList.toggle('hidden',id!==mode));
  $$('.tab').forEach(button=>button.classList.toggle('active',button.dataset.mode===mode));
  if(mode==='builder')renderB();
  if(mode==='challenge')renderC();
}

$$('.tab').forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.mode)));

function renderQ(){
  const question=qs[qi];
  $('#qnum').textContent=`第 ${qi+1} 題 / ${qs.length}`;
  $('#qtext').textContent=question.q;
  $('#qzh').textContent=question.z;
  $('#qen').textContent=question.en;
  $('#feedback').textContent='';
  $('#hint').classList.add('hidden');
  $('#nextBtn').disabled=true;
  renderChoices($('#choices'),question.o,question.a,()=>{
    $('#feedback').textContent=question.w;
    $('#nextBtn').disabled=false;
  });
}

$('#nextBtn').addEventListener('click',()=>{qi=(qi+1)%qs.length;renderQ()});
$('#hintBtn').addEventListener('click',()=>{
  $('#hint').textContent=qs[qi].h;
  $('#hint').classList.remove('hidden');
});

function renderB(){
  const sentence=builders[bi];
  built=[];
  $('#bPrompt').textContent=sentence.p;
  $('#bAnswer').innerHTML='';
  $('#bFeedback').textContent='';
  const box=$('#bWords');
  box.innerHTML='';
  shuffle(sentence.words.map(word=>({word}))).forEach(item=>{
    const button=document.createElement('button');
    button.className='word';
    button.textContent=item.word;
    button.addEventListener('click',()=>{
      if(button.classList.contains('used'))return;
      button.classList.add('used');
      built.push(item);
      const answerButton=document.createElement('button');
      answerButton.className='word';
      answerButton.textContent=item.word;
      answerButton.addEventListener('click',()=>{
        built=built.filter(word=>word!==item);
        button.classList.remove('used');
        answerButton.remove();
      });
      $('#bAnswer').appendChild(answerButton);
    });
    box.appendChild(button);
  });
}

$('#bReset').addEventListener('click',renderB);
$('#bNext').addEventListener('click',()=>{bi=(bi+1)%builders.length;renderB()});
$('#bCheck').addEventListener('click',()=>{
  const sentence=builders[bi];
  $('#bFeedback').textContent=built.map(item=>item.word).join('|')===sentence.ans.join('|')
    ?'很好！句子順序正確。'
    :'還差一點，再想想中文通常先說「誰」，再說「做什麼／在哪裡」。';
});

function renderC(){
  const challenge=challenges[ci];
  $('#cQ').textContent=(ci+1)+'. '+challenge.q;
  $('#cFeedback').textContent='';
  renderChoices($('#cChoices'),challenge.o,challenge.a,isCorrect=>{
    $('#cFeedback').textContent=isCorrect?'答對了。':'再讀一次短文找關鍵詞。';
  });
}

$('#cNext').addEventListener('click',()=>{ci=(ci+1)%challenges.length;renderC()});

$('#zt').addEventListener('change',()=>$$('.zh').forEach(element=>element.classList.toggle('hidden',!$('#zt').checked)));
$('#et').addEventListener('change',()=>$('#qen').classList.toggle('hidden',!$('#et').checked));

core.forEach(([word,zhuyin,english])=>{
  const item=document.createElement('div');
  item.className='card';
  const wordElement=document.createElement('strong');
  wordElement.textContent=word;
  const zhuyinElement=document.createElement('div');
  zhuyinElement.className='zh';
  zhuyinElement.textContent=zhuyin;
  const translationElement=document.createElement('div');
  translationElement.className='muted';
  translationElement.textContent=english;
  item.append(wordElement,zhuyinElement,translationElement);
  $('#wordGrid').appendChild(item);
});

renderQ();
renderB();
renderC();