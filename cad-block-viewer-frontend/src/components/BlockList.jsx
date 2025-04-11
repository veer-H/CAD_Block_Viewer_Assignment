import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlocks } from '../api/blockApi';
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
  Box
} from '@mui/material';
import Pagination from './Pagination';

export default function BlockList() {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1
  });

  const fetchBlocks = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getBlocks(fileId, page, pagination.limit);
      setBlocks(response.data);
      setPagination(prev => ({
        ...prev,
        page,
        totalItems: response.pagination.totalItems,
        totalPages: response.pagination.totalPages
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch blocks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fileId) {
      fetchBlocks();
    }
  }, [fileId]);

  const handlePageChange = (newPage) => {
    fetchBlocks(newPage);
  };

  const handleRowClick = (blockId) => {
    navigate(`/blocks/${blockId}`);
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
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Blocks in File
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Layer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blocks.map((block) => (
              <TableRow 
                key={block.id}
                hover
                onClick={() => handleRowClick(block.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{block.name}</TableCell>
                <TableCell>{block.type}</TableCell>
                <TableCell>{block.layer}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(block.id);
                    }}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          sx={{ mt: 3 }}
        />
      )}
    </Paper>
  );
}