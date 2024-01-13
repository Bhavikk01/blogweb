import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/api_hook';

const BlogDetailsPage = () => {

    const { user } = useSelector((state) => state.user);
    const { id } = useParams();
    const { data } = useFetch(`/api/getBlogById/${id}`);

    return (
        <div>
            {data && <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>}
        </div>
    );
}

export default BlogDetailsPage;