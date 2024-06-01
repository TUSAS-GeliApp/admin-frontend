import { ButtonGroup, IconButton } from "@mui/material";
import { LockOpen, RemoveCircle, DriveFileRenameOutlineOutlined } from "@mui/icons-material";
import TableLayouts from "../Layouts/Table";
import React from "react";
import FormDialog from "../Layouts/FormDialog";
import NewsletterForm from "../Components/Forms/NewsletterForm";

export default function Newsletters() {
    const [filter, setFilter] = React.useState("");
    const [newsletterFormOpen, setNewsletterFormOpen] = React.useState(false);
    const [selectedNewsletterInfo, setSelectedNewsletterInfo] = React.useState(null);

    function handleActiveNewsletter(id, isActive) {
        // Ban program logic
    }

    function handleEditNewsletter(id) {
        const newsletterInfo = {
            id: 1,
            name: 'Bülten 1',
            content: 'Bülten içeriği 1',
            authorName: "Murat Can",
            newsletterPhoto: "https://via.placeholder.com/300"
        }

        setSelectedNewsletterInfo(newsletterInfo);
        setNewsletterFormOpen(true);
    }
    
    const createOperations = (isActive, id) => {
        return (
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <IconButton title={isActive ? "Etkinliği Kaldır" : "Etkinliği Aktifleştir"}
                    onClick={() => handleActiveNewsletter(id, isActive)} color={isActive ? "error" : 'success'}>
                    {isActive ? <RemoveCircle /> : <LockOpen />}
                </IconButton>
                <IconButton title='Etkinlik bilgilerini düzenle' 
                    onClick={() => handleEditNewsletter(id)} color='primary'
                >
                    <DriveFileRenameOutlineOutlined />
                </IconButton>
            </ButtonGroup>
        );
    }

    const data = [
        {
            id: 1,
            name: 'Bülten 1',
            authorName: "Yazar 1",
            operations: createOperations(false, 1),
        },
        {
            id: 2,
            name: 'Bülten 2',
            authorName: "Yazar 2",
            operations: createOperations(false, 2),
        },
        {
            id: 3,
            authorName: "Yazar 3",
            name: 'Bülten 3',
            operations: createOperations(false, 3),
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
            label: 'Bülten Adı',
        },
        {
            id: 'authorName',
            numeric: false,
            label: 'Bülten Yazarı',
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
                open={newsletterFormOpen} 
                setOpen={setNewsletterFormOpen} 
                dialogTitle={selectedNewsletterInfo ? "Bülteni Düzenle" : "Yeni Bülten Oluştur"} 
                dialogContent={<NewsletterForm selectedNewsletterInfo={selectedNewsletterInfo}/>}
                contentText={selectedNewsletterInfo ? 
                    "Bülten bilgilerini düzenlemek için lütfen aşağıdaki formu doldurunuz." :
                    "Yeni bir bülten oluşturmak için lütfen aşağıdaki formu doldurunuz."
                } 
            />
            <TableLayouts
                headers={headers}
                data={filteredData}
                setOpenNewDialog={() => {setSelectedNewsletterInfo(null); setNewsletterFormOpen(true);}}
                title={"Bültenler"}
                dialogButtonTitle={"Yeni Bülten Ekle"}
                setFilter={setFilter}
            />
        </>
    );
}
