using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Shop.Service.Models;
using Shop.Service.Repositories;
using System;

namespace Shop.Service.Database
{
    public class AppDbContext
    {
        private readonly IMongoDatabase _db;



        public AppDbContext(IMongoClient client, string dbName)
        {
            _db = client.GetDatabase(dbName);
        }



        public static void Configure(IServiceCollection services)
        {
            services.AddTransient<IUserRepository, UserRepository>()
                    .AddTransient(serviceProvider => new Lazy<IUserRepository>(() => serviceProvider.GetRequiredService<IUserRepository>()));

            services.AddTransient<ICategoryRepository, CategoryRepository>()
                    .AddTransient(serviceProvider => new Lazy<ICategoryRepository>(() => serviceProvider.GetRequiredService<ICategoryRepository>()));
        }

        public IMongoCollection<User> Users => _db.GetCollection<User>("User");
    }
}