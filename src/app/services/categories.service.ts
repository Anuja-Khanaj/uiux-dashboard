import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore,private toastrService:ToastrService) { }
  SaveDate(data:any){
    this.afs.collection('categories').add(data)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        this.toastrService.success("Data submitted successfully")
      })
      .catch(err => {
        console.error("Error adding document: ", err);
      });
  }

  loadData(){
    return this.afs.collection('categories').snapshotChanges().pipe(map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{data,id}
        })
    }))
  }

  updateDate(id:string,EditData:Category){
    this.afs.doc(`categories/+ ${id}`).update(EditData).then(docRef=>{
      this.toastrService.success('Data updated successfully..');
    })

    // this.afs.collection('categories').doc(id).update(EditData).then(docRef=>{
    //   this.toastrService.success('Data updated successfully..');
    // })
  }
  deleteData(id:string) {
    this.afs.doc(`categories/+ ${id}`).delete().then(docRef =>
    this.toastrService.success('Data Deleted..!')
  )
  }
  
}
