export interface BfsProps {
  action: string;
  bottle1: number;
  bottle2: number;
}

export const bfs = (
  one: number,
  two: number,
  target: number,
  father: BfsProps[]
) => {
  let bottle1: number = 0;
  let bottle2: number = 0;
  let stack = [{ action: 'Begin', bottle1, bottle2 }];
  father.push({ action: 'Begin', bottle1, bottle2 });

  while (true) {
    let tempStack = [];

    let tempObject = stack.pop();
    console.log(tempObject?.action, tempObject?.bottle1, tempObject?.bottle2);
    if (tempObject !== undefined) {
      bottle1 = tempObject.bottle1;
      bottle2 = tempObject.bottle2;
      if (bottle1 === target || bottle2 === target) {
        console.log('Founded');
        break;
      }
      if (bottle1 === 0) {
        if (bottle2 === 0) {
          tempStack.push({
            action: 'Đổ đầy chai 1',
            bottle1: one,
            bottle2: 0,
          });
          tempStack.push({
            action: 'Đổ đầy chai 2',
            bottle1: 0,
            bottle2: two,
          });
        } else if (bottle2 === two) {
          if (one >= two) {
            tempStack.push({
              action: 'Đổ chai 2 sang chai 1',
              bottle1: two,
              bottle2: 0,
            });
          } else {
            tempStack.push({
              action: 'Đổ chai 2 sang chai 1',
              bottle1: one,
              bottle2: two - one,
            });
          }
        } else {
          if (
            father[father.length - 2].bottle1 !== one ||
            father[father.length - 2].bottle2 !== bottle2
          )
            tempStack.push({
              action: 'Đổ đầy chai 1',
              bottle1: one,
              bottle2: bottle2,
            });
          if (one >= two) {
            if (
              father[father.length - 2].bottle1 !== bottle2 ||
              father[father.length - 2].bottle2 !== 0
            )
              tempStack.push({
                action: 'Đổ chai 2 sang chai 1',
                bottle1: bottle2,
                bottle2: 0,
              });
          } else {
            if (
              father[father.length - 2].bottle1 !== one ||
              father[father.length - 2].bottle2 !== bottle2 - one
            )
              tempStack.push({
                action: 'Đổ chai 2 sang chai 1',
                bottle1: one,
                bottle2: bottle2 - one,
              });
          }
        }
      } else if (bottle1 === one) {
        if (bottle2 === 0) {
          if (one >= two) {
            if (
              father[father.length - 2].bottle1 !== one - two ||
              father[father.length - 2].bottle2 !== two
            )
              tempStack.push({
                action: 'Đổ chai 1 sang chai 2',
                bottle1: one - two,
                bottle2: two,
              });
          } else {
            if (
              father[father.length - 2].bottle1 !== 0 ||
              father[father.length - 2].bottle2 !== one
            )
              tempStack.push({
                action: 'Đổ chai 1 sang chai 2',
                bottle1: 0,
                bottle2: one,
              });
          }
        } else if (bottle2 === two) {
          if (
            father[father.length - 2].bottle1 !== 0 ||
            father[father.length - 2].bottle2 !== bottle2
          )
            tempStack.push({
              action: 'Bỏ nước trong chai 1',
              bottle1: 0,
              bottle2,
            });
          if (
            father[father.length - 2].bottle1 !== bottle1 ||
            father[father.length - 2].bottle2 !== 0
          )
            tempStack.push({
              action: 'Bỏ nước trong chai 2',
              bottle1,
              bottle2: 0,
            });
        } else {
          if (
            father[father.length - 2].bottle1 !== 0 ||
            father[father.length - 2].bottle2 !== bottle2
          )
            tempStack.push({
              action: 'Bỏ nước trong chai 1',
              bottle1: 0,
              bottle2,
            });
          if (
            father[father.length - 2].bottle1 !== bottle1 - (two - bottle2) ||
            father[father.length - 2].bottle2 !== two
          )
            tempStack.push({
              action: 'Đổ chai 1 sang chai 2',
              bottle1: bottle1 - (two - bottle2),
              bottle2: two,
            });
        }
      } else {
        if (bottle2 === 0) {
          if (bottle1 >= two) {
            if (
              father[father.length - 2].bottle1 !== bottle1 - two ||
              father[father.length - 2].bottle2 !== two
            )
              tempStack.push({
                action: 'Đổ chai 1 sang chai 2',
                bottle1: bottle1 - two,
                bottle2: two,
              });
            if (
              father[father.length - 2].bottle1 !== bottle1 ||
              father[father.length - 2].bottle2 !== two
            )
              tempStack.push({
                action: 'Đổ đầy chai 2',
                bottle1,
                bottle2: two,
              });
          } else {
            if (
              father[father.length - 2].bottle1 !== 0 ||
              father[father.length - 2].bottle2 !== bottle1
            )
              tempStack.push({
                action: 'Đổ chai 1 sang chai 2',
                bottle1: 0,
                bottle2: bottle1,
              });
            if (
              father[father.length - 2].bottle1 !== bottle1 ||
              father[father.length - 2].bottle2 !== two
            )
              tempStack.push({
                action: 'Đổ đầy chai 2',
                bottle1,
                bottle2: two,
              });
          }
        } else if (bottle2 === two) {
          if (
            father[father.length - 2].bottle1 !== bottle1 ||
            father[father.length - 2].bottle2 !== 0
          )
            tempStack.push({
              action: 'Bỏ nước trong chai 2',
              bottle1,
              bottle2: 0,
            });
          if (bottle2 <= one - bottle1) {
            if (
              father[father.length - 2].bottle1 !== bottle1 + two ||
              father[father.length - 2].bottle2 !== 0
            )
              tempStack.push({
                action: 'Đổ chai 2 sang chai 1',
                bottle1: bottle1 + two,
                bottle2: 0,
              });
          } else {
            if (
              father[father.length - 2].bottle1 !== one ||
              father[father.length - 2].bottle2 !== two - (one - bottle1)
            )
              tempStack.push({
                action: 'Đổ chai 2 sang chai 1',
                bottle1: one,
                bottle2: two - (one - bottle1),
              });
          }
        } else {
          if (bottle1 >= two - bottle2) {
            if (
              father[father.length - 2].bottle1 !== bottle1 - (two - bottle2) ||
              father[father.length - 2].bottle2 !== two
            )
              tempStack.push({
                action: 'Đổ chai 1 sang chai 2',
                bottle1: bottle1 - (two - bottle2),
                bottle2: two,
              });
          } else {
            if (
              father[father.length - 2].bottle1 !== 0 ||
              father[father.length - 2].bottle2 !== bottle1 + bottle2
            )
              tempStack.push({
                action: 'Đổ chai 1 sang chai 2',
                bottle1: 0,
                bottle2: bottle1 + bottle2,
              });
          }
          if (one - bottle1 <= bottle2) {
            if (
              father[father.length - 2].bottle1 !== bottle1 + bottle2 ||
              father[father.length - 2].bottle2 !== 0
            )
              tempStack.push({
                action: 'Đổ chai 2 sang chai 1',
                bottle1: bottle1 + bottle2,
                bottle2: 0,
              });
          } else {
            if (
              father[father.length - 2].bottle1 !== one ||
              father[father.length - 2].bottle2 !== bottle2 - (one - bottle1)
            )
              tempStack.push({
                action: 'Đổ chai 2 sang chai 1',
                bottle1: one,
                bottle2: bottle2 - (one - bottle1),
              });
          }
        }
      }
      console.log('temp', tempStack);
      let random = Math.floor(Math.random() * tempStack.length);
      stack.push(tempStack[random]);
      father.push(tempStack[random]);
    }
  }
  father.shift();
};
