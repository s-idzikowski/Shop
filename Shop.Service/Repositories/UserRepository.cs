using Grpc.Core;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration config;



        public UserRepository(AppDbContext db, IConfiguration config)
        {
            this.db = db;
            this.config = config;
        }



        public async Task<User> SignIn(User user, string password, ServerCallContext context)
        {
            if (user == null)
                return null;

            string token = await user.GenerateToken(password, config.GetSection("AppSettings:Token").Value);

            if (string.IsNullOrEmpty(token))
            {
                await AddOperations(user.Id, Operation.GetOne(OperationTypes.Failedlogin, context.Peer));
                
                return null;
            }
            else
            {
                await AddOperations(user.Id, Operation.GetOne(OperationTypes.Login, context.Peer));

                user.AuthorizationToken = token;

                return user;
            }
        }

        public async Task<User> Register(RegisterData registerData, ServerCallContext context)
        {
            User user = User.New(context, registerData);

            user.HashPassword();

            await db.Users.InsertOneAsync(user);

            await AddOperations(user.Id, Operation.GetOne(OperationTypes.Register, context.Host));

            return await SignIn(user, registerData.Password, context);
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
            return db.Users.Find(o => o.Id == id).SingleOrDefaultAsync();
        }
    }
}