
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  isLoading:boolean = true;
  isDisplay :boolean = false;
  categoryArray:any;
  formCategory:string = '';
  formStatus:string = 'Add Category';
  categoryId:any='';

  constructor(private categoryService: CategoriesService, ) { }

  ngOnInit(): void { 
    this.categoryService.loadData().subscribe(val=>{
      console.log(val);
      this.categoryArray = val;
      this.isDisplay = true;
      this.isLoading = false;
    })
  }

  onSubmit(form: any): void {
    console.log("Submitting form...");
    console.log("Form value:", form.value);


    // Extracting the specific field value correctly
    const categoryName = form.value.category;

    // Checking if the categoryName is not undefined
    if (!categoryName) {
      console.error("Category name is undefined!");
      return;
    }

    let categoryData:Category = {
      category: categoryName  // Assuming 'category' is the name of your input field
    };
   
    if(this.formStatus == 'Add Category'){
      console.log("Adding category to Firestore:", categoryData);
      this.categoryService.SaveDate(categoryData);
       form.reset()
    }
    else if(this.formStatus == 'Edit'){
      this.categoryService.updateDate(this.categoryId,categoryData)
    }


  // 3:58:00
    // let subCategoryData = {
    //   subCategory: 'subCategory1'
    // }

    // 

    // this.afs.collection('categories').add(categoryData)
    //   .then(docRef => {
    //     console.log("Document written with ID: ", docRef.id);

    //     this.afs.collection('categories').doc(docRef.id).collection('subCategories').add(subCategoryData).then(docRef1 => {
    //       console.log('docRef1')
    //       this.afs.doc(`categories/${docRef.id}/subCategories/${docRef1.id}`).collection('subsubCategories').add(subCategoryData);

    //       this.afs.collection('categories').doc(docRef.id).collection('subCategories').doc(docRef1.id).collection('subsubCategories').add(subCategoryData).then(docRef2 => { console.log('docRef2') });
    //     }

    //     );
    //   })
    //   .catch(err => {
    //     console.error("Error adding document: ", err);
    //   });
  }

  onEdit(cate:any,id:any){
    console.log(cate);
    this.formCategory = cate;
    this.formStatus = "Edit";
    this.categoryId = id;
  }

  onDelete(id:any){
    this.categoryService.deleteData(id)
  }
}
