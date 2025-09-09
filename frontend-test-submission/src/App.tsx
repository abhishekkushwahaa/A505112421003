import ShortenForm from "./components/form";
import StatisticsPage from "./components/Page";

function App() {
  return (
    <>
      <h2 className="Heading-Round">Technical Round - 1</h2>
      <div className="container">
        <h1>URL Shortener</h1>
        <ShortenForm />
        <hr />
        <StatisticsPage />
      </div>
    </>
  );
}

export default App;
