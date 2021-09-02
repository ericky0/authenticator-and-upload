import GlobalStyle from '../../styles/global';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import FileList from '../../components/FileList/index';
import { Container, Content } from './style';
import Upload from '../../components/UploadZone/index.js';
import { Component } from 'react';
import api from '../../services/api'
import { ThreeSixtyTwoTone } from '@material-ui/icons';


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

        uploadedFiles.forEach(this.processUpload);
    };

    updateFile = (id, data) => {
        this.setState({
            uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
            return id === uploadedFile.id ? { ...uploadedFile, ...data,  } : uploadedFile;
        })
    });
    }
    
    processUpload = (uploadedFile) => {
        const data = new FormData();

        data.append('file', uploadedFile.file, uploadedFile.name);

        api.post('upload', data, {
            onUploadProgress: event => {
                const progress = parseInt(Math.round(event.loaded * 100 / event.total));
                this.updateFile(uploadedFile.id, {
                    progress,
                })
            }
        }).then(response => {
            this.updateFile(uploadedFile.id, {
                uploaded: true,
                id: response.data._id,
                url: response.data.url
            });
        }).catch(() => {
            this.updateFile(uploadedFile.id, {
                error: true
            });
        });
    }

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
