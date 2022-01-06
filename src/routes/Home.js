import { writeDB, readDB, dbService, storageService } from "fbase";
import { collection, onSnapshot } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Nweet from "components/Nweet";


const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    // const getNweets = async () => {
    //     const dbNweets = await readDB("nweet");
    //     dbNweets.forEach((doc) => {
    //         const nweetObject = { ...doc.data(), id: doc.id }
    //         setNweets((prev) => [nweetObject, ...prev]);
    //     });
    // };

    useEffect(() => {
        // getNweets();
        const unsub = onSnapshot(collection(dbService, "nweet"), (snapshot) => {
            console.log(snapshot.docs);
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        });        
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment!="") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, 'data_url').then((snapshot) => {
                console.log('Uploaded a data_url string!');
                console.log(snapshot);
                return snapshot;
            });
            attachmentUrl = await getDownloadURL(response.ref);
        }
        await writeDB("nweet", {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        });
        setNweet("");
        setAttachment("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

    const onFileChange = (event) => {
        const {
            target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => {
        setAttachment("");
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet" />
                { attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" /> 
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </>
    );
}

export default Home;