function textChangeListener(e) {
  let id = e.target.id;
  let text = e.target.value;

  if (id == 'topLineText') {
    window.topLineText = text;
  } else {
    window.bottomLineText = text;
  }

  redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function redrawMeme(image, topLine, bottomLine) {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  if (image != null) {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }

  ctx.font = '36pt Impact';
  ctx.textAlign = 'center';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'white';

  if (topLine != null) {
    ctx.fillText(topLine, canvas.width / 2, 40);
    ctx.strokeText(topLine, canvas.width / 2, 40);
  }

  if (bottomLine != null) {
    ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
  }
}

function saveFile() {
  window.open(document.querySelector('canvas').toDataURL());
}

function handleFileSelect(e) {
  let canvasWidth = 500;
  let canvasHeight = 500;
  let file = e.target.files[0];

  let reader = new FileReader();
  reader.onload = function(fileObject) {
    let data = fileObject.target.result;

    let image = new Image();
    image.onload = function() {
      window.imageSrc = this;
      redrawMeme(window.imageSrc, null, null);
    };
    image.src = data;
    console.log(fileObject.target.result);
  };
  reader.readAsDataURL(file);
}

window.topLineText = '';
window.bottomLineText = '';
const input1  = document.querySelector('#topLineText');
const input2  = document.querySelector('#bottomLineText');
input1.addEventListener('input', textChangeListener);
input2.addEventListener('input', textChangeListener);
document.querySelector('#file').addEventListener('change', handleFileSelect, false);
document.querySelector('#saveBtn').addEventListener('click', saveFile, false);