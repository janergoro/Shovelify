using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Swap.API.Models
{
    public class Like
    {
        public int LikeId { get; set; }
        public bool Decision { get; set; }
        public DateTime Created { get; set; }

        public virtual Item LikedItem { get; set; }
        public virtual Item LikingItem { get; set; }

    }
}