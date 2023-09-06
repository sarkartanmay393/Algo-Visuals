import { useState } from "react";
import "./index.css";

export default function BubbleSort() {
  const [speed, setSpeed] = useState(50);

  let arr = [];
  let soundCtx = null;
  window.onload = () => populateArray();

  const renderBars = (indices) => {
    const container = document.getElementById("container");
    container.innerHTML = "";
    arr.forEach((num, idx) => {
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = `${num * 100}%`;
      if (indices && indices.includes(idx)) {
        bar.style.backgroundColor = "red";
      }
      container.appendChild(bar);
    });
  };

  const populateArray = () => {
    for (let i = 0; i < 19; i++) {
      arr[i] = Math.random();
    }
    renderBars();
  };

  const sort = () => {
    let copy = [...arr];
    const swaps = bubbleSort(copy);
    animate(swaps);
  };

  const animate = (swaps) => {
    if (swaps.length === 0) {
      return;
    }

    let [i, j] = swaps.shift();
    [arr[i], arr[j]] = [arr[j], arr[i]];

    playNote(200 + arr[i] * 500);

    renderBars([i, j]);
    setTimeout(() => {
      animate(swaps);
    }, speed);
  };

  const bubbleSort = (arr) => {
    let swaps = [];
    let swapped;
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 1; j < arr.length; j++) {
        if (arr[j] < arr[j - 1]) {
          swaps.push([j, j - 1]);
          [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
          swapped = true;
        }
      }
      if (!swapped) {
        break;
      }
    }
    return swaps;
  };

  const playNote = (freq) => {
    if (soundCtx == null) {
      soundCtx = new (AudioContext || window.webkitAudioContext)();
    }
    const duration = 0.1;
    const oscillator = soundCtx.createOscillator();
    oscillator.frequency.value = freq;
    oscillator.start();
    oscillator.stop(soundCtx.currentTime + duration);

    const gainNode = soundCtx.createGain();
    gainNode.gain.value = 0.1;
    gainNode.gain.linearRampToValueAtTime(0, soundCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(soundCtx.destination);
  };

  // const handleSpeed = () => {
  //   switch (speed) {
  //     default:
  //       setSpeed(50);
  //       break;
  //     case 50:
  //       setSpeed(100);
  //       break;
  //     case 100:
  //       setSpeed(50);
  //       break;
  //   }
  // };

  return (
    <>
      <div id="container"></div>
      <div className="button-group">
        <button className="btn" onClick={populateArray}>
          Reset
        </button>
        {/* <button className="btn" onClick={handleSpeed}>
          {speed == 50 ? "Fast" : "Slow"}
        </button> */}
        <button className="btn" onClick={sort}>
          Sort
        </button>
      </div>
    </>
  );
}
