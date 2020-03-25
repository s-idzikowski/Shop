using Microsoft.Extensions.Logging;
using Shop.Service.Repositories;

namespace Shop.Service
{
    public partial class WebService : Service.ServiceBase
    {
        private readonly ILogger<WebService> logger;
        private readonly IUserRepository userRepository;



        public WebService(ILogger<WebService> logger,
            IUserRepository userRepository)
        {
            this.logger = logger;
            this.userRepository = userRepository;
        }
    }
}