using MongoDB.Driver;
using Shop.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Service.Data
{
    public class AppDbContext
    {
        private readonly IMongoDatabase _db;

        public AppDbContext(IMongoClient client, string dbName)
        {
            _db = client.GetDatabase(dbName);
        }

        public IMongoCollection<User> Users => _db.GetCollection<User>("User");
    }
}
