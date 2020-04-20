using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Shop.Service.Models
{
    public class Category
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; } = true;
        public Guid? ParentId { get; set; }
        public List<Guid> SubCategoriesId { get; set; } = new List<Guid>();



        [BsonIgnore]
        public Category Parent { get; set; }
        [BsonIgnore]
        public List<Category> SubCategories { get; set; } = new List<Category>();



        public CategoryData Map(bool mapParent = false)
        {
            var categoryData = new CategoryData()
            {
                Id = Id.ToString(),
                Name = Name,
                Active = Active,
            };

            if (mapParent && Parent != null)
            {
                categoryData.Parent = Parent.Map();
            }

            categoryData.SubCategories.Add(SubCategories.Select(o => o.Map()));

            return categoryData;
        }

        public static Category New(CategoryData categoryData)
        {
            var category = new Category()
            {
                Name = categoryData.Name,
            };

            if (categoryData.Parent != null)
            {
                category.ParentId = new Guid(categoryData.Parent.Id);
            }

            if (categoryData.SubCategories != null)
            {
                category.SubCategoriesId = categoryData.SubCategories.Select(o => new Guid(o.Id)).ToList();
            }

            return category;
        }
        public static Category Update(CategoryData categoryData)
        {
            var category = New(categoryData);

            category.Id = new Guid(categoryData.Id);
            category.Active = categoryData.Active;

            return category;
        }
    }
}