using Shop.Service.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.Service.Repositories
{
    public interface ICategoryRepository
    {
        Task AddCategory(Category category);
        Task<List<Category>> GetCategories();
        Task<Category> GetCategory(Guid id);
        Task ChangeCategory(Category category);
    }
}