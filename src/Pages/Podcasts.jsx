import { ButtonGroup, IconButton } from "@mui/material";
import { LockOpen, RemoveCircle, DriveFileRenameOutlineOutlined } from "@mui/icons-material";
import TableLayouts from "../Layouts/Table";
import React from "react";
import PodcastForm from "../Components/Forms/PodcastForm";
import FormDialog from "../Layouts/FormDialog";

export default function Podcasts() {
    const [filter, setFilter] = React.useState("");
    const [selectedPodcastInfo, setSelectedpodcastInfo] = React.useState(null);
    const [podcastFormOpen, setPodcastFormOpen] = React.useState(false);

    function handleActivePodcasts(id, isActive) {
        // Ban program logic
    }

    function handleEditPodcasts(id) {
        const podcastInfo = {
            name: "Podcast 1",
            content: "Podcast İçeriği 1",
            podcaster: "Murat Can",
            podcastLink: "https://ornekpodcast.com",
            podcastPhoto: "https://via.placeholder.com/300"
        };

        setSelectedpodcastInfo(podcastInfo);
        setPodcastFormOpen(true);
    }

    const createOperations = (isActive, id) => {
        return (
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <IconButton title={isActive ? "Podcasti Kaldır" : "Podcasti Aktifleştir"}
                    onClick={() => handleActivePodcasts(id, isActive)} color={isActive ? "error" : 'success'}>
                    {isActive ? <RemoveCircle /> : <LockOpen />}
                </IconButton>
                <IconButton title='Podcast bilgilerini düzenle' 
                    onClick={() => handleEditPodcasts(id)} color='primary'
                >
                    <DriveFileRenameOutlineOutlined />
                </IconButton>
            </ButtonGroup>
        );
    }

    const data = [
        {
            id: 1,
            name: 'Podcasts 1',
            podcaster: "Podcaster 1",
            operations: createOperations(false, 1),
        },
        {
            id: 2,
            name: 'Podcasts 2',
            podcaster: "Podcaster 2",
            operations: createOperations(false, 1),
        },
        {
            id: 3,
            name: 'Podcasts 3',
            podcaster: "Podcaster 3",
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
            id: 'podcaster',
            numeric: false,
            label: 'Podcaster',
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
            item.podcaster.toLowerCase().includes(filter.toLowerCase())
        );
    });

    return (
        <>
            <FormDialog
                open={podcastFormOpen} 
                setOpen={setPodcastFormOpen} 
                dialogTitle={selectedPodcastInfo ? "Podcasti Düzenle" : "Yeni Podcast Oluştur"} 
                dialogContent={<PodcastForm selectedPodcastInfo={selectedPodcastInfo}/>}
                contentText={selectedPodcastInfo ? 
                    "Podcasti düzenlemek için lütfen aşağıdaki formu doldurunuz." :
                    "Yeni bir podcast oluşturmak için lütfen aşağıdaki formu doldurunuz."
                } 
            />
            <TableLayouts
                headers={headers}
                data={filteredData}
                setOpenNewDialog={() => {setSelectedpodcastInfo(null); setPodcastFormOpen(true);}}
                title={"Podcasts"}
                dialogButtonTitle={"Yeni Podcast Ekle"}
                setFilter={setFilter}
            />
        </>
    );
}
