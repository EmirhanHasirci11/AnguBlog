import { Routes } from '@angular/router';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';

export const routes: Routes = [
    {
        path:"",
        loadComponent:
        ()=> import("./features/public/home/home.component").then(x=>x.HomeComponent)
    },
    {
        path:"login",
        loadComponent:
        ()=> import("./features/auth/login/login.component").then(x=>x.LoginComponent)
    },
    {
        path:"blog/:url",
        loadComponent:
        ()=> import("./features/public/blog-details/blog-details.component").then(x=>x.BlogDetailsComponent)
    },
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
