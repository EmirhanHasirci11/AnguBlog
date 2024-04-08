using AnguBlog.API.Data;
using AnguBlog.API.Models.Domain;
using AnguBlog.API.Repositories.Abstract;

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
    }
}
