import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';

export default function HomePage() {
  const navigate = useNavigate();
  const [refreshFiles, setRefreshFiles] = useState(false);

  const handleUploadSuccess = (result) => {
    // Navigate to the blocks page for the newly uploaded file
    navigate(`/files/${result.fileId}/blocks`);
  };

  return (
    <div>
      <FileUpload onUploadSuccess={handleUploadSuccess} />
      <FileList refreshFiles={refreshFiles} setRefreshFiles={setRefreshFiles} />
    </div>
  );
}