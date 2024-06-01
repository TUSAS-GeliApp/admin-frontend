import FormDialog from "./FormDialog";
import RegisteredUsers from "./RegisteredUsers";
import TableLayouts from "./Table";
import React from "react";

export default function EditRegisteredUsers({selectedUsersInfo}) {
    const [filter, setFilter] = React.useState("");
    const [addNewUserOpen, setAddNewUserOpen] = React.useState(false);

    const handleAddUsers = (users) => {

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
            id: 'operations',
            numeric: false,
            label: 'Operasyonlar',
        }
    ];

    const filteredData = selectedUsersInfo.filter((item) => {
        return (
            item.name.toLowerCase().includes(filter.toLowerCase()) ||
            item.surname.toLowerCase().includes(filter.toLowerCase())
        );
    });

    const allUsersHeaders = ["İsim", "Soyisim", "Mail", "TUSAŞ Çalışanı"]
    const allUsers = [
        {
            id: 0,
            name: 'John',
            surname: 'Doe',
            mail: 'john.doe@example.com',
            isTusas: 'Evet',
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            mail: 'john.doe@example.com',
            isTusas: 'Evet',
        },
        {
            id: 2,
            name: 'John',
            surname: 'Doe',
            mail: 'john.doe@example.com',
            isTusas: 'Evet',
        },
        {
            id: 3,
            name: 'John',
            surname: 'Doe',
            mail: 'john.doe@example.com',
            isTusas: 'hayır',
        },
    ]

    return (
        <>
            <FormDialog
                open={addNewUserOpen} 
                setOpen={setAddNewUserOpen} 
                dialogTitle={"Yeni Kullanıcı Kaydet"} 
                dialogContent={<RegisteredUsers headers={allUsersHeaders} rows={allUsers} addMethod={handleAddUsers}/>}
                contentText={"Yeni kullanıcıları kaydetmek için aşağıdan seçiniz. Birden fazla seçim yapabilirsiniz."} 
                maxWidth={"lg"}
            />
            <TableLayouts
                headers={headers}
                data={filteredData}
                setOpenNewDialog={() => setAddNewUserOpen(true)}
                title={"Katılımcılar"}
                dialogButtonTitle={"Katılımcı Ekle"}
                setFilter={setFilter}
            />
        </>
    );
}
