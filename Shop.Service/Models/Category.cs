using System.Collections.Generic;
using System.Linq;

namespace Shop.Service.Models
{
    public class Category
    {
        public string Name { get; set; }
        public List<Category> SubCategories { get; set; } = new List<Category>();


        public CategoryData Map()
        {
            var categoryData = new CategoryData()
            {
                Name = Name,
            };

            categoryData.SubCategories.Add(SubCategories.Select(o => o.Map()));

            return categoryData;
        }
    }
}