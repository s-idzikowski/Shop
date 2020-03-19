using Grpc.Core;
using Microsoft.Extensions.Logging;
using Shop.Service.Models;
using Shop.Service.Repositories;
using System.Linq;
using System.Threading.Tasks;

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

        private async Task<User> Authorize(ServerCallContext context)
        {
            string token = context.RequestHeaders.FirstOrDefault(o => o.Key == "auth-token")?.Value;

            if (string.IsNullOrWhiteSpace(token))
                return await Task.FromResult<User>(null);

            return await userRepository.GetByAuthToken(token);
        }
    }
}