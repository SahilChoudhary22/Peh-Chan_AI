import React, { Component } from 'react'; //imrc
import Dropzone from 'react-dropzone';
import './Classifier.css'
import { Spinner, Button } from 'react-bootstrap';
import axios from 'axios';

// cc
class Classifier extends Component {
  state = {
    files: [],
    isLoading: false,
  }

  // // method called after the component is rendered
  // componentDidMount() {
  //   this.getImages()
  // }

  // // getting the images from the API
  // getImages = () => {
  //   // endpoint to access
  //   axios.get('http://127.0.0.1:8000/api/images/', {
  //     headers: {
  //       'accept': 'application/json'
  //     }
  //   }).then(resp=> {
  //     console.log(resp)
  //   })
  // }

  // On dropping the file in the dropzone
  onDrop = (files) => {
    this.setState({
      isLoading: true,
    })
    this.loadImage(files)
  }

  // for spinner and loading image
  loadImage = (files) => {
    setTimeout(() => {
      this.setState({
        files,
        isLoading: false
      }, () => {
        console.log(this.state.files[0].name)
      })
    }, 1000);    
  }

  // send image to the database
  sendImage = () => {
    let formData = new FormData()
    formData.append('picture', this.state.files[0], this.state.files[0].name)

    axios.post('http://127.0.0.1:8000/api/images/', formData, {
      headers: {
        'accept': 'application/json',
        'content-type': 'multipart/form-data'
      }
    })
    .then(resp => {
      console.log(resp)
    })
    .catch(err => {
      console.log("An error occured" + err)
    })
  }
  

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <Dropzone onDrop={this.onDrop} accept='image/png, image/jpeg'>
        {({ isDragActive, getRootProps, getInputProps }) => (
          <section className="container">
            <div {...getRootProps({ className: 'dropzone back' })}>
              <input {...getInputProps()} />
              <i className="far fa-file-image mb-2 text-muted" style={{fontSize:50}}></i>
              <p className="text-muted">{isDragActive ? 'Drop the image' : "Drag 'n' drop some files here, or click to select files"}</p>
            </div>
            <aside>
              {files}
            </aside>

            {this.state.files.length > 0 &&
            <Button variant="info" size='lg' className='mt-3' onClick={this.sendImage}>Select Image</Button>}

            {this.state.isLoading &&
              <Spinner animation="grow" variant="info" role="status">
              </Spinner>
              }
          </section>
        )}
      </Dropzone>);
  }
}

export default Classifier;



// class component, has its own state