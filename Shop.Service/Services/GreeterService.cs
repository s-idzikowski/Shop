using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.AspNetCore.Authorization;

namespace Shop.Service
{
   
    public partial class WebService : Service.ServiceBase
    {
        [Authorize]
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