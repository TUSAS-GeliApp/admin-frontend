import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Divider } from '@mui/material';
import { useCommonStyles } from '../../Utils/Styles';

const EventForm = ({ selectedEventInfo }) => {
  const commonStyles = useCommonStyles();
  const [eventName, setEventName] = useState(selectedEventInfo ? selectedEventInfo.eventName : '');
  const [eventContent, setEventContent] = useState(selectedEventInfo ? selectedEventInfo.eventContent : '');
  const [eventDate, setEventDate] = useState(selectedEventInfo ? selectedEventInfo.eventDate : '');
  const [location, setLocation] = useState(selectedEventInfo ? selectedEventInfo.location : '');
  const [eventLink, setEventLink] = useState(selectedEventInfo ? selectedEventInfo.eventLink : '');
  const [eventPhoto, setEventPhoto] = useState(selectedEventInfo ? selectedEventInfo.eventPhoto : null);

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setEventPhoto(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleEditEvent = () => {
    console.log('Etkinlik bilgileri düzenlendi:', {
      eventName,
      eventContent,
      eventDate,
      location,
      programLink: eventLink,
      eventPhoto
    });
  };

  return (
    <Container className={commonStyles.container}>
      <Typography variant="h6" className={commonStyles.sectionTitle}>Etkinlik Bilgileri</Typography>
      <Divider className={commonStyles.divider} />
      <div className={commonStyles.formContainer}>
        <div className={commonStyles.leftSection}>
          <TextField
            className={commonStyles.field}
            label="Etkinlik Adı"
            variant="outlined"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          <TextField
            className={commonStyles.field}
            label="Etkinlik İçeriği"
            variant="outlined"
            value={eventContent}
            onChange={(e) => setEventContent(e.target.value)}
            required
            multiline
            rows={4}
          />
          <TextField
            className={commonStyles.field}
            label="Etkinlik Tarihi"
            variant="outlined"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
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
            value={eventLink}
            onChange={(e) => setEventLink(e.target.value)}
            required
          />
        </div>
      </div>
      <Typography variant="h6" className={commonStyles.sectionTitle}>Etkinlik Fotoğrafı</Typography>
      <Divider className={commonStyles.divider} />
      <div className={commonStyles.photoUploadContainer}>
        <Paper
          className={commonStyles.uploadImageSection}
          onClick={() => document.getElementById('edit-event-photo-upload').click()}
        >
          {eventPhoto ? (
            <img src={eventPhoto} alt="Etkinlik" className={commonStyles.uploadedImage} />
          ) : (
            <div className={commonStyles.uploadText}>Fotoğraf Yükle</div>
          )}
          <input
            type="file"
            id="edit-event-photo-upload"
            accept="image/*"
            className={commonStyles.imageInput}
            onChange={handleImageUpload}
          />
        </Paper>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEditEvent}
        disabled={!eventName || !eventContent || !eventDate || !location || !eventLink || !eventPhoto}
      >
        {selectedEventInfo ? "Etkinliği Düzenle" : "Etkinlik Oluştur"}
      </Button>
    </Container>
  );
};

export default EventForm;
