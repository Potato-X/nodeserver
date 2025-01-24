class App {
  stack = [];
  popstack = [];
  next() {
    return new Promise((resolve, reject) => {
      this.popstack.unshift(resolve);
    });
  }
  use(cb) {
    this.stack.push(cb);
  }
  action() {
    for (const cb of this.stack) {
      cb && cb.call(this, this.next.bind(this));
    }
    for (const resolve of this.popstack) {
      resolve();
    }
  }
}
const app = new App();
let x = 0;
app.use(async (next) => {
  console.log(1);
  await next();
  console.log(2);
});
app.use(async (next) => {
  console.log(3);
  await next();
  console.log(4);
});
app.use(() => {
  console.log(5);
});
app.action();
