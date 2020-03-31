using System;
using System.Collections.Generic;

namespace Shop.Service.Models
{
    public class Operation
    {
        public OperationTypes Type { get; set; }
        public DateTime Time { get; set; }
        public string Ip { get; set; }
        public List<string> ValueBefore { get; set; }
        public List<string> ValueAfter { get; set; }



        public Operation()
        {
        }

        public Operation(OperationTypes type, string ip)
        {
            Time = DateTime.Now;
            Type = type;
            Ip = ip;
        }

        public Operation(OperationTypes type, string ip, List<string> before, List<string> after) : this(type, ip)
        {
            ValueBefore = before;
            ValueAfter = after;
        }

        public static List<Operation> GetOne(OperationTypes type, string ip, List<string> before = default, List<string> after = default)
        {
            return new List<Operation>()
            {
                new Operation(type, ip, before, after)
            };
        }
    }
}