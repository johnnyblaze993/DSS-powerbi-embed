import './App.css';

function App() {
  return (

      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

      }}>
        {/* <h1>RIMFIRE Reliability Analytics v2.0</h1> */}
        <iframe
          title="RIMFIRE Reliability Analytics v2.0"
          style={{ width: '100%', height: '100%', border: 'none' }}
          src="https://app.high.powerbigov.us/reportEmbed?reportId=c300d03b-ef88-4b58-8ec5-a25734b8fc9b&autoAuth=true&ctid=3ffbc5ec-b740-451c-ab2d-36a9f55bfa3c"
          frameBorder="0"
          allowFullScreen={true}
        ></iframe>
      </div>
  
  );
}

export default App;
