using MongoDB.Driver;
using Shop.Service.Database;
using Shop.Service.Models;
using System;
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



        public Task<User> SignIn(SignInData signInData)
        {
            //TODO - h@$h
            signInData.Password = signInData.Password;
            return db.Users.Find(o => o.Username == signInData.Username && o.PasswordHash == signInData.Password).SingleOrDefaultAsync();
        }

        public Task Register(User user)
        {
            //TODO - h@$h
            user.PasswordHash = user.PasswordHash;
            return db.Users.InsertOneAsync(user);
        }

        public Task UpdateAuthToken(User user)
        {
            FilterDefinition<User> filter = Builders<User>.Filter
                .Eq(o => o.Id, user.Id);

            UpdateDefinition<User> update = Builders<User>.Update
                .Set(o => o.AuthToken, user.AuthToken)
                .Set(o => o.LoginTime, user.LoginTime);
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

        public Task<User> GetByAuthToken(string authToken)
        {
            return db.Users.Find(o => o.AuthToken == authToken).SingleOrDefaultAsync();
        }

        public Task<User> GetById(Guid id)
        {
            return db.Users.Find(o => o.Id == id).SingleOrDefaultAsync();
        }
    }
}