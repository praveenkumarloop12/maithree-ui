import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


 
@NgModule({
 imports:      [ CommonModule, BrowserAnimationsModule, ToastrModule.forRoot() ],
 declarations: [ ],
 exports:      [ CommonModule, FormsModule, ToastrModule ]
})
export class SharedModule { }