import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Divider } from '@mui/material';
import { useCommonStyles } from '../../Utils/Styles';

const ProgramForm = ({ selectedProgramInfo }) => {
  const commonStyles = useCommonStyles();
  const [programName, setProgramName] = useState(selectedProgramInfo ? selectedProgramInfo.programName : '');
  const [programContent, setProgramContent] = useState(selectedProgramInfo ? selectedProgramInfo.programContent : '');
  const [programDate, setProgramDate] = useState(selectedProgramInfo ? selectedProgramInfo.programDate : '');
  const [location, setLocation] = useState(selectedProgramInfo ? selectedProgramInfo.location : '');
  const [programLink, setProgramLink] = useState(selectedProgramInfo ? selectedProgramInfo.programLink : '');
  const [programPhoto, setProgramPhoto] = useState(selectedProgramInfo ? selectedProgramInfo.programPhoto : null);

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setProgramPhoto(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleEditProgram = () => {
    // programName, programContent, programDate, location, programLink, programPhoto varsa ve programName boş değilse
    console.log('Program düzenlendi:', {
      programName,
      programContent,
      programDate,
      location,
      programLink,
      programPhoto
    });
  };

  const isFormValid = () => {
    return (
      programName &&
      programContent &&
      programDate &&
      location &&
      programLink &&
      programPhoto
    );
  };

  return (
    <Container className={commonStyles.container}>
      <Typography variant="h6" className={commonStyles.sectionTitle}>Program Bilgileri</Typography>
      <Divider className={commonStyles.divider} />
      <div className={commonStyles.formContainer}>
        <div className={commonStyles.leftSection}>
          <TextField
            className={commonStyles.field}
            label="Program İsmi"
            variant="outlined"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            required
          />
          <TextField
            className={commonStyles.field}
            label="Program İçeriği"
            variant="outlined"
            value={programContent}
            onChange={(e) => setProgramContent(e.target.value)}
            required
            multiline
            rows={4}
          />
          <TextField
            className={commonStyles.field}
            label="Program Tarihi"
            variant="outlined"
            type="date"
            value={programDate}
            onChange={(e) => setProgramDate(e.target.value)}
            required
            focused
          />
          <TextField
            className={commonStyles.field}
            label="Konum Bilgisi"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <TextField
            className={commonStyles.field}
            label="Program Bağlantısı"
            variant="outlined"
            value={programLink}
            onChange={(e) => setProgramLink(e.target.value)}
            required
          />
        </div>
      </div>
      <Typography variant="h6" className={commonStyles.sectionTitle}>Program Fotoğrafı</Typography>
      <Divider className={commonStyles.divider} />
      <div className={commonStyles.photoUploadContainer}>
        <Paper
          className={commonStyles.uploadImageSection}
          onClick={() => document.getElementById('edit-program-image-upload').click()}
        >
          {programPhoto ? (
            <img src={programPhoto} alt="Program" className={commonStyles.uploadedImage} />
          ) : (
            <div className={commonStyles.uploadText}>Fotoğraf Yükle</div>
          )}
          <input
            type="file"
            id="edit-program-image-upload"
            accept="image/*"
            className={commonStyles.imageInput}
            onChange={handleImageUpload}
          />
        </Paper>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEditProgram}
        disabled={!isFormValid()}
      >
        Programı Düzenle
      </Button>
    </Container>
  );
};

export default ProgramForm;
