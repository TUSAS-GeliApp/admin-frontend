import { ButtonGroup, IconButton } from "@mui/material";
import { LockOpen, RemoveCircle, DriveFileRenameOutlineOutlined, Group } from "@mui/icons-material";
import TableLayouts from "../Layouts/Table";
import React from "react";
import FormDialog from "../Layouts/FormDialog";
import ProgramForm from "../Components/Forms/ProgramForm";
import EditRegisteredUsers from "../Layouts/EditRegisteredUsers";

export default function Programs() {
    const [filter, setFilter] = React.useState("");
    const [selectedProgramUsers, setSelectedProgramUsers] = React.useState(null);
    const [selectedProgramInfo, setSelectedProgramInfo] = React.useState(null);
    const [editRegisteredUsersOpen, setEditRegisteredUsersOpen] = React.useState(false);
    const [programFormOpen, setProgramFormOpen] = React.useState(false);
    
    function handleActiveProgram(id, isActive) {
        // Ban program logic
    }

    function handleDeleteUserFromProgram(userId, programId) {

    }

    function handleEditProgram(id) {
        const programInfo = {
            programName: "Örnek Program",
            programContent: "Bu bir örnek program içeriğidir. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            programDate: "2024-05-30",
            location: "İstanbul, Türkiye",
            programLink: "https://ornekprogram.com",
            programPhoto: "https://via.placeholder.com/300",
          };
          
        
        setSelectedProgramInfo(programInfo);
        setProgramFormOpen(true);
    }

    function handleRegisteredUsers(programId) {
        const createDeleteOperation = (userId) => {
            return (
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <IconButton title={"Kullanıcı etkinlikten kaldır"}
                        onClick={() => handleDeleteUserFromProgram(userId, programId)} color={"error"}>
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

        setSelectedProgramUsers(registeredUsersInfo);
        setEditRegisteredUsersOpen(true);
    }

    const createOperations = (isActive, id) => {
        return (
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <IconButton title={isActive ? "Programı Kaldır" : "Programı Aktifleştir"}
                    onClick={() => handleActiveProgram(id, isActive)} color={isActive ? "error" : 'success'}>
                    {isActive ? <RemoveCircle /> : <LockOpen />}
                </IconButton>
                <IconButton title='Program bilgilerini düzenle' 
                    onClick={() => handleEditProgram(id)} color='primary'
                >
                    <DriveFileRenameOutlineOutlined />
                </IconButton>
                <IconButton title='Programa Kayıtlı Kullanıcılar' 
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
            name: 'Program 1',
            date: "01.01.2015",
            operations: createOperations(false, 1),
        },
        {
            id: 2,
            name: 'Program 2',
            date: "01.01.2015",
            operations: createOperations(false, 1),
        },
        {
            id: 3,
            name: 'Program 3',
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
            label: 'Program Adı',
        },
        {
            id: 'date',
            numeric: false,
            label: 'Program Tarihi',
        },
        {
            id: 'operations',
            numeric: false,
            label: 'Operasyonlar',
        }
    ];

    const filteredData = data.filter((item) => {
        return (
            item.name.toLowerCase().includes(filter.toLowerCase())
        );
    });

    return (
        <>
            <FormDialog
                open={editRegisteredUsersOpen} 
                setOpen={setEditRegisteredUsersOpen} 
                dialogTitle={"Katılımcıları Düzenle"} 
                dialogContent={<EditRegisteredUsers selectedUsersInfo={selectedProgramUsers}/>}
                contentText={"Katılımcıları aşağıdaki listede görüntüleyebilir ve düzenleyebilirsiniz."} 
                maxWidth={"xl"}
            />      
            <FormDialog
                open={programFormOpen} 
                setOpen={setProgramFormOpen} 
                dialogTitle={selectedProgramInfo ? "Programı Düzenle" : "Yeni Program Oluştur"} 
                dialogContent={<ProgramForm selectedProgramInfo={selectedProgramInfo}/>}
                contentText={selectedProgramInfo ? 
                    "Programı düzenlemek için lütfen aşağıdaki formu doldurunuz." :
                    "Yeni bir program oluşturmak için lütfen aşağıdaki formu doldurunuz."
                } 
            />
            <TableLayouts
                headers={headers}
                data={filteredData}
                setOpenNewDialog={() => {setSelectedProgramInfo(null); setProgramFormOpen(true);}}
                title={"Programlar"}
                dialogButtonTitle={"Yeni Program Ekle"}
                setFilter={setFilter}
            />
        </>
    );
}
