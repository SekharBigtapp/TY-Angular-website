import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import {GaleryPaginationComponent} from './galery-pagination.component';

@NgModule({
    declarations: [
        GaleryPaginationComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        GaleryPaginationComponent
    ]
})
export class GaleryPaginationModule
{
}