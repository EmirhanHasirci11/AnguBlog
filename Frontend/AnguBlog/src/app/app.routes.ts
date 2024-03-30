import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:"Admin/Categories",
        loadComponent:
        ()=> import("./features/category/category-list/category-list.component").then(x=>x.CategoryListComponent)
    }
];
