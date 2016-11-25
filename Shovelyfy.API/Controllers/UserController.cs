using Swap.API.DAL;
using Swap.API.Models;
using Swap.API.Models.AddModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace Swap.API.Controllers
{
    public class UserController : ApiController
    {
        private SwapDbContext db = new SwapDbContext();

        // POST: api/User
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> PostUser(UserAddModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var u = new User
            {

            };
            db.Users.Add(u);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = u.UserId }, u);
        }
    }
}
