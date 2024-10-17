import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Web3Context } from '../src/components/providers/Web3Provider';
import { useForm } from 'react-hook-form';
import {
    TextField,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    CircularProgress,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: 'column',
        display: 'flex',
        margin: '20px auto',
        padding: theme.spacing(2),
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
        maxWidth: 400,
        transition: 'transform 0.3s',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        cursor: 'pointer',
        borderRadius: '16px',
        border: '2px solid #ccc',
    },
    button: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
}));

const defaultFileUrl = 'https://miro.medium.com/max/250/1*DSNfSDcOe33E2Aup1Sww2w.jpeg';

export default function CreateNFT() {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(defaultFileUrl);
    const classes = useStyles();
    const { register, handleSubmit, reset } = useForm();
    const { nftContract } = useContext(Web3Context);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function createNft(metadataUrl) {
        const transaction = await nftContract.mintToken(metadataUrl);
        const tx = await transaction.wait();
        const event = tx.events[0]; // Fixed to access `events`
        const tokenId = event.args[2]; // Fixed typo
        return tokenId;
    }

    async function uploadFileToIPFS(formData) {
        const { data } = await axios.post('/api/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data.url;
    }

    function createNFTFormDataFile(name, description, file) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('file', file);
        return formData;
    }

    async function onFileChange(event) {
        if (!event.target.files[0]) return;
        setFile(event.target.files[0]);
        setFileUrl(URL.createObjectURL(event.target.files[0]));
    }

    async function onSubmit({ name, description }) {
        try {
            if (!file || isLoading) return;
            setIsLoading(true);
            const formData = createNFTFormDataFile(name, description, file);
            const metadataUrl = await uploadFileToIPFS(formData);
            const tokenId = await createNft(metadataUrl);
            // addNFTToList(tokenId);
            setFileUrl(defaultFileUrl);
            reset();
            router.push('/my-nfts');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className={classes.root} component="form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="file-input">
                <CardMedia
                    className={classes.media}
                    alt="Upload image"
                    image={fileUrl}
                />
            </label>
            <input
                style={{ display: 'none' }}
                type="file"
                name="file"
                id="file-input"
                onChange={onFileChange}
            />
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    Create Your NFT
                </Typography>
                <TextField
                    id="name-input"
                    label="Name"
                    name="name"
                    size="small"
                    fullWidth
                    required
                    margin="dense"
                    disabled={isLoading}
                    {...register('name')}
                />
                <TextField
                    id="description-input"
                    label="Description"
                    name="description"
                    size="small"
                    multiline
                    rows={2}
                    fullWidth
                    required
                    margin="dense"
                    disabled={isLoading}
                    {...register('description')}
                />
            </CardContent>
            <CardActions>
                <Button className={classes.button} size="small" type="submit">
                    {isLoading ? <CircularProgress size="20px" /> : 'Create'}
                </Button>
            </CardActions>
        </Card>
    );
}