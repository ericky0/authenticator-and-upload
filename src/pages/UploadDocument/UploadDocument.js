import GlobalStyle from '../../styles/global';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import FileList from '../../components/FileList/index';
import { Container, Content } from './style';
import Upload from '../../components/UploadZone/index.js';
import { Component } from 'react';
import api from '../../services/api'


class UploadDocument extends Component {

    state = {
        uploadedFiles: [],
    };


    async componentDidMount() {
        const response = await api.get('/listupload');
        this.setState({
            uploadedFiles: response.data.map(file => ({
                id: file.key,
                name: file.name,
                readableSize: filesize(file.size),
                preview: file.url,
                uploaded: true,
                url: file.url,
            }))

        })
    } 

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
            console.log(response);
            this.updateFile(uploadedFile.id, {
                uploaded: true,
                id: response.data.key,
                url: response.data.url
            });
        }).catch(() => {
            this.updateFile(uploadedFile.id, {
                error: true
            });
        });
    }

    handleDelete = async id => {
        await api.delete(`deleteupload/${id}`);

        this.setState({
            uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
        })
    }

    componentWillUnmount() {
        this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
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
                        <FileList files={uploadedFiles} onDelete={this.handleDelete}/>
                    )}
                </Content>
            </Container>
        );
    }
}

export default UploadDocument;
