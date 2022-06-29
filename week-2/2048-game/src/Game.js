import { forwardRef, useEffect, useState, useImperativeHandle } from "react";

import "./Game.css";

let blocked = false;
let new_state = [];
let childData = 0;

const colorMap = new Map([
  ["", "#ccc0b3"],
  ["2", "#776e65"],
  ["4", "#776e65"],
  ["8", "#f9f6f2"],
  ["16", "#f9f6f2"],
  ["32", "#f9f6f2"],
  ["64", "#f9f6f2"],
  ["128", "#f9f6f2"],
  ["256", "#f9f6f2"],
  ["512", "#f9f6f2"],
  ["1024", "#f9f6f2"],
  ["2048", "#f9f6f2"],
]);

const bgColorMap = new Map([
  ["", "#ccc0b3"],
  ["2", "#eee4da"],
  ["4", "#ede0c8"],
  ["8", "#f2b179"],
  ["16", "#f59563"],
  ["32", "#f67c5f"],
  ["64", "#f65e3b"],
  ["128", "#edcf72"],
  ["256", "#edcc61"],
  ["512", "#edc850"],
  ["1024", "#edc53f"],
  ["2048", "#edc22e"],
]);

function populateGrid() {
  let temp_state = [];
  let randomNum1 = Math.floor(Math.random() * 16);
  let randomNum2 = Math.floor(Math.random() * 16);
  while (randomNum2 === randomNum1) {
    randomNum2 = Math.floor(Math.random() * 16);
  }
  for (let i = 0; i < 16; i++) {
    if (i === randomNum1 || i === randomNum2) {
      temp_state.push("2");
    } else temp_state.push("");
  }
  console.log("temp_state : ", temp_state);
  return temp_state;
}

function isValid(r, c) {
  if (r < 0 || r >= 4) return false;
  if (c < 0 || c >= 4) return false;
  return true;
}

function generateNewGrid(props, type, state) {
  childData = 0;
  if (type === 1) {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        let orig_index = r * 4 + c;
        let prev_r = r - 1;
        let prev_c = c;
        if (!isValid(prev_r, prev_c)) {
          continue;
        }
        while (isValid(prev_r, prev_c)) {
          let index = prev_r * 4 + prev_c;
          if (new_state[index] === "") {
            prev_r--;
          } else break;
        }
        if (!isValid(prev_r, prev_c)) {
          let final_r = prev_r + 1;
          let final_c = prev_c;
          let final_index = final_r * 4 + final_c;
          if (final_index === orig_index) continue;
          new_state[final_index] = new_state[orig_index];
          new_state[orig_index] = "";
        } else {
          let temp_index = prev_r * 4 + prev_c;
          if (new_state[temp_index] === new_state[orig_index]) {
            childData += 2 * parseInt(new_state[temp_index]);
            new_state[temp_index] = 2 * parseInt(new_state[temp_index]) + "*";
            new_state[orig_index] = "";
          } else {
            let final_r = prev_r + 1;
            let final_c = prev_c;
            let final_index = final_r * 4 + final_c;
            if (final_index === orig_index) continue;
            new_state[final_index] = new_state[orig_index];
            new_state[orig_index] = "";
          }
        }
      }
    }
  }
  if (type === 2) {
    for (let r = 3; r >= 0; r--) {
      for (let c = 0; c < 4; c++) {
        let orig_index = r * 4 + c;
        let prev_r = r + 1;
        let prev_c = c;
        if (!isValid(prev_r, prev_c)) {
          continue;
        }
        while (isValid(prev_r, prev_c)) {
          let index = prev_r * 4 + prev_c;
          if (new_state[index] === "") {
            prev_r++;
          } else break;
        }
        if (!isValid(prev_r, prev_c)) {
          let final_r = prev_r - 1;
          let final_c = prev_c;
          let final_index = final_r * 4 + final_c;
          if (final_index === orig_index) continue;
          new_state[final_index] = new_state[orig_index];
          new_state[orig_index] = "";
        } else {
          let temp_index = prev_r * 4 + prev_c;
          if (new_state[temp_index] === new_state[orig_index]) {
            childData += 2 * parseInt(new_state[temp_index]);
            new_state[temp_index] = 2 * parseInt(new_state[temp_index]) + "*";
            new_state[orig_index] = "";
          } else {
            let final_r = prev_r - 1;
            let final_c = prev_c;
            let final_index = final_r * 4 + final_c;
            if (final_index === orig_index) continue;
            new_state[final_index] = new_state[orig_index];
            new_state[orig_index] = "";
          }
        }
      }
    }
  }
  if (type === 3) {
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 4; r++) {
        let orig_index = r * 4 + c;
        let prev_r = r;
        let prev_c = c - 1;
        if (!isValid(prev_r, prev_c)) {
          continue;
        }
        while (isValid(prev_r, prev_c)) {
          let index = prev_r * 4 + prev_c;
          if (new_state[index] === "") {
            prev_c--;
          } else break;
        }
        if (!isValid(prev_r, prev_c)) {
          let final_r = prev_r;
          let final_c = prev_c + 1;
          let final_index = final_r * 4 + final_c;
          if (final_index === orig_index) continue;
          new_state[final_index] = new_state[orig_index];
          new_state[orig_index] = "";
        } else {
          let temp_index = prev_r * 4 + prev_c;
          if (new_state[temp_index] === new_state[orig_index]) {
            childData += 2 * parseInt(new_state[temp_index]);
            new_state[temp_index] = 2 * parseInt(new_state[temp_index]) + "*";
            new_state[orig_index] = "";
          } else {
            let final_r = prev_r;
            let final_c = prev_c + 1;
            let final_index = final_r * 4 + final_c;
            if (final_index === orig_index) continue;
            new_state[final_index] = new_state[orig_index];
            new_state[orig_index] = "";
          }
        }
      }
    }
  }
  if (type === 4) {
    for (let c = 3; c >= 0; c--) {
      for (let r = 0; r < 4; r++) {
        let orig_index = r * 4 + c;
        let prev_r = r;
        let prev_c = c + 1;
        if (!isValid(prev_r, prev_c)) {
          continue;
        }
        while (isValid(prev_r, prev_c)) {
          let index = prev_r * 4 + prev_c;
          if (new_state[index] === "") {
            prev_c++;
          } else break;
        }
        if (!isValid(prev_r, prev_c)) {
          let final_r = prev_r;
          let final_c = prev_c - 1;
          let final_index = final_r * 4 + final_c;
          if (final_index === orig_index) continue;
          new_state[final_index] = new_state[orig_index];
          new_state[orig_index] = "";
        } else {
          let temp_index = prev_r * 4 + prev_c;
          if (new_state[temp_index] === new_state[orig_index]) {
            childData += 2 * parseInt(new_state[temp_index]);
            new_state[temp_index] = 2 * parseInt(new_state[temp_index]) + "*";
            new_state[orig_index] = "";
          } else {
            let final_r = prev_r;
            let final_c = prev_c - 1;
            let final_index = final_r * 4 + final_c;
            if (final_index === orig_index) continue;
            new_state[final_index] = new_state[orig_index];
            new_state[orig_index] = "";
          }
        }
      }
    }
  }
  let emptyIndices = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let idx = r * 4 + c;
      if (new_state[idx].charAt(new_state[idx].length - 1) === "*") {
        new_state[idx] = new_state[idx].slice(0, -1);
      }
      if (new_state[idx] === "") {
        emptyIndices.push(idx);
      }
    }
  }
  if (emptyIndices.length === 0) {
    blocked = true;
    props.gameOver();
  }
  let randomIndex = Math.floor(Math.random() * emptyIndices.length);
  new_state[emptyIndices[randomIndex]] = "2";
}

function changeColor() {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let selector = r + "-" + c;
      let index = r * 4 + c;
      let content = new_state[index];
      let color = colorMap.get(content);
      let bgColor = bgColorMap.get(content);
      document.getElementsByClassName(selector)[0].style.color = color;
      document.getElementsByClassName(selector)[0].style.background = bgColor;
    }
  }
}

const Game = forwardRef((props, ref) => {
  const [state, setState] = useState(populateGrid());

  new_state = [...state];

  useImperativeHandle(ref, () => ({
    newGame() {
      blocked = false;
      new_state = [];
      new_state = populateGrid();
      setState(new_state);
      console.log("new_state : ", [...state]);
      changeColor();
    },
  }));

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  useEffect(() => {
    changeColor();
  }, []);

  const detectKeyDown = (e) => {
    if (blocked) return;
    switch (e.key) {
      case "ArrowUp":
        generateNewGrid(props, 1, state);
        break;
      case "ArrowDown":
        generateNewGrid(props, 2, state);
        break;
      case "ArrowLeft":
        generateNewGrid(props, 3, state);
        break;
      case "ArrowRight":
        generateNewGrid(props, 4, state);
        break;
      default:
    }
    props.parentCallback(childData);
    setState(new_state);
    changeColor();
  };

  return (
    <div className="container">
      <div className="grid">
        <div className="0-0">{state[0]}</div>
        <div className="0-1">{state[1]}</div>
        <div className="0-2">{state[2]}</div>
        <div className="0-3">{state[3]}</div>
        <div className="1-0">{state[4]}</div>
        <div className="1-1">{state[5]}</div>
        <div className="1-2">{state[6]}</div>
        <div className="1-3">{state[7]}</div>
        <div className="2-0">{state[8]}</div>
        <div className="2-1">{state[9]}</div>
        <div className="2-2">{state[10]}</div>
        <div className="2-3">{state[11]}</div>
        <div className="3-0">{state[12]}</div>
        <div className="3-1">{state[13]}</div>
        <div className="3-2">{state[14]}</div>
        <div className="3-3">{state[15]}</div>
      </div>
    </div>
  );
});

export default Game;
