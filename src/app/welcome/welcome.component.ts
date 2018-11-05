import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MenuService } from '../services/menu.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

export interface Item {
  name: string;
  cost: string;
  description: string;
  url: string;
  iid: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  @ViewChild('fileInput')
  fileInputVariable: ElementRef;

  items: Item[];
  rid: string;
  item = {} as Item;
  message = "";
  uploaded = "";

  // Main task
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  files: FileList;

  constructor(
    private authservice: AuthService,
    private menuservice: MenuService,
    private routerAct: ActivatedRoute,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
    this.rid = this.routerAct.snapshot.paramMap.get('rid');
    this.menuservice.getMenu(this.rid).subscribe(res => {
      this.items = res;
    });
  }

  addItem() {
    this.menuservice.add(this.item);
    this.uploaded = "";
    this.message = "";
    this.item = {} as Item;
    this.fileInputVariable.nativeElement.value = "";
  }

  deleteItem(item) {
    console.log(item);
    this.menuservice.delete(item);
  }

  logout() {
    this.authservice.logout();
  }

  startUpload() {
    if (!this.files) {
      console.log("No file uploaded");
      this.message = "Please select an image file";
      return;
    }

    if (!this.item.name || !this.item.cost || !this.item.description) {
      this.message = "Please fill in all fields";
      return;
    }

    const file = this.files.item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type!');
      return;
    }

    // Storage path
    const path = this.rid + "/" + new Date().getTime() + "_" + file.name;
    let ref = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          console.log(url);
          this.item.url = url;
          this.addItem();
        })
      })
    ).subscribe();
  }

  updateFile(event: FileList) {
    this.files = event;
    this.uploaded = "Picture has been uploaded";
    this.message = "";
  }

}
