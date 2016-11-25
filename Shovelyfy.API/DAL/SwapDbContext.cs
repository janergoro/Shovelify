using Swap.API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Swap.API.DAL
{
    public class SwapDbContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<Like> Likes { get; set; }
        public virtual DbSet<Picture> Pictures { get; set; }
    }
}