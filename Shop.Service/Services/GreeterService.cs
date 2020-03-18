using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.Extensions.Logging;

namespace Shop.Service
{
    public class GreeterService : Greeter.GreeterBase
    {
        private readonly ILogger<GreeterService> _logger;
        public GreeterService(ILogger<GreeterService> logger)
        {
            _logger = logger;
        }

        public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
        {
            HelloData helloData = new HelloData()
            {
                Message = "Service say hello: " + request.Name
            };

            return Task.FromResult(new HelloReply() { HelloData = helloData });
        }
    }
}