import React, {Component} from 'react';
import { Upload, Icon, Modal } from 'antd';
import 'antd/dist/antd.css';
import {deleteUnitImage} from '../../../../../../../state/actions/userActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Photos extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: this.props.images,
        rooms: this.props.images.filter((image) => {
            return image.section === "room"
        }),
        kitchen: this.props.images.filter((image) => {
            return image.section === "kitchen"
        }),
        toilet: this.props.images.filter((image) => {
            return image.section === "toilet"
        }),
        others: this.props.images.filter((image) => {
            return image.section === "others"
        })
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => {
        const clicked = this.state.clicked;
        this.setState({[clicked]: fileList })
    }

    handleFileRemove = (file) => {
        deleteUnitImage(file);
    }

    setClicked(clicked){
        this.setState({clicked});
    }

    render() {
        const { previewVisible, previewImage, fileList,rooms,kitchen,toilet,others } = this.state;
        const uploadButton = (clicked) =>
            <div onClick={()=> this.setClicked(clicked)}>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        ;
        return (
        <div>
            <h2 className="fs-title">Units Photos</h2>
            <h3 className="fs-subtitle">Popular listings have a minimum of 10 pictures. Add yours here.</h3>
            <div className="clearfix">
                <h4><b>Rooms</b></h4>
                <Upload
                    action={"https://rentright-laravel-api.herokuapp.com/api/units/"+this.props.uuid+"/images?section=room"}
                    listType="picture-card"
                    fileList={rooms}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange.bind(this)}
                    onRemove={this.handleFileRemove}
                    headers={
                        {
                            Authorization: "Bearer "+this.props.user.uuid,
                        }
                    }
                >
                    {rooms.length >= 10 ? null : uploadButton('rooms')}
                </Upload>
                <h4><b>Kitchen</b></h4>
                <Upload
                    action={"https://rentright-laravel-api.herokuapp.com/api/units/"+this.props.uuid+"/images?section=kitchen"}
                    listType="picture-card"
                    fileList={kitchen}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange.bind(this)}
                    onRemove={this.handleFileRemove}
                    headers={
                        {
                            Authorization: "Bearer "+this.props.user.uuid,
                        }
                    }
                >
                    {kitchen.length >= 10 ? null : uploadButton('kitchen')}
                </Upload>
                <h4><b>Toilets</b></h4>
                <Upload
                    action={"https://rentright-laravel-api.herokuapp.com/api/units/"+this.props.uuid+"/images?section=toilet"}
                    listType="picture-card"
                    fileList={toilet}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange.bind(this)}
                    onRemove={this.handleFileRemove}
                    headers={
                        {
                            Authorization: "Bearer "+this.props.user.uuid,
                        }
                    }
                >
                    {kitchen.length >= 10 ? null : uploadButton('toilet')}
                </Upload>
                <h4><b>Others</b></h4>
                <Upload
                    action={"https://rentright-laravel-api.herokuapp.com/api/units/"+this.props.uuid+"/images?section=others"}
                    listType="picture-card"
                    fileList={others}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange.bind(this)}
                    onRemove={this.handleFileRemove}
                    headers={
                        {
                            Authorization: "Bearer "+this.props.user.uuid,
                        }
                    }
                >
                    {others.length >= 10 ? null : uploadButton('others')}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        </div>
        );
    }

}

Photos.propTypes = {
    user: PropTypes.object,
}

function mapStateToProps(state) {
    return {
        user: state.user.auth.user,
    }
}

export default connect(mapStateToProps)(Photos);

