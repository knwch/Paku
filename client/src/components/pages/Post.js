import React, { Component } from 'react';
import PostFormStep1 from '../forms/postforms/PostFormStep1';
import PostFormStep2 from '../forms/postforms/PostFormStep2';
import PostFormStep3 from '../forms/postforms/PostFormStep3';
import PostConfirm from '../forms/postforms/PostConfirm';
import { addPost } from '../../redux/actions/postActions';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { storage } from '../../config/firebase-config';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            title: '',
            photos: [],
            preview: [],
            filetemp: [],
            price: '',
            typeofpark: '',
            numberofcar: '',
            typeofcar: '',
            explain: '',
            rule: [],
            addrule: '',
            nearby: [],
            addnearby: '',
            facility: [],
            addfacility: [
                { key: '0', text: 'CCTV', value: 'CCTV', checked: false },
                { key: '1', text: 'ห้องน้ำ', value: 'ห้องน้ำ', checked: false },
                { key: '2', text: 'รั้ว', value: 'รั้ว', checked: false },
                { key: '3', text: 'หลังคากันแดด / กันฝน', value: 'หลังคากันแดด / กันฝน', checked: false }
            ],
            open: '',
            close: '',
            address: '',
            location: {
                lat: 13.7563,
                lng: 100.5018
            },
            zoom: 17,
            show: false,
            errors: {}
        }
    }

    componentDidMount = () => {
        document.title = "Paku - Posting"
        const { user } = this.props.auth

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState(prevState => ({
                        location: {
                            ...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        zoom: 17,
                        show: true
                    }))
                }
            )
        }

        if (user.idCard.confirm === false) {
            this.props.history.push('/confirmcard')
        }
    }

    fileChange = e => {
        // console.log(e.target.files[0])
        if (typeof e.target.files[0] !== 'undefined') {
            let file = e.target.files[0];
            let err = {}
            const types = ['image/png', 'image/jpeg', 'image/jpg']
            const size = 1024000;
            // console.log(file.size);
            if (this.state.preview.length >= 3 && this.state.filetemp.length >= 3) {
                this.state.preview.slice(0, 3)
                this.state.filetemp.slice(0, 3)
            } else if (types.every(type => file.type !== type)) {
                err = { image: "ไฟล์ไม่รองรับ" }
                this.setState({
                    ...this.state,
                    errors: err
                });
                // this.validator.showMessages();
            } else {
                if (file.size <= size) {
                    const previewURL = this.state.preview.concat(URL.createObjectURL(file))
                    const fileObject = this.state.filetemp.concat(file)
                    this.setState({
                        preview: previewURL,
                        filetemp: fileObject
                    });
                } else {
                    err = { image: "รองรับขนาดไฟล์ไม่เกิน 1 MB" };
                    // console.log(err);
                    this.setState({
                        ...this.state,
                        errors: err
                    });
                    // this.validator.showMessages();
                }
            }
        }
    }

    removeFile = index => {
        this.setState(({ preview }) => {
            const mPreview = [...preview]
            mPreview.splice(index, 1)
            return { preview: mPreview }
        })
        this.setState(({ filetemp }) => {
            const mFiletemp = [...filetemp]
            mFiletemp.splice(index, 1)
            return { filetemp: mFiletemp }
        })
    }

    handleUpload = (e) => {
        e.preventDefault();
        let image = []; 
        for (var i = 0; i < this.state.filetemp.length; i++) {

            let currentImageName = "post-image-" + Date.now() + "-" + i;
            let uploadImage = storage.ref(`post/${currentImageName}`).put(this.state.filetemp[i]);

            uploadImage.on('state_changed',
                (snapshot) => { },
                (error) => {
                    alert(error);
                },
                () => {
                    storage.ref('post').child(currentImageName).getDownloadURL()
                        .then(url => {
                            image.push(url)
                        })
                }
            )
        }
        console.log(image)
    }

    handleMarker = ({ lat, lng }) => {
        this.setState({
            location: {
                lat: lat,
                lng: lng
            },
            show: true
        })
    }

    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    handleAddRule = () => {
        const ruleArray = this.state.rule.concat(this.state.addrule)
        this.setState({
            rule: ruleArray,
            addrule: ''
        })
    }

    handleAddNearby = () => {
        const nearbyArray = this.state.nearby.concat(this.state.addnearby)
        this.setState({
            nearby: nearbyArray,
            addnearby: ''
        })
    }

    deleteRuleItem = index => {
        this.setState(({ rule }) => {
            const mRule = [...rule]
            mRule.splice(index, 1)
            return { rule: mRule }
        })
    }

    deleteNearbyItem = index => {
        this.setState(({ nearby }) => {
            const mNearby = [...nearby]
            mNearby.splice(index, 1)
            return { nearby: mNearby }
        })
    }

    handleFacility = (facility) => {
        const facilityFilter = this.state.addfacility.filter((val) => val.key === facility.key)
        const facilityObject = facilityFilter[0]
        if (facilityObject.checked === false) {
            facilityObject.checked = true
            const facilityArray = this.state.facility.concat(facilityObject.value)
            this.setState({
                facility: facilityArray
            })
        } else if (facilityObject.checked === true) {
            facilityObject.checked = false
            this.setState(({ facility }) => {
                const mFacility = [...facility]
                var position = mFacility.indexOf(facilityObject.value);
                mFacility.splice(position, 1)
                return { facility: mFacility }
            })
        }
    }

    handleCancelLocation = () => {
        this.setState({
            location: {
                lat: 13.7563,
                lng: 100.5018
            }
        })
    }

    setPrice = input => {
        this.setState({
            price: input
        })
    }

    // Handle fields change
    handleChange = input => (e, { value }) => {
        this.setState({ [input]: value });
    }

    handleSubmit = (e) =>  {
        e.preventDefault();
        this.handleUpload(e);
        this.nextStep()
        const newPost = {
            title: this.state.title,
            imagePost: this.state.photos,
            longitude: this.state.location.longitude,
            latitude: this.state.location.latitude,
            address: this.state.address,
            open: this.state.open,
            close: this.state.close,
            typeofpark: this.state.typeofpark,
            numberofcar: this.state.numberofcar,
            typeofcar: this.state.typeofcar,
            explain: this.state.explain,
            rule: this.state.rule,
            nearby: this.state.nearby,
            facility: this.state.facility,
            price: this.state.price
        }
        // console.log(newPost);
        // this.props.addPost(newPost);
    }

    render() {
        const { step } = this.state;
        const {
            title,
            address,
            location,
            open,
            close,
            typeofpark,
            numberofcar,
            typeofcar,
            explain,
            rule,
            addrule,
            nearby,
            addnearby,
            facility,
            addfacility,
            zoom,
            show,
            price,
            preview,
            filetemp } = this.state;
        const values =
        {
            title,
            address,
            location,
            zoom,
            show,
            open,
            close,
            typeofpark,
            numberofcar,
            typeofcar,
            explain,
            rule,
            addrule,
            nearby,
            addnearby,
            facility,
            addfacility,
            price,
            preview,
            filetemp
        };

        // eslint-disable-next-line default-case
        switch (step) {
            case 1:
                return (
                    <PostFormStep1
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleMarker={this.handleMarker}
                        handleCancelLocation={this.handleCancelLocation}
                        values={values}
                    />
                );
            case 2:
                return (
                    <PostFormStep2
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleAddRule={this.handleAddRule}
                        handleAddNearby={this.handleAddNearby}
                        deleteRuleItem={this.deleteRuleItem}
                        deleteNearbyItem={this.deleteNearbyItem}
                        handleFacility={this.handleFacility}
                        values={values}
                    />
                );
            case 3:
                return (
                    <PostFormStep3
                        nextStep={this.handleSubmit}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        setPrice={this.setPrice}
                        fileChange={this.fileChange}
                        removeFile={this.removeFile}
                        values={values}
                    />
                );
            case 4:
                return (
                    <PostConfirm
                        values={values}
                    />
                );
        }

    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    errors: state.errors
});

export default connect(mapStateToProps, { addPost })(withRouter(Post))