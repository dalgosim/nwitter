import { authService, dbService, _updateProfile } from "fbase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";

const Profile = ({userObj, refreshUser}) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await _updateProfile({displayName: newDisplayName});
            refreshUser();
        }
    }

    // const getMyNeets = async () => {
    //     const nweetRef = collection(dbService, "nweet");
    //     const q = query(nweetRef,
    //         where("creatorId", "==", userObj.uid),
    //         orderBy("createdAt", "asc")
    //     );
    //     const querySnapshot = await getDocs(q);

    //     console.log(querySnapshot.docs.map((doc) => doc.data()));
    // }

    useEffect(() => {
        // getMyNeets();
    }, []);
    
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName} />
                <input type="submit" placeholder="Update Profile"/>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;