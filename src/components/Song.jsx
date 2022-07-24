import React, {useState, useEffect} from 'react'

function Song({song, closeModal}) {

    const [duration, setDuration] = useState()

    useEffect(() => {
        let mins = ~~((song.duration % 3600) / 60);
        let secs = ~~song.duration % 60;

        if(secs > 9) {
            let duration = `${mins}:${secs}`
            setDuration(duration)
            
        } else {
            let duration = `${mins}:0${secs}`
            setDuration(duration)
        }
    }, [])

    return (
        <>
        <div className='modal'>
            <div className='overlay'></div>
            <div className="modal-content">
                    <span onClick={() => closeModal(false)} id="close-btn"><i className='fa fa-times'></i></span>
                    <div className="content" key={song.id}>
                        <div className="img-content">
                            <img src={song.album.cover_big} alt="big_cover_image" />
                        </div>
                        <div className="text-content">
                            <h1>{song.title}</h1>
                            <ul>
                                <li>Author: {song.artist.name}</li>
                                <li>Duration: {duration}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Song
