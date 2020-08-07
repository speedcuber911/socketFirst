const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

const aggAmount = { aggregated_amount: "1202.50", transaction_count: "17" };

let backendTransactionData = {
  "Jul 11 2020": [
    {
      merchantId: "A2ZC95UVYCGP7H",
      transactionId: "TXNAMZ3R3356789",
      amount: "316.50",
      transactionStatus: "SUCCESS",
      storeName: "Arun devo",
      payerVPAHandle: "ce******01@apl",
      timestamp: 1589876919000,
      cardDisplayDate: "Jul 11 2020",
      cardDisplayTime: "01:58 PM",
      displayDate: "Jul 11 2020",
      displayTime: "01:58:39 PM",
      merchantReferenceId: "014013535414"
    }
  ],
  "Jul 10 2020": [
    {
      merchantId: "A2ZC95UVYCGP7H",
      transactionId: "TXNAMZ333356789",
      amount: "232.50",
      transactionStatus: "SUCCESS",
      storeName: "Arun devo",
      payerVPAHandle: "ce******01@apl",
      timestamp: 1589876919000,
      cardDisplayDate: "Jul 10 2020",
      cardDisplayTime: "01:58 PM",
      displayDate: "Jul 10 2020",
      displayTime: "01:58:39 PM",
      merchantReferenceId: "014013535414"
    }
  ]
};

// app.get("/agg-data", (_, res) => {
//   console.log("Sending agg data");
//   res.json(aggAmount);
// });

app.get("/add-details", (req, res) => {
  console.log("Ready to add Data");
  res.sendFile(__dirname + "/b.html");
});

server.listen(3000, () => console.log(`Reading to send transaction details`));

io.on("connection", socket => {
  socket.on("getAllTransactions", _ => {
    console.log("getAllTransactions");
    io.emit("receiveAllTransactions", backendTransactionData);
  });

  socket.on("updatTransaction", transaction => {
    console.log(transaction);
    io.emit("webPusher", "Received");
    io.emit("addTransaction", { [transaction.date]: [transaction.payload] });
  });

  console.log("a user connected :D");
  socket.on("addTransaction", transaction => {
    console.log(typeof transaction);
    console.log("Receiverd", transaction);
    backendTransactionData = { ...backendTransactionData, ...transaction };
    io.emit("addTransaction", { ...backendTransactionData });
  });
});
