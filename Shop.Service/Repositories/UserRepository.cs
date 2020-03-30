﻿using MongoDB.Driver;
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

        public Task<User> GetByUsername(string username)
        {
            return db.Users.Find(o => o.Username == username).SingleOrDefaultAsync();
        }

        public Task<User> GetByEmailAddress(string emailAddress)
        {
            return db.Users.Find(o => o.EmailAddress == emailAddress).SingleOrDefaultAsync();
        }

        public Task<User> GetById(Guid userId)
        {
            FilterDefinition<User> filter = Builders<User>.Filter
                .Eq(o => o.Id, userId);

            ProjectionDefinition<User> fields = Builders<User>.Projection
                .Include(u => u.Id)
                .Include(u => u.Username)
                .Include(u => u.PasswordHash)
                .Include(u => u.PasswordSalt)
                .Include(u => u.EmailAddress)
                .Include(u => u.Telephone)
                .Include(u => u.IsBanned);

            return db.Users.Find(filter).Project<User>(fields).SingleAsync();
        }

        public Task AddOperations(Guid userId, IEnumerable<Operation> operations)
        {
            FilterDefinition<User> filter = Builders<User>.Filter
                .Eq(o => o.Id, userId);

            UpdateDefinition<User> update = Builders<User>.Update
                .PushEach(o => o.Operations, operations, position: 0);

            return db.Users.UpdateOneAsync(filter, update);
        }

        public Task<List<Operation>> GetUserOperations(Guid id)
        {
            FilterDefinition<User> filter = Builders<User>.Filter
                .Eq(o => o.Id, id);

            return db.Users.Find(filter).Project(o => o.Operations).SingleAsync();
        }

        public Task<List<AddressData>> GetUserAddresses(Guid id)
        {
            FilterDefinition<User> filter = Builders<User>.Filter
                .Eq(o => o.Id, id);

            return db.Users.Find(filter).Project(o => o.Addresses).SingleAsync();
        }

        public Task ChangePassword(User user)
        {
            FilterDefinition<User> filter = Builders<User>.Filter
                .Eq(o => o.Id, user.Id);

            UpdateDefinition<User> update = Builders<User>.Update
                .Set(o => o.PasswordHash, user.PasswordHash)
                .Set(o => o.PasswordSalt, user.PasswordSalt);

            return db.Users.UpdateOneAsync(filter, update);
        }

        public Task ChangeAddresses(User user)
        {
            FilterDefinition<User> filter = Builders<User>.Filter
                .Eq(o => o.Id, user.Id);

            UpdateDefinition<User> update = Builders<User>.Update
                .Set(o => o.Addresses, user.Addresses);

            return db.Users.UpdateOneAsync(filter, update);
        }
    }
}