
import './App.css';

function App() {

  return (
    <>


      {/* Embed Power BI iframe */}
      <div className="powerbi-container">
        <iframe
          title="RIMFIRE Reliability Analytics v2.0"
          width="1140"
          height="541.25"
          src="https://app.high.powerbigov.us/reportEmbed?reportId=c300d03b-ef88-4b58-8ec5-a25734b8fc9b&autoAuth=true&ctid=3ffbc5ec-b740-451c-ab2d-36a9f55bfa3c"
          frameBorder="0"
          allowFullScreen={true}
        ></iframe>
      </div>
    </>
  );
}

export default App;
