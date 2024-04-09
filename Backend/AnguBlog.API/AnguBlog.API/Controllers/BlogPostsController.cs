using AnguBlog.API.Models.Domain;
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
        private readonly ICategoryRepository categoryRepository;

        public BlogPostsController(IBlogPostRepository blogPostRepository, ICategoryRepository categoryRepository)
        {
            this.blogPostRepository = blogPostRepository;
            this.categoryRepository = categoryRepository;
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
                Categories = new List<Category>()
            };
            foreach(var category in dto.Categories) 
            {
                var existingCategory = await categoryRepository.GetById(category);
                if(existingCategory != null) 
                {
                    blogPost.Categories.Add(existingCategory);
                }
            }

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
                Categories = createdBlog.Categories.Select(x => new CategoryDto()
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle,
                }).ToList()
            };
            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllBlogPosts()
        {
            var blogPosts = await blogPostRepository.GetAllBlogPostsAsync();
            var response = new List<BlogPostDto>();
            foreach (var blogPost in blogPosts)
            {

                response.Add(new BlogPostDto()
                {
                    Id = blogPost.Id,
                    Author = blogPost.Author,
                    Content = blogPost.Content,
                    FeaturedImageUrl = blogPost.FeaturedImageUrl,
                    IsVisible = blogPost.IsVisible,
                    PublishedDate = blogPost.PublishedDate,
                    ShortDescription = blogPost.ShortDescription,
                    Title = blogPost.Title,
                    UrlHandle = blogPost.UrlHandle,
                    Categories = blogPost.Categories.Select(x => new CategoryDto()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        UrlHandle = x.UrlHandle,
                    }).ToList()
                });
            }
            return Ok(response);

        }
    }
}
