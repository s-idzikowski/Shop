using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.AspNetCore.Authorization;
using Shop.Service.Models;

namespace Shop.Service
{
    public partial class WebService : Service.ServiceBase
    {
        [Authorize(Policy = nameof(Roles.AdministrationCategories))]
        public override async Task<BasicResponse> AddCategory(AddCategoryRequest request, ServerCallContext context)
        {
            var category = Category.New(request.CategoryData);

            await categoryRepository.AddCategory(category);

            return await GetResponse(StatusCode.Ok);
        }

        [Authorize(Policy = nameof(Roles.AdministrationCategories))]
        public override async Task<BasicResponse> CategoryChange(ChangeCategoryRequest request, ServerCallContext context)
        {
            var category = Category.Update(request.CategoryData);

            await categoryRepository.ChangeCategory(category);

            return await GetResponse(StatusCode.Ok);
        }

        public override async Task<CategoriesResponse> GetCategories(UserRequest request, ServerCallContext context)
        {
            var categories = await categoryRepository.GetCategories();

            var result = new CategoriesResponse()
            {
                StatusCode = StatusCode.Ok
            };
            result.CategoryData.Add(categories.Select(o => o.Map()));

            return result;
        }
    }
}