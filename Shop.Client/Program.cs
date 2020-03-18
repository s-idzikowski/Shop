using Grpc.Net.Client;
using Shop.Service;
using System;
using System.Threading.Tasks;

namespace Shop.Client
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var input = new HelloRequest { Name = "Slawek" };
            var channel = GrpcChannel.ForAddress("https://localhost:5001");
            var client = new Greeter.GreeterClient(channel);

            var reply = await client.SayHelloAsync(input);

            Console.WriteLine(reply.Message);
            Console.ReadLine();
        }
    }
}
