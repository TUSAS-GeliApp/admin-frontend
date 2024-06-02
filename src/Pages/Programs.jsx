import { ButtonGroup, IconButton } from "@mui/material";
import { LockOpen, RemoveCircle, DriveFileRenameOutlineOutlined, Group } from "@mui/icons-material";
import TableLayouts from "../Layouts/Table";
import React from "react";
import FormDialog from "../Layouts/FormDialog";
import ProgramForm from "../Components/Forms/ProgramForm";
import EditRegisteredUsers from "../Layouts/EditRegisteredUsers";
import { activeProgram, deactiveProgram, deleteUserFromProgram, getAllProgramsInfo, getProgram, getRegisteredUsers } from "../Services/Programs";

export default function Programs() {
    const [filter, setFilter] = React.useState("");
    const [selectedProgramUsers, setSelectedProgramUsers] = React.useState(null);
    const [selectedProgramInfo, setSelectedProgramInfo] = React.useState(null);
    const [editRegisteredUsersOpen, setEditRegisteredUsersOpen] = React.useState(false);
    const [programFormOpen, setProgramFormOpen] = React.useState(false);
    const [data, setData] = React.useState([])
    const [refresh, setRefresh] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {    
            const response = await getAllProgramsInfo();
            
            const newData = response.map((program) => (
                {
                    id: program.program_id,
                    name: program.name,
                    date: program.program_date,
                    operations: createOperations(program.is_active, program.program_id)
                }
            ))
            setData(newData);

            
        }
        fetchData();
        setProgramFormOpen(false);
    }, [refresh])

    function handleActiveProgram(id, isActive) {
        if(!isActive) {
            activeProgram(id)  
        } else {
            deactiveProgram(id)
        } 
        setRefresh(!refresh)
    }

    function handleDeleteUserFromProgram(userId, programId) {
        deleteUserFromProgram(userId, programId);
        setEditRegisteredUsersOpen(false);
        handleRegisteredUsers(programId)
        setRefresh(!refresh)
        
    }

    const handleEditProgram = async (id) => {
        const response = await getProgram(id);
        const [day, month, year] = response[0].program_date.split('.');
        const formattedDate = `${year}-${month}-${day}`;
        const programInfo = {
            programName: response[0].name,
            programContent: response[0].content,
            programDate: formattedDate,
            location: response[0].location,
            programLink: response[0].program_link,
            programPhoto: "https://via.placeholder.com/300",
          };
          
        
        setSelectedProgramInfo(programInfo);
        setProgramFormOpen(true);
    }

    const handleRegisteredUsers = async (programId) => {
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

        const response = await getRegisteredUsers(programId);
        console.log(response)
        const registeredUsersInfo = response.map((user) => (
            {
                id: user.user_id,
                name: user.name,
                surname: user.surname,
                mail: user.email,
                operations: createDeleteOperation(user.user_id)
            }
        ))

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
