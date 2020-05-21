// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // Set a counter for conflicts
      var count = 0;
      // Get the row we have the index for
      var row = this.get(rowIndex);
      // Loop through this row
      for (var i = 0; i < row.length; i++) {
        // If there is an item
        if (row[i] === 1) {
          // Add to the counter
          count++;
          // If the counter reaches 2, return true
          if (count === 2) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // Get the array of arrays we are looking at
      var board = this.rows();
      // Iterate through the rows
      for (var r = 0; r < board.length; r++) {
        var row = board[r];
        // Set a counter for conflicts
        var count = 0;
        // Iterate through the columns
        for (var c = 0; c < row.length; c++) {
          // If row has an item flag
          if (row[c] === 1) {
            count++;
            // If it has two, then mark as true
            if (count === 2) {
              return true;
            }
          }
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // Create counter
      var counter = 0;
      // Create a variable to hold the array
      var board = this.rows();
      // Loop through the array of arrays
      for (var i = 0; i < board.length; i++) {
        // Check column index against each array for item
        var row = board[i];
        if (row[colIndex] === 1) {
          // iterate counter
          counter++;
          if (counter === 2) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // create a variable to hold the array
      var board = this.rows();
      // loop through column indices
      for (var i = 0; i < board.length; i++) {
        var index = i;
        if (this.hasColConflictAt(index) === true) {
          return true;
        }
      }
      return false;
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      // loop through each row array
      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        var limit = board.length - majorDiagonalColumnIndexAtFirstRow;
      } else {
        var limit = board.length;
      }
      var counter = 0;
      for (var i = 0; i < limit; i++) {
        // loop through each column index i++
        var diagonal = board[i][majorDiagonalColumnIndexAtFirstRow];
        // check to see if each of those elements has a 1
        if (diagonal === 1) {
          counter++;
          // counter method
          if (counter === 2) {
            return true;
          }
        }
        majorDiagonalColumnIndexAtFirstRow++;
        // console.log (i, 'row - line 188');
        // console.log (majorDiagonalColumnIndexAtFirstRow, 'column, line 189');
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();
      // Set i to negative board.length
      for (var i = -(board.length); i < board.length; i++) {
        var index = i;
        if (this.hasMajorDiagonalConflictAt(index) === true) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      // console.log(minorDiagonalColumnIndexAtFirstRow, 'line 218')
      // loop through each row array
      // Existing half
      if (minorDiagonalColumnIndexAtFirstRow < board.length) {
        var limit = minorDiagonalColumnIndexAtFirstRow + 1;
      }
      // "Non-existing" half
      if (minorDiagonalColumnIndexAtFirstRow >= board.length) {
        var limit = board.length;
      }

      // Function for existing half
      var counter = 0;
      for (var i = 0; i < limit; i++) {
        // if statements
        if (minorDiagonalColumnIndexAtFirstRow > board.length - 1) {
          minorDiagonalColumnIndexAtFirstRow--;
          // console.log(minorDiagonalColumnIndexAtFirstRow, 'line 236')
          continue;
        }
        // console.log(board, 'line 238')
        // console.log(i, 'line xx')
        // console.log(board[i], 'line 239')
        // console.log(board[i][minorDiagonalColumnIndexAtFirstRow], 'line 240')
        var diagonal = board[i][minorDiagonalColumnIndexAtFirstRow];

        if (diagonal === 1) {
          counter++;
          if (counter === 2) {
            return true;
          }
        }
        minorDiagonalColumnIndexAtFirstRow--;
        // console.log(minorDiagonalColumnIndexAtFirstRow, 'line 239');
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();
      // Set limit for iteration
      var limit = (board.length - 1 ) * 2;
      // Iterate through board
      for (var i = 0; i < limit; i++) {
        var indexVar = i;
        if (this.hasMinorDiagonalConflictAt(indexVar) === true) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
