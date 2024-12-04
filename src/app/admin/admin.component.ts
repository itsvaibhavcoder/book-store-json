import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  books: any[] = [];
  book:any  = {title: '', author: '', description: '', price: 0, image: ''};
  isEditMode:boolean = false;
  isFormVisible:boolean = false;
  
  //Pagination
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 5;
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(){
    this.http.get('http://localhost:3000/books').subscribe((data: any)=>{
      this.books = data;
    });
  }

  //Add or Update the Book
  onSubmit(){
    if(this.isEditMode){
      this.updateBook();
    }
    else{
      this.addBook();
    }
  }
  
 addBook(){
    this.http.post('http://localhost:3000/books', this.book).subscribe(()=>{
      this.fetchBooks();
      this.resetForm();
      this.toggleForm();
    });
  }
 
  updateBook() {
    this.http.put(`http://localhost:3000/books/${this.book.id}`, this.book).subscribe(() => {
      this.fetchBooks();
      this.resetForm();
      this.toggleForm()
    });
  }

  deleteBook(id: number){
    this.http.delete(`http://localhost:3000/books/${id}`).subscribe(() => {
      this.fetchBooks();
    });
  }

  editBook(b: any) {
    this.book = { ...b }; 
    this.isEditMode = true;
    this.isFormVisible = true;
  }
  
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) this.resetForm();
  }

  resetForm() {
    this.book = { title: '', author: '', description: '', price: 0, image:''};
    this.isEditMode = false;
  }
}
