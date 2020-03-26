using MongoDB.Driver;
using Shop.Service.Database;
using Shop.Service.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.Service.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext db;



        public UserRepository(AppDbContext db)
        {
            this.db = db;
        }



        public async Task Register(User user)
        {
            await db.Users.InsertOneAsync(user);
        }

        public Task AddOperations(Guid userId, IEnumerable<Operation> operations)
        {
            FilterDefinition<User> filter = Builders<User>.Filter
                .Eq(o => o.Id, userId);

            UpdateDefinition<User> update = Builders<User>.Update
                .PushEach(o => o.Operations, operations);

            return db.Users.UpdateOneAsync(filter, update);
        }

        public Task<User> GetByUsername(string username)
        {
            return db.Users.Find(o => o.Username == username).SingleOrDefaultAsync();
        }

        public Task<User> GetByEmailAddress(string emailAddress)
        {
            return db.Users.Find(o => o.EmailAddress == emailAddress).SingleOrDefaultAsync();
        }

        public Task<User> GetById(Guid id)
        {
            FilterDefinition<User> filter = Builders<User>.Filter
                .Eq(o => o.Id, id);

            return db.Users.Find(filter).SingleOrDefaultAsync();
        }

        public Task<List<Operation>> GetUserOperations(Guid id)
        {
            FilterDefinition<User> filter = Builders<User>.Filter
                .Eq(o => o.Id, id);

            return db.Users.Find(filter).Project(o => o.Operations).SingleAsync();
        }
    }
}