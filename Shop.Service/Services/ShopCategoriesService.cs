using System.Collections.Generic;
using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.AspNetCore.Authorization;
using Shop.Service.AuthorizationRoles;

namespace Shop.Service
{
    public partial class WebService : Service.ServiceBase
    {
        [Authorize(Policy = nameof(Roles.Administrator))]
        public override async Task<BasicResponse> AddCategory(AddCategoryRequest request, ServerCallContext context)
        {
            return await GetResponse(StatusCode.Ok);
        }

        [Authorize(Policy = nameof(Roles.Administrator))]
        public override async Task<CategoriesResponse> GetCategories(UserRequest request, ServerCallContext context)
        {
            var array = new List<CategoryData>();
            array.Add(new CategoryData() { Name = "test1" });
            array.Add(new CategoryData() { Name = "test2" });
            array.Add(new CategoryData() { Name = "test3" });

            var result = new CategoriesResponse()
            {
                StatusCode = StatusCode.Ok
            };
            result.CategoryData.Add(array);

            return await Task.FromResult(result);
        }
    }
}