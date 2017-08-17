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
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    handleFileRemove = (file) => {
        this.props.deleteUnitImage(file);
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
        <div>
            <h2 className="fs-title">Units Photos</h2>
            <h3 className="fs-subtitle">Popular listings have a minimum of 10 pictures. Add yours here.</h3>
            <div className="clearfix">
                <Upload
                    action={"https://rentright-laravel-api.herokuapp.com/api/users/unit/"+this.props.uuid+"/image"}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.handleFileRemove}
                    headers={
                        {
                            Authorization: "Bearer "+localStorage.getItem('rs_token'),
                        }
                    }
                >
                    {fileList.length >= 10 ? null : uploadButton}
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
    deleteUnitImage: PropTypes.func.isRequired,

}

export default connect(null,{deleteUnitImage})(Photos);

