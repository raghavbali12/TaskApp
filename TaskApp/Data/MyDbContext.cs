using Microsoft.EntityFrameworkCore;
using TaskApp.Models;

namespace TaskApp.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
        }
        public DbSet<TaskApp.Models.Task> Task { get; set; }
    }
}
