using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Swap.API.Models
{
    public class Picture
    {
        public int PictureId { get; set; }
        public string FileName { get; set; }
        public string Extention { get; set; }
        public byte[] FileData { get; set; }

        public virtual Item Item { get; set; }
    }
}