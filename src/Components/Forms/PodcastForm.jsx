import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Divider } from '@mui/material';
import { useCommonStyles } from '../../Utils/Styles';

const PodcastForm = ({selectedPodcastInfo}) => {
  const commonStyles = useCommonStyles();

  const [podcastName, setPodcastName] = useState(selectedPodcastInfo ? selectedPodcastInfo.name : '');
  const [podcastContent, setPodcastContent] = useState(selectedPodcastInfo ? selectedPodcastInfo.content : '');
  const [podcasterName, setPodcasterName] = useState(selectedPodcastInfo ? selectedPodcastInfo.podcaster : '');
  const [podcastLink, setPodcastLink] = useState(selectedPodcastInfo ? selectedPodcastInfo.podcastLink : '');
  const [podcastPhoto, setPodcastPhoto] = useState(selectedPodcastInfo ? selectedPodcastInfo.podcastPhoto : null);

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPodcastPhoto(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleEditPodcast = () => {
    if (!podcastName || !podcasterName || !podcastContent || !podcastLink || !podcastPhoto) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }
    // Podcast oluşturma işlemleri burada yapılabilir.
    console.log('Podcast düzenlendi:', {
      podcastName,
      podcastContent,
      podcasterName,
      podcastLink,
      podcastPhoto,
    });
  };

  const isFormValid = () => {
    return podcastName && podcasterName && podcastContent && podcastLink && podcastPhoto;
  };

  return (
    <Container className={commonStyles.container}>
      <Typography variant="h6" className={commonStyles.sectionTitle}>
          Podcast Bilgileri
      </Typography>
      <Divider className={commonStyles.divider} />
      <TextField
        className={commonStyles.field}
        label="Podcast İsmi"
        variant="outlined"
        value={podcastName}
        onChange={(e) => setPodcastName(e.target.value)}
        required
      />
      <TextField
        className={commonStyles.field}
        label="Podcaster İsmi"
        variant="outlined"
        value={podcasterName}
        onChange={(e) => setPodcasterName(e.target.value)}
        required
      />
      <TextField
        className={commonStyles.field}
        label="Podcast İçeriği"
        variant="outlined"
        value={podcastContent}
        onChange={(e) => setPodcastContent(e.target.value)}
        multiline
        rows={4}
        required
      />
      <TextField
        className={commonStyles.field}
        label="Podcast Bağlantısı"
        variant="outlined"
        value={podcastLink}
        onChange={(e) => setPodcastLink(e.target.value)}
        required
      />
      <Typography variant="h6" className={commonStyles.sectionTitle}>Podcast Fotoğrafı</Typography>
      <Divider className={commonStyles.divider} />
      <Paper
        onClick={() => document.getElementById('image-upload').click()}
        className={commonStyles.uploadImageSection}
      >
        {podcastPhoto ? (
          <img src={podcastPhoto} alt="Podcast Resmi" className={commonStyles.uploadedImage} />
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
        onClick={handleEditPodcast}
        disabled={!isFormValid()}
      >
        Podcast Oluştur
      </Button>
    </Container>
  );
};

export default PodcastForm;
