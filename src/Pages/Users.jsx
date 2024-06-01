import { ButtonGroup, IconButton } from "@mui/material";
import { LockOpen, RemoveCircle, DriveFileRenameOutlineOutlined } from "@mui/icons-material";
import TableLayouts from "../Layouts/Table";
import React from "react";
import FormDialog from "../Layouts/FormDialog";
import UserForm from "../Components/Forms/UserForm";
import { banUser, unbanUser } from "../Services/Ban";
import { getUserInfo } from "../Services/User";

export default function Users() {
    const [filter, setFilter] = React.useState("");
    const [userFormOpen, setUserFormOpen] = React.useState(false);
    const [selectedUserInfo, setSelectedUserInfo] = React.useState(null);

    function handleBannUser(id, isBanned) {
        // if(isBanned) {
        //     unbanUser(id);   
        // } else {
        //     banUser(id);
        // }
    }

    function handleEditUser(id) {
        const userInfo = {
            name: 'John',
            surname: 'Doe',
            mail: 'john.doe@example.com',
            companyOrUniversity: 'Example Company',
            job: 'Software Developer',
            isTusas: 'Evet',
            phone: '+1234567890',
            location: 'New York',
            instagram: 'https://www.instagram.com/johndoe/',
            twitter: 'https://twitter.com/johndoe/',
            linkedin: 'https://www.linkedin.com/in/johndoe/',
            facebook: 'https://www.facebook.com/johndoe/',
            profilePhoto: 'https://via.placeholder.com/200', // Örnek bir profil fotoğrafı URL'si
          };

        //const userInfo = getUserInfo(id);

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

    const data = [
        {
            id: 1,
            name: 'Murat Can',
            surname: 'Bastug',
            mail: "bastug@gmail.com",
            is_tusas: "Evet",
            operations: createOperations(false, 1),
        },
        {
            id: 2,
            name: 'Murat Can',
            surname: 'Bastug',
            mail: "bastug@gmail.com",
            is_tusas: "Evet",
            operations: createOperations(false, 1),
        },
        {
            id: 3,
            name: 'Murat Can filt',
            surname: 'Bastug',
            mail: "bastug@gmail.com",
            is_tusas: "Hayır",
            operations: createOperations(false, 1),
        },
        {
            id: 4,
            name: 'Murat Can filt',
            surname: 'Bastug',
            mail: "bastug@gmail.com",
            is_tusas: "Hayır",
            operations: createOperations(false, 1),
        }
    ];

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
                dialogContent={<UserForm selectedUserInfo={selectedUserInfo}/>}
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
