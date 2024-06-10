import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent {
  isLoading:boolean = true;
  isDisplay :boolean = false;
  postArray:any[]=[]; // Initialize with an empty array

  constructor(private postservice: PostsService) { }
  
  ngOnInit(): void {
    this.postservice.loadData().subscribe(val=>{
      this.postArray = val;
      console.log(val); 
      this.isLoading = false ;
      this.isDisplay = true
   })
  }
  delete(path,id){
    this.postservice.deleteImage(path,id);
  }
  onFeatured(id,value){
    const featureData ={
      isFeatured:value
    }
    this.postservice.FeatureUpdate(id,featureData)
  }
  
}