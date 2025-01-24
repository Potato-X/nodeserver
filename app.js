const path = require("path");
const Koa = require("koa");
const KoaBody = require("koa-body");
const route = require("koa-route");
const fs = require("fs");

const dist = path.join(__dirname, "./public/assets");
const app = new Koa();
const staticserve = require("koa-static");

const staticassets = staticserve(path.join(__dirname, "./public"), {
  index: "master.html",
});
app.use(staticassets);
/**
 * Koa.Context
 */
app.use(
  KoaBody({
    multipart: true, // 支持文件上传
    formidable: {
      uploadDir: dist, // 设置上传目录
      keepExtensions: true, // 保留文件扩展名
    },
  })
);
app.use(
  route.post("/upload", (ctx) => {
    const files = ctx.request.files;
    if (files && files.file) {
      const file = files.file;
      console.log(`上传的文件：`, file);
      ctx.body = {
        message: "文件上传成功",
        fileName: file.name,
      };
    } else {
      ctx.body = { message: "没有上传文件" };
    }
  })
);
app.listen(5500);
