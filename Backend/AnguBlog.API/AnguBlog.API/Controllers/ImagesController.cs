using AnguBlog.API.Models.Domain;
using AnguBlog.API.Models.DTO;
using AnguBlog.API.Repositories.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AnguBlog.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IimageRepostiory imageRepostiory;

        public ImagesController(IimageRepostiory imageRepostiory)
        {
            this.imageRepostiory = imageRepostiory;
        }

        [HttpPost]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file, [FromForm] string fileName, [FromForm] string title)
        {
            ValidateFileUpload(file);
            if ( ModelState.IsValid )
            {
                var blogImage = new BlogImage
                {                    
                    FileName = fileName,
                    Title = title,                    
                    FileExtension = Path.GetExtension(file.FileName),
                    DateCreated = DateTime.Now
                };  
                blogImage = await imageRepostiory.CreateAsync(file, blogImage);
                var response = new BlogImageDto
                {
                    Id = blogImage.Id,
                    FileName = blogImage.FileName,
                    FileExtension = blogImage.FileExtension,
                    Title = blogImage.Title,
                    Url = blogImage.Url,
                    DateCreated = blogImage.DateCreated
                };

                return Ok(response);
            }
            return BadRequest(ModelState);
        }
        private void ValidateFileUpload(IFormFile file)
        {
           var allowedExtensions = new[] { ".jpg", ".jpeg", ".png"};

            if(!allowedExtensions.Contains(Path.GetExtension(file.FileName).ToLower()))
            {
                ModelState.AddModelError("file", "Invalid file extension. Only .jpg, .jpeg, .png are allowed.");
            }

            if(file.Length > 10485760)
            {
                ModelState.AddModelError("file", "The file size should not exceed 10MB.");
            }

        }
    }
}
