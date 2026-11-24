
import { useState, useEffect } from "react";

import VirtualCard from "../components/VirtualCard";
import FinancialAnalytics from "../components/FinancialAnalytics";

import { Eye, EyeOff } from "lucide-react";

// Transactions State
  
const initialTransactions = [
  {
    id: 1,
    name: "Netflix",
    amount: -15.99,
    date: "November 05, 2026"
  },
  {
    id: 2,
    name: "Salary Payment",
    amount: 3500,
    date: "November 03, 2026"
  },
  {
    id: 3,
    name: "Amazon",
    amount: -89.90,
    date: "November 01, 2026"
  }
];

function Dashboard() {

  // Account State
  const [balance, setBalance] = useState(() => {
  const savedBalance = localStorage.getItem("vinibank_balance");

  if (savedBalance === null) {
    return 25000;
  }

  const parsedBalance = Number(savedBalance);

  return Number.isFinite(parsedBalance) && parsedBalance >= 0
    ? parsedBalance
    : 25000;
});

  // Input State
  const [amount, setAmount] = useState("");

  // Feedback State
  const [message, setMessage] = useState("");


const [transactions, setTransactions] = useState(() => {
  const savedTransactions = localStorage.getItem(
    "vinibank_transactions"
  );

  if (savedTransactions === null) {
    return initialTransactions;
  }

  try {
    const parsedTransactions = JSON.parse(savedTransactions);

    const isValidTransactions = Array.isArray(parsedTransactions) &&
      parsedTransactions.every(transaction =>
        transaction &&
        typeof transaction.id === "number" &&
        typeof transaction.name === "string" &&
        typeof transaction.amount === "number" &&
        Number.isFinite(transaction.amount) &&
        typeof transaction.date === "string"
      );

    return isValidTransactions ? parsedTransactions : initialTransactions;

  } catch {
    return initialTransactions;
  }
});

useEffect(() => {
  localStorage.setItem(
    "vinibank_balance",
    balance
  );
}, [balance]);

useEffect(() => {
  localStorage.setItem(
    "vinibank_transactions",
    JSON.stringify(transactions)
  );
}, [transactions]);

  // Currency Formatter
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  const [showBalance, setShowBalance] = useState(true);


  //Transaction Function
  function handleTransaction(type, value) {

  if (!Number.isFinite(value) || value <= 0) {
    setMessage("Enter a valid transaction amount.");
    return;
  }

  const transactionName = type === "deposit" ? "Deposit" : "Withdrawal";

  const transactionAmount = type === "deposit" ? value : -value;

  if (type === "deposit") {

    setBalance(currentBalance => currentBalance + value);

  } else {

    if (value > balance) {
      setMessage("Insufficient funds!");
      return;
    }

    setBalance(currentBalance => currentBalance - value);
  }

  setTransactions(currentTransactions => [
    {
      id: Date.now(),
      name: transactionName,
      amount: transactionAmount,
      date: new Date().toLocaleDateString("en-US")
    },
    ...currentTransactions
  ]);

  setAmount("");

  setMessage(
    type === "deposit"
      ? "Deposit completed successfully!"
      : "Withdrawal completed successfully!"
  );
}


  // Deposit Function
  function handleDeposit() {

    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      setMessage("Enter a valid deposit amount.");
      return;
    }

    setBalance(currentBalance => currentBalance + value);

    setTransactions(currentTransactions => [
  {
    id: Date.now(),
    name: "Deposit",
    amount: value,
    date: new Date().toLocaleDateString("en-US")
  },
  ...currentTransactions
]);

    setAmount("");
    setMessage("Deposit completed successfully!");
  }

  // Withdraw Function
  function handleWithdraw() {

    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      setMessage("Enter a valid withdrawal amount.");
      return;
    }

    if (value > balance) {
      setMessage("Insufficient funds!");
      return;
    }

    setBalance(currentBalance => currentBalance - value);

    setTransactions(currentTransactions => [
  {
    id: Date.now(),
    name: "Withdrawal",
    amount: -value,
    date: new Date().toLocaleDateString("en-US")
  },
  ...currentTransactions
]);

    setAmount("");
    setMessage("Withdrawal completed successfully!");
  }

  return (
    <main className="dashboard">

      
<section 
  className="balance-card"
  aria-labelledby="balance-title"
  >

  <div className="balance-header">
    <p id="balance-title">Available Balance</p>

    <button
      type="button"
      className="balance-toggle"
      onClick={() => setShowBalance(!showBalance)}
      aria-label={showBalance ? "Hide balance" : "Show balance"}
    >
      {showBalance ? <Eye size={22} /> : <EyeOff size={22} />}
    </button>
  </div>

  <h1>
    {showBalance ? formatCurrency(balance) : "••••••••"}
  </h1>

  <span>USD Account</span>

</section>

<section className="card-section" aria-labelledby="card-title">

  <h2 id="card-title">My Virtual Card</h2>

  <VirtualCard />

</section>


      <section className="bank-operations" aria-labelledby="operations-title">

        <h2 id="operations-title">Banking Operations</h2>

        <label htmlFor="transaction-amount">
          Transaction amount (USD)
        </label>
        
        <input
        id="transaction-amount"
        name="amount"
        type="number"
        placeholder="Enter amount in USD"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        min="0.01"
        step="0.01"
        />

        <div className="operation-buttons">

          <button
            type="button"
            onClick={() => handleTransaction("deposit", Number(amount))}
          >
            Deposit
          </button>

          <button
            type="button"
            onClick={() => handleTransaction("withdraw", Number(amount))}
          >
            Withdraw
          </button>

        </div>

        <p role="status" aria-live="polite" aria-atomic="true">
          {message}
        </p>

      </section>

      <FinancialAnalytics transactions={transactions} />

      <section
        className="transactions"
        aria-labelledby="transactions-title"
      >
        <h2 id="transactions-title">Recent Transactions</h2>

        <ul className="transactions-list">

          {transactions.map((transaction) => (

            <li className="transaction" key={transaction.id}>

              <div>
                <strong>{transaction.name}</strong>
                <p>{transaction.date}</p>
              </div>

              <span
                className={
                  transaction.amount > 0 ? "income" : "expense"
                }
                aria-label={`${transaction.amount > 0 ? "Income" : "Expense"}: ${formatCurrency(Math.abs(transaction.amount))}`}
              >
                {transaction.amount > 0 ? "+ " : "- "}
                {formatCurrency(Math.abs(transaction.amount))}
              </span>

          </li>

      ))}

      </ul>
      </section>

    </main>
  );
}

export default Dashboard;
