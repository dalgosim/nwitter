import { dbService } from "fbase";
import { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { getDocs, collection, onSnapshot, query, where, orderBy } from "firebase/firestore";


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
        const nweetRef = collection(dbService, "nweet");
        const q = query(nweetRef,
            orderBy("createdAt", "desc")
        );
        const unsub = onSnapshot(q, (snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        });        
    }, []);

    return (
        <div className="container">
            <NweetFactory userObj={userObj}/>
            <div style={{marginTop: 30}}>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
}

export default Home;