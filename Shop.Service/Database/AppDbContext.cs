using MongoDB.Driver;
using Shop.Service.Models;

namespace Shop.Service.Database
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