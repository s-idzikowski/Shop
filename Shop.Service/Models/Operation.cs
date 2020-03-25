using Grpc.Core;
using System;

namespace Shop.Service.Models
{
    public class Operation
    {
        public OperationTypes Type { get; set; }
        public DateTime Time { get; set; }
        public string Ip { get; set; }
        public Metadata Headers { get; set; }
    }
}