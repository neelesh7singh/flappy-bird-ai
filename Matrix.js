class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = new Array(rows);
    for (let i = 0; i < rows; i++) this.data[i] = new Array(cols).fill(0);
  }
  add(arg) {
    if (arg instanceof Matrix) {
      for (let i = 0; i < arg.rows; i++) {
        for (let j = 0; j < arg.cols; j++) {
          this.data[i][j] = arg.data[i][j] + this.data[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] = arg + this.data[i][j];
        }
      }
    }
  }
  hmultiply(arg) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] *= arg.data[i][j];
      }
    }
  }
  multiply(arg) {
    if (arg instanceof Matrix) {
      if (arg.rows !== this.cols) {
        console.log('Cols and rows did not match');
        return undefined;
      }
      let result = new Matrix(this.rows, arg.cols);
      for (let i = 0; i < result.rows; i++) {
        for (let j = 0; j < result.cols; j++) {
          for (let k = 0; k < this.cols; k++) {
            result.data[i][j] += this.data[i][k] * arg.data[k][j];
          }
        }
      }
      return result;
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] = arg * this.data[i][j];
        }
      }
    }
  }
  randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.random() * 2 - 1;
      }
    }
  }
  map(func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = func(this.data[i][j]);
      }
    }
  }
  print() {
    console.table(this.data);
  }

  toArray() {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }

  //...........   Static functions   ......................
  static transpose(matrix) {
    let m = new Matrix(matrix.cols, matrix.rows);
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        m.data[j][i] = matrix.data[i][j];
      }
    }
    return m;
  }
  static fromArray(arr) {
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) m.data[i][0] = arr[i];
    return m;
  }
  static subtract(a, b) {
    let result = new Matrix(a.rows, a.cols);
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }
    return result;
  }
  static map(matrix, func) {
    let m = new Matrix(matrix.rows, matrix.cols);
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        m.data[i][j] = func(matrix.data[i][j]);
      }
    }
    return m;
  }
  static multiply(a, b) {
    if (b.rows !== a.cols) {
      console.log('Cols and rows did not match');
      return undefined;
    }
    let result = new Matrix(a.rows, b.cols);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        for (let k = 0; k < a.cols; k++) {
          result.data[i][j] += a.data[i][k] * b.data[k][j];
        }
      }
    }
    return result;
  }
}

// function abc(num) {
//   return num + 69;
// }
// let m = new Matrix(2, 4);
// // m.map(abc);
// m.randomize();
// m.print();
