using AnguBlog.API.Models.Domain;

namespace AnguBlog.API.Repositories.Abstract
{
    public interface IBlogPostRepository
    {
        Task<BlogPost> CreateAsync(BlogPost blogPost);
        Task<IEnumerable<BlogPost>> GetAllBlogPostsAsync();
    }
}
