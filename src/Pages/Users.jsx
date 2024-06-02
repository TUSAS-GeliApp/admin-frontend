import { ButtonGroup, IconButton } from "@mui/material";
import { LockOpen, RemoveCircle, DriveFileRenameOutlineOutlined } from "@mui/icons-material";
import TableLayouts from "../Layouts/Table";
import React from "react";
import FormDialog from "../Layouts/FormDialog";
import UserForm from "../Components/Forms/UserForm";
import { banUser, unbanUser } from "../Services/Ban";
import { getAllUsers, getUserImage, getUserInfo } from "../Services/User";

export default function Users() {
    const [filter, setFilter] = React.useState("");
    const [userFormOpen, setUserFormOpen] = React.useState(false);
    const [selectedUserInfo, setSelectedUserInfo] = React.useState(null);
    const [data, setData] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {    
            const response = await getAllUsers();
            const newData = response.map((user) => (
                {
                    id: user.user_id,
                    name: user.name,
                    surname: user.surname,
                    mail: user.email,
                    is_tusas: user.is_tusas ? "Evet" : "Hayır",
                    operations: createOperations(user.is_banned, user.user_id)
                }
            ))
            setData(newData);
        }
        fetchData();
        setUserFormOpen(false);
    }, [refresh])

    function handleBannUser(id, isBanned) {
        if(isBanned) {
            unbanUser(id)  
        } else {
            banUser(id)
        } 
        setRefresh(!refresh)
    }

    async function handleEditUser(id) {
        const conpanyOrUniversities= ["Hacettepe University","Tusas","Odtü"]
        const userInfo = await getUserInfo(id);
        
        const userImage = await getUserImage(userInfo.email);
        const utf8Bytes = new TextEncoder().encode(userImage);

        const base64String = btoa(String.fromCharCode.apply(null, utf8Bytes));

        const imageUrl = `data:image/png;base64,${base64String}`;
        userInfo.companyOrUniversity =  conpanyOrUniversities[Math.floor(Math.random*conpanyOrUniversities.length)];
        userInfo.isTusas = userInfo.is_tusas ? "Evet":"Hayır";

        delete userInfo.is_tusas;
        userInfo.profilePhoto = imageUrl;
        
        setSelectedUserInfo(userInfo);
        setUserFormOpen(true);
        
    }

    const createOperations = (isBanned, id) => {
        return (
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <IconButton title={isBanned ? "Kullanıcı engelini kaldır" : "Kullanıcıyı engelle"}
                    onClick={() => handleBannUser(id, isBanned)} color={isBanned ? "success" : 'error'}>
                    {isBanned ? <LockOpen /> : <RemoveCircle />}
                </IconButton>
                <IconButton title='Kullanıcı bilgilerini düzenle' onClick={() => handleEditUser(id)} color='primary'>
                    <DriveFileRenameOutlineOutlined />
                </IconButton>
            </ButtonGroup>
        );
    }

  

    const headers = [
        {
            id: 'id',
            numeric: true,
            label: 'ID',
        },
        {
            id: 'name',
            numeric: false,
            label: 'İsim',
        },
        {
            id: 'surname',
            numeric: false,
            label: 'Soyisim',
        },
        {
            id: 'mail',
            numeric: false,
            label: 'Mail Adresi',
        },
        {
            id: 'is_tusas',
            numeric: false,
            label: 'TUSAŞ Çalışanı',
        },
        {
            id: 'operations',
            numeric: false,
            label: 'Operasyonlar',
        }
    ];

    const filteredData = data.filter((item) => {
        return (
            item.name.toLowerCase().includes(filter.toLowerCase()) ||
            item.surname.toLowerCase().includes(filter.toLowerCase())
        );
    });

    return (
        <>
            <FormDialog
                open={userFormOpen} 
                setOpen={setUserFormOpen}  
                dialogTitle={selectedUserInfo ? "Kullanıcı Bilgilerini Düzenle" : "Yeni Kullanıcı Oluştur"} 
                dialogContent={<UserForm selectedUserInfo={selectedUserInfo} refresh = {refresh} setRefresh = {setRefresh}/>}
                contentText={
                    selectedUserInfo ? "Aşağıdaki formdan kullanıcı bilgilerini düzenleyebilirsiniz." :
                    "Yeni bir kullanıcı oluşturmak için lütfen aşağıdaki formu doldurunuz."
                } 
            />
            <TableLayouts
                headers={headers}
                data={filteredData}
                setOpenNewDialog={() => {setSelectedUserInfo(null); setUserFormOpen(true);}}
                title={"Kullanıcılar"}
                dialogButtonTitle={"Yeni Kullanıcı Ekle"}
                setFilter={setFilter}
            />
        </>
    );
}
