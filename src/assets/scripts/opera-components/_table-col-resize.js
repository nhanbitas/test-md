const tables = document.getElementsByTagName('table');
for (const table of tables) {
  makeTableResizable(table);
  const resizeObserver = new ResizeObserver(() => {
    resetTableColumns(table);
    freezeCol(table);
  });
  resizeObserver.observe(table.parentElement);
  table.querySelectorAll('th').forEach((th) => {
    resizeObserver.observe(th);
  });
}

function resetTableColumns(table) {
  table.style.width = table.clientWidth + 'px';
  if (table.clientWidth < table.parentElement.clientWidth) {
    table.style.width = parseInt(window.getComputedStyle(table.parentElement).getPropertyValue('width')) + 'px';
  }
  const cols = table.querySelectorAll('th');
  cols.forEach((col) => {
    col.style.width = col.offsetWidth + 'px';
  });
}

function makeTableResizable(table) {
  let cols = table.querySelectorAll('th');
  if (!cols) return;

  let lastCol = cols[cols.length - 1];

  for (const col of cols) {
    let resizer = document.createElement('div');
    resizer.className = 'absolute top-0 -right-[0.5px] h-full w-[3px] bg-gray-300 cursor-col-resize select-none opacity-0 hover:opacity-100';
    resizer.setAttribute('data-table-col-resizer', '');
    col.appendChild(resizer);
    setListeners(resizer);
  }

  function setListeners(resizer) {
    let pageX, curCol, curColWidth, tableWidth, tableContainerWidth;

    resizer.addEventListener('mousedown', function (e) {
      resizer.classList.remove('opacity-0');
      curCol = e.target.parentElement;
      pageX = e.pageX;
      tableWidth = table.offsetWidth;
      tableContainerWidth = table.parentElement.clientWidth;
      curColWidth = curCol.offsetWidth;
      document.addEventListener('mousemove', dragColumn);
      const resizeObserver = new ResizeObserver(() => {
        resizer.style.height = table.clientHeight + 'px';
        resizer.style.backgroundColor = 'rgb(20, 122, 255)';
      });
      resizeObserver.observe(table);
    });

    document.addEventListener('mouseup', function (e) {
      const cols = table.querySelectorAll('th');
      cols.forEach((col) => {
        col.style.width = col.offsetWidth + 'px';
      });
      curCol = undefined;
      pageX = undefined;
      curColWidth = undefined;
      tableWidth = undefined;
      resizer.classList.add('opacity-0');
      resizer.removeAttribute('style');
      document.removeEventListener('mousemove', dragColumn);
    });

    function dragColumn(e) {
      // Detect when scrollbar appears and resize table width by the scrollbar width
      if (tableContainerWidth !== table.parentElement.clientWidth) {
        table.style.width = table.offsetWidth - (tableContainerWidth - table.parentElement.clientWidth) + 'px';
        tableContainerWidth = table.parentElement.clientWidth;
      }

      if (curCol) {
        let diffX = e.pageX - pageX;
        if (tableWidth + diffX >= tableContainerWidth) {
          lastCol.style.width = parseInt(window.getComputedStyle(lastCol).getPropertyValue('width')) + 'px';
          curCol.style.width = curColWidth + diffX + 'px';
          table.style.width = tableWidth + diffX + 'px';
        } else {
          lastCol.style.width = parseInt(window.getComputedStyle(lastCol).getPropertyValue('width')) + 'px';
          curCol.style.width = curColWidth + diffX + 'px';
        }
      }
    }
  }
}

function freezeCol(table) {
  const f = parseInt(table.getAttribute('data-freeze-col'));
  if (!isNaN(f)) {
    let rows = table.querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
      let cols = rows[i].querySelectorAll('th, td');
      const lastFrozenCol = cols[f - 1];
      let divider = document.createElement('div');
      divider.className = 'absolute top-0 -right-[0px] h-full w-[2.5px] select-none bg-gray-200 -z-10';
      lastFrozenCol.appendChild(divider);
      let prev = 0;
      for (let j = 0; j < cols.length; j++) {
        if (j < f) {
          cols[j].classList.add('sticky', 'z-10');
          cols[j].style.left = prev + 'px';
          prev = prev + cols[j].offsetWidth;
        } else {
          cols[j].classList.remove('sticky', 'z-10');
        }
      }
    }
  }
}
