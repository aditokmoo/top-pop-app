import React, { useState, useEffect } from 'react';
import Song from './Song'

function Songs() {
    const [songs, setSongs] = useState([]);
    const [song, setSong] = useState([]);
    const [modal, setModal] = useState(false);
    const [select, setSelect] = useState('veci')

    const fetchData = async () => {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/');
        const data = await response.json();
        const item = data.tracks.data;

        defaultSort(item);

        setSongs(item)
    }

    const defaultSort = item => {
        item.sort((a, b) => {
            if(a.rank > b.rank) {
                return 1
            }
            if(a.rank < b.rank) {
                return -1
            }
            return 0;
        })
    }

    const sortSongs = newSelect => {
        if(newSelect === 'veci') {
            songs.sort((a, b) => {
                if(a.rank > b.rank) {
                    return 1
                }
                if(a.rank < b.rank) {
                    return -1
                }
                return 0;
            })
        } else {
            songs.sort((a, b) => {
                if(a.rank > b.rank) {
                    return -1
                }
                return 0
            })
        }
        setSelect(newSelect)
    }

    const getModal = (e) => {
        songs.forEach(item => {
            if(item.position === parseInt(e.target.id)) {
                setSong(item)
                setModal(true)
            }
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
        <div className='ranks'>
            <select name="ranks" id="ranks" onChange={(e) => sortSongs(e.target.value)} value={select}>
                <option value="veci">Bolje rangirani</option>
                <option value="manji">Slabije rangirani</option>
            </select>
        </div>
            {songs.map(item => (
                <div className='section' key={item.id}>
                    <div className="img-section">
                        <img src={item.album.cover_medium} alt="medium_cover_image" />
                    </div>
                    <div className="text-section">
                        <h3>{item.title}</h3>
                        <span>Author: {item.artist.name}</span>
                        <span>Rank: {item.rank}</span>
                        <a href={item.preview} target="_blank" rel="noreferrer"><i className="fas fa-play"></i> Preview</a>
                        <a id={item.position} onClick={getModal}><i className="fas fa-music"></i> View</a>
                    </div>
                </div>
            ))}
            {modal && <Song closeModal={setModal} song={song}/>}
        </>
    )
}

export default Songs