import { Button, ButtonGroup, IconButton, TextField, Typography } from "@mui/material";
import { LockOpen, RemoveCircle, DriveFileRenameOutlineOutlined, Group } from "@mui/icons-material";
import TableLayouts from "../Layouts/Table";
import React from "react";
import FormDialog from "../Layouts/FormDialog";
import EventForm from "../Components/Forms/EventForm";
import EditRegisteredUsers from "../Layouts/EditRegisteredUsers";
import RegisteredUsers from "../Layouts/RegisteredUsers";
import { useCommonStyles } from "../Utils/Styles";
import { getAllPrograms, getAllUsers } from "../Services/User";
import { sendNotifications } from "../Services/Notifications";

export default function Notifications() {
    const [message, setMessage] = React.useState("");
    const [selectedUsers, setSelectedUsers] = React.useState([]);
    const commonStyles = useCommonStyles();
    const [allUsers, setAllUsers ] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await getAllUsers();
                const fetchedUsers = usersResponse.map(async (user) => {
                    const userProgramsResponse = await getAllPrograms(user.user_id);
                    const userPrograms = userProgramsResponse.map((program) => program.name);
                    return {
                        id: user.user_id,
                        name: user.name,
                        surname: user.surname,
                        mail: user.email,
                        isTusas: user.is_tusas ? "Evet" : "Hayır",
                        programs: userPrograms
                    };
                });
                const usersData = await Promise.all(fetchedUsers);
                setAllUsers(usersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSendNotification = async () => {
        console.log(selectedUsers)
        selectedUsers.forEach(async (user) => await sendNotifications(user, message))
    }

    const allUsersHeaders = ["İsim", "Soyisim", "Mail", "TUSAŞ Çalışanı", "Programlar"]
   

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
           <RegisteredUsers headers={allUsersHeaders} rows={allUsers} setSelected={setSelectedUsers} selected={selectedUsers}/>
           <Button variant="contained" onClick={handleSendNotification}>Gönder</Button>
        </>
    );
}
