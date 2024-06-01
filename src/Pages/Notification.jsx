import { Button, ButtonGroup, IconButton, TextField, Typography } from "@mui/material";
import { LockOpen, RemoveCircle, DriveFileRenameOutlineOutlined, Group } from "@mui/icons-material";
import TableLayouts from "../Layouts/Table";
import React from "react";
import FormDialog from "../Layouts/FormDialog";
import EventForm from "../Components/Forms/EventForm";
import EditRegisteredUsers from "../Layouts/EditRegisteredUsers";
import RegisteredUsers from "../Layouts/RegisteredUsers";
import { useCommonStyles } from "../Utils/Styles";

export default function Notifications() {
    const [message, setMessage] = React.useState("");
    const [selectedUsers, setSelectedUsers] = React.useState([]);
    const commonStyles = useCommonStyles();
    
    const handleSendNotification = (users) => {

    }

    const allUsersHeaders = ["İsim", "Soyisim", "Mail", "TUSAŞ Çalışanı", "Programlar"]
    const allUsers = [
        {
            id: 0,
            name: 'John',
            surname: 'Doe',
            mail: 'john.doe@example.com',
            isTusas: 'Evet',
            programs: ["Program 1", "Program 2", "Program 3"]
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            mail: 'john.doe@example.com',
            isTusas: 'Evet',
            programs: ["Program 1", "Program 2"]
        },
        {
            id: 2,
            name: 'John',
            surname: 'Doe',
            mail: 'john.doe@example.com',
            isTusas: 'Evet',
            programs: ["Program 1"]
        },
        {
            id: 3,
            name: 'John',
            surname: 'Doe',
            mail: 'john.doe@example.com',
            isTusas: 'hayır',
            programs: ["Program 1", "Program 2", "Program 3"]
        },
    ]

    return (
        <>   
            <Typography variant="h6" className={commonStyles.sectionTitle}>
                Göndermek istediğiniz bildirimi giriniz ve hedef kullanıcılarınızı seçerek gönder butonuna tıklayınız
            </Typography>
            <TextField
                label="Göndermek istediğiniz bildirimin içeriğini giriniz..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
            />
           <RegisteredUsers headers={allUsersHeaders} rows={allUsers}/>
           <Button variant="contained" onClick={handleSendNotification}>Gönder</Button>
        </>
    );
}
