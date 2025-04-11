import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlockById } from '../api/blockApi';
import { 
  Paper, 
  Button,
  Typography, 
  Box, 
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function BlockDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [block, setBlock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlock = async () => {
      setLoading(true);
      try {
        const response = await getBlockById(id);
        setBlock(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch block details');
      } finally {
        setLoading(false);
      }
    };

    fetchBlock();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        {error}
      </Typography>
    );
  }

  if (!block) {
    return (
      <Typography sx={{ mt: 2 }}>
        No block data available
      </Typography>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back to List
      </Button>

      <Typography variant="h5" gutterBottom>
        Block Details: {block.name}
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary="ID" secondary={block.id} />
        </ListItem>
        <Divider />
        
        <ListItem>
          <ListItemText primary="Type" secondary={block.type} />
        </ListItem>
        <Divider />
        
        <ListItem>
          <ListItemText primary="Layer" secondary={block.layer} />
        </ListItem>
        <Divider />
        
        <ListItem>
          <ListItemText 
            primary="Coordinates" 
            secondary={JSON.stringify(block.coordinates, null, 2)} 
          />
        </ListItem>
        <Divider />
        
        <ListItem>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Properties:
            </Typography>
            {Object.entries(block.properties || {}).map(([key, value]) => (
              <Chip
                key={key}
                label={`${key}: ${value}`}
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        </ListItem>
        <Divider />
        
        <ListItem>
          <ListItemText 
            primary="Source File" 
            secondary={`${block.file?.filename} (Uploaded: ${new Date(block.file?.upload_date).toLocaleDateString()})`} 
          />
        </ListItem>
      </List>
    </Paper>
  );
}