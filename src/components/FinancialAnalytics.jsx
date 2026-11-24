
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function FinancialAnalytics({ transactions }) {

  // Calculate financial totals
  const income = transactions.reduce(
    (total, transaction) =>
      transaction.amount > 0
        ? total + transaction.amount
        : total,
    0
  );

  const expenses = transactions.reduce(
    (total, transaction) =>
      transaction.amount < 0
        ? total + Math.abs(transaction.amount)
        : total,
    0
  );

  // Chart Data
  const chartData = [
    {
      name: "Income",
      amount: income
    },
    {
      name: "Expenses",
      amount: expenses
    }
  ];


  // Currency Formatter
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  // Compact Currency Formatter
  const formatAxisCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1
    }).format(value);
  };

  return (
    <section className="analytics-section">

      <h2>Financial Analytics</h2>

      <div className="analytics-summary">

        <div className="analytics-card">
          <span>Total Income</span>
          <h3 className="income">
            {formatCurrency(income)}
          </h3>
        </div>

        <div className="analytics-card">
          <span>Total Expenses</span>
          <h3 className="expense">
            {formatCurrency(expenses)}
          </h3>
        </div>

      </div>

      <div className="chart-container">

        <h3>Income vs Expenses</h3>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="name" />

            <YAxis
              width={55}
              tickFormatter={formatAxisCurrency}
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => formatCurrency(value)}
            />

            <Bar
              dataKey="amount"
              fill="#244c91"
              radius={[8, 8, 0, 0]}
              barSize={65}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </section>
  );

}

export default FinancialAnalytics;
