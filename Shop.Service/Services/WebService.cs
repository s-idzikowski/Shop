using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Shop.Service.Repositories;
using System.Threading.Tasks;

namespace Shop.Service
{
    public partial class WebService : Service.ServiceBase
    {
        private readonly ILogger<WebService> logger;
        private readonly IUserRepository userRepository;
        private readonly IConfiguration config;

        private string ConfigToken => config.GetSection("AppSettings:Token").Value;



        public WebService(ILogger<WebService> logger,
            IUserRepository userRepository, IConfiguration config)
        {
            this.logger = logger;
            this.userRepository = userRepository;
            this.config = config;
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