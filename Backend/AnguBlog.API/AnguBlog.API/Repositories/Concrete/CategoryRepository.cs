using AnguBlog.API.Data;
using AnguBlog.API.Models.Domain;
using AnguBlog.API.Repositories.Abstract;
using Microsoft.EntityFrameworkCore;

namespace AnguBlog.API.Repositories.Concrete
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;
        
        public CategoryRepository(ApplicationDbContext dbContext)
        {
            this._context = dbContext;
        }
        public async Task<Category> CreateAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<IEnumerable<Category>> GetAllCategoryAsync()
        {
            return await _context.Categories.ToListAsync();
        }
    }
}
