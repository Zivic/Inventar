import React from 'react';
import {useState} from 'react';
import Scanner from './Scanner';
import Result from './Result';
const Barkod = () => {
    const [scanning, setScanning] = useState(false);
    const [results, setResults] = useState([]);

    const scan = () => {
        setScanning(!scanning);
    }   

    const onDetected = result => {
       setResults(results.concat([result]));
    }

    return(
        <div
      style={{
        margin: ".5rem",
        //backgroundColor: "gray",
        width: "100%",
        border: "solid blue",
        borderWidth: ".1rem .1rem 0",
        borderRadius: "8px 8px 0 0",
        height: "500px",
      }}
    >
      Barkod
      <div>
        <button onClick={() => scan()}>
          {scanning ? 'Stop' : 'Start'}
        </button>
        <ul className="results">
          {results.map((result, i) => (
            <Result key={result.codeResult.code + i} result={result} />
          ))}
        </ul>
        {scanning ? <Scanner onDetected={(res) => onDetected(res)} /> : null}
      </div>
    </div>
    )
}
export default Barkod;

// import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
// import Scanner from './Scanner'
// import Result from './Result'

// class App extends Component {
//   state = {
//     scanning: false,
//     results: [],
//   }

//   _scan = () => {
//     this.setState({ scanning: !this.state.scanning })
//   }

//   _onDetected = result => {
//     this.setState({ results: this.state.results.concat([result]) })
//   }

//   render() {
//     return (
    //   <div>
    //     <button onClick={this._scan}>
    //       {this.state.scanning ? 'Stop' : 'Start'}
    //     </button>
    //     <ul className="results">
    //       {this.state.results.map((result, i) => (
    //         <Result key={result.codeResult.code + i} result={result} />
    //       ))}
    //     </ul>
    //     {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
    //   </div>
//     )
//   }
// }

// export default App

// const rootElement = document.getElementById('root')
// ReactDOM.render(<App />, rootElement)
