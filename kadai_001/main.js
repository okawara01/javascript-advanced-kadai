// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield   = document.getElementById('typed');
const wrap         = document.getElementById('wrap');
const start        = document.getElementById('start');
const count        = document.getElementById('count');
const scoreDisplay = document.getElementById('score-display'); // ★ 追加：スコア表示

// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

// ランダムなテキストを表示
const createText = () => {
  typed = '';
  typedfield.textContent = typed;

  const random = Math.floor(Math.random() * textLists.length);
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// キー入力の判定（★ここに一本化）
const keyPress = e => {
  // 誤タイプ
  if (e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  // 正タイプ
  score++;                          // ★ 加点
  scoreDisplay.textContent = score; // ★ スコア反映

  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent   = typed;
  untypedfield.textContent = untyped;

  // テキストを打ち切ったら次へ
  if (untyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
  let text = '';
  if (score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if (score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else {
    text = `あなたのランクはSです。\nおめでとうございます!`;
  }
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了（★タイムアップ表示→10ms後に判定）
const gameOver = id => {
  clearInterval(id);

  // 指定：タイピングエリア（グレー部分）に表示
  typedfield.textContent   = '';
  untypedfield.textContent = 'タイムアップ！';

  setTimeout(() => {
    const result = confirm(rankCheck(score));
    if (result === true) {
      window.location.reload();
    }
  }, 10);
};

// カウントダウンタイマー
const timer = () => {
  let time = Number(count.textContent);

  const id = setInterval(() => {
    time--;
    count.textContent = time;

    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {
  // リセット
  score = 0;
  scoreDisplay.textContent = score; // ★開始時に0で初期化

  // カウントダウン・初期テキスト
  timer();
  createText();

  // スタートボタンを非表示
  start.style.display = 'none';

  // キーボードイベント（★一度だけ登録）
  document.addEventListener('keypress', keyPress, { once: false });
});

// 初期表示
untypedfield.textContent = 'スタートボタンで開始';
