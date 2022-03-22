import express from "express";
import { Readable } from "stream";
const app = express();

const delayResolve = (res: any, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(res), time);
  });
};

app.get("/", (req, res, next) => {
  res.send("hello");
});

app.get("/stream", async (req, res, next) => {
  res.status(200);
  res.type("text/html; charset=utf-8");
  res.set("Transfer-Encoding", "chunked");

  // 数组里的Promise是并发的，通过依次增加延时来模拟串行的效果
  const resStream = Readable.from([
    delayResolve("<!DOCTYPE html><html>"),
    delayResolve("<head><title>Express Stream Demo</title></head>", 0),
    delayResolve("<body>"),
    delayResolve("<h1>Express Stream Demo<h1>"),
    delayResolve("<div>1</div>", 500),
    delayResolve("<div>2</div>", 1000),
    delayResolve("<div>3</div>", 2000),
    delayResolve("</body></html>"),
  ]);

  resStream.pipe(res);
});

app.listen(3000);
