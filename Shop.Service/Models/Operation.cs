using System;
using System.Collections.Generic;

namespace Shop.Service.Models
{
    public class Operation
    {
        public OperationTypes Type { get; set; }
        public DateTime Time { get; set; }
        public string Ip { get; set; }
        public List<string> Value { get; set; }



        public Operation()
        {
        }

        public Operation(OperationTypes type, string ip)
        {
            Time = DateTime.Now;
            Type = type;
            Ip = ip;
        }

        public Operation(OperationTypes type, string ip, List<string> value) : this(type, ip)
        {
            Value = value;
        }

        public static List<Operation> GetOne(OperationTypes type, string ip, List<string> value = default)
        {
            return new List<Operation>()
            {
                new Operation(type, ip, value)
            };
        }
    }
}