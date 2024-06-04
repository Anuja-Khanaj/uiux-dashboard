import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: Storage, private afs : AngularFirestore, private toastr:ToastrService , private router:Router) { }

  uploadImage(selectedImage: File, postData,formStatus,id): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = `postIMG/${Date.now()}_${selectedImage.name}`;
      const storageRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress monitoring can be implemented here
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error('Upload failed:', error);
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('File available at', downloadURL);
              postData.postImgPath = downloadURL; // Fix: Use downloadURL instead of URL

              if(formStatus == 'Edit'){
                this.updateData(id,postData);
              }else{
              this.saveData(postData);
              }
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  }

  saveData(postData){
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success('Data Insert Successfully');
      })
      this.router.navigate(['/post'])
  }

  loadData(){
    return this.afs.collection('posts').snapshotChanges().pipe(map(actions=>{
        return actions.map(a=>{
          
          const data = a.payload.doc.data();
          console.log(data);
          const id = a.payload.doc.id;
          return{data,id}
          console.log();
          
        })
    }))
  }

  loadOneDate(id:object){
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  updateData(id,postData){
    this.afs.doc(`posts/${id}`).update(postData).then(()=>{
      this.toastr.success('Data Updated Successfully')
      this.router.navigate(['/post']);
    })
  }

  deleteImage(postImgPath: string, id: string) {
    const storageRef = ref(this.storage, postImgPath);
    deleteObject(storageRef).then(() => {
      this.deleteData(id);
    }).catch(error => {
      console.error('Error deleting image:', error);
      this.toastr.error('Error deleting image');
    });
  }

  deleteData(id: string) {
    this.afs.doc(`posts/${id}`).delete().then(() => {
      this.toastr.warning('Data Deleted!');
    }).catch(error => {
      console.error('Error deleting data:', error);
      this.toastr.error('Error deleting data');
    });
  }
  FeatureUpdate(id,featureData){
    this.afs.doc(`posts/${id}`).update(featureData).then(()=>{
      this.toastr.success('Featured Updated Successfully')
      
    })
  }
}
