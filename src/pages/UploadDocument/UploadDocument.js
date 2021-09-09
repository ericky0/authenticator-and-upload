import GlobalStyle from '../../styles/global';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import FileList from '../../components/FileList/index';
import { Container, Content } from './style';
import Upload from '../../components/UploadZone/index.js';
import { useEffect, useState } from 'react';
import api from '../../services/api'
import history from '../../utils/History'

export default function UploadDocument({ location }) {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    console.log(location);
    const { userId } = location.state;
    
    useEffect(() => {
        if(!location.state){ 
            history.push('/dashboard')
        }
        (async () => {
            const response = await api.get(`/finduploadbyid/${userId}`);
            setUploadedFiles(
                response.data.map(file => ({
                    id: file.key,
                    name: file.name,
                    readableSize: filesize(file.size),
                    preview: file.url,
                    uploaded: true,
                    url: file.url,
                })
            ))
        
        })()

        return () => uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    }, [])

    const handleUpload = async files => {
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

        setUploadedFiles((state) => state.concat(uploadedFiles))
        
        for (const fileToUpload of uploadedFiles) {
            console.log('file to upload', fileToUpload)
            await processUpload(fileToUpload)
            console.log('a proomise terminou')
        }
    };

    const updateFile = (id, data) => {
        setUploadedFiles((state) => state.map(uploadedFile => {
            return id === uploadedFile.id ? { ...uploadedFile, ...data,  } : uploadedFile;
        }))
        console.log(id, data);
        console.log(uploadedFiles);
    };

    const processUpload = async (uploadedFile) => {
        const data = new FormData();

        data.append('file', uploadedFile.file, uploadedFile.name);
        data.append('userId', userId)

        const response = await api.post('/upload', data, {
            onUploadProgress: event => {
                const progress = parseInt(Math.round(event.loaded * 100 / event.total));
                console.log(progress);
                updateFile(uploadedFile.id, {progress})
                console.log('passou')
            }
        }).catch(() => {
            updateFile(uploadedFile.id, {
                error: true
                
            });
        })
        if(!response){
            alert('Arquivo não suportado, verifique o tipo e o tamanho (max 2MB)')
            return
        }
        updateFile(uploadedFile.id, {
            uploaded: true,
            id: response.data.key,
            url: response.data.url
        })
    }

    const handleDelete = async (id) => {
        await api.delete(`deleteupload/${id}`);
        setUploadedFiles((state) => state.filter(file => file.id !== id))
    }


    return (
            <Container>
                <GlobalStyle />
                <Content>
                    <Upload onUpload={handleUpload}/>
                    {!!uploadedFiles.length && (
                        <FileList files={uploadedFiles} onDelete={handleDelete}/>
                    )}
                </Content>
            </Container>
    )
}
