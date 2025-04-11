import { useState } from 'react';
import { uploadCadFile } from '../api/cadApi';
import { Button, CircularProgress, Typography, Paper } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

export default function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setIsLoading(true);
    try {
      const result = await uploadCadFile(file);
      onUploadSuccess(result);
      setFile(null);
      e.target.reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Upload CAD File
      </Typography>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="cad-file-upload"
          accept=".dxf,.dwg"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="cad-file-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUpload />}
            sx={{ mr: 2 }}
          >
            Choose File
          </Button>
        </label>
        <Typography component="span">
          {file ? file.name : 'No file selected'}
        </Typography>
        
        {file && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ mt: 2, display: 'block' }}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              'Upload and Process'
            )}
          </Button>
        )}
        
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </form>
    </Paper>
  );
}