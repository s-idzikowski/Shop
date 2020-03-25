using System;
using System.Collections.Generic;

namespace Shop.Service.Models
{
    public class Operation
    {
        public OperationTypes Type { get; set; }
        public DateTime Time { get; set; }
        public string Ip { get; set; }

        public Operation()
        {
        }

        public Operation(OperationTypes type, string ip)
        {
            Time = DateTime.Now;
            Type = type;
            Ip = ip;
        }

        public static List<Operation> GetOne(OperationTypes type, string ip)
        {
            return new List<Operation>()
            {
                new Operation(type, ip)
            };
        }
    }
}