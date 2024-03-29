using AnguBlog.API.Models.Domain;

namespace AnguBlog.API.Repositories.Abstract
{
    public interface ICategoryRepository
    {
        Task<Category> CreateAsync(Category category);        
    }
}
