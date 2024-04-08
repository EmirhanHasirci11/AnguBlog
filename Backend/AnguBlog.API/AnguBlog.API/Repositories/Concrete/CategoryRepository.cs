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

        public async Task<Category?> DeleteAsync(Guid id)
        {
            var category= await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (category == null)
                return null;
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<IEnumerable<Category>> GetAllCategoryAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category?> GetById(Guid id)
        {
            return await _context.Categories.FirstOrDefaultAsync(x => x.Id.Equals(id));
        }

        public async Task<Category?> UpdateAsync(Category category)
        {
            var current=await _context.Categories.FirstOrDefaultAsync(_context => _context.Id == category.Id);
            if (current != null)
            {
                _context.Entry(current).CurrentValues.SetValues(category);
                await _context.SaveChangesAsync();
                return category;
            }
            return null;
        }
    }
}
