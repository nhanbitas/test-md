window.addEventListener('load', function () {
  const sortableTables = document.querySelectorAll('.sortable');

  sortableTables?.forEach((table) => {
    table.addEventListener('mousedown', function (e) {
      if (!e.target.hasAttribute('data-table-col-resizer')) {
        document.addEventListener('mouseup', function onMouseUp(e) {
          // Remove the 'mouseup' event listener to avoid multiple calls
          document.removeEventListener('mouseup', onMouseUp);
          // Call the 'sort' function when the mouse button is released
          sort(e);
        });
      }
    });
  });
});

function sort(e) {
  try {
    // allows for elements inside TH
    function findElementRecursive(element, tag) {
      return element.nodeName === tag ? element : findElementRecursive(element.parentNode, tag);
    }
    var descending_th_class_1 = 'dir-d';
    var ascending_th_class_1 = 'dir-u';
    var ascending_table_sort_class = 'asc';
    var no_sort_class = 'no-sort';
    var table_class_name = 'sortable';
    var alt_sort_1 = e.shiftKey || e.altKey;
    var element = findElementRecursive(e.target, 'TH');
    var tr = element.parentNode;
    var thead = tr.parentNode;
    var table = thead.parentNode;

    var sort_arrow_up = element.querySelector('[data-sort-arrow-up]');
    var sort_arrow_down = element.querySelector('[data-sort-arrow-down]');

    function reClassify(element, dir) {
      element.classList.remove(descending_th_class_1);
      element.classList.remove(ascending_th_class_1);
      if (dir) element.classList.add(dir);
    }

    function getValue(element) {
      var value = (alt_sort_1 && element.dataset.sortAlt) || element.dataset.sort || element.textContent;
      return value;
    }
    if (
      thead.nodeName === 'THEAD' && // sortable only triggered in `thead`
      table.classList.contains(table_class_name) &&
      !element.classList.contains(no_sort_class) // .no-sort is now core functionality, no longer handled in CSS
    ) {
      var column_index_1;
      var nodes = tr.cells;
      var tiebreaker_1 = parseInt(element.dataset.sortTbr);
      // Reset thead cells and get column index
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i] === element) {
          column_index_1 = parseInt(element.dataset.sortCol) || i;
        } else {
          reClassify(nodes[i], '');
        }
      }
      var dir = descending_th_class_1;
      // Check if we're sorting ascending or descending
      if (
        element.classList.contains(descending_th_class_1) ||
        (table.classList.contains(ascending_table_sort_class) && !element.classList.contains(ascending_th_class_1))
      ) {
        dir = ascending_th_class_1;
      }
      // Update the `th` class accordingly
      reClassify(element, dir);
      var reverse_1 = dir === ascending_th_class_1;
      var compare_1 = function (a, b, index) {
        var x = getValue((reverse_1 ? a : b).cells[index]);
        var y = getValue((reverse_1 ? b : a).cells[index]);
        var temp = parseFloat(x) - parseFloat(y);
        var bool = isNaN(temp) ? x.localeCompare(y) : temp;
        return bool;
      };
      // loop through all tbodies and sort them
      for (var i = 0; i < table.tBodies.length; i++) {
        var org_tbody = table.tBodies[i];
        // Put the array rows in an array, so we can sort them...
        var rows = [].slice.call(org_tbody.rows, 0);
        // Sort them using Array.prototype.sort()
        rows.sort(function (a, b) {
          var bool = compare_1(a, b, column_index_1);
          return bool === 0 && !isNaN(tiebreaker_1) ? compare_1(a, b, tiebreaker_1) : bool;
        });
        // Make an empty clone
        var clone_tbody = org_tbody.cloneNode();
        // Put the sorted rows inside the clone
        clone_tbody.append.apply(clone_tbody, rows);
        // And finally replace the unsorted tbody with the sorted one
        table.replaceChild(clone_tbody, org_tbody);
      }

      thead.querySelectorAll('[data-sort-arrow-up]').forEach((arrow) => {
        arrow.classList.remove('text-gray-900');
        arrow.classList.add('text-gray-300');
      });
      thead.querySelectorAll('[data-sort-arrow-down]').forEach((arrow) => {
        arrow.classList.remove('text-gray-900');
        arrow.classList.add('text-gray-300');
      });
      thead.querySelectorAll('th').forEach((th) => {
        th.classList.add('bg-inherit', 'hover:bg-gray-100');
        th.classList.remove('text-gray-900', 'bg-gray-100');
      });
      if (element.classList.contains('dir-u')) {
        sort_arrow_up.classList.remove('text-gray-300');
        sort_arrow_up.classList.add('text-gray-900');
        sort_arrow_down.classList.add('text-gray-300');
        sort_arrow_down.classList.remove('text-gray-900');
        element.classList.remove('bg-inherit', 'hover:bg-gray-100');
        element.classList.add('text-gray-900', 'bg-gray-100');
      } else if (element.classList.contains('dir-d')) {
        sort_arrow_down.classList.remove('text-gray-300');
        sort_arrow_down.classList.add('text-gray-900');
        sort_arrow_up.classList.add('text-gray-300');
        sort_arrow_up.classList.remove('text-gray-900');
        element.classList.remove('bg-inherit', 'hover:bg-gray-100');
        element.classList.add('text-gray-900', 'bg-gray-100');
      }
    }
  } catch (error) {
    console.log(error);
  }
}
