import { Routes } from '@angular/router';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';

export const routes: Routes = [
    {
        path:"Admin/Categories",
        loadComponent:
        ()=> import("./features/category/category-list/category-list.component").then(x=>x.CategoryListComponent)
    },
    {
        path:"Admin/Categories/Add",
        loadComponent:
        ()=> import("./features/category/add-category/add-category.component").then(x=>x.AddCategoryComponent)
    },
    {
        path:"Admin/Categories/:id",
        loadComponent:
        ()=>import("./features/category/edit-category/edit-category.component").then(x=>x.EditCategoryComponent)
    }
];
