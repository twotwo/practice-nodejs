function createArray(len) {
  let ret = [];
  for (let i = 0; i < len; ++i) {
      ret.push(i % 3);
  }
  return ret;
}
let copiedArray = createArray(20)
console.log(copiedArray);

// 开始工作，定义三种下标
let begin = 0; //0值下标
let end = copiedArray.length - 1; //2值下标
let current = begin; //当前下标

/**
 * 
 * @param {number} i src index
 * @param {number} j dest index
 */
function swap(i, j) {
  let tmp = copiedArray[i];
  copiedArray[i] = copiedArray[j];
  copiedArray[j] = tmp;
};

while (current <= end) {
  if (copiedArray[current]===0) {
    //放置到前部: index+1, begin+1
    swap(begin, current)
    current +=1
    begin +=1
  } else if (copiedArray[current]===2){
    //放置到后部: end-1
    swap(current, end)
    end -=1
  }else {
    current +=1
  }
}

console.log(copiedArray);