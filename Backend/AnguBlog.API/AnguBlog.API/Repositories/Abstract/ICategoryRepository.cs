using AnguBlog.API.Models.Domain;

namespace AnguBlog.API.Repositories.Abstract
{
    public interface ICategoryRepository
    {
        Task<Category> CreateAsync(Category category);
        Task<IEnumerable<Category>> GetAllCategoryAsync();
        Task<Category?> GetById(Guid id);
    }
}
