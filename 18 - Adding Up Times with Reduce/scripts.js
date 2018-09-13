const nodes = [...document.querySelectorAll('[data-time]')];
const times = nodes.map(node => node.dataset.time);

// get all the seconds
// then convert the time
const totalSecs = times
  .map(time => {
    const [mins, secs] = time.split(':').map(parseFloat);
    return (mins * 60) + secs;
  })
  .reduce((sum, secs) => sum+=secs);

  let secsLeft = totalSecs;
  const hours = Math.floor(totalSecs / 3600);
  secsLeft = secsLeft % 3600;

  const mins = Math.floor(secsLeft / 60);
  secsLeft = secsLeft % 60;

  console.log(hours, mins, secsLeft);
  