// todo temp

import test from 'tape-async';
import sleep from 'sleep-promise';
import 'babel-polyfill'; // http://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined

test('time warp', async(assert) => {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();

  const startTime = audioContext.currentTime;
  oscillator.start(startTime);
  //await sleep(1000);
  while ((audioContext.currentTime - startTime) < 1) {};
  console.log(audioContext.currentTime); // 1

  assert.end();
});



