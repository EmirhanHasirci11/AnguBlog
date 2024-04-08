using AnguBlog.API.Data;
using AnguBlog.API.Models.Domain;
using AnguBlog.API.Models.DTO;
using AnguBlog.API.Repositories.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AnguBlog.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository repository;

        public CategoriesController(ICategoryRepository repository)
        {
            this.repository = repository;
        }
        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDto request)
        {
            var category = new Category()
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle,
            };
            await repository.CreateAsync(category);
          
            var response = new CategoryDto()
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle,
            };

            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories= await repository.GetAllCategoryAsync();

            var response = new List<CategoryDto>();

            foreach(var category in categories)
            {
                response.Add(new CategoryDto() {Id=category.Id, Name=category.Name,UrlHandle=category.UrlHandle});
            }
            return Ok(response);
        }
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetCategoryById(Guid id)
        {
            var existingCategory = await repository.GetById(id);
            if(existingCategory == null)
                return NotFound();
            var res = new CategoryDto
            {
                Id = existingCategory.Id,
                Name = existingCategory.Name,
                UrlHandle = existingCategory.UrlHandle,
            };
            return Ok(res);
        }
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var category = await repository.DeleteAsync(id);
            if (category == null)
                return NotFound();
            var res = new CategoryDto()
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle,
            };
            return Ok(res);
        }
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> EditCategory(Guid id,UpdateCategoryRequestDto request)
        {
            var category = new Category
            {
                Id = id,
                Name = request.Name,
                UrlHandle = request.UrlHandle,
            };
            category = await repository.UpdateAsync(category);
            if(category == null)
                return NotFound();
            var response = new CategoryDto()
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle,
            };
            return Ok(response);
        }
        
    }
}
