using AnguBlog.API.Data;
using AnguBlog.API.Models.Domain;
using AnguBlog.API.Repositories.Abstract;
using Microsoft.EntityFrameworkCore;

namespace AnguBlog.API.Repositories.Concrete
{
    public class imageRepository : IimageRepostiory
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly ApplicationDbContext dbContext;

        public imageRepository(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor, ApplicationDbContext dbContext)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
            this.dbContext = dbContext;
        }

        public async Task<BlogImage> CreateAsync(IFormFile file, BlogImage blogImage)
        {
            var localPath= Path.Combine(webHostEnvironment.ContentRootPath, "Images",$"{blogImage.FileName}{blogImage.FileExtension}");

            using (var fileStream = new FileStream(localPath, FileMode.Create))            
                await file.CopyToAsync(fileStream);
            
            var httpRequest = httpContextAccessor.HttpContext.Request;
            var urlPath = $"{httpRequest.Scheme}://{httpRequest.Host}/Images/{blogImage.FileName}{blogImage.FileExtension}";
            blogImage.Url = urlPath;

            await dbContext.AddAsync(blogImage);
            await dbContext.SaveChangesAsync();
            return blogImage;
        }

        public async Task<IEnumerable<BlogImage>> GetAll()
        {
            return await dbContext.BlogImages.ToListAsync();
        }
    }
}
