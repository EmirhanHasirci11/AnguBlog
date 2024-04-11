using Microsoft.AspNetCore.Identity;

namespace AnguBlog.API.Repositories.Abstract
{
    public interface ITokenRepository
    {
        string CreateJwtToken(IdentityUser user, List<string> roles);
    }
}
