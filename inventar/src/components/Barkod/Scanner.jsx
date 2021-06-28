import React, { Component } from 'react'
import Quagga from 'quagga'

class Scanner extends Component {
  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment', // or user
          },
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 4,
        decoder: {
          readers: ['code_128_reader'],
        },
        locate: true,
      },
      function(err) {
        if (err) {
          return console.log(err)
        }
        Quagga.start()
      },
    )
    Quagga.onDetected(this._onDetected)
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected)
  }

  _onDetected = result => {
    this.props.onDetected(result)
  }

  render() {
    return <div id="interactive" className="viewport" />
  }
}

export default Scanner

// Quagga.decodeSingle({ //src Mi ne radi?
//   decoder: {
//       readers: ["code_128_reader"] // List of active readers
//   },
//   locate: true, // try to locate the barcode in the image
//   src: '/test/fixtures/code_128/image-001.jpg' // or 'data:image/jpg;base64,' + data
// }, function(result){
//   if(result.codeResult) {
//       console.log("result", result.codeResult.code);
//   } else {
//       console.log("not detected");
//   }
// });