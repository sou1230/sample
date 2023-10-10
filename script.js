// Delete_history();
// Delete_meal_datas();

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();
const YYYYMMDD = `${year}/${month}/${date}`;
const weekday = now.toLocaleDateString('ja', { weekday: 'long' });
let kinds = 0;

let id_count = localStorage.getItem("id_count");
if (id_count == null) id_count = 0;

if(!localStorage.getItem("version") || localStorage.getItem("version")!="1.3"){
  if(!confirm("最新バージョンへの更新準備が出来ました！\n更新しますか？(以前のデータの一部が消去されます。)")){
    window.close();
  }
  else{
    localStorage.setItem("version","1.3");
    Delete_history();
    Delete_meal_datas();
  }
}


const N_kind = 3;
const N_difficulty = 3;
const N_feature = 5;
const N_ingredient = 3;

const meal_detail =
  `
<fieldset>
    <legend>種類(必須)</legend>
    <label><input data-index="1" type="checkbox" name="kind" class="kind">和食</label>
    <label><input data-index="2" type="checkbox" name="kind" class="kind">洋食</label>
    <label><input data-index="3" type="checkbox" name="kind" class="kind">中華</label>
</fieldset>
<fieldset>
    <legend>大変さ(必須)</legend>
    <label><input data-index="1" type="checkbox" name="difficulty" class="difficulty">簡単</label>
    <label><input data-index="2" type="checkbox" name="difficulty" class="difficulty">お手軽</label>
    <label><input data-index="3" type="checkbox" name="difficulty" class="difficulty">本格</label>
</fieldset>
<fieldset>
    <legend>特徴</legend>
    <label><input data-index="1" type="checkbox" name="feature" >軽め</label>
    <label><input data-index="2" type="checkbox" name="feature" >重め</label>
    <label><input data-index="3" type="checkbox" name="feature" >特別</label>
    <label><input data-index="4" type="checkbox" name="feature" >弁当にプラス</label>
    <label><input data-index="5" type="checkbox" name="feature" >明日も食べられる</label>
</fieldset>
<fieldset>
    <legend><span class="use_or_not">\"使わない\"</span>材料</legend>
    <label><input data-index="1" type="checkbox" name="ingredient" >卵</label>
    <label><input data-index="2" type="checkbox" name="ingredient" >牛乳</label>
    <label><input data-index="3" type="checkbox" name="ingredient" >お米</label>
</fieldset>
`

class Meal {
  constructor(id, name, memo, kind, difficulty, feature, ingredient) {
    this.id = id;
    this.name = name;
    this.memo = memo;
    this.kind = kind;
    this.difficulty = difficulty;
    this.feature = feature;
    this.ingredient = ingredient;
    kinds++;
    console.log("コンストラクタ呼び出し：" + this.id + ":" + this.name);
  }
}

let meals = new Array(0);



// *********************************************
/*
  テストデータ
*/


let json_meal_data = localStorage.getItem('meal_datas');
let md = JSON.parse(json_meal_data);
if (md == null) {
  md = new Array(0)
}

console.log(md);

if (md != null) {
  console.log(md.length)
  for (let i = 0; i < md.length; i++) {
    Add_meal(md[i].id, md[i].name, md[i].memo, md[i].kind, md[i].difficulty, md[i].feature, md[i].ingredient);
  }
}

if (md.length <= 2) {
  Add_meal(
    0,
    "焼き鳥丼",
    "",
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 1]
  );

  Add_meal(
    1,
    "ホイコーロー",
    "",
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 1]
  );

  Add_meal(
    2,
    "麻婆豆腐",
    "",
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 1]
  );

  Add_meal(
    3,
    "シチュー",
    "",
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 1, 1]
  );

  Add_meal(
    4,
    "カレー",
    "",
    [1, 1, 0],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 1]
  );

  Add_meal(
    5,
    "生姜焼き",
    "",
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 1]
  );

  Add_meal(
    6,
    `チャーハン`,
    "",
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 0, 1]
  );

  Add_meal(
    7,
    "餃子",
    "",
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 1]
  );

  Add_meal(
    8,
    "ラーメン",
    "",
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0]
  );

  Add_meal(
    9,
    "つけ麺",
    "",
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0]
  );

  Add_meal(
    10,
    "焼きそば",
    "",
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0]
  );

  Add_meal(
    11,
    "うどん",
    "",
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0]
  );

  Add_meal(
    12,
    "そば",
    "",
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0]
  );

  Add_meal(
    13,
    "野菜炒め",
    "",
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 1]
  );

  Add_meal(
    14,
    "ハンバーグ",
    "",
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 1]
  );

  Add_meal(
    15,
    "野菜炒め",
    "",
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 1]
  );

  Add_meal(
    16,
    "鍋料理",
    "",
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 1]
  );
  localStorage.setItem("id_count",17);
  Save_meals();

}
// *********************************************

let json = localStorage.getItem('results');
results = JSON.parse(json);
if (results == null) results = [];

const set_kinds = document.getElementsByName("kind");
const set_difficulty = document.getElementsByName("difficulty");

Show_gacha();



document.querySelector(".page_gacha").addEventListener("click", function () {
  Show_gacha();
})
document.querySelector(".page_history").addEventListener("click", function () {
  Show_history();
})
document.querySelector(".page_add").addEventListener("click", function () {
  Show_add();
})
document.querySelector(".page_index").addEventListener("click", function () {
  Show_index();
})
document.querySelector(".page_note").addEventListener("click", function () {
  Show_note();
})


function Show_gacha() {
  Delete_page();

  document.querySelector(".contents_gacha").innerHTML =
    `
  <p>今日は <span class="date_today"></span></p>
  ${meal_detail}
  <button class="gacha">ガチャを回す</button>

  <div class="result"></div>
  <div class="link_to_site"></div>
  `;
  for (const element of document.getElementsByName('kind')) {
    element.checked = true;
  }
  for (const element of document.getElementsByName('difficulty')) {
    element.checked = true;
  }

  document.querySelector(".date_today").textContent = YYYYMMDD + " " + weekday;
  document.querySelector(".gacha").addEventListener("click", function () {
    let flag = false;
    let meals_processed = new Array(0);
    for (let i = 0; i < meals.length; i++) {
      let ok = true;
      let flag = false;
      for (let j = 0; j < meals[i].kind.length; j++) {
        let elems = document.getElementsByName("kind");
        if (elems[j].checked && meals[i].kind[j] == 1) flag = true;
      }
      if (flag == false) ok = false;
      flag = false;
      for (let j = 0; j < meals[i].difficulty.length; j++) {
        let elems = document.getElementsByName("difficulty");
        if (elems[j].checked && meals[i].difficulty[j] == 1) flag = true;
      }
      if (flag == false) ok = false;
      for (let j = 0; j < meals[i].feature.length; j++) {
        let elems = document.getElementsByName("feature");
        if (elems[j].checked && meals[i].feature[j] == 0) ok = false;
      }
      for (let j = 0; j < meals[i].ingredient.length; j++) {
        let elems = document.getElementsByName("ingredient");
        if (elems[j].checked && meals[i].ingredient[j] == 1) ok = false;
      }

      if (ok && meals[i].name != "[削除済みアイテム]") {
        meals_processed.push(meals[i]);
      }
    }
    if (meals_processed.length == 0) {
      alert("一致する料理がありません...");
    }
    else {
      let r = Math.floor(Math.random() * meals_processed.length);

      document.querySelector(".result").innerHTML = "今日の夕飯は...<br>";
      document.querySelector(".result").innerHTML += "<h2>＼" + meals_processed[r].name + "／</h2><br>";
      document.querySelector(".result").innerHTML += meals_processed[r].memo;

      document.querySelector(".gacha").textContent = `もう一度回す`;
      document.querySelector(".result").innerHTML += `
      <br><input type="submit" value="これに決定！" class="decide"><br><br>
      <a href="https://www.google.com/search?q=${meals_processed[r].name}">${meals_processed[r].name}を検索</a>
      `;

      document.querySelector(".decide").addEventListener("click", function () {

        if (window.localStorage) {
          results.push(meals_processed[r].id);
          console.log(results);
          let json = JSON.stringify(results, undefined, 1);
          localStorage.setItem('results', json);
          console.log(results);
        }

        if (confirm("決定しました！")) {
          Show_gacha();
        }
      }, false);

    }
  }, false);


}


function Show_history() {
  Delete_page();
  document.querySelector(".contents_history").innerHTML = `<h1>履歴</h1> <ul>`;
  for (let i = results.length - 1; i >= 0; i--) {
    if (meals[results[i]]) {
      document.querySelector(".contents_history").innerHTML += `<li>${meals[results[i]].name}</li>`;
    }
  }
  document.querySelector(".contents_history").innerHTML += `</ul>`;
  document.querySelector(".contents_history").innerHTML +=
    `
  <button class="reset_history">履歴削除</button>
  `;

  document.querySelector(".reset_history").addEventListener("click", function () {
    if (confirm("本当に削除しますか？(元には戻せません！)")) {
      Delete_history();
      Show_history();
    }
  });
}


function Show_add() {
  Delete_page();
  document.querySelector(".contents_add").innerHTML =
    `
  <h1>料理追加</h1>
  <p>料理名：</p><input type="text" name="meal_name" class="meal_name" placeholder="(例)ホイコーロー")>
  <p>メモ(任意)：</p><input type="text" name="meal_memo" class="meal_memo" placeholder="")>

  ${meal_detail}
  <button class="meal">追加</button>
  `;

  document.querySelector(".use_or_not").innerHTML = "\"使う\"";
  document.querySelector(".meal").addEventListener("click", function () {
    let elems;
    Add_meal(-1, "default", "memo", new Array(N_kind), new Array(N_difficulty), new Array(N_feature), new Array(N_ingredient));
    meals[meals.length - 1].id = id_count; id_count++; localStorage.setItem("id_count", id_count);
    let meal_name = document.querySelector(".meal_name").value;
    meals[meals.length - 1].name = meal_name;
    let meal_memo = document.querySelector(".meal_memo").value;
    meals[meals.length - 1].memo = meal_memo;
    elems = document.getElementsByName("kind");
    for (let i = 0; i < N_kind; i++) {
      if (elems[i].checked) meals[meals.length - 1].kind[i] = 1;
      else meals[meals.length - 1].kind[i] = 0;
    }
    elems = document.getElementsByName("difficulty");
    for (let i = 0; i < N_difficulty; i++) {
      if (elems[i].checked) meals[meals.length - 1].difficulty[i] = 1;
      else meals[meals.length - 1].difficulty[i] = 0;
    }
    elems = document.getElementsByName("feature");
    for (let i = 0; i < N_feature; i++) {
      if (elems[i].checked) meals[meals.length - 1].feature[i] = 1;
      else meals[meals.length - 1].feature[i] = 0;
    }
    elems = document.getElementsByName("ingredient");
    for (let i = 0; i < N_ingredient; i++) {
      if (elems[i].checked) meals[meals.length - 1].ingredient[i] = 1;
      else meals[meals.length - 1].ingredient[i] = 0;
    }

    Save_meals();

    alert("追加しました！");
    Show_add();
  });

}

function Show_index() {
  Delete_page();
  document.querySelector(".contents_index").innerHTML =
    `
  <h1>料理一覧</h1>
  <p>現在登録されている料理</p>
  <div class="meal_index"></div>
  <ul>
  `;
  console.log(meals)
  for (let i = 0; i < meals.length; i++) {
    if (meals[i].name != "[削除済みアイテム]") {
      document.querySelector(".meal_index").innerHTML += "<li>" + meals[i].name;
      document.querySelector(".meal_index").innerHTML += `<button class="btn_detail_${i}">詳細・編集</button> </li><br><br>`;
    }
  }

  document.querySelector(".meal_index").innerHTML += "</ul>";

  for (let i = 0; i < meals.length; i++) {
    if (meals[i].name != "[削除済みアイテム]") {
      document.querySelector(`.btn_detail_${i}`).addEventListener("click", function () {
        Show_detail(i);
      });
    }
  }

}

function Show_note() {
  Delete_page();

  // if(localStorage.getItem("note") == null){
  //   localStorage.setItem("note","");
  // }

  document.querySelector(".contents_note").innerHTML = `
  <h1>メモ帳</h1>
  <textarea name="note" class="note">${localStorage.getItem("note")}</textarea><br>
  自動で保存されます
  `;

  const textarea = document.querySelector('textarea');
  // キーが押されたとき
  textarea.addEventListener('keydown', () => {
    let spanedSec = 0;
    let id = setInterval(() => {
      spanedSec++;
      if (spanedSec >= 2) {
        clearInterval(id);
        let note_contents = document.querySelector(".note").value;
        localStorage.setItem("note", note_contents);
        console.log(note_contents);
      }
    }, 10);

  });

}

function Show_detail(n) {
  Delete_page();
  document.querySelector(".contents_detail").innerHTML =
    `
  <h1>${meals[n].name}</h1>
  <button class="back">戻る</button>
  <p>料理名：</p><input type="text" name="meal_name" class="meal_name" value="${meals[n].name}")>
  <p>メモ(任意)：</p><input type="text" name="meal_memo" class="meal_memo" value="${meals[n].memo}")>
  ${meal_detail}
  <button class="detail_update">更新</button>
  <button class="detail_delete">削除</button>
  `;

  for (let i = 0; i < N_kind; i++) {
    if (meals[n].kind[i])
      document.getElementsByName("kind")[i].checked = true;
  }
  for (let i = 0; i < N_difficulty; i++) {
    if (meals[n].difficulty[i])
      document.getElementsByName("difficulty")[i].checked = true;
  }
  for (let i = 0; i < N_feature; i++) {
    if (meals[n].feature[i])
      document.getElementsByName("feature")[i].checked = true;
  }
  for (let i = 0; i < N_ingredient; i++) {
    if (meals[n].ingredient[i])
      document.getElementsByName("ingredient")[i].checked = true;
  }

  document.querySelector(".detail_update").addEventListener("click", function () {
    let meal_name = document.querySelector(".meal_name").value;
    meals[n].name = meal_name;
    let meal_memo = document.querySelector(".meal_memo").value;
    meals[n].memo = meal_memo;
    elems = document.getElementsByName("kind");
    for (let i = 0; i < N_kind; i++) {
      if (elems[i].checked) meals[n].kind[i] = 1;
      else meals[n].kind[i] = 0;
    }
    elems = document.getElementsByName("difficulty");
    for (let i = 0; i < N_difficulty; i++) {
      if (elems[i].checked) meals[n].difficulty[i] = 1;
      else meals[n].difficulty[i] = 0;
    }
    elems = document.getElementsByName("feature");
    for (let i = 0; i < N_feature; i++) {
      if (elems[i].checked) meals[n].feature[i] = 1;
      else meals[n].feature[i] = 0;
    }
    elems = document.getElementsByName("ingredient");
    for (let i = 0; i < N_ingredient; i++) {
      if (elems[i].checked) meals[n].ingredient[i] = 1;
      else meals[n].ingredient[i] = 0;
    }
    meals;
    json = JSON.stringify(meals, undefined, 1);
    localStorage.setItem('meal_datas', json);

    alert("更新しました！");
    Show_index();
  });

  document.querySelector(".back").addEventListener("click", function () {
    Show_index();
  });

  document.querySelector(".detail_delete").addEventListener("click", function () {
    if (confirm("削除しますか？")) {
      meals[n].name = "[削除済みアイテム]";
      Show_index();
      Save_meals();
    }
  });
}

function Add_meal(id, name, memo, kind, difficulty, feature, ingredient) {
  meals.push(new Meal(id, name, memo, kind, difficulty, feature, ingredient));
}

function Delete_page() {
  document.querySelector(".contents_gacha").innerHTML = "";
  document.querySelector(".contents_history").innerHTML = "";
  document.querySelector(".contents_add").innerHTML = "";
  document.querySelector(".contents_index").innerHTML = "";
  document.querySelector(".contents_note").innerHTML = "";

  document.querySelector(".contents_detail").innerHTML = "";
}

function Delete_history() {
  localStorage.removeItem("results");
  let json = localStorage.getItem('results');
  results = JSON.parse(json);
  if (results == null) results = [];
  console.log(results);
}

function Delete_meal_datas() {
  localStorage.removeItem("meal_datas");
  let json = localStorage.getItem('meal_datas');
  let json_md = JSON.parse(json);
  if (json_md == null) json_md = [];
  console.log(json_md);
}

function Save_meals() {
  let json = JSON.stringify(meals, undefined, 1);
  localStorage.setItem('meal_datas', json);
}
