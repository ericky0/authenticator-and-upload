import GlobalStyle from '../../styles/global';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import FileList from '../../components/FileList/index';
import { Container, Content } from './style';
import Upload from '../../components/UploadZone/index.js';
import { Component } from 'react';


class UploadDocument extends Component {

    state = {
        uploadedFiles: [],
    };

    handleUpload = files => {
        const uploadedFiles = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
        }))

        this.setState({
            uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
        });
    };

    render() {
        const {uploadedFiles} = this.state;
        console.log(uploadedFiles)
        return(
            <Container>
                <GlobalStyle />
                <Content>
                    <Upload onUpload={this.handleUpload}/>
                    {!!uploadedFiles.length && (
                        <FileList files={uploadedFiles}/>
                    )}
                </Content>
            </Container>
        );
    }
}

export default UploadDocument;
