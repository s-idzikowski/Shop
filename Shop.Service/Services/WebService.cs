using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Shop.Service.Repositories;
using System.Threading.Tasks;

namespace Shop.Service
{
    public partial class WebService : Service.ServiceBase
    {
        private readonly ILogger<WebService> logger;
        private readonly IConfiguration config;
        private string ConfigToken => config.GetSection("AppSettings:Token").Value;



        private readonly IUserRepository userRepository;
        private readonly ICategoryRepository categoryRepository;



        public WebService(ILogger<WebService> logger, 
            IConfiguration config,
            IUserRepository userRepository,
            ICategoryRepository categoryRepository)
        {
            this.logger = logger;
            this.config = config;

            this.userRepository = userRepository;
            this.categoryRepository = categoryRepository;
        }



        protected Task<BasicResponse> GetResponse(StatusCode statusCode, string authorization = default)
        {
            if (string.IsNullOrEmpty(authorization))
            {
                return Task.FromResult(new BasicResponse()
                {
                    StatusCode = statusCode
                });
            }
            else
            {
                return Task.FromResult(new BasicResponse()
                {
                    StatusCode = statusCode,
                    Authorization = authorization
                });
            }
        }
    }
}