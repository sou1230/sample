let history = new Array(0); // 出した手を順番に格納
let data = {}; // 3*3=27種類の3要素配列
let my_hand;
let results = [0, 0, 0]; // 勝、分、負

document.querySelector("#G").addEventListener("click", function () {
  Janken();
  Record_hand(0);
});

document.querySelector("#C").addEventListener("click", function () {
  Janken();
  Record_hand(1);
});

document.querySelector("#P").addEventListener("click", function () {
  Janken();
  Record_hand(2);
});


for (let a = 0; a < 3; a++) {
  for (let b = 0; b < 3; b++) {
    for (let c = 0; c < 3; c++) {
      let pt = a.toString() + b.toString() + c.toString();
      data[pt] = new Array(3);
      for (let i = 0; i < 3; i++) {
        data[pt][i] = 0;
      }
    }
  }
}


function Janken() {

  if (history.length >= 4) {
    let max = 0;
    my_hand = 1;
    for (let i = 0; i < 3; i++) {
      if (data[past_three(0)][i] > max) {
        max = data[past_three(0)][i];
        my_hand = (i + 2) % 3;
      }
    }
  } else {
    my_hand = Math.floor(Math.random() * 3);
  }

  document.querySelector("#my_hand").textContent = number_to_hand(my_hand);

}


function number_to_hand(num) {
  if (num == 0 || num == "0") return "グー";
  else if (num == 1 || num == "1") return "チョキ";
  else if (num == 2 || num == "2") return "パー";
  console.log("number_to_hand 引数: " + num);
  return "Error";
}


function Record_hand(hand) {

  history.push(hand);
  console.log(history.length);

  if (history.length >= 4) {
    data[past_three(1)][hand]++;
    console.log(past_three(1) + "=>" + hand + ":" + data[past_three(1)][hand]);
  }

  if ((3 + hand - my_hand) % 3 == 2) {
    document.querySelector("#result").textContent = "勝ち！！";
    results[0]++;
  }
  else if ((3 + hand - my_hand) % 3 == 0) {
    document.querySelector("#result").textContent = "引き分け";
    results[1]++;
  }
  else if ((3 + hand - my_hand) % 3 == 1) {
    document.querySelector("#result").textContent = "負け...";
    results[2]++;
  }
  else{
    document.querySelector("#result").textContent = "Error";
    console.log("hand:" + hand + "my_hand" + my_hand);
  }

  document.querySelector("#match_history").textContent = "\n" + results[0] + "勝" + results[1] + "分" + results[2] + "負";
}

function past_three(param){
  let hl = history.length - param;
  return history[hl - 3].toString() + history[hl - 2].toString() + history[hl - 1].toString();
}
