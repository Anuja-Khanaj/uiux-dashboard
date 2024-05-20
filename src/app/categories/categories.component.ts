import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {}

  onSubmit(form: any): void {
    console.log("Submitting form...");
    console.log("Form value:", form.value);
  
    let categoryData = {
      category: form.value
    };
  
    console.log("Adding category to Firestore:", categoryData);
  
    this.afs.collection('categories').add(categoryData)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(err => {
        console.error("Error adding document: ", err);
      });
  }
  
}
