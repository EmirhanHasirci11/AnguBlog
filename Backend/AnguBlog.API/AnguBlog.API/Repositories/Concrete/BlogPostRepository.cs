using AnguBlog.API.Data;
using AnguBlog.API.Models.Domain;
using AnguBlog.API.Repositories.Abstract;
using Microsoft.EntityFrameworkCore;

namespace AnguBlog.API.Repositories.Concrete
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly ApplicationDbContext _context;

        public BlogPostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<BlogPost> CreateAsync(BlogPost blogPost)
        {
            await _context.BlogPosts.AddAsync(blogPost);
            await _context.SaveChangesAsync();
            return blogPost;
        }

        public async Task<IEnumerable<BlogPost>> GetAllBlogPostsAsync()
        {
            return await _context.BlogPosts.Include(x => x.Categories).ToListAsync();
        }

        public async Task<BlogPost?> GetById(Guid id)
        {
            return await _context.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<BlogPost?> UpdateAsync(BlogPost blogPost)
        {
            var existingBlog = await _context.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == blogPost.Id);

            if (existingBlog == null)
            {
                return null;
            }
            _context.Entry(existingBlog).CurrentValues.SetValues(blogPost);

            existingBlog.Categories = blogPost.Categories;

            await _context.SaveChangesAsync();

            return blogPost;

        }
    }
}
