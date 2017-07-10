

// TODO: element and prop objects that so you don't have to ref so much


window.onload = init;

function init(){
  var body = document.getElementsByTagName('body');
  var draggiePanel = new Draggabilly('#pl-panel', {handle:'.pl-panel-header', containment:true});
  // forAll('.pl-frame', function(elem){
  //   var draggieHead = new Draggabilly(elem, {handle:'.pl-header .fa-bars', containment:true, axis:'y'});
  //
  //   draggieHead.on('pointerDown', keyReorder);
  //   draggieHead.on('dragMove', keyReorder);
  // });

  // document.querySelectorAll('.pl-plus').forEach(function(elem){
  //   elem.onclick = toggleDrop;
  // });
  // forAll('.pl-header', function(elem){
  //   elem.onclick = reorder;
  // });
  // document.addEventListener('mousemove', drag);
  // forAll('.pl-draggable', function(elem){
  //   elem.onmousedown = function(){ this.classList.add('pl-dragging'); };
  //   elem.onmouseup = function(){ this.classList.remove('pl-dragging'); };
  // });
  // forAll('.pl-header .fa-bars', function(elem){
  //   elem.onmousedown = function(){
  //     console.log('bar');
  //     document.getElementById('pl-panel').onmousemove = function(e){
  //       keyReorder(e);
  //     };
  //   };
  // });
  document.getElementById('pl-container').onmouseup = function(){
    document.getElementById('pl-panel').onmousemove = null;
    keyReorder.initElem = undefined;
    keyReorder.deltaY = undefined;
  };
  forAll('.pl-header-buttons .fa-bars', function(elem){
    elem.onmousedown = function(){
      console.log('bar');
      document.getElementById('pl-panel').onmousemove = function(e){
        keyReorder(e);
      };
      var frames = elem.parentNode.parentNode.parentNode.parentNode.children;
      for(var i=0; i<frames.length; i++){
        if(frames[i].classList.contains('pl-open')) toggleDrop.call(frames[i]);
      }
    };
  });
  forAll('.pl-header-buttons .fa-plus', function(elem){
    elem.onclick = toggleDrop;
  });
  forAll('.pl-slider', function(elem){
    elem.onmousedown = sliderTrack;
    elem.onmouseup = sliderUntrack;
    elem.onmouseleave = sliderUntrack;
  });
  forAll('.pl-frame-title input', function(elem){
    elem.oninput = changeTitle;
  });
}

// function keyReorder() {
//   var frame = this.element;
//   var height = parseInt(window.getComputedStyle(frame).getPropertyValue('height'));
//   var mod = this.position.y % height;
//   var nomod = (this.position.y - mod) / height;
//   console.log(this.element.style.top);
//   if(mod > height/2){
//     if(frame.nextSibling){
//       swapElem(frame, frame.nextSibling);
//       this.position.y = 0;
//       // console.log(this.position.y);
//     }
//     // console.log('move down');
//   }
//   else if(mod < -height/2){
//     if(frame.previousSibling){
//       swapElem(frame.previousSibling, frame);
//       this.position.y = 0;
//       // console.log(this.position.y);
//     }
//     // console.log('move up');
//   }
//   // console.log(this.position.y % height, (this.position.y-(this.position.y%height)) / height);
// }
//
// function keySettle() {
//
// }

function keyReorder(e) {
  if(keyReorder.initElem===undefined){
  }
  // if(keyReorder.initElem===undefined) keyReorder.initElem = e.target;
  // console.log(e.target !== keyReorder.initElem
  //   && e.target !== keyReorder.initElem.parentNode
  //   && e.target !== keyReorder.initElem.parentNode.parentNode);
  // console.log(keyReorder.initElem, e.target);
  // console.log(keyReorder.initElem, keyReorder.initElem.parentNode, keyReorder.initElem.parentNode.parentNode);
  // var frame = keyReorder.initElem.parentNode.parentNode.parentNode;
  // console.log(isOrIsChild(frame, keyReorder.initElem));
  console.log(e);
}

function swapElem(first, second) {
  document.getElementById('pl-frames-wrapper').insertBefore(second, first);
}

function isOrIsChild(parent, target) {
  if(parent === target) return true;
  var children = parent.children;
  for(var i=0; i<children.length; i++){
    if(children[i] === target) return true;
    if(children[i].children.length > 0){
      if(isOrIsChild(children[i], target)) return true;
    }
  }
  return false;
}

function drag(e) {
  forAll('.pl-dragging', function(e){
    if (drag.lastX === undefined){
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      var panel = document.querySelector('#pl-panel');
      drag.lastLeft = panel.style.left = panel.getBoundingClientRect().left+'px';
      drag.lastTop = panel.style.top = panel.getBoundingClientRect().top+'px';
      console.log(drag.lastLeft, drag.lastTop);
      return;
    }
    var deltaX = e.clientX - drag.lastX;
    var deltaY = e.clientY - drag.lastY;
    var panel = document.querySelector('#pl-panel');
    console.log(panel.style.left, panel.style.top);
    panel.style.left = parseInt(panel.style.left)+deltaX+'px';
    panel.style.top = parseInt(panel.style.top)+deltaY+'px';
    drag.lastX = e.clientX;
    drag.lastY = e.clientY;
  });
}

function sliderTrack(e) {
  this.onmousemove = sliderAdjust;
  sliderAdjust.call(this, e);
}

function sliderUntrack() {
  this.onmousemove = null;
}

function sliderAdjust(e){
  var left = this.getBoundingClientRect().left;
  var indicator = this.querySelector('.pl-slider-indicator');
  var width = parseInt(window.getComputedStyle(this, null).getPropertyValue('width'));
  var slideWidth = parseInt(window.getComputedStyle(indicator,null).getPropertyValue('width'));
  this.pct = slideWidth/width;
  var indWidth = e.clientX-left;
  indWidth = indWidth < 0 ? 0 : indWidth > width ? width : indWidth;
  indicator.style.width = e.clientX-left+'px';

}

function changeTitle() {
  this.previousSibling.textContent = this.value;
}

function dragstart(e) {
  // make trash thing appear to delete frames
  var elem = e.target;
  if(elem.classList.contains('pl-header') && !elem.classList.contains('pl-panel-header')){
    console.log(elem);
  }
}

function reorder() {
  var frame = this.parentNode.parentNode.parentNode;
  if(frame.classList.contains('pl-open')) toggleDrop.call(this);
}

function toggleDrop(){
  if(this.classList.contains('pl-frame')) var frame = this;
  else var frame = this.parentNode.parentNode.parentNode;
  var closing = frame.classList.contains('pl-open');
  frame.classList.toggle('pl-open');
  var frameWindow = frame.querySelector('.pl-frame-window');
  if(closing) frameWindow.style.maxHeight = '0px';
  else  frameWindow.style.maxHeight = (frameWindow.children.length * 40)+'px';
}


function forAll(query, callback){
  document.querySelectorAll(query).forEach(function(elem){callback(elem)});
}
