import { Routes } from '@angular/router';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';

export const routes: Routes = [
    {
        path:"admin/categories",
        loadComponent:
        ()=> import("./features/category/category-list/category-list.component").then(x=>x.CategoryListComponent)
    },
    {
        path:"admin/categories/add",
        loadComponent:
        ()=> import("./features/category/add-category/add-category.component").then(x=>x.AddCategoryComponent)
    },
    {
        path:"admin/categories/:id",
        loadComponent:
        ()=>import("./features/category/edit-category/edit-category.component").then(x=>x.EditCategoryComponent)
    },
    {
        path:"admin/blogposts",
        loadComponent:
        ()=>import("./features/blog-post/blogpost-list/blogpost-list.component").then(x=>x.BlogpostListComponent)
    },
    {
        path:"admin/blogposts/add",
        loadComponent:
        ()=>import("./features/blog-post/add-blogpost/add-blogpost.component").then(x=>x.AddBlogpostComponent)
    },
    {
        path:"admin/blogposts/:id",
        loadComponent:
        ()=>import("./features/blog-post/edit-blogpost/edit-blogpost.component").then(x=>x.EditBlogpostComponent)
    }
];
