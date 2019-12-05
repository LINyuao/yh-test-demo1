const express = require("express");
const mysql = require("mysql");
// 连接数据库
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "shoppingmall"
});
connection.connect();
let app = express();
let arr = [];
// 解决跨域
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Max-Age", "3600");
  next();
});
const result = {
  status: 200,
  message: "success"
};

app.post("/login", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
  });

  req.on("end", function() {
    console.log(_allData);
    let user_info = JSON.parse(_allData);
    console.log(user_info);
    connection.query(
      "SELECT * from user WHERE username = ?",
      [user_info.username],
      function(error, results) {
        if (error) throw error;
        result.data = results;
        res.json(result);
      }
    );
  });
});
app.post("/register", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
  });

  req.on("end", function() {
    let user_info = JSON.parse(_allData);
    console.log(user_info);
    connection.query(
      "INSERT INTO user(username,school,password)VALUES(?,?,?)",
      [user_info.username, user_info.school, user_info.password],
      function(error) {
        if (error) throw error;
        res.json(result);
      }
    );
  });
});
app.use("/user", function(req, res) {
  connection.query("SELECT * from user", function(error, results) {
    if (error) throw error;
    result.data = results;
    res.json(result);
  });
});
app.use("/noticeClass", function(req, res) {
  connection.query("SELECT * from noticeClass", function(error, results) {
    if (error) throw error;
    result.data = results;
    res.json(result);
  });
});
app.use("/noticeSchool", function(req, res) {
  connection.query("SELECT * from noticeSchool", function(error, results) {
    if (error) throw error;
    result.data = results;
    res.json(result);
  });
});

app.use("/noticeDean", function(req, res) {
  connection.query("SELECT * from noticeDean", function(error, results) {
    if (error) throw error;
    result.data = results;
    res.json(result);
  });
});

app.use("/taskAlready", function(req, res) {
  connection.query("SELECT * from taskAlready", function(error, results) {
    if (error) throw error;
    result.data = results;
    res.json(result);
  });
});

app.use("/taskAwait", function(req, res) {
  connection.query("SELECT * from taskAwait", function(error, results) {
    if (error) throw error;
    result.data = results;
    res.json(result);
  });
});
app.use("/classes", function(req, res) {
  connection.query("SELECT * from classes", function(error, results) {
    if (error) throw error;
    result.data = results;
    res.json(result);
  });
});
app.post("/inserttaskAwait", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
  });

  req.on("end", function() {
    let detail_info = JSON.parse(_allData);
    console.log(detail_info);
    connection.query(
      "INSERT INTO taskawait(task,content_title,content_article,time,class,pic,filename,filepic,remarks)VALUES(?,?,?,?,?,?,?,?,?)",
      [
        detail_info.task,
        detail_info.content_title,
        detail_info.content_article,
        detail_info.time,
        detail_info.class,
        detail_info.pic,
        detail_info.filename,
        detail_info.filepic,
        detail_info.remarks
      ],
      function(error, results) {
        if (error) throw error;
        result.data = results;
        res.json(result);
      }
    );
  });
});
app.post("/switchtask", function(req, res) {
  connection.query("SELECT * from taskawait", function(error, results) {
    if (error) throw error;
    // result.data = results;
    results.forEach(element => {
      let arrval = Object.values(element);
      arrval = arrval.slice(1);
      arr.push(arrval);
      console.log(arr);
    });
    connection.query(
      "INSERT INTO taskAlready(task,content_title,content_article,time,class,pic,filename,filepic,remarks)VALUES ?",
      [arr],
      function(error, results) {
        if (error) throw error;
        return res.json(results);
      }
    );
  });
});
app.post("/deletetask", function(req, res) {
  connection.query("delete from taskawait", function(error, results) {
    if (error) throw error;
    res.json(results);
  });
});
app.get("/taskdetail", function(req, res) {
  connection.query(
    "SELECT * from taskAlready WHERE id=?",
    [req.query[0]],
    function(error, results) {
      if (error) throw error;
      result.data = results;
      res.json(result);
      console.log(results);
    }
  );
});
app.use("/classpay", function(req, res) {
  connection.query("SELECT * from classpay", function(error, results) {
    if (error) throw error;
    result.data = results;
    res.json(result);
  });
});
app.post("/oddclasspay", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
  });

  req.on("end", function() {
    console.log(_allData);
    let user_info = JSON.parse(_allData);
    console.log(user_info);

    connection.query(
      "SELECT * from classpay WHERE id = ?",
      [user_info],
      function(error, results) {
        if (error) throw error;
        result.data = results;
        console.log(results);
        res.json(result);
      }
    );
  });
});
app.post("/insertclasspay", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
  });

  req.on("end", function() {
    let detail_info = JSON.parse(_allData);
    console.log(detail_info);
    connection.query(
      "INSERT INTO classpay(project,money,explains,time,remind)VALUES(?,?,?,?,?)",
      [
        detail_info.project,
        detail_info.money,
        detail_info.explains,
        detail_info.time,
        detail_info.remind
      ],
      function(error, results) {
        if (error) throw error;
        result.data = results;
        res.json(result);
      }
    );
  });
});
app.post("/editclasspay", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
  });

  req.on("end", function() {
    let detail_info = JSON.parse(_allData);
    console.log(detail_info);
    connection.query(
      "update classpay set project=?,explains=? where id=?",
      [detail_info.project, detail_info.explains, detail_info.id],
      function(error, results) {
        if (error) throw error;
        result.data = results;
        res.json(result);
      }
    );
  });
});
app.post("/deleteclasspay", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
  });

  req.on("end", function() {
    let detail_info = JSON.parse(_allData);
    console.log(detail_info);
    connection.query("delete from classpay where id=?", [detail_info], function(
      error,
      results
    ) {
      if (error) throw error;
      result.data = results;
      res.json(result);
    });
  });
});
app.post("/deleteapproval", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
  });

  req.on("end", function() {
    let detail_info = JSON.parse(_allData);
    console.log(detail_info);
    connection.query("delete from approval where id=?", [detail_info], function(
      error,
      results
    ) {
      if (error) throw error;
      result.data = results;
      res.json(result);
    });
  });
});
app.use("/office", function(req, res) {
  connection.query("SELECT * from approval", function(error, results) {
    if (error) throw error;
    result.data = results;
    res.json(result);
  });
});
app.post("/insertapproval", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
    console.log(_d);
  });

  req.on("end", function() {
    let detail_info = JSON.parse(_allData);
    console.log(detail_info);
    connection.query(
      "INSERT INTO approval(time,content,detailed,images,enclosure,approver)VALUES(?,?,?,?,?,?)",
      [
        detail_info.time,
        detail_info.content,
        detail_info.detailed,
        detail_info.images,
        detail_info.enclosure,
        detail_info.approver
      ],
      function(error, results) {
        if (error) throw error;
        result.data = results;
        res.json(result);
      }
    );
  });
});
app.post("/oddapproval", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
  });

  req.on("end", function() {
    console.log(_allData);
    let user_info = JSON.parse(_allData);
    console.log(user_info);

    connection.query(
      "SELECT * from approval WHERE id = ?",
      [user_info],
      function(error, results) {
        if (error) throw error;
        result.data = results;
        console.log(results);
        res.json(result);
      }
    );
  });
});
app.post("/editapproval", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
  });

  req.on("end", function() {
    let detail_info = JSON.parse(_allData);
    console.log(detail_info);
    connection.query(
      "update approval set content=?,detailed=?,opinion=?,remarks=? where id=?",
      [
        detail_info.content,
        detail_info.detailed,
        detail_info.opinion,
        detail_info.remarks,
        detail_info.id
      ],
      function(error, results) {
        if (error) throw error;
        result.data = results;
        res.json(result);
      }
    );
  });
});

app.post("/insertapprovaling", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
    console.log(_d);
  });

  req.on("end", function() {
    let detail_info = JSON.parse(_allData);
    console.log(detail_info);
    connection.query(
      "INSERT INTO approvaling(time,content,detailed,images,enclosure,approver,remarks,opinion)VALUES(?,?,?,?,?,?,?,?)",
      [
        detail_info.time,
        detail_info.content,
        detail_info.detailed,
        detail_info.images,
        detail_info.enclosure,
        detail_info.approver,
        detail_info.remarks,
        detail_info.opinion
      ],
      function(error, results) {
        if (error) throw error;
        result.data = results;
        res.json(result);
      }
    );
  });
});
app.use("/officeing", function(req, res) {
  connection.query("SELECT * from approvaling", function(error, results) {
    if (error) throw error;
    result.data = results;
    res.json(result);
  });
});
app.get("/approvaldetail", function(req, res) {
  connection.query(
    "SELECT * from approvaling WHERE id=?",
    [req.query[0]],
    function(error, results) {
      if (error) throw error;
      result.data = results;
      res.json(result);
      console.log(results);
    }
  );
});
app.get("/approvalenddetail", function(req, res) {
  connection.query(
    "SELECT * from approvalend WHERE id=?",
    [req.query[0]],
    function(error, results) {
      if (error) throw error;
      result.data = results;
      res.json(result);
      console.log(results);
    }
  );
});

app.use("/approvalend", function(req, res) {
  connection.query("SELECT * from approvalend", function(error, results) {
    if (error) throw error;
    result.data = results;
    res.json(result);
  });
});

app.post("/switchapproval", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
    console.log(_d);
  });

  req.on("end", function() {
    let detail_info = JSON.parse(_allData);
    console.log(detail_info);
    connection.query(
      "INSERT INTO approvalend(time,content,detailed,images,enclosure,approver,remarks,opinion)VALUES(?,?,?,?,?,?,?,?)",
      [
        detail_info.time,
        detail_info.content,
        detail_info.detailed,
        detail_info.images,
        detail_info.enclosure,
        detail_info.approver,
        detail_info.remarks,
        detail_info.opinion
      ],
      function(error, results) {
        if (error) throw error;
        result.data = results;
        res.json(result);
      }
    );
  });
});
app.post("/deleteapprovaling", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
  });

  req.on("end", function() {
    let detail_info = JSON.parse(_allData);
    console.log(detail_info);
    connection.query(
      "delete from approvaling where id=?",
      [detail_info],
      function(error, results) {
        if (error) throw error;
        result.data = results;
        res.json(result);
      }
    );
  });
});
app.use("/classleave", function(req, res) {
  connection.query("SELECT * from classleave", function(error, results) {
    if (error) throw error;
    result.data = results;
    res.json(result);
  });
});
app.use("/classleaveend", function(req, res) {
  connection.query("SELECT * from classleaveend", function(error, results) {
    if (error) throw error;
    result.data = results;
    res.json(result);
  });
});
app.post("/insertclassleave", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
    console.log(_d);
  });

  req.on("end", function() {
    let detail_info = JSON.parse(_allData);
    console.log(detail_info);
    connection.query(
      "INSERT INTO classleave(time,totime,endtime,cause,detailed)VALUES(?,?,?,?,?)",
      [
        detail_info.time,
        detail_info.totime,
        detail_info.endtime,
        detail_info.cause,
        detail_info.detailed
      ],
      function(error, results) {
        if (error) throw error;
        result.data = results;
        res.json(result);
      }
    );
  });
});
app.post("/switchclassleaveend", function(req) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
    console.log(_d);
  });

  req.on("end", function() {
    let detail_info = JSON.parse(_allData);
    console.log(detail_info);
    connection.query(
      "INSERT INTO classleaveend(time,totime,endtime,cause,detailed,judge)VALUES(?,?,?,?,?,?)",
      [
        detail_info.time,
        detail_info.totime,
        detail_info.endtime,
        detail_info.cause,
        detail_info.detailed,
        detail_info.judge
      ],
      function(error, results) {
        if (error) throw error;
        result.data = results;
      }
    );
  });
});
app.post("/deleteclassleaveend", function(req, res) {
  let _allData = "";
  req.on("data", function(_d) {
    _allData += _d;
  });

  req.on("end", function() {
    let detail_info = JSON.parse(_allData);
    console.log(detail_info.id);
    connection.query(
      "delete from classleave where id=?",
      [detail_info.id],
      function(error, results) {
        if (error) throw error;
        result.data = results;
        res.json(result);
      }
    );
  });
});

//启动接口
app.listen("8090", () => {
  console.log("中间件启动,监听端口 8090");
});
