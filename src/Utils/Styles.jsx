import { makeStyles } from '@mui/styles';

export const useCommonStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 50,
    },
    formContainer: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      marginBottom: 20,
    },
    field: {
      marginBottom: 20,
      width: '100%',
    },
    uploadImageSection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 200,
      height: 200,
      border: '2px dashed #ccc',
      borderRadius: 1,
      cursor: 'pointer',
      marginBottom: 20,
    },
    uploadedImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 1,
    },
    uploadText: {
      textAlign: 'center',
      color: '#666',
    },
    imageInput: {
      display: 'none',
    },
    sectionTitle: {
      marginBottom: 10,
      marginTop: 20,
      fontWeight: 'bold',
    },
    divider: {
      margin: '20px 0',
      width: '100%',
    },
  }));
