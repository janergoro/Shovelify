using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Swap.API.Models.AddModels
{
    public class UserAddModel
    {
        public string FaceBookUniqueId { get; set; }
        public string PhoneNo { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Token { get; set; }
    }
}