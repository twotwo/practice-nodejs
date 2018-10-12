/**
 * 按栏递归排列，并按行进行筛选
 * @param {Number} col 栏号
 */
function place(col) {
  if (N === col) {
    ret.push(chessboard.slice())
  } else {
    for (let row = 0; row < N; ++row) {
      if (isSafe(col, row)) {
        chessboard[col] = row
        place(col + 1)
      }
    }
  }
}

/**
 * 筛选的方法：按栏判断行、列和对角线是否在一条线上
 * @param {Number} col 栏号
 * @param {Number} row 行号
 */
function isSafe(col, row) {
  for (let i = 0; i < col; ++i) {
    if (
      //不存在同一拦的情况
      chessboard[i] === row || // 同一行
      col - row === i - chessboard[i] || // 左上 <-> 右下
      col + row === i + chessboard[i] // 左下 <-> 右上
    ) {
      return false
    }
  }
  return true
}

const N = 8 //棋盘大小
const chessboard = new Array(N)
const ret = []

for (let col = 0; col < N; ++col) {
  chessboard[0] = col
  place(1)
}

console.log("%d*%d 的棋盘有 %d 种排法\n", N, N, ret.length)
//打印出每种情况
for (let i = 0; i < ret.length; ++i) {
  let chessboard = ret[i]
  for (let col = 0; col < N; ++col) {
    let line = ""
    for (let row = 0; row < N; ++row) {
      if (chessboard[row] === col) {
        line += " Q"
      } else {
        line += " ."
      }
    }
    console.log(line)
  }
  console.log("\n")
}