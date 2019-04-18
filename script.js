'use strict';
(function(window) {
  let rowIndex, colIndex;//Индексы спрятаных ячеек

  const box = document.querySelector('.sTable');
  const table = box.querySelector('table');
  const addRowButton = box.querySelector('.addRow');
  const addColButton = box.querySelector('.addCol');
  const delRowButton = box.querySelector('.delRow');
  const delColButton = box.querySelector('.delCol');

  //просмотр событий
  table.addEventListener('mouseenter', pointerMouseEnter);
  box.addEventListener('mouseleave', pointerMouseLeave);
  table.addEventListener('mousemove', pointerMouseMove);
  addRowButton.addEventListener('click', addRow);
  addColButton.addEventListener('click', addColumn);
  delRowButton.addEventListener('click', deleteRow);
  delColButton.addEventListener('click', deleteColumn);

  //указатель мыши входит в пределы таблицы
  function pointerMouseEnter() {
    delRowButton.style.visibility = 'visible';
    delColButton.style.visibility = 'visible';
  };

  //указатель мыши выходит за пределы таблицы
  function pointerMouseLeave() {
    setTimeout(function() {
        if (box.querySelector('table:hover')) return;
        if (box.querySelector('.delete-btn:hover')) return;
        delRowButton.style.visibility = 'hidden';
        delColButton.style.visibility = 'hidden';
    }, 200);
  };

  //указатель мыши двигается в пределах таблицы
  function pointerMouseMove(e) {
    const {offsetTop, offsetLeft, nodeName, parentElement, cellIndex}= e.target;
    if (nodeName === 'TD') {
        delRowButton.style.top = offsetTop + 'px';
        delColButton.style.left = offsetLeft + 'px';
        rowIndex = parentElement.rowIndex;
        colIndex = cellIndex;
    }
  };

  //добавление строки
  function addRow() {
    const newRow = table.querySelector('tr').cloneNode(true);
    table.querySelector('tbody').appendChild(newRow);
    actionAfter();
  };

  //добавление столбца
  function addColumn() {
    table.querySelectorAll('tr').forEach((tr) => {
        tr.appendChild(tr.querySelector('td').cloneNode());
    });
    actionAfter();
  };

  //удаление строки
  function deleteRow() {
    table.querySelectorAll('tr')[rowIndex].remove();
    actionAfter();
  };
  //удаление столбца
  function deleteColumn() {
    table.querySelectorAll('tr').forEach((tr) => {
      tr.querySelectorAll('td')[rowIndex].remove();
    });
    actionAfter();
  };
  //действия после нажатия кнопки
  function actionAfter() {
    delRowButton.style.visibility = 'hidden';
    delColButton.style.visibility = 'hidden';
    delRowButton.style.display = table.querySelectorAll('tr')[1] ? 'block' : 'none';
    delColButton.style.display = table.querySelector('tr').children[1] ? 'block' : 'none';  
  }
}(window));