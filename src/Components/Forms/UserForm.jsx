import React, { useState } from 'react';
import { TextField, Button, Container, MenuItem, Paper, Grid, Divider, Typography } from '@mui/material';
import { useCommonStyles } from '../../Utils/Styles';
import { addUser } from '../../Services/User';

const UserForm = ({ selectedUserInfo, refresh, setRefresh }) => {
  const commonStyles = useCommonStyles();
  const [userName, setUserName] = useState(selectedUserInfo ? selectedUserInfo.name : '');
  const [userSurname, setUserSurname] = useState(selectedUserInfo ? selectedUserInfo.surname : '');
  const [email, setEmail] = useState(selectedUserInfo ? selectedUserInfo.email : '');
  const [job, setJob] = useState(selectedUserInfo ? selectedUserInfo.job : '');
  const [isTusas, setIsTusas] = useState(selectedUserInfo ? selectedUserInfo.isTusas : '');
  const [phone, setPhone] = useState(selectedUserInfo ? selectedUserInfo.phone : '');
  const [location, setLocation] = useState(selectedUserInfo ? selectedUserInfo.location : '');
  const [instagram, setInstagram] = useState(selectedUserInfo ? selectedUserInfo.instagram : '');
  const [twitter, setTwitter] = useState(selectedUserInfo ? selectedUserInfo.twitter : '');
  const [linkedin, setLinkedin] = useState(selectedUserInfo ? selectedUserInfo.linkedin : '');
  const [facebook, setFacebook] = useState(selectedUserInfo ? selectedUserInfo.facebook : '');
  const [profilePhoto, setProfilePhoto] = useState(selectedUserInfo ? selectedUserInfo.profilePhoto : null);

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleEditUser = async () => {
    await addUser
    ({
        name:userName,
        surname:userSurname,
        email:email,
        phone:phone,
        job:job,
        is_banned: false,
        is_tusas:isTusas === "Evet" ? true : false,
        location:location,
        instagram:instagram,
        twitter:twitter,
        linkedin:linkedin,
        facebook: facebook
    })
    console.log('Kullanıcı bilgileri düzenlendi:', {
      userName,
      userSurname,
      email,
      job,
      isTusas,
      phone,
      location,
      instagram,
      twitter,
      linkedin,
      facebook,
      profilePhoto,
    });
    setRefresh(!refresh);
  };


  const isFormValid = () => {
    return (
      userName &&
      userSurname &&
      email &&
      job &&
      isTusas &&
      phone &&
      location &&
      instagram &&
      twitter &&
      linkedin &&
      facebook
    );
  };

  return (
    <Container className={commonStyles.container}>
      <Typography variant="h6" className={commonStyles.sectionTitle}>Kullanıcı Bilgileri</Typography>
      <Divider className={commonStyles.divider} />
      <Grid container className={commonStyles.formContainer} spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            className={commonStyles.field}
            label="İsim"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            className={commonStyles.field}
            label="Soyad"
            variant="outlined"
            value={userSurname}
            onChange={(e) => setUserSurname(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={commonStyles.field}
            label="Meslek"
            variant="outlined"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={commonStyles.field}
            label="Kullanıcı Şehir"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={commonStyles.field}
            select
            label="TUSAŞ Çalışanı mı?"
            variant="outlined"
            value={isTusas}
            onChange={(e) => setIsTusas(e.target.value)}
            required
          >
            <MenuItem value="Evet">Evet</MenuItem>
            <MenuItem value="Hayır">Hayır</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Typography variant="h6" className={commonStyles.sectionTitle}>İletişim Bilgileri</Typography>
      <Divider className={commonStyles.divider} />
      <Grid container className={commonStyles.formContainer} spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            className={commonStyles.field}
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            className={commonStyles.field}
            label="Telefon Numarası"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Grid>
      </Grid>
      <Typography variant="h6" className={commonStyles.sectionTitle}>Sosyal Medya Hesapları</Typography>
      <Divider className={commonStyles.divider} />
      <Grid container className={commonStyles.formContainer} spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            className={commonStyles.field}
            label="Instagram Linki"
            variant="outlined"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            className={commonStyles.field}
            label="Twitter Linki"
            variant="outlined"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            className={commonStyles.field}
            label="Linkedin Linki"
            variant="outlined"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            className={commonStyles.field}
            label="Facebook Linki"
            variant="outlined"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            required
          />
        </Grid>
      </Grid>
      <Typography variant="h6" className={commonStyles.sectionTitle}>Kullanıcı Profil Fotoğrafı</Typography>
      <Divider className={commonStyles.divider} />
      <Grid container className={commonStyles.formContainer} justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            onClick={() => document.getElementById('image-upload').click()}
            className={commonStyles.uploadImageSection}
          >
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profil Fotoğrafı" className={commonStyles.uploadedImage} />
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
            required
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEditUser}
        disabled={!isFormValid()}
      >
        {selectedUserInfo ? "Kullanıcıyı Düzenle" : "Kullanıcıyı Ekle"}
      </Button>
    </Container>
  );
};

export default UserForm;
