import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  permalink: string = '';
  imgSrc: any = "./../../../assets/SLEEPING BUNNY (4).png";
  selectedImg: any;
  categories: any;
  postform: FormGroup;
  post: any;
  formStatus:string = 'Add new';
  docId:any;

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postservice: PostsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(val => {
      console.log(val);
      this.docId = val['id']
      this.postservice.loadOneDate(val['id']).subscribe(post => {
        this.post = post;
        console.log(post);
        
        this.postform = this.fb.group({
          title: [this.post.title, [Validators.required, Validators.minLength(10)]],
          permalink: [this.post.permalink, Validators.required],
          excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(50)]],
          category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
          postImg: [, Validators.required],
          content: [this.post.content, Validators.required]
        });
        this.imgSrc = this.post.postImgPath;
        this.formStatus = "Edit"
      });
    });

    this.postform = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: [, Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => this.categories = val);
  }

  get fc() {
    return this.postform.controls;
  }

  onKeyUp($event) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
    console.log(this.permalink);
  }

  onChangePreview($event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    console.log(this.postform.value);
    let splitted = this.postform.value.category.split('-');
    const postData: Post = {
      title: this.postform.value.title,
      permalink: this.postform.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      excerpt: this.postform.value.excerpt,
      content: this.postform.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    };

    this.postservice.uploadImage(this.selectedImg, postData,this.formStatus,this.docId);
    this.postform.reset();
    this.imgSrc = " ";
  }
}
