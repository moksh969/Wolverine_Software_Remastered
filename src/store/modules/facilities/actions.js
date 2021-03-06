import { db } from "../../../firebaseDb";
import { v4 as uuidv4 } from 'uuid';
import copyAndPaste from "../../../logic/copyAndPaste";
export default {
    add_facility(context, payload) {
        console.log(context)
        console.log(payload)

        context.commit({
            type: "setIsSaving",
            payload: {
                status: true
            }
        });
        const userid = context.rootState.auth.userInfo.uid;
        let id = uuidv4();
        let name = payload.payload.name;
        let cut = payload.payload.cut;
        let total = payload.payload.total;
        let file_path = payload.payload.file_path;

        let data = {
            id: id,
            name: name,
            cut: cut,
            total: total,
        }

        console.log(data);

        //Logic To Copy and Paste Templates in Templates Folder
        if (file_path != null) {
            let source_location = file_path;
            let template_location = localStorage.getItem("template_location") + "/" + `${id}.docx`
            let res = copyAndPaste(source_location, template_location);
            console.log(res);
        }



        db.collection("centres").doc(userid).collection("facilities").doc(id).set(data).then(() => {
            console.log("data saved");
            context.commit({
                type: "setIsSaving",
                payload: {
                    status: false
                }
            });
            context.dispatch({
                type: "get_facilities",
            })
        });
    },

    async get_facilities(context, payload) {
        console.log("Getting Facilities");
        console.log(context)
        console.log(payload)
        let facilities = []
        const userid = context.rootState.auth.userInfo.uid;
        console.log(userid)
        let snapshot = await db.collection("centres").doc(userid).collection("facilities").orderBy('name').get();
        snapshot.forEach(doc => {
            facilities.push(doc.data())
        });
        context.commit({
            type: "setFacilities",
            payload: facilities
        })
    },

    update_facility(context, payload) {
        console.log(context)
        console.log(payload)
        context.commit({
            type: "setIsUpdating",
            payload: {
                status: true
            }
        })
        const userid = context.rootState.auth.userInfo.uid;
        let id = payload.payload.id;
        let name = payload.payload.name;
        let cut = payload.payload.cut;
        let total = payload.payload.total;
        let file_path = payload.payload.file_path;

        console.log(userid);
        console.log(name);
        console.log(id);
        console.log(cut);
        console.log(total);
        console.log("File Path", file_path);

        if (file_path != null) {
            let source_location = file_path;
            let template_location = localStorage.getItem("template_location") + "/" + `${id}.docx`
            let res = copyAndPaste(source_location, template_location);
            console.log(res);
        }


        let query = db.collection("centres").doc(userid).collection("facilities").doc(id).update({
            name:name,
            cut:cut,
            total:total,    
        });
        query.then(()=>{
            console.log("Data Updated");
        context.commit({
            type: "setIsUpdating",
            payload: {
                status: false
            }
        })
        context.dispatch({
            type:"get_facilities"
        })       
        }).catch((e)=>{
            console.log(e);
            context.commit({
                type:"setIsUpdating",
                payload:{
                    status:false
                }
            }) 
        })
    },


    delete_facility(context, payload) {
        console.log(context)
        console.log(payload)
        context.commit({
            type: "setIsDeleting",
            payload: {
                status: true
            }
        })
        const userid = context.rootState.auth.userInfo.uid;
        console.log(userid)
        let facilityId = payload.payload.id;
        let query = db.collection("centres").doc(userid).collection("facilities").doc(facilityId).delete();
        query.then(() => {
            console.log("Deleted");
            context.commit({
                type: "setIsDeleting",
                payload: {
                    status: false
                }
            })
            context.dispatch({
                type: "get_facilities"
            })
        }).catch((e) => {
            console.log(e);
            context.commit({
                type: "setIsDeleting",
                payload: {
                    status: false
                }
            })
        })
    }
}