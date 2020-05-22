/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// IOCE
// I - n
// O - number of solutions for n x n - returning a board in array form
// C - testing 11-8
// E - n < 3, return n

// findNRooksSolution -
window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  // IOCE
  // I - row array
  // O - board completed
  // Create a function that would take the row array as an input and then iterate through all of the columns. For each column, toggle the piece and check if it passes the test. If it does, call the funciton on the next row
  var recursiveBoard = new Board({n: n});
  var createGoodBoard = function (row, rowIndex) {
    // loop thru row array --> access to each column
    for (var i = 0; i < row.length; i++) {
      var columnIndex = i;
      recursiveBoard.togglePiece(rowIndex, columnIndex);
      // console.log(row, 'line 77')
      // console.log(i, 'line 78')
      // if condition is met (no conflicts)
      if (!recursiveBoard.hasAnyRowConflicts() && !recursiveBoard.hasAnyColConflicts()) {
        // base case (end of board)
        if (rowIndex === n - 1) {
          // console.log(rowIndex, 'line 73')
          // console.log(columnIndex, 'line 74')
          // console.log(recursiveBoard, 'line 75')
          // console.log(recursiveBoard.rows(), 'line 84')
          return recursiveBoard.rows();
        }
        // increase rowIndex by 1
        rowIndex += 1;
        // recursive call
        return createGoodBoard(recursiveBoard.get(rowIndex), rowIndex);
      } else {
        recursiveBoard.togglePiece(rowIndex, columnIndex);
        // console.log(recursiveBoard.rows(), 'line 93')
        // logic for next column element
      }
    }
  };
  solution = createGoodBoard(recursiveBoard.get(0), 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return valid board solution of n x n
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

// IOCE
// I - n
// O - # of valid boards
// C -
// E - n < 3, return n
window.countNRooksSolutions = function(n) {
  // edge cases
  // if (n === 0) {
  //   return 1;
  // }
  // if (n < 3) {
  //   return n;
  // }
  var solutionCount = undefined; //fixme
  var validBoards = [];

  // LOOP THROUGH BOARD
  var recursiveBoard = new Board({n: n});
  var createGoodBoard = function (rowIndex) {
    // BASE CASE
    if (rowIndex === n) {
      // console.log(recursiveBoard.rows(), 'line 88');
      validBoards.push(recursiveBoard.rows());
      return;
    }

    // loop thru row array --> access to each column
    // Iterate through each column
    for (var i = 0; i < n; i++) {
      // Toggle at this space variable
      recursiveBoard.togglePiece(rowIndex, i);
      // console.log(recursiveBoard.rows(), "line 97")
      // Check if valid with helper functions
      if (!recursiveBoard.hasAnyRooksConflicts()) {
        // If so, maintain toggle (do nothing)
        // Move to next row (rowIndex + 1)
        createGoodBoard(rowIndex + 1);
        // When returning from recursion, untoggle
        recursiveBoard.togglePiece(rowIndex, i);
        // If not, untoggle and move to next column
        // console.log(recursiveBoard.rows(), 'line 106');
      } else {
        // untoggle
        recursiveBoard.togglePiece(rowIndex, i);
      }
    }
  };
  createGoodBoard(0);
  var counter = validBoards.length;
  solutionCount = counter;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
