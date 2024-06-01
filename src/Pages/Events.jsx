import { ButtonGroup, IconButton } from "@mui/material";
import { LockOpen, RemoveCircle, DriveFileRenameOutlineOutlined, Group } from "@mui/icons-material";
import TableLayouts from "../Layouts/Table";
import React from "react";
import FormDialog from "../Layouts/FormDialog";
import EventForm from "../Components/Forms/EventForm";
import EditRegisteredUsers from "../Layouts/EditRegisteredUsers";

export default function Events() {
    const [filter, setFilter] = React.useState("");
    const [selectedEventInfo, setSelectedEventInfo] = React.useState(null);
    const [selectedEventUsers, setSelectedEventUsers] = React.useState(null);
    const [editRegisteredUsersOpen, setEditRegisteredUsersOpen] = React.useState(false);
    const [eventFormOpen, setEventFormOpen] = React.useState(false);
    
    function handleActiveEvent(id, isActive) {
        // Ban program logic
    }

    function handleDeleteUserFromEvent(userId, eventId) {

    }

    function handleEditEvent(id) {
        const eventInfo = {
            eventName: "Örnek Etkinlik",
            eventContent: "Bu bir örnek etkinlik içeriğidir. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            eventDate: "2024-05-30",
            location: "İstanbul, Türkiye",
            eventLink: "https://orneketkinlik.com",
            eventPhoto: "https://via.placeholder.com/300",
          };

        setSelectedEventInfo(eventInfo);
        setEventFormOpen(true);
    }

    function handleRegisteredUsers(eventId) {
        const createDeleteOperation = (userId) => {
            return (
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <IconButton title={"Kullanıcı etkinlikten kaldır"}
                        onClick={() => handleDeleteUserFromEvent(userId, eventId)} color={"error"}>
                        <RemoveCircle />
                    </IconButton>
                </ButtonGroup>
            )
        }

        const registeredUsersInfo = [
            {
                id: 1,
                name: 'Murat Can',
                surname: 'Bastug',
                mail: "bastug@gmail.com",
                operations: createDeleteOperation(1),
            },
            {
                id: 2,
                name: 'Murat Can filt',
                surname: 'Bastug',
                mail: "bastug@gmail.com",
                operations: createDeleteOperation(2),
            },
            {
                id: 3,
                name: 'Murat Can',
                surname: 'Bastug',
                mail: "bastug@gmail.com",
                operations: createDeleteOperation(1),
            },
            {
                id: 4,
                name: 'Murat Can filt',
                surname: 'Bastug',
                mail: "bastug@gmail.com",
                operations: createDeleteOperation(2),
            },
            {
                id: 5,
                name: 'Murat Can',
                surname: 'Bastug',
                mail: "bastug@gmail.com",
                operations: createDeleteOperation(1),
            },
            {
                id: 6,
                name: 'Murat Can filt',
                surname: 'Bastug',
                mail: "bastug@gmail.com",
                operations: createDeleteOperation(2),
            },
            {
                id: 7,
                name: 'Murat Can',
                surname: 'Bastug',
                mail: "bastug@gmail.com",
                operations: createDeleteOperation(1),
            },
            {
                id: 8,
                name: 'Murat Can filt',
                surname: 'Bastug',
                mail: "bastug@gmail.com",
                operations: createDeleteOperation(2),
            },
            {
                id: 9,
                name: 'Murat Can',
                surname: 'Bastug',
                mail: "bastug@gmail.com",
                operations: createDeleteOperation(1),
            },
            {
                id: 10,
                name: 'Murat Can filt',
                surname: 'Bastug',
                mail: "bastug@gmail.com",
                operations: createDeleteOperation(2),
            },
        ]

        setSelectedEventUsers(registeredUsersInfo);
        setEditRegisteredUsersOpen(true);
    }

    const createOperations = (isActive, id) => {
        return (
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <IconButton title={isActive ? "Etkinliği Kaldır" : "Etkinliği Aktifleştir"}
                    onClick={() => handleActiveEvent(id, isActive)} color={isActive ? "error" : 'success'}>
                    {isActive ? <RemoveCircle /> : <LockOpen />}
                </IconButton>
                <IconButton title='Etkinlik bilgilerini düzenle' 
                    onClick={() => handleEditEvent(id)} color='primary'
                >
                    <DriveFileRenameOutlineOutlined />
                </IconButton>
                <IconButton title='Etkinliğe Kayıtlı Kullanıcılar' 
                    onClick={() => handleRegisteredUsers(id)} color='secondary'
                >
                    <Group />
                </IconButton>
            </ButtonGroup>
        );
    }

    const data = [
        {
            id: 1,
            name: 'Etkinlik 1',
            date: "01.01.2015",
            operations: createOperations(false, 1),
        },
        {
            id: 2,
            name: 'Etkinlik 2',
            date: "01.01.2015",
            operations: createOperations(false, 1),
        },
        {
            id: 3,
            name: 'Etkinlik 3',
            date: "01.01.2015",
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
            label: 'Etkinlik Adı',
        },
        {
            id: 'date',
            numeric: false,
            label: 'Etkinlik Tarihi',
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
            item.program.toLowerCase().includes(filter.toLowerCase())
        );
    });

    return (
        <>   
            <FormDialog
                open={editRegisteredUsersOpen} 
                setOpen={setEditRegisteredUsersOpen} 
                dialogTitle={"Katılımcıları Düzenle"} 
                dialogContent={<EditRegisteredUsers selectedUsersInfo={selectedEventUsers}/>}
                contentText={"Katılımcıları aşağıdaki listede görüntüleyebilir ve düzenleyebilirsiniz."} 
                maxWidth={"xl"}
            />         
            <FormDialog
                open={eventFormOpen} 
                setOpen={setEventFormOpen} 
                dialogTitle={selectedEventInfo ? "Eğitim Videosunu Düzenle" : "Yeni Etkinlik Oluştur"} 
                dialogContent={<EventForm selectedEventInfo={selectedEventInfo}/>}
                contentText={selectedEventInfo ? 
                    "Etkinlik bilgilerini düzenlemek için lütfen aşağıdaki formu doldurunuz." :
                    "Yeni bir etkinlik oluşturmak için lütfen aşağıdaki formu doldurunuz."
                } 
            />
            <TableLayouts
                headers={headers}
                data={filteredData}
                setOpenNewDialog={() => {setSelectedEventInfo(null); setEventFormOpen(true);}}
                title={"Etkinlikler"}
                dialogButtonTitle={"Yeni Etkinlik Ekle"}
                setFilter={setFilter}
            />
        </>
    );
}
