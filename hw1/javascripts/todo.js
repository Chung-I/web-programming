var inputText = document.getElementById('input-text');
var ul = document.getElementById('todo-list');
var toggles = ul.getElementsByClassName('toggle');
var toggleAll = document.getElementsByClassName("toggle-all").item(0);
var allButton = document.getElementById('all-button');
var activeButton = document.getElementById('active-button');
var completeButton = document.getElementById('complete-button');
var clearCompleted = document.getElementById('clear-complete');
var counter = document.getElementById('counter');

var updateCounts = function () {
  var counts = 0;
  for (var i = 0; i < toggles.length; i++) {
    if (!toggles.item(i).checked) counts++;
  }
  if (counts === 0) counter.innerHTML = 'no item';
  else if (counts === 1) counter.innerHTML = '1 item left';
  else counter.innerHTML = counts + ' items left';
};

var changeHref = function (self) {
  document.getElementsByClassName('selected')[0].classList.remove('selected');
  self.classList.add('selected');
}


var setByHref = function () {
  var hash = document.location.hash;
  if(hash === '#/') allButton.click();
  else if(hash === '#/active') activeButton.click();
  else if(hash === '#/completed') completeButton.click();
}

var itemEditDone = function (self) {
  var li = self.parentNode;
  li.classList.remove('editing');
  var label = li.getElementsByClassName('label')[0];
  if (self.value !== '') {
    label.innerHTML = self.value;
    if (li.hasChildNodes(self)) {
      li.removeChild(self);
    }
  } else {
    li.parentNode.removeChild(li);
  }
};

var addItem = function (str) {
  var li = document.createElement('li');
  li.className = '';
  ul.appendChild(li);

  var division = document.createElement('div');
  division.className = 'view';
  li.appendChild(division);

  var input = document.createElement('input');   //add input text area
  input.className = 'toggle';
  input.type = 'checkbox';
  division.appendChild(input);
  input.addEventListener('click', function () {
    if (li.classList.contains('completed')) {
      li.classList.remove('completed');
    } else {
      li.classList.add('completed');
    }
    setByHref();
    updateCounts();
  });

  var label = document.createElement('label');   // add label
  label.className = 'label';
  division.appendChild(label);
  label.innerHTML = str;

  var button = document.createElement('button'); // add delete button
  division.appendChild(button);
  button.className = 'destroy';
  button.addEventListener('click', function () {
    li.parentNode.removeChild(li);
    updateCounts();
  });

  var editInput = document.createElement('input');

  label.addEventListener('dblclick', function () {
    if (!(li.classList.contains('editing'))) {
      li.classList.add('editing');
      editInput.className = 'edit';
      editInput.value = label.innerHTML;
      li.appendChild(editInput);
      editInput.focus();
    }
  });

  editInput.addEventListener('blur', function () {
    if (this.parentNode.classList.contains('editing')) {
      itemEditDone(this);
    }
  });

  editInput.addEventListener('focus', function () {
    this.onkeydown = function (e) {
      if (!e) e = window.event;
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13 || keyCode === 27) {
        itemEditDone(this);
      }
    }
  });
  setByHref();
  updateCounts();
};

var setItemVisible = function (self) {
  self.style.display = '';
};

var setItemInvisible = function (self) {
  self.style.display = 'none';
};

allButton.addEventListener('click', function () {
  for (var i = 1; i < ul.childNodes.length; ++i) {
    setItemVisible(ul.childNodes[i]);
  }
  changeHref(this);
});

activeButton.addEventListener('click', function () {
  for (var i = 1; i < ul.childNodes.length; ++i) {
    if (ul.childNodes[i].classList.contains('completed')) {
      setItemInvisible(ul.childNodes[i]);
    } else {
      setItemVisible(ul.childNodes[i]);
    }
  }
  changeHref(this);
});

completeButton.addEventListener('click', function () {
  for (var i = 1; i < ul.childNodes.length; ++i) {
    if (ul.childNodes[i].classList.contains('completed')) {
      setItemVisible(ul.childNodes[i]);
    } else {
      setItemInvisible(ul.childNodes[i]);
    }
  }
  changeHref(this);
});

toggleAll.addEventListener('click', function () {
  var checkNum = 0;
  for (var i = 0; i < toggles.length; ++i) {
    if (!(toggles.item(i).checked)) {
      checkNum++;
      toggles.item(i).click();
    }
  }

  if (checkNum === 0) {
    for (var j = 0; j < toggles.length; ++j) {
      toggles.item(j).click();
    }
  }
});

clearCompleted.addEventListener('click', function () {
  for (var i = 1; i < ul.childNodes.length; ++i) {
    if (ul.childNodes[i].classList.contains('completed')) {
      ul.removeChild(ul.childNodes[i]);
      i = i - 1;
    }
  }
});

window.onload = function () {
  var hash = document.location.hash;
  setByHref();
  inputText.onkeypress = function (e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      var str = this.value;
      this.value = null;
      if (/\S/.test(str)) {
        addItem(str.trim());
      }
    }
  }
};
