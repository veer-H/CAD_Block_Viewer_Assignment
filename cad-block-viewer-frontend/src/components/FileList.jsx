import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFiles } from '../api/cadApi';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Box,
  Chip
} from '@mui/material';
import { InsertDriveFile, List } from '@mui/icons-material';

export default function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getAllFiles();
        setFiles(response.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch files');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

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

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Available CAD Files
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File</TableCell>
              <TableCell>Uploaded</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InsertDriveFile sx={{ mr: 1 }} />
                    {file.filename}
                  </Box>
                </TableCell>
                <TableCell>{formatDate(file.createdAt)}</TableCell>
                <TableCell>
                  <Chip
                    label={file.processed ? 'Processed' : 'Pending'}
                    color={file.processed ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<List />}
                    onClick={() => navigate(`/files/${file.id}/blocks`)}
                    disabled={!file.processed}
                  >
                    View Blocks
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}