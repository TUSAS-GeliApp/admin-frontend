import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Divider } from '@mui/material';
import { useCommonStyles } from '../../Utils/Styles';

const NewsletterForm = ({selectedNewsletterInfo}) => {
  const commonStyles = useCommonStyles();
  const [authorName, setAuthorName] = useState(selectedNewsletterInfo ? selectedNewsletterInfo.authorName : '');
  const [newsletterPhoto, setNewsletterPhoto] = useState(selectedNewsletterInfo ? selectedNewsletterInfo.newsletterPhoto : null);
  const [newsletterName, setNewsletterName] = useState(selectedNewsletterInfo ? selectedNewsletterInfo.name : '');
  const [newsletterContent, setNewsletterContent] = useState(selectedNewsletterInfo ? selectedNewsletterInfo.content : '');

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewsletterPhoto(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleCreateNewsletter = () => {
    if (!newsletterName || !authorName || !newsletterContent || !newsletterPhoto) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }
    // Newsletter düzenleme işlemleri burada yapılabilir.
    console.log('Newsletter düzenlendi:', {
      newsletterName: newsletterName,
      newsletterContent: newsletterContent,
      authorName: authorName,
      newsletterPhoto: newsletterPhoto,
    });
  };

  const isFormValid = () => {
    return newsletterName && authorName && newsletterContent && newsletterPhoto;
  };

  return (
    <Container className={commonStyles.container}>
      <Typography variant="h6" className={commonStyles.sectionTitle}>
          Bülten Bilgileri
      </Typography>
      <Divider className={commonStyles.divider} />
      <TextField
        className={commonStyles.field}
        label="Bülten İsmi"
        variant="outlined"
        value={newsletterName}
        onChange={(e) => setNewsletterName(e.target.value)}
        required
      />
      <TextField
        className={commonStyles.field}
        label="Yazar İsmi"
        variant="outlined"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        required
      />
      <TextField
        className={commonStyles.field}
        label="Bülten İçeriği"
        variant="outlined"
        value={newsletterContent}
        onChange={(e) => setNewsletterContent(e.target.value)}
        multiline
        rows={4}
        required
      />
      <Typography variant="h6" className={commonStyles.sectionTitle}>Bülten Fotoğrafı</Typography>
      <Divider className={commonStyles.divider} />
      <Paper
        onClick={() => document.getElementById('image-upload').click()}
        className={commonStyles.uploadImageSection}
      >
        {newsletterPhoto ? (
          <img src={newsletterPhoto} alt="Newsletter Resmi" className={commonStyles.uploadedImage} />
        ) : (
          <div className={commonStyles.uploadText}>Fotoğraf Yükle</div>
        )}
      </Paper>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        className={commonStyles.imageInput}
        onChange={handleImageUpload}
      />
          
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateNewsletter}
        disabled={!isFormValid()}
      >
        Bülteni Düzenle
      </Button>
    </Container>
  );
};

export default NewsletterForm;
