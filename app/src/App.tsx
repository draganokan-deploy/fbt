import React, { useState, useEffect } from 'react';
import firebase, { firestore } from 'firebase'
import {InputGroup, Button, H1, H3, FileInput} from '@blueprintjs/core'


type AppState = {
    email: string,
    pass: string
}

function SignUpForm() {

    const [state, setState] = useState<AppState>({
        email: "dada@dada.com",
        pass: "123456"
    })

    const setPartial = (change: Partial<AppState>) => {
        setState({
            ...state,
            ...change
        })
    }

    const registerUser = () => {
        firebase.auth().createUserWithEmailAndPassword(state.email, state.pass)
            .then(val=>{
                console.log(val)
            })
    }

    return (
        <div>
            <H3>Sign up:</H3>

            <InputGroup type="email" value={state.email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{ setPartial({email: e.target.value }) }}/>
            <InputGroup type="password" value={state.pass} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{ setPartial({pass: e.target.value }) }}/>
            <Button text="Sign Up" onClick={registerUser} icon="new-person" />
        </div>
    );
}

function LoginForm() {

    const [state, setState] = useState<AppState>({
        email: "dada@dada.com",
        pass: "123456"
    })

    const setPartial = (change: Partial<AppState>) => {
        setState({
            ...state,
            ...change
        })
    }

    const registerUser = () => {
        firebase.auth().signInWithEmailAndPassword(state.email, state.pass)
            .then(val=>{
                console.log(val)
            })
    }

    return (
        <div>
            <H3>Login:</H3>

            <InputGroup type="email" value={state.email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{ setPartial({email: e.target.value }) }}/>
            <InputGroup type="password" value={state.pass} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{ setPartial({pass: e.target.value }) }}/>
            <Button text="Login" onClick={registerUser} icon="unlock" />
        </div>
    );
}

const Storage: React.FC = () => {
    return (
        <div>
            <H3>Storage:</H3>
            <FileInput
                text="Choose file..."
                onInputChange={e =>{
                    const files = (e.target as any).files as FileList
                    
                    const file = files[0]

                    // upload
                    firebase.storage().ref()
                        .child(file.name)
                        .put(file)
                            .then(res => {
                                
                                // get direct url
                                firebase.storage().ref()
                                    .child(file.name)
                                    .getDownloadURL()
                                        .then(url => console.log(url))
                            })

                    
                }}
            />
            <Button text="List all files" onClick={()=>{
                firebase.storage().ref().listAll().then(res=>console.log(res))
            }} />
        </div>
    )
}

const Database: React.FC = () => {

    return (
        <div>
            <H3>DB/Firestore:</H3>
            <Button
                text="Read"
                onClick={()=>{
                    // read
                    const autoriRef = firebase.firestore().collection('autori')
                    autoriRef.get()
                        .then(res => {
                            res.forEach(doc => {
                                console.log(doc.data())
                            })
                        })
                }}
            />
            <Button
                text="Insert"
                onClick={()=>{
                    // insert
                    const autoriRef = firebase.firestore().collection('autori')
                    const newDoc = autoriRef.doc()
                    newDoc.set({
                        f1: "da",
                        f2: 3,
                        f3: false,
                        f4: ["hue", 3, true] 
                    }).then(() => {
                        console.log("insert done")
                    })
                }}
            />
            <Button
                text="Update"
                onClick={()=>{
                    // update
                    const autoriRef = firebase.firestore().collection('autori')
                    autoriRef.limit(1).get().then(res => {
                        res.forEach(doc => {
                            autoriRef.doc(doc.id).update({
                                f117: "nevidljivi"
                            }).then(()=>{
                                console.log("update done")
                            })
                        })
                    })
                }}
            />
            <Button
                text="Delete"
                onClick={()=>{
                    // delete
                    const autoriRef = firebase.firestore().collection('autori')
                    autoriRef.limit(1).get().then(res => {
                        res.forEach(doc => {
                            autoriRef.doc(doc.id).delete().then(()=>{console.log("delete done")})
                        })
                    })
                }}
            />
            <Button
                text="Query"
                onClick={()=>{
                    // query
                    const autoriRef = firebase.firestore().collection('autori')
                    autoriRef.where("f117", "==", "nevidljivi").get()
                        .then(docs=>{
                            docs.forEach(doc => console.log(doc.data()))
                        })
                }}
            />
        </div>
    )
}

const Analytics: React.FC = () => {
    return (
        <div>
            <Button text="event1" onClick={()=>{
                firebase.analytics().logEvent("event1", {
                    da: true,
                    mozda: "maybe",
                    false: 0
                })
                firebase.analytics().setUserProperties({
                    bla: Math.floor(Math.random()*5)
                })
            }}
            />
            <Button text="event2" onClick={()=>{
                
                firebase.analytics().setUserId("hueuhe")
                firebase.analytics().logEvent("event2", {
                })
            }}
            />
        </div>
    )
}

const App: React.FC = () => {
    useEffect(()=>{

        const projectId = 'my-first-firebase-projec-40363'

        const firebaseConfig = {
            apiKey: 'AIzaSyB08fRp0U0r53FYxnQ2o1FH-dwiY4KZMco',
            authDomain: `${projectId}.firebaseapp.com`,
            databaseURL: `https://${projectId}.firebaseio.com`,
            projectId: `${projectId}`,
            storageBucket: `${projectId}.appspot.com`,
            messagingSenderId: "332434069062",
            appId: "1:332434069062:web:254aacb24bb4dc1b2b1c47",
            measurementId: "G-V9F5MGDZBW"
          };

        firebase.initializeApp(firebaseConfig)
    }, [])

    return (
        <div style={{width: "400px", margin: "40px auto"}}>
            <H1>hello firebase + react  🔥 </H1>
            <SignUpForm />
            <LoginForm />
            <Storage />
            <Database />
            <Analytics />
        </div>
    )
}
    
export default App;
    