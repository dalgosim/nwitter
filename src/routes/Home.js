import { dbService } from "fbase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";


const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([]);

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

    return (
        <>
            <NweetFactory userObj={userObj}/>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </>
    );
}

export default Home;