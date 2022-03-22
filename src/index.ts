import express from "express";
import { Readable } from "stream";
const app = express();

const delayResolve = (res: any, time: number) => {
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

  const resStream = Readable.from([
    "<!DOCTYPE html><html>",
    "<head><title>Express Stream Demo</title></head>",
    "<body>",
    "<h1>Express Stream Demo<h1>",
    delayResolve("<div>1</div>", 3000),
    delayResolve("<div>2</div>", 3000),
    delayResolve("<div>3</div>", 3000),
    "</body></html>"
  ]);

  resStream.pipe(res);

  // res.status(200);
  // res.type("text/html; charset=utf-8");
  // res.set("Transfer-Encoding", "chunked");

  // res.write("<!DOCTYPE html><html>");

  // // res.write(head);
  // res.write(
  //   "<head><title>Progressive Rendering</title><script>window.onload=function(){console.log('ready')}</script></head>"
  // );
  // // res.write(openBody);
  // res.write("<body>");
  // res.write("<div style='color: red;'>0</div>");

  // await sleep(2000);
  // res.write("<div>1</div>");

  // await sleep(2000);
  // res.write("<div>2</div>");

  // res.end();
});

app.listen(3000);
