using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Swap.API.Models
{
    public class Item
    {
        public int ItemId { get; set; }
        public int Description { get; set; }
        public ItemValueLevel Value { get; set; }
        public ItemDealType DealType { get; set; }


        public virtual User User { get; set; }


        public enum ItemValueLevel
        {

        }

        public enum ItemDealType
        {

        }
    }
}