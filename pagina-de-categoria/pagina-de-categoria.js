let mouseLastPosition = 0;
let lastPageX = 0;
let transformValue = 0;
window.addEventListener('mousedown', (e) => {
  moving = true;
  mouseLastPosition = e.pageX;
  transform = window.getComputedStyle(track)
  .getPropertyValue('transform') !== 'none'
  ? window.getComputedStyle(track)
  .getPropertyValue('transform').split(',')[4].trim()
  : 0;
});

window.addEventListener('mousemove', (e) => {
  if (moving) {
   const diffX =  e.pageX - mouseLastPosition;
   if (e.pageX - lastPageX > 0) {
     if (transformValue > 0) {
       return;
     }
   } else {
     if (Math.abs(transformValue) > track.offsetWidth - 320) {
       return;
     }
   }
    transformValue = parseInt(transform) + diffX;
    track.style.transform = `translateX(${transformValue}px)`;
  }
  lastPageX = e.pageX;
})

window.addEventListener('mouseup', () => {
  moving = false;
});


///////////////////////////


const track = document.querySelector('.track');
let initialPosition = null;
let moving = false;
let transform = 0;

const gestureStart = (e) => {
  initialPosition = e.pageX;
  moving = true;
  const transformMatrix = window.getComputedStyle(track).getPropertyValue('transform');
  if (transformMatrix !== 'none') {
    transform = parseInt(transformMatrix.split(',')[4].trim());
  }
}

const gestureMove = (e) => {
  if (moving) {
    const currentPosition = e.pageX;
    const diff = currentPosition - initialPosition;
    track.style.transform = `translateX(${transform + diff}px)`;  
  }
};

const gestureEnd = (e) => {
  moving = false;
}

if (window.PointerEvent) {
  window.addEventListener('pointerdown', gestureStart);

  window.addEventListener('pointermove', gestureMove);

  window.addEventListener('pointerup', gestureEnd);  
} else {
  window.addEventListener('touchdown', gestureStart);

  window.addEventListener('touchmove', gestureMove);

  window.addEventListener('touchup', gestureEnd);  
  
  window.addEventListener('mousedown', gestureStart);

  window.addEventListener('mousemove', gestureMove);

  window.addEventListener('mouseup', gestureEnd);  
}
