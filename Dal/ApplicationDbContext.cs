using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Core.UserManagement;
using Core.Domain;

namespace Dal {
    public class ApplicationDbContext : IdentityDbContext<AppUser> {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        
        
    }
}