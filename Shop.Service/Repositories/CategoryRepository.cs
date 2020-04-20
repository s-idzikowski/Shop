using MongoDB.Driver;
using Shop.Service.Database;
using Shop.Service.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.Service.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext db;



        public CategoryRepository(AppDbContext db)
        {
            this.db = db;
        }



        public async Task AddCategory(Category category)
        {
            await db.Categories.InsertOneAsync(category);

            if (category.ParentId.HasValue)
            {
                FilterDefinition<Category> filter = Builders<Category>.Filter
                    .Eq(o => o.Id, category.ParentId);

                UpdateDefinition<Category> update = Builders<Category>.Update
                    .Push(o => o.SubCategoriesId, category.Id);

                await db.Categories.UpdateOneAsync(filter, update);
            }
        }

        public Task<List<Category>> GetCategories()
        {
            return db.Categories.Find(o => o.ParentId == default)
                .ToListAsync();
        }

        public Task<Category> GetCategory(Guid id)
        {
            return db.Categories.Find(o => o.Id == id).SingleAsync();
        }

        public Task ChangeCategory(Category category)
        {
            FilterDefinition<Category> filter = Builders<Category>.Filter
                .Eq(o => o.Id, category.Id);

            UpdateDefinition<Category> update = Builders<Category>.Update
                .Set(o => o.Name, category.Name)
                .Set(o => o.Active, category.Active)
                .Set(o => o.ParentId, category.ParentId);

            return db.Categories.UpdateOneAsync(filter, update);
        }
    }
}