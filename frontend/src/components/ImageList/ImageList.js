import React, { Component } from 'react';
import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap';
import Image from './Image';
class ImageList extends Component {
    state = {
        images: [],
        visible: 2,
        isLoading: true,
        newLoading: false,
        status: false,
    }

    // method called after the component is rendered
    componentDidMount() {
        setTimeout(this.getImages, 1500)
    }


    // getting the images from the API
    getImages = () => {
        // endpoint to access
        axios.get('http://127.0.0.1:8000/api/images/', {
            headers: {
                'accept': 'application/json'
            }
        }).then(resp => {
            this.setState({
                images: resp.data,
                status: true
             })
            console.log(resp)
        })
        this.setState({ isLoading: false })
    }

    handleVisible = () => {
        const visible = this.state.visible
        const new_visible = visible + 2
        this.setState({ newLoading: true })
        setTimeout(() => {
            this.setState({
                visible: new_visible,
                newLoading: false,
            })
        }, 300);

    }


    render() {
        const images = this.state.images.slice(0, this.state.visible).map(img => {
            return <Image key={img.id} pic={img.picture} name={img.classification} />
        })
        return (
            <div>

                <h1>Image list</h1>
                {this.state.isLoading ?
                    <Spinner animation="border" role="status"></Spinner>
                    :
                    <>
                        {((this.state.images.length === 0) && (this.state.status)) &&
                            <h3>No Images Classified yet</h3>
                        }
                        {images}
                        {this.state.newLoading &&
                            <Spinner animation="border" role="status"></Spinner>}
                        <br />
                        {((!this.state.isLoading) && (this.state.images.length > this.state.visible) && (this.state.images.length > 2)) &&
                            <Button variant='primary' size='lg' onClick={this.handleVisible}>Load More Images</Button>
                        }
                        {((this.state.images.length <= this.state.visible) && (this.state.images.length > 0)) && 
                            <p> No more images to load</p>
                        }
                    </>
                }
            </div>
        );
    }
}

export default ImageList;