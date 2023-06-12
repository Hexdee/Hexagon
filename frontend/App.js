import "./App.css";
import AppRoute from "./routes/appRoute";

function App({ isSignedIn, contractId, wallet }) {
  return (
    <div>
      <AppRoute isSignedIn={isSignedIn} contractId={contractId} wallet={wallet} />
    </div>
  );
}

export default App;
