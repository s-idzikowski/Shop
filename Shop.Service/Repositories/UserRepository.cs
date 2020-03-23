using MongoDB.Driver;
using Shop.Service.Database;
using Shop.Service.Models;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Service.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext db;
        private readonly string BackEndSalt = "s@lt{0}2=<02>=0";



        public UserRepository(AppDbContext db)
        {
            this.db = db;
        }


        private string HashPassword(string password)
        {
            using (var hash = SHA512.Create())
            {
                var bytes = hash.ComputeHash(Encoding.UTF8.GetBytes(string.Format(BackEndSalt, password)));

                var hashBuilder = new StringBuilder();
                foreach (var _byte in bytes)
                    hashBuilder.Append(_byte.ToString("X2"));
                return hashBuilder.ToString();
            }
        }

        public Task<User> SignIn(SignInData signInData)
        {
            signInData.Password = HashPassword(signInData.Password);

            return db.Users.Find(o => o.Username == signInData.Username && o.PasswordHash == signInData.Password).SingleOrDefaultAsync();
        }

        public Task Register(User user)
        {
            user.PasswordHash = HashPassword(user.PasswordHash);

            return db.Users.InsertOneAsync(user);
        }

        public Task UpdateAuthToken(User user)
        {
            FilterDefinition<User> filter = Builders<User>.Filter
                .Eq(o => o.Id, user.Id);

            UpdateDefinition<User> update = Builders<User>.Update
                .Set(o => o.AuthToken, user.AuthToken)
                .Set(o => o.LoginTime, user.LoginTime)
                .Set(o => o.LoginIp, user.LoginIp);

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