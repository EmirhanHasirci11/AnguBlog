﻿using AnguBlog.API.Models.Domain;
using AnguBlog.API.Models.DTO;
using AnguBlog.API.Repositories.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AnguBlog.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly IBlogPostRepository blogPostRepository;

        public BlogPostsController(IBlogPostRepository blogPostRepository)
        {
            this.blogPostRepository = blogPostRepository;
        }

        [HttpPost]
        public async Task<IActionResult> AddBlogPost(CreateBlogPostRequestDto dto)
        {
            var blogPost = new BlogPost()
            {
                Author = dto.Author,
                Content = dto.Content,
                FeaturedImageUrl = dto.FeaturedImageUrl,
                IsVisible = dto.IsVisible,
                PublishedDate = dto.PublishedDate,
                ShortDescription = dto.ShortDescription,
                Title = dto.Title,
                UrlHandle = dto.UrlHandle,
            };

            var createdBlog = await blogPostRepository.CreateAsync(blogPost);

            var response = new BlogPostDto()
            {
                Id = createdBlog.Id,
                Author = createdBlog.Author,
                Content = createdBlog.Content,
                FeaturedImageUrl = createdBlog.FeaturedImageUrl,
                IsVisible = createdBlog.IsVisible,
                PublishedDate = createdBlog.PublishedDate,
                ShortDescription = createdBlog.ShortDescription,
                Title = createdBlog.Title,
                UrlHandle = createdBlog.UrlHandle,
            };
            return Ok(response);
        }
    }
}