import React, { useContext, useEffect, useState } from 'react'
// import context from 'react-bootstrap/esm/AccordionContext'
import { GlobalContext } from '../context/context'
import './pages.css'
import { deleteDoc, doc, orderBy, getFirestore, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import moment from 'moment';
import axios from 'axios'
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { collection } from "firebase/firestore";
import { Modal } from 'react-bootstrap';
import Delete from '../images/delete.png'
import Edit from '../images/edit.png'






const Home = () => {

    const addPost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my-post-one");

        try {
            if (file) {
                const res = await axios.post("https://api.cloudinary.com/v1_1/dhfsxobpi/upload", formData);
                console.log(res.data);
                const docRef = await addDoc(collection(db, "Post"), {
                    userID: state?.user?.uid,
                    caption: postCaption,
                    authorName: state?.user?.displayName,
                    authorEmail: state?.user?.email,
                    authorProfile: state?.user?.photoURL,
                    postText: postCaption,
                    postDate:serverTimestamp(),
                    postFile: res?.data?.url
                });
            setPostCaption("");
            // setPosts([])
            // GetPost();
            console.log("Document written with ID: ", docRef.id);
        } else {
            const docRef = await addDoc(collection(db, "Post"), {
                userID: state?.user?.uid,
                caption: postCaption,
                authorName: state?.user?.displayName,
                authorEmail: state?.user?.email,
                authorProfile: state?.user?.photoURL,
                postText: postCaption,
                postDate: serverTimestamp(),
                // postFile: res?.data?.url
            });
            setPostCaption("");
            // setPosts([])
            // GetPost();
            console.log("Document written with ID: ", docRef.id);
        }
    }
        catch (e) {
        console.error("Error adding document: ", e);
    }
}
const db = getFirestore();
const GetPost = async () => {
    const q = query(collection(db, "Post"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
}
useEffect(() => {
    const realTimeData = () => {
        const q = query(collection(db, "Post"), where(state?.user?.uid, "==" , "userID" ) ,orderBy("postDate" , "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let realTimePost = []
            querySnapshot.forEach((doc) => {
                realTimePost.push({ ...doc.data(), id: doc.id })
            });
            setPosts(realTimePost)
        });
    }

    realTimeData()
}, [])


const deletePost = async (id) => {
    await deleteDoc(doc(db, "Post", id));

}

const updatePost = async () => {
    await updateDoc(doc(db, "Post", currenPost), {
        postText: currentCaption
    });
    handleClose();
}

const EditPost = (val, id) => {
    setShow(true)
    // setPostText(post?.postText)
    setCurrentCaption(val);
    setCurrenPost(id)
}


const handleClose = () => {
    setShow(false);
    setCurrentCaption("");
    setCurrenPost("")
}

let { state, dispatch } = useContext(GlobalContext)
const [postCaption, setPostCaption] = useState("")
const [posts, setPosts] = useState([])
const [file, setFile] = useState()
const [show, setShow] = useState(false)
const [currentCaption, setCurrentCaption] = useState('')
const [currenPost, setCurrenPost] = useState("")

return (
    <>
        <form onSubmit={addPost}>
            <div className="post">
                <textarea placeholder='Whats on your mind`s' id='textarea' onChange={(e) => { setPostCaption(e.target.value) }} ></textarea>
                <div className="file">
                    <input type="file" onChange={(e) => { setFile(e?.target?.files[0]) }} />
                </div>
                <Button variant="outlined" onClick={addPost}>Submit</Button>
            </div>
        </form>
        <div className="post32">
            {posts.map((eachPost, i) => {
                console.log("eachPost", eachPost)
                return (
                    <div className="getpost1" key={i}>
                        <div className="getpost1-1">
                            <img src={eachPost?.authorProfile} alt="" />
                            <div className="getpost1-2">
                                <h2>{eachPost?.authorName}</h2>
                                <span>{moment(eachPost?.postDate?.seconds * 1000).fromNow()}</span>
                            </div>
                            {(state?.user?.uid == eachPost?.userID) ?
                            <>
                            <div className="deletePosts">
                                <img src={Delete} alt="" onClick={() => {
                                    Swal.fire({
                                        title: "Do you want to Delete this posts?",
                                        icon: "error",
                                        showCancelButton: true,
                                        confirmButtonText: "Delete",

                                    }).then((result) => {
                                        /* Read more about isConfirmed, isDenied below */
                                        if (result.isConfirmed) {
                                            Swal.fire("Saved!", "", "success");
                                            deletePost(eachPost?.id)
                                        }
                                    });
                                }} id='caption' />
                                <img src={Edit} alt="" onClick={() => { EditPost(eachPost?.postText, eachPost?.id) }} id='caption' />
                            </div>
                            </>
                            :
                            null
                            }
                        </div>
                        <div className="getpost2">
                            <p>{eachPost?.postText}</p>
                            <div className="postfile1">
                                {(eachPost?.postFile) ?
                                    <img src={eachPost?.postFile} alt="" id='postFile' />
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="text" value={currentCaption} onChange={(e) => { setCurrentCaption(e?.target?.value) }} className='w-100 py-2 px-1 rounded-3' />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={updatePost}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
)
}

export default Home
