window.onload = init;

function init(){
  var body = document.querySelector('body');
  document.querySelectorAll('.pl-plus').forEach(function(elem){
    elem.onclick = toggleDrop;
  });
}

function toggleDrop(e){
  var frame = e.target.parentNode.parentNode;
  var opening = frame.classList.contains('pl-open');
  e.target.parentNode.parentNode.classList.toggle('pl-open');
  var frameWindow = e.target.parentNode.parentNode.querySelector('.pl-frame-window');
  console.log(frameWindow.style.maxHeight);
}
