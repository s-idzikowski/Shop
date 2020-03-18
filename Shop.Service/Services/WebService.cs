using Microsoft.Extensions.Logging;

namespace Shop.Service
{
    public partial class WebService : Service.ServiceBase
    {
        private readonly ILogger<WebService> _logger;
        public WebService(ILogger<WebService> logger)
        {
            _logger = logger;
        }
    }
}