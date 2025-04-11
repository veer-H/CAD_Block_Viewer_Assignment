import { Button, Stack, Typography } from '@mui/material';

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  sx 
}) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Stack 
      direction="row" 
      spacing={2} 
      alignItems="center" 
      justifyContent="center"
      sx={sx}
    >
      <Button
        variant="outlined"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      
      <Typography variant="body1">
        Page {currentPage} of {totalPages}
      </Typography>
      
      <Button
        variant="outlined"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Stack>
  );
}