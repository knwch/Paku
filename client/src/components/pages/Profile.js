import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import RecommendCard from '../cards/RecommendCard';
import {
    Card,
    Icon,
    Input,
    Divider,
    Button,
    Image,
    Modal,
    Grid,
    Container,
    Responsive,
    Form,
    TextArea,
    Label,
    Transition,
    Loader
} from 'semantic-ui-react';
import { getCurrentProfile, editProfile, uploadImage } from '../../redux/actions/profileActions';
import { getPosts } from '../../redux/actions/postActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { storage } from '../../config/firebase-config';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            formOpen: false,
            posts: [],
            filename: "",
            username: "",
            firstname: "",
            lastname: "",
            rate: "",
            about: "",
            temp: "",
            email: "",
            phone: "",
            tempphone: "",
            photo: null,
            preview: null,
            close: true,
            errors: {}
        };

        this.validator = new SimpleReactValidator({
            validators: {
                imgerror: {  // name the rule
                    message: ':values',
                    rule: (val, params, validator) => params === null,
                    messageReplace: (message, params) => message.replace(':values', params)  // optional
                }
            },
            element: message =>
                <div>
                    <Transition
                        animation='shake'
                        duration={250}
                        transitionOnMount={true}
                    >
                        <Label basic color='red' pointing>{message}</Label>
                    </Transition>
                    <br />
                </div>,
            messages: {
                required: 'โปรดระบุ:attribute',
                phone: 'โปรดระบุเบอร์โทรศัพท์ 10 หลัก'
            }
        });
    }

    fileInputRef = React.createRef();

    componentWillMount() {
        document.title = "Paku - Profile"
        this.props.getCurrentProfile();
        this.props.getPosts();
    }

    componentWillReceiveProps(nextProps) {

        const posts = nextProps.post.posts;
        const profile = nextProps.profile.profile;
        const postsFind = posts.filter((val) => val.user === (profile && profile._id))

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if (profile) {
            this.setState({
                username: profile.username,
                firstname: profile.name.firstname,
                lastname: profile.name.lastname,
                rate: profile.rate,
                about: profile.aboutMe,
                temp: profile.aboutMe,
                email: profile.email,
                phone: profile.phone,
                tempphone: profile.phone,
                photo: profile.photo_user
            })
        }

        if (postsFind.length !== 0) {
            this.setState({
                posts: postsFind
            })
        }
    }

    onSubmit(e) {
        if (this.validator.fieldValid('เบอร์โทรศัพท์')) {
            e.preventDefault();
            const newProfile = {
                about: this.state.temp,
                phone: this.state.tempphone
            }
            this.props.editProfile(newProfile, this.props.history)
            this.handleCloseForm();
            // console.log(this.state.temp, this.state.tempphone);
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    // Handle fields change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    handleOpenForm = () => this.setState({ formOpen: true })

    handleCloseForm = () => {
        this.setState({
            formOpen: false
        });
    }

    handleOpenModal = () => this.setState({ modalOpen: true })

    handleCloseModal = () => {
        this.setState({
            modalOpen: false,
            preview: null,
            temp: null
        })
    }

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
                this.validator.showMessages();
            } else {
                if (file.size <= size) {
                    this.setState({
                        preview: URL.createObjectURL(file),
                        temp: file
                    });
                    this.handleOpenModal();
                } else {
                    err = { image: "รองรับขนาดไฟล์ไม่เกิน 1 MB" };
                    // console.log(err);
                    this.setState({
                        ...this.state,
                        errors: err
                    });
                    this.validator.showMessages();
                }
            }
        }
    };

    handleUpload(e) {
        e.preventDefault();
        let imageObj = {};

        let currentImageName = "firebase-image-" + Date.now();

        let uploadImage = storage.ref(`images/${currentImageName}`).put(this.state.temp);

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
                        this.handleCloseModal();

                        this.setState({
                            preview: null,
                            temp: null
                        })
                    })
            }
        )
    }

    ProfileForm = (temp) => {
        switch (temp) {
            case false:
                return (
                    <Card.Content>

                        <Card.Header className='pb-1' textAlign='left'>
                            {this.state.firstname + ' ' + this.state.lastname}
                        </Card.Header>

                        <Card.Meta className='pb-1' textAlign='left'>
                            {this.state.username}
                        </Card.Meta>

                        <Card.Description className='pb-1' textAlign='left'>
                            <Icon name='yellow star' />
                            {this.state.rate}
                        </Card.Description>

                        <Divider />

                        <Card.Description className='pb-1' textAlign='left'>
                            <Icon name='comment' flipped='horizontally' />
                            {this.state.about}
                        </Card.Description>

                        <Card.Description className='pb-1' textAlign='left'>
                            <Icon name='phone' flipped='horizontally' />
                            {this.state.phone}
                        </Card.Description>

                        <Card.Description className='pb-1' textAlign='left'>
                            <Icon name='mail' />
                            {this.state.email}
                        </Card.Description>

                        <div className='text-center mt-1'>
                            <Button
                                onClick={this.handleOpenForm}
                                basic
                                circular
                                size='tiny'
                            >
                                <Icon name='edit outline' /> <text>แก้ไขข้อมูล</text>
                            </Button>
                        </div>

                    </Card.Content>
                );
            case true:
                return (
                    <Card.Content>
                        <Form className="text-left">
                            <Form.Field>
                                <Input transparent fluid iconPosition='left' defaultValue={this.state.firstname + ' ' + this.state.lastname} disabled>
                                    <Icon name='vcard' />
                                    <input type="text" />
                                </Input>
                            </Form.Field>
                            <Form.Field>
                                <Input transparent fluid iconPosition='left' defaultValue={this.state.username} disabled>
                                    <Icon name='user' />
                                    <input type="text" />
                                </Input>
                            </Form.Field>
                            <Form.Field>
                                <TextArea rows={3} placeholder='เกี่ยวกับตัวฉัน...' onChange={this.handleChange('temp')} defaultValue={this.state.about} />
                            </Form.Field>
                            <Form.Field>
                                <Input fluid iconPosition='left' placeholder={this.state.phone}>
                                    <Icon name='phone' flipped='horizontally' />
                                    <input maxlength='10' type="text" onChange={this.handleChange('tempphone')} defaultValue={this.state.tempphone} />
                                </Input>
                                {this.validator.message('เบอร์โทรศัพท์', this.state.tempphone, 'required|phone')}
                            </Form.Field>
                            <Form.Field>
                                <Input transparent fluid iconPosition='left' defaultValue={this.state.email} disabled>
                                    <Icon name='mail' />
                                    <input type="text" />
                                </Input>
                            </Form.Field>

                            <div className='text-right'>
                                <Button basic onClick={this.handleCloseForm}>
                                    <text>ยกเลิก</text>
                                </Button>
                                <Button className='btn-paku' onClick={(e) => this.onSubmit(e)}>
                                    <Icon name='checkmark' /> <text>แก้ไข</text>
                                </Button>
                            </div>

                        </Form>
                    </Card.Content>
                );
            default:

        }
    }

    render() {
        const { profile, loading } = this.props.profile
        let errors = this.state.errors
        if (profile === null || loading) {
            return (
                <Modal
                    open={true}
                    className="modal-paku"
                    size='mini'
                    basic
                >
                    <Loader size='large' active inline='centered'><p>โปรดรอสักครู่</p></Loader>
                </Modal>
            );
        } else {
            return (
                <Responsive>
                    <Container fluid>
                        <Grid className='mb-4' centered>
                            <Grid.Column mobile={15} tablet={5} computer={5}>
                                <Card fluid>

                                    <Card.Content className='card-color' textAlign='center'>
                                        <div class="button-floated">
                                            <div className='img-center-circle' >
                                                <Image src={this.state.photo} wrapped ui={false} />
                                            </div>
                                            <Button
                                                as='a'
                                                circular
                                                icon='photo'
                                                onClick={() => this.fileInputRef.current.click()}
                                            />
                                            <input
                                                ref={this.fileInputRef}
                                                type="file"
                                                hidden
                                                onChange={this.fileChange}
                                            />
                                        </div>

                                        {this.validator.message('err', errors.image, `imgerror:${errors.image}`)}

                                        <Modal
                                            open={this.state.modalOpen}
                                            className="modal-paku"
                                            size='mini'
                                        >
                                            <Modal.Content className='text-center'>
                                                <div className='img-center' >
                                                    <Image src={this.state.preview} size='small' centered wrapped />
                                                </div>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button basic onClick={this.handleCloseModal}>
                                                    <text>ยกเลิก</text>
                                                </Button>
                                                <Button className='btn-paku' onClick={(e) => this.handleUpload(e)}>
                                                    <Icon name='checkmark' /> <text>อัพโหลด</text>
                                                </Button>
                                            </Modal.Actions>
                                        </Modal>

                                    </Card.Content>

                                    {this.ProfileForm(this.state.formOpen)}

                                </Card>
                            </Grid.Column>
                            <Grid.Column mobile={15} tablet={11} computer={11}>
                                <Card fluid>
                                    <Card.Content>
                                        <Card.Header textAlign='left' className='py-3'>
                                            <div>ที่จอดรถของฉัน</div>
                                        </Card.Header>
                                        <Card.Description>
                                            <Grid textAlign='center' stackable columns={3}>
                                                {this.state.posts.map((post, index) => {
                                                    return (
                                                        <Grid.Column key={index}>
                                                            <RecommendCard
                                                                photo={post.photos}
                                                                title={post.title}
                                                                rate={post.rate.rating}
                                                                price={post.price}
                                                                url={`/post/${post._id}`}
                                                            />
                                                        </Grid.Column>
                                                    )
                                                })}
                                            </Grid>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid>
                    </Container>
                </Responsive >
            );
        }
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    post: state.post,
    errors: state.errors
});

export default connect(mapStateToProps, { getCurrentProfile, editProfile, uploadImage, getPosts })(withRouter(Profile));

