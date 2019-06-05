using System;
using System.ComponentModel.DataAnnotations;

namespace aspnetCoreReactTemplate.Models
{
    public class PortfolioItem
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public byte[] Image { get; set; }

        public int? DevelopmentTimeInHours { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
