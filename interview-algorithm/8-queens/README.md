# 八皇后问题

## 题目

N\*N 的棋盘上放 N 个棋子，保证每一行、每一列、每个对角线上只有一个棋子，共有几种排法？

## 设计

### 1. 定义排列的数据结构

用一个一维数组来表示棋盘上的一种排法： `const chessboard = new Array(N)`，其中：

- 下标表示棋子栏号 col: 预设为 `0 ~ N-1`
- 取值标识行号 row，取值范围是 `0 ~ N-1`

### 2. 按栏递归排列，并按行进行筛选

从1到N逐层递归排除不符合的排列： `function place(col)`

筛选到最后依然有效的排列满足条件


### 3. 定义判断是否满足条件的方法： `function isSafe(col, row) {}`


验证以下 3 条件

- 同栏 ``
- 同行 ``
- 同一对角线 ``

### 4. 根据初试条件进行演算

首先，给定棋盘大小N `const chessboard = new Array(N)`
定义存放满足条件的容器： `const ret = []`

然后从1开始进行计算, 代码： 

```js
N = 8
const queues = new Array(N)
const ret = []
for (let col = 0; col < N; ++col) {
  chessboard[0] = col
  place(1)
}
```
