import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  permalink:string = ''
 imgSrc: any = "./../../../assets/SLEEPING BUNNY (4).png";
 selectedImg:any;
 categories: any;
 postform : FormGroup;
 constructor(private categoryService: CategoriesService, private fb: FormBuilder ) {
  this.postform = this.fb.group({
    title: ['',Validators.required,Validators.maxLength(10)],
    permalink: ['',Validators.required],
    excerpt: ['',Validators.required,Validators.maxLength(100)],
    category: ['',Validators.required],
    postImg: ['',Validators.required],
    content: ['',Validators.required]
  })
  }
ngOnInit(): void {
this.categoryService.loadData().subscribe(val =>
this.categories = val
)
}


get fc() {
  return this.postform.controls;
}
  onKeyUp($event){
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g,'-');
    console.log(this.permalink);
    
  }
  onChangePreview($event){
    const reader = new FileReader();
    reader.onload = (e)=>{
      this.imgSrc = e.target.result
    }
    reader.readAsDataURL($event.target.files[0])
    this.selectedImg = $event.target.files[0];
  }

  onSubmit(){
    console.log(this.postform.value);
    const postData: Post = {
    title: this.postform.value.title,
    permalink: this.postform.value.permalink,
    category:{
    categoryId:'',
    category: ''
    },
    postImgPath:'',
    excerpt: this.postform.value.excerpt,
    content: this.postform.value.content,
    isFeatured: false,
    views: 0,
    status: 'new',
    createdAt: new Date()
    }
    }
}

// 6:03:20