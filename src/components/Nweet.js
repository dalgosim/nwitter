import { dbService, storageService, writeDB } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");

        if (ok) {
            await deleteDoc(doc(dbService, "nweet", nweetObj.id));
            if (nweetObj.attachmentUrl!="") {
                deleteObject(ref(storageService, nweetObj.attachmentUrl)).then(() => {
                    // File deleted successfully
                    console.log("File deleted successfully");
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                    console.log("Uh-oh, an error occurred!");
                });
            }
        }
    }

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(doc(dbService, "nweet", nweetObj.id), {text: newNweet});
        setEditing(false);
    };

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} value={newNweet} required />
                        <input type="submit" value="Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                <h4>{nweetObj.text}</h4>
                {nweetObj.attachmentUrl && (
                    <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
                )}
                {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>Delete Nweet</button>
                        <button onClick={toggleEditing}>Edit Nweet</button>
                    </>
                )}
                </>
            )}
        </div>
    );
}

export default Nweet;