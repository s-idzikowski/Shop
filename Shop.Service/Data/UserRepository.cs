using MongoDB.Bson;
using MongoDB.Driver;
using Shop.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Service.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext db;
        public UserRepository(AppDbContext db)
        {
            this.db = db;
        }
        public async Task<User> GetUser(int id)
        {
            return await db.Users.Find(u => u.Id == id).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await db.Users.Find(u => true).ToListAsync();
        }
    }
}
