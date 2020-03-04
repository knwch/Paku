import React, { Component } from 'react';
import { Grid, Form, Responsive, Container, Button, Icon, Header, Modal, Input } from 'semantic-ui-react';
import { storage } from '../../config/firebase-config';

class ConfirmCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idCard: '',
            photo: null,
            filetemp: '',
            errors: {}
        }
    }

    fileInputRef = React.createRef();

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    fileChange = e => {
        // console.log(e.target.files[0])
        if (typeof e.target.files[0] !== 'undefined') {
            let file = e.target.files[0];
            let err = {}
            const types = ['image/png', 'image/jpeg', 'image/jpg']
            const size = 1024000;
            // console.log(file.size);
            if (types.every(type => file.type !== type)) {
                err = { image: "ไฟล์ไม่รองรับ" }
                this.setState({
                    ...this.state,
                    errors: err
                });
                // this.validator.showMessages();
            } else {
                if (file.size <= size) {
                    this.setState({
                        filetemp: file
                    });
                    // this.handleOpenModal();
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
    };

    handleUpload(e) {
        e.preventDefault();
        let imageObj = {};

        let currentImageName = "firebase-image-" + Date.now();

        let uploadImage = storage.ref(`images/${currentImageName}`).put(this.state.filetemp);

        uploadImage.on('state_changed',
            (snapshot) => { },
            (error) => {
                alert(error);
            },
            () => {
                storage.ref('images').child(currentImageName).getDownloadURL()
                    .then(url => {
                        this.setState({
                            firebaseImg: url
                        })

                        imageObj = {
                            imageURL: url
                        }

                        this.props.uploadImage(imageObj)

                        this.setState({
                            filetemp: null
                        })
                    })
            }
        )
    }

    onSubmit(e) {
        e.preventDefault();

    };

    render() {

        let field;

        if (this.state.filetemp.name != null) {
            field =
                <Form.Field className="text-left">
                    <Input iconPosition='left' disabled fluid>
                        <Icon name='photo' />
                        <input type="text" value={this.state.filetemp.name} />
                    </Input>
                </Form.Field>
        }

        return (
            <Responsive>
                <Container fluid>
                    <Grid centered className='mb-4'>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Header className='mb-5 text-center' as='h3'><div>ยืนยันตัวตนของคุณก่อนที่จะเริ่มลงประกาศ</div></Header>
                            <Form>
                                <Header as='h4'><div>บัตรประชาชน</div></Header>
                                <div className='mb-2'>เพื่อทำการยืนยันตัวตนของคุณ คุณสามารถดูตัวอย่างการอัปโหลดได้ที่นี่</div>

                                <Form.Field className="text-left">
                                    <Input fluid placeholder='เลขบัตรประชาชน (ไม่ต้องเติมขีดหรือเว้นว่าง)'>
                                        <input type="text" className="form-control" onChange={this.handleChange('idCard')} value={this.state.idCard} />
                                    </Input>
                                </Form.Field>

                                {field}

                                <Form.Field className="text-center">
                                    <Button
                                        className='btn-paku-light mb-3'
                                        content=''
                                        onClick={() => this.fileInputRef.current.click()}
                                    >
                                        <Button.Content visible>อัปโหลดภาพคุณกับบัตรประชาชน</Button.Content>
                                    </Button>
                                    <input
                                        ref={this.fileInputRef}
                                        type="file"
                                        hidden
                                        onChange={this.fileChange}
                                    />
                                </Form.Field>

                                <div className='d-flex justify-content-end'>
                                    <Button onClick={this.onSubmit} className='btn-paku' color='yellow' animated>
                                        <Button.Content visible>ยืนยัน</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='arrow right' />
                                        </Button.Content>
                                    </Button>
                                </div>

                            </Form>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Responsive>
        )
    }

}

export default ConfirmCard;