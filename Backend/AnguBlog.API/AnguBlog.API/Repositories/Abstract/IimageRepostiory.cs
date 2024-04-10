using AnguBlog.API.Models.Domain;

namespace AnguBlog.API.Repositories.Abstract
{
    public interface IimageRepostiory
    {
        Task<BlogImage> CreateAsync(IFormFile file,BlogImage blogImage);
    }
}
